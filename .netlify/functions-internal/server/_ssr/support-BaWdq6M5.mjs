import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useSuspenseQuery, b as useMutation, q as queryOptions } from "../_libs/tanstack__react-query.mjs";
import { u as useAuth, a as useServerFn, l as listFaq, c as createSsrRpc } from "./router-DziuQjSF.mjs";
import { c as createServerFn } from "./server-CkEUq1DS.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { b as MessageCircle } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "./auth-middleware-CXv2x3dD.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
const createSupportTicket = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  name: stringType().trim().min(1).max(120),
  email: stringType().trim().email().max(200),
  subject: stringType().trim().min(2).max(200),
  message: stringType().trim().min(2).max(4e3)
}).parse(input)).handler(createSsrRpc("42b7e30546b5a7c03d1813ff23502b3d12d813b160186ef0bd9c4bac61108f25"));
function SupportPage() {
  const {
    user
  } = useAuth();
  const {
    data: faq
  } = useSuspenseQuery(queryOptions({
    queryKey: ["faq"],
    queryFn: () => listFaq({
      data: {}
    })
  }));
  const [form, setForm] = reactExports.useState({
    name: "",
    email: user?.email ?? "",
    subject: "",
    message: ""
  });
  const fn = useServerFn(createSupportTicket);
  const m = useMutation({
    mutationFn: () => fn({
      data: form
    }),
    onSuccess: () => {
      toast.success("Đã gửi yêu cầu — chúng tôi sẽ liên hệ sớm.");
      setForm({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    },
    onError: (e) => toast.error(e.message)
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-6 py-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "text-center mb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mb-3", children: "Hỗ trợ" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl mb-4", children: "Chúng tôi ở đây vì bạn" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-forest/60", children: "Câu hỏi thường gặp, liên hệ trực tiếp, hoặc gửi yêu cầu — đội ngũ sẽ phản hồi trong 24 giờ." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl mb-6", children: "Câu hỏi thường gặp" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-forest/10", children: faq.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { className: "py-5 group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("summary", { className: "flex justify-between items-center cursor-pointer list-none", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm", children: item.question }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold text-xl group-open:rotate-45 transition-transform", children: "+" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-forest/70 leading-relaxed mt-3", children: item.answer })
        ] }, item.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl mb-6", children: "Gửi yêu cầu hỗ trợ" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
          e.preventDefault();
          m.mutate();
        }, className: "space-y-4 surface-card p-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] uppercase tracking-widest text-forest/60 mb-2 block", children: "Họ tên" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, value: form.name, onChange: (e) => setForm({
              ...form,
              name: e.target.value
            }), className: "w-full bg-transparent border-b border-forest/20 py-2 focus:outline-none focus:border-gold" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] uppercase tracking-widest text-forest/60 mb-2 block", children: "Email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, type: "email", value: form.email, onChange: (e) => setForm({
              ...form,
              email: e.target.value
            }), className: "w-full bg-transparent border-b border-forest/20 py-2 focus:outline-none focus:border-gold" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] uppercase tracking-widest text-forest/60 mb-2 block", children: "Tiêu đề" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, value: form.subject, onChange: (e) => setForm({
              ...form,
              subject: e.target.value
            }), className: "w-full bg-transparent border-b border-forest/20 py-2 focus:outline-none focus:border-gold" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] uppercase tracking-widest text-forest/60 mb-2 block", children: "Nội dung" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { required: true, rows: 5, maxLength: 4e3, value: form.message, onChange: (e) => setForm({
              ...form,
              message: e.target.value
            }), className: "w-full bg-cream-2/50 p-3 focus:outline-none focus:ring-1 focus:ring-gold text-sm" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: m.isPending, className: "btn-primary w-full mt-2", children: m.isPending ? "Đang gửi..." : "Gửi yêu cầu" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { "aria-label": "Trò chuyện hỗ trợ", className: "fixed bottom-24 lg:bottom-8 right-6 z-40 size-14 bg-gold text-forest grid place-items-center rounded-full shadow-2xl hover:scale-105 transition-transform", onClick: () => toast.info("Đội ngũ sẽ phản hồi qua email. Bạn có thể dùng form bên trên."), children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 22 }) })
  ] });
}
export {
  SupportPage as component
};
