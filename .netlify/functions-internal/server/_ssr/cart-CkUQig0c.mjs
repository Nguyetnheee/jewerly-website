import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { c as useQueryClient, u as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { a as useServerFn, o as getCart, p as updateCartItem, r as removeCartItem } from "./router-DziuQjSF.mjs";
import { f as formatVND } from "./format-CDwrkFkA.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { c as Minus, P as Plus, T as Trash2 } from "../_libs/lucide-react.mjs";
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
function CartPage() {
  const qc = useQueryClient();
  const fetchCart = useServerFn(getCart);
  const updateFn = useServerFn(updateCartItem);
  const removeFn = useServerFn(removeCartItem);
  const cartQ = useQuery({
    queryKey: ["cart"],
    queryFn: () => fetchCart({
      data: {}
    })
  });
  const updateM = useMutation({
    mutationFn: (v) => updateFn({
      data: v
    }),
    onSuccess: () => qc.invalidateQueries({
      queryKey: ["cart"]
    }),
    onError: (e) => toast.error(e.message)
  });
  const removeM = useMutation({
    mutationFn: (id) => removeFn({
      data: {
        id
      }
    }),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["cart"]
      });
      toast.success("Đã xóa");
    }
  });
  const items = cartQ.data ?? [];
  const subtotal = items.reduce((a, it) => a + Number(it.unit_price) * it.quantity, 0);
  const shipping = items.length ? 35e3 : 0;
  if (cartQ.isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-20 text-center text-forest/50", children: "Đang tải..." });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-6 py-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mb-3", children: "Giỏ hàng" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl", children: "Giỏ hàng của bạn" })
    ] }),
    items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-forest/60 mb-8", children: "Giỏ hàng đang trống." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", className: "btn-primary", children: "Khám phá sản phẩm" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2 divide-y divide-forest/10", children: items.map((it) => {
        const isCustom = !!it.customization;
        const name = isCustom ? "Vòng tay tùy chỉnh" : it.product?.name ?? "Sản phẩm";
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-6 flex gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-24 bg-cream-2 grid place-items-center shrink-0", children: isCustom ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display italic text-2xl text-gold/60", children: "⌬" }) : it.product?.image_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: it.product.image_url, alt: name, className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display italic text-2xl text-gold/30", children: "PF" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg", children: name }),
            isCustom && it.customization && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-forest/60 mt-1 space-y-0.5", children: [
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
            ] }),
            !isCustom && it.product?.material && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-forest/60 mt-1", children: it.product.material }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center border border-forest/15", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => updateM.mutate({
                  id: it.id,
                  quantity: Math.max(1, it.quantity - 1)
                }), className: "px-2.5 py-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { size: 12 }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 text-sm", children: it.quantity }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => updateM.mutate({
                  id: it.id,
                  quantity: Math.min(10, it.quantity + 1)
                }), className: "px-2.5 py-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 12 }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => removeM.mutate(it.id), className: "text-forest/40 hover:text-destructive", "aria-label": "Xóa", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 14 }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg text-gold", children: formatVND(Number(it.unit_price) * it.quantity) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] uppercase tracking-widest text-forest/40 mt-1", children: [
              formatVND(it.unit_price),
              " / cái"
            ] })
          ] })
        ] }, it.id);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-card p-6 sticky top-28", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl mb-5", children: "Tóm tắt đơn hàng" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2.5 text-sm text-forest/70 mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Tạm tính" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatVND(subtotal) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Vận chuyển" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatVND(shipping) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-forest/10 pt-4 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-baseline", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm uppercase tracking-widest", children: "Tổng" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl text-gold", children: formatVND(subtotal + shipping) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/checkout", className: "btn-primary w-full", children: "Tiến hành thanh toán" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", className: "block text-center text-xs text-forest/50 hover:text-gold mt-4", children: "← Tiếp tục mua sắm" })
      ] }) })
    ] })
  ] });
}
export {
  CartPage as component
};
