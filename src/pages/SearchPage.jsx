import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import TourCard from '../components/TourCard';
import { listTours } from '../lib/toursApi';

function normalizeText(text) {
  return (text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .trim();
}

export default function SearchPage() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

  const keyword = searchParams.get('q') || '';
  const destination = searchParams.get('destination') || '';
  const month = searchParams.get('month') || '';
  const type = searchParams.get('type') || '';

  const normalizedKeyword = normalizeText(keyword);
  const normalizedDestination = normalizeText(destination.replaceAll('-', ' '));
  const normalizedMonth = normalizeText(month);
  const normalizedType = normalizeText(type.replaceAll('-', ' '));

  useEffect(() => {
    listTours()
      .then((res) => setTours(res))
      .finally(() => setLoading(false));
  }, []);

  const filteredTours = useMemo(() => {
    return tours.filter((tour) => {
      const title = normalizeText(tour.title);
      const category = normalizeText(tour.category);
      const slug = normalizeText(tour.slug);
      const departure = normalizeText(tour.departure);
      const shortDescription = normalizeText(tour.short_description || tour.shortDescription);
      const overview = normalizeText(tour.overview);
      const transport = normalizeText(tour.transport);
      const hotel = normalizeText(tour.hotel);

      const searchBlob = [
        title,
        category,
        slug,
        departure,
        shortDescription,
        overview,
        transport,
        hotel,
      ].join(' ');

      const matchKeyword =
        !normalizedKeyword || searchBlob.includes(normalizedKeyword);

      const matchDestination =
        !normalizedDestination || searchBlob.includes(normalizedDestination);

      const matchMonth =
        !normalizedMonth ||
        departure.includes(`thang ${normalizedMonth}`) ||
        departure.includes(normalizedMonth);

      const matchType =
        !normalizedType || searchBlob.includes(normalizedType);

      return matchKeyword && matchDestination && matchMonth && matchType;
    });
  }, [tours, normalizedKeyword, normalizedDestination, normalizedMonth, normalizedType]);

  return (
    <PageContainer
      title="Kết quả tìm kiếm"
      subtitle="Tìm kiếm tour toàn bộ website theo từ khóa, điểm đến, tháng đi và loại tour."
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
        <div className="text-[#6b5840]">Đang tải dữ liệu tour...</div>
      ) : filteredTours.length === 0 ? (
        <div className="rounded-2xl border border-[#eadfce] bg-white p-6 text-[#6b5840] shadow-sm">
          Không tìm thấy tour phù hợp với từ khóa anh vừa nhập.
        </div>
      ) : (
        <>
          <div className="mb-5 text-sm font-semibold text-[#6b5840]">
            Tìm thấy <span className="text-[#8b5a22]">{filteredTours.length}</span> tour phù hợp
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filteredTours.map((tour, index) => (
              <TourCard key={tour.id} tour={tour} index={index} />
            ))}
          </div>
        </>
      )}
    </PageContainer>
  );
}