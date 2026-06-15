import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { q as Route$1, a as useServerFn } from "./router-DziuQjSF.mjs";
import { g as getMyOrderByCode } from "./checkout.functions-BfWcxq_a.mjs";
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
function OrderDetail() {
  const {
    code
  } = Route$1.useParams();
  const fn = useServerFn(getMyOrderByCode);
  const q = useQuery({
    queryKey: ["order", code],
    queryFn: () => fn({
      data: {
        code
      }
    })
  });
  const order = q.data;
  if (q.isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-20 text-center text-forest/50", children: "Đang tải..." });
  if (!order) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-20 text-center", children: "Không tìm thấy đơn." });
  const stepIdx = STATUSES.indexOf(order.order_status);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-6 py-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/orders", className: "text-xs uppercase tracking-widest text-forest/60 hover:text-gold", children: "← Đơn hàng" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "my-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mb-2", children: "Đơn hàng" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl", children: order.order_code }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-forest/50 mt-1", children: new Date(order.created_at).toLocaleString("vi-VN") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-card p-8 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-widest text-forest/50 mb-5", children: "Tiến trình" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-5 gap-1", children: STATUSES.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-1.5 mb-3 ${i <= stepIdx ? "bg-gold" : "bg-forest/10"}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-[10px] uppercase tracking-widest ${i <= stepIdx ? "text-gold" : "text-forest/40"}`, children: STATUS_LABEL[s] })
      ] }, s)) }),
      order.tracking_note && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-forest/70 italic mt-6 border-t border-forest/10 pt-4", children: [
        '"',
        order.tracking_note,
        '"'
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-card p-8 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-widest text-forest/50 mb-5", children: "Sản phẩm" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-forest/10", children: order.items?.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium", children: [
            it.item_name,
            " × ",
            it.quantity
          ] }),
          it.customization && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-forest/60 mt-1 space-y-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              "Dây: ",
              it.customization.material?.name ?? "—",
              " · Size: ",
              it.customization.size?.size_name ?? "—"
            ] }),
            it.customization.charms && it.customization.charms.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              "Charm: ",
              it.customization.charms.map((c) => c.charm?.name).filter(Boolean).join(", ")
            ] }),
            it.customization.personal_note && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "italic", children: [
              '"',
              it.customization.personal_note,
              '"'
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-gold", children: formatVND(it.subtotal) })
      ] }) }, it.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-card p-8 grid grid-cols-1 md:grid-cols-2 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-widest text-forest/50 mb-3", children: "Giao đến" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: order.customer_name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-forest/70", children: [
          order.phone,
          " · ",
          order.email
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-forest/70 mt-2 whitespace-pre-line", children: order.shipping_address })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-widest text-forest/50 mb-3", children: "Thanh toán" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-forest/60", children: "Tạm tính" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatVND(order.subtotal) })
          ] }),
          Number(order.discount_amount) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-gold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Giảm giá" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "−",
              formatVND(order.discount_amount)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-forest/60", children: "Vận chuyển" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatVND(order.shipping_fee) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between pt-2 border-t border-forest/10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "uppercase tracking-widest text-xs", children: "Tổng" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-xl text-gold", children: formatVND(order.total_amount) })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  OrderDetail as component
};
