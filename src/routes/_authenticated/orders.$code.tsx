import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getMyOrderByCode } from "@/lib/checkout.functions";
import { formatVND } from "@/lib/format";

const STATUS_LABEL: Record<string, string> = {
  pending: "Chờ xác nhận",
  confirmed: "Đã xác nhận",
  handmade: "Đang chế tác",
  shipping: "Đang giao",
  completed: "Hoàn tất",
  cancelled: "Đã hủy",
};
const STATUSES = ["pending", "confirmed", "handmade", "shipping", "completed"] as const;

export const Route = createFileRoute("/_authenticated/orders/$code")({
  head: () => ({ meta: [{ title: "Chi tiết đơn hàng — Pure Floral & Co." }] }),
  component: OrderDetail,
});

function OrderDetail() {
  const { code } = Route.useParams();
  const fn = useServerFn(getMyOrderByCode);
  const q = useQuery({ queryKey: ["order", code], queryFn: () => fn({ data: { code } }) });
  const order = q.data;

  if (q.isLoading) return <div className="py-20 text-center text-forest/50">Đang tải...</div>;
  if (!order) return <div className="py-20 text-center">Không tìm thấy đơn.</div>;

  const stepIdx = STATUSES.indexOf(order.order_status as never);

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Link to="/orders" className="text-xs uppercase tracking-widest text-forest/60 hover:text-gold">← Đơn hàng</Link>
      <header className="my-6">
        <p className="eyebrow mb-2">Đơn hàng</p>
        <h1 className="font-display text-4xl">{order.order_code}</h1>
        <p className="text-xs text-forest/50 mt-1">{new Date(order.created_at).toLocaleString("vi-VN")}</p>
      </header>

      {/* Progress */}
      <div className="surface-card p-8 mb-6">
        <p className="text-[10px] uppercase tracking-widest text-forest/50 mb-5">Tiến trình</p>
        <div className="grid grid-cols-5 gap-1">
          {STATUSES.map((s, i) => (
            <div key={s} className="text-center">
              <div className={`h-1.5 mb-3 ${i <= stepIdx ? "bg-gold" : "bg-forest/10"}`} />
              <p className={`text-[10px] uppercase tracking-widest ${i <= stepIdx ? "text-gold" : "text-forest/40"}`}>
                {STATUS_LABEL[s]}
              </p>
            </div>
          ))}
        </div>
        {order.tracking_note && (
          <p className="text-sm text-forest/70 italic mt-6 border-t border-forest/10 pt-4">"{order.tracking_note}"</p>
        )}
      </div>

      {/* Items */}
      <div className="surface-card p-8 mb-6">
        <p className="text-[10px] uppercase tracking-widest text-forest/50 mb-5">Sản phẩm</p>
        <ul className="divide-y divide-forest/10">
          {order.items?.map((it) => (
            <li key={it.id} className="py-4">
              <div className="flex justify-between gap-4">
                <div>
                  <p className="font-medium">{it.item_name} × {it.quantity}</p>
                  {it.customization && (
                    <div className="text-xs text-forest/60 mt-1 space-y-0.5">
                      <p>Dây: {it.customization.material?.name ?? "—"} · Size: {it.customization.size?.size_name ?? "—"}</p>
                      {it.customization.charms && it.customization.charms.length > 0 && (
                        <p>Charm: {it.customization.charms.map((c) => c.charm?.name).filter(Boolean).join(", ")}</p>
                      )}
                      {it.customization.personal_note && <p className="italic">"{it.customization.personal_note}"</p>}
                    </div>
                  )}
                </div>
                <p className="font-display text-gold">{formatVND(it.subtotal)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Summary */}
      <div className="surface-card p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-forest/50 mb-3">Giao đến</p>
          <p className="text-sm">{order.customer_name}</p>
          <p className="text-sm text-forest/70">{order.phone} · {order.email}</p>
          <p className="text-sm text-forest/70 mt-2 whitespace-pre-line">{order.shipping_address}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-forest/50 mb-3">Thanh toán</p>
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between"><span className="text-forest/60">Tạm tính</span><span>{formatVND(order.subtotal)}</span></div>
            {Number(order.discount_amount) > 0 && (
              <div className="flex justify-between text-gold"><span>Giảm giá</span><span>−{formatVND(order.discount_amount)}</span></div>
            )}
            <div className="flex justify-between"><span className="text-forest/60">Vận chuyển</span><span>{formatVND(order.shipping_fee)}</span></div>
            <div className="flex justify-between pt-2 border-t border-forest/10">
              <span className="uppercase tracking-widest text-xs">Tổng</span>
              <span className="font-display text-xl text-gold">{formatVND(order.total_amount)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
