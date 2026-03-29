import PageContainer from '../components/PageContainer';

const featuredReviews = [
  {
    name: 'Chị Ngọc Anh',
    role: 'Khách tour gia đình',
    tour: 'Singapore - Malaysia',
    text:
      'Gia đình tôi đã có một chuyến đi rất thoải mái và đúng như kỳ vọng. Điều tôi hài lòng nhất ở Mvip Travel là cách tổ chức rất gọn gàng, giờ giấc rõ ràng, hướng dẫn viên nhiệt tình và xử lý mọi việc khá nhanh. Người lớn tuổi đi cùng cũng cảm thấy yên tâm. Sau chuyến này, tôi chắc chắn sẽ tiếp tục đồng hành cùng Mvip Travel cho các hành trình quốc tế tiếp theo.',
  },
  {
    name: 'Anh Quốc Huy',
    role: 'Khách đoàn doanh nghiệp',
    tour: 'Thái Lan',
    text:
      'Đoàn công ty tôi đi khá đông nhưng khâu tổ chức rất mượt. Từ lúc tư vấn, lên chương trình đến lúc triển khai thực tế đều cho thấy đội ngũ làm việc chuyên nghiệp và có kinh nghiệm. Mọi thành viên trong đoàn đều phản hồi tích cực. Đây là kiểu đơn vị mà doanh nghiệp có thể yên tâm hợp tác lâu dài cho các chương trình team building và tour thưởng.',
  },
  {
    name: 'Chị Thu Hà',
    role: 'Khách tour nghỉ dưỡng',
    tour: 'Phú Quốc',
    text:
      'Chuyến đi lần này mang lại cảm giác rất dễ chịu. Lịch trình không bị dồn quá nhiều, khách sạn ổn, xe đưa đón đúng giờ và đội ngũ hỗ trợ rất có trách nhiệm. Tôi đánh giá cao sự chỉn chu và thái độ phục vụ của Mvip Travel. Thật sự mong những kỳ nghỉ sắp tới vẫn tiếp tục được đồng hành cùng đơn vị này.',
  },
];

const customerVoices = [
  {
    name: 'Anh Minh Khang',
    text:
      'Tôi đã đi khá nhiều tour nhưng hiếm có đơn vị nào chăm sóc khách hàng kỹ như Mvip Travel. Mọi thông tin đều rõ ràng, dễ hiểu và tạo cảm giác yên tâm từ trước khi khởi hành.',
  },
  {
    name: 'Chị Hồng Nhung',
    text:
      'Điều tôi thích là cách tổ chức rất chuyên nghiệp nhưng vẫn giữ được sự gần gũi. Nhóm bạn của tôi ai cũng hài lòng và đã bàn với nhau sẽ tiếp tục đặt tour ở đây.',
  },
  {
    name: 'Anh Đức Tài',
    text:
      'Tour diễn ra đúng kế hoạch, không phát sinh khó chịu, mọi khâu đều được xử lý rất ổn. Cảm giác đi chơi mà đầu óc rất nhẹ, không phải lo nghĩ nhiều.',
  },
  {
    name: 'Chị Mỹ Linh',
    text:
      'Mvip Travel tư vấn rất có tâm, biết lắng nghe nhu cầu thật của khách chứ không tư vấn kiểu chung chung. Nhờ vậy chuyến đi phù hợp với gia đình tôi hơn rất nhiều.',
  },
  {
    name: 'Anh Hoàng Nam',
    text:
      'Tôi đặc biệt ấn tượng với cách đội ngũ hỗ trợ trong suốt hành trình. Có những chi tiết nhỏ nhưng làm rất kỹ, thể hiện sự chuyên nghiệp rõ ràng.',
  },
  {
    name: 'Chị Bảo Trân',
    text:
      'Một chuyến đi đáng nhớ, dịch vụ tốt, lịch trình hợp lý, trải nghiệm vui và thoải mái. Thật sự mong sẽ còn đồng hành cùng Mvip Travel trong nhiều tour khác nữa.',
  },
];

const longReviews = [
  {
    title: 'Một hành trình trọn vẹn từ sự tư vấn đến trải nghiệm thực tế',
    author: 'Gia đình anh Tuấn Phong',
    content:
      'Điều khiến chúng tôi quyết định chọn Mvip Travel không chỉ là chương trình tour hợp lý, mà còn là cách tư vấn rất rõ ràng và có trách nhiệm ngay từ ban đầu. Trong suốt chuyến đi, mọi thứ đều diễn ra chỉn chu hơn mong đợi: xe cộ đúng giờ, lịch trình vừa sức, khách sạn đúng tiêu chuẩn và đặc biệt là sự hỗ trợ xuyên suốt của đội ngũ điều hành. Sau chuyến đi, cả gia đình đều có chung cảm giác hài lòng vì đã chọn đúng đơn vị đồng hành. Chúng tôi chắc chắn sẽ quay lại với những tour tiếp theo trong thời gian tới.',
  },
  {
    title: 'Dịch vụ khiến khách hàng muốn quay lại thêm nhiều lần nữa',
    author: 'Chị Mai Phương',
    content:
      'Có những chuyến đi vui vì điểm đến đẹp, nhưng cũng có những chuyến đi làm mình nhớ vì cách tổ chức thật sự chuyên nghiệp. Với tôi, Mvip Travel thuộc nhóm thứ hai. Cảm giác được chăm sóc kỹ từ trước chuyến đi, được hỗ trợ nhanh khi cần và luôn có người đồng hành trong mọi tình huống là một điểm cộng rất lớn. Sau hành trình này, tôi không chỉ hài lòng mà còn rất mong có dịp quay lại cùng Mvip Travel trên các tuyến quốc tế khác.',
  },
  {
    title: 'Sự chuyên nghiệp tạo nên niềm tin lâu dài',
    author: 'Anh Phan Trọng Hậu',
    content:
      'Tôi đánh giá cao những đơn vị làm dịch vụ bằng sự nghiêm túc và thực chất, và Mvip Travel cho tôi cảm giác đó. Chuyến đi được tổ chức gọn gàng, thông tin minh bạch, không bị rối và đặc biệt là đội ngũ xử lý mọi việc nhanh chóng. Đây là kiểu thương hiệu không chỉ tạo ra một tour tốt, mà còn tạo được sự tin tưởng để khách hàng muốn tiếp tục đồng hành về sau.',
  },
];

const stats = [
  { value: 'Rất hài lòng', label: 'Phản hồi phổ biến từ khách hàng sau tour' },
  { value: 'Chuyên nghiệp', label: 'Ấn tượng được nhắc đến nhiều nhất' },
  { value: 'Muốn quay lại', label: 'Tâm lý chung sau khi hoàn thành hành trình' },
  { value: 'Tin tưởng', label: 'Lý do khách hàng tiếp tục đồng hành' },
];

export default function ReviewsPage() {
  return (
    <PageContainer
      title="Đánh giá khách hàng"
      subtitle="Những phản hồi chân thật từ khách hàng là động lực để Mvip Travel tiếp tục hoàn thiện chất lượng dịch vụ và đồng hành trên nhiều hành trình tiếp theo."
    >
      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          {featuredReviews.map((item) => (
            <article
              key={item.name}
              className="rounded-3xl border border-[#eadfce] bg-white p-6 shadow-sm"
            >
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#a26d1a]">
                Đánh giá nổi bật
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-3">
                <div className="text-2xl font-black text-[#714b1f]">{item.name}</div>
                <span className="rounded-full bg-[#f6ead7] px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-[#8b5a22]">
                  {item.role}
                </span>
                <span className="rounded-full border border-[#eadfce] px-3 py-1 text-xs font-semibold text-[#6b5840]">
                  {item.tour}
                </span>
              </div>

              <p className="mt-4 text-[15px] leading-8 text-[#5f4a33]">
                “{item.text}”
              </p>
            </article>
          ))}
        </div>

        <div className="space-y-6">
          <section className="rounded-3xl border border-[#eadfce] bg-white p-6 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#a26d1a]">
              Cảm nhận chung
            </div>
            <h2 className="mt-3 text-2xl font-black text-[#714b1f]">
              Điều khách hàng nhớ nhất sau mỗi chuyến đi cùng Mvip Travel
            </h2>

            <div className="mt-5 grid gap-4">
              {stats.map((item) => (
                <div
                  key={item.value}
                  className="rounded-2xl border border-[#eadfce] bg-[#fcfaf5] p-4"
                >
                  <div className="text-lg font-black text-[#714b1f]">{item.value}</div>
                  <div className="mt-2 text-sm leading-7 text-[#5f4a33]">{item.label}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-[#eadfce] bg-[linear-gradient(135deg,#f8efe0,#f3e1be)] p-6 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#a26d1a]">
              Sự tin tưởng
            </div>
            <h2 className="mt-3 text-2xl font-black text-[#714b1f]">
              Không chỉ là một chuyến đi, mà là sự đồng hành lâu dài
            </h2>
            <p className="mt-4 text-[15px] leading-8 text-[#5f4a33]">
              Nhiều khách hàng sau khi trải nghiệm lần đầu đã tiếp tục quay lại cùng
              Mvip Travel trong những hành trình sau. Điều đó không đến từ quảng cáo,
              mà đến từ cảm giác an tâm, sự chuyên nghiệp trong cách tổ chức và chất
              lượng dịch vụ được thể hiện bằng trải nghiệm thực tế.
            </p>
            <p className="mt-4 text-[15px] leading-8 text-[#5f4a33]">
              Với Mvip Travel, mỗi đánh giá tích cực không chỉ là một lời khen, mà còn
              là trách nhiệm để tiếp tục làm tốt hơn trong từng chương trình tiếp theo.
            </p>
          </section>
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-[#eadfce] bg-white p-6 shadow-sm">
        <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#a26d1a]">
          Khách hàng chia sẻ
        </div>
        <h2 className="mt-3 text-2xl font-black text-[#714b1f]">
          Những cảm thán chân thật sau chuyến đi
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {customerVoices.map((item) => (
            <div
              key={item.name}
              className="rounded-2xl border border-[#eadfce] bg-[#fcfaf5] p-5"
            >
              <div className="text-lg font-black text-[#714b1f]">{item.name}</div>
              <p className="mt-3 text-sm leading-7 text-[#5f4a33]">“{item.text}”</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 space-y-6">
        {longReviews.map((item) => (
          <article
            key={item.title}
            className="rounded-3xl border border-[#eadfce] bg-white p-6 shadow-sm"
          >
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#a26d1a]">
              Câu chuyện khách hàng
            </div>
            <h2 className="mt-3 text-2xl font-black text-[#714b1f]">{item.title}</h2>
            <div className="mt-2 text-sm font-semibold text-[#8b5a22]">{item.author}</div>
            <p className="mt-4 text-[15px] leading-8 text-[#5f4a33]">“{item.content}”</p>
          </article>
        ))}
      </section>

      <section className="mt-8 rounded-3xl border border-[#eadfce] bg-[linear-gradient(135deg,#f8efe0,#f3e1be)] p-6 shadow-sm">
        <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#a26d1a]">
          Lời cảm ơn
        </div>
        <h2 className="mt-3 text-2xl font-black text-[#714b1f]">
          Mvip Travel trân trọng từng sự tin tưởng của khách hàng
        </h2>
        <div className="mt-5 space-y-4 text-[15px] leading-8 text-[#5f4a33]">
          <p>
            Mỗi đánh giá tích cực là một nguồn động lực rất lớn để đội ngũ Mvip Travel
            tiếp tục hoàn thiện sản phẩm, nâng cao chất lượng vận hành và chăm sóc khách
            hàng tốt hơn mỗi ngày.
          </p>
          <p>
            Điều chúng tôi trân trọng nhất không chỉ là sự hài lòng sau một chuyến đi,
            mà còn là mong muốn tiếp tục được đồng hành cùng khách hàng trong những tour
            tiếp theo. Đó chính là dấu hiệu rõ ràng nhất cho thấy một hành trình đã thật
            sự chạm đến trải nghiệm và cảm xúc của người đi.
          </p>
          <p>
            Mvip Travel sẽ luôn nỗ lực để mỗi chuyến đi là một lần khách hàng cảm thấy
            yên tâm khi lựa chọn, hài lòng khi trải nghiệm và sẵn sàng quay lại trong
            những hành trình kế tiếp.
          </p>
        </div>
      </section>
    </PageContainer>
  );
}