import { useEffect, useState } from 'react';
import TourCard from '../components/TourCard';
import PageContainer from '../components/PageContainer';
import { listTours } from '../lib/toursApi';

export default function HomePage() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listTours()
      .then((res) => setTours(res.slice(0, 21)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageContainer
      title="Tour nổi bật"
      subtitle="Khám phá những hành trình nổi bật, được nhiều khách hàng quan tâm và lựa chọn."
    >
      {loading ? (
        <div className="text-[#6b5840]">Đang tải tour...</div>
      ) : tours.length === 0 ? (
        <div className="text-[#6b5840]">Chưa có tour nào.</div>
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