import { useEffect, useState } from 'react';
import PageContainer from '../components/PageContainer';
import TourCard from '../components/TourCard';
import { listTours } from '../lib/toursApi';

export default function InternationalToursPage() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listTours()
      .then((res) => setTours(res.filter((x) => x.category === 'Du lịch quốc tế')))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageContainer
      title="Du lịch quốc tế"
      subtitle="Trang này đọc dữ liệu thật từ database."
    >
      {loading ? (
        <div className="text-[#6b5840]">Đang tải tour...</div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tours.map((tour, index) => (
            <TourCard key={tour.id} tour={tour} index={index} />
          ))}
        </div>
      )}
    </PageContainer>
  );
}