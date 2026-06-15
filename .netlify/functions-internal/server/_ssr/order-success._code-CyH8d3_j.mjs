import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { v as Route, a as useServerFn } from "./router-DziuQjSF.mjs";
import { g as getMyOrderByCode } from "./checkout.functions-BfWcxq_a.mjs";
import { f as formatVND } from "./format-CDwrkFkA.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { e as CircleCheck } from "../_libs/lucide-react.mjs";
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
import "../_libs/zod.mjs";
function SuccessPage() {
  const {
    code
  } = Route.useParams();
  const fn = useServerFn(getMyOrderByCode);
  const orderQ = useQuery({
    queryKey: ["order", code],
    queryFn: () => fn({
      data: {
        code
      }
    })
  });
  const order = orderQ.data;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-6 py-20 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 64, className: "mx-auto text-gold mb-6" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mb-3", children: "Cảm ơn bạn" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl mb-4", children: "Đặt hàng thành công" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-forest/60 mb-8", children: [
      "Mã đơn hàng của bạn là ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-forest", children: code }),
      ". Chúng tôi sẽ liên hệ xác nhận trong vòng 24 giờ."
    ] }),
    order && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-card p-8 text-left mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 text-sm mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-[10px] uppercase tracking-widest text-forest/50", children: "Tổng" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "font-display text-xl text-gold", children: formatVND(order.total_amount) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-[10px] uppercase tracking-widest text-forest/50", children: "Thanh toán" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: order.payment_method === "cod" ? "COD" : "Demo Gateway" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-[10px] uppercase tracking-widest text-forest/50", children: "Người nhận" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: order.customer_name })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-[10px] uppercase tracking-widest text-forest/50", children: "SĐT" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: order.phone })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-forest/10 pt-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-widest text-forest/50 mb-3", children: "Sản phẩm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 text-sm", children: order.items?.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            it.item_name,
            " × ",
            it.quantity
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatVND(it.subtotal) })
        ] }, it.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-forest/60 mt-6 italic", children: "Thời gian chế tác: 2–10 ngày tùy sản phẩm. Bạn sẽ nhận email cập nhật từng bước." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap justify-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/orders", className: "btn-primary", children: "Theo dõi đơn hàng" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", className: "btn-outline", children: "Tiếp tục mua sắm" })
    ] })
  ] });
}
export {
  SuccessPage as component
};
