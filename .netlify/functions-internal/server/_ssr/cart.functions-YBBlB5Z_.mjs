import { c as createServerRpc } from "./createServerRpc-dAqAuA0L.mjs";
import { c as createServerFn } from "./server-CkEUq1DS.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CXv2x3dD.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, n as numberType, s as stringType, a as arrayType } from "../_libs/zod.mjs";
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
const getCart_createServerFn_handler = createServerRpc({
  id: "6f602d242a211117c1c6bdd7e559c6a568fab6fb032c40b2131f45c58acaed5a",
  name: "getCart",
  filename: "src/lib/cart.functions.ts"
}, (opts) => getCart.__executeServer(opts));
const getCart = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(getCart_createServerFn_handler, async ({
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  const {
    data,
    error
  } = await supabase.from("cart_items").select(`
        id, quantity, unit_price, created_at,
        product:products(id, name, slug, image_url, stock_quantity, material),
        customization:custom_designs(
          id, cord_color, personal_note, preview_image_url, total_price,
          material:bracelet_materials(name, color),
          size:bracelet_sizes(size_name, wrist_cm),
          charms:custom_design_charms(quantity, charm:charms(id, name, color, image_url))
        )
      `).eq("user_id", userId).order("created_at", {
    ascending: false
  });
  if (error) throw new Error(error.message);
  return data ?? [];
});
const addProductToCart_createServerFn_handler = createServerRpc({
  id: "9de945013b6610084706a3967af08574aac1fc77d63437cb5bffa7714a5726c9",
  name: "addProductToCart",
  filename: "src/lib/cart.functions.ts"
}, (opts) => addProductToCart.__executeServer(opts));
const addProductToCart = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  productId: stringType().uuid(),
  quantity: numberType().int().min(1).max(20).default(1)
}).parse(input)).handler(addProductToCart_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  const {
    data: product,
    error: pErr
  } = await supabase.from("products").select("price, stock_quantity, active").eq("id", data.productId).maybeSingle();
  if (pErr) throw new Error(pErr.message);
  if (!product || !product.active) throw new Error("Sản phẩm không tồn tại");
  if (product.stock_quantity < data.quantity) throw new Error("Không đủ hàng trong kho");
  const {
    data: existing
  } = await supabase.from("cart_items").select("id, quantity").eq("user_id", userId).eq("product_id", data.productId).is("customization_id", null).maybeSingle();
  if (existing) {
    const {
      error
    } = await supabase.from("cart_items").update({
      quantity: existing.quantity + data.quantity
    }).eq("id", existing.id);
    if (error) throw new Error(error.message);
  } else {
    const {
      error
    } = await supabase.from("cart_items").insert({
      user_id: userId,
      product_id: data.productId,
      quantity: data.quantity,
      unit_price: product.price
    });
    if (error) throw new Error(error.message);
  }
  return {
    ok: true
  };
});
const updateCartItem_createServerFn_handler = createServerRpc({
  id: "8ee2877abc326cd4cce0a8c31341bed607d66ac290d21cd8d4f45868e9cf2ed7",
  name: "updateCartItem",
  filename: "src/lib/cart.functions.ts"
}, (opts) => updateCartItem.__executeServer(opts));
const updateCartItem = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  id: stringType().uuid(),
  quantity: numberType().int().min(1).max(20)
}).parse(input)).handler(updateCartItem_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  const {
    error
  } = await supabase.from("cart_items").update({
    quantity: data.quantity
  }).eq("id", data.id).eq("user_id", userId);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const removeCartItem_createServerFn_handler = createServerRpc({
  id: "abc007195f92a5377b70dde90a4465315a61f009177f5672779e0f24fc7fd1c6",
  name: "removeCartItem",
  filename: "src/lib/cart.functions.ts"
}, (opts) => removeCartItem.__executeServer(opts));
const removeCartItem = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  id: stringType().uuid()
}).parse(input)).handler(removeCartItem_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  const {
    error
  } = await supabase.from("cart_items").delete().eq("id", data.id).eq("user_id", userId);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const saveCustomDesign_createServerFn_handler = createServerRpc({
  id: "659167231f60bd1ad19ce2d40f4476e725faabff9a9f488f2fa06db75e35ea5d",
  name: "saveCustomDesign",
  filename: "src/lib/cart.functions.ts"
}, (opts) => saveCustomDesign.__executeServer(opts));
const saveCustomDesign = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  baseMaterialId: stringType().uuid(),
  sizeId: stringType().uuid(),
  cordColor: stringType().max(40).optional().nullable(),
  personalNote: stringType().max(120).optional().nullable(),
  charms: arrayType(objectType({
    charmId: stringType().uuid(),
    quantity: numberType().int().min(1).max(10)
  })).max(20)
}).parse(input)).handler(saveCustomDesign_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  const {
    data: material,
    error: mErr
  } = await supabase.from("bracelet_materials").select("base_price, active").eq("id", data.baseMaterialId).maybeSingle();
  if (mErr || !material?.active) throw new Error("Chất liệu không hợp lệ");
  const charmIds = data.charms.map((c) => c.charmId);
  let total = Number(material.base_price);
  let charmRows = [];
  if (charmIds.length) {
    const {
      data: charms,
      error: cErr
    } = await supabase.from("charms").select("id, price, stock_quantity, active").in("id", charmIds);
    if (cErr) throw new Error(cErr.message);
    const map = new Map((charms ?? []).map((c) => [c.id, c]));
    data.charms.forEach((c, i) => {
      const ch = map.get(c.charmId);
      if (!ch || !ch.active) throw new Error("Charm không hợp lệ");
      total += Number(ch.price) * c.quantity;
      charmRows.push({
        charm_id: c.charmId,
        quantity: c.quantity,
        position_index: i,
        price_at_time: Number(ch.price)
      });
    });
  }
  const {
    data: design,
    error: dErr
  } = await supabase.from("custom_designs").insert({
    user_id: userId,
    base_material_id: data.baseMaterialId,
    size_id: data.sizeId,
    cord_color: data.cordColor ?? null,
    personal_note: data.personalNote ?? null,
    total_price: total
  }).select("id").single();
  if (dErr) throw new Error(dErr.message);
  if (charmRows.length) {
    const {
      error: ccErr
    } = await supabase.from("custom_design_charms").insert(charmRows.map((r) => ({
      ...r,
      custom_design_id: design.id
    })));
    if (ccErr) throw new Error(ccErr.message);
  }
  const {
    error: cartErr
  } = await supabase.from("cart_items").insert({
    user_id: userId,
    customization_id: design.id,
    quantity: 1,
    unit_price: total
  });
  if (cartErr) throw new Error(cartErr.message);
  return {
    ok: true,
    designId: design.id,
    total
  };
});
export {
  addProductToCart_createServerFn_handler,
  getCart_createServerFn_handler,
  removeCartItem_createServerFn_handler,
  saveCustomDesign_createServerFn_handler,
  updateCartItem_createServerFn_handler
};
