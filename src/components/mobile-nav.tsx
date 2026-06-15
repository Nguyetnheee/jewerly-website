import { Link } from "@tanstack/react-router";
import { Home, ShoppingBag, Sparkles, User } from "lucide-react";

export function MobileNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-cream/95 backdrop-blur-md border-t border-forest/10">
      <div className="grid grid-cols-4 text-[10px] uppercase tracking-widest font-semibold text-forest/70">
        <Link to="/" className="flex flex-col items-center py-3 gap-1" activeProps={{ className: "text-forest" }}>
          <Home size={18} /> Trang chủ
        </Link>
        <Link to="/products" className="flex flex-col items-center py-3 gap-1" activeProps={{ className: "text-forest" }}>
          <ShoppingBag size={18} /> Sản phẩm
        </Link>
        <Link to="/customize" className="flex flex-col items-center py-3 gap-1" activeProps={{ className: "text-forest" }}>
          <Sparkles size={18} /> Thiết kế
        </Link>
        <Link to="/profile" className="flex flex-col items-center py-3 gap-1" activeProps={{ className: "text-forest" }}>
          <User size={18} /> Tôi
        </Link>
      </div>
    </nav>
  );
}
