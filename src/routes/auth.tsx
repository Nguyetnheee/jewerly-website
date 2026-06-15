import { createFileRoute, Link, useNavigate, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";

const searchSchema = z.object({ redirect: z.string().optional() });

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Đăng nhập / Đăng ký — Pure Floral & Co." },
      { name: "description", content: "Đăng nhập hoặc tạo tài khoản Pure Floral & Co. để theo dõi đơn hàng và lưu thiết kế." },
    ],
  }),
  validateSearch: searchSchema,
  component: AuthPage,
});

function AuthPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "register") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
            emailRedirectTo: typeof window !== "undefined" ? window.location.origin : undefined,
          },
        });
        if (error) throw error;
        toast.success("Tài khoản đã được tạo. Đang đăng nhập...");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Chào mừng quay lại");
      }
      router.invalidate();
      navigate({ to: (search.redirect as never) ?? "/" });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Đã có lỗi";
      toast.error(msg.includes("Invalid login") ? "Email hoặc mật khẩu không đúng" : msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto px-6 py-20">
      <div className="text-center mb-10">
        <p className="eyebrow mb-3">Tài khoản</p>
        <h1 className="font-display text-4xl">{mode === "login" ? "Chào mừng quay lại" : "Tạo tài khoản"}</h1>
        <p className="text-sm text-forest/60 mt-3">
          {mode === "login" ? "Đăng nhập để xem giỏ hàng và thiết kế đã lưu" : "Tham gia cộng đồng yêu trang sức thủ công"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 surface-card p-8">
        {mode === "register" && (
          <div>
            <label className="text-[11px] uppercase tracking-widest text-forest/60 mb-2 block">Họ tên</label>
            <input
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-transparent border-b border-forest/20 py-2 focus:outline-none focus:border-gold"
            />
          </div>
        )}
        <div>
          <label className="text-[11px] uppercase tracking-widest text-forest/60 mb-2 block">Email</label>
          <input
            required type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border-b border-forest/20 py-2 focus:outline-none focus:border-gold"
          />
        </div>
        <div>
          <label className="text-[11px] uppercase tracking-widest text-forest/60 mb-2 block">Mật khẩu</label>
          <input
            required type="password" minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent border-b border-forest/20 py-2 focus:outline-none focus:border-gold"
          />
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full mt-4">
          {loading ? "..." : mode === "login" ? "Đăng nhập" : "Tạo tài khoản"}
        </button>
      </form>

      <p className="text-center text-sm text-forest/60 mt-8">
        {mode === "login" ? "Chưa có tài khoản?" : "Đã có tài khoản?"}{" "}
        <button onClick={() => setMode(mode === "login" ? "register" : "login")} className="text-gold font-semibold hover:underline">
          {mode === "login" ? "Đăng ký" : "Đăng nhập"}
        </button>
      </p>
      <p className="text-center text-xs text-forest/40 mt-6">
        Quay lại <Link to="/" className="underline">trang chủ</Link>
      </p>
    </div>
  );
}
