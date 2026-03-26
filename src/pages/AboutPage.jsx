import PageContainer from '../components/PageContainer';

export default function AboutPage() {
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
            <div
              key={item}
              className="rounded-md border border-[#eadfce] bg-white p-5 text-center text-sm font-bold uppercase tracking-[0.08em] text-[#7a552f] shadow-sm"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}