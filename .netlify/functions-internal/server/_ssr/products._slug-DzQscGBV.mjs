import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { c as useQueryClient, a as useSuspenseQuery, b as useMutation, q as queryOptions } from "../_libs/tanstack__react-query.mjs";
import { m as Route$6, u as useAuth, a as useServerFn, f as addProductToCart, n as getProductBySlug, b as listProducts } from "./router-DziuQjSF.mjs";
import { f as formatVND } from "./format-CDwrkFkA.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { C as ChevronRight, d as Star } from "../_libs/lucide-react.mjs";
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
function ProductDetail() {
  const {
    slug
  } = Route$6.useParams();
  const navigate = useNavigate();
  const {
    session
  } = useAuth();
  const qc = useQueryClient();
  const [qty, setQty] = reactExports.useState(1);
  const productQ = useSuspenseQuery(queryOptions({
    queryKey: ["product", slug],
    queryFn: () => getProductBySlug({
      data: {
        slug
      }
    })
  }));
  const relatedQ = useSuspenseQuery(queryOptions({
    queryKey: ["products", "related"],
    queryFn: () => listProducts({
      data: {
        limit: 4
      }
    })
  }));
  const addFn = useServerFn(addProductToCart);
  const addM = useMutation({
    mutationFn: (productId) => addFn({
      data: {
        productId,
        quantity: qty
      }
    }),
    onSuccess: () => {
      toast.success("Đã thêm vào giỏ hàng");
      qc.invalidateQueries({
        queryKey: ["cart"]
      });
    },
    onError: (e) => {
      if (!session) {
        toast.error("Vui lòng đăng nhập để thêm vào giỏ hàng");
        navigate({
          to: "/auth",
          search: {
            redirect: `/products/${slug}`
          }
        });
      } else {
        toast.error(e.message);
      }
    }
  });
  const product = productQ.data;
  if (!product) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-6 py-32 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl", children: "Sản phẩm không tồn tại" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", className: "btn-primary mt-8 inline-flex", children: "Quay lại" })
    ] });
  }
  function handleAdd() {
    if (!session) {
      navigate({
        to: "/auth",
        search: {
          redirect: `/products/${slug}`
        }
      });
      return;
    }
    addM.mutate(product.id);
  }
  const related = (relatedQ.data ?? []).filter((r) => r.id !== product.id).slice(0, 4);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex items-center gap-2 text-[11px] uppercase tracking-widest text-forest/50 mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-gold", children: "Trang chủ" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 12 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", className: "hover:text-gold", children: "Sản phẩm" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 12 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-forest", children: product.name })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/5] bg-cream-2 grid place-items-center overflow-hidden", children: product.image_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: product.image_url, alt: product.name, className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display italic text-7xl text-gold/30", children: "PF" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        product.collection && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "eyebrow mb-4", children: [
          "Bộ sưu tập · ",
          product.collection.name
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl mb-4", children: product.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5", children: Array.from({
            length: 5
          }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 14, className: i < Math.round(Number(product.rating ?? 5)) ? "fill-gold text-gold" : "text-forest/20" }, i)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-forest/50", children: [
            "(",
            product.rating,
            ")"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-3xl text-gold mb-8", children: formatVND(product.price) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "prose prose-sm text-forest/70 leading-relaxed mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: product.description }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-8 text-sm text-forest/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Đã bán: ",
            product.stock_quantity
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Đánh giá: ",
            product.rating,
            "/5"
          ] })
        ] }),
        product.testimonials?.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display italic text-base mb-3", children: "Đánh giá từ khách hàng" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 text-sm", children: product.testimonials.map((t, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "border-b border-forest/5 pb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: t.customer_name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold ml-1", children: "★".repeat(t.rating) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-forest/60 mt-1", children: t.content })
          ] }, idx)) })
        ] }),
        product.product_story && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-l-2 border-gold pl-6 my-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display italic text-lg text-forest/80", children: [
          '"',
          product.product_story,
          '"'
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "grid grid-cols-2 gap-4 text-sm mb-10 py-6 border-y border-forest/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-[10px] uppercase tracking-widest text-forest/50 mb-1", children: "Chất liệu" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: product.material ?? "—" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-[10px] uppercase tracking-widest text-forest/50 mb-1", children: "Chứng nhận" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: "Bạc 925 · Vàng 18K · Đính kèm giấy chứng nhận" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-[10px] uppercase tracking-widest text-forest/50 mb-1", children: "Tình trạng" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: product.stock_quantity > 0 ? `Còn ${product.stock_quantity} sản phẩm` : "Tạm hết" })
          ] })
        ] }),
        product.sizes?.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-widest text-forest/50 mb-3", children: "Chọn size vòng" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: product.sizes.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "px-4 py-2.5 text-sm border border-forest/15 hover:border-forest/40 transition-colors", children: [
            s.size_name,
            " · ",
            s.wrist_cm,
            "cm"
          ] }, s.id)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center border border-forest/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setQty(Math.max(1, qty - 1)), className: "px-3 py-2.5", children: "−" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-4 text-sm", children: qty }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setQty(Math.min(10, qty + 1)), className: "px-3 py-2.5", children: "+" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleAdd, disabled: addM.isPending || product.stock_quantity === 0, className: "btn-primary flex-1", children: addM.isPending ? "Đang thêm..." : "Thêm vào giỏ hàng" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/customize", className: "btn-outline w-full", children: "Tùy chỉnh sản phẩm" })
      ] })
    ] }),
    related.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-24 pt-16 border-t border-forest/10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl text-center mb-12", children: "Có thể bạn cũng thích" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8", children: related.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/products/$slug", params: {
        slug: r.slug
      }, className: "group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[3/4] bg-cream-2 mb-4 grid place-items-center overflow-hidden", children: r.image_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: r.image_url, alt: r.name, loading: "lazy", className: "w-full h-full object-cover group-hover:scale-105 transition-transform" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display italic text-3xl text-gold/30", children: "PF" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display italic text-base text-center", children: r.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-gold uppercase tracking-widest text-center mt-1", children: formatVND(r.price) })
      ] }, r.id)) })
    ] })
  ] });
}
export {
  ProductDetail as component
};
