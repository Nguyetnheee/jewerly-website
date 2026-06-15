import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { i as featuredOpts, j as collectionsOpts, t as testimonialsOpts, k as faqOpts } from "./router-DziuQjSF.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { f as formatVND } from "./format-CDwrkFkA.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { d as Star } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
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
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "./auth-middleware-CXv2x3dD.mjs";
import "../_libs/zod.mjs";
const heroImg = "/assets/hero-bracelet-Dl_czurD.jpg";
const studioImg = "/assets/studio-bench-DzpCc6Fq.jpg";
const charmsImg = "/assets/charms-row-CKY7yHTC.jpg";
function HomePage() {
  const {
    data: products
  } = useSuspenseQuery(featuredOpts);
  const {
    data: collections
  } = useSuspenseQuery(collectionsOpts);
  const {
    data: testimonials
  } = useSuspenseQuery(testimonialsOpts);
  const {
    data: faq
  } = useSuspenseQuery(faqOpts);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "pt-12 pb-20 px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-5 animate-fade-up", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mb-6", children: "Chế tác thủ công tại Việt Nam" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-5xl md:text-6xl leading-[1.05] mb-8", children: [
          "Đánh thức ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic font-normal", children: "vẻ đẹp tâm hồn" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "qua từng đóa sen"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-forest/70 leading-relaxed mb-10 max-w-sm", children: "Trang sức thủ công cao cấp lấy cảm hứng từ biểu tượng hoa sen Việt, mang đậm dấu ấn cá nhân trong từng mắt xích." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", className: "btn-primary", children: "Khám phá ngay" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/customize", className: "btn-outline", children: "Tự thiết kế" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-7 relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroImg, alt: "Vòng tay sen vàng thủ công", width: 1024, height: 1280, className: "w-full aspect-[4/5] object-cover shadow-2xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block absolute -bottom-10 -left-10 bg-lotus/30 p-10 backdrop-blur-xl max-w-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display italic text-2xl text-forest/90", children: '"Mỗi chiếc vòng là một câu chuyện riêng biệt."' }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 bg-cream-2/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-6 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mb-6", children: "Câu chuyện thương hiệu" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-4xl md:text-5xl mb-8", children: [
        "Hồn sen trong từng ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic", children: "đường nét vàng" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-forest/70 leading-relaxed text-lg", children: "Lấy cảm hứng từ vẻ đẹp kiên cường và thanh khiết của quốc hoa Việt Nam, mỗi tác phẩm của Pure Floral & Co. là một nghi lễ nhỏ — nơi nghệ nhân, vật liệu và người đeo cùng nhau viết nên một câu chuyện riêng." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/about", className: "inline-block mt-8 text-sm font-semibold border-b border-forest pb-1", children: "Tìm hiểu nguồn gốc →" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col md:flex-row md:justify-between md:items-end mb-12 gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mb-3", children: "Bộ sưu tập" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl", children: "Những dòng sản phẩm biểu tượng" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-6", children: collections.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/products", search: {
        collection: c.slug
      }, className: "group block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square surface-card overflow-hidden bg-cream-2 mb-4 group-hover:scale-[1.01] transition-transform", children: c.image_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: c.image_url, alt: c.name, className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display italic text-3xl text-forest/30", children: String(i + 1).padStart(2, "0") }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg group-hover:text-gold transition-colors", children: c.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-forest/50 mt-1", children: c.description })
      ] }, c.id)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 bg-forest text-cream", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: studioImg, alt: "Xưởng chế tác", loading: "lazy", width: 1024, height: 1024, className: "aspect-square w-full object-cover" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gold text-[10px] uppercase tracking-[0.3em] font-semibold mb-4", children: "Xưởng riêng" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl mb-6", children: "Xưởng chế tác riêng bạn" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cream/60 leading-relaxed mb-12", children: "Chọn từ hơn 24 mẫu charm sen, đá quý và các loại dây vòng khác nhau để tạo nên món quà ý nghĩa nhất cho chính bạn hoặc người thương." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-5", children: [["01.", "Chọn dây cơ bản"], ["02.", "Thêm charm & biểu tượng"], ["03.", "Khắc tên cá nhân"]].map(([n, l]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6 border-b border-white/10 pb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold font-display italic text-2xl", children: n }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "uppercase tracking-widest text-sm", children: l })
        ] }, n)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/customize", className: "btn-gold mt-12 w-full", children: "Bắt đầu thiết kế ngay" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-end mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mb-3", children: "Sản phẩm nổi bật" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl", children: "Charm Hoa Sen" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", className: "text-[10px] uppercase tracking-widest border-b border-forest pb-1 font-bold hover:text-gold", children: "Xem tất cả" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8", children: products.slice(0, 4).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/products/$slug", params: {
        slug: p.slug
      }, className: "group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[3/4] bg-cream-2 mb-4 overflow-hidden grid place-items-center", children: p.image_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.image_url, alt: p.name, loading: "lazy", className: "w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display italic text-4xl text-gold/30", children: "PF" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display italic text-lg text-center", children: p.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] text-gold uppercase tracking-widest mt-1 text-center", children: formatVND(p.price) })
      ] }, p.id)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 bg-cream-2/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mb-3 text-center", children: "Khách hàng" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl text-center mb-16", children: "Lời cảm ơn từ những trái tim" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: testimonials.slice(0, 3).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-card p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5 mb-4", children: Array.from({
          length: t.rating
        }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 14, className: "fill-gold text-gold" }, i)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-forest/80 leading-relaxed italic mb-6", children: [
          '"',
          t.content,
          '"'
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] uppercase tracking-widest font-bold text-forest/60", children: [
          "— ",
          t.customer_name
        ] })
      ] }, t.id)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: charmsImg, alt: "Bộ sưu tập charm", loading: "lazy", width: 1280, height: 800, className: "w-full object-cover" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mb-3 text-center", children: "Câu hỏi thường gặp" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl text-center mb-12", children: "Mọi điều bạn cần biết" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-forest/10", children: faq.slice(0, 5).map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { className: "py-6 group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("summary", { className: "flex justify-between items-center cursor-pointer list-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg", children: item.question }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold text-2xl group-open:rotate-45 transition-transform", children: "+" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-forest/70 leading-relaxed mt-4", children: item.answer })
      ] }, item.id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mt-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/support", className: "btn-outline", children: "Xem tất cả" }) })
    ] }) })
  ] });
}
export {
  HomePage as component
};
