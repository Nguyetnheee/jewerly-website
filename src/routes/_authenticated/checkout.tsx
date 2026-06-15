import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getCart } from "@/lib/cart.functions";
import { placeOrder, validateCoupon } from "@/lib/checkout.functions";
import { formatVND } from "@/lib/format";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/_authenticated/checkout")({
  head: () => ({ meta: [{ title: "Thanh toán — Pure Floral & Co." }] }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const fetchCart = useServerFn(getCart);
  const validateFn = useServerFn(validateCoupon);
  const placeFn = useServerFn(placeOrder);

  const cartQ = useQuery({ queryKey: ["cart"], queryFn: () => fetchCart({ data: {} as never }) });
  const items = cartQ.data ?? [];
  const subtotal = items.reduce((a, it) => a + Number(it.unit_price) * it.quantity, 0);
  const shipping = items.length ? 35000 : 0;

  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    email: user?.email ?? "",
    shippingAddress: "",
    paymentMethod: "cod" as "cod" | "mock_gateway",
  });
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);

  const validateM = useMutation({
    mutationFn: () => validateFn({ data: { code: couponInput, subtotal } }),
    onSuccess: (d) => { setAppliedCoupon({ code: d.code, discount: d.discount }); toast.success(`Áp dụng mã: −${formatVND(d.discount)}`); },
    onError: (e: Error) => toast.error(e.message),
  });
  const placeM = useMutation({
    mutationFn: () =>
      placeFn({
        data: {
          ...form,
          couponCode: appliedCoupon?.code ?? null,
        },
      }),
    onSuccess: (d) => { navigate({ to: "/order-success/$code", params: { code: d.orderCode } }); },
    onError: (e: Error) => toast.error(e.message),
  });

  if (cartQ.isLoading) return <div className="py-20 text-center">Đang tải...</div>;
  if (items.length === 0)
    return (
      <div className="py-20 text-center">
        <p className="text-forest/60 mb-6">Giỏ hàng trống.</p>
        <Link to="/products" className="btn-primary">Mua sắm</Link>
      </div>
    );

  const discount = appliedCoupon?.discount ?? 0;
  const total = subtotal - discount + shipping;

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <header className="text-center mb-12">
        <p className="eyebrow mb-3">Thanh toán</p>
        <h1 className="font-display text-4xl">Hoàn tất đơn hàng</h1>
      </header>

      <form
        onSubmit={(e) => { e.preventDefault(); placeM.mutate(); }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-10"
      >
        <div className="lg:col-span-2 space-y-8">
          <section className="surface-card p-8">
            <h2 className="font-display text-xl mb-6">Thông tin khách hàng</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label className="text-[11px] uppercase tracking-widest text-forest/60 mb-2 block">Họ tên</label>
                <input required minLength={2} value={form.customerName} onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                  className="w-full bg-transparent border-b border-forest/20 py-2 focus:outline-none focus:border-gold" />
              </div>
              <div>
                <label className="text-[11px] uppercase tracking-widest text-forest/60 mb-2 block">Số điện thoại</label>
                <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-transparent border-b border-forest/20 py-2 focus:outline-none focus:border-gold" />
              </div>
              <div>
                <label className="text-[11px] uppercase tracking-widest text-forest/60 mb-2 block">Email</label>
                <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-transparent border-b border-forest/20 py-2 focus:outline-none focus:border-gold" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-[11px] uppercase tracking-widest text-forest/60 mb-2 block">Địa chỉ giao hàng</label>
                <textarea required rows={2} value={form.shippingAddress} onChange={(e) => setForm({ ...form, shippingAddress: e.target.value })}
                  className="w-full bg-cream-2/50 p-3 focus:outline-none focus:ring-1 focus:ring-gold text-sm" />
              </div>
            </div>
          </section>

          <section className="surface-card p-8">
            <h2 className="font-display text-xl mb-6">Phương thức thanh toán</h2>
            <div className="space-y-3">
              {[
                { v: "cod", label: "Thanh toán khi nhận hàng (COD)", desc: "Trả tiền mặt khi nhận sản phẩm" },
                { v: "mock_gateway", label: "Cổng thanh toán (Demo)", desc: "Mô phỏng — sẽ tích hợp VNPay/Momo sau" },
              ].map((opt) => (
                <label key={opt.v} className={`flex items-start gap-3 p-4 border cursor-pointer ${form.paymentMethod === opt.v ? "border-forest bg-cream-2/40" : "border-forest/15"}`}>
                  <input type="radio" name="pm" value={opt.v} checked={form.paymentMethod === opt.v}
                    onChange={() => setForm({ ...form, paymentMethod: opt.v as never })} className="mt-1" />
                  <div>
                    <p className="text-sm font-medium">{opt.label}</p>
                    <p className="text-xs text-forest/50 mt-0.5">{opt.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </section>
        </div>

        <aside className="lg:col-span-1">
          <div className="surface-card p-6 sticky top-28">
            <h2 className="font-display text-xl mb-5">Đơn hàng</h2>
            <div className="space-y-2 text-sm text-forest/70 max-h-48 overflow-auto mb-4">
              {items.map((it) => (
                <div key={it.id} className="flex justify-between gap-2">
                  <span className="truncate">{it.customization ? "Vòng tay tùy chỉnh" : it.product?.name} × {it.quantity}</span>
                  <span className="shrink-0">{formatVND(Number(it.unit_price) * it.quantity)}</span>
                </div>
              ))}
            </div>

            {/* Coupon */}
            <div className="border-t border-forest/10 pt-4 mb-4">
              <label className="text-[11px] uppercase tracking-widest text-forest/60 mb-2 block">Mã giảm giá</label>
              <div className="flex gap-2">
                <input value={couponInput} onChange={(e) => setCouponInput(e.target.value)} placeholder="SEN10"
                  className="flex-1 bg-transparent border border-forest/15 px-3 py-2 text-sm focus:outline-none focus:border-gold" />
                <button type="button" disabled={!couponInput || validateM.isPending} onClick={() => validateM.mutate()} className="btn-outline !px-4 !py-2 !text-[10px]">
                  Áp dụng
                </button>
              </div>
              {appliedCoupon && <p className="text-xs text-gold mt-2">Đang áp: {appliedCoupon.code} (−{formatVND(appliedCoupon.discount)})</p>}
            </div>

            <div className="space-y-2 text-sm border-t border-forest/10 pt-4">
              <div className="flex justify-between"><span>Tạm tính</span><span>{formatVND(subtotal)}</span></div>
              {discount > 0 && <div className="flex justify-between text-gold"><span>Giảm giá</span><span>−{formatVND(discount)}</span></div>}
              <div className="flex justify-between"><span>Vận chuyển</span><span>{formatVND(shipping)}</span></div>
              <div className="flex justify-between pt-3 border-t border-forest/10 items-baseline">
                <span className="uppercase tracking-widest text-xs">Tổng</span>
                <span className="font-display text-2xl text-gold">{formatVND(total)}</span>
              </div>
            </div>

            <button type="submit" disabled={placeM.isPending} className="btn-primary w-full mt-6">
              {placeM.isPending ? "Đang xử lý..." : "Đặt hàng"}
            </button>
          </div>
        </aside>
      </form>
    </div>
  );
}
