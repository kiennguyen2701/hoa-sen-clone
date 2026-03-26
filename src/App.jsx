const topMenu = [
  'Trang chủ',
  'Giới thiệu',
  'DU LỊCH QUỐC TẾ',
  'DU LỊCH TRONG NƯỚC',
  'DỊCH VỤ - VISA',
  'Cẩm nang',
  'Đánh giá',
  'Liên hệ',
];

const featuredTours = [
  'HÀNH HƯƠNG ẤN ĐỘ - NEPAL 2026',
  'DU LỊCH SINGAPORE - MALAYSIA 2026',
  'DU LỊCH XUYÊN VIỆT 2026',
  'DU LỊCH NHẬT BẢN 2026',
  'DU LỊCH HÀN QUỐC 2026',
  'DU LỊCH BHUTAN 2026',
  'DU LỊCH ĐÀI LOAN 2026',
  'TOUR TỨ ĐẠI DANH SƠN TRUNG QUỐC',
  'TOUR ẤN ĐỘ - TỨ ĐỘNG TÂM CAO CẤP 4 - 5 SAO',
  'DU LỊCH LIÊN TUYẾN ĐÔNG - TÂY BẮC',
  'DU LỊCH THÁI LAN 5 SAO',
  'THƯỢNG HẢI – Ô TRẤN – HÀNG CHÂU ( KHÔNG SHOPPING )',
  'DU LỊCH GIANG NAM THƯỢNG HẢI – Ô TRẤN 2026',
  'TOUR ẤN ĐỘ [ ĐẢNH LỄ ĐỨC ĐẠT LAI LẠT MA ] - DHARAMSHALA',
  'TOUR CHIÊM BÁI LỤC TỔ THIỀN TÔNG TRUNG HOA 2026',
  'DU LỊCH BALI - INDONESIA 2026',
  'TOUR LỆ GIANG - CÔN MINH - ĐẠI LÝ SHAGRILA 2026',
  'TOUR ĐÀ NẴNG - BÀ NÀ HILLS',
  'TOUR CỬU TRẠI CÂU THÀNH ĐÔ – GIA CÔ SƠN 2026',
  'TOUR ĐÀ NẴNG – HUẾ - BÀ NÀ HILLS - ĐỘNG PHONG NHA',
  'TOUR LỆ GIANG - CÔN MINH - ĐẠI LÝ SHAGRILA 2026 (5N4Đ)',
  'THẬP TỰ MIỀN TRUNG (TOUR TẾT 2026)',
  'DU LỊCH LÀO (ĐƯỜNG BAY)',
  'TOUR PHỔ ĐÀ SƠN – NGŨ ĐÀI SƠN – CỬU HOA SƠN 2026',
  'DU LỊCH ĐÔNG BẮC - HÀ GIANG - CAO BẰNG',
  'DU LỊCH PHÚ QUỐC 4N3D',
  'DU LỊCH BẮC KINH – THƯỢNG HẢI – HÀNG CHÂU - Ô TRẤN',
  'TOUR DUBAI - ABU DHABI 2026',
  'TOUR LỤC TỔ THIỀN SƯ - TQ (TOUR ĐỘC QUYỀN HOA SEN)',
  'DU LỊCH TÂY AN - TÂN CƯƠNG - ĐÔN HOÀNG [ TRUNG QUỐC: CON ĐƯỜNG TƠ LỤA ]',
  'DU LỊCH LÀO TẾT 2026 (ĐƯỜNG XE)',
  'TOUR LIÊN TUYẾN LÀO - THÁI LAN 2026',
];

const destinations = [
  { name: 'Ấn Độ - Nepal', count: 'Đã có 776,072 lượt khách' },
  { name: 'Thái Lan', count: 'Đã có 476,099 lượt khách' },
  { name: 'Xuyên Việt', count: 'Đã có 375,922 lượt khách' },
  { name: 'Campuchia - Thái lan', count: 'Đã có 346,055 lượt khách' },
];

const guides = [
  {
    title: 'Tôi đến với Đức Thế Tôn',
    excerpt:
      'Hành trình đi đến vùng đất mang đầy năng lượng của sự chuyển đổi - đất thiêng Bồ Đề Đạo Tràng',
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
    text: '(Phiên dịch) Công Ty Du Lịch Hoa Sen! Tôi rất biết ơn vì họ thường xuyên tổ chức các đoàn hành hương qua đất nước của tôi. Điều đó giúp cho 2 nước Việt Nam và Srilanka gần nhau hơn.',
  },
  {
    name: 'Ca Sĩ Đan Trường',
    text: 'Phải nói gì cho hay đây ta. Nói chung là Trường cho Hoa Sen 5 Sao nhé...',
  },
  {
    name: 'Nghệ sĩ Thanh Bạch',
    text: 'Tôi đã có 1 chuyến du lịch thật tuyệt vời. Hoa Sen là một công ty uy tín nha cả nhà. Dịch vụ chuẩn 4 sao, tôi rất thích, hdv công ty này cũng rất nhiệt tình, có tính hài hước.',
  },
  {
    name: 'Nhạc Sĩ Sỹ Luân',
    text: 'Luân và vợ đã có một chuyến đi cùng Hoa Sen rất tuyệt vời, cảm ơn các bạn nhiều nhé. Lúc đầu mình tưởng giá rẻ đi cùng bình thường thôi, ai ngờ đâu dịch vụ chất lượng vô cùng nha ^^',
  },
  {
    name: 'Sư Thầy Thích Thiện Chiếu',
    text: 'Đến được Ấn Độ là mơ ước của cuộc đời tôi, nhưng nó sẽ không trọn vẹn nếu không có công ty Du Lịch Hoa Sen của Thầy Đức.',
  },
  {
    name: 'Ca sĩ Cát Tuyền',
    text: 'Chuyến du lịch của Tuyền vui lắm luôn, mọi người trên xe ai cũng thích hết... phần lớn là do dịch vụ quá tốt.',
  },
];

const reasons = [
  { title: 'Kinh Nghiệm 12 Năm', desc: 'Uy Tín, Chất Lượng, Đa Dạng...' },
  { title: 'Giá cả', desc: 'Luôn luôn có giá tốt nhất' },
  { title: 'Thanh toán', desc: 'An toàn & linh hoạt' },
  { title: 'Tư vấn', desc: 'Hỗ trợ 24/24' },
];

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

export default function HoaSenTravelClone() {
  return (
    <div className="min-h-screen bg-[#f7f1e6] text-[#3f2d1d]">
      <div className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-3 xl:flex">
        <button className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0a8f3e] text-lg text-white shadow-lg">Z</button>
        <button className="flex h-12 w-12 items-center justify-center rounded-full bg-[#d0892d] text-lg text-white shadow-lg">☎</button>
      </div>

      <header className="relative z-40 border-b border-[#e9dbc5] bg-white">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-4 py-2 text-xs font-medium text-[#7a552f]">
          <div className="flex items-center gap-2">
            <span className="font-bold uppercase">DU LỊCH HOA SEN</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Hotline tư vấn</span>
            <span className="font-bold text-[#ad6b0f]">0904 999 571</span>
          </div>
        </div>

        <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-6 px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#d8b169] bg-[#fff7e8] text-xl font-extrabold text-[#a56b15]">
              HS
            </div>
            <div>
              <div className="text-xl font-extrabold uppercase tracking-[0.04em] text-[#7c511f]">Công Ty Du Lịch Hành Hương Quốc Tế Hoa Sen</div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#eadfce] bg-[#f8f1e2]">
          <div className="mx-auto flex max-w-[1180px] items-center gap-1 overflow-x-auto px-4 py-0">
            {topMenu.map((item, index) => (
              <a
                key={item}
                href="#"
                className={`whitespace-nowrap border-r border-[#eadfce] px-4 py-4 text-sm font-semibold uppercase tracking-[0.04em] ${
                  index === 0 ? 'bg-[#8c6326] text-white' : 'text-[#6b4a23] hover:bg-[#eddcc0]'
                }`}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </header>

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

      <main>
        <section className="mx-auto max-w-[1180px] px-4 py-10">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-extrabold uppercase text-[#7c511f]">Tour nổi bật</h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredTours.map((tour, index) => (
              <TourCard key={tour} title={tour} index={index} />
            ))}
          </div>
        </section>

        <section className="border-y border-[#eadfce] bg-white">
          <div className="mx-auto grid max-w-[1180px] gap-8 px-4 py-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-[#a26d1a]">Tầm nhìn</div>
              <h2 className="text-3xl font-black text-[#714b1f]">“Hoa Sen Xứ Phật” Một Hành Trình Tâm Linh</h2>
              <div className="mt-5 space-y-4 text-[15px] leading-8 text-[#5f4a33]">
                <p>
                  “Hoa Sen Xứ Phật” là một cuộc hành trình tâm linh, tìm về chiếc nôi nhiệm mầu của đạo Phật. Đó là nỗi lòng khao khát, hoài bảo, ấp ủ từ lâu của người con Phật và với tâm nguyện chiêm bái, tu tập và tìm hiểu lịch sử những Thánh tích Phật giáo xứ Ấn Độ - mảnh đất tâm linh khai sáng đạo Phật.
                </p>
                <p>
                  Không những vậy Công Ty Du Lịch Hoa Sen cũng trở thành một trong những thương hiệu du lịch hàng đầu Việt Nam về Du lịch Tâm Linh, Du Lịch Cao cấp, Du lịch Quốc Tế nhằm nâng cao vị thế và hình ảnh của người Việt Nam.
                </p>
                <p>
                  Phát triển trên 12 năm theo xu hướng du lịch kết hợp hành hương cao cấp, bền vững và chân thật; Du Lịch Hoa Sen luôn là điểm đến đáng tin cậy dành cho mọi khách hàng.
                </p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {['DU LỊCH QUỐC TẾ', 'DU LỊCH TRONG NƯỚC', 'DỊCH VỤ - VISA', 'TOUR INBOUND'].map((item) => (
                <div key={item} className="rounded-md border border-[#eadfce] bg-[#faf4ea] p-5 text-center text-sm font-bold uppercase tracking-[0.08em] text-[#7a552f] shadow-sm">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1180px] px-4 py-10">
          <h2 className="mb-6 text-2xl font-extrabold uppercase text-[#7c511f]">Điểm đến yêu thích</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.map((item) => (
              <div key={item.name} className="overflow-hidden rounded-md border border-[#e7dac5] bg-white shadow-sm">
                <div className="h-52 bg-[linear-gradient(135deg,#f0ddbb,#cb9b59,#7a4f21)]" />
                <div className="p-4 text-center">
                  <div className="text-lg font-extrabold text-[#6f4817]">{item.name}</div>
                  <div className="mt-2 text-sm text-[#6b5840]">{item.count}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-[#eadfce] bg-white">
          <div className="mx-auto max-w-[1180px] px-4 py-10">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 className="text-2xl font-extrabold uppercase text-[#7c511f]">Cẩm nang du lịch</h2>
              <a href="#" className="text-sm font-semibold text-[#9e6d2b]">Xem thêm</a>
            </div>
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
          </div>
        </section>

        <section className="mx-auto max-w-[1180px] px-4 py-10">
          <h2 className="text-2xl font-extrabold uppercase text-[#7c511f]">Review</h2>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-[#63523d]">
            Du Lịch Hoa Sen luôn hướng đến sự uy tín và chân thật trong từng Tour đến từng khách hàng. Để đạt đến sự trọn vẹn ngày nay, là thành quả của những quý khách luôn yêu quý và ủng hộ Hành Hương Hoa Sen...
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
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

          <div className="mt-8 rounded-md border border-[#eadfce] bg-white p-6 shadow-sm">
            <div className="mb-4 text-lg font-extrabold uppercase text-[#7c511f]">Hình ảnh</div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="h-28 rounded-md bg-[linear-gradient(135deg,#f5e5c6,#c89656,#7d5221)]" />
              ))}
            </div>
            <div className="mt-4 text-sm font-semibold text-[#9e6d2b]">Xem tất cả hình ảnh về chúng tôi</div>
          </div>
        </section>

        <section className="border-y border-[#eadfce] bg-[#fbf6ee]">
          <div className="mx-auto max-w-[1180px] px-4 py-10">
            <h2 className="mb-6 text-center text-2xl font-extrabold uppercase text-[#7c511f]">Tại sao chọn chúng tôi</h2>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {reasons.map((item) => (
                <div key={item.title} className="rounded-md border border-[#eadfce] bg-white p-6 text-center shadow-sm">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f4e2c0] text-2xl text-[#9e6d2b]">✦</div>
                  <div className="mt-4 text-lg font-extrabold text-[#6f4817]">{item.title}</div>
                  <div className="mt-2 text-sm leading-7 text-[#65543e]">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1180px] px-4 py-10">
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
        </section>
      </main>

      <footer className="bg-[#5b3818] text-[#f8ead4]">
        <div className="mx-auto grid max-w-[1180px] gap-8 px-4 py-10 lg:grid-cols-[1.3fr_0.8fr_1fr]">
          <div>
            <h3 className="text-xl font-extrabold uppercase leading-8">CÔNG TY TNHH DU LỊCH HÀNH HƯƠNG QUỐC TẾ HOA SEN</h3>
            <div className="mt-4 space-y-2 text-sm leading-7 text-[#f2e3c8]">
              <p>Địa chỉ: Số 101 Nguyễn Văn Lượng, Phường Gò Vấp, TP HCM</p>
              <p>Điện thoại: 028.6684.5099</p>
              <p>Hotline: 0904 999 571 - 0839 017 018</p>
              <p>Email: hanhhuonghoasen@gmail.com</p>
              <p>MST: 0312342016 - Do SK&ĐT TP.HCM</p>
              <p>Cấp ngày 25/06/2013 - Cấp thay đổi ngày 14/10/2021</p>
              <p>Giấy Phép Lữ Hành Quốc Tế: 79-766/2022 /TCDL-GP LHQT</p>
              <p>Do TCDL cấp ngày 31/08/2017 - Cấp thay đổi ngày 23/02/2022</p>
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
              <p>Website: Hanhhuonghoasen.com.vn / Dulichhoasen.vn</p>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 py-4 text-center text-sm text-[#ecdcc0]">
          © 2022 DU LỊCH HOA SEN. Bản dựng 1 trang theo cấu trúc website gốc.
        </div>
      </footer>
    </div>
  );
}

