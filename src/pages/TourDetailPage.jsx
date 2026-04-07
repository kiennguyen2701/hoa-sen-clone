import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTourBySlug } from '../lib/toursApi';
import { supabase } from '../lib/supabase';
import { getSavedCollaboratorCode } from '../lib/referral';

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

function getEmbedUrl(url) {
  if (!url) return '';

  if (url.includes('youtube.com/embed/')) return url;

  if (url.includes('youtube.com/watch?v=')) {
    const videoId = url.split('v=')[1]?.split('&')[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  }

  if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1]?.split('?')[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  }

  return url;
}

function inferGuestCountNumber(value) {
  const text = String(value || '').trim();
  if (!text) return 0;

  if (text === '1 khách') return 1;
  if (text === '2 khách') return 2;
  if (text === '3-5 khách') return 5;
  if (text === 'Đoàn riêng') return 10;

  const match = text.match(/\d+/);
  return match ? Number(match[0]) : 0;
}

function InfoCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-[#eadfce] bg-white p-4 shadow-sm">
      <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#a26d1a]">
        {label}
      </div>
      <div className="mt-2 whitespace-pre-line text-sm font-semibold leading-6 text-[#6a4721]">
        {value}
      </div>
    </div>
  );
}
function DepartureInfoCard({ label, values }) {
  const safeValues = Array.isArray(values) ? values.filter(Boolean) : [];

  return (
    <div className="rounded-2xl border border-[#eadfce] bg-white p-4 shadow-sm">
      <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#a26d1a]">
        {label}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm font-semibold leading-6 text-[#6a4721] sm:grid-cols-3 lg:grid-cols-4">
        {safeValues.length > 0 ? (
          safeValues.map((item, index) => <div key={index}>{item}</div>)
        ) : (
          <div>Liên hệ</div>
        )}
      </div>
    </div>
  );
}
function InlineInfoRow({ label, value }) {
  return (
    <div className="rounded-2xl border border-[#eadfce] bg-white px-5 py-4 shadow-sm">
      <div className="grid gap-3 md:grid-cols-[180px_1fr] md:items-start">
        <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#a26d1a]">
          {label}
        </div>
        <div className="text-[15px] font-semibold leading-7 text-[#6a4721]">
          {value}
        </div>
      </div>
    </div>
  );
}

function InlineDepartureRow({ label, values }) {
  const safeValues = Array.isArray(values) ? values.filter(Boolean) : [];

  return (
    <div className="rounded-2xl border border-[#eadfce] bg-white px-5 py-4 shadow-sm">
      <div className="grid gap-3 md:grid-cols-[180px_1fr] md:items-start">
        <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#a26d1a]">
          {label}
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-[15px] font-semibold leading-7 text-[#6a4721] sm:grid-cols-3 lg:grid-cols-4">
          {safeValues.length > 0 ? (
            safeValues.map((item, index) => <div key={index}>{item}</div>)
          ) : (
            <div>Liên hệ</div>
          )}
        </div>
      </div>
    </div>
  );
}

function TabButton({ label, value, activeTab, onClick }) {
  const isActive = activeTab === value;

  return (
    <button
      type="button"
      onClick={() => onClick(value)}
      className={`rounded-full px-4 py-2.5 text-xs font-bold uppercase tracking-[0.08em] transition sm:text-sm ${
        isActive
          ? 'bg-[#8b5a22] text-white shadow-sm'
          : 'bg-[#f5ecdd] text-[#7a552f] hover:bg-[#ead9bc]'
      }`}
    >
      {label}
    </button>
  );
}

function SectionCard({ title, children }) {
  return (
    <section className="rounded-[28px] border border-[#eadfce] bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-2xl font-black text-[#714b1f]">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export default function TourDetailPage() {
  const { slug } = useParams();

  const [activeTab, setActiveTab] = useState('tong-quan');
  const [mainMedia, setMainMedia] = useState(null);
  const [tour, setTour] = useState(null);

  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [referralCode] = useState(getSavedCollaboratorCode());

  const [bookingForm, setBookingForm] = useState({
    customerName: '',
    phone: '',
    email: '',
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
      email: '',
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
          tourId: tour.id,
          tourTitle: tour.title,
          tourSlug: tour.slug,
          totalAmount: tour.price || 'Liên hệ',
          customerName: bookingForm.customerName.trim(),
          phone: bookingForm.phone.trim(),
          email: bookingForm.email.trim(),
          departureDate: bookingForm.departureDate || '',
          guestCount: bookingForm.guestCount || '',
          guestCountNumber: inferGuestCountNumber(bookingForm.guestCount),
          note: bookingForm.note.trim(),
          collaboratorCode: referralCode || '',
        },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      alert('Đã gửi yêu cầu đặt tour thành công. Bộ phận tư vấn sẽ liên hệ với quý khách sớm nhất.');

      setBookingForm({
        customerName: '',
        phone: '',
        email: '',
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
      <div className="mx-auto max-w-[1240px] px-4 py-10 sm:py-14">
        <div className="rounded-3xl border border-[#eadfce] bg-white p-8 text-[#6b5840] shadow-sm">
          Đang tải chi tiết tour...
        </div>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="mx-auto max-w-[1240px] px-4 py-10 sm:py-14">
        <div className="rounded-3xl border border-[#eadfce] bg-white p-8 shadow-sm sm:p-10">
          <h1 className="text-3xl font-black text-[#714b1f]">Không tìm thấy tour</h1>
          <p className="mt-4 text-[#5f4a33]">Tour anh đang tìm hiện chưa có trong dữ liệu.</p>
          <Link
            to="/du-lich-quoc-te"
            className="mt-6 inline-block rounded-xl bg-[#8b5a22] px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white"
          >
            Quay lại danh sách tour
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f7f1e6]">
      <div className="mx-auto max-w-[1240px] px-4 py-5 sm:py-6 lg:py-8">
        <div className="mb-4 text-xs leading-6 text-[#7a5a34] sm:mb-5 sm:text-sm">
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

        <div className="mb-5 rounded-[24px] border border-[#eadfce] bg-white px-5 py-4 shadow-sm sm:px-6 sm:py-5 lg:mb-6 lg:px-7 lg:py-5">
  <div className="inline-flex rounded-full bg-[#fcf4e8] px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#a26d1a]">
    {tour.category || 'Du lịch quốc tế'}
  </div>

  <h1 className="mt-3 text-[26px] font-black leading-[1.2] text-[#714b1f] sm:text-[32px] lg:text-[34px]">
    {tour.title}
  </h1>

  <p className="mt-3 max-w-3xl text-[14px] leading-7 text-[#5f4a33] lg:text-[15px] lg:leading-7">
    {tour.short_description || tour.shortDescription || tour.description}
  </p>
</div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-6">
            <section className="rounded-[28px] border border-[#eadfce] bg-white p-4 shadow-sm sm:p-5">
              <div className="overflow-hidden rounded-[24px] bg-[#f3ede4]">
                {mainMedia?.type === 'video' ? (
                  <iframe
                    src={getEmbedUrl(mainMedia.url)}
                    title={tour.title}
                    className="h-[240px] w-full sm:h-[360px] lg:h-[520px]"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <img
                    src={mainMedia?.url || tour.image}
                    alt={tour.title}
                    className="h-[240px] w-full object-cover sm:h-[360px] lg:h-[520px]"
                  />
                )}
              </div>

              {mediaItems.length > 0 && (
                <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-5 sm:gap-3">
                  {mediaItems.map((item, index) => {
                    const isActive = mainMedia?.type === item.type && mainMedia?.url === item.url;

                    return (
                      <button
                        key={`${item.type}-${index}`}
                        type="button"
                        onClick={() => setMainMedia(item)}
                        className={`relative overflow-hidden rounded-2xl border transition ${
                          isActive
                            ? 'border-[#c28a3b] ring-2 ring-[#d8b07a]'
                            : 'border-[#eadfce] hover:border-[#cda56a]'
                        }`}
                      >
                        <img
                          src={item.thumb}
                          alt={`${tour.title}-${index + 1}`}
                          className="h-16 w-full object-cover sm:h-24"
                        />
                        {item.type === 'video' && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/35">
                            <span className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-[#8b5a22]">
                              Video
                            </span>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </section>

            <section className="space-y-3">
  <InlineInfoRow label="Thời lượng" value={tour.duration || 'Liên hệ'} />

  <InlineDepartureRow
    label="Khởi hành"
    values={departureOptions.length ? departureOptions : [tour.departure || 'Liên hệ']}
  />

  <InlineInfoRow label="Phương tiện" value={tour.transport || 'Liên hệ'} />

  <InlineInfoRow label="Tiêu chuẩn" value={tour.hotel || 'Liên hệ'} />
</section>

            

            <section className="rounded-[28px] border border-[#eadfce] bg-white p-5 shadow-sm sm:p-6">
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <TabButton label="Tổng quan" value="tong-quan" activeTab={activeTab} onClick={setActiveTab} />
                <TabButton label="Lịch trình" value="lich-trinh" activeTab={activeTab} onClick={setActiveTab} />
                <TabButton label="Bao gồm" value="bao-gom" activeTab={activeTab} onClick={setActiveTab} />
                <TabButton label="Lưu ý" value="luu-y" activeTab={activeTab} onClick={setActiveTab} />
              </div>

              <div className="mt-6">
                {activeTab === 'tong-quan' && (
                  <div className="space-y-8">
                    <section>
                      <h2 className="text-2xl font-black text-[#714b1f]">Tổng quan tour</h2>
                      <p className="mt-4 text-[15px] leading-8 text-[#5f4a33]">
                        {tour.overview || tour.description}
                      </p>
                    </section>

                    <section>
                      <h2 className="text-2xl font-black text-[#714b1f]">Điểm nổi bật</h2>
                      <div className="mt-5 grid gap-4 md:grid-cols-2">
                        {(tour.highlights || []).map((item) => (
                          <div
                            key={item}
                            className="rounded-2xl border border-[#eadfce] bg-[#fcfaf5] p-4 text-[15px] leading-8 text-[#5f4a33]"
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
                      <div key={`${item.day}-${item.title}`} className="flex gap-3 sm:gap-4">
                        <div className="flex flex-col items-center">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8b5a22] text-sm font-black text-white sm:h-11 sm:w-11">
                            {index + 1}
                          </div>
                          {index !== (tour.itinerary || []).length - 1 && (
                            <div className="mt-2 h-full w-[2px] bg-[#eadfce]" />
                          )}
                        </div>

                        <div className="flex-1 rounded-2xl border border-[#eadfce] bg-[#fcfaf5] p-4 sm:p-5">
                          <div className="text-xs font-bold uppercase tracking-[0.15em] text-[#a26d1a]">
                            {item.day}
                          </div>
                          <div className="mt-2 text-base font-bold text-[#6f4817] sm:text-lg">
                            {item.title}
                          </div>
                          <p className="mt-3 text-[15px] leading-8 text-[#5f4a33]">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'bao-gom' && (
                  <div className="grid gap-6 lg:grid-cols-2">
                    <SectionCard title="Giá tour bao gồm">
                      <ul className="space-y-3 text-[15px] leading-8 text-[#5f4a33]">
                        {(tour.included || []).map((item) => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                    </SectionCard>

                    <SectionCard title="Không bao gồm">
                      <ul className="space-y-3 text-[15px] leading-8 text-[#5f4a33]">
                        {(tour.excluded || []).map((item) => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                    </SectionCard>
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
            </section>

            <SectionCard title="Vì sao nên chọn tour này?">
              <div className="space-y-3 text-[15px] leading-8 text-[#65543e]">
                <p>• Lịch trình tối ưu và dễ đi với khách Việt.</p>
                <p>• Tư vấn rõ ràng trước, trong và sau chuyến đi.</p>
                <p>• Hỗ trợ thông tin visa, hành lý và các lưu ý quan trọng.</p>
                <p>• Phù hợp khách đoàn, gia đình hoặc nhóm riêng.</p>
              </div>
            </SectionCard>

            
          </div>

          <div className="hidden xl:block">
            <div id="booking-form" className="sticky top-6 rounded-[28px] border border-[#eadfce] bg-white p-6 shadow-sm">
              <div className="text-xs font-bold uppercase tracking-[0.12em] text-[#9b6a27]">
                GIÁ CHỈ TỪ
              </div>
              <div className="mt-2 text-4xl font-black text-[#714b1f]">
                {tour.price || 'Liên hệ'}
              </div>
              <div className="mt-3 text-sm leading-7 text-[#65543e]">
                Điền thông tin để bộ phận tư vấn liên hệ xác nhận nhanh nhất.
              </div>

              <form onSubmit={handleBookingSubmit} className="mt-6 grid gap-3">
                <input
                  value={bookingForm.customerName}
                  onChange={(e) => setBookingForm({ ...bookingForm, customerName: e.target.value })}
                  className="rounded-2xl border border-[#dcc7a6] px-4 py-3 text-sm outline-none"
                  placeholder="Họ và tên"
                />

                <input
                  value={bookingForm.phone}
                  onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                  className="rounded-2xl border border-[#dcc7a6] px-4 py-3 text-sm outline-none"
                  placeholder="Số điện thoại"
                />

                <input
                  type="email"
                  value={bookingForm.email}
                  onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                  className="rounded-2xl border border-[#dcc7a6] px-4 py-3 text-sm outline-none"
                  placeholder="Email"
                />

                <select
                  value={bookingForm.departureDate}
                  onChange={(e) => setBookingForm((prev) => ({ ...prev, departureDate: e.target.value }))}
                  className="w-full rounded-2xl border border-[#dcc7a6] px-4 py-3 text-sm"
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
                  onChange={(e) => setBookingForm({ ...bookingForm, guestCount: e.target.value })}
                  className="rounded-2xl border border-[#dcc7a6] px-4 py-3 text-sm text-[#6b5840] outline-none"
                >
                  <option value="">Số lượng khách</option>
                  <option value="1 khách">1 khách</option>
                  <option value="2 khách">2 khách</option>
                  <option value="3-5 khách">3-5 khách</option>
                  <option value="Đoàn riêng">Đoàn riêng</option>
                </select>

                <textarea
                  value={bookingForm.note}
                  onChange={(e) => setBookingForm({ ...bookingForm, note: e.target.value })}
                  className="min-h-[110px] rounded-2xl border border-[#dcc7a6] px-4 py-3 text-sm outline-none"
                  placeholder="Nội dung cần tư vấn"
                />

                <button
                  type="submit"
                  disabled={sending}
                  className="rounded-2xl bg-[#8b5a22] px-5 py-3.5 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:opacity-95"
                >
                  {sending ? 'Đang gửi...' : 'Đặt tour ngay'}
                </button>
              </form>

              <div className="mt-6 rounded-2xl bg-[#fcfaf5] p-4">
                <div className="text-xs font-bold uppercase tracking-[0.12em] text-[#9b6a27]">
                  Hotline tư vấn
                </div>
                <div className="mt-2 text-3xl font-black text-[#744815]">0965 692 959</div>
                <div className="mt-1 text-sm text-[#65543e]">Hỗ trợ 08:00 - 17:30 mỗi ngày</div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile booking form */}
        <div id="booking-form" className="mt-6 xl:hidden">
          <div className="rounded-[28px] border border-[#eadfce] bg-white p-5 shadow-sm sm:p-6">
            <div className="text-xs font-bold uppercase tracking-[0.12em] text-[#9b6a27]">GIÁ CHỈ TỪ</div>
            <div className="mt-2 text-3xl font-black text-[#714b1f]">{tour.price || 'Liên hệ'}</div>
            <div className="mt-3 text-sm leading-7 text-[#65543e]">
              Điền thông tin để bộ phận tư vấn liên hệ xác nhận nhanh nhất.
            </div>

            <form onSubmit={handleBookingSubmit} className="mt-6 grid gap-3">
              <input
                value={bookingForm.customerName}
                onChange={(e) => setBookingForm({ ...bookingForm, customerName: e.target.value })}
                className="rounded-2xl border border-[#dcc7a6] px-4 py-3 text-sm outline-none"
                placeholder="Họ và tên"
              />

              <input
                value={bookingForm.phone}
                onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                className="rounded-2xl border border-[#dcc7a6] px-4 py-3 text-sm outline-none"
                placeholder="Số điện thoại"
              />

              <input
                type="email"
                value={bookingForm.email}
                onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                className="rounded-2xl border border-[#dcc7a6] px-4 py-3 text-sm outline-none"
                placeholder="Email"
              />

              <select
                value={bookingForm.departureDate}
                onChange={(e) => setBookingForm((prev) => ({ ...prev, departureDate: e.target.value }))}
                className="w-full rounded-2xl border border-[#dcc7a6] px-4 py-3 text-sm"
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
                onChange={(e) => setBookingForm({ ...bookingForm, guestCount: e.target.value })}
                className="rounded-2xl border border-[#dcc7a6] px-4 py-3 text-sm text-[#6b5840] outline-none"
              >
                <option value="">Số lượng khách</option>
                <option value="1 khách">1 khách</option>
                <option value="2 khách">2 khách</option>
                <option value="3-5 khách">3-5 khách</option>
                <option value="Đoàn riêng">Đoàn riêng</option>
              </select>

              <textarea
                value={bookingForm.note}
                onChange={(e) => setBookingForm({ ...bookingForm, note: e.target.value })}
                className="min-h-[110px] rounded-2xl border border-[#dcc7a6] px-4 py-3 text-sm outline-none"
                placeholder="Nội dung cần tư vấn"
              />

              <button
                type="submit"
                disabled={sending}
                className="rounded-2xl bg-[#8b5a22] px-5 py-3.5 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:opacity-95"
              >
                {sending ? 'Đang gửi...' : 'Đặt tour ngay'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}