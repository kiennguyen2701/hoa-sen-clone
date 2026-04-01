import useIsMobile from '../hooks/useIsMobile';
import HomePageDesktop from './HomePageDesktop';
import HomePageMobile from './HomePageMobile';

export default function HomePage() {
  const isMobile = useIsMobile();

  return isMobile ? <HomePageMobile /> : <HomePageDesktop />;
}