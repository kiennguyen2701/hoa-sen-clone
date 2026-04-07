import { Link } from 'react-router-dom';

const quickLinks = [
  { label: 'Trang chủ', to: '/' },
  { label: 'Giới thiệu', to: '/gioi-thieu' },
  { label: 'Du lịch quốc tế', to: '/du-lich-quoc-te' },
  { label: 'Du lịch trong nước', to: '/du-lich-noi-dia' },
  { label: 'Dịch vụ - Visa', to: '/dich-vu-visa' },
  { label: 'Liên hệ', to: '/lien-he' },
];

const supportLinks = [
  { label: 'Đánh giá khách hàng', to: '/danh-gia' },
  { label: 'Tìm tour', to: '/tim-kiem' },
  { label: 'Cộng tác viên', to: '/login' },
];

export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-[#e7dac4] bg-[#fffaf2]">
      <div className="mx-auto max-w-[1180px] px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-[#caa56b] text-lg font-black text-[#8b5a22]">
                VIP
              </div>

              <div>
                <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#a26d1a]">
                  Mvip Travel
                </div>
                <div className="mt-1 text-xl font-black uppercase leading-tight text-[#5c3d18]">
                  Công ty cổ phần du lịch MVIP
                </div>
              </div>
            </div>

            <p className="mt-5 max-w-[420px] text-[15px] leading-8 text-[#5f4a33]">
              MVIP Travel đồng hành cùng khách hàng trong các hành trình trong nước
              và quốc tế với trải nghiệm chỉn chu, lịch trình chọn lọc và dịch vụ
              tận tâm.
            </p>

            <div className="mt-6 grid gap-3 text-[15px] text-[#5f4a33]">
              <a href="tel:0965692959" className="transition hover:text-[#8b5a22]">
                <span className="font-bold text-[#714b1f]">Hotline:</span> 0965 692 959
              </a>
              <a
                href="mailto:kiennguyen2701@gmail.com"
                className="transition hover:text-[#8b5a22]"
              >
                <span className="font-bold text-[#714b1f]">Email:</span>{' '}
                kiennguyen2701@gmail.com
              </a>
              <div>
                <span className="font-bold text-[#714b1f]">Giờ làm việc:</span> 08:00 -
                17:30 mỗi ngày
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm font-black uppercase tracking-[0.14em] text-[#8b5a22]">
              Khám phá
            </div>

            <div className="mt-5 grid gap-3">
              {quickLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="text-[15px] text-[#5f4a33] transition hover:translate-x-1 hover:text-[#8b5a22]"
                >{item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="text-sm font-black uppercase tracking-[0.14em] text-[#8b5a22]">
              Hỗ trợ
            </div>

            <div className="mt-5 grid gap-3">
              {supportLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="text-[15px] text-[#5f4a33] transition hover:translate-x-1 hover:text-[#8b5a22]"
                >
                  {item.label}
                </Link>
              ))}

              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                className="text-[15px] text-[#5f4a33] transition hover:translate-x-1 hover:text-[#8b5a22]"
              >
                Facebook
              </a>

              <a
                href="https://zalo.me/"
                target="_blank"
                rel="noreferrer"
                className="text-[15px] text-[#5f4a33] transition hover:translate-x-1 hover:text-[#8b5a22]"
              >
                Zalo
              </a>
            </div>
          </div>

          <div>
            <div className="text-sm font-black uppercase tracking-[0.14em] text-[#8b5a22]">
              Liên hệ nhanh
            </div>

            <div className="mt-5 rounded-[24px] border border-[#eadfce] bg-white p-5 shadow-sm">
              <div className="text-lg font-black text-[#714b1f]">Tư vấn hành trình</div>
              <p className="mt-2 text-sm leading-7 text-[#5f4a33]">
                Kết nối ngay với MVIP Travel để được tư vấn chương trình phù hợp,
                báo giá nhanh và hỗ trợ đặt dịch vụ.
              </p>

              <div className="mt-5 grid gap-3">
                <a
                  href="tel:0965692959"
                  className="inline-flex items-center justify-center rounded-2xl bg-[#8b5a22] px-4 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[#744815]"
                >
                  Gọi ngay
                </a>

                <Link
                  to="/lien-he"
                  className="inline-flex items-center justify-center rounded-2xl border border-[#d8c4a3] px-4 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[#8b5a22] transition hover:bg-[#fcf6ec]"
                >
                  Gửi yêu cầu
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-[#eadfce] pt-5">
          <div className="flex flex-col gap-3 text-sm text-[#7b6853] md:flex-row md:items-center md:justify-between">
            <div>© {new Date().getFullYear()} MVIP Travel. All rights reserved.</div>
            <div className="flex flex-wrap items-center gap-4"><span>Thiết kế giao diện bởi MVIP Travel</span>
              <span className="hidden h-1 w-1 rounded-full bg-[#c7b193] md:block" />
              <span>Du lịch chỉn chu - trải nghiệm đáng nhớ</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}