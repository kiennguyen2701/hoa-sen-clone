import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';

const featuredTours = [
  'HÀNH HƯƠNG ẤN ĐỘ - NEPAL 2026',
  'DU LỊCH SINGAPORE - MALAYSIA 2026',
  'DU LỊCH XUYÊN VIỆT 2026',
  'DU LỊCH NHẬT BẢN 2026',
  'DU LỊCH HÀN QUỐC 2026',
  'DU LỊCH BHUTAN 2026',
  'DU LỊCH ĐÀI LOAN 2026',
  'TOUR TỨ ĐẠI DANH SƠN TRUNG QUỐC',
];

const domesticTours = [
  'DU LỊCH ĐÀ NẴNG - BÀ NÀ HILLS',
  'DU LỊCH PHÚ QUỐC 4N3D',
  'THẬP TỰ MIỀN TRUNG (TOUR TẾT 2026)',
  'DU LỊCH ĐÔNG BẮC - HÀ GIANG - CAO BẰNG',
  'DU LỊCH XUYÊN VIỆT 2026',
  'TOUR ĐÀ NẴNG – HUẾ - BÀ NÀ HILLS - ĐỘNG PHONG NHA',
];

const guides = [
  {
    title: 'Tôi đến với Đức Thế Tôn',
    excerpt:
      'Hành trình đi đến vùng đất mang đầy năng lượng của sự chuyển đổi - đất thiêng Bồ Đề Đạo Tràng.',
  },
  {
    title: 'Kinh nghiệm du lịch Ấn Độ: đi hành hương về miền đất Phật',
    excerpt:
      'Kinh nghiệm du lịch Ấn Độ mới nhất mà bạn cần phải cập nhật ngay nếu sắp có chuyến ghé thăm quốc gia đặc sắc này.',
  },
  {
    title: 'Visa Du học Ấn Độ: Điều kiện, Hồ Sơ và Chi Phí',
    excerpt:
      'Du Lịch Hoa Sen hỗ trợ visa du học Ấn Độ cho sinh viên, quý Tăng Ni, phật tử.',
  },
  {
    title: 'Có gì thú vị tại đất nước hạnh phúc nhất thế giới - Bhutan?',
    excerpt:
      'Khám phá Bhutan cùng những trải nghiệm văn hóa, tâm linh và thiên nhiên đặc sắc.',
  },
];

const reviews = [
  {
    name: 'Tổng Lãnh Sự Srilanka',
    text: '(Phiên dịch) Công Ty Du Lịch Hoa Sen! Tôi rất biết ơn vì họ thường xuyên tổ chức các đoàn hành hương qua đất nước của tôi.',
  },
  {
    name: 'Ca Sĩ Đan Trường',
    text: 'Phải nói gì cho hay đây ta. Nói chung là Trường cho Hoa Sen 5 Sao nhé...',
  },
  {
    name: 'Nghệ sĩ Thanh Bạch',
    text: 'Tôi đã có 1 chuyến du lịch thật tuyệt vời. Hoa Sen là một công ty uy tín nha cả nhà.',
  },
];

const services = [
  {
    title: 'Visa du lịch',
    desc: 'Tư vấn hồ sơ, checklist giấy tờ, lịch hẹn và xử lý hồ sơ theo từng điểm đến.',
  },
  {
    title: 'Visa hành hương',
    desc: 'Hỗ trợ đoàn hành hương Ấn Độ, Nepal, Bhutan và các tuyến tâm linh chuyên biệt.',
  },
  {
    title: 'Thiết kế tour riêng',
    desc: 'Xây dựng lịch trình theo nhóm riêng, ngân sách riêng và nhu cầu riêng.',
  },
  {
    title: 'Tư vấn lịch trình',
    desc: 'Tối ưu điểm đến, thời gian bay, visa, lưu trú và các tiện ích đi kèm.',
  },
];

const menuItems = [
  { label: 'TRANG CHỦ', to: '/' },
  { label: 'GIỚI THIỆU', to: '/gioi-thieu' },
  { label: 'DU LỊCH QUỐC TẾ', to: '/du-lich-quoc-te' },
  { label: 'DU LỊCH TRONG NƯỚC', to: '/du-lich-trong-nuoc' },
  { label: 'DỊCH VỤ - VISA', to: '/dich-vu-visa' },
  { label: 'CẨM NANG', to: '/cam-nang' },
  { label: 'ĐÁNH GIÁ', to: '/danh-gia' },
  { label: 'LIÊN HỆ', to: '/lien-he' },
];

function PageContainer({ title, subtitle, children }) {
  return (
    <div className="mx-auto max-w-[1180px] px-4 py-10">
      <div className="mb-6 border-b border-[#eadfce] pb-4">
        <div className="text-sm font-bold uppercase tracking-[0.22em] text-[#a26d1a]">Du Lịch Hoa Sen</div>
        <h1 className="mt-2 text-3xl font-black text-[#714b1f]">{title}</h1>
        {subtitle ? <p className="mt-3 max-w-4xl text-[15px] leading-8 text-[#5f4a33]">{subtitle}</p> : null}
      </div>
      {children}
    </div>
  );
}

function TourCard({ title, index }) {
  return (
    <div className="group overflow-hidden rounded-md border border-[#e8dcc9] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="h-44 bg-[linear-gradient(135deg,#e7d3ae,#b68a47,#6a431d)]" />
      <div className="space-y-3 p-3">
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9e6d2b]">Tour {index + 1}</div>
        <h3 className="min-h-[60px] text-sm font-bold leading-5 text-[#3d2a17]">{title}</h3>
        <button className="rounded-sm border border-[#b78a4d] px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#8b5a22] hover:bg-[#8b5a22] hover:text-white">
          Xem chi tiết
        </button>
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <>
      <section className="border-b border-[#eadfce] bg-[linear-gradient(180deg,#fdf8ee,#f5e7ce)]">
        <div className="mx-auto grid max-w-[1180px] gap-8 px-4 py-10 lg:grid-cols-[1.5fr_1fr]">
          <div className="overflow-hidden rounded-md border border-[#ebd8ba] bg-white shadow-sm">
            <div className="flex h-[360px] items-center justify-center bg-[linear-gradient(120deg,#ead1a0,#c3924f,#6a411a)] px-8 text-center text-white">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.35em]">DU LỊCH HOA SEN 2026</div>
                <h1 className="mt-4 text-4xl font-black leading-tight lg:text-5xl">Hoa Sen Xứ Phật</h1>
                <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/90 lg:text-base">
                  Hành trình tâm linh, du lịch cao cấp, hành hương quốc tế và trải nghiệm chân thật cho khách hàng Việt Nam.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-md border border-[#ebd8ba] bg-white p-5 shadow-sm">
              <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#9b6a27]">Hotline tư vấn</div>
              <div className="mt-2 text-3xl font-black text-[#744815]">0904 999 571</div>
              <div className="mt-3 text-sm leading-7 text-[#6d5538]">
                Tư vấn tour hành hương, du lịch quốc tế, visa và lịch trình riêng theo nhu cầu.
              </div>
            </div>
            <div className="rounded-md border border-[#ebd8ba] bg-[#8c6326] p-5 text-white shadow-sm">
              <div className="text-xs font-bold uppercase tracking-[0.25em] text-white/80">Tour chủ lực</div>
              <div className="mt-2 text-lg font-bold">HÀNH HƯƠNG ẤN ĐỘ - NEPAL 2026</div>
              <div className="mt-3 text-sm leading-7 text-white/90">Điểm nhấn thương hiệu của website gốc, thiên về hành hương và du lịch tâm linh.</div>
            </div>
          </div>
        </div>
      </section>

      <PageContainer
        title="Tour nổi bật"
        subtitle="Trang chủ giữ vai trò landing page tổng hợp. Từ đây khách có thể đi sang từng trang riêng theo menu phía trên."
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredTours.map((tour, index) => (
            <TourCard key={tour} title={tour} index={index} />
          ))}
        </div>
      </PageContainer>
    </>
  );
}

function AboutPage() {
  return (
    <PageContainer
      title="Giới thiệu"
      subtitle="Trang này dành riêng cho hồ sơ năng lực, câu chuyện thương hiệu, sứ mệnh, tầm nhìn, pháp lý và các điểm mạnh của doanh nghiệp."
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4 text-[15px] leading-8 text-[#5f4a33]">
          <p>
            “Hoa Sen Xứ Phật” là một cuộc hành trình tâm linh, tìm về chiếc nôi nhiệm mầu của đạo Phật. Đó là nỗi lòng khao khát, hoài bảo, ấp ủ từ lâu của người con Phật và với tâm nguyện chiêm bái, tu tập và tìm hiểu lịch sử những Thánh tích Phật giáo xứ Ấn Độ.
          </p>
          <p>
            Không những vậy, Du Lịch Hoa Sen còn phát triển thành thương hiệu du lịch tâm linh, du lịch cao cấp và du lịch quốc tế, hướng đến trải nghiệm uy tín, chân thật và chỉn chu.
          </p>
          <p>
            Anh có thể tùy chỉnh trang này thành: giới thiệu công ty, hình ảnh pháp lý, hồ sơ năng lực, video doanh nghiệp, timeline phát triển và đối tác chiến lược.
          </p>
        </div>
        <div className="grid gap-4">
          {['Kinh nghiệm 12 năm', 'Uy tín thương hiệu', 'Tour đoàn riêng', 'Hỗ trợ 24/24'].map((item) => (
            <div key={item} className="rounded-md border border-[#eadfce] bg-white p-5 text-center text-sm font-bold uppercase tracking-[0.08em] text-[#7a552f] shadow-sm">
              {item}
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}

function InternationalToursPage() {
  return (
    <PageContainer
      title="Du lịch quốc tế"
      subtitle="Trang này nên làm dạng danh sách tour, bộ lọc khu vực, giá từ, ngày khởi hành, nút xem chi tiết và nút đặt tour."
    >
      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <input className="rounded-md border border-[#dcc7a6] px-4 py-3" placeholder="Tìm tour quốc tế" />
        <select className="rounded-md border border-[#dcc7a6] px-4 py-3 text-[#6b5840]"><option>Chọn khu vực</option></select>
        <select className="rounded-md border border-[#dcc7a6] px-4 py-3 text-[#6b5840]"><option>Chọn tháng đi</option></select>
        <button className="rounded-md bg-[#8b5a22] px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white">Tìm kiếm</button>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {featuredTours.map((tour, index) => (
          <TourCard key={tour} title={tour} index={index} />
        ))}
      </div>
    </PageContainer>
  );
}

function DomesticToursPage() {
  return (
    <PageContainer
      title="Du lịch trong nước"
      subtitle="Trang này nên chia theo miền Bắc, miền Trung, miền Nam, biển đảo, hành hương trong nước và tour lễ tết."
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {domesticTours.map((tour, index) => (
          <TourCard key={tour} title={tour} index={index} />
        ))}
      </div>
    </PageContainer>
  );
}

function ServicesPage() {
  return (
    <PageContainer
      title="Dịch vụ - Visa"
      subtitle="Trang này phù hợp để thêm bảng giá dịch vụ, checklist hồ sơ, biểu mẫu tải xuống và nút tư vấn nhanh qua Zalo hoặc hotline."
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {services.map((item) => (
          <div key={item.title} className="rounded-md border border-[#eadfce] bg-white p-6 shadow-sm">
            <div className="text-lg font-extrabold text-[#6f4817]">{item.title}</div>
            <p className="mt-3 text-sm leading-7 text-[#65543e]">{item.desc}</p>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

function GuidesPage() {
  return (
    <PageContainer
      title="Cẩm nang"
      subtitle="Trang này nên là blog: bài viết SEO, kinh nghiệm visa, kinh nghiệm hành hương, mẹo đi tour và tin tức du lịch."
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {guides.map((item) => (
          <article key={item.title} className="overflow-hidden rounded-md border border-[#eadfce] bg-white shadow-sm">
            <div className="h-48 bg-[linear-gradient(135deg,#f5e4c3,#d0a164,#815321)]" />
            <div className="p-4">
              <h3 className="text-base font-extrabold leading-6 text-[#6f4817]">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#65543e]">{item.excerpt}</p>
            </div>
          </article>
        ))}
      </div>
    </PageContainer>
  );
}

function ReviewsPage() {
  return (
    <PageContainer
      title="Đánh giá"
      subtitle="Trang này nên tập trung testimonial, video feedback, ảnh đoàn đi tour và các review nổi bật từ khách hàng, nghệ sĩ, tăng ni, phật tử."
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {reviews.map((item) => (
          <div key={item.name} className="rounded-md border border-[#eadfce] bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-[linear-gradient(135deg,#f0d39f,#a26d1a,#6a431d)]" />
              <div className="text-lg font-extrabold text-[#6f4817]">{item.name}</div>
            </div>
            <p className="text-sm leading-7 text-[#65543e]">{item.text}</p>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

function ContactPage() {
  return (
    <PageContainer
      title="Liên hệ"
      subtitle="Trang này nên có form liên hệ thật, bản đồ Google Maps, hotline, email, giờ làm việc và nút chat Zalo."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-md border border-[#eadfce] bg-white p-6 shadow-sm">
          <div className="mb-4 text-xl font-extrabold uppercase text-[#7c511f]">Để lại thông tin, chúng tôi sẽ gọi lại cho bạn!</div>
          <div className="grid gap-4 md:grid-cols-2">
            <input className="rounded-md border border-[#dcc7a6] px-4 py-3 outline-none ring-0 placeholder:text-[#9a8a76]" placeholder="Vui lòng nhập họ tên" />
            <input className="rounded-md border border-[#dcc7a6] px-4 py-3 outline-none ring-0 placeholder:text-[#9a8a76]" placeholder="Vui lòng nhập SĐT" />
            <select className="rounded-md border border-[#dcc7a6] px-4 py-3 text-[#6b5840] outline-none ring-0 md:col-span-2">
              <option>Vui lòng chọn dịch vụ</option>
              <option>Du lịch quốc tế</option>
              <option>Du lịch trong nước</option>
              <option>Dịch vụ visa</option>
              <option>Tour inbound</option>
            </select>
            <textarea className="min-h-[120px] rounded-md border border-[#dcc7a6] px-4 py-3 outline-none ring-0 placeholder:text-[#9a8a76] md:col-span-2" placeholder="Vui lòng nhập nội dung" />
            <button className="rounded-md bg-[#8b5a22] px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white md:col-span-2 md:w-fit">
              Gửi thông tin
            </button>
          </div>
        </div>
        <div className="rounded-md border border-[#eadfce] bg-white p-6 shadow-sm text-sm leading-8 text-[#65543e]">
          <p><strong>Địa chỉ:</strong> Số 101 Nguyễn Văn Lượng, Phường Gò Vấp, TP HCM</p>
          <p><strong>Điện thoại:</strong> 028.6684.5099</p>
          <p><strong>Hotline:</strong> 0904 999 571 - 0839 017 018</p>
          <p><strong>Email:</strong> hanhhuonghoasen@gmail.com</p>
          <p><strong>Giờ làm việc:</strong> 08:00 - 17:30</p>
          <div className="mt-4 h-64 rounded-md bg-[linear-gradient(135deg,#f5e5c6,#c89656,#7d5221)]" />
        </div>
      </div>
    </PageContainer>
  );
}

function SiteHeader() {
  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-4 py-4">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#d8b169] bg-[#fff7e8] text-xl font-extrabold text-[#a56b15]">
            HS
          </div>
          <div>
            <div className="text-xl font-extrabold uppercase tracking-[0.04em] text-[#7c511f]">Công Ty Du Lịch Hành Hương Quốc Tế Hoa Sen</div>
          </div>
        </div>
        <div className="hidden text-right md:block">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#9b6a27]">Hotline tư vấn</div>
          <div className="mt-1 text-2xl font-black text-[#744815]">0904 999 571</div>
        </div>
      </div>

      <nav className="border-y border-[#eadfce] bg-[#f8f1e2]">
        <div className="mx-auto flex max-w-[1180px] items-center gap-1 overflow-x-auto px-4 py-0">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `whitespace-nowrap border-r border-[#eadfce] px-4 py-4 text-sm font-semibold uppercase tracking-[0.04em] ${
                  isActive ? 'bg-[#8c6326] text-white' : 'text-[#6b4a23] hover:bg-[#eddcc0]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="bg-[#5b3818] text-[#f8ead4]">
      <div className="mx-auto grid max-w-[1180px] gap-8 px-4 py-10 lg:grid-cols-[1.3fr_0.8fr_1fr]">
        <div>
          <h3 className="text-xl font-extrabold uppercase leading-8">CÔNG TY TNHH DU LỊCH HÀNH HƯƠNG QUỐC TẾ HOA SEN</h3>
          <div className="mt-4 space-y-2 text-sm leading-7 text-[#f2e3c8]">
            <p>Địa chỉ: Số 101 Nguyễn Văn Lượng, Phường Gò Vấp, TP HCM</p>
            <p>Điện thoại: 028.6684.5099</p>
            <p>Hotline: 0904 999 571 - 0839 017 018</p>
            <p>Email: hanhhuonghoasen@gmail.com</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-extrabold uppercase">Tour Hot</h3>
          <div className="mt-4 space-y-2 text-sm leading-7 text-[#f2e3c8]">
            <p>DU LỊCH QUỐC TẾ</p>
            <p>DU LỊCH TRONG NƯỚC</p>
            <p>DỊCH VỤ - VISA</p>
            <p>TOUR INBOUND</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-extrabold uppercase">Dịch vụ</h3>
          <div className="mt-4 space-y-2 text-sm leading-7 text-[#f2e3c8]">
            <p>HỒ SƠ NĂNG LỰC</p>
            <p>CHÍNH SÁCH BẢO MẬT THÔNG TIN</p>
            <p>PHƯƠNG THỨC THANH TOÁN</p>
            <p>CHÍNH SÁCH THAY ĐỔI, CHUYỂN HOẶC HỦY TOUR</p>
            <p>CHÍNH SÁCH CHUNG</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function HoaSenTravelClone() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#f7f1e6] text-[#3f2d1d]">
        <div className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-3 xl:flex">
          <button className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0a8f3e] text-lg text-white shadow-lg">Z</button>
          <button className="flex h-12 w-12 items-center justify-center rounded-full bg-[#d0892d] text-lg text-white shadow-lg">☎</button>
        </div>

        <SiteHeader />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gioi-thieu" element={<AboutPage />} />
          <Route path="/du-lich-quoc-te" element={<InternationalToursPage />} />
          <Route path="/du-lich-trong-nuoc" element={<DomesticToursPage />} />
          <Route path="/dich-vu-visa" element={<ServicesPage />} />
          <Route path="/cam-nang" element={<GuidesPage />} />
          <Route path="/danh-gia" element={<ReviewsPage />} />
          <Route path="/lien-he" element={<ContactPage />} />
        </Routes>

        <SiteFooter />
      </div>
    </BrowserRouter>
  );
}
