import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHeroSliderSettings } from '../hooks/useSiteSettings';

export default function HeroSlider({ mobile = false }) {
  const heroSettings = useHeroSliderSettings();
  const slides = heroSettings.slides || [];

  const [current, setCurrent] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [destination, setDestination] = useState('');
  const [month, setMonth] = useState('');
  const [tourType, setTourType] = useState('');

  useEffect(() => {
    if (!slides.length) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides]);

  useEffect(() => {
    if (current > slides.length - 1) {
      setCurrent(0);
    }
  }, [slides, current]);

  const activeSlide = useMemo(() => slides[current], [current, slides]);

  function prevSlide() {
    if (!slides.length) return;
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }

  function nextSlide() {
    if (!slides.length) return;
    setCurrent((prev) => (prev + 1) % slides.length);
  }

  function handleSearch(e) {
    e.preventDefault();

    const params = new URLSearchParams();

    if (keyword.trim()) params.set('q', keyword.trim());
    if (destination) params.set('destination', destination);
    if (month) params.set('month', month);
    if (tourType) params.set('type', tourType);

    window.location.href = `/tim-kiem${params.toString() ? `?${params.toString()}` : ''}`;
  }

  if (!activeSlide) return null;

  return (
    <section className="bg-[#f7f1e6]">
      <div
        className={
          mobile
            ? 'mx-auto max-w-[1180px] px-4 pb-4 pt-4'
            : 'mx-auto max-w-[1180px] px-4 pb-6 pt-5'
        }
      >
        <div className="relative overflow-hidden rounded-[28px] border border-[#eadfce] bg-white shadow-sm md:rounded-[32px]">
          <div className={`relative ${mobile ? 'h-[260px]' : 'h-[380px] md:h-[500px]'}`}>
            <img
              src={activeSlide.image}
              alt={activeSlide.title}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(25,16,8,0.78)_0%,rgba(25,16,8,0.48)_38%,rgba(25,16,8,0.14)_100%)]" />

            <div className="absolute inset-0 flex items-center">
              <div
                className={
                  mobile
                    ? 'max-w-[92%] px-4 py-5 text-white'
                    : 'max-w-[760px] px-6 py-8 text-white md:px-10 lg:px-14'
                }
              >
                <div
                  className={
                    mobile
                      ? 'inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white/90 backdrop-blur-sm'
                      : 'inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm'
                  }
                >
                  {activeSlide.badge}
                </div>

                <h1
                  className={
                    mobile
                      ? 'mt-3 max-w-[95%] text-2xl font-black leading-tight'
                      : 'mt-5 max-w-[700px] text-4xl font-black leading-tight md:text-6xl'
                  }
                >
                  {activeSlide.title}
                </h1>

                <p
                  className={
                    mobile
                      ? 'mt-3 max-w-[95%] text-xs leading-6 text-white/90'
                      : 'mt-5 max-w-[620px] text-sm leading-7 text-white/90 md:text-lg md:leading-8'
                  }
                >
                  {activeSlide.subtitle}
                </p>

                <div className={mobile ? 'mt-4 flex flex-wrap gap-2' : 'mt-7 flex flex-wrap gap-3'}>
                  <Link
                    to={activeSlide.buttonLink || '/du-lich-quoc-te'}
                    className={
                      mobile
                        ? 'inline-flex items-center rounded-2xl bg-[#8b5a22] px-4 py-2.5 text-xs font-bold uppercase tracking-[0.06em] text-white transition hover:bg-[#744815]'
                        : 'inline-flex items-center rounded-2xl bg-[#8b5a22] px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[#744815]'
                    }
                  >
                    {activeSlide.buttonText || 'Xem ngay'}
                  </Link>

                  <Link
                    to="/lien-he"
                    className={
                      mobile
                        ? 'inline-flex items-center rounded-2xl border border-white/30 bg-white/10 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.06em] text-white backdrop-blur-sm transition hover:bg-white/20'
                        : 'inline-flex items-center rounded-2xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white backdrop-blur-sm transition hover:bg-white/20'
                    }
                  >
                    Tư vấn ngay
                  </Link>
                </div>
              </div>
            </div>

            <button
              onClick={prevSlide}
              className={
                mobile
                  ? 'absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-lg font-bold text-[#744815] shadow transition hover:bg-white'
                  : 'absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-xl font-bold text-[#744815] shadow transition hover:bg-white'
              }
            >
              ‹
            </button>

            <button
              onClick={nextSlide}
              className={
                mobile
                  ? 'absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-lg font-bold text-[#744815] shadow transition hover:bg-white'
                  : 'absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-xl font-bold text-[#744815] shadow transition hover:bg-white'
              }
            >
              ›
            </button>

            <div
              className={
                mobile
                  ? 'absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 shadow backdrop-blur-sm'
                  : 'absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 rounded-full bg-white/80 px-4 py-2 shadow backdrop-blur-sm'
              }
            >
              {slides.map((slide, index) => (
                <button
                  key={slide.id || index}
                  onClick={() => setCurrent(index)}
                  className={`rounded-full transition-all ${
                    current === index
                      ? mobile
                        ? 'h-2.5 w-8 bg-[#8b5a22]'
                        : 'h-3 w-10 bg-[#8b5a22]'
                      : mobile
                      ? 'h-2.5 w-2.5 bg-[#d7c2a0]'
                      : 'h-3 w-3 bg-[#d7c2a0]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className={mobile ? '-mt-5 relative z-20 px-1' : '-mt-8 relative z-20 px-2 md:px-6'}>
          <form
            onSubmit={handleSearch}
            className={
              mobile
                ? 'rounded-[24px] border border-[#eadfce] bg-white p-4 shadow-xl'
                : 'rounded-[28px] border border-[#eadfce] bg-white p-4 shadow-xl md:p-5'
            }
          >
            <div
              className={
                mobile
                  ? 'grid gap-3'
                  : 'grid gap-4 lg:grid-cols-[1.25fr_1fr_1fr_1fr_auto]'
              }
            >
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#9b6a27]">
                  Tìm tour
                </label>
                <input
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full rounded-2xl border border-[#dcc7a6] px-4 py-3 outline-none transition focus:border-[#8b5a22]"
                  placeholder="Nhập tên tour, điểm đến..."
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#9b6a27]">
                  Điểm đến
                </label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full rounded-2xl border border-[#dcc7a6] px-4 py-3 text-[#5f4a33] outline-none transition focus:border-[#8b5a22]"
                >
                  <option value="">Tất cả điểm đến</option>
                  <option value="an-do-nepal">Ấn Độ - Nepal</option>
                  <option value="singapore-malaysia">Singapore - Malaysia</option>
                  <option value="nhat-ban">Nhật Bản</option>
                  <option value="thai-lan">Thái Lan</option>
                  <option value="trong-nuoc">Trong nước</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#9b6a27]">
                  Tháng đi
                </label>
                <select
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="w-full rounded-2xl border border-[#dcc7a6] px-4 py-3 text-[#5f4a33] outline-none transition focus:border-[#8b5a22]"
                >
                  <option value="">Chọn tháng</option>
                  <option value="1">Tháng 1</option>
                  <option value="2">Tháng 2</option>
                  <option value="3">Tháng 3</option>
                  <option value="4">Tháng 4</option>
                  <option value="5">Tháng 5</option>
                  <option value="6">Tháng 6</option>
                  <option value="7">Tháng 7</option>
                  <option value="8">Tháng 8</option>
                  <option value="9">Tháng 9</option>
                  <option value="10">Tháng 10</option>
                  <option value="11">Tháng 11</option>
                  <option value="12">Tháng 12</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#9b6a27]">
                  Loại tour
                </label>
                <select
                  value={tourType}
                  onChange={(e) => setTourType(e.target.value)}
                  className="w-full rounded-2xl border border-[#dcc7a6] px-4 py-3 text-[#5f4a33] outline-none transition focus:border-[#8b5a22]"
                >
                  <option value="">Tất cả</option>
                  <option value="hanh-huong">Hành hương</option>
                  <option value="quoc-te">Quốc tế</option>
                  <option value="trong-nuoc">Trong nước</option>
                  <option value="nghi-duong">Nghỉ dưỡng</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full rounded-2xl bg-[#8b5a22] px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[#744815] lg:w-auto"
                >
                  Tìm kiếm
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}