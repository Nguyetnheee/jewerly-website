import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider, q as queryOptions, u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { S as redirect, m as isRedirect } from "../_libs/tanstack__router-core.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { T as Toaster } from "../_libs/sonner.mjs";
import { s as supabase } from "./client-BZ4-XSxy.mjs";
import { c as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./server-CkEUq1DS.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CXv2x3dD.mjs";
import { X, M as Menu, S as ShoppingBag, U as User, H as House, a as Sparkles } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType, e as enumType, n as numberType, b as booleanType, a as arrayType } from "../_libs/zod.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
function useServerFn(serverFn) {
  const router2 = useRouter();
  return reactExports.useCallback(async (...args) => {
    try {
      const res = await serverFn(...args);
      if (isRedirect(res)) throw res;
      return res;
    } catch (err) {
      if (isRedirect(err)) {
        err.options._fromLocation = router2.stores.location.get();
        return router2.navigate(router2.resolveRedirect(err).options);
      }
      throw err;
    }
  }, [router2, serverFn]);
}
const appCss = "/assets/styles-aY8EN9jX.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
function useAuth() {
  const [session, setSession] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess);
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);
  return { session, user: session?.user, loading };
}
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const getCart = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("6f602d242a211117c1c6bdd7e559c6a568fab6fb032c40b2131f45c58acaed5a"));
const addProductToCart = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  productId: stringType().uuid(),
  quantity: numberType().int().min(1).max(20).default(1)
}).parse(input)).handler(createSsrRpc("9de945013b6610084706a3967af08574aac1fc77d63437cb5bffa7714a5726c9"));
const updateCartItem = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  id: stringType().uuid(),
  quantity: numberType().int().min(1).max(20)
}).parse(input)).handler(createSsrRpc("8ee2877abc326cd4cce0a8c31341bed607d66ac290d21cd8d4f45868e9cf2ed7"));
const removeCartItem = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  id: stringType().uuid()
}).parse(input)).handler(createSsrRpc("abc007195f92a5377b70dde90a4465315a61f009177f5672779e0f24fc7fd1c6"));
const saveCustomDesign = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  baseMaterialId: stringType().uuid(),
  sizeId: stringType().uuid(),
  cordColor: stringType().max(40).optional().nullable(),
  personalNote: stringType().max(120).optional().nullable(),
  charms: arrayType(objectType({
    charmId: stringType().uuid(),
    quantity: numberType().int().min(1).max(10)
  })).max(20)
}).parse(input)).handler(createSsrRpc("659167231f60bd1ad19ce2d40f4476e725faabff9a9f488f2fa06db75e35ea5d"));
const NAV = [
  { to: "/", label: "Trang chủ" },
  { to: "/products", label: "Sản phẩm" },
  { to: "/customize", label: "Tự thiết kế" },
  { to: "/about", label: "Câu chuyện" },
  { to: "/support", label: "Hỗ trợ" }
];
function SiteHeader() {
  const [open, setOpen] = reactExports.useState(false);
  const { session } = useAuth();
  const fetchCart = useServerFn(getCart);
  const cartQ = useQuery({
    queryKey: ["cart", session?.user?.id],
    queryFn: () => fetchCart({ data: {} }),
    enabled: !!session
  });
  const cartCount = (cartQ.data ?? []).reduce((acc, it) => acc + it.quantity, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "fixed top-0 inset-x-0 z-50 bg-cream/85 backdrop-blur-md border-b border-forest/5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden lg:flex gap-7 text-[11px] uppercase tracking-[0.18em] font-medium flex-1", children: NAV.slice(1, 3).map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: n.to, className: "text-forest/80 hover:text-lotus transition-colors", activeProps: { className: "text-forest" }, children: n.label }, n.to)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "lg:hidden p-2 -ml-2",
          "aria-label": "Mở menu",
          onClick: () => setOpen((o) => !o),
          children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 20 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { size: 20 })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "font-display text-xl md:text-2xl font-bold tracking-tight text-forest text-center", children: [
        "PURE FLORAL ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-light italic text-gold", children: "& Co." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden lg:flex gap-7 text-[11px] uppercase tracking-[0.18em] font-medium flex-1 justify-end", children: [
        NAV.slice(3).map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: n.to, className: "text-forest/80 hover:text-lotus transition-colors", activeProps: { className: "text-forest" }, children: n.label }, n.to)),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/cart", className: "text-forest/80 hover:text-lotus transition-colors flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 14 }),
          " Giỏ (",
          cartCount,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: session ? "/profile" : "/auth", className: "text-forest/80 hover:text-lotus transition-colors flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 14 }),
          " ",
          session ? "Tôi" : "Đăng nhập"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex lg:hidden items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/cart", className: "relative p-2", "aria-label": "Giỏ hàng", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 20 }),
          cartCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-0.5 -right-0.5 size-4 rounded-full bg-lotus text-forest text-[10px] grid place-items-center font-bold", children: cartCount })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: session ? "/profile" : "/auth", className: "p-2", "aria-label": "Tài khoản", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 20 }) })
      ] })
    ] }),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:hidden bg-cream border-t border-forest/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "px-6 py-6 flex flex-col gap-5 text-sm font-medium uppercase tracking-widest", children: NAV.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: n.to,
        onClick: () => setOpen(false),
        className: "text-forest hover:text-lotus",
        children: n.label
      },
      n.to
    )) }) })
  ] });
}
function SiteFooter() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "border-t border-forest/5 bg-cream text-forest", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 py-20 grid grid-cols-2 md:grid-cols-4 gap-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 md:col-span-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xl font-display font-bold tracking-tight mb-6", children: [
          "PURE FLORAL ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-light italic text-gold", children: "& Co." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs leading-loose text-forest/60", children: [
          "Nghệ thuật trang sức handmade Việt Nam. ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "Bản sắc trong từng chi tiết nhỏ nhất."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.3em] text-gold mt-6", children: "Crafted with Meaning, Worn with Elegance" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "uppercase tracking-[0.2em] font-bold mb-2 text-[11px]", children: "Mua sắm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", className: "text-forest/70 hover:text-gold", children: "Tất cả sản phẩm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", search: { category: "vong-tay" }, className: "text-forest/70 hover:text-gold", children: "Vòng tay" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", search: { category: "charm-sen" }, className: "text-forest/70 hover:text-gold", children: "Charm sen" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/customize", className: "text-forest/70 hover:text-gold", children: "Tự thiết kế" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "uppercase tracking-[0.2em] font-bold mb-2 text-[11px]", children: "Hỗ trợ" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/about", className: "text-forest/70 hover:text-gold", children: "Về chúng tôi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/support", className: "text-forest/70 hover:text-gold", children: "Liên hệ" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/support", className: "text-forest/70 hover:text-gold", children: "Câu hỏi thường gặp" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/support", className: "text-forest/70 hover:text-gold", children: "Chính sách bảo hành" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 col-span-2 md:col-span-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "uppercase tracking-[0.2em] font-bold text-[11px]", children: "Theo dõi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-forest/60", children: "Đăng ký nhận bản tin để cập nhật bộ sưu tập mới và ưu đãi riêng." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "relative", onSubmit: (e) => e.preventDefault(), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "email",
              placeholder: "Email của bạn",
              className: "w-full bg-transparent border-b border-forest/20 pb-2 text-xs focus:outline-none focus:border-gold"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "absolute right-0 bottom-2 text-[10px] uppercase font-bold text-gold", children: "Gửi" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-forest/5 py-6 text-center text-[10px] uppercase tracking-[0.3em] text-forest/40", children: "© 2026 Pure Floral & Co. — All rights reserved" })
  ] });
}
function MobileNav() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "lg:hidden fixed bottom-0 inset-x-0 z-40 bg-cream/95 backdrop-blur-md border-t border-forest/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-4 text-[10px] uppercase tracking-widest font-semibold text-forest/70", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex flex-col items-center py-3 gap-1", activeProps: { className: "text-forest" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(House, { size: 18 }),
      " Trang chủ"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/products", className: "flex flex-col items-center py-3 gap-1", activeProps: { className: "text-forest" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 18 }),
      " Sản phẩm"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/customize", className: "flex flex-col items-center py-3 gap-1", activeProps: { className: "text-forest" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 18 }),
      " Thiết kế"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/profile", className: "flex flex-col items-center py-3 gap-1", activeProps: { className: "text-forest" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 18 }),
      " Tôi"
    ] })
  ] }) });
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-cream px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl text-forest mt-4", children: "Không tìm thấy" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-forest/60", children: "Trang bạn tìm không tồn tại hoặc đã được di chuyển." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "btn-primary mt-8 inline-flex", children: "Về trang chủ" })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-cream px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl text-forest", children: "Đã có lỗi xảy ra" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-forest/60", children: "Vui lòng thử lại hoặc về trang chủ." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex justify-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "btn-primary",
          children: "Thử lại"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", className: "btn-outline", children: "Về trang chủ" })
    ] })
  ] }) });
}
const Route$e = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Pure Floral & Co. — Trang sức thủ công cảm hứng hoa sen" },
      { name: "description", content: "Trang sức handmade cao cấp lấy cảm hứng từ hoa sen Việt Nam. Tự thiết kế vòng tay cá nhân hóa với charm sen, ngọc trai và đá quý." },
      { name: "author", content: "Pure Floral & Co." },
      { property: "og:title", content: "Pure Floral & Co. — Trang sức thủ công cảm hứng hoa sen" },
      { property: "og:description", content: "Trang sức handmade cao cấp lấy cảm hứng từ hoa sen Việt Nam. Tự thiết kế vòng tay cá nhân hóa với charm sen, ngọc trai và đá quý." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Pure Floral & Co. — Trang sức thủ công cảm hứng hoa sen" },
      { name: "twitter:description", content: "Trang sức handmade cao cấp lấy cảm hứng từ hoa sen Việt Nam. Tự thiết kế vòng tay cá nhân hóa với charm sen, ngọc trai và đá quý." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/1c29595e-5d1f-48b6-8216-6abba13ad6fe/id-preview-4939f52a--8f0dd56b-c2f0-4b86-8f30-93709d76bea6.lovable.app-1781328767610.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/1c29595e-5d1f-48b6-8216-6abba13ad6fe/id-preview-4939f52a--8f0dd56b-c2f0-4b86-8f30-93709d76bea6.lovable.app-1781328767610.png" }
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Be+Vietnam+Pro:wght@300;400;500;600;700&display=swap"
      },
      { rel: "stylesheet", href: appCss }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "vi", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$e.useRouteContext();
  const router2 = useRouter();
  reactExports.useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      router2.invalidate();
      if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
    });
    return () => sub.subscription.unsubscribe();
  }, [router2, queryClient]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col bg-cream text-forest font-sans", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 pt-20 pb-20 lg:pb-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Toaster,
      {
        position: "top-center",
        toastOptions: {
          style: {
            background: "#FCF9F5",
            color: "#1A3A34",
            border: "1px solid rgba(26,58,52,0.1)",
            borderRadius: "0",
            fontFamily: "var(--font-sans)"
          }
        }
      }
    )
  ] }) });
}
const listProducts = createServerFn({
  method: "GET"
}).inputValidator((input) => objectType({
  search: stringType().optional(),
  collection: stringType().optional(),
  category: stringType().optional(),
  sort: enumType(["newest", "price_asc", "price_desc", "popular"]).optional(),
  featured: booleanType().optional(),
  limit: numberType().int().min(1).max(100).optional()
}).parse(input ?? {})).handler(createSsrRpc("51ad93d03c52987e0e52d0164e41771f8765a8919d8a537367eaf795dff9b9d8"));
const getProductBySlug = createServerFn({
  method: "GET"
}).inputValidator((input) => objectType({
  slug: stringType()
}).parse(input)).handler(createSsrRpc("934a19e0a64899030ca094a104b50f8fc2c2f2533d480be67184ceddaf6faaf0"));
const listCollections = createServerFn({
  method: "GET"
}).handler(createSsrRpc("36530dd13befeb732fee969d18ca06efc81e5a6873e4b7a64f4e4f13a0cf04d9"));
const listCategories = createServerFn({
  method: "GET"
}).handler(createSsrRpc("74cf57a5ce5acc5ff7716c464d5de5a2260685d83f4d25828e2026fb3932cf53"));
const listTestimonials = createServerFn({
  method: "GET"
}).handler(createSsrRpc("83ff112a2fb04e6c5e01c31120c559b10d7eb9057cd3b654aac6abd03c4c3902"));
const listFaq = createServerFn({
  method: "GET"
}).handler(createSsrRpc("a28caa4bb5dc87b6586f87b412c05650c9a19ff351492cbc7feef1f8e00254ef"));
const getStudioData = createServerFn({
  method: "GET"
}).handler(createSsrRpc("df4ad356d9c1425ec33771cae468d7a538cdffa5ec4ef0d1e0bba725fa824e54"));
const $$splitComponentImporter$d = () => import("./support-BaWdq6M5.mjs");
const Route$d = createFileRoute("/support")({
  head: () => ({
    meta: [{
      title: "Hỗ trợ — Pure Floral & Co."
    }, {
      name: "description",
      content: "Trang hỗ trợ Pure Floral & Co. — FAQ, liên hệ và gửi yêu cầu."
    }]
  }),
  loader: ({
    context
  }) => {
    context.queryClient.ensureQueryData(queryOptions({
      queryKey: ["faq"],
      queryFn: () => listFaq({
        data: {}
      })
    }));
  },
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./products-DvaynRgM.mjs");
const searchSchema$1 = objectType({
  q: stringType().optional(),
  collection: stringType().optional(),
  category: stringType().optional(),
  sort: enumType(["newest", "price_asc", "price_desc", "popular"]).optional()
});
const Route$c = createFileRoute("/products")({
  head: () => ({
    meta: [{
      title: "Sản phẩm — Pure Floral & Co."
    }, {
      name: "description",
      content: "Khám phá bộ sưu tập vòng tay, charm sen và phụ kiện thủ công cao cấp."
    }, {
      property: "og:title",
      content: "Sản phẩm — Pure Floral & Co."
    }]
  }),
  validateSearch: searchSchema$1,
  loader: ({
    context
  }) => {
    context.queryClient.ensureQueryData(queryOptions({
      queryKey: ["collections"],
      queryFn: () => listCollections({
        data: {}
      })
    }));
    context.queryClient.ensureQueryData(queryOptions({
      queryKey: ["categories"],
      queryFn: () => listCategories({
        data: {}
      })
    }));
  },
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./customize-C93sTIR4.mjs");
const Route$b = createFileRoute("/customize")({
  head: () => ({
    meta: [{
      title: "Tự thiết kế vòng tay — Pure Floral & Co."
    }, {
      name: "description",
      content: "Tự tay thiết kế vòng tay cá nhân hóa: chọn dây, charm, size và khắc tên người thương."
    }, {
      property: "og:title",
      content: "Xưởng tự thiết kế — Pure Floral & Co."
    }]
  }),
  loader: ({
    context
  }) => {
    context.queryClient.ensureQueryData(queryOptions({
      queryKey: ["studio"],
      queryFn: () => getStudioData({
        data: {}
      })
    }));
  },
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./auth-29p2GTSf.mjs");
const searchSchema = objectType({
  redirect: stringType().optional()
});
const Route$a = createFileRoute("/auth")({
  head: () => ({
    meta: [{
      title: "Đăng nhập / Đăng ký — Pure Floral & Co."
    }, {
      name: "description",
      content: "Đăng nhập hoặc tạo tài khoản Pure Floral & Co. để theo dõi đơn hàng và lưu thiết kế."
    }]
  }),
  validateSearch: searchSchema,
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./about-BHvp1L7G.mjs");
const Route$9 = createFileRoute("/about")({
  head: () => ({
    meta: [{
      title: "Câu chuyện thương hiệu — Pure Floral & Co."
    }, {
      name: "description",
      content: "Câu chuyện về Pure Floral & Co., ý nghĩa hoa sen và hành trình chế tác thủ công."
    }, {
      property: "og:title",
      content: "Câu chuyện Pure Floral & Co."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./route-BFsOu0JM.mjs");
const Route$8 = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const {
      data,
      error
    } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({
      to: "/auth"
    });
    return {
      user: data.user
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const featuredOpts = queryOptions({
  queryKey: ["products", "featured"],
  queryFn: () => listProducts({
    data: {
      featured: true,
      limit: 4
    }
  })
});
const collectionsOpts = queryOptions({
  queryKey: ["collections"],
  queryFn: () => listCollections({
    data: {}
  })
});
const testimonialsOpts = queryOptions({
  queryKey: ["testimonials"],
  queryFn: () => listTestimonials({
    data: {}
  })
});
const faqOpts = queryOptions({
  queryKey: ["faq"],
  queryFn: () => listFaq({
    data: {}
  })
});
const $$splitComponentImporter$7 = () => import("./index-MJH737bo.mjs");
const Route$7 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Pure Floral & Co. — Trang sức thủ công cảm hứng hoa sen"
    }, {
      name: "description",
      content: "Trang sức handmade cao cấp lấy cảm hứng hoa sen Việt Nam. Tự thiết kế vòng tay cá nhân hóa."
    }, {
      property: "og:title",
      content: "Pure Floral & Co."
    }, {
      property: "og:description",
      content: "Crafted with Meaning, Worn with Elegance."
    }]
  }),
  loader: ({
    context
  }) => {
    context.queryClient.ensureQueryData(featuredOpts);
    context.queryClient.ensureQueryData(collectionsOpts);
    context.queryClient.ensureQueryData(testimonialsOpts);
    context.queryClient.ensureQueryData(faqOpts);
  },
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./products._slug-DzQscGBV.mjs");
const Route$6 = createFileRoute("/products/$slug")({
  head: ({
    params
  }) => ({
    meta: [{
      title: `${params.slug} — Pure Floral & Co.`
    }, {
      name: "description",
      content: "Chi tiết sản phẩm trang sức thủ công Pure Floral & Co."
    }]
  }),
  loader: ({
    context,
    params
  }) => {
    context.queryClient.ensureQueryData(queryOptions({
      queryKey: ["product", params.slug],
      queryFn: () => getProductBySlug({
        data: {
          slug: params.slug
        }
      })
    }));
    context.queryClient.ensureQueryData(queryOptions({
      queryKey: ["products", "related"],
      queryFn: () => listProducts({
        data: {
          limit: 4
        }
      })
    }));
  },
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./profile-BxQU9SV1.mjs");
const Route$5 = createFileRoute("/_authenticated/profile")({
  head: () => ({
    meta: [{
      title: "Tài khoản — Pure Floral & Co."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./orders-CFI1_bwV.mjs");
const Route$4 = createFileRoute("/_authenticated/orders")({
  head: () => ({
    meta: [{
      title: "Đơn hàng — Pure Floral & Co."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./checkout-t8yJtybQ.mjs");
const Route$3 = createFileRoute("/_authenticated/checkout")({
  head: () => ({
    meta: [{
      title: "Thanh toán — Pure Floral & Co."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./cart-CkUQig0c.mjs");
const Route$2 = createFileRoute("/_authenticated/cart")({
  head: () => ({
    meta: [{
      title: "Giỏ hàng — Pure Floral & Co."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./orders._code-H7p1Kb8s.mjs");
const Route$1 = createFileRoute("/_authenticated/orders/$code")({
  head: () => ({
    meta: [{
      title: "Chi tiết đơn hàng — Pure Floral & Co."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./order-success._code-CyH8d3_j.mjs");
const Route = createFileRoute("/_authenticated/order-success/$code")({
  head: () => ({
    meta: [{
      title: "Đặt hàng thành công — Pure Floral & Co."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const SupportRoute = Route$d.update({
  id: "/support",
  path: "/support",
  getParentRoute: () => Route$e
});
const ProductsRoute = Route$c.update({
  id: "/products",
  path: "/products",
  getParentRoute: () => Route$e
});
const CustomizeRoute = Route$b.update({
  id: "/customize",
  path: "/customize",
  getParentRoute: () => Route$e
});
const AuthRoute = Route$a.update({
  id: "/auth",
  path: "/auth",
  getParentRoute: () => Route$e
});
const AboutRoute = Route$9.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$e
});
const AuthenticatedRouteRoute = Route$8.update({
  id: "/_authenticated",
  getParentRoute: () => Route$e
});
const IndexRoute = Route$7.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$e
});
const ProductsSlugRoute = Route$6.update({
  id: "/$slug",
  path: "/$slug",
  getParentRoute: () => ProductsRoute
});
const AuthenticatedProfileRoute = Route$5.update({
  id: "/profile",
  path: "/profile",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedOrdersRoute = Route$4.update({
  id: "/orders",
  path: "/orders",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedCheckoutRoute = Route$3.update({
  id: "/checkout",
  path: "/checkout",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedCartRoute = Route$2.update({
  id: "/cart",
  path: "/cart",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedOrdersCodeRoute = Route$1.update({
  id: "/$code",
  path: "/$code",
  getParentRoute: () => AuthenticatedOrdersRoute
});
const AuthenticatedOrderSuccessCodeRoute = Route.update({
  id: "/order-success/$code",
  path: "/order-success/$code",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedOrdersRouteChildren = {
  AuthenticatedOrdersCodeRoute
};
const AuthenticatedOrdersRouteWithChildren = AuthenticatedOrdersRoute._addFileChildren(AuthenticatedOrdersRouteChildren);
const AuthenticatedRouteRouteChildren = {
  AuthenticatedCartRoute,
  AuthenticatedCheckoutRoute,
  AuthenticatedOrdersRoute: AuthenticatedOrdersRouteWithChildren,
  AuthenticatedProfileRoute,
  AuthenticatedOrderSuccessCodeRoute
};
const AuthenticatedRouteRouteWithChildren = AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren);
const ProductsRouteChildren = {
  ProductsSlugRoute
};
const ProductsRouteWithChildren = ProductsRoute._addFileChildren(
  ProductsRouteChildren
);
const rootRouteChildren = {
  IndexRoute,
  AuthenticatedRouteRoute: AuthenticatedRouteRouteWithChildren,
  AboutRoute,
  AuthRoute,
  CustomizeRoute,
  ProductsRoute: ProductsRouteWithChildren,
  SupportRoute
};
const routeTree = Route$e._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$c as R,
  useServerFn as a,
  listProducts as b,
  createSsrRpc as c,
  listCollections as d,
  listCategories as e,
  addProductToCart as f,
  getStudioData as g,
  Route$a as h,
  featuredOpts as i,
  collectionsOpts as j,
  faqOpts as k,
  listFaq as l,
  Route$6 as m,
  getProductBySlug as n,
  getCart as o,
  updateCartItem as p,
  Route$1 as q,
  removeCartItem as r,
  saveCustomDesign as s,
  testimonialsOpts as t,
  useAuth as u,
  Route as v,
  router as w
};
