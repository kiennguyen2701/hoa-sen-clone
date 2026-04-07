import { useEffect, useState } from 'react';
import { getSetting, upsertSetting } from '../../lib/settingsApi';
import { listTours } from '../../lib/toursApi';

const emptySlide = {
  id: '',
  image: '',
  badge: '',
  title: '',
  subtitle: '',
  buttonText: '',
  buttonLink: '',
};

export default function HeroSliderSettingsPanel() {
  const [slides, setSlides] = useState([emptySlide, emptySlide, emptySlide]);
  const [saving, setSaving] = useState(false);
  const [tours, setTours] = useState([]);

  useEffect(() => {
    async function load() {
      const sliderData = await getSetting('hero_slider');
      const toursData = await listTours();

      setTours(toursData || []);

      if (sliderData?.slides?.length) {
        const normalized = [...sliderData.slides];
        while (normalized.length < 3) {
          normalized.push({ ...emptySlide, id: Date.now() + Math.random() });
        }
        setSlides(normalized.slice(0, 3));
      } else {
        setSlides([
          { ...emptySlide, id: 1 },
          { ...emptySlide, id: 2 },
          { ...emptySlide, id: 3 },
        ]);
      }
    }

    load();
  }, []);

  function updateSlide(index, key, value) {
    const next = [...slides];
    next[index] = {
      ...next[index],
      [key]: value,
    };
    setSlides(next);
  }

  function handleTourSelect(index, slug) {
    const selectedTour = tours.find((tour) => tour.slug === slug);
    if (!selectedTour) return;

    const next = [...slides];
    next[index] = {
      ...next[index],
      buttonLink: `/tour/${selectedTour.slug}`,
      title: next[index].title || selectedTour.title,
      subtitle:
        next[index].subtitle ||
        selectedTour.short_description ||
        selectedTour.shortDescription ||
        '',
      image: next[index].image || selectedTour.image || '',
    };
    setSlides(next);
  }

  async function handleSave() {
    try {
      setSaving(true);

      const payload = {
        slides: slides.map((slide, index) => ({
          id: slide.id || index + 1,
          image: slide.image,
          badge: slide.badge,
          title: slide.title,
          subtitle: slide.subtitle,
          buttonText: slide.buttonText,
          buttonLink: slide.buttonLink,
        })),
      };

      await upsertSetting('hero_slider', payload);
      alert('Lưu banner thành công');
    } catch (error) {
      alert(error.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mt-8 rounded-3xl border border-[#eadfce] bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-black text-[#714b1f]">Cài đặt Banner Slider</h2>
      <p className="mt-2 text-sm text-[#6b5840]">
        Anh có thể chỉnh ảnh, nội dung và chọn đúng tour để nút bấm dẫn về trang chi tiết tour.
      </p>

      <div className="mt-6 space-y-8">
        {slides.map((slide, index) => (
          <div key={index} className="rounded-2xl border border-[#eadfce] bg-[#fcfaf5] p-5">
            <div className="mb-4 text-lg font-extrabold text-[#7c511f]">
              Slide {index + 1}
            </div>

            <div className="grid gap-4">
              <input
                className="rounded-2xl border border-[#dcc7a6] px-4 py-3"
                placeholder="Link ảnh banner"
                value={slide.image || ''}
                onChange={(e) => updateSlide(index, 'image', e.target.value)}
              />

              <input
                className="rounded-2xl border border-[#dcc7a6] px-4 py-3"
                placeholder="Badge"
                value={slide.badge || ''}
                onChange={(e) => updateSlide(index, 'badge', e.target.value)}
              />

              <input
                className="rounded-2xl border border-[#dcc7a6] px-4 py-3"
                placeholder="Tiêu đề banner"
                value={slide.title || ''}
                onChange={(e) => updateSlide(index, 'title', e.target.value)}
              />

              <textarea
                className="min-h-[100px] rounded-2xl border border-[#dcc7a6] px-4 py-3"
                placeholder="Mô tả ngắn"
                value={slide.subtitle || ''}
                onChange={(e) => updateSlide(index, 'subtitle', e.target.value)}
              />

              <input
                className="rounded-2xl border border-[#dcc7a6] px-4 py-3"
                placeholder="Text nút"
                value={slide.buttonText || ''}
                onChange={(e) => updateSlide(index, 'buttonText', e.target.value)}
              />

              <input
                className="rounded-2xl border border-[#dcc7a6] px-4 py-3"
                placeholder="Link nút (vd: /tour/ten-tour)"
                value={slide.buttonLink || ''}
                onChange={(e) => updateSlide(index, 'buttonLink', e.target.value)}
              />

              <select
                className="rounded-2xl border border-[#dcc7a6] px-4 py-3 text-[#6b5840]"
                defaultValue=""
                onChange={(e) => handleTourSelect(index, e.target.value)}
              >
                <option value="">Chọn nhanh tour để gắn nút điều hướng</option>
                {tours.map((tour) => (
                  <option key={tour.id} value={tour.slug}>
                    {tour.title}
                  </option>
                ))}
              </select>

              {slide.buttonLink && (
                <div className="text-sm text-[#6b5840]">
                  Link hiện tại: <span className="font-bold text-[#8b5a22]">{slide.buttonLink}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-2xl bg-[#8b5a22] px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white"
        >
          {saving ? 'Đang lưu...' : 'Lưu Banner'}
        </button>
      </div>
    </div>
  );
}