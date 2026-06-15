import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const SHIPPING_FLAT_VND = 35000;

export const validateCoupon = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ code: z.string().min(2).max(40), subtotal: z.number() }).parse(input))
  .handler(async ({ data }) => {
    // Use admin client: coupons table is staff-only (RLS); validation must
    // not expose coupon rows to clients.
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: coupon, error } = await supabaseAdmin
      .from("coupons")
      .select("code, discount_type, discount_value, expires_at, usage_limit, used_count, active")
      .eq("code", data.code.toUpperCase().trim())
      .eq("active", true)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!coupon) throw new Error("Mã giảm giá không hợp lệ");
    if (coupon.expires_at && new Date(coupon.expires_at) < new Date()) throw new Error("Mã đã hết hạn");
    if (coupon.usage_limit && coupon.used_count >= coupon.usage_limit) throw new Error("Mã đã hết lượt sử dụng");
    const discount =
      coupon.discount_type === "percent"
        ? Math.round((data.subtotal * Number(coupon.discount_value)) / 100)
        : Number(coupon.discount_value);
    return { code: coupon.code, discount: Math.min(discount, data.subtotal), type: coupon.discount_type };
  });


export const placeOrder = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        customerName: z.string().trim().min(2).max(120),
        phone: z.string().trim().min(8).max(20),
        email: z.string().trim().email().max(200),
        shippingAddress: z.string().trim().min(8).max(500),
        paymentMethod: z.enum(["cod", "mock_gateway"]),
        couponCode: z.string().max(40).optional().nullable(),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;

    const { data: items, error: cErr } = await supabase
      .from("cart_items")
      .select(`
        id, quantity, unit_price, product_id, customization_id,
        product:products(name, stock_quantity, active),
        customization:custom_designs(id, total_price)
      `)
      .eq("user_id", userId);
    if (cErr) throw new Error(cErr.message);
    if (!items || items.length === 0) throw new Error("Giỏ hàng trống");

    let subtotal = 0;
    const orderItemRows: Array<{
      product_id: string | null;
      custom_design_id: string | null;
      item_name: string;
      quantity: number;
      unit_price: number;
      subtotal: number;
    }> = [];
    for (const it of items) {
      if (it.product_id) {
        if (!it.product?.active) throw new Error(`Sản phẩm "${it.product?.name ?? ""}" không còn bán`);
        if ((it.product?.stock_quantity ?? 0) < it.quantity) throw new Error(`Hết hàng: ${it.product?.name}`);
      }
      const line = Number(it.unit_price) * it.quantity;
      subtotal += line;
      orderItemRows.push({
        product_id: it.product_id ?? null,
        custom_design_id: it.customization_id ?? null,
        item_name: it.product?.name ?? "Vòng tay tùy chỉnh",
        quantity: it.quantity,
        unit_price: Number(it.unit_price),
        subtotal: line,
      });
    }

    // Coupon
    let discount = 0;
    if (data.couponCode) {
      const { supabaseAdmin: _admin } = await import("@/integrations/supabase/client.server");
      const { data: coupon } = await _admin
        .from("coupons")
        .select("discount_type, discount_value, active")
        .eq("code", data.couponCode.toUpperCase().trim())
        .eq("active", true)
        .maybeSingle();
      if (coupon) {
        discount =
          coupon.discount_type === "percent"
            ? Math.round((subtotal * Number(coupon.discount_value)) / 100)
            : Number(coupon.discount_value);
        discount = Math.min(discount, subtotal);
      }
    }


    const shipping = SHIPPING_FLAT_VND;
    const total = subtotal - discount + shipping;

    const { data: order, error: oErr } = await supabase
      .from("orders")
      .insert({
        user_id: userId,
        customer_name: data.customerName,
        phone: data.phone,
        email: data.email,
        shipping_address: data.shippingAddress,
        subtotal,
        discount_amount: discount,
        shipping_fee: shipping,
        total_amount: total,
        payment_method: data.paymentMethod,
        payment_status: data.paymentMethod === "mock_gateway" ? "paid" : "unpaid",
        order_status: "pending",
      })
      .select("id, order_code")
      .single();
    if (oErr) throw new Error(oErr.message);

    const { error: oiErr } = await supabase
      .from("order_items")
      .insert(orderItemRows.map((r) => ({ ...r, order_id: order.id })));
    if (oiErr) throw new Error(oiErr.message);

    // Decrement stock for purchased catalog products
    for (const it of items) {
      if (it.product_id) {
        await supabase
          .from("products")
          .update({ stock_quantity: (it.product?.stock_quantity ?? 0) - it.quantity })
          .eq("id", it.product_id);
      }
    }

    // Increment coupon use
    if (data.couponCode) {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { data: c } = await supabaseAdmin
        .from("coupons")
        .select("id, used_count")
        .eq("code", data.couponCode.toUpperCase().trim())
        .maybeSingle();
      if (c) await supabaseAdmin.from("coupons").update({ used_count: c.used_count + 1 }).eq("id", c.id);
    }

    // Clear cart
    await supabase.from("cart_items").delete().eq("user_id", userId);

    return { orderCode: order.order_code, orderId: order.id };
  });

export const listMyOrders = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data, error } = await supabase
      .from("orders")
      .select("id, order_code, total_amount, order_status, payment_status, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const getMyOrderByCode = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ code: z.string() }).parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: order, error } = await supabase
      .from("orders")
      .select(`
        *,
        items:order_items(
          *,
          product:products(name, slug, image_url),
          customization:custom_designs(
            cord_color, personal_note,
            material:bracelet_materials(name, color),
            size:bracelet_sizes(size_name, wrist_cm),
            charms:custom_design_charms(quantity, charm:charms(name, color))
          )
        )
      `)
      .eq("order_code", data.code)
      .eq("user_id", userId)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return order;
  });
