import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listMyOrders } from "@/lib/checkout.functions";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { formatVND } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/profile")({
  head: () => ({ meta: [{ title: "Tài khoản — Pure Floral & Co." }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const fn = useServerFn(listMyOrders);
  const ordersQ = useQuery({ queryKey: ["my-orders"], queryFn: () => fn({ data: {} as never }) });

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    toast.success("Đã đăng xuất");
    navigate({ to: "/auth", replace: true });
  }

  const recentOrders = (ordersQ.data ?? []).slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <header className="mb-10">
        <p className="eyebrow mb-3">Tài khoản</p>
        <h1 className="font-display text-4xl">Xin chào, {user?.user_metadata?.full_name ?? user?.email?.split("@")[0]}</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="surface-card p-6">
          <p className="text-[10px] uppercase tracking-widest text-forest/50 mb-2">Email</p>
          <p className="text-sm break-all">{user?.email}</p>
        </div>
        <div className="surface-card p-6">
          <p className="text-[10px] uppercase tracking-widest text-forest/50 mb-2">Đơn hàng</p>
          <p className="font-display text-2xl text-gold">{ordersQ.data?.length ?? 0}</p>
        </div>
        <div className="surface-card p-6">
          <p className="text-[10px] uppercase tracking-widest text-forest/50 mb-2">Thành viên từ</p>
          <p className="text-sm">{user?.created_at ? new Date(user.created_at).toLocaleDateString("vi-VN") : "—"}</p>
        </div>
      </div>

      <section className="surface-card p-8 mb-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-xl">Đơn hàng gần đây</h2>
          <Link to="/orders" className="text-xs uppercase tracking-widest text-gold hover:underline">Xem tất cả</Link>
        </div>
        {recentOrders.length === 0 ? (
          <p className="text-sm text-forest/60">Chưa có đơn hàng.</p>
        ) : (
          <ul className="divide-y divide-forest/10">
            {recentOrders.map((o) => (
              <li key={o.id}>
                <Link to="/orders/$code" params={{ code: o.order_code }} className="py-4 flex justify-between items-center hover:text-gold">
                  <span>
                    <span className="font-medium">{o.order_code}</span>
                    <span className="text-xs text-forest/50 ml-3">{new Date(o.created_at).toLocaleDateString("vi-VN")}</span>
                  </span>
                  <span className="font-display text-gold">{formatVND(o.total_amount)}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <button onClick={signOut} className="btn-outline">Đăng xuất</button>
    </div>
  );
}
