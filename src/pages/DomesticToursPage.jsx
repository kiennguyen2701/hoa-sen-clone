import PageContainer from '../components/PageContainer';
import TourCard from '../components/TourCard';
import { domesticTours } from '../data/siteDataTemp.js';

export default function DomesticToursPage() {
  return (
    <PageContainer
      title="Du lịch trong nước"
      subtitle="Trang này nên chia theo miền Bắc, miền Trung, miền Nam, biển đảo, hành hương trong nước và tour lễ tết."
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {domesticTours.map((tour, index) => (
          <TourCard key={tour} title={tour} index={index} />
        ))}
      </div>
    </PageContainer>
  );
}