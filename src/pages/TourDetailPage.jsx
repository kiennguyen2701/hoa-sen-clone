import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { tours } from '../data/tours';

export default function TourDetailPage() {
  const { slug } = useParams();

  const tour = useMemo(() => {
    return tours.find((item) => item.slug === slug);
  }, [slug]);

  if (!tour) {
    return (
      <div className="mx-auto max-w-[1180px] px-4 py-16">
        <h1 className="text-3xl font-black text-[#714b1f]">Không tìm thấy tour</h1>
        <p className="mt-4 text-[#5f4a33]">
          Tour anh đang tìm hiện chưa có trong dữ liệu.
        </p>
        <Link
          to="/du-lich-quoc-te"
          className="mt-6 inline-block rounded-md bg-[#8b5a22] px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white"
        >
          Quay lại danh sách tour
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1180px] px-4 py-10">
      <div className="mb-6">
        <Link
          to="/du-lich-quoc-te"
          className="text-sm font-semibold text-[#9e6d2b]"
        >
          ← Quay lại danh sách tour
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-[#eadfce] bg-white shadow-sm">
        <img
          src={tour.image}
          alt={tour.title}
          className="h-[320px] w-full object-cover"
        />
        <div className="p-6">
          <div className="text-sm font-bold uppercase tracking-[0.2em] text-[#a26d1a]">
            {tour.category}
          </div>
          <h1 className="mt-2 text-3xl font-black text-[#714b1f]">
            {tour.title}
          </h1>
          <p className="mt-4 text-[15px] leading-8 text-[#5f4a33]">
            {tour.shortDescription}
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <div className="rounded-md bg-[#f8f1e2] p-4">
              <div className="text-xs font-bold uppercase text-[#9b6a27]">Thời lượng</div>
              <div className="mt-2 text-lg font-bold text-[#744815]">{tour.duration}</div>
            </div>
            <div className="rounded-md bg-[#f8f1e2] p-4">
              <div className="text-xs font-bold uppercase text-[#9b6a27]">Khởi hành</div>
              <div className="mt-2 text-lg font-bold text-[#744815]">{tour.departure}</div>
            </div>
            <div className="rounded-md bg-[#f8f1e2] p-4">
              <div className="text-xs font-bold uppercase text-[#9b6a27]">Phương tiện</div>
              <div className="mt-2 text-lg font-bold text-[#744815]">{tour.transport}</div>
            </div>
            <div className="rounded-md bg-[#8c6326] p-4 text-white">
              <div className="text-xs font-bold uppercase text-white/80">Giá tour</div>
              <div className="mt-2 text-lg font-bold">{tour.price}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-8">
          <section className="rounded-xl border border-[#eadfce] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black text-[#714b1f]">Tổng quan</h2>
            <p className="mt-4 text-[15px] leading-8 text-[#5f4a33]">
              {tour.overview}
            </p>
          </section>

          <section className="rounded-xl border border-[#eadfce] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black text-[#714b1f]">Điểm nổi bật</h2>
            <ul className="mt-4 space-y-3 text-[15px] leading-8 text-[#5f4a33]">
              {tour.highlights.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border border-[#eadfce] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black text-[#714b1f]">Lịch trình</h2>
            <div className="mt-6 space-y-5">
              {tour.itinerary.map((item) => (
                <div
                  key={`${item.day}-${item.title}`}
                  className="rounded-lg border border-[#eadfce] bg-[#fcfaf5] p-4"
                >
                  <div className="text-sm font-bold uppercase tracking-[0.15em] text-[#a26d1a]">
                    {item.day}
                  </div>
                  <div className="mt-2 text-lg font-bold text-[#6f4817]">
                    {item.title}
                  </div>
                  <p className="mt-2 text-[15px] leading-8 text-[#5f4a33]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="rounded-xl border border-[#eadfce] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black text-[#714b1f]">Giá tour bao gồm</h2>
            <ul className="mt-4 space-y-3 text-[15px] leading-8 text-[#5f4a33]">
              {tour.included.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border border-[#eadfce] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black text-[#714b1f]">Không bao gồm</h2>
            <ul className="mt-4 space-y-3 text-[15px] leading-8 text-[#5f4a33]">
              {tour.excluded.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border border-[#eadfce] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black text-[#714b1f]">Đăng ký tư vấn</h2>
            <div className="mt-4 grid gap-4">
              <input
                className="rounded-md border border-[#dcc7a6] px-4 py-3"
                placeholder="Họ và tên"
              />
              <input
                className="rounded-md border border-[#dcc7a6] px-4 py-3"
                placeholder="Số điện thoại"
              />
              <textarea
                className="min-h-[120px] rounded-md border border-[#dcc7a6] px-4 py-3"
                placeholder="Nội dung cần tư vấn"
              />
              <button className="rounded-md bg-[#8b5a22] px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white">
                Gửi yêu cầu
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}