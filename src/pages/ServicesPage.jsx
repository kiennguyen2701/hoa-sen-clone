import PageContainer from '../components/PageContainer';
import { services } from '../data/siteData';

export default function ServicesPage() {
  return (
    <PageContainer
      title="Dịch vụ - Visa"
      subtitle="Trang này phù hợp để thêm bảng giá dịch vụ, checklist hồ sơ, biểu mẫu tải xuống và nút tư vấn nhanh qua Zalo hoặc hotline."
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {services.map((item) => (
          <div key={item.title} className="rounded-md border border-[#eadfce] bg-white p-6 shadow-sm">
            <div className="text-lg font-extrabold text-[#6f4817]">{item.title}</div>
            <p className="mt-3 text-sm leading-7 text-[#65543e]">{item.desc}</p>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}