import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { listTours, getTourBySlug } from '../lib/toursApi';
import { supabase } from '../lib/supabase';

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

export default function TourDetailPage() {
  const { slug } = useParams();

  const [activeTab, setActiveTab] = useState('tong-quan');
  const [mainMedia, setMainMedia] = useState(null);
  const [tour, setTour] = useState(null);
  const [relatedTours, setRelatedTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const [bookingForm, setBookingForm] = useState({
    customerName: '',
    phone: '',
    departureDate: '',
    guestCount: '',
    note: '',
  });

  const departureOptions = normalizeDepartureOptions(tour?.departure);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const current = await getTourBySlug(slug);
        setTour(current);

        const all = await listTours();
        setRelatedTours(all.filter((item) => item.slug !== current.slug).slice(0, 3));
      } catch (error) {
        console.error('Load tour detail failed:', error);
        setTour(null);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [slug]);

  useEffect(() => {
    setActiveTab('tong-quan');
    setBookingForm({
      customerName: '',
      phone: '',
      departureDate: '',
      guestCount: '',
      note: '',
    });
  }, [slug]);

  const gallery = useMemo(() => {
    if (!tour) return [];
    if (Array.isArray(tour.gallery) && tour.gallery.length) return tour.gallery;
    return tour.image ? [tour.image] : [];
  }, [tour]);

  const mediaItems = useMemo(() => {
    const items = [];

    if (tour?.video_url) {
      items.push({
        type: 'video',
        url: tour.video_url,
        thumb: gallery[0] || tour.image || '',
      });
    }

    gallery.forEach((img) => {
      items.push({
        type: 'image',
        url: img,
        thumb: img,
      });
    });

    return items;
  }, [tour, gallery]);

  useEffect(() => {
    if (mediaItems.length > 0) {
      setMainMedia(mediaItems[0]);
    } else {
      setMainMedia(null);
    }
  }, [mediaItems]);

  async function handleBookingSubmit(e) {
    e.preventDefault();

    if (!tour) return;

    if (!bookingForm.customerName.trim() || !bookingForm.phone.trim()) {
      alert('Vui lòng nhập họ tên và số điện thoại.');
      return;
    }

    try {
      setSending(true);

      const { data, error } = await supabase.functions.invoke('booking-email', {
        body: {
          tourTitle: tour.title,
          customerName: bookingForm.customerName.trim(),
          phone: bookingForm.phone.trim(),
          departureDate: bookingForm.departureDate || '',
          guestCount: bookingForm.guestCount || '',
          note: bookingForm.note.trim(),
        },
      });

      if (error) throw error;

      alert('Đã gửi yêu cầu đặt tour thành công. Bộ phận tiếp nhận sẽ liên hệ cho quý khách trong thời gian sớm nhất.');
      console.log('booking-email response:', data);

      setBookingForm({
        customerName: '',
        phone: '',
        departureDate: '',
        guestCount: '',
        note: '',
      });
    } catch (error) {
      console.error('Booking submit failed:', error);
      alert(error?.message || 'Gửi yêu cầu thất bại. Vui lòng thử lại.');
    } finally {
      setSending(false);
    }
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-[1180px] px-4 py-16">
        <div className="text-[#6b5840]">Đang tải chi tiết tour...</div>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="mx-auto max-w-[1180px] px-4 py-16">
        <h1 className="text-3xl font-black text-[#714b1f]">Không tìm thấy tour</h1>
        <p className="mt-4 text-[#5f4a33]">Tour anh đang tìm hiện chưa có trong dữ liệu.</p>
        <Link
          to="/du-lich-quoc-te"
          className="mt-6 inline-block rounded-xl bg-[#8b5a22] px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white"
        >
          Quay lại danh sách tour
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#f7f1e6]">
      <div className="mx-auto max-w-[1180px] px-4 py-6">
        <div className="mb-5 text-sm text-[#7a5a34]">
          <Link to="/" className="hover:text-[#8b5a22]">
            Trang chủ
          </Link>
          <span className="mx-2">/</span>
          <Link to="/du-lich-quoc-te" className="hover:text-[#8b5a22]">
            Du lịch quốc tế
          </Link>
          <span className="mx-2">/</span>
          <span className="font-semibold text-[#8b5a22]">{tour.title}</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[2fr_0.8fr]">
          <div className="space-y-6">
            <div className="overflow-hidden rounded-3xl border border-[#eadfce] bg-white shadow-sm">
              <div className="relative">
                {mainMedia?.type === 'video' ? (
                  <iframe
                    src={mainMedia.url}
                    title={tour.title}
                    className="h-[320px] w-full md:h-[460px]"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <img
                    src={mainMedia?.url || tour.image}
                    alt={tour.title}
                    className="h-[320px] w-full object-cover md:h-[460px]"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="mb-3 inline-flex rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[#8b5a22]">
                    {tour.category}
                  </div>
                  <h1 className="max-w-4xl text-2xl font-black leading-tight text-white md:text-4xl">
                    {tour.title}
                  </h1>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-white/90 md:text-base">
                    {tour.short_description || tour.shortDescription}
                  </p>
                </div>
              </div>

              {mediaItems.length > 0 && (
                <div className="grid grid-cols-4 gap-3 p-4 md:grid-cols-5">
                  {mediaItems.map((item, index) => {
                    const isActive =
                      mainMedia?.type === item.type && mainMedia?.url === item.url;

                    return (
                      <button
                        key={`${item.type}-${index}`}
                        type="button"
                        onClick={() => setMainMedia(item)}
                        className={`relative overflow-hidden rounded-2xl border transition ${
                          isActive
                            ? 'border-[#8b5a22] ring-2 ring-[#d8b169]'
                            : 'border-[#eadfce] hover:border-[#cda56a]'
                        }`}
                      >
                        <img
                          src={item.thumb}
                          alt={`${tour.title} ${index + 1}`}
                          className="h-24 w-full object-cover"
                        />
                        {item.type === 'video' && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/35">
                            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[#8b5a22]">
                              Video
                            </span>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <InfoCard label="Thời lượng" value={tour.duration || 'Liên hệ'} />
              <InfoCard label="Khởi hành" value={tour.departure || 'Liên hệ'} />
              <InfoCard label="Phương tiện" value={tour.transport || 'Liên hệ'} />
              <InfoCard label="Tiêu chuẩn" value={tour.hotel || 'Liên hệ'} />
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
                        {(tour.highlights || []).map((item) => (
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
                    {(tour.itinerary || []).map((item, index) => (
                      <div key={`${item.day}-${item.title}`} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#8b5a22] text-sm font-black text-white">
                            {index + 1}
                          </div>
                          {index !== (tour.itinerary || []).length - 1 && (
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
                        {(tour.included || []).map((item) => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-2xl border border-[#eadfce] bg-[#fcfaf5] p-5">
                      <h3 className="text-lg font-black text-[#714b1f]">Không bao gồm</h3>
                      <ul className="mt-4 space-y-3 text-[15px] leading-8 text-[#5f4a33]">
                        {(tour.excluded || []).map((item) => (
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
                  {tour.price || 'Liên hệ'}
                </div>
                <div className="mt-2 text-sm leading-7 text-[#65543e]">
                  Giá có thể thay đổi theo ngày khởi hành và dịch vụ đi kèm. Liên hệ để nhận báo giá mới nhất.
                </div>

                <form onSubmit={handleBookingSubmit} className="mt-5 grid gap-3">
                  <input
                    value={bookingForm.customerName}
                    onChange={(e) =>
                      setBookingForm({ ...bookingForm, customerName: e.target.value })
                    }
                    className="rounded-2xl border border-[#dcc7a6] px-4 py-3 outline-none"
                    placeholder="Họ và tên"
                  />

                  <input
                    value={bookingForm.phone}
                    onChange={(e) =>
                      setBookingForm({ ...bookingForm, phone: e.target.value })
                    }
                    className="rounded-2xl border border-[#dcc7a6] px-4 py-3 outline-none"
                    placeholder="Số điện thoại"
                  />

                  <select
                    value={bookingForm.departureDate}
                    onChange={(e) =>
                      setBookingForm((prev) => ({
                        ...prev,
                        departureDate: e.target.value,
                      }))
                    }
                    className="w-full rounded-2xl border border-[#dcc7a6] px-4 py-3"
                  >
                    <option value="">Chọn ngày khởi hành</option>

                    {departureOptions.map((date, index) => (
                      <option key={index} value={date}>
                        {date}
                      </option>
                    ))}
                  </select>

                  <select
                    value={bookingForm.guestCount}
                    onChange={(e) =>
                      setBookingForm({ ...bookingForm, guestCount: e.target.value })
                    }
                    className="rounded-2xl border border-[#dcc7a6] px-4 py-3 text-[#6b5840] outline-none"
                  >
                    <option value="">Số lượng khách</option>
                    <option value="1 khách">1 khách</option>
                    <option value="2 khách">2 khách</option>
                    <option value="3-5 khách">3-5 khách</option>
                    <option value="Đoàn riêng">Đoàn riêng</option>
                  </select>

                  <textarea
                    value={bookingForm.note}
                    onChange={(e) =>
                      setBookingForm({ ...bookingForm, note: e.target.value })
                    }
                    className="min-h-[110px] rounded-2xl border border-[#dcc7a6] px-4 py-3 outline-none"
                    placeholder="Nội dung cần tư vấn"
                  />

                  <button
                    type="submit"
                    disabled={sending}
                    className="rounded-2xl bg-[#8b5a22] px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white"
                  >
                    {sending ? 'Đang gửi...' : 'Đặt tour ngay'}
                  </button>
                </form>

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
                {relatedTours.map((item) => (
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
      <div className="mt-2 text-lg font-bold text-[#744815] whitespace-pre-line">{value}</div>
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