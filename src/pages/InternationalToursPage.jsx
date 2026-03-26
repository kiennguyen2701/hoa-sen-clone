import PageContainer from '../components/PageContainer';
import TourCard from '../components/TourCard';
import { featuredTours } from '../data/siteDataTemp.js';

export default function InternationalToursPage() {
  return (
    <PageContainer
      title="Du lịch quốc tế"
      subtitle="Trang này nên làm dạng danh sách tour, bộ lọc khu vực, giá từ, ngày khởi hành, nút xem chi tiết và nút đặt tour."
    >
      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <input className="rounded-md border border-[#dcc7a6] px-4 py-3" placeholder="Tìm tour quốc tế" />
        <select className="rounded-md border border-[#dcc7a6] px-4 py-3 text-[#6b5840]">
          <option>Chọn khu vực</option>
        </select>
        <select className="rounded-md border border-[#dcc7a6] px-4 py-3 text-[#6b5840]">
          <option>Chọn tháng đi</option>
        </select>
        <button className="rounded-md bg-[#8b5a22] px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white">
          Tìm kiếm
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {featuredTours.map((tour, index) => (
          <TourCard key={tour} title={tour} index={index} />
        ))}
      </div>
    </PageContainer>
  );
}