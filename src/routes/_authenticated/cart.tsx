import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getCart, updateCartItem, removeCartItem } from "@/lib/cart.functions";
import { formatVND } from "@/lib/format";
import { Trash2, Minus, Plus } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/cart")({
  head: () => ({ meta: [{ title: "Giỏ hàng — Pure Floral & Co." }] }),
  component: CartPage,
});

function CartPage() {
  const qc = useQueryClient();
  const fetchCart = useServerFn(getCart);
  const updateFn = useServerFn(updateCartItem);
  const removeFn = useServerFn(removeCartItem);

  const cartQ = useQuery({
    queryKey: ["cart"],
    queryFn: () => fetchCart({ data: {} as never }),
  });

  const updateM = useMutation({
    mutationFn: (v: { id: string; quantity: number }) => updateFn({ data: v }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cart"] }),
    onError: (e: Error) => toast.error(e.message),
  });
  const removeM = useMutation({
    mutationFn: (id: string) => removeFn({ data: { id } }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["cart"] }); toast.success("Đã xóa"); },
  });

  const items = cartQ.data ?? [];
  const subtotal = items.reduce((a, it) => a + Number(it.unit_price) * it.quantity, 0);
  const shipping = items.length ? 35000 : 0;

  if (cartQ.isLoading) return <div className="py-20 text-center text-forest/50">Đang tải...</div>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <header className="text-center mb-12">
        <p className="eyebrow mb-3">Giỏ hàng</p>
        <h1 className="font-display text-4xl">Giỏ hàng của bạn</h1>
      </header>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-forest/60 mb-8">Giỏ hàng đang trống.</p>
          <Link to="/products" className="btn-primary">Khám phá sản phẩm</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 divide-y divide-forest/10">
            {items.map((it) => {
              const isCustom = !!it.customization;
              const name = isCustom ? "Vòng tay tùy chỉnh" : it.product?.name ?? "Sản phẩm";
              return (
                <div key={it.id} className="py-6 flex gap-5">
                  <div className="size-24 bg-cream-2 grid place-items-center shrink-0">
                    {isCustom ? (
                      <span className="font-display italic text-2xl text-gold/60">⌬</span>
                    ) : it.product?.image_url ? (
                      <img src={it.product.image_url} alt={name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="font-display italic text-2xl text-gold/30">PF</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-lg">{name}</h3>
                    {isCustom && it.customization && (
                      <div className="text-xs text-forest/60 mt-1 space-y-0.5">
                        <p>Dây: {it.customization.material?.name ?? "—"} · Size: {it.customization.size?.size_name ?? "—"}</p>
                        {it.customization.charms && it.customization.charms.length > 0 && (
                          <p>Charm: {it.customization.charms.map((c) => c.charm?.name).filter(Boolean).join(", ")}</p>
                        )}
                        {it.customization.personal_note && <p className="italic">"{it.customization.personal_note}"</p>}
                      </div>
                    )}
                    {!isCustom && it.product?.material && (
                      <p className="text-xs text-forest/60 mt-1">{it.product.material}</p>
                    )}
                    <div className="mt-4 flex items-center gap-4">
                      <div className="flex items-center border border-forest/15">
                        <button
                          onClick={() => updateM.mutate({ id: it.id, quantity: Math.max(1, it.quantity - 1) })}
                          className="px-2.5 py-1.5"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-3 text-sm">{it.quantity}</span>
                        <button
                          onClick={() => updateM.mutate({ id: it.id, quantity: Math.min(10, it.quantity + 1) })}
                          className="px-2.5 py-1.5"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeM.mutate(it.id)}
                        className="text-forest/40 hover:text-destructive"
                        aria-label="Xóa"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-display text-lg text-gold">{formatVND(Number(it.unit_price) * it.quantity)}</p>
                    <p className="text-[10px] uppercase tracking-widest text-forest/40 mt-1">{formatVND(it.unit_price)} / cái</p>
                  </div>
                </div>
              );
            })}
          </div>

          <aside className="lg:col-span-1">
            <div className="surface-card p-6 sticky top-28">
              <h2 className="font-display text-xl mb-5">Tóm tắt đơn hàng</h2>
              <div className="space-y-2.5 text-sm text-forest/70 mb-5">
                <div className="flex justify-between"><span>Tạm tính</span><span>{formatVND(subtotal)}</span></div>
                <div className="flex justify-between"><span>Vận chuyển</span><span>{formatVND(shipping)}</span></div>
              </div>
              <div className="border-t border-forest/10 pt-4 mb-6">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm uppercase tracking-widest">Tổng</span>
                  <span className="font-display text-2xl text-gold">{formatVND(subtotal + shipping)}</span>
                </div>
              </div>
              <Link to="/checkout" className="btn-primary w-full">Tiến hành thanh toán</Link>
              <Link to="/products" className="block text-center text-xs text-forest/50 hover:text-gold mt-4">
                ← Tiếp tục mua sắm
              </Link>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
