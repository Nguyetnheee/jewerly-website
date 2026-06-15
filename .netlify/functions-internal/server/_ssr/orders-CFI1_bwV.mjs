import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as useServerFn } from "./router-DziuQjSF.mjs";
import { l as listMyOrders } from "./checkout.functions-BfWcxq_a.mjs";
import { f as formatVND } from "./format-CDwrkFkA.mjs";
import "../_libs/sonner.mjs";
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
import "./client-BZ4-XSxy.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./server-CkEUq1DS.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "./auth-middleware-CXv2x3dD.mjs";
import "../_libs/lucide-react.mjs";
import "../_libs/zod.mjs";
const STATUS_LABEL = {
  pending: "Chờ xác nhận",
  confirmed: "Đã xác nhận",
  handmade: "Đang chế tác",
  shipping: "Đang giao",
  completed: "Hoàn tất",
  cancelled: "Đã hủy"
};
const STATUSES = ["pending", "confirmed", "handmade", "shipping", "completed"];
function OrdersPage() {
  const fn = useServerFn(listMyOrders);
  const q = useQuery({
    queryKey: ["my-orders"],
    queryFn: () => fn({
      data: {}
    })
  });
  const orders = q.data ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-6 py-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mb-3", children: "Tài khoản" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl", children: "Đơn hàng của bạn" })
    ] }),
    q.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-forest/50", children: "Đang tải..." }) : orders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16 surface-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-forest/60 mb-6", children: "Bạn chưa có đơn hàng nào." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", className: "btn-primary", children: "Khám phá sản phẩm" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: orders.map((o) => {
      const stepIdx = STATUSES.indexOf(o.order_status);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/orders/$code", params: {
        code: o.order_code
      }, className: "block surface-card p-6 hover:border-gold transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap justify-between items-start gap-4 mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg", children: o.order_code }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-forest/50", children: new Date(o.created_at).toLocaleString("vi-VN") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl text-gold", children: formatVND(o.total_amount) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-widest text-forest/50 mt-1", children: o.payment_status === "paid" ? "Đã thanh toán" : "Chưa thanh toán" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-5 gap-1", children: STATUSES.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-1 mb-2 ${i <= stepIdx ? "bg-gold" : "bg-forest/10"}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-[9px] uppercase tracking-widest ${i <= stepIdx ? "text-gold" : "text-forest/40"}`, children: STATUS_LABEL[s] })
        ] }, s)) })
      ] }, o.id);
    }) })
  ] });
}
export {
  OrdersPage as component
};
