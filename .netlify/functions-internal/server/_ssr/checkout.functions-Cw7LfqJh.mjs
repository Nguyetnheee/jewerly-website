import { c as createServerRpc } from "./createServerRpc-dAqAuA0L.mjs";
import { c as createServerFn } from "./server-CkEUq1DS.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CXv2x3dD.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, n as numberType, s as stringType, e as enumType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const SHIPPING_FLAT_VND = 35e3;
const validateCoupon_createServerFn_handler = createServerRpc({
  id: "7d53124a31f98b85a93a534a154a80a64aff3ad6e9160b0b533490223d9a5d18",
  name: "validateCoupon",
  filename: "src/lib/checkout.functions.ts"
}, (opts) => validateCoupon.__executeServer(opts));
const validateCoupon = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  code: stringType().min(2).max(40),
  subtotal: numberType()
}).parse(input)).handler(validateCoupon_createServerFn_handler, async ({
  data
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  const {
    data: coupon,
    error
  } = await supabaseAdmin.from("coupons").select("code, discount_type, discount_value, expires_at, usage_limit, used_count, active").eq("code", data.code.toUpperCase().trim()).eq("active", true).maybeSingle();
  if (error) throw new Error(error.message);
  if (!coupon) throw new Error("Mã giảm giá không hợp lệ");
  if (coupon.expires_at && new Date(coupon.expires_at) < /* @__PURE__ */ new Date()) throw new Error("Mã đã hết hạn");
  if (coupon.usage_limit && coupon.used_count >= coupon.usage_limit) throw new Error("Mã đã hết lượt sử dụng");
  const discount = coupon.discount_type === "percent" ? Math.round(data.subtotal * Number(coupon.discount_value) / 100) : Number(coupon.discount_value);
  return {
    code: coupon.code,
    discount: Math.min(discount, data.subtotal),
    type: coupon.discount_type
  };
});
const placeOrder_createServerFn_handler = createServerRpc({
  id: "537c5b5eac7a9657f797c4c7df0b3e0c7c9c3e8d42e66d55520193729b08c440",
  name: "placeOrder",
  filename: "src/lib/checkout.functions.ts"
}, (opts) => placeOrder.__executeServer(opts));
const placeOrder = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  customerName: stringType().trim().min(2).max(120),
  phone: stringType().trim().min(8).max(20),
  email: stringType().trim().email().max(200),
  shippingAddress: stringType().trim().min(8).max(500),
  paymentMethod: enumType(["cod", "mock_gateway"]),
  couponCode: stringType().max(40).optional().nullable()
}).parse(input)).handler(placeOrder_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  const {
    data: items,
    error: cErr
  } = await supabase.from("cart_items").select(`
        id, quantity, unit_price, product_id, customization_id,
        product:products(name, stock_quantity, active),
        customization:custom_designs(id, total_price)
      `).eq("user_id", userId);
  if (cErr) throw new Error(cErr.message);
  if (!items || items.length === 0) throw new Error("Giỏ hàng trống");
  let subtotal = 0;
  const orderItemRows = [];
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
      subtotal: line
    });
  }
  let discount = 0;
  if (data.couponCode) {
    const {
      supabaseAdmin: _admin
    } = await import("./client.server-D5ro3rAQ.mjs");
    const {
      data: coupon
    } = await _admin.from("coupons").select("discount_type, discount_value, active").eq("code", data.couponCode.toUpperCase().trim()).eq("active", true).maybeSingle();
    if (coupon) {
      discount = coupon.discount_type === "percent" ? Math.round(subtotal * Number(coupon.discount_value) / 100) : Number(coupon.discount_value);
      discount = Math.min(discount, subtotal);
    }
  }
  const shipping = SHIPPING_FLAT_VND;
  const total = subtotal - discount + shipping;
  const {
    data: order,
    error: oErr
  } = await supabase.from("orders").insert({
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
    order_status: "pending"
  }).select("id, order_code").single();
  if (oErr) throw new Error(oErr.message);
  const {
    error: oiErr
  } = await supabase.from("order_items").insert(orderItemRows.map((r) => ({
    ...r,
    order_id: order.id
  })));
  if (oiErr) throw new Error(oiErr.message);
  for (const it of items) {
    if (it.product_id) {
      await supabase.from("products").update({
        stock_quantity: (it.product?.stock_quantity ?? 0) - it.quantity
      }).eq("id", it.product_id);
    }
  }
  if (data.couponCode) {
    const {
      supabaseAdmin
    } = await import("./client.server-D5ro3rAQ.mjs");
    const {
      data: c
    } = await supabaseAdmin.from("coupons").select("id, used_count").eq("code", data.couponCode.toUpperCase().trim()).maybeSingle();
    if (c) await supabaseAdmin.from("coupons").update({
      used_count: c.used_count + 1
    }).eq("id", c.id);
  }
  await supabase.from("cart_items").delete().eq("user_id", userId);
  return {
    orderCode: order.order_code,
    orderId: order.id
  };
});
const listMyOrders_createServerFn_handler = createServerRpc({
  id: "51ac02698006d191c28969bc655e6f6227d772d713f4d3615f2c72940208c22e",
  name: "listMyOrders",
  filename: "src/lib/checkout.functions.ts"
}, (opts) => listMyOrders.__executeServer(opts));
const listMyOrders = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(listMyOrders_createServerFn_handler, async ({
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  const {
    data,
    error
  } = await supabase.from("orders").select("id, order_code, total_amount, order_status, payment_status, created_at").eq("user_id", userId).order("created_at", {
    ascending: false
  });
  if (error) throw new Error(error.message);
  return data ?? [];
});
const getMyOrderByCode_createServerFn_handler = createServerRpc({
  id: "7505f42c80ef23062941d0d756dc981ff786a046ef5488fd334be4d47ac76d04",
  name: "getMyOrderByCode",
  filename: "src/lib/checkout.functions.ts"
}, (opts) => getMyOrderByCode.__executeServer(opts));
const getMyOrderByCode = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  code: stringType()
}).parse(input)).handler(getMyOrderByCode_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  const {
    data: order,
    error
  } = await supabase.from("orders").select(`
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
      `).eq("order_code", data.code).eq("user_id", userId).maybeSingle();
  if (error) throw new Error(error.message);
  return order;
});
export {
  getMyOrderByCode_createServerFn_handler,
  listMyOrders_createServerFn_handler,
  placeOrder_createServerFn_handler,
  validateCoupon_createServerFn_handler
};
