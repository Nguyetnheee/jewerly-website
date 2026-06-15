import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { c as useQueryClient, u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { u as useAuth, a as useServerFn } from "./router-DziuQjSF.mjs";
import { l as listMyOrders } from "./checkout.functions-BfWcxq_a.mjs";
import { s as supabase } from "./client-BZ4-XSxy.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { f as formatVND } from "./format-CDwrkFkA.mjs";
import "../_libs/seroval.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "./server-CkEUq1DS.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "./auth-middleware-CXv2x3dD.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/lucide-react.mjs";
import "../_libs/zod.mjs";
function ProfilePage() {
  const {
    user
  } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const fn = useServerFn(listMyOrders);
  const ordersQ = useQuery({
    queryKey: ["my-orders"],
    queryFn: () => fn({
      data: {}
    })
  });
  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    toast.success("Đã đăng xuất");
    navigate({
      to: "/auth",
      replace: true
    });
  }
  const recentOrders = (ordersQ.data ?? []).slice(0, 3);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-6 py-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mb-3", children: "Tài khoản" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl", children: [
        "Xin chào, ",
        user?.user_metadata?.full_name ?? user?.email?.split("@")[0]
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-card p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-widest text-forest/50 mb-2", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm break-all", children: user?.email })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-card p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-widest text-forest/50 mb-2", children: "Đơn hàng" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl text-gold", children: ordersQ.data?.length ?? 0 })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-card p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-widest text-forest/50 mb-2", children: "Thành viên từ" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: user?.created_at ? new Date(user.created_at).toLocaleDateString("vi-VN") : "—" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "surface-card p-8 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl", children: "Đơn hàng gần đây" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/orders", className: "text-xs uppercase tracking-widest text-gold hover:underline", children: "Xem tất cả" })
      ] }),
      recentOrders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-forest/60", children: "Chưa có đơn hàng." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-forest/10", children: recentOrders.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/orders/$code", params: {
        code: o.order_code
      }, className: "py-4 flex justify-between items-center hover:text-gold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: o.order_code }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-forest/50 ml-3", children: new Date(o.created_at).toLocaleDateString("vi-VN") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-gold", children: formatVND(o.total_amount) })
      ] }) }, o.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: signOut, className: "btn-outline", children: "Đăng xuất" })
  ] });
}
export {
  ProfilePage as component
};
