import TourCard from '../components/TourCard';
import PageContainer from '../components/PageContainer';
import { featuredTours } from '../data/siteDataTemp.js';

export default function HomePage() {
  return (
    <>
      <section className="border-b border-[#eadfce] bg-[linear-gradient(180deg,#fdf8ee,#f5e7ce)]">
        <div className="mx-auto grid max-w-[1180px] gap-8 px-4 py-10 lg:grid-cols-[1.5fr_1fr]">
          <div className="overflow-hidden rounded-md border border-[#ebd8ba] bg-white shadow-sm">
            <div className="flex h-[360px] items-center justify-center bg-[linear-gradient(120deg,#ead1a0,#c3924f,#6a411a)] px-8 text-center text-white">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.35em]">
                  DU LỊCH HOA SEN 2026
                </div>
                <h1 className="mt-4 text-4xl font-black leading-tight lg:text-5xl">
                  Hoa Sen Xứ Phật
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/90 lg:text-base">
                  Hành trình tâm linh, du lịch cao cấp, hành hương quốc tế và trải nghiệm chân thật cho khách hàng Việt Nam.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-md border border-[#ebd8ba] bg-white p-5 shadow-sm">
              <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#9b6a27]">
                Hotline tư vấn
              </div>
              <div className="mt-2 text-3xl font-black text-[#744815]">
                0904 999 571
              </div>
              <div className="mt-3 text-sm leading-7 text-[#6d5538]">
                Tư vấn tour hành hương, du lịch quốc tế, visa và lịch trình riêng theo nhu cầu.
              </div>
            </div>
            <div className="rounded-md border border-[#ebd8ba] bg-[#8c6326] p-5 text-white shadow-sm">
              <div className="text-xs font-bold uppercase tracking-[0.25em] text-white/80">
                Tour chủ lực
              </div>
              <div className="mt-2 text-lg font-bold">
                HÀNH HƯƠNG ẤN ĐỘ - NEPAL 2026
              </div>
              <div className="mt-3 text-sm leading-7 text-white/90">
                Điểm nhấn thương hiệu của website gốc, thiên về hành hương và du lịch tâm linh.
              </div>
            </div>
          </div>
        </div>
      </section>

      <PageContainer
        title="Tour nổi bật"
        subtitle="Trang chủ giữ vai trò landing page tổng hợp. Từ đây khách có thể đi sang từng trang riêng theo menu phía trên."
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredTours.map((tour, index) => (
            <TourCard key={tour} title={tour} index={index} />
          ))}
        </div>
      </PageContainer>
    </>
  );
}