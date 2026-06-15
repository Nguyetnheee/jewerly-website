import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient, queryOptions } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { listProducts, listCollections, listCategories } from "@/lib/products.functions";
import { addProductToCart } from "@/lib/cart.functions";
import { formatVND } from "@/lib/format";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { toast } from "sonner";
import { ShoppingBag } from "lucide-react";

const searchSchema = z.object({
  q: z.string().optional(),
  collection: z.string().optional(),
  category: z.string().optional(),
  sort: z.enum(["newest", "price_asc", "price_desc", "popular"]).optional(),
});

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Sản phẩm — Pure Floral & Co." },
      { name: "description", content: "Khám phá bộ sưu tập vòng tay, charm sen và phụ kiện thủ công cao cấp." },
      { property: "og:title", content: "Sản phẩm — Pure Floral & Co." },
    ],
  }),
  validateSearch: searchSchema,
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(queryOptions({ queryKey: ["collections"], queryFn: () => listCollections({ data: {} as never }) }));
    context.queryClient.ensureQueryData(queryOptions({ queryKey: ["categories"], queryFn: () => listCategories({ data: {} as never }) }));
  },
  component: ProductsPage,
});

type ProductRow = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  stock_quantity: number;
  material?: string;
  image_url?: string | null;
  collection_id?: string | null;
  category_id?: string | null;
};

function ProductsPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const [searchInput, setSearchInput] = useState(search.q ?? "");
  const { session } = useAuth();
  const qc = useQueryClient();

  const productsQ = useQuery({
    queryKey: ["products", search],
    queryFn: () =>
      listProducts({
        data: {
          search: search.q,
          collection: search.collection,
          category: search.category,
          sort: search.sort,
        },
      }),
  });
  const collectionsQ = useQuery({ queryKey: ["collections"], queryFn: () => listCollections({ data: {} as never }) });
  const categoriesQ = useQuery({ queryKey: ["categories"], queryFn: () => listCategories({ data: {} as never }) });

  function setParam(patch: Partial<typeof search>) {
    navigate({ search: { ...search, ...patch } });
  }

  const addFn = useServerFn(addProductToCart);
  const addM = useMutation({
    mutationFn: (productId: string) => addFn({ data: { productId, quantity: 1 } }),
    onSuccess: () => {
      toast.success("Đã thêm vào giỏ hàng");
      qc.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (e: Error) => {
      if (e.message.includes("Unauthorized")) {
        toast.error("Vui lòng đăng nhập để thêm vào giỏ hàng");
        navigate({ to: "/auth", search: { redirect: "/products" } as never });
      } else {
        toast.error(e.message);
      }
    },
  });

  function handleAddToCart(productId: string) {
    if (!session) {
      toast.error("Vui lòng đăng nhập để thêm vào giỏ hàng");
      navigate({ to: "/auth", search: { redirect: "/products" } as never });
      return;
    }
    addM.mutate(productId);
  }

  const products = (productsQ.data ?? []) as ProductRow[];
  const productsWithImages = products.filter((p) => !!p.image_url);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <header className="text-center mb-12">
        <p className="eyebrow mb-3">Bộ sưu tập</p>
        <h1 className="font-display text-5xl">Tất cả sản phẩm</h1>
      </header>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-forest/10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setParam({ q: searchInput || undefined });
          }}
          className="flex items-center gap-2"
        >
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Tìm kiếm..."
            className="bg-transparent border-b border-forest/20 px-2 py-1.5 text-sm focus:outline-none focus:border-gold w-44"
          />
        </form>
        <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-widest">
          <select
            value={search.collection ?? ""}
            onChange={(e) => setParam({ collection: e.target.value || undefined })}
            className="bg-transparent border border-forest/15 px-3 py-2 text-[11px] uppercase tracking-widest"
          >
            <option value="">Bộ sưu tập</option>
            {(collectionsQ.data ?? []).map((c) => (
              <option key={c.id} value={c.slug}>{c.name}</option>
            ))}
          </select>
          <select
            value={search.category ?? ""}
            onChange={(e) => setParam({ category: e.target.value || undefined })}
            className="bg-transparent border border-forest/15 px-3 py-2 text-[11px] uppercase tracking-widest"
          >
            <option value="">Danh mục</option>
            {(categoriesQ.data ?? []).map((c) => (
              <option key={c.id} value={c.slug}>{c.name}</option>
            ))}
          </select>
          <select
            value={search.sort ?? "newest"}
            onChange={(e) => setParam({ sort: e.target.value as never })}
            className="bg-transparent border border-forest/15 px-3 py-2 text-[11px] uppercase tracking-widest"
          >
            <option value="newest">Mới nhất</option>
            <option value="popular">Nổi bật</option>
            <option value="price_asc">Giá ↑</option>
            <option value="price_desc">Giá ↓</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      {productsQ.isLoading ? (
        <p className="text-center text-forest/50 py-20">Đang tải...</p>
      ) : productsWithImages.length === 0 ? (
        <p className="text-center text-forest/50 py-20">Không tìm thấy sản phẩm phù hợp.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {productsWithImages.map((p) => {
            const link = `/products/${p.slug}`;
            return (
              <div key={p.id} className="group">
                <Link to={link} className="block">
                  <div className="aspect-[3/4] bg-cream-2 mb-4 overflow-hidden grid place-items-center relative">
                    {p.image_url ? (
                      <img src={p.image_url} alt={p.name} loading="lazy" className="w-full h-full object-cover" />
                    ) : (
                      <span className="font-display italic text-4xl text-gold/30">PF</span>
                    )}
                    {p.stock_quantity < 5 && p.stock_quantity > 0 ? (
                      <span className="absolute top-3 left-3 bg-lotus/80 text-forest text-[9px] uppercase tracking-widest px-2 py-1 font-bold">
                        Sắp hết
                      </span>
                    ) : null}
                    {p.stock_quantity === 0 ? (
                      <span className="absolute top-3 left-3 bg-forest text-cream text-[9px] uppercase tracking-widest px-2 py-1 font-bold">
                        Hết hàng
                      </span>
                    ) : null}
                  </div>
                  <h3 className="font-display italic text-lg text-center">{p.name}</h3>
                  <p className="text-[11px] text-forest/50 text-center mt-1">{p.material}</p>
                  <p className="text-[12px] text-gold uppercase tracking-widest mt-2 text-center font-semibold">{formatVND(p.price)}</p>
                </Link>
                <div className="flex gap-2 mt-3">
                  <Link to={link} className="btn-outline flex-1 text-center text-[11px] py-2">
                    Xem chi tiết
                  </Link>
                  <button
                    onClick={() => handleAddToCart(p.id)}
                    disabled={addM.isPending || p.stock_quantity === 0}
                    className="btn-primary flex-1 text-[11px] py-2 flex items-center justify-center gap-1"
                  >
                    <ShoppingBag size={14} />
                    {addM.isPending ? "Đang thêm..." : "Thêm vào giỏ"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
