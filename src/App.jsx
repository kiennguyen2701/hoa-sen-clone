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
import SearchPage from './pages/SearchPage';

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const showHeroSlider = location.pathname === '/';

  return (
    <div className="min-h-screen bg-[#f7f1e6] text-[#3f2d1d]">
      <div className="fixed right-3 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-2">
  {/* Zalo */}
  <a
  href="https://zalo.me/0965692959"
  target="_blank"
  rel="noopener noreferrer"
  className="flex h-10 w-10 items-center justify-center rounded-full ..."
  title="Chat Zalo"
>
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg"
    alt="Zalo"
    className="h-7 w-7"
  />
</a>

  {/* Facebook */}
  <a
    href="https://www.facebook.com/"
    target="_blank"
    rel="noopener noreferrer"
    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1877f2] text-lg font-bold text-white shadow-lg transition hover:scale-105"
    title="Facebook"
  >
    f
  </a>

  {/* Call phone */}
  <a
    href="tel:0965692959"
    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d0892d] text-lg text-white shadow-lg transition hover:scale-105"
    title="Gọi ngay"
  >
    ☎
  </a>
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
        <Route path="/tim-kiem" element={<SearchPage />} />
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