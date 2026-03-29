import PageContainer from '../components/PageContainer';

const values = [
  {
    title: 'Chuyên nghiệp',
    desc: 'Mvip Travel xây dựng quy trình vận hành rõ ràng, tư vấn minh bạch và theo sát khách hàng từ lúc lên kế hoạch đến khi kết thúc hành trình.',
  },
  {
    title: 'Tận tâm',
    desc: 'Mỗi chuyến đi không chỉ là một tour, mà là trải nghiệm thực tế của khách hàng. Vì vậy đội ngũ luôn ưu tiên sự chỉn chu, nhanh nhạy và hỗ trợ kịp thời.',
  },
  {
    title: 'Linh hoạt',
    desc: 'Từ tour ghép, tour riêng, tour đoàn doanh nghiệp đến các chương trình thiết kế theo nhu cầu, Mvip Travel luôn có phương án phù hợp cho từng nhóm khách.',
  },
  {
    title: 'Uy tín',
    desc: 'Cam kết thông tin rõ ràng, chi phí hợp lý, dịch vụ đúng tiêu chuẩn và luôn đặt sự hài lòng của khách hàng làm trung tâm.',
  },
];

const services = [
  'Tổ chức tour quốc tế trọn gói',
  'Tổ chức tour trong nước và nghỉ dưỡng',
  'Thiết kế tour riêng theo yêu cầu',
  'Tour đoàn doanh nghiệp, hội nhóm, gia đình',
  'Dịch vụ visa, hỗ trợ hồ sơ du lịch',
  'Tư vấn lịch trình và tối ưu ngân sách',
];

const reasons = [
  'Đội ngũ am hiểu điểm đến, tư vấn sát nhu cầu khách hàng',
  'Lịch trình tối ưu giữa trải nghiệm, thời gian và chi phí',
  'Đối tác dịch vụ được chọn lọc kỹ về vận chuyển, lưu trú và vận hành',
  'Chăm sóc khách hàng trước, trong và sau chuyến đi',
  'Khả năng xử lý tình huống nhanh và hỗ trợ linh hoạt',
  'Phù hợp cả khách lẻ, khách gia đình và khách đoàn lớn',
];

export default function AboutPage() {
  return (
    <PageContainer
      title="Giới thiệu"
      subtitle="Mvip Travel là đơn vị tổ chức tour chuyên nghiệp, tập trung vào chất lượng dịch vụ, trải nghiệm thực tế và sự đồng hành lâu dài cùng khách hàng."
    >
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-8">
          <section className="rounded-3xl border border-[#eadfce] bg-white p-6 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#a26d1a]">
              Về chúng tôi
            </div>
            <h2 className="mt-3 text-3xl font-black text-[#714b1f]">
              Mvip Travel – Tổ chức hành trình bằng sự chuyên nghiệp và tinh thần phục vụ
            </h2>

            <div className="mt-5 space-y-4 text-[15px] leading-8 text-[#5f4a33]">
              <p>
                Mvip Travel được xây dựng với định hướng trở thành đơn vị tổ chức tour
                chuyên nghiệp, hiện đại và đáng tin cậy trong lĩnh vực du lịch. Chúng tôi
                không chỉ cung cấp một chuyến đi, mà tập trung kiến tạo hành trình chỉn chu
                từ khâu tư vấn, lên kế hoạch, triển khai dịch vụ đến chăm sóc khách hàng sau
                tour.
              </p>

              <p>
                Với kinh nghiệm tổ chức nhiều dòng sản phẩm từ tour quốc tế, tour trong nước,
                tour nghỉ dưỡng, tour đoàn doanh nghiệp đến các chương trình thiết kế riêng,
                Mvip Travel luôn đặt mục tiêu mang lại trải nghiệm rõ ràng, thoải mái và phù
                hợp nhất cho từng đối tượng khách hàng.
              </p>

              <p>
                Chúng tôi tin rằng một thương hiệu du lịch chuyên nghiệp phải được đo bằng
                chất lượng vận hành, sự minh bạch trong thông tin, khả năng xử lý tình huống
                và sự hài lòng thực tế của khách hàng. Đó cũng chính là nền tảng mà Mvip
                Travel theo đuổi trong từng chương trình.
              </p>
            </div>
          </section>

          <section className="rounded-3xl border border-[#eadfce] bg-white p-6 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#a26d1a]">
              Tầm nhìn
            </div>
            <h2 className="mt-3 text-2xl font-black text-[#714b1f]">
              Trở thành đối tác du lịch đáng tin cậy cho khách cá nhân, gia đình và doanh nghiệp
            </h2>
            <p className="mt-4 text-[15px] leading-8 text-[#5f4a33]">
              Mvip Travel hướng đến việc phát triển thành thương hiệu du lịch được khách hàng
              lựa chọn khi cần một đơn vị tổ chức tour có tư duy dịch vụ tốt, vận hành chắc,
              nội dung sản phẩm rõ ràng và khả năng đáp ứng linh hoạt cho nhiều phân khúc.
            </p>
          </section>

          <section className="rounded-3xl border border-[#eadfce] bg-white p-6 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#a26d1a]">
              Sứ mệnh
            </div>
            <h2 className="mt-3 text-2xl font-black text-[#714b1f]">
              Mang đến những chuyến đi hiệu quả, đáng nhớ và đúng với kỳ vọng khách hàng
            </h2>
            <p className="mt-4 text-[15px] leading-8 text-[#5f4a33]">
              Mỗi hành trình do Mvip Travel tổ chức đều được xây dựng với tinh thần tối ưu
              trải nghiệm, minh bạch thông tin và nâng cao giá trị thực tế cho khách hàng.
              Chúng tôi mong muốn mỗi chuyến đi không chỉ thuận lợi, mà còn để lại cảm giác
              yên tâm và hài lòng khi lựa chọn đồng hành.
            </p>
          </section>
        </div>

        <div className="space-y-8">
          <section className="rounded-3xl border border-[#eadfce] bg-white p-6 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#a26d1a]">
              Dịch vụ nổi bật
            </div>
            <div className="mt-4 space-y-3">
              {services.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-[#eadfce] bg-[#fcfaf5] px-4 py-3 text-sm font-semibold text-[#6f4817]"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-[#eadfce] bg-white p-6 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#a26d1a]">
              Giá trị cốt lõi
            </div>
            <div className="mt-5 grid gap-4">
              {values.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-[#eadfce] bg-[#fcfaf5] p-4"
                >
                  <div className="text-lg font-black text-[#714b1f]">{item.title}</div>
                  <div className="mt-2 text-sm leading-7 text-[#5f4a33]">{item.desc}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <section className="mt-8 rounded-3xl border border-[#eadfce] bg-white p-6 shadow-sm">
        <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#a26d1a]">
          Vì sao chọn Mvip Travel
        </div>
        <h2 className="mt-3 text-2xl font-black text-[#714b1f]">
          Một đơn vị tổ chức tour đáng tin cậy cần nhiều hơn một lịch trình đẹp
        </h2>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {reasons.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-[#eadfce] bg-[#fcfaf5] p-4 text-[15px] leading-7 text-[#5f4a33]"
            >
              • {item}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-[#eadfce] bg-[linear-gradient(135deg,#f8efe0,#f3e1be)] p-6 shadow-sm">
        <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#a26d1a]">
          Cam kết dịch vụ
        </div>
        <h2 className="mt-3 text-2xl font-black text-[#714b1f]">
          Mvip Travel cam kết đồng hành bằng chất lượng thật
        </h2>

        <div className="mt-5 space-y-4 text-[15px] leading-8 text-[#5f4a33]">
          <p>
            Chúng tôi cam kết tư vấn đúng nhu cầu, thông tin rõ ràng, hỗ trợ nhanh chóng và
            tổ chức hành trình với tinh thần trách nhiệm cao. Mỗi chương trình được xây dựng
            để cân bằng giữa trải nghiệm, ngân sách và mức độ tiện nghi phù hợp với khách hàng.
          </p>

          <p>
            Với Mvip Travel, sự chuyên nghiệp không nằm ở lời giới thiệu, mà được thể hiện qua
            từng chi tiết trong cách làm việc, cách phục vụ và kết quả mà khách hàng thực sự
            nhận được sau mỗi chuyến đi.
          </p>
        </div>
      </section>
    </PageContainer>
  );
}