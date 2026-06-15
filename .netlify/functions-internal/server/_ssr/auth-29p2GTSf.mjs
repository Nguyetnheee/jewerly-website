import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, u as useRouter, L as Link } from "../_libs/tanstack__react-router.mjs";
import { s as supabase } from "./client-BZ4-XSxy.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { h as Route$a } from "./router-DziuQjSF.mjs";
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
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "./server-CkEUq1DS.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "./auth-middleware-CXv2x3dD.mjs";
import "../_libs/lucide-react.mjs";
import "../_libs/zod.mjs";
function AuthPage() {
  const search = Route$a.useSearch();
  const navigate = useNavigate();
  const router = useRouter();
  const [mode, setMode] = reactExports.useState("login");
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [fullName, setFullName] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "register") {
        const {
          error
        } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName
            },
            emailRedirectTo: typeof window !== "undefined" ? window.location.origin : void 0
          }
        });
        if (error) throw error;
        toast.success("Tài khoản đã được tạo. Đang đăng nhập...");
      } else {
        const {
          error
        } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
        toast.success("Chào mừng quay lại");
      }
      router.invalidate();
      navigate({
        to: search.redirect ?? "/"
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Đã có lỗi";
      toast.error(msg.includes("Invalid login") ? "Email hoặc mật khẩu không đúng" : msg);
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md mx-auto px-6 py-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mb-3", children: "Tài khoản" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl", children: mode === "login" ? "Chào mừng quay lại" : "Tạo tài khoản" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-forest/60 mt-3", children: mode === "login" ? "Đăng nhập để xem giỏ hàng và thiết kế đã lưu" : "Tham gia cộng đồng yêu trang sức thủ công" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5 surface-card p-8", children: [
      mode === "register" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] uppercase tracking-widest text-forest/60 mb-2 block", children: "Họ tên" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, value: fullName, onChange: (e) => setFullName(e.target.value), className: "w-full bg-transparent border-b border-forest/20 py-2 focus:outline-none focus:border-gold" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] uppercase tracking-widest text-forest/60 mb-2 block", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, type: "email", value: email, onChange: (e) => setEmail(e.target.value), className: "w-full bg-transparent border-b border-forest/20 py-2 focus:outline-none focus:border-gold" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] uppercase tracking-widest text-forest/60 mb-2 block", children: "Mật khẩu" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, type: "password", minLength: 6, value: password, onChange: (e) => setPassword(e.target.value), className: "w-full bg-transparent border-b border-forest/20 py-2 focus:outline-none focus:border-gold" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: loading, className: "btn-primary w-full mt-4", children: loading ? "..." : mode === "login" ? "Đăng nhập" : "Tạo tài khoản" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-forest/60 mt-8", children: [
      mode === "login" ? "Chưa có tài khoản?" : "Đã có tài khoản?",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMode(mode === "login" ? "register" : "login"), className: "text-gold font-semibold hover:underline", children: mode === "login" ? "Đăng ký" : "Đăng nhập" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-forest/40 mt-6", children: [
      "Quay lại ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "underline", children: "trang chủ" })
    ] })
  ] });
}
export {
  AuthPage as component
};
