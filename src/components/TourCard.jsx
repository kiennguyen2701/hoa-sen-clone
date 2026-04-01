import { Link } from 'react-router-dom';

export default function TourCard({ tour, index }) {
  const departureLines = tour.departure
    ? String(tour.departure)
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean)
    : [];

  const visibleDepartureLines = departureLines.slice(0, 5);
  const hasMoreDepartureLines = departureLines.length > 5;

  return (
    <div className="group overflow-hidden rounded-[28px] border border-[#e8dcc9] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative overflow-hidden">
        <img
          src={tour.image}
          alt={tour.title}
          className="h-52 w-full object-cover transition duration-300 group-hover:scale-105 sm:h-56 lg:h-52"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

        <div className="absolute left-3 top-3 inline-flex rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#8b5a22]">
          {tour.category}
        </div>

        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3 text-white">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/80">
              Tour {index + 1}
            </div>
            <div className="mt-1 text-sm font-semibold">{tour.duration}</div>
          </div>

          <div className="rounded-full bg-[#8b5a22]/95 px-4 py-1.5 text-sm font-black shadow">
            {tour.price}
          </div>
        </div>
      </div>

      <div className="space-y-3 p-4 sm:p-5">
        <h3 className="min-h-[58px] text-[17px] font-extrabold leading-7 text-[#3d2a17] sm:min-h-[64px] sm:text-[20px] sm:leading-8 lg:min-h-[64px] lg:text-lg lg:leading-7">
          {tour.title}
        </h3>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-[#fcfaf5] p-3">
            <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9e6d2b]">
              Khởi hành
            </div>

            <div className="mt-2 min-h-[128px] space-y-0.5 text-sm leading-6 text-[#5f4a33] sm:min-h-[132px] lg:min-h-[124px]">
              {visibleDepartureLines.map((item, idx) => (
                <div key={idx}>{item}</div>
              ))}
              {hasMoreDepartureLines && <div>...</div>}
            </div>
          </div>

          <div className="rounded-2xl bg-[#fcfaf5] p-3">
            <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9e6d2b]">
              Giá tour
            </div>

            <div className="mt-2 text-[18px] font-black leading-7 text-[#744815] sm:text-[20px] lg:text-[18px]">
              {tour.price}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-1">
          <Link
            to={`/tour/${tour.slug}`}
            className="inline-flex flex-1 items-center justify-center rounded-2xl bg-[#8b5a22] px-4 py-3 text-sm font-bold uppercase tracking-[0.06em] text-white transition hover:bg-[#744815]"
          >
            Xem chi tiết
          </Link>

          <button className="inline-flex min-w-[98px] items-center justify-center rounded-2xl border border-[#d8b169] px-4 py-3 text-sm font-bold text-[#8b5a22] transition hover:bg-[#fcfaf5]">
            Liên hệ
          </button>
        </div>
      </div>
    </div>
  );
}