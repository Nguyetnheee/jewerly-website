import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery, useMutation, useQueryClient, queryOptions } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getStudioData } from "@/lib/products.functions";
import { saveCustomDesign } from "@/lib/cart.functions";
import { formatVND } from "@/lib/format";
import { useAuth } from "@/hooks/use-auth";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Plus, Minus, X } from "lucide-react";

export const Route = createFileRoute("/customize")({
  head: () => ({
    meta: [
      { title: "Tự thiết kế vòng tay — Pure Floral & Co." },
      { name: "description", content: "Tự tay thiết kế vòng tay cá nhân hóa: chọn dây, charm, size và khắc tên người thương." },
      { property: "og:title", content: "Xưởng tự thiết kế — Pure Floral & Co." },
    ],
  }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(queryOptions({ queryKey: ["studio"], queryFn: () => getStudioData({ data: {} as never }) }));
  },
  component: StudioPage,
});

type SelectedCharm = { charmId: string; quantity: number };

function StudioPage() {
  const { session } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { data } = useSuspenseQuery(queryOptions({ queryKey: ["studio"], queryFn: () => getStudioData({ data: {} as never }) }));

  const [materialId, setMaterialId] = useState<string>(data.materials[0]?.id ?? "");
  const [sizeId, setSizeId] = useState<string>(data.sizes[1]?.id ?? data.sizes[0]?.id ?? "");
  const [cordColor, setCordColor] = useState<string>(data.materials[0]?.color ?? "#FCF9F5");
  const [selectedCharms, setSelectedCharms] = useState<SelectedCharm[]>([]);
  const [note, setNote] = useState("");
  const [activeCat, setActiveCat] = useState<string>(data.charmCategories[0]?.id ?? "");

  const material = data.materials.find((m) => m.id === materialId);
  const size = data.sizes.find((s) => s.id === sizeId);

  const charmMap = useMemo(() => new Map(data.charms.map((c) => [c.id, c])), [data.charms]);

  const total = useMemo(() => {
    let t = Number(material?.base_price ?? 0);
    selectedCharms.forEach((c) => {
      const ch = charmMap.get(c.charmId);
      if (ch) t += Number(ch.price) * c.quantity;
    });
    return t;
  }, [material, selectedCharms, charmMap]);

  const totalCharms = selectedCharms.reduce((a, c) => a + c.quantity, 0);
  const progress = Math.min(100, (totalCharms / 5) * 60 + (materialId ? 20 : 0) + (sizeId ? 20 : 0));

  function addCharm(id: string) {
    if (totalCharms >= 12) { toast.error("Tối đa 12 charm trên một vòng"); return; }
    setSelectedCharms((prev) => {
      const ex = prev.find((c) => c.charmId === id);
      if (ex) return prev.map((c) => (c.charmId === id ? { ...c, quantity: c.quantity + 1 } : c));
      return [...prev, { charmId: id, quantity: 1 }];
    });
  }
  function decCharm(id: string) {
    setSelectedCharms((prev) =>
      prev
        .map((c) => (c.charmId === id ? { ...c, quantity: c.quantity - 1 } : c))
        .filter((c) => c.quantity > 0),
    );
  }
  function removeCharm(id: string) {
    setSelectedCharms((prev) => prev.filter((c) => c.charmId !== id));
  }

  const saveFn = useServerFn(saveCustomDesign);
  const saveM = useMutation({
    mutationFn: () =>
      saveFn({
        data: {
          baseMaterialId: materialId,
          sizeId: sizeId,
          cordColor: cordColor,
          personalNote: note || null,
          charms: selectedCharms,
        },
      }),
    onSuccess: () => {
      toast.success("Thiết kế đã được thêm vào giỏ hàng");
      qc.invalidateQueries({ queryKey: ["cart"] });
      navigate({ to: "/cart" });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  function handleSave() {
    if (!session) { navigate({ to: "/auth", search: { redirect: "/customize" } as never }); return; }
    if (!materialId || !sizeId) { toast.error("Vui lòng chọn dây và size"); return; }
    saveM.mutate();
  }

  const filteredCharms = data.charms.filter((c) => c.category_id === activeCat && c.active);
  const selectedCharmsClean = useMemo(() => selectedCharms.filter((sc) => {
    const ch = charmMap.get(sc.charmId);
    return ch && ch.active;
  }), [selectedCharms, charmMap]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <header className="text-center mb-10">
        <p className="eyebrow mb-3">Phòng chế tác</p>
        <h1 className="font-display text-5xl mb-3">Thiết kế vòng tay của riêng bạn</h1>
        <p className="text-forest/60 max-w-xl mx-auto text-sm">
          Mỗi câu chuyện là một duy nhất. Hãy tự tay chọn từng chi tiết để tạo nên kiệt tác dành riêng cho bạn.
        </p>
      </header>

      {/* Lotus growth progress */}
      <div className="max-w-xl mx-auto mb-12">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-forest/50 mb-2">
          <span>Khởi đầu</span>
          <span>{Math.round(progress)}% · {totalCharms} charm</span>
          <span>Hoàn thiện</span>
        </div>
        <div className="h-1 bg-forest/10 relative">
          <div className="h-full bg-gradient-to-r from-lotus to-gold transition-all duration-700" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* PREVIEW */}
        <div className="lg:col-span-2 lg:sticky lg:top-28 lg:self-start">
          <div className="aspect-square bg-cream-2 relative overflow-hidden grid place-items-center">
            {/* Bracelet preview: a stylized circle of charm dots */}
            <svg viewBox="0 0 400 400" className="w-3/4 h-3/4">
              <circle cx="200" cy="200" r="140" fill="none" stroke={cordColor} strokeWidth="6" />
              {selectedCharms.length === 0 && (
                <text x="200" y="208" textAnchor="middle" fill="#1A3A34" opacity="0.3" fontFamily="Playfair Display" fontStyle="italic" fontSize="20">
                  Chọn charm để bắt đầu
                </text>
              )}
               {selectedCharms.flatMap((sc, idx) => {
                 const ch = charmMap.get(sc.charmId);
                 if (!ch) return [];
                 return Array.from({ length: sc.quantity }).map((_, j) => {
                   const total = selectedCharms.reduce((a, c) => a + c.quantity, 0);
                   const pos = selectedCharms.slice(0, idx).reduce((a, c) => a + c.quantity, 0) + j;
                   const angle = (pos / Math.max(total, 1)) * Math.PI * 2 - Math.PI / 2;
                   const x = 200 + Math.cos(angle) * 140;
                   const y = 200 + Math.sin(angle) * 140;
                  if (ch.image_url) {
                    const size = 88;
                    return (
                      <image
                        key={`${sc.charmId}-${j}`}
                        href={ch.image_url}
                        x={x - size / 2}
                        y={y - size / 2}
                        width={size}
                        height={size}
                        preserveAspectRatio="xMidYMid meet"
                      />
                    );
                  }
                   return <circle key={`${sc.charmId}-${j}`} cx={x} cy={y} r="14" fill={ch.color ?? "#C5A059"} stroke="#1A3A34" strokeWidth="1" />;
                 });
               })}
            </svg>
          </div>
          <div className="mt-6 p-6 surface-card">
            <div className="flex justify-between items-baseline mb-4">
              <span className="text-xs uppercase tracking-widest text-forest/50">Tổng tạm tính</span>
              <span className="font-display text-3xl text-gold">{formatVND(total)}</span>
            </div>
            <button onClick={handleSave} disabled={saveM.isPending} className="btn-primary w-full">
              {saveM.isPending ? "Đang lưu..." : "Hoàn tất & Thêm vào giỏ"}
            </button>
          </div>
        </div>

        {/* CONTROLS */}
        <div className="lg:col-span-3 space-y-10">
          {/* Step 1: Material */}
          <section>
            <p className="eyebrow mb-3">Bước 01</p>
            <h2 className="font-display text-2xl mb-5">Chọn dây cơ bản</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {data.materials.map((m) => (
                <button
                  key={m.id}
                  onClick={() => { setMaterialId(m.id); setCordColor(m.color ?? "#FCF9F5"); }}
                  className={`text-left p-4 border transition-all ${
                    materialId === m.id ? "border-forest bg-cream-2" : "border-forest/15 hover:border-forest/40"
                  }`}
                >
                  <div className="size-6 rounded-full mb-3 border border-forest/20" style={{ background: m.color ?? "#fff" }} />
                  <p className="text-sm font-medium">{m.name}</p>
                  <p className="text-[11px] text-gold mt-1 uppercase tracking-widest">{formatVND(m.base_price)}</p>
                </button>
              ))}
            </div>
          </section>

          {/* Step 2: Charms */}
          <section>
            <p className="eyebrow mb-3">Bước 02</p>
            <h2 className="font-display text-2xl mb-5">Thêm charm & biểu tượng</h2>

            <div className="flex flex-wrap gap-2 mb-5 border-b border-forest/10 pb-3">
              {data.charmCategories.map((cc) => (
                <button
                  key={cc.id}
                  onClick={() => setActiveCat(cc.id)}
                  className={`px-3 py-1.5 text-[11px] uppercase tracking-widest ${
                    activeCat === cc.id ? "bg-forest text-cream" : "text-forest/60 hover:text-forest"
                  }`}
                >
                  {cc.name}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {filteredCharms.map((c) => {
                const sel = selectedCharms.find((s) => s.charmId === c.id);
                return (
                  <button
                    key={c.id}
                    onClick={() => addCharm(c.id)}
                    className={`group relative aspect-square border p-3 flex flex-col items-center justify-center text-center transition-all ${
                      sel ? "border-gold bg-gold/5" : "border-forest/15 hover:border-forest/40"
                    }`}
                  >
                    {c.image_url ? (
                      <img src={c.image_url} alt={c.name} className="size-10 object-contain mb-2" />
                    ) : (
                      <div className="size-10 rounded-full mb-2 border border-forest/20" style={{ background: c.color ?? "#C5A059" }} />
                    )}
                    <p className="text-[11px] font-medium line-clamp-1">{c.name}</p>
                    <p className="text-[10px] text-gold mt-0.5">{formatVND(c.price)}</p>
                    {sel && (
                      <span className="absolute top-1.5 right-1.5 size-5 bg-gold text-forest text-[10px] grid place-items-center font-bold rounded-full">
                        {sel.quantity}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {selectedCharms.length > 0 && (
              <div className="mt-6 p-5 bg-cream-2/50">
                <p className="text-[10px] uppercase tracking-widest text-forest/50 mb-3">Đã chọn</p>
                <ul className="space-y-2">
                  {selectedCharms.map((sc) => {
                    const ch = charmMap.get(sc.charmId);
                    if (!ch) return null;
                    return (
                      <li key={sc.charmId} className="flex items-center justify-between gap-3">
                        <span className="flex items-center gap-3">
                          <span className="size-4 rounded-full border border-forest/20" style={{ background: ch.color ?? "#C5A059" }} />
                          <span className="text-sm">{ch.name}</span>
                        </span>
                        <span className="flex items-center gap-2">
                          <button onClick={() => decCharm(sc.charmId)} className="p-1 border border-forest/15 hover:bg-forest hover:text-cream"><Minus size={12} /></button>
                          <span className="text-sm w-6 text-center">{sc.quantity}</span>
                          <button onClick={() => addCharm(sc.charmId)} className="p-1 border border-forest/15 hover:bg-forest hover:text-cream"><Plus size={12} /></button>
                          <button onClick={() => removeCharm(sc.charmId)} className="p-1 text-forest/40 hover:text-destructive"><X size={14} /></button>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </section>

          {/* Step 3: Size & note */}
          <section>
            <p className="eyebrow mb-3">Bước 03</p>
            <h2 className="font-display text-2xl mb-5">Chọn size & lời nhắn</h2>
            <div className="mb-5">
              <label className="text-[11px] uppercase tracking-widest text-forest/50 mb-2 block">Size cổ tay</label>
              <div className="flex flex-wrap gap-2">
                {data.sizes.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSizeId(s.id)}
                    className={`px-4 py-2.5 text-sm border ${
                      sizeId === s.id ? "border-forest bg-forest text-cream" : "border-forest/15 hover:border-forest/40"
                    }`}
                  >
                    {s.size_name} · {s.wrist_cm}cm
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-widest text-forest/50 mb-2 block">Lời nhắn cá nhân (tên, ngày kỷ niệm...)</label>
              <input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                maxLength={120}
                placeholder="Ví dụ: Linh ❤ Khang — 14.02.2026"
                className="w-full bg-transparent border-b border-forest/20 py-2 focus:outline-none focus:border-gold text-sm"
              />
              <p className="text-[10px] text-forest/40 mt-1 text-right">{note.length}/120</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
