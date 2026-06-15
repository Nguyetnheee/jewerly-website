import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-forest/5 bg-cream text-forest">
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-2 md:grid-cols-4 gap-12">
        <div className="col-span-2 md:col-span-1">
          <div className="text-xl font-display font-bold tracking-tight mb-6">
            PURE FLORAL <br />
            <span className="font-light italic text-gold">& Co.</span>
          </div>
          <p className="text-xs leading-loose text-forest/60">
            Nghệ thuật trang sức handmade Việt Nam. <br />
            Bản sắc trong từng chi tiết nhỏ nhất.
          </p>
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold mt-6">
            Crafted with Meaning, Worn with Elegance
          </p>
        </div>
        <div className="flex flex-col gap-3 text-xs">
          <h4 className="uppercase tracking-[0.2em] font-bold mb-2 text-[11px]">Mua sắm</h4>
          <Link to="/products" className="text-forest/70 hover:text-gold">Tất cả sản phẩm</Link>
          <Link to="/products" search={{ category: "vong-tay" }} className="text-forest/70 hover:text-gold">Vòng tay</Link>
          <Link to="/products" search={{ category: "charm-sen" }} className="text-forest/70 hover:text-gold">Charm sen</Link>
          <Link to="/customize" className="text-forest/70 hover:text-gold">Tự thiết kế</Link>
        </div>
        <div className="flex flex-col gap-3 text-xs">
          <h4 className="uppercase tracking-[0.2em] font-bold mb-2 text-[11px]">Hỗ trợ</h4>
          <Link to="/about" className="text-forest/70 hover:text-gold">Về chúng tôi</Link>
          <Link to="/support" className="text-forest/70 hover:text-gold">Liên hệ</Link>
          <Link to="/support" className="text-forest/70 hover:text-gold">Câu hỏi thường gặp</Link>
          <Link to="/support" className="text-forest/70 hover:text-gold">Chính sách bảo hành</Link>
        </div>
        <div className="flex flex-col gap-4 col-span-2 md:col-span-1">
          <h4 className="uppercase tracking-[0.2em] font-bold text-[11px]">Theo dõi</h4>
          <p className="text-xs text-forest/60">
            Đăng ký nhận bản tin để cập nhật bộ sưu tập mới và ưu đãi riêng.
          </p>
          <form className="relative" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Email của bạn"
              className="w-full bg-transparent border-b border-forest/20 pb-2 text-xs focus:outline-none focus:border-gold"
            />
            <button className="absolute right-0 bottom-2 text-[10px] uppercase font-bold text-gold">Gửi</button>
          </form>
        </div>
      </div>
      <div className="border-t border-forest/5 py-6 text-center text-[10px] uppercase tracking-[0.3em] text-forest/40">
        © 2026 Pure Floral & Co. — All rights reserved
      </div>
    </footer>
  );
}
