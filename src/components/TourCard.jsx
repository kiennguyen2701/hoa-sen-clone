import { Link } from 'react-router-dom';

function normalizeDepartureOptions(departureText) {
  if (!departureText) return [];

  const text = String(departureText).trim();
  const afterColon = text.includes(':') ? text.split(':').slice(1).join(':').trim() : text;

  const rawLines = afterColon
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const results = [];

  rawLines.forEach((line) => {
    if (line.includes(',')) {
      const parts = line.split(',').map((item) => item.trim()).filter(Boolean);
      const lastPart = parts[parts.length - 1];
      const fullDatePattern = /^\d{1,2}\/\d{1,2}\/\d{4}$/;

      if (fullDatePattern.test(lastPart)) {
        const [, month, year] = lastPart.split('/');

        parts.forEach((part) => {
          if (/^\d{1,2}$/.test(part)) {
            results.push(`${part}/${month}/${year}`);
          } else if (fullDatePattern.test(part)) {
            results.push(part);
          } else if (/^\d{1,2}\/\d{1,2}$/.test(part)) {
            results.push(`${part}/${year}`);
          } else {
            results.push(part);
          }
        });
      } else {
        parts.forEach((part) => results.push(part));
      }

      return;
    }

    results.push(line);
  });

  return [...new Set(results)];
}

export default function TourCard({ tour }) {
  const departureOptions = normalizeDepartureOptions(tour?.departure).slice(0, 5);

  return (
    <article className="overflow-hidden rounded-[28px] border border-[#eadfce] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      {/* IMAGE AREA LỚN HƠN */}
      <div className="relative h-[240px] overflow-hidden sm:h-[250px] lg:h-[230px]">
        <img
          src={tour.image}
          alt={tour.title}
          className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

        <div className="absolute left-4 top-4">
          <span className="inline-flex rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#8b5a22]">
            {tour.category || 'Du lịch quốc tế'}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
          <div className="text-white">
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] opacity-95">
              TOUR {tour.id || ''}
            </div>
            <div className="mt-1 text-[18px] font-black leading-none">
              {tour.duration || 'Liên hệ'}
            </div>
          </div>

          <div className="rounded-full bg-[#a56b28] px-4 py-2 text-[14px] font-black text-white shadow-sm">
            {tour.price || 'Liên hệ'}
          </div>
        </div>
      </div>

      {/* CONTENT AREA NHỎ LẠI */}
      <div className="p-4 sm:p-5">
        <h3 className="line-clamp-2 min-h-[56px] text-[20px] font-black leading-8 text-[#4f3519] sm:min-h-[64px]">
          {tour.title}
        </h3>

        <div className="mt-4 grid grid-cols-2 gap-4 rounded-2xl bg-[#fcfaf5] p-4">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#a26d1a]">
              Khởi hành
            </div>
            <div className="mt-2 space-y-1.5 text-[14px] leading-6 text-[#6a4721]">
              {departureOptions.length > 0 ? (
                <>
                  {departureOptions.map((item, index) => (
                    <div key={index}>{item}</div>
                  ))}
                  {normalizeDepartureOptions(tour?.departure).length > 5 && <div>...</div>}
                </>
              ) : (
                <div>Liên hệ</div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#a26d1a]">
                Giá tour
              </div>
              <div className="mt-2 text-[16px] font-black leading-6 text-[#6a4721]">
                {tour.price || 'Liên hệ'}
              </div>
            </div>

            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#a26d1a]">
                Phương tiện
              </div>
              <div className="mt-2 text-[14px] leading-7 text-[#6a4721]">
                {tour.transport || 'Liên hệ'}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          <Link
            to={`/tour/${tour.slug}`}
            className="flex-1 rounded-2xl bg-[#a56b28] px-4 py-3 text-center text-[14px] font-bold uppercase tracking-[0.08em] text-white transition hover:opacity-95"
          >
            Xem chi tiết
          </Link>

          <a
            href="tel:0965692959"
            className="rounded-2xl border border-[#cfa871] px-5 py-3 text-[14px] font-bold text-[#8b5a22] transition hover:bg-[#fcf4e8]"
          >
            Liên hệ
          </a>
        </div>
      </div>
    </article>
  );
}