import { useEffect, useState } from 'react';
import PageContainer from '../components/PageContainer';
import TourCard from '../components/TourCard';
import { listTours } from '../lib/toursApi';

export default function DomesticToursPage() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listTours()
      .then((res) =>
        setTours(
          res.filter(
            (x) => (x.category || '').toLowerCase().trim() === 'du lịch trong nước'
          )
        )
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageContainer
      title="Du lịch trong nước"
      subtitle="Trang này hiển thị các tour trong nước từ database."
    >
      {loading ? (
        <div className="text-[#6b5840]">Đang tải tour...</div>
      ) : tours.length === 0 ? (
        <div className="text-[#6b5840]">Chưa có tour trong nước nào.</div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour, index) => (
            <TourCard key={tour.id} tour={tour} index={index} />
          ))}
        </div>
      )}
    </PageContainer>
  );
}