import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Câu chuyện thương hiệu — Pure Floral & Co." },
      { name: "description", content: "Câu chuyện về Pure Floral & Co., ý nghĩa hoa sen và hành trình chế tác thủ công." },
      { property: "og:title", content: "Câu chuyện Pure Floral & Co." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <header className="text-center mb-16">
        <p className="eyebrow mb-3">Câu chuyện</p>
        <h1 className="font-display text-5xl">Hồn sen Việt trong từng chi tiết</h1>
      </header>

      <div className="prose-custom space-y-8 text-forest/80 leading-relaxed">
        <p className="text-lg">
          Pure Floral & Co. ra đời từ một mong muốn rất đơn giản — gìn giữ vẻ đẹp của hoa sen, quốc hoa Việt Nam, vào những món trang sức được tạo nên bằng đôi tay và sự kiên nhẫn.
        </p>

        <div className="border-l-2 border-gold pl-6 my-12">
          <p className="font-display italic text-2xl">
            "Hoa sen nảy nở từ bùn nhầy, nhưng vẫn vươn mình tỏa hương thơm ngát."
          </p>
        </div>

        <h2 className="font-display text-3xl mt-12">Ý nghĩa của hoa sen</h2>
        <p>
          Trong văn hóa Việt, hoa sen là biểu tượng của sự thanh khiết, kiên cường và lòng từ bi. Mỗi cánh sen chúng tôi chế tác đều mang theo lời nhắn ấy — một lời chúc thầm lặng dành cho người đeo.
        </p>

        <h2 className="font-display text-3xl mt-12">Quy trình chế tác</h2>
        <ul className="space-y-4">
          <li className="flex gap-4"><span className="text-gold font-display italic text-xl">01.</span><span>Phác thảo từ cảm hứng thiên nhiên Việt Nam.</span></li>
          <li className="flex gap-4"><span className="text-gold font-display italic text-xl">02.</span><span>Chọn vật liệu từ các nguồn cung địa phương: bạc 925, vàng 18K, ngọc trai nước ngọt, đá phong thủy.</span></li>
          <li className="flex gap-4"><span className="text-gold font-display italic text-xl">03.</span><span>Chế tác thủ công bởi nghệ nhân tại xưởng riêng.</span></li>
          <li className="flex gap-4"><span className="text-gold font-display italic text-xl">04.</span><span>Đóng gói trong hộp gỗ với thiệp viết tay.</span></li>
        </ul>

        <h2 className="font-display text-3xl mt-12">Giá trị của chúng tôi</h2>
        <p>
          <strong>Thanh lịch.</strong> Mỗi chi tiết tối giản nhưng có chủ đích. <br />
          <strong>Cá nhân hóa.</strong> Bạn có thể tự thiết kế món trang sức của riêng mình. <br />
          <strong>Bản sắc Việt.</strong> Tôn vinh nghệ thuật thủ công và biểu tượng văn hóa quê hương. <br />
          <strong>Món quà ý nghĩa.</strong> Mỗi sản phẩm là một câu chuyện được trao tay.
        </p>
      </div>

      <div className="text-center mt-20">
        <Link to="/customize" className="btn-primary">Bắt đầu thiết kế</Link>
      </div>
    </div>
  );
}
