import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { listTours, getTourBySlug } from '../lib/toursApi';

export default function TourDetailPage() {
  const { slug } = useParams();
  const [activeTab, setActiveTab] = useState('tong-quan');
  const [mainImage, setMainImage] = useState(null);
  const [tour, setTour] = useState(null);
  const [relatedTours, setRelatedTours] = useState([]);

  useEffect(() => {
    async function load() {
      const current = await getTourBySlug(slug);
      setTour(current);
      const all = await listTours();
      setRelatedTours(all.filter((item) => item.slug !== current.slug).slice(0, 3));
    }
    load();
  }, [slug]);

  if (!tour) {
    return (
      <div className="mx-auto max-w-[1180px] px-4 py-16">
        <div className="text-[#6b5840]">Đang tải chi tiết tour...</div>
      </div>
    );
  }