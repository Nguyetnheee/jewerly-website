import { c as createServerRpc } from "./createServerRpc-dAqAuA0L.mjs";
import { c as createServerFn } from "./server-CkEUq1DS.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, n as numberType, b as booleanType, e as enumType, s as stringType } from "../_libs/zod.mjs";
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
const listProducts_createServerFn_handler = createServerRpc({
  id: "51ad93d03c52987e0e52d0164e41771f8765a8919d8a537367eaf795dff9b9d8",
  name: "listProducts",
  filename: "src/lib/products.functions.ts"
}, (opts) => listProducts.__executeServer(opts));
const listProducts = createServerFn({
  method: "GET"
}).inputValidator((input) => objectType({
  search: stringType().optional(),
  collection: stringType().optional(),
  category: stringType().optional(),
  sort: enumType(["newest", "price_asc", "price_desc", "popular"]).optional(),
  featured: booleanType().optional(),
  limit: numberType().int().min(1).max(100).optional()
}).parse(input ?? {})).handler(listProducts_createServerFn_handler, async ({
  data
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  let q = supabaseAdmin.from("products").select("id, name, slug, description, price, stock_quantity, material, image_url, featured, rating, collection_id, category_id").eq("active", true);
  if (data.featured) q = q.eq("featured", true);
  if (data.search) q = q.ilike("name", `%${data.search}%`);
  if (data.collection) {
    const {
      data: col
    } = await supabaseAdmin.from("collections").select("id").eq("slug", data.collection).maybeSingle();
    if (col?.id) q = q.eq("collection_id", col.id);
  }
  if (data.category) {
    const {
      data: cat
    } = await supabaseAdmin.from("categories").select("id").eq("slug", data.category).maybeSingle();
    if (cat?.id) q = q.eq("category_id", cat.id);
  }
  if (data.sort === "price_asc") q = q.order("price", {
    ascending: true
  });
  else if (data.sort === "price_desc") q = q.order("price", {
    ascending: false
  });
  else if (data.sort === "popular") q = q.order("rating", {
    ascending: false
  });
  else q = q.order("created_at", {
    ascending: false
  });
  if (data.limit) q = q.limit(data.limit);
  const {
    data: rows,
    error
  } = await q;
  if (error) throw new Error(error.message);
  return rows ?? [];
});
const getProductBySlug_createServerFn_handler = createServerRpc({
  id: "934a19e0a64899030ca094a104b50f8fc2c2f2533d480be67184ceddaf6faaf0",
  name: "getProductBySlug",
  filename: "src/lib/products.functions.ts"
}, (opts) => getProductBySlug.__executeServer(opts));
const getProductBySlug = createServerFn({
  method: "GET"
}).inputValidator((input) => objectType({
  slug: stringType()
}).parse(input)).handler(getProductBySlug_createServerFn_handler, async ({
  data
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  const {
    data: product,
    error
  } = await supabaseAdmin.from("products").select("*, collection:collections(name, slug), category:categories(name, slug)").eq("slug", data.slug).eq("active", true).maybeSingle();
  if (error) throw new Error(error.message);
  if (!product) return null;
  const [sizes, testimonials] = await Promise.all([supabaseAdmin.from("bracelet_sizes").select("*").order("wrist_cm"), supabaseAdmin.from("testimonials").select("*").eq("active", true).order("created_at", {
    ascending: false
  }).limit(4)]);
  return {
    ...product,
    sizes: sizes.data ?? [],
    testimonials: testimonials.data ?? []
  };
});
const listCollections_createServerFn_handler = createServerRpc({
  id: "36530dd13befeb732fee969d18ca06efc81e5a6873e4b7a64f4e4f13a0cf04d9",
  name: "listCollections",
  filename: "src/lib/products.functions.ts"
}, (opts) => listCollections.__executeServer(opts));
const listCollections = createServerFn({
  method: "GET"
}).handler(listCollections_createServerFn_handler, async () => {
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  const {
    data,
    error
  } = await supabaseAdmin.from("collections").select("*").order("name");
  if (error) throw new Error(error.message);
  return data ?? [];
});
const listCategories_createServerFn_handler = createServerRpc({
  id: "74cf57a5ce5acc5ff7716c464d5de5a2260685d83f4d25828e2026fb3932cf53",
  name: "listCategories",
  filename: "src/lib/products.functions.ts"
}, (opts) => listCategories.__executeServer(opts));
const listCategories = createServerFn({
  method: "GET"
}).handler(listCategories_createServerFn_handler, async () => {
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  const {
    data,
    error
  } = await supabaseAdmin.from("categories").select("*").order("name");
  if (error) throw new Error(error.message);
  return data ?? [];
});
const listTestimonials_createServerFn_handler = createServerRpc({
  id: "83ff112a2fb04e6c5e01c31120c559b10d7eb9057cd3b654aac6abd03c4c3902",
  name: "listTestimonials",
  filename: "src/lib/products.functions.ts"
}, (opts) => listTestimonials.__executeServer(opts));
const listTestimonials = createServerFn({
  method: "GET"
}).handler(listTestimonials_createServerFn_handler, async () => {
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  const {
    data,
    error
  } = await supabaseAdmin.from("testimonials").select("*").eq("active", true).order("created_at", {
    ascending: false
  }).limit(6);
  if (error) throw new Error(error.message);
  return data ?? [];
});
const listFaq_createServerFn_handler = createServerRpc({
  id: "a28caa4bb5dc87b6586f87b412c05650c9a19ff351492cbc7feef1f8e00254ef",
  name: "listFaq",
  filename: "src/lib/products.functions.ts"
}, (opts) => listFaq.__executeServer(opts));
const listFaq = createServerFn({
  method: "GET"
}).handler(listFaq_createServerFn_handler, async () => {
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  const {
    data,
    error
  } = await supabaseAdmin.from("faq_items").select("*").eq("active", true).order("sort_order");
  if (error) throw new Error(error.message);
  return data ?? [];
});
const getStudioData_createServerFn_handler = createServerRpc({
  id: "df4ad356d9c1425ec33771cae468d7a538cdffa5ec4ef0d1e0bba725fa824e54",
  name: "getStudioData",
  filename: "src/lib/products.functions.ts"
}, (opts) => getStudioData.__executeServer(opts));
const getStudioData = createServerFn({
  method: "GET"
}).handler(getStudioData_createServerFn_handler, async () => {
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  const [materials, sizes, charms, charmCategories] = await Promise.all([supabaseAdmin.from("bracelet_materials").select("*").eq("active", true).order("base_price"), supabaseAdmin.from("bracelet_sizes").select("*").order("wrist_cm"), supabaseAdmin.from("charms").select("*").eq("active", true).order("name"), supabaseAdmin.from("charm_categories").select("*").order("name")]);
  return {
    materials: materials.data ?? [],
    sizes: sizes.data ?? [],
    charms: charms.data ?? [],
    charmCategories: charmCategories.data ?? []
  };
});
export {
  getProductBySlug_createServerFn_handler,
  getStudioData_createServerFn_handler,
  listCategories_createServerFn_handler,
  listCollections_createServerFn_handler,
  listFaq_createServerFn_handler,
  listProducts_createServerFn_handler,
  listTestimonials_createServerFn_handler
};
