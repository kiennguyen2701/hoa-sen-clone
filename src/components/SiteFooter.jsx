export default function SiteFooter() {
  return (
    <footer className="bg-[#5b3818] text-[#f8ead4]">
      <div className="mx-auto grid max-w-[1180px] gap-8 px-4 py-10 lg:grid-cols-[1.3fr_0.8fr_1fr]">
        <div>
          <h3 className="text-xl font-extrabold uppercase leading-8">
            CÔNG TY TNHH DU LỊCH HÀNH HƯƠNG QUỐC TẾ HOA SEN
          </h3>
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