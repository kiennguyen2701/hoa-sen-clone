import { Link } from 'react-router-dom';

function normalizeDepartureOptions(departureText) {
  if (!departureText) return [];

  const text = String(departureText).trim();
  const afterColon = text.includes(':')
    ? text.split(':').slice(1).join(':').trim()
    : text;

  return afterColon
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

export default function TourCard({ tour }) {
  const departures = normalizeDepartureOptions(tour?.departure).slice(0, 3);

  return (
    <Link
      to={`/tour/${tour.slug}`}
      className="block overflow-hidden rounded-[28px] border border-[#eadfce] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      {/* IMAGE */}
      <div className="relative h-[300px] overflow-hidden sm:h-[320px] lg:h-[280px]">
        <img
          src={tour.image}
          alt={tour.title}
          className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

        <div className="absolute left-4 top-4">
          <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#8b5a22]">
            {tour.category || 'Du lịch quốc tế'}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <div className="text-white">
            <div className="text-[18px] font-black">
              {tour.duration || 'Liên hệ'}
            </div>
          </div>

          <div className="rounded-full bg-[#a56b28] px-4 py-2 text-[15px] font-black text-white">
            {tour.price || 'Liên hệ'}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4">
        <h3 className="line-clamp-2 min-h-[56px] text-[22px] font-black leading-8 text-[#4f3519]">
          {tour.title}
        </h3>

        <div className="mt-3 grid grid-cols-2 gap-3 rounded-2xl bg-[#fcfaf5] p-3">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#a26d1a]">
              Khởi hành
            </div>

            <div className="mt-2 space-y-1 text-[14px] leading-6 text-[#6a4721]">
              {departures.length > 0 ? (
                <>
                  {departures.map((item, index) => (
                    <div key={index}>{item}</div>
                  ))}
                  {normalizeDepartureOptions(tour?.departure).length > 3 && (
                    <div>...</div>
                  )}
                </>
              ) : (
                <div>Liên hệ</div>
              )}
            </div>
          </div>

          <div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#a26d1a]">
                Giá chỉ từ
              </div>
              <div className="mt-2 text-[16px] font-black text-[#6a4721]">
                {tour.price || 'Liên hệ'}
              </div>
            </div>

            <div className="mt-4">
              <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#a26d1a]">
                Phương tiện
              </div>
              <div className="mt-2 text-[14px] leading-6 text-[#6a4721]">
                {tour.transport || 'Liên hệ'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}