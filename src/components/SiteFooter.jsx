import { Link } from 'react-router-dom';

export default function SiteFooter({ mobile = false }) {
  return (
    <footer
      className={
        mobile
          ? 'mt-8 bg-[#6b3f12] px-4 py-8 text-white'
          : 'mt-12 bg-[#6b3f12] px-8 py-14 text-white'
      }
    >
      <div className="mx-auto max-w-[1180px]">
        <div
          className={
            mobile
              ? 'space-y-8'
              : 'grid gap-10 md:grid-cols-2 xl:grid-cols-4'
          }
        >
          {/* Company */}
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-white/70">
              MVIP Travel
            </div>

            <h3
              className={
                mobile
                  ? 'mt-3 text-2xl font-black'
                  : 'mt-3 text-3xl font-black'
              }
            >
              CÔNG TY CỔ PHẦN DU LỊCH MVIP
            </h3>

            <div
              className={
                mobile
                  ? 'mt-4 space-y-3 text-sm leading-7 text-white/90'
                  : 'mt-5 space-y-4 text-base leading-8 text-white/90'
              }
            >
              <p>Địa chỉ: Số 1 Ngách 160/6 Bạch Đằng, Hà Nội</p>
              <p>Điện thoại: 029.9999.9999</p>
              <p>Hotline: 0965 692 959 - 0366 040 959</p>
              <p>Email: MvipTravel@gmail.com</p>
            </div>
          </div>

          {/* Tour hot */}
          <div>
            <h4
              className={
                mobile
                  ? 'text-xl font-black'
                  : 'text-2xl font-black'
              }
            >
              TOUR HOT
            </h4>

            <div
              className={
                mobile
                  ? 'mt-4 space-y-3 text-sm leading-7 text-white/90'
                  : 'mt-5 space-y-4 text-base leading-8 text-white/90'
              }
            >
              <Link to="/du-lich-quoc-te" className="block hover:text-white">
                DU LỊCH QUỐC TẾ
              </Link>

              <Link to="/du-lich-trong-nuoc" className="block hover:text-white">
                DU LỊCH TRONG NƯỚC
              </Link>

              <Link to="/visa" className="block hover:text-white">
                DỊCH VỤ - VISA
              </Link>

              <Link to="/inbound" className="block hover:text-white">
                TOUR INBOUND
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4
              className={
                mobile
                  ? 'text-xl font-black'
                  : 'text-2xl font-black'
              }
            >
              DỊCH VỤ
            </h4>

            <div
              className={
                mobile
                  ? 'mt-4 space-y-3 text-sm leading-7 text-white/90'
                  : 'mt-5 space-y-4 text-base leading-8 text-white/90'
              }
>
              <Link to="/ho-so-nang-luc" className="block hover:text-white">
                HỒ SƠ NĂNG LỰC
              </Link>

              <Link to="/bao-mat" className="block hover:text-white">
                CHÍNH SÁCH BẢO MẬT
              </Link>

              <Link to="/thanh-toan" className="block hover:text-white">
                PHƯƠNG THỨC THANH TOÁN
              </Link>

              <Link to="/doi-huy-tour" className="block hover:text-white">
                CHÍNH SÁCH ĐỔI / HỦY TOUR
              </Link>

              <Link to="/chinh-sach-chung" className="block hover:text-white">
                CHÍNH SÁCH CHUNG
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h4
              className={
                mobile
                  ? 'text-xl font-black'
                  : 'text-2xl font-black'
              }
            >
              HỖ TRỢ
            </h4>

            <div
              className={
                mobile
                  ? 'mt-4 space-y-3 text-sm leading-7 text-white/90'
                  : 'mt-5 space-y-4 text-base leading-8 text-white/90'
              }
            >
              <p>Hỗ trợ 08:00 - 17:30 mỗi ngày</p>
              <p>Tư vấn lịch trình</p>
              <p>Hỗ trợ visa & giấy tờ</p>
              <p>Chăm sóc khách hàng</p>
            </div>
          </div>
        </div>

        <div
          className={
            mobile
              ? 'mt-8 border-t border-white/15 pt-4 text-center text-xs text-white/70'
              : 'mt-10 border-t border-white/15 pt-5 text-center text-sm text-white/70'
          }
        >
          © 2026 MVIP Travel. All rights reserved.
        </div>
      </div>
    </footer>
  );
}