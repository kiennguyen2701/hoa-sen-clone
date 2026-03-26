import PageContainer from '../components/PageContainer';

export default function ContactPage() {
  return (
    <PageContainer
      title="Liên hệ"
      subtitle="Trang này nên có form liên hệ thật, bản đồ Google Maps, hotline, email, giờ làm việc và nút chat Zalo."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-md border border-[#eadfce] bg-white p-6 shadow-sm">
          <div className="mb-4 text-xl font-extrabold uppercase text-[#7c511f]">
            Để lại thông tin, chúng tôi sẽ gọi lại cho bạn!
          </div>
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