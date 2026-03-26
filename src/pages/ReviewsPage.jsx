import PageContainer from '../components/PageContainer';
import { reviews } from '../data/siteData';

export default function ReviewsPage() {
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