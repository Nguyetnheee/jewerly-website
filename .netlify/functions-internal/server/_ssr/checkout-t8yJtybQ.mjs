import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { u as useAuth, a as useServerFn, o as getCart } from "./router-DziuQjSF.mjs";
import { v as validateCoupon, p as placeOrder } from "./checkout.functions-BfWcxq_a.mjs";
import { f as formatVND } from "./format-CDwrkFkA.mjs";
import { t as toast } from "../_libs/sonner.mjs";
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
function translateZodError(errorMessage) {
  try {
    const errors = JSON.parse(errorMessage);
    if (!Array.isArray(errors) || errors.length === 0) return "Vui lòng kiểm tra lại thông tin";
    const fieldLabels = {
      customerName: "Họ tên",
      phone: "Số điện thoại",
      email: "Email",
      shippingAddress: "Địa chỉ giao hàng"
    };
    const first = errors[0];
    const field = first.path ?? "";
    const label = fieldLabels[field] ?? field;
    if (first.message?.includes("at least")) {
      if (field === "shippingAddress") return "Địa chỉ giao hàng phải có ít nhất 8 ký tự";
      return `${label} phải có ít nhất 8 ký tự`;
    }
    if (first.message?.includes("valid")) {
      if (field === "email") return "Email không hợp lệ";
      if (field === "phone") return "Số điện thoại không hợp lệ";
    }
    return `${label} không hợp lệ`;
  } catch {
    return "Vui lòng kiểm tra lại thông tin";
  }
}
function CheckoutPage() {
  const navigate = useNavigate();
  const {
    user
  } = useAuth();
  const fetchCart = useServerFn(getCart);
  const validateFn = useServerFn(validateCoupon);
  const placeFn = useServerFn(placeOrder);
  const cartQ = useQuery({
    queryKey: ["cart"],
    queryFn: () => fetchCart({
      data: {}
    })
  });
  const items = cartQ.data ?? [];
  const subtotal = items.reduce((a, it) => a + Number(it.unit_price) * it.quantity, 0);
  const shipping = items.length ? 35e3 : 0;
  const [form, setForm] = reactExports.useState({
    customerName: "",
    phone: "",
    email: user?.email ?? "",
    shippingAddress: "",
    paymentMethod: "cod"
  });
  const [couponInput, setCouponInput] = reactExports.useState("");
  const [appliedCoupon, setAppliedCoupon] = reactExports.useState(null);
  const validateM = useMutation({
    mutationFn: () => validateFn({
      data: {
        code: couponInput,
        subtotal
      }
    }),
    onSuccess: (d) => {
      setAppliedCoupon({
        code: d.code,
        discount: d.discount
      });
      toast.success(`Áp dụng mã: −${formatVND(d.discount)}`);
    },
    onError: (e) => toast.error(translateZodError(e.message))
  });
  const placeM = useMutation({
    mutationFn: () => placeFn({
      data: {
        ...form,
        couponCode: appliedCoupon?.code ?? null
      }
    }),
    onSuccess: (d) => {
      navigate({
        to: "/order-success/$code",
        params: {
          code: d.orderCode
        }
      });
    },
    onError: (e) => toast.error(translateZodError(e.message))
  });
  if (cartQ.isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-20 text-center", children: "Đang tải..." });
  if (items.length === 0) return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-20 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-forest/60 mb-6", children: "Giỏ hàng trống." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", className: "btn-primary", children: "Mua sắm" })
  ] });
  const discount = appliedCoupon?.discount ?? 0;
  const total = subtotal - discount + shipping;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-6 py-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mb-3", children: "Thanh toán" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl", children: "Hoàn tất đơn hàng" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
      e.preventDefault();
      placeM.mutate();
    }, className: "grid grid-cols-1 lg:grid-cols-3 gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "surface-card p-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl mb-6", children: "Thông tin khách hàng" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] uppercase tracking-widest text-forest/60 mb-2 block", children: "Họ tên" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, minLength: 2, value: form.customerName, onChange: (e) => setForm({
                ...form,
                customerName: e.target.value
              }), className: "w-full bg-transparent border-b border-forest/20 py-2 focus:outline-none focus:border-gold" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] uppercase tracking-widest text-forest/60 mb-2 block", children: "Số điện thoại" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, value: form.phone, onChange: (e) => setForm({
                ...form,
                phone: e.target.value
              }), className: "w-full bg-transparent border-b border-forest/20 py-2 focus:outline-none focus:border-gold" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] uppercase tracking-widest text-forest/60 mb-2 block", children: "Email" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, type: "email", value: form.email, onChange: (e) => setForm({
                ...form,
                email: e.target.value
              }), className: "w-full bg-transparent border-b border-forest/20 py-2 focus:outline-none focus:border-gold" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] uppercase tracking-widest text-forest/60 mb-2 block", children: "Địa chỉ giao hàng" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { required: true, rows: 2, value: form.shippingAddress, onChange: (e) => setForm({
                ...form,
                shippingAddress: e.target.value
              }), className: "w-full bg-cream-2/50 p-3 focus:outline-none focus:ring-1 focus:ring-gold text-sm" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "surface-card p-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl mb-6", children: "Phương thức thanh toán" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [{
            v: "cod",
            label: "Thanh toán khi nhận hàng (COD)",
            desc: "Trả tiền mặt khi nhận sản phẩm"
          }, {
            v: "mock_gateway",
            label: "Cổng thanh toán (Demo)",
            desc: "Mô phỏng — sẽ tích hợp VNPay/Momo sau"
          }].map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: `flex items-start gap-3 p-4 border cursor-pointer ${form.paymentMethod === opt.v ? "border-forest bg-cream-2/40" : "border-forest/15"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "radio", name: "pm", value: opt.v, checked: form.paymentMethod === opt.v, onChange: () => setForm({
              ...form,
              paymentMethod: opt.v
            }), className: "mt-1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: opt.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-forest/50 mt-0.5", children: opt.desc })
            ] })
          ] }, opt.v)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-card p-6 sticky top-28", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl mb-5", children: "Đơn hàng" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 text-sm text-forest/70 max-h-48 overflow-auto mb-4", children: items.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "truncate", children: [
            it.customization ? "Vòng tay tùy chỉnh" : it.product?.name,
            " × ",
            it.quantity
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0", children: formatVND(Number(it.unit_price) * it.quantity) })
        ] }, it.id)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-forest/10 pt-4 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] uppercase tracking-widest text-forest/60 mb-2 block", children: "Mã giảm giá" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: couponInput, onChange: (e) => setCouponInput(e.target.value), placeholder: "SEN10", className: "flex-1 bg-transparent border border-forest/15 px-3 py-2 text-sm focus:outline-none focus:border-gold" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", disabled: !couponInput || validateM.isPending, onClick: () => validateM.mutate(), className: "btn-outline !px-4 !py-2 !text-[10px]", children: "Áp dụng" })
          ] }),
          appliedCoupon && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gold mt-2", children: [
            "Đang áp: ",
            appliedCoupon.code,
            " (−",
            formatVND(appliedCoupon.discount),
            ")"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm border-t border-forest/10 pt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Tạm tính" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatVND(subtotal) })
          ] }),
          discount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-gold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Giảm giá" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "−",
              formatVND(discount)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Vận chuyển" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatVND(shipping) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between pt-3 border-t border-forest/10 items-baseline", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "uppercase tracking-widest text-xs", children: "Tổng" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl text-gold", children: formatVND(total) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: placeM.isPending, className: "btn-primary w-full mt-6", children: placeM.isPending ? "Đang xử lý..." : "Đặt hàng" })
      ] }) })
    ] })
  ] });
}
export {
  CheckoutPage as component
};
