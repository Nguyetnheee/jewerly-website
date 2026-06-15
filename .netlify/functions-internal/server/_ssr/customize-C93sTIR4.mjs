import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { c as useQueryClient, a as useSuspenseQuery, b as useMutation, q as queryOptions } from "../_libs/tanstack__react-query.mjs";
import { u as useAuth, a as useServerFn, s as saveCustomDesign, g as getStudioData } from "./router-DziuQjSF.mjs";
import { f as formatVND } from "./format-CDwrkFkA.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { c as Minus, P as Plus, X } from "../_libs/lucide-react.mjs";
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
function StudioPage() {
  const {
    session
  } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const {
    data
  } = useSuspenseQuery(queryOptions({
    queryKey: ["studio"],
    queryFn: () => getStudioData({
      data: {}
    })
  }));
  const [materialId, setMaterialId] = reactExports.useState(data.materials[0]?.id ?? "");
  const [sizeId, setSizeId] = reactExports.useState(data.sizes[1]?.id ?? data.sizes[0]?.id ?? "");
  const [cordColor, setCordColor] = reactExports.useState(data.materials[0]?.color ?? "#FCF9F5");
  const [selectedCharms, setSelectedCharms] = reactExports.useState([]);
  const [note, setNote] = reactExports.useState("");
  const [activeCat, setActiveCat] = reactExports.useState(data.charmCategories[0]?.id ?? "");
  const material = data.materials.find((m) => m.id === materialId);
  data.sizes.find((s) => s.id === sizeId);
  const charmMap = reactExports.useMemo(() => new Map(data.charms.map((c) => [c.id, c])), [data.charms]);
  const total = reactExports.useMemo(() => {
    let t = Number(material?.base_price ?? 0);
    selectedCharms.forEach((c) => {
      const ch = charmMap.get(c.charmId);
      if (ch) t += Number(ch.price) * c.quantity;
    });
    return t;
  }, [material, selectedCharms, charmMap]);
  const totalCharms = selectedCharms.reduce((a, c) => a + c.quantity, 0);
  const progress = Math.min(100, totalCharms / 5 * 60 + (materialId ? 20 : 0) + (sizeId ? 20 : 0));
  function addCharm(id) {
    if (totalCharms >= 12) {
      toast.error("Tối đa 12 charm trên một vòng");
      return;
    }
    setSelectedCharms((prev) => {
      const ex = prev.find((c) => c.charmId === id);
      if (ex) return prev.map((c) => c.charmId === id ? {
        ...c,
        quantity: c.quantity + 1
      } : c);
      return [...prev, {
        charmId: id,
        quantity: 1
      }];
    });
  }
  function decCharm(id) {
    setSelectedCharms((prev) => prev.map((c) => c.charmId === id ? {
      ...c,
      quantity: c.quantity - 1
    } : c).filter((c) => c.quantity > 0));
  }
  function removeCharm(id) {
    setSelectedCharms((prev) => prev.filter((c) => c.charmId !== id));
  }
  const saveFn = useServerFn(saveCustomDesign);
  const saveM = useMutation({
    mutationFn: () => saveFn({
      data: {
        baseMaterialId: materialId,
        sizeId,
        cordColor,
        personalNote: note || null,
        charms: selectedCharms
      }
    }),
    onSuccess: () => {
      toast.success("Thiết kế đã được thêm vào giỏ hàng");
      qc.invalidateQueries({
        queryKey: ["cart"]
      });
      navigate({
        to: "/cart"
      });
    },
    onError: (e) => toast.error(e.message)
  });
  function handleSave() {
    if (!session) {
      navigate({
        to: "/auth",
        search: {
          redirect: "/customize"
        }
      });
      return;
    }
    if (!materialId || !sizeId) {
      toast.error("Vui lòng chọn dây và size");
      return;
    }
    saveM.mutate();
  }
  const filteredCharms = data.charms.filter((c) => c.category_id === activeCat && c.active);
  reactExports.useMemo(() => selectedCharms.filter((sc) => {
    const ch = charmMap.get(sc.charmId);
    return ch && ch.active;
  }), [selectedCharms, charmMap]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "text-center mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mb-3", children: "Phòng chế tác" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl mb-3", children: "Thiết kế vòng tay của riêng bạn" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-forest/60 max-w-xl mx-auto text-sm", children: "Mỗi câu chuyện là một duy nhất. Hãy tự tay chọn từng chi tiết để tạo nên kiệt tác dành riêng cho bạn." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl mx-auto mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-[10px] uppercase tracking-widest text-forest/50 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Khởi đầu" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          Math.round(progress),
          "% · ",
          totalCharms,
          " charm"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Hoàn thiện" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 bg-forest/10 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-gradient-to-r from-lotus to-gold transition-all duration-700", style: {
        width: `${progress}%`
      } }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-5 gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 lg:sticky lg:top-28 lg:self-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square bg-cream-2 relative overflow-hidden grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 400 400", className: "w-3/4 h-3/4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "200", cy: "200", r: "140", fill: "none", stroke: cordColor, strokeWidth: "6" }),
          selectedCharms.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "200", y: "208", textAnchor: "middle", fill: "#1A3A34", opacity: "0.3", fontFamily: "Playfair Display", fontStyle: "italic", fontSize: "20", children: "Chọn charm để bắt đầu" }),
          selectedCharms.flatMap((sc, idx) => {
            const ch = charmMap.get(sc.charmId);
            if (!ch) return [];
            return Array.from({
              length: sc.quantity
            }).map((_, j) => {
              const total2 = selectedCharms.reduce((a, c) => a + c.quantity, 0);
              const pos = selectedCharms.slice(0, idx).reduce((a, c) => a + c.quantity, 0) + j;
              const angle = pos / Math.max(total2, 1) * Math.PI * 2 - Math.PI / 2;
              const x = 200 + Math.cos(angle) * 140;
              const y = 200 + Math.sin(angle) * 140;
              if (ch.image_url) {
                const size2 = 88;
                return /* @__PURE__ */ jsxRuntimeExports.jsx("image", { href: ch.image_url, x: x - size2 / 2, y: y - size2 / 2, width: size2, height: size2, preserveAspectRatio: "xMidYMid meet" }, `${sc.charmId}-${j}`);
              }
              return /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: x, cy: y, r: "14", fill: ch.color ?? "#C5A059", stroke: "#1A3A34", strokeWidth: "1" }, `${sc.charmId}-${j}`);
            });
          })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 p-6 surface-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-baseline mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-widest text-forest/50", children: "Tổng tạm tính" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-3xl text-gold", children: formatVND(total) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleSave, disabled: saveM.isPending, className: "btn-primary w-full", children: saveM.isPending ? "Đang lưu..." : "Hoàn tất & Thêm vào giỏ" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-3 space-y-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mb-3", children: "Bước 01" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl mb-5", children: "Chọn dây cơ bản" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3", children: data.materials.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
            setMaterialId(m.id);
            setCordColor(m.color ?? "#FCF9F5");
          }, className: `text-left p-4 border transition-all ${materialId === m.id ? "border-forest bg-cream-2" : "border-forest/15 hover:border-forest/40"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-6 rounded-full mb-3 border border-forest/20", style: {
              background: m.color ?? "#fff"
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: m.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-gold mt-1 uppercase tracking-widest", children: formatVND(m.base_price) })
          ] }, m.id)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mb-3", children: "Bước 02" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl mb-5", children: "Thêm charm & biểu tượng" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mb-5 border-b border-forest/10 pb-3", children: data.charmCategories.map((cc) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveCat(cc.id), className: `px-3 py-1.5 text-[11px] uppercase tracking-widest ${activeCat === cc.id ? "bg-forest text-cream" : "text-forest/60 hover:text-forest"}`, children: cc.name }, cc.id)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 sm:grid-cols-4 gap-3", children: filteredCharms.map((c) => {
            const sel = selectedCharms.find((s) => s.charmId === c.id);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => addCharm(c.id), className: `group relative aspect-square border p-3 flex flex-col items-center justify-center text-center transition-all ${sel ? "border-gold bg-gold/5" : "border-forest/15 hover:border-forest/40"}`, children: [
              c.image_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: c.image_url, alt: c.name, className: "size-10 object-contain mb-2" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 rounded-full mb-2 border border-forest/20", style: {
                background: c.color ?? "#C5A059"
              } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-medium line-clamp-1", children: c.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-gold mt-0.5", children: formatVND(c.price) }),
              sel && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-1.5 right-1.5 size-5 bg-gold text-forest text-[10px] grid place-items-center font-bold rounded-full", children: sel.quantity })
            ] }, c.id);
          }) }),
          selectedCharms.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 p-5 bg-cream-2/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-widest text-forest/50 mb-3", children: "Đã chọn" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: selectedCharms.map((sc) => {
              const ch = charmMap.get(sc.charmId);
              if (!ch) return null;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-4 rounded-full border border-forest/20", style: {
                    background: ch.color ?? "#C5A059"
                  } }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: ch.name })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => decCharm(sc.charmId), className: "p-1 border border-forest/15 hover:bg-forest hover:text-cream", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { size: 12 }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm w-6 text-center", children: sc.quantity }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => addCharm(sc.charmId), className: "p-1 border border-forest/15 hover:bg-forest hover:text-cream", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 12 }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => removeCharm(sc.charmId), className: "p-1 text-forest/40 hover:text-destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14 }) })
                ] })
              ] }, sc.charmId);
            }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mb-3", children: "Bước 03" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl mb-5", children: "Chọn size & lời nhắn" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] uppercase tracking-widest text-forest/50 mb-2 block", children: "Size cổ tay" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: data.sizes.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setSizeId(s.id), className: `px-4 py-2.5 text-sm border ${sizeId === s.id ? "border-forest bg-forest text-cream" : "border-forest/15 hover:border-forest/40"}`, children: [
              s.size_name,
              " · ",
              s.wrist_cm,
              "cm"
            ] }, s.id)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] uppercase tracking-widest text-forest/50 mb-2 block", children: "Lời nhắn cá nhân (tên, ngày kỷ niệm...)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: note, onChange: (e) => setNote(e.target.value), maxLength: 120, placeholder: "Ví dụ: Linh ❤ Khang — 14.02.2026", className: "w-full bg-transparent border-b border-forest/20 py-2 focus:outline-none focus:border-gold text-sm" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-forest/40 mt-1 text-right", children: [
              note.length,
              "/120"
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  StudioPage as component
};
