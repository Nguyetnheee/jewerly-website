import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery, useMutation, queryOptions } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listFaq } from "@/lib/products.functions";
import { createSupportTicket } from "@/lib/support.functions";
import { useState } from "react";
import { toast } from "sonner";
import { MessageCircle } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "Hỗ trợ — Pure Floral & Co." },
      { name: "description", content: "Trang hỗ trợ Pure Floral & Co. — FAQ, liên hệ và gửi yêu cầu." },
    ],
  }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(queryOptions({ queryKey: ["faq"], queryFn: () => listFaq({ data: {} as never }) }));
  },
  component: SupportPage,
});

function SupportPage() {
  const { user } = useAuth();
  const { data: faq } = useSuspenseQuery(queryOptions({ queryKey: ["faq"], queryFn: () => listFaq({ data: {} as never }) }));
  const [form, setForm] = useState({ name: "", email: user?.email ?? "", subject: "", message: "" });
  const fn = useServerFn(createSupportTicket);
  const m = useMutation({
    mutationFn: () => fn({ data: form }),
    onSuccess: () => {
      toast.success("Đã gửi yêu cầu — chúng tôi sẽ liên hệ sớm.");
      setForm({ name: "", email: "", subject: "", message: "" });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <header className="text-center mb-16">
        <p className="eyebrow mb-3">Hỗ trợ</p>
        <h1 className="font-display text-5xl mb-4">Chúng tôi ở đây vì bạn</h1>
        <p className="text-forest/60">Câu hỏi thường gặp, liên hệ trực tiếp, hoặc gửi yêu cầu — đội ngũ sẽ phản hồi trong 24 giờ.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* FAQ */}
        <section>
          <h2 className="font-display text-2xl mb-6">Câu hỏi thường gặp</h2>
          <div className="divide-y divide-forest/10">
            {faq.map((item) => (
              <details key={item.id} className="py-5 group">
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <span className="font-medium text-sm">{item.question}</span>
                  <span className="text-gold text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-sm text-forest/70 leading-relaxed mt-3">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Contact form */}
        <section>
          <h2 className="font-display text-2xl mb-6">Gửi yêu cầu hỗ trợ</h2>
          <form
            onSubmit={(e) => { e.preventDefault(); m.mutate(); }}
            className="space-y-4 surface-card p-8"
          >
            <div>
              <label className="text-[11px] uppercase tracking-widest text-forest/60 mb-2 block">Họ tên</label>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-transparent border-b border-forest/20 py-2 focus:outline-none focus:border-gold" />
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-widest text-forest/60 mb-2 block">Email</label>
              <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-transparent border-b border-forest/20 py-2 focus:outline-none focus:border-gold" />
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-widest text-forest/60 mb-2 block">Tiêu đề</label>
              <input required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full bg-transparent border-b border-forest/20 py-2 focus:outline-none focus:border-gold" />
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-widest text-forest/60 mb-2 block">Nội dung</label>
              <textarea required rows={5} maxLength={4000} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-cream-2/50 p-3 focus:outline-none focus:ring-1 focus:ring-gold text-sm" />
            </div>
            <button type="submit" disabled={m.isPending} className="btn-primary w-full mt-2">
              {m.isPending ? "Đang gửi..." : "Gửi yêu cầu"}
            </button>
          </form>
        </section>
      </div>

      {/* Floating chat button */}
      <button
        aria-label="Trò chuyện hỗ trợ"
        className="fixed bottom-24 lg:bottom-8 right-6 z-40 size-14 bg-gold text-forest grid place-items-center rounded-full shadow-2xl hover:scale-105 transition-transform"
        onClick={() => toast.info("Đội ngũ sẽ phản hồi qua email. Bạn có thể dùng form bên trên.")}
      >
        <MessageCircle size={22} />
      </button>
    </div>
  );
}
