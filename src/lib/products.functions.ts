import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// Public catalog reads — use admin client (RLS still allows anon select on these tables,
// but admin avoids any token round-trip during SSR).

export const listProducts = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) =>
    z
      .object({
        search: z.string().optional(),
        collection: z.string().optional(),
        category: z.string().optional(),
        sort: z.enum(["newest", "price_asc", "price_desc", "popular"]).optional(),
        featured: z.boolean().optional(),
        limit: z.number().int().min(1).max(100).optional(),
      })
      .parse(input ?? {}),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    let q = supabaseAdmin
      .from("products")
      .select("id, name, slug, description, price, stock_quantity, material, image_url, featured, rating, collection_id, category_id")
      .eq("active", true);
    if (data.featured) q = q.eq("featured", true);
    if (data.search) q = q.ilike("name", `%${data.search}%`);
    if (data.collection) {
      const { data: col } = await supabaseAdmin.from("collections").select("id").eq("slug", data.collection).maybeSingle();
      if (col?.id) q = q.eq("collection_id", col.id);
    }
    if (data.category) {
      const { data: cat } = await supabaseAdmin.from("categories").select("id").eq("slug", data.category).maybeSingle();
      if (cat?.id) q = q.eq("category_id", cat.id);
    }
    if (data.sort === "price_asc") q = q.order("price", { ascending: true });
    else if (data.sort === "price_desc") q = q.order("price", { ascending: false });
    else if (data.sort === "popular") q = q.order("rating", { ascending: false });
    else q = q.order("created_at", { ascending: false });
    if (data.limit) q = q.limit(data.limit);
    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

export const getProductBySlug = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => z.object({ slug: z.string() }).parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: product, error } = await supabaseAdmin
      .from("products")
      .select("*, collection:collections(name, slug), category:categories(name, slug)")
      .eq("slug", data.slug)
      .eq("active", true)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!product) return null;

    const [sizes, testimonials] = await Promise.all([
      supabaseAdmin.from("bracelet_sizes").select("*").order("wrist_cm"),
      supabaseAdmin.from("testimonials").select("*").eq("active", true).order("created_at", { ascending: false }).limit(4),
    ]);

    return { ...product, sizes: sizes.data ?? [], testimonials: testimonials.data ?? [] };
  });

export const listCollections = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin.from("collections").select("*").order("name");
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const listCategories = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin.from("categories").select("*").order("name");
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const listTestimonials = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin.from("testimonials").select("*").eq("active", true).order("created_at", { ascending: false }).limit(6);
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const listFaq = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin.from("faq_items").select("*").eq("active", true).order("sort_order");
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const getStudioData = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const [materials, sizes, charms, charmCategories] = await Promise.all([
    supabaseAdmin.from("bracelet_materials").select("*").eq("active", true).order("base_price"),
    supabaseAdmin.from("bracelet_sizes").select("*").order("wrist_cm"),
    supabaseAdmin.from("charms").select("*").eq("active", true).order("name"),
    supabaseAdmin.from("charm_categories").select("*").order("name"),
  ]);
  return {
    materials: materials.data ?? [],
    sizes: sizes.data ?? [],
    charms: charms.data ?? [],
    charmCategories: charmCategories.data ?? [],
  };
});
