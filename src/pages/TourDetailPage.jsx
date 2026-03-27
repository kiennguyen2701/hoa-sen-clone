import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { listTours, getTourBySlug } from '../lib/toursApi';

export default function TourDetailPage() {
  const { slug } = useParams();
  const [activeTab, setActiveTab] = useState('tong-quan');
  const [mainImage, setMainImage] = useState(null);
  const [tour, setTour] = useState(null);
  const [relatedTours, setRelatedTours] = useState([]);

  useEffect(() => {
    async function load() {
      const current = await getTourBySlug(slug);
      setTour(current);
      const all = await listTours();
      setRelatedTours(all.filter((item) => item.slug !== current.slug).slice(0, 3));
    }
    load();
  }, [slug]);

  if (!tour) {
    return (
      <div className="mx-auto max-w-[1180px] px-4 py-16">
        <div className="text-[#6b5840]">Đang tải chi tiết tour...</div>
      </div>
    );
  }


  const gallery = tour.gallery?.length ? tour.gallery : [tour.image];
  const displayImage = mainImage || gallery[0];

  return (
    <div className="bg-[#f7f1e6]">
      <div className="mx-auto max-w-[1180px] px-4 py-6">
        <div className="mb-5 text-sm text-[#7a5a34]">
          <Link to="/" className="hover:text-[#8b5a22]">Trang chủ</Link>
          <span className="mx-2">/</span>
          <Link to="/du-lich-quoc-te" className="hover:text-[#8b5a22]">Du lịch quốc tế</Link>
          <span className="mx-2">/</span>
          <span className="font-semibold text-[#8b5a22]">{tour.title}</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <div className="overflow-hidden rounded-3xl border border-[#eadfce] bg-white shadow-sm">
              <div className="relative">
                <img
                  src={displayImage}
                  alt={tour.title}
                  className="h-[320px] w-full object-cover md:h-[460px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="mb-3 inline-flex rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[#8b5a22]">
                    {tour.category}
                  </div>
                  <h1 className="max-w-4xl text-2xl font-black leading-tight text-white md:text-4xl">
                    {tour.title}
                  </h1>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-white/90 md:text-base">
                    {tour.shortDescription}
                  </p>
                </div>
              </div>

              <div className="grid gap-3 p-4 sm:grid-cols-4">
                {gallery.slice(0, 4).map((img, index) => (
                  <button
                    key={`${img}-${index}`}
                    onClick={() => setMainImage(img)}
                    className={`overflow-hidden rounded-2xl border ${
                      displayImage === img ? 'border-[#8b5a22]' : 'border-[#eadfce]'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${tour.title} ${index + 1}`}
                      className="h-24 w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <InfoCard label="Thời lượng" value={tour.duration} />
              <InfoCard label="Khởi hành" value={tour.departure} />
              <InfoCard label="Phương tiện" value={tour.transport} />
              <InfoCard label="Tiêu chuẩn" value={tour.hotel || '4 sao'} />
            </div>

            <div className="overflow-hidden rounded-3xl border border-[#eadfce] bg-white shadow-sm">
              <div className="border-b border-[#eadfce] px-5 pt-5">
                <div className="flex flex-wrap gap-3">
                  <TabButton label="Tổng quan" value="tong-quan" activeTab={activeTab} onClick={setActiveTab} />
                  <TabButton label="Lịch trình" value="lich-trinh" activeTab={activeTab} onClick={setActiveTab} />
                  <TabButton label="Bao gồm" value="bao-gom" activeTab={activeTab} onClick={setActiveTab} />
                  <TabButton label="Lưu ý" value="luu-y" activeTab={activeTab} onClick={setActiveTab} />
                </div>
              </div>

              <div className="p-6">
                {activeTab === 'tong-quan' && (
                  <div className="space-y-8">
                    <section>
                      <h2 className="text-2xl font-black text-[#714b1f]">Tổng quan tour</h2>
                      <p className="mt-4 text-[15px] leading-8 text-[#5f4a33]">
                        {tour.overview}
                      </p>
                    </section>

                    <section>
                      <h2 className="text-2xl font-black text-[#714b1f]">Điểm nổi bật</h2>
                      <div className="mt-5 grid gap-4 md:grid-cols-2">
                        {tour.highlights.map((item) => (
                          <div
                            key={item}
                            className="rounded-2xl border border-[#eadfce] bg-[#fcfaf5] p-4 text-[15px] leading-7 text-[#5f4a33]"
                          >
                            <div className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-[#a26d1a]">
                              Highlight
                            </div>
                            {item}
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                )}

                {activeTab === 'lich-trinh' && (
                  <div className="space-y-5">
                    {tour.itinerary.map((item, index) => (
                      <div key={`${item.day}-${item.title}`} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#8b5a22] text-sm font-black text-white">
                            {index + 1}
                          </div>
                          {index !== tour.itinerary.length - 1 && (
                            <div className="mt-2 h-full w-[2px] bg-[#eadfce]" />
                          )}
                        </div>

                        <div className="flex-1 rounded-2xl border border-[#eadfce] bg-[#fcfaf5] p-4">
                          <div className="text-xs font-bold uppercase tracking-[0.15em] text-[#a26d1a]">
                            {item.day}
                          </div>
                          <div className="mt-2 text-lg font-bold text-[#6f4817]">
                            {item.title}
                          </div>
                          <p className="mt-2 text-[15px] leading-8 text-[#5f4a33]">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'bao-gom' && (
                  <div className="grid gap-6 lg:grid-cols-2">
                    <div className="rounded-2xl border border-[#eadfce] bg-[#fcfaf5] p-5">
                      <h3 className="text-lg font-black text-[#714b1f]">Giá tour bao gồm</h3>
                      <ul className="mt-4 space-y-3 text-[15px] leading-8 text-[#5f4a33]">
                        {tour.included.map((item) => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-2xl border border-[#eadfce] bg-[#fcfaf5] p-5">
                      <h3 className="text-lg font-black text-[#714b1f]">Không bao gồm</h3>
                      <ul className="mt-4 space-y-3 text-[15px] leading-8 text-[#5f4a33]">
                        {tour.excluded.map((item) => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'luu-y' && (
                  <div className="space-y-3 text-[15px] leading-8 text-[#5f4a33]">
                    {(tour.notes || []).map((item) => (
                      <p key={item}>• {item}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="lg:sticky lg:top-6">
              <div className="rounded-3xl border border-[#eadfce] bg-white p-6 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-[0.12em] text-[#9b6a27]">
                  Giá từ
                </div>
                <div className="mt-2 text-3xl font-black text-[#714b1f]">
                  {tour.price}
                </div>
                <div className="mt-2 text-sm leading-7 text-[#65543e]">
                  Giá có thể thay đổi theo ngày khởi hành và dịch vụ đi kèm. Liên hệ để nhận báo giá mới nhất.
                </div>

                <div className="mt-5 grid gap-3">
                  <input
                    className="rounded-2xl border border-[#dcc7a6] px-4 py-3 outline-none"
                    placeholder="Họ và tên"
                  />
                  <input
                    className="rounded-2xl border border-[#dcc7a6] px-4 py-3 outline-none"
                    placeholder="Số điện thoại"
                  />
                  <select className="rounded-2xl border border-[#dcc7a6] px-4 py-3 text-[#6b5840] outline-none">
                    <option>Chọn ngày khởi hành</option>
                    <option>Đợt 1</option>
                    <option>Đợt 2</option>
                    <option>Đợt 3</option>
                  </select>
                  <select className="rounded-2xl border border-[#dcc7a6] px-4 py-3 text-[#6b5840] outline-none">
                    <option>Số lượng khách</option>
                    <option>1 khách</option>
                    <option>2 khách</option>
                    <option>3-5 khách</option>
                    <option>Đoàn riêng</option>
                  </select>
                  <textarea
                    className="min-h-[110px] rounded-2xl border border-[#dcc7a6] px-4 py-3 outline-none"
                    placeholder="Nội dung cần tư vấn"
                  />
                  <button className="rounded-2xl bg-[#8b5a22] px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white">
                    Đặt tour ngay
                  </button>
                </div>

                <div className="mt-5 rounded-2xl bg-[#fcfaf5] p-4">
                  <div className="text-xs font-bold uppercase tracking-[0.12em] text-[#9b6a27]">
                    Hotline tư vấn
                  </div>
                  <div className="mt-2 text-2xl font-black text-[#744815]">0965 692 959</div>
                  <div className="mt-1 text-sm text-[#65543e]">Hỗ trợ 08:00 - 17:30 mỗi ngày</div>
                </div>
              </div>
            </div>

            <section className="rounded-3xl border border-[#eadfce] bg-white p-6 shadow-sm">
              <h2 className="text-xl font-black text-[#714b1f]">Vì sao nên chọn tour này?</h2>
              <div className="mt-4 space-y-3 text-sm leading-7 text-[#65543e]">
                <p>• Lịch trình tối ưu và dễ đi với khách Việt.</p>
                <p>• Hỗ trợ trước, trong và sau chuyến đi.</p>
                <p>• Tư vấn hồ sơ, visa, hành lý và các lưu ý quan trọng.</p>
                <p>• Phù hợp khách đoàn, gia đình hoặc nhóm riêng.</p>
              </div>
            </section>

            <section className="rounded-3xl border border-[#eadfce] bg-white p-6 shadow-sm">
              <h2 className="text-xl font-black text-[#714b1f]">Tour liên quan</h2>
              <div className="mt-4 space-y-3">
                {relatedTours
                  .filter((item) => item.slug !== tour.slug)
                  .slice(0, 3)
                  .map((item) => (
                    <Link
                      key={item.slug}
                      to={`/tour/${item.slug}`}
                      className="block rounded-2xl border border-[#eadfce] p-4 transition hover:bg-[#fcfaf5]"
                    >
                      <div className="text-xs font-bold uppercase tracking-[0.12em] text-[#a26d1a]">
                        {item.category}
                      </div>
                      <div className="mt-1 text-base font-bold text-[#6f4817]">
                        {item.title}
                      </div>
                    </Link>
                  ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-[#eadfce] bg-white p-4 shadow-sm">
      <div className="text-xs font-bold uppercase tracking-[0.12em] text-[#9b6a27]">
        {label}
      </div>
      <div className="mt-2 text-lg font-bold text-[#744815]">{value}</div>
    </div>
  );
}

function TabButton({ label, value, activeTab, onClick }) {
  const isActive = activeTab === value;

  return (
    <button
      onClick={() => onClick(value)}
      className={`rounded-t-2xl px-4 py-3 text-sm font-bold uppercase tracking-[0.08em] ${
        isActive
          ? 'bg-[#8b5a22] text-white'
          : 'bg-[#f5ecdd] text-[#7a552f] hover:bg-[#ead9bc]'
      }`}
    >
      {label}
    </button>
  );
}