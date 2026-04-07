import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';

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

function getGalleryImages(tour) {
  const images = [];

  if (Array.isArray(tour?.gallery) && tour.gallery.length) {
    images.push(...tour.gallery.filter(Boolean));
  }

  if (tour?.image && !images.includes(tour.image)) {
    images.unshift(tour.image);
  }

  return images.length ? images : ['https://via.placeholder.com/1200x800?text=Tour'];
}

export default function TourCard({ tour }) {
  const navigate = useNavigate();
  const departures = normalizeDepartureOptions(tour?.departure).slice(0, 3);
  const galleryImages = getGalleryImages(tour);

  const [currentImage, setCurrentImage] = useState(0);
  const touchStartX = useRef(0);
  const touchMoved = useRef(false);

  function handleCardClick() {
    if (touchMoved.current) {
      touchMoved.current = false;
      return;
    }
    navigate(`/tour/${tour.slug}`);
  }

  function handleTouchStart(e) {
    touchStartX.current = e.changedTouches[0].clientX;
    touchMoved.current = false;
  }

  function handleTouchEnd(e) {
    const endX = e.changedTouches[0].clientX;
    const deltaX = touchStartX.current - endX;

    if (Math.abs(deltaX) < 40) return;

    touchMoved.current = true;

    if (deltaX > 0) {
      setCurrentImage((prev) => (prev + 1) % galleryImages.length);
    } else {
      setCurrentImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    }
  }

  function goPrevImage(e) {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  }

  function goNextImage(e) {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage((prev) => (prev + 1) % galleryImages.length);
  }

  return (
    <article
      onClick={handleCardClick}
      className="block cursor-pointer overflow-hidden rounded-[28px] border border-[#eadfce] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      {/* IMAGE */}
      <div
        className="relative h-[300px] overflow-hidden sm:h-[320px] lg:h-[280px]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Mobile: 1 ảnh đang active, vuốt ngang */}
        <img
          src={galleryImages[currentImage]}
          alt={tour.title}
          className="h-full w-full object-cover transition duration-500"
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

        {/* Mobile dots */}
        {galleryImages.length > 1 && (
          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 shadow backdrop-blur-sm lg:hidden">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrentImage(index);
                }}
                className={`rounded-full transition-all ${
                  currentImage === index ? 'h-2.5 w-7 bg-[#8b5a22]' : 'h-2.5 w-2.5 bg-[#d7c2a0]'
                }`}
              />
            ))}
          </div>
        )}

        {/* Desktop arrows for image gallery */}
        {galleryImages.length > 1 && (
          <>
            <button
              onClick={goPrevImage}
              className="absolute left-3 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-lg font-bold text-[#744815] shadow transition hover:bg-white lg:flex"
            >
              ‹
            </button>

            <button
              onClick={goNextImage}
              className="absolute right-3 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-lg font-bold text-[#744815] shadow transition hover:bg-white lg:flex"
            >
              ›
            </button>
          </>
        )}
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
                  {normalizeDepartureOptions(tour?.departure).length > 3 && <div>...</div>}
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
    </article>
  );
}