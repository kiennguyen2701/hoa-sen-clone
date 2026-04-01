import { useEffect, useState } from 'react';
import HeroSlider from '../components/HeroSlider';
import TourCard from '../components/TourCard';
import SiteFooter from '../components/SiteFooter';
import { listTours } from '../lib/toursApi';

export default function HomePageDesktop() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listTours()
      .then((res) => setTours(res || []))
      .finally(() => setLoading(false));
  }, []);

  const featuredTours = tours.filter((tour) => tour.status !== 'inactive').slice(0, 21);

  return (
    <div className="bg-[#f7f1e6]">
      

      <section className="mx-auto max-w-[1180px] px-4 py-10">
        <div className="mb-8">
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#a26d1a]">
            MVIP Travel
          </div>
          <h2 className="mt-2 text-4xl font-black text-[#714b1f]">Tour nổi bật</h2>
          <p className="mt-3 max-w-3xl text-[15px] leading-8 text-[#5f4a33]">
            Khám phá những hành trình nổi bật, được nhiều khách hàng quan tâm và lựa chọn.
          </p>
        </div>

        {loading ? (
          <div className="rounded-3xl border border-[#eadfce] bg-white p-6 text-[#6b5840] shadow-sm">
            Đang tải danh sách tour...
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featuredTours.map((tour, index) => (
              <TourCard key={tour.slug || tour.id || index} tour={tour} index={index} />
            ))}
          </div>
        )}
      </section>

      
    </div>
  );
}