import PageContainer from '../components/PageContainer';

export default function ContactPage() {
  return (
    <PageContainer
      title="Liên hệ"
      subtitle="Vui lòng liên hệ với chúng tôi qua Hotline, Email hoặc Văn phòng đại diện của công ty! Xin chân thành cảm ơn."
    >
             

        <div className="rounded-md border border-[#eadfce] bg-white p-6 shadow-sm text-sm leading-8 text-[#65543e]">
          <p><strong>Địa chỉ:</strong> Số 1 Ngách 160/6 Bạch Đằng, Phường Hồng Hà, Hà Nội</p>
          <p><strong>Điện thoại:</strong> 0965 692 959</p>
          <p><strong>Hotline:</strong> 0965 692 959 - 0366 040 959</p>
          <p><strong>Email:</strong> MvipTravel@gmail.com</p>
          <p><strong>Giờ làm việc:</strong> 08:00 - 17:30</p>
          <div className="overflow-hidden rounded-2xl shadow-lg">
  <iframe
    src="https://www.google.com/maps?q=B%E1%BA%A1ch%20%C4%90%E1%BA%B1ng%2C%20H%E1%BB%93ng%20H%C3%A0%2C%20H%C3%A0%20N%E1%BB%99i&z=16&output=embed"
    className="h-[320px] w-full border-0"
    loading="lazy"
    allowFullScreen
    referrerPolicy="no-referrer-when-downgrade"
    title="Google Map MVIP Travel"
  />
  </div>
</div>
      
    </PageContainer>
  );
}