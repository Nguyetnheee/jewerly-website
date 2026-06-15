import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const getCart = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data, error } = await supabase
      .from("cart_items")
      .select(`
        id, quantity, unit_price, created_at,
        product:products(id, name, slug, image_url, stock_quantity, material),
        customization:custom_designs(
          id, cord_color, personal_note, preview_image_url, total_price,
          material:bracelet_materials(name, color),
          size:bracelet_sizes(size_name, wrist_cm),
          charms:custom_design_charms(quantity, charm:charms(id, name, color, image_url))
        )
      `)
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const addProductToCart = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ productId: z.string().uuid(), quantity: z.number().int().min(1).max(20).default(1) }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: product, error: pErr } = await supabase
      .from("products")
      .select("price, stock_quantity, active")
      .eq("id", data.productId)
      .maybeSingle();
    if (pErr) throw new Error(pErr.message);
    if (!product || !product.active) throw new Error("Sản phẩm không tồn tại");
    if (product.stock_quantity < data.quantity) throw new Error("Không đủ hàng trong kho");

    // Merge with existing line if same product
    const { data: existing } = await supabase
      .from("cart_items")
      .select("id, quantity")
      .eq("user_id", userId)
      .eq("product_id", data.productId)
      .is("customization_id", null)
      .maybeSingle();
    if (existing) {
      const { error } = await supabase
        .from("cart_items")
        .update({ quantity: existing.quantity + data.quantity })
        .eq("id", existing.id);
      if (error) throw new Error(error.message);
    } else {
      const { error } = await supabase.from("cart_items").insert({
        user_id: userId,
        product_id: data.productId,
        quantity: data.quantity,
        unit_price: product.price,
      });
      if (error) throw new Error(error.message);
    }
    return { ok: true };
  });

export const updateCartItem = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ id: z.string().uuid(), quantity: z.number().int().min(1).max(20) }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { error } = await supabase
      .from("cart_items")
      .update({ quantity: data.quantity })
      .eq("id", data.id)
      .eq("user_id", userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const removeCartItem = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { error } = await supabase.from("cart_items").delete().eq("id", data.id).eq("user_id", userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const saveCustomDesign = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        baseMaterialId: z.string().uuid(),
        sizeId: z.string().uuid(),
        cordColor: z.string().max(40).optional().nullable(),
        personalNote: z.string().max(120).optional().nullable(),
        charms: z
          .array(z.object({ charmId: z.string().uuid(), quantity: z.number().int().min(1).max(10) }))
          .max(20),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: material, error: mErr } = await supabase
      .from("bracelet_materials")
      .select("base_price, active")
      .eq("id", data.baseMaterialId)
      .maybeSingle();
    if (mErr || !material?.active) throw new Error("Chất liệu không hợp lệ");

    const charmIds = data.charms.map((c) => c.charmId);
    let total = Number(material.base_price);
    let charmRows: { charm_id: string; quantity: number; position_index: number; price_at_time: number }[] = [];
    if (charmIds.length) {
      const { data: charms, error: cErr } = await supabase
        .from("charms")
        .select("id, price, stock_quantity, active")
        .in("id", charmIds);
      if (cErr) throw new Error(cErr.message);
      const map = new Map((charms ?? []).map((c) => [c.id, c]));
      data.charms.forEach((c, i) => {
        const ch = map.get(c.charmId);
        if (!ch || !ch.active) throw new Error("Charm không hợp lệ");
        total += Number(ch.price) * c.quantity;
        charmRows.push({ charm_id: c.charmId, quantity: c.quantity, position_index: i, price_at_time: Number(ch.price) });
      });
    }

    const { data: design, error: dErr } = await supabase
      .from("custom_designs")
      .insert({
        user_id: userId,
        base_material_id: data.baseMaterialId,
        size_id: data.sizeId,
        cord_color: data.cordColor ?? null,
        personal_note: data.personalNote ?? null,
        total_price: total,
      })
      .select("id")
      .single();
    if (dErr) throw new Error(dErr.message);

    if (charmRows.length) {
      const { error: ccErr } = await supabase
        .from("custom_design_charms")
        .insert(charmRows.map((r) => ({ ...r, custom_design_id: design.id })));
      if (ccErr) throw new Error(ccErr.message);
    }

    // Add to cart
    const { error: cartErr } = await supabase.from("cart_items").insert({
      user_id: userId,
      customization_id: design.id,
      quantity: 1,
      unit_price: total,
    });
    if (cartErr) throw new Error(cartErr.message);

    return { ok: true, designId: design.id, total };
  });
