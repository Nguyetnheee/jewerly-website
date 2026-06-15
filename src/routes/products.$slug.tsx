import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery, useMutation, useQueryClient, queryOptions } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getProductBySlug, listProducts } from "@/lib/products.functions";
import { addProductToCart } from "@/lib/cart.functions";
import { formatVND } from "@/lib/format";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import { useState } from "react";
import { Star, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/products/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug} — Pure Floral & Co.` },
      { name: "description", content: "Chi tiết sản phẩm trang sức thủ công Pure Floral & Co." },
    ],
  }),
  loader: ({ context, params }) => {
    context.queryClient.ensureQueryData(
      queryOptions({ queryKey: ["product", params.slug], queryFn: () => getProductBySlug({ data: { slug: params.slug } }) }),
    );
    context.queryClient.ensureQueryData(
      queryOptions({ queryKey: ["products", "related"], queryFn: () => listProducts({ data: { limit: 4 } }) }),
    );
  },
  component: ProductDetail,
});

function ProductDetail() {
  const { slug } = Route.useParams();
  const navigate = useNavigate();
  const { session } = useAuth();
  const qc = useQueryClient();
  const [qty, setQty] = useState(1);

  const productQ = useSuspenseQuery(
    queryOptions({ queryKey: ["product", slug], queryFn: () => getProductBySlug({ data: { slug } }) }),
  );
  const relatedQ = useSuspenseQuery(
    queryOptions({ queryKey: ["products", "related"], queryFn: () => listProducts({ data: { limit: 4 } }) }),
  );

  const addFn = useServerFn(addProductToCart);
  const addM = useMutation({
    mutationFn: (productId: string) => addFn({ data: { productId, quantity: qty } }),
    onSuccess: () => {
      toast.success("Đã thêm vào giỏ hàng");
      qc.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (e: Error) => {
      if (!session) {
        toast.error("Vui lòng đăng nhập để thêm vào giỏ hàng");
        navigate({ to: "/auth", search: { redirect: `/products/${slug}` } as never });
      } else {
        toast.error(e.message);
      }
    },
  });

  const product = productQ.data as (typeof productQ.data & { sizes: any[]; testimonials: any[] }) | null;
  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-32 text-center">
        <h1 className="font-display text-3xl">Sản phẩm không tồn tại</h1>
        <Link to="/products" className="btn-primary mt-8 inline-flex">Quay lại</Link>
      </div>
    );
  }

  function handleAdd() {
    if (!session) { navigate({ to: "/auth", search: { redirect: `/products/${slug}` } as never }); return; }
    addM.mutate(product!.id);
  }

  const related = (relatedQ.data ?? []).filter((r) => r.id !== product.id).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-forest/50 mb-8">
        <Link to="/" className="hover:text-gold">Trang chủ</Link>
        <ChevronRight size={12} />
        <Link to="/products" className="hover:text-gold">Sản phẩm</Link>
        <ChevronRight size={12} />
        <span className="text-forest">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        {/* Gallery */}
        <div>
          <div className="aspect-[4/5] bg-cream-2 grid place-items-center overflow-hidden">
            {product.image_url ? (
              <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <span className="font-display italic text-7xl text-gold/30">PF</span>
            )}
          </div>
        </div>

        {/* Info */}
        <div>
            {product.collection && (
              <p className="eyebrow mb-4">Bộ sưu tập · {product.collection.name}</p>
            )}
            <h1 className="font-display text-4xl md:text-5xl mb-4">{product.name}</h1>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className={i < Math.round(Number(product.rating ?? 5)) ? "fill-gold text-gold" : "text-forest/20"} />
                ))}
              </div>
              <span className="text-xs text-forest/50">({product.rating})</span>
            </div>
            <p className="font-display text-3xl text-gold mb-8">{formatVND(product.price)}</p>

            <div className="prose prose-sm text-forest/70 leading-relaxed mb-6">
              <p>{product.description}</p>
            </div>

            {/* Sản phẩm đã bán / đánh giá */}
            <div className="flex items-center gap-4 mb-8 text-sm text-forest/60">
              <span>Đã bán: {product.stock_quantity}</span>
              <span>·</span>
              <span>Đánh giá: {product.rating}/5</span>
            </div>

            {/* Đánh giá khách */}
            {product.testimonials?.length > 0 && (
              <div className="mb-8">
                <h3 className="font-display italic text-base mb-3">Đánh giá từ khách hàng</h3>
                <ul className="space-y-2 text-sm">
                  {product.testimonials.map((t, idx) => (
                    <li key={idx} className="border-b border-forest/5 pb-2">
                      <span className="font-medium">{t.customer_name}</span>
                      <span className="text-gold ml-1">{"★".repeat(t.rating)}</span>
                      <p className="text-forest/60 mt-1">{t.content}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          {product.product_story && (
            <div className="border-l-2 border-gold pl-6 my-8">
              <p className="font-display italic text-lg text-forest/80">"{product.product_story}"</p>
            </div>
          )}

          <dl className="grid grid-cols-2 gap-4 text-sm mb-10 py-6 border-y border-forest/10">
            <div>
              <dt className="text-[10px] uppercase tracking-widest text-forest/50 mb-1">Chất liệu</dt>
              <dd>{product.material ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-widest text-forest/50 mb-1">Chứng nhận</dt>
              <dd>Bạc 925 · Vàng 18K · Đính kèm giấy chứng nhận</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-widest text-forest/50 mb-1">Tình trạng</dt>
              <dd>{product.stock_quantity > 0 ? `Còn ${product.stock_quantity} sản phẩm` : "Tạm hết"}</dd>
            </div>
          </dl>

          {/* Size nếu có */}
          {product.sizes?.length > 0 && (
            <div className="mb-10">
              <p className="text-[11px] uppercase tracking-widest text-forest/50 mb-3">Chọn size vòng</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s.id}
                    className="px-4 py-2.5 text-sm border border-forest/15 hover:border-forest/40 transition-colors"
                  >
                    {s.size_name} · {s.wrist_cm}cm
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity + actions */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border border-forest/20">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2.5">−</button>
              <span className="px-4 text-sm">{qty}</span>
              <button onClick={() => setQty(Math.min(10, qty + 1))} className="px-3 py-2.5">+</button>
            </div>
            <button
              onClick={handleAdd}
              disabled={addM.isPending || product.stock_quantity === 0}
              className="btn-primary flex-1"
            >
              {addM.isPending ? "Đang thêm..." : "Thêm vào giỏ hàng"}
            </button>
          </div>
          <Link to="/customize" className="btn-outline w-full">Tùy chỉnh sản phẩm</Link>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-24 pt-16 border-t border-forest/10">
          <h2 className="font-display text-3xl text-center mb-12">Có thể bạn cũng thích</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {related.map((r) => (
              <Link key={r.id} to="/products/$slug" params={{ slug: r.slug }} className="group">
                <div className="aspect-[3/4] bg-cream-2 mb-4 grid place-items-center overflow-hidden">
                  {r.image_url ? (
                    <img src={r.image_url} alt={r.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  ) : (
                    <span className="font-display italic text-3xl text-gold/30">PF</span>
                  )}
                </div>
                <h3 className="font-display italic text-base text-center">{r.name}</h3>
                <p className="text-[11px] text-gold uppercase tracking-widest text-center mt-1">{formatVND(r.price)}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
