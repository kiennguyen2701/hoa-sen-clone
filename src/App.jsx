import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import HeroSlider from './components/HeroSlider';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import InternationalToursPage from './pages/InternationalToursPage';
import DomesticToursPage from './pages/DomesticToursPage';
import ServicesPage from './pages/ServicesPage';
import GuidesPage from './pages/GuidesPage';
import ReviewsPage from './pages/ReviewsPage';
import ContactPage from './pages/ContactPage';
import TourDetailPage from './pages/TourDetailPage';
import AdminPage from './pages/AdminPage';

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const showHeroSlider = location.pathname === '/';

  return (
    <div className="min-h-screen bg-[#f7f1e6] text-[#3f2d1d]">
      <div className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-3 xl:flex">
        <button className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0a8f3e] text-lg text-white shadow-lg">
          Z
        </button>
        <button className="flex h-12 w-12 items-center justify-center rounded-full bg-[#d0892d] text-lg text-white shadow-lg">
          ☎
        </button>
      </div>

      {!isAdmin && <SiteHeader />}
      {!isAdmin && showHeroSlider && <HeroSlider />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gioi-thieu" element={<AboutPage />} />
        <Route path="/du-lich-quoc-te" element={<InternationalToursPage />} />
        <Route path="/du-lich-trong-nuoc" element={<DomesticToursPage />} />
        <Route path="/du-lich-noi-dia" element={<DomesticToursPage />} />
        <Route path="/dich-vu-visa" element={<ServicesPage />} />
        <Route path="/cam-nang" element={<GuidesPage />} />
        <Route path="/danh-gia" element={<ReviewsPage />} />
        <Route path="/lien-he" element={<ContactPage />} />
        <Route path="/tour/:slug" element={<TourDetailPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>

      {!isAdmin && <SiteFooter />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}