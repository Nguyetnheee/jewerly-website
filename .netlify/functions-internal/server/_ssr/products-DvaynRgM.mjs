import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { c as useQueryClient, u as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { R as Route$c, u as useAuth, b as listProducts, d as listCollections, e as listCategories, a as useServerFn, f as addProductToCart } from "./router-DziuQjSF.mjs";
import { f as formatVND } from "./format-CDwrkFkA.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { S as ShoppingBag } from "../_libs/lucide-react.mjs";
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
function ProductsPage() {
  const search = Route$c.useSearch();
  const navigate = Route$c.useNavigate();
  const [searchInput, setSearchInput] = reactExports.useState(search.q ?? "");
  const {
    session
  } = useAuth();
  const qc = useQueryClient();
  const productsQ = useQuery({
    queryKey: ["products", search],
    queryFn: () => listProducts({
      data: {
        search: search.q,
        collection: search.collection,
        category: search.category,
        sort: search.sort
      }
    })
  });
  const collectionsQ = useQuery({
    queryKey: ["collections"],
    queryFn: () => listCollections({
      data: {}
    })
  });
  const categoriesQ = useQuery({
    queryKey: ["categories"],
    queryFn: () => listCategories({
      data: {}
    })
  });
  function setParam(patch) {
    navigate({
      search: {
        ...search,
        ...patch
      }
    });
  }
  const addFn = useServerFn(addProductToCart);
  const addM = useMutation({
    mutationFn: (productId) => addFn({
      data: {
        productId,
        quantity: 1
      }
    }),
    onSuccess: () => {
      toast.success("Đã thêm vào giỏ hàng");
      qc.invalidateQueries({
        queryKey: ["cart"]
      });
    },
    onError: (e) => {
      if (e.message.includes("Unauthorized")) {
        toast.error("Vui lòng đăng nhập để thêm vào giỏ hàng");
        navigate({
          to: "/auth",
          search: {
            redirect: "/products"
          }
        });
      } else {
        toast.error(e.message);
      }
    }
  });
  function handleAddToCart(productId) {
    if (!session) {
      toast.error("Vui lòng đăng nhập để thêm vào giỏ hàng");
      navigate({
        to: "/auth",
        search: {
          redirect: "/products"
        }
      });
      return;
    }
    addM.mutate(productId);
  }
  const products = productsQ.data ?? [];
  const productsWithImages = products.filter((p) => !!p.image_url);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mb-3", children: "Bộ sưu tập" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl", children: "Tất cả sản phẩm" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-forest/10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: (e) => {
        e.preventDefault();
        setParam({
          q: searchInput || void 0
        });
      }, className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: searchInput, onChange: (e) => setSearchInput(e.target.value), placeholder: "Tìm kiếm...", className: "bg-transparent border-b border-forest/20 px-2 py-1.5 text-sm focus:outline-none focus:border-gold w-44" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-widest", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: search.collection ?? "", onChange: (e) => setParam({
          collection: e.target.value || void 0
        }), className: "bg-transparent border border-forest/15 px-3 py-2 text-[11px] uppercase tracking-widest", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Bộ sưu tập" }),
          (collectionsQ.data ?? []).map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c.slug, children: c.name }, c.id))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: search.category ?? "", onChange: (e) => setParam({
          category: e.target.value || void 0
        }), className: "bg-transparent border border-forest/15 px-3 py-2 text-[11px] uppercase tracking-widest", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Danh mục" }),
          (categoriesQ.data ?? []).map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c.slug, children: c.name }, c.id))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: search.sort ?? "newest", onChange: (e) => setParam({
          sort: e.target.value
        }), className: "bg-transparent border border-forest/15 px-3 py-2 text-[11px] uppercase tracking-widest", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "newest", children: "Mới nhất" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "popular", children: "Nổi bật" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "price_asc", children: "Giá ↑" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "price_desc", children: "Giá ↓" })
        ] })
      ] })
    ] }),
    productsQ.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-forest/50 py-20", children: "Đang tải..." }) : productsWithImages.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-forest/50 py-20", children: "Không tìm thấy sản phẩm phù hợp." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12", children: productsWithImages.map((p) => {
      const link = `/products/${p.slug}`;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: link, className: "block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-[3/4] bg-cream-2 mb-4 overflow-hidden grid place-items-center relative", children: [
            p.image_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.image_url, alt: p.name, loading: "lazy", className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display italic text-4xl text-gold/30", children: "PF" }),
            p.stock_quantity < 5 && p.stock_quantity > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-3 left-3 bg-lotus/80 text-forest text-[9px] uppercase tracking-widest px-2 py-1 font-bold", children: "Sắp hết" }) : null,
            p.stock_quantity === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-3 left-3 bg-forest text-cream text-[9px] uppercase tracking-widest px-2 py-1 font-bold", children: "Hết hàng" }) : null
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display italic text-lg text-center", children: p.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-forest/50 text-center mt-1", children: p.material }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] text-gold uppercase tracking-widest mt-2 text-center font-semibold", children: formatVND(p.price) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: link, className: "btn-outline flex-1 text-center text-[11px] py-2", children: "Xem chi tiết" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleAddToCart(p.id), disabled: addM.isPending || p.stock_quantity === 0, className: "btn-primary flex-1 text-[11px] py-2 flex items-center justify-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 14 }),
            addM.isPending ? "Đang thêm..." : "Thêm vào giỏ"
          ] })
        ] })
      ] }, p.id);
    }) })
  ] });
}
export {
  ProductsPage as component
};
