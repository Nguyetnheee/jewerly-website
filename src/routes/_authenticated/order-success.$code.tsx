import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getMyOrderByCode } from "@/lib/checkout.functions";
import { formatVND } from "@/lib/format";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/order-success/$code")({
  head: () => ({ meta: [{ title: "Đặt hàng thành công — Pure Floral & Co." }] }),
  component: SuccessPage,
});

function SuccessPage() {
  const { code } = Route.useParams();
  const fn = useServerFn(getMyOrderByCode);
  const orderQ = useQuery({ queryKey: ["order", code], queryFn: () => fn({ data: { code } }) });
  const order = orderQ.data;

  return (
    <div className="max-w-2xl mx-auto px-6 py-20 text-center">
      <CheckCircle2 size={64} className="mx-auto text-gold mb-6" />
      <p className="eyebrow mb-3">Cảm ơn bạn</p>
      <h1 className="font-display text-5xl mb-4">Đặt hàng thành công</h1>
      <p className="text-forest/60 mb-8">
        Mã đơn hàng của bạn là <strong className="text-forest">{code}</strong>. Chúng tôi sẽ liên hệ xác nhận trong vòng 24 giờ.
      </p>

      {order && (
        <div className="surface-card p-8 text-left mb-8">
          <div className="grid grid-cols-2 gap-4 text-sm mb-6">
            <div><dt className="text-[10px] uppercase tracking-widest text-forest/50">Tổng</dt><dd className="font-display text-xl text-gold">{formatVND(order.total_amount)}</dd></div>
            <div><dt className="text-[10px] uppercase tracking-widest text-forest/50">Thanh toán</dt><dd>{order.payment_method === "cod" ? "COD" : "Demo Gateway"}</dd></div>
            <div><dt className="text-[10px] uppercase tracking-widest text-forest/50">Người nhận</dt><dd>{order.customer_name}</dd></div>
            <div><dt className="text-[10px] uppercase tracking-widest text-forest/50">SĐT</dt><dd>{order.phone}</dd></div>
          </div>
          <div className="border-t border-forest/10 pt-5">
            <p className="text-[10px] uppercase tracking-widest text-forest/50 mb-3">Sản phẩm</p>
            <ul className="space-y-2 text-sm">
              {order.items?.map((it) => (
                <li key={it.id} className="flex justify-between">
                  <span>{it.item_name} × {it.quantity}</span>
                  <span>{formatVND(it.subtotal)}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-xs text-forest/60 mt-6 italic">
            Thời gian chế tác: 2–10 ngày tùy sản phẩm. Bạn sẽ nhận email cập nhật từng bước.
          </p>
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-3">
        <Link to="/orders" className="btn-primary">Theo dõi đơn hàng</Link>
        <Link to="/products" className="btn-outline">Tiếp tục mua sắm</Link>
      </div>
    </div>
  );
}
