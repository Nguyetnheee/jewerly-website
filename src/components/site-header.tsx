import { Link } from "@tanstack/react-router";
import { ShoppingBag, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useAuth } from "@/hooks/use-auth";
import { getCart } from "@/lib/cart.functions";

const NAV = [
  { to: "/", label: "Trang chủ" },
  { to: "/products", label: "Sản phẩm" },
  { to: "/customize", label: "Tự thiết kế" },
  { to: "/about", label: "Câu chuyện" },
  { to: "/support", label: "Hỗ trợ" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { session } = useAuth();
  const fetchCart = useServerFn(getCart);
  const cartQ = useQuery({
    queryKey: ["cart", session?.user?.id],
    queryFn: () => fetchCart({ data: {} as never }),
    enabled: !!session,
  });
  const cartCount = (cartQ.data ?? []).reduce((acc, it: { quantity: number }) => acc + it.quantity, 0);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-cream/85 backdrop-blur-md border-b border-forest/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-4">
        {/* Desktop left nav */}
        <nav className="hidden lg:flex gap-7 text-[11px] uppercase tracking-[0.18em] font-medium flex-1">
          {NAV.slice(1, 3).map((n) => (
            <Link key={n.to} to={n.to} className="text-forest/80 hover:text-lotus transition-colors" activeProps={{ className: "text-forest" }}>
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu toggle */}
        <button
          className="lg:hidden p-2 -ml-2"
          aria-label="Mở menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>

        <Link to="/" className="font-display text-xl md:text-2xl font-bold tracking-tight text-forest text-center">
          PURE FLORAL <span className="font-light italic text-gold">& Co.</span>
        </Link>

        <nav className="hidden lg:flex gap-7 text-[11px] uppercase tracking-[0.18em] font-medium flex-1 justify-end">
          {NAV.slice(3).map((n) => (
            <Link key={n.to} to={n.to} className="text-forest/80 hover:text-lotus transition-colors" activeProps={{ className: "text-forest" }}>
              {n.label}
            </Link>
          ))}
          <Link to="/cart" className="text-forest/80 hover:text-lotus transition-colors flex items-center gap-1.5">
            <ShoppingBag size={14} /> Giỏ ({cartCount})
          </Link>
          <Link to={session ? "/profile" : "/auth"} className="text-forest/80 hover:text-lotus transition-colors flex items-center gap-1.5">
            <User size={14} /> {session ? "Tôi" : "Đăng nhập"}
          </Link>
        </nav>

        {/* Mobile right icons */}
        <div className="flex lg:hidden items-center gap-3">
          <Link to="/cart" className="relative p-2" aria-label="Giỏ hàng">
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 size-4 rounded-full bg-lotus text-forest text-[10px] grid place-items-center font-bold">
                {cartCount}
              </span>
            )}
          </Link>
          <Link to={session ? "/profile" : "/auth"} className="p-2" aria-label="Tài khoản">
            <User size={20} />
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-cream border-t border-forest/10">
          <nav className="px-6 py-6 flex flex-col gap-5 text-sm font-medium uppercase tracking-widest">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="text-forest hover:text-lotus"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
