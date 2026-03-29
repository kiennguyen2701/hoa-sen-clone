import { useState } from 'react';
import TourAdminPanel from '../components/admin/TourAdminPanel';
import SiteSettingsPanel from '../components/admin/SiteSettingsPanel';
import HeroSliderSettingsPanel from '../components/admin/HeroSliderSettingsPanel';

const adminTabs = [
  { key: 'dashboard', label: 'Tổng quan' },
  { key: 'tours', label: 'Quản lý tour' },
  { key: 'banner', label: 'Banner trang chủ' },
  { key: 'header', label: 'Header & Footer' },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <section className="mx-auto max-w-[1280px] px-4 py-10">
      <div className="mb-8">
        <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#a26d1a]">
          Admin
        </div>
        <h1 className="mt-2 text-4xl font-black text-[#714b1f]">Dashboard quản trị</h1>
        <p className="mt-3 max-w-3xl text-[15px] leading-8 text-[#5f4a33]">
          Quản lý toàn bộ nội dung website MVIP Travel theo từng module riêng biệt.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="h-fit rounded-3xl border border-[#eadfce] bg-white p-4 shadow-sm">
          <div className="mb-3 px-3 text-sm font-bold uppercase tracking-[0.14em] text-[#9b6a27]">
            Menu quản trị
          </div>

          <div className="space-y-2">
            {adminTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${
                  activeTab === tab.key
                    ? 'bg-[#8b5a22] text-white'
                    : 'bg-[#fcfaf5] text-[#6f4817] hover:bg-[#f3e6cf]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </aside>

        <main className="min-w-0">
          {activeTab === 'dashboard' && <AdminDashboardHome setActiveTab={setActiveTab} />}
          {activeTab === 'tours' && <TourAdminPanel />}
          {activeTab === 'banner' && <HeroSliderSettingsPanel />}
          {activeTab === 'header' && <SiteSettingsPanel />}
        </main>
      </div>
    </section>
  );
}

function AdminDashboardHome({ setActiveTab }) {
  const cards = [
    {
      key: 'tours',
      title: 'Quản lý tour',
      desc: 'Thêm mới, chỉnh sửa, cập nhật nội dung và trạng thái tour.',
    },
    {
      key: 'banner',
      title: 'Banner trang chủ',
      desc: 'Đổi ảnh banner, tiêu đề, nút CTA và điều hướng tới tour chi tiết.',
    },
    {
      key: 'header',
      title: 'Header & Footer',
      desc: 'Chỉnh sửa thương hiệu, hotline, menu và thông tin chân trang.',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-[#eadfce] bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-black text-[#714b1f]">Tổng quan quản trị</h2>
        <p className="mt-3 text-[15px] leading-8 text-[#5f4a33]">
          Chọn đúng module để quản lý nội dung nhanh hơn, tránh kéo dài một trang quá nhiều form.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <button
            key={card.key}
            onClick={() => setActiveTab(card.key)}
            className="rounded-3xl border border-[#eadfce] bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#a26d1a]">
              Module
            </div>
            <h3 className="mt-3 text-2xl font-black text-[#714b1f]">{card.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[#5f4a33]">{card.desc}</p>
            <div className="mt-5 inline-flex rounded-xl bg-[#8b5a22] px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-white">
              Vào quản lý
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}