import { useEffect, useState } from 'react';

const slides = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1600&auto=format&fit=crop',
    subtitle: 'Du Lịch Hoa Sen 2026',
    title: 'Hành hương Ấn Độ - Nepal',
    desc: 'Hành trình về miền đất Phật, trải nghiệm tâm linh sâu sắc và lịch trình tối ưu cho khách Việt.',
    buttonText: 'Xem tour ngay',
    buttonLink: '/du-lich-quoc-te',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1600&auto=format&fit=crop',
    subtitle: 'Tour quốc tế nổi bật',
    title: 'Singapore - Malaysia 2026',
    desc: 'Khám phá hai quốc gia hiện đại bậc nhất Đông Nam Á với lịch trình chất lượng và dịch vụ trọn gói.',
    buttonText: 'Khám phá',
    buttonLink: '/du-lich-quoc-te',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop',
    subtitle: 'Du lịch trong nước',
    title: 'Nghỉ dưỡng biển đảo Việt Nam',
    desc: 'Tận hưởng hành trình thư giãn với những điểm đến đẹp, tiện nghi tốt và nhiều lựa chọn linh hoạt.',
    buttonText: 'Xem tour trong nước',
    buttonLink: '/du-lich-trong-nuoc',
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  function goToSlide(index) {
    setCurrent(index);
  }

  function prevSlide() {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }

  function nextSlide() {
    setCurrent((prev) => (prev + 1) % slides.length);
  }

  return (
    <section className="border-b border-[#eadfce] bg-[#f7f1e6]">
      <div className="mx-auto max-w-[1180px] px-4 py-5">
        <div className="relative overflow-hidden rounded-3xl border border-[#eadfce] bg-white shadow-sm">
          <div
            className="relative h-[280px] md:h-[420px]"
            style={{
              backgroundImage: `url(${slides[current].image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-black/10" />

            <div className="absolute inset-0 flex items-center">
              <div className="max-w-[680px] px-6 py-8 text-white md:px-10">
                <div className="text-xs font-bold uppercase tracking-[0.25em] text-white/80 md:text-sm">
                  {slides[current].subtitle}
                </div>

                <h2 className="mt-3 text-3xl font-black leading-tight md:text-5xl">
                  {slides[current].title}
                </h2>

                <p className="mt-4 max-w-[560px] text-sm leading-7 text-white/90 md:text-base">
                  {slides[current].desc}
                </p>

                <a
                  href={slides[current].buttonLink}
                  className="mt-6 inline-flex rounded-2xl bg-[#8b5a22] px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[#744815]"
                >
                  {slides[current].buttonText}
                </a>
              </div>
            </div>

            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-xl font-bold text-[#744815] shadow hover:bg-white"
            >
              ‹
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-xl font-bold text-[#744815] shadow hover:bg-white"
            >
              ›
            </button>
          </div>

          <div className="flex items-center justify-center gap-3 bg-white px-4 py-4">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                className={`h-3 rounded-full transition-all ${
                  current === index ? 'w-10 bg-[#8b5a22]' : 'w-3 bg-[#d7c2a0]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}