import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listMyOrders } from "@/lib/checkout.functions";
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

export const Route = createFileRoute("/_authenticated/orders")({
  head: () => ({ meta: [{ title: "Đơn hàng — Pure Floral & Co." }] }),
  component: OrdersPage,
});

function OrdersPage() {
  const fn = useServerFn(listMyOrders);
  const q = useQuery({ queryKey: ["my-orders"], queryFn: () => fn({ data: {} as never }) });
  const orders = q.data ?? [];

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <header className="mb-10">
        <p className="eyebrow mb-3">Tài khoản</p>
        <h1 className="font-display text-4xl">Đơn hàng của bạn</h1>
      </header>

      {q.isLoading ? (
        <p className="text-forest/50">Đang tải...</p>
      ) : orders.length === 0 ? (
        <div className="text-center py-16 surface-card">
          <p className="text-forest/60 mb-6">Bạn chưa có đơn hàng nào.</p>
          <Link to="/products" className="btn-primary">Khám phá sản phẩm</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => {
            const stepIdx = STATUSES.indexOf(o.order_status as never);
            return (
              <Link
                key={o.id}
                to="/orders/$code"
                params={{ code: o.order_code }}
                className="block surface-card p-6 hover:border-gold transition-colors"
              >
                <div className="flex flex-wrap justify-between items-start gap-4 mb-5">
                  <div>
                    <p className="font-display text-lg">{o.order_code}</p>
                    <p className="text-xs text-forest/50">{new Date(o.created_at).toLocaleString("vi-VN")}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-xl text-gold">{formatVND(o.total_amount)}</p>
                    <p className="text-[10px] uppercase tracking-widest text-forest/50 mt-1">
                      {o.payment_status === "paid" ? "Đã thanh toán" : "Chưa thanh toán"}
                    </p>
                  </div>
                </div>

                {/* Lotus progress */}
                <div className="grid grid-cols-5 gap-1">
                  {STATUSES.map((s, i) => (
                    <div key={s} className="text-center">
                      <div className={`h-1 mb-2 ${i <= stepIdx ? "bg-gold" : "bg-forest/10"}`} />
                      <p className={`text-[9px] uppercase tracking-widest ${i <= stepIdx ? "text-gold" : "text-forest/40"}`}>
                        {STATUS_LABEL[s]}
                      </p>
                    </div>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
