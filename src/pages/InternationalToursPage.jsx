import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import TourCard from '../components/TourCard';
import { listTours } from '../lib/toursApi';

export default function InternationalToursPage() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

  const keyword = (searchParams.get('q') || '').toLowerCase().trim();
  const destination = (searchParams.get('destination') || '').toLowerCase().trim();
  const month = (searchParams.get('month') || '').toLowerCase().trim();
  const type = (searchParams.get('type') || '').toLowerCase().trim();

  useEffect(() => {
    listTours()
      .then((res) => {
        const internationalTours = res.filter((tour) =>
          (tour.category || '').toLowerCase().includes('quốc tế')
        );
        setTours(internationalTours);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredTours = useMemo(() => {
    return tours.filter((tour) => {
      const title = (tour.title || '').toLowerCase();
      const category = (tour.category || '').toLowerCase();
      const slug = (tour.slug || '').toLowerCase();
      const departure = (tour.departure || '').toLowerCase();
      const shortDescription = (tour.short_description || tour.shortDescription || '').toLowerCase();
      const overview = (tour.overview || '').toLowerCase();

      const normalizedDestination = destination.replaceAll('-', ' ');
      const normalizedType = type.replaceAll('-', ' ');

      const matchKeyword =
        !keyword ||
        title.includes(keyword) ||
        slug.includes(keyword) ||
        shortDescription.includes(keyword) ||
        overview.includes(keyword);

      const matchDestination =
        !destination ||
        title.includes(normalizedDestination) ||
        slug.includes(destination) ||
        category.includes(normalizedDestination) ||
        shortDescription.includes(normalizedDestination) ||
        overview.includes(normalizedDestination);

      const matchMonth =
        !month ||
        departure.includes(`tháng ${month}`) ||
        departure.includes(month);

      const matchType =
        !type ||
        category.includes(normalizedType) ||
        title.includes(normalizedType) ||
        shortDescription.includes(normalizedType) ||
        overview.includes(normalizedType);

      return matchKeyword && matchDestination && matchMonth && matchType;
    });
  }, [tours, keyword, destination, month, type]);

  return (
    <PageContainer
      title="Du lịch quốc tế"
      subtitle="Trang này hiển thị các tour quốc tế từ database."
    >
      {(keyword || destination || month || type) && (
        <div className="mb-6 rounded-2xl border border-[#eadfce] bg-white p-4 text-sm text-[#5f4a33] shadow-sm">
          <span className="font-bold text-[#8b5a22]">Bộ lọc đang áp dụng:</span>{' '}
          {keyword && <span>Từ khóa: "{keyword}" · </span>}
          {destination && <span>Điểm đến: "{destination}" · </span>}
          {month && <span>Tháng: "{month}" · </span>}
          {type && <span>Loại tour: "{type}"</span>}
        </div>
      )}

      {loading ? (
        <div className="text-[#6b5840]">Đang tải tour...</div>
      ) : filteredTours.length === 0 ? (
        <div className="rounded-2xl border border-[#eadfce] bg-white p-6 text-[#6b5840] shadow-sm">
          Không tìm thấy tour phù hợp.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filteredTours.map((tour, index) => (
            <TourCard key={tour.id} tour={tour} index={index} />
          ))}
        </div>
      )}
    </PageContainer>
  );
}