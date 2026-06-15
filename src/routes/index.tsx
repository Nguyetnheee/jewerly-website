import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listProducts, listTestimonials, listFaq, listCollections } from "@/lib/products.functions";
import { formatVND } from "@/lib/format";
import heroImg from "@/assets/hero-bracelet.jpg";
import studioImg from "@/assets/studio-bench.jpg";
import charmsImg from "@/assets/charms-row.jpg";
import { Star } from "lucide-react";

const featuredOpts = queryOptions({
  queryKey: ["products", "featured"],
  queryFn: () => listProducts({ data: { featured: true, limit: 4 } }),
});
const collectionsOpts = queryOptions({ queryKey: ["collections"], queryFn: () => listCollections({ data: {} as never }) });
const testimonialsOpts = queryOptions({ queryKey: ["testimonials"], queryFn: () => listTestimonials({ data: {} as never }) });
const faqOpts = queryOptions({ queryKey: ["faq"], queryFn: () => listFaq({ data: {} as never }) });

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pure Floral & Co. — Trang sức thủ công cảm hứng hoa sen" },
      { name: "description", content: "Trang sức handmade cao cấp lấy cảm hứng hoa sen Việt Nam. Tự thiết kế vòng tay cá nhân hóa." },
      { property: "og:title", content: "Pure Floral & Co." },
      { property: "og:description", content: "Crafted with Meaning, Worn with Elegance." },
    ],
  }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(featuredOpts);
    context.queryClient.ensureQueryData(collectionsOpts);
    context.queryClient.ensureQueryData(testimonialsOpts);
    context.queryClient.ensureQueryData(faqOpts);
  },
  component: HomePage,
});

function HomePage() {
  const { data: products } = useSuspenseQuery(featuredOpts);
  const { data: collections } = useSuspenseQuery(collectionsOpts);
  const { data: testimonials } = useSuspenseQuery(testimonialsOpts);
  const { data: faq } = useSuspenseQuery(faqOpts);

  return (
    <>
      {/* HERO */}
      <section className="pt-12 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 animate-fade-up">
            <p className="eyebrow mb-6">Chế tác thủ công tại Việt Nam</p>
            <h1 className="font-display text-5xl md:text-6xl leading-[1.05] mb-8">
              Đánh thức <br />
              <span className="italic font-normal">vẻ đẹp tâm hồn</span> <br />
              qua từng đóa sen
            </h1>
            <p className="text-forest/70 leading-relaxed mb-10 max-w-sm">
              Trang sức thủ công cao cấp lấy cảm hứng từ biểu tượng hoa sen Việt, mang đậm dấu ấn cá nhân trong từng mắt xích.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/products" className="btn-primary">Khám phá ngay</Link>
              <Link to="/customize" className="btn-outline">Tự thiết kế</Link>
            </div>
          </div>
          <div className="lg:col-span-7 relative">
            <img
              src={heroImg}
              alt="Vòng tay sen vàng thủ công"
              width={1024}
              height={1280}
              className="w-full aspect-[4/5] object-cover shadow-2xl"
            />
            <div className="hidden md:block absolute -bottom-10 -left-10 bg-lotus/30 p-10 backdrop-blur-xl max-w-xs">
              <p className="font-display italic text-2xl text-forest/90">
                "Mỗi chiếc vòng là một câu chuyện riêng biệt."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="py-24 bg-cream-2/50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="eyebrow mb-6">Câu chuyện thương hiệu</p>
          <h2 className="font-display text-4xl md:text-5xl mb-8">
            Hồn sen trong từng <span className="italic">đường nét vàng</span>
          </h2>
          <p className="text-forest/70 leading-relaxed text-lg">
            Lấy cảm hứng từ vẻ đẹp kiên cường và thanh khiết của quốc hoa Việt Nam, mỗi tác phẩm của Pure Floral & Co. là một nghi lễ nhỏ — nơi nghệ nhân, vật liệu và người đeo cùng nhau viết nên một câu chuyện riêng.
          </p>
          <Link to="/about" className="inline-block mt-8 text-sm font-semibold border-b border-forest pb-1">
            Tìm hiểu nguồn gốc →
          </Link>
        </div>
      </section>

      {/* COLLECTIONS */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 gap-4">
            <div>
              <p className="eyebrow mb-3">Bộ sưu tập</p>
              <h2 className="font-display text-4xl">Những dòng sản phẩm biểu tượng</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {collections.map((c, i) => (
              <Link
                key={c.id}
                to="/products"
                search={{ collection: c.slug }}
                className="group block"
              >
                <div className="aspect-square surface-card overflow-hidden bg-cream-2 mb-4 group-hover:scale-[1.01] transition-transform">
                  {c.image_url ? (
                    <img src={c.image_url} alt={c.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full grid place-items-center">
                      <span className="font-display italic text-3xl text-forest/30">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                  )}
                </div>
                <h3 className="font-display text-lg group-hover:text-gold transition-colors">{c.name}</h3>
                <p className="text-xs text-forest/50 mt-1">{c.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* STUDIO TEASER */}
      <section className="py-24 bg-forest text-cream">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <img src={studioImg} alt="Xưởng chế tác" loading="lazy" width={1024} height={1024} className="aspect-square w-full object-cover" />
          </div>
          <div>
            <p className="text-gold text-[10px] uppercase tracking-[0.3em] font-semibold mb-4">Xưởng riêng</p>
            <h2 className="font-display text-4xl mb-6">Xưởng chế tác riêng bạn</h2>
            <p className="text-cream/60 leading-relaxed mb-12">
              Chọn từ hơn 24 mẫu charm sen, đá quý và các loại dây vòng khác nhau để tạo nên món quà ý nghĩa nhất cho chính bạn hoặc người thương.
            </p>
            <div className="space-y-5">
              {[
                ["01.", "Chọn dây cơ bản"],
                ["02.", "Thêm charm & biểu tượng"],
                ["03.", "Khắc tên cá nhân"],
              ].map(([n, l]) => (
                <div key={n} className="flex items-center gap-6 border-b border-white/10 pb-5">
                  <span className="text-gold font-display italic text-2xl">{n}</span>
                  <span className="uppercase tracking-widest text-sm">{l}</span>
                </div>
              ))}
            </div>
            <Link to="/customize" className="btn-gold mt-12 w-full">
              Bắt đầu thiết kế ngay
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="eyebrow mb-3">Sản phẩm nổi bật</p>
              <h2 className="font-display text-4xl">Charm Hoa Sen</h2>
            </div>
            <Link to="/products" className="text-[10px] uppercase tracking-widest border-b border-forest pb-1 font-bold hover:text-gold">
              Xem tất cả
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {products.slice(0, 4).map((p) => (
              <Link key={p.id} to="/products/$slug" params={{ slug: p.slug }} className="group">
                <div className="aspect-[3/4] bg-cream-2 mb-4 overflow-hidden grid place-items-center">
                  {p.image_url ? (
                    <img src={p.image_url} alt={p.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
                  ) : (
                    <span className="font-display italic text-4xl text-gold/30">PF</span>
                  )}
                </div>
                <h3 className="font-display italic text-lg text-center">{p.name}</h3>
                <p className="text-[12px] text-gold uppercase tracking-widest mt-1 text-center">{formatVND(p.price)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-cream-2/50">
        <div className="max-w-6xl mx-auto px-6">
          <p className="eyebrow mb-3 text-center">Khách hàng</p>
          <h2 className="font-display text-4xl text-center mb-16">Lời cảm ơn từ những trái tim</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.slice(0, 3).map((t) => (
              <div key={t.id} className="surface-card p-8">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-sm text-forest/80 leading-relaxed italic mb-6">"{t.content}"</p>
                <p className="text-[11px] uppercase tracking-widest font-bold text-forest/60">— {t.customer_name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHARMS BANNER */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <img src={charmsImg} alt="Bộ sưu tập charm" loading="lazy" width={1280} height={800} className="w-full object-cover" />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="eyebrow mb-3 text-center">Câu hỏi thường gặp</p>
          <h2 className="font-display text-4xl text-center mb-12">Mọi điều bạn cần biết</h2>
          <div className="divide-y divide-forest/10">
            {faq.slice(0, 5).map((item) => (
              <details key={item.id} className="py-6 group">
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <span className="font-display text-lg">{item.question}</span>
                  <span className="text-gold text-2xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-sm text-forest/70 leading-relaxed mt-4">{item.answer}</p>
              </details>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/support" className="btn-outline">Xem tất cả</Link>
          </div>
        </div>
      </section>
    </>
  );
}
