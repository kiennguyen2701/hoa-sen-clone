import { useEffect, useState } from 'react';
import { getSetting, upsertSetting } from '../../lib/settingsApi';

const subTabs = [
  { key: 'header', label: 'Header' },
  { key: 'footer', label: 'Footer' },
];

const defaultHeader = {
  companyName: 'CÔNG TY CỔ PHẦN DU LỊCH MVIP',
  logoText: 'VIP',
  hotlineLabel: 'Hotline tư vấn',
  hotlineNumber: '0965 692 959',
  menuItems: [
    { label: 'TRANG CHỦ', to: '/' },
    { label: 'GIỚI THIỆU', to: '/gioi-thieu' },
    { label: 'DU LỊCH QUỐC TẾ', to: '/du-lich-quoc-te' },
    { label: 'DU LỊCH TRONG NƯỚC', to: '/du-lich-trong-nuoc' },
    { label: 'DỊCH VỤ - VISA', to: '/dich-vu-visa' },
    { label: 'CẨM NANG', to: '/cam-nang' },
    { label: 'ĐÁNH GIÁ', to: '/danh-gia' },
    { label: 'LIÊN HỆ', to: '/lien-he' },
  ],
};

const defaultFooter = {
  companyTitle: 'CÔNG TY CỔ PHẦN DU LỊCH MVIP',
  address: 'Số 1 Ngách 160/6 Bạch Đằng, Phường Hồng Hà, Hà Nội',
  phone: '0965 692 959',
  hotline: '0965 692 959 - 0366 040 959',
  email: 'MvipTravel@gmail.com',
  tourHot: [
    'DU LỊCH QUỐC TẾ',
    'DU LỊCH TRONG NƯỚC',
    'DỊCH VỤ - VISA',
  ],
  services: [
    'HỒ SƠ NĂNG LỰC',
    'CHÍNH SÁCH BẢO MẬT THÔNG TIN',
    'PHƯƠNG THỨC THANH TOÁN',
  ],
};

export default function SiteSettingsPanel() {
  const [activeTab, setActiveTab] = useState('header');
  const [headerForm, setHeaderForm] = useState(defaultHeader);
  const [footerForm, setFooterForm] = useState(defaultFooter);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      const [headerData, footerData] = await Promise.all([
        getSetting('header'),
        getSetting('footer'),
      ]);

      if (headerData) {
        setHeaderForm({ ...defaultHeader, ...headerData });
      }

      if (footerData) {
        setFooterForm({ ...defaultFooter, ...footerData });
      }
    }

    loadSettings();
  }, []);

  function updateHeaderField(key, value) {
    setHeaderForm((prev) => ({ ...prev, [key]: value }));
  }

  function updateFooterField(key, value) {
    setFooterForm((prev) => ({ ...prev, [key]: value }));
  }

  async function saveHeader() {
    try {
      setSaving(true);
      await upsertSetting('header', headerForm);
      alert('Đã lưu Header thành công');
    } catch (error) {
      alert(error.message);
    } finally {
      setSaving(false);
    }
  }

  async function saveFooter() {
    try {
      setSaving(true);
      await upsertSetting('footer', footerForm);
      alert('Đã lưu Footer thành công');
    } catch (error) {
      alert(error.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-3xl border border-[#eadfce] bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-[#714b1f]">Header & Footer</h2>
        <p className="mt-2 text-[15px] leading-8 text-[#5f4a33]">
          Chỉnh sửa các thông tin thương hiệu, hotline, menu và chân trang website.
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        {subTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`rounded-2xl px-4 py-2 text-sm font-bold transition ${
              activeTab === tab.key
                ? 'bg-[#8b5a22] text-white'
                : 'bg-[#fcfaf5] text-[#6f4817] hover:bg-[#f3e6cf]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'header' && (
        <div className="space-y-4">
          <input
            className="w-full rounded-2xl border border-[#dcc7a6] px-4 py-3"
            placeholder="Tên công ty"
            value={headerForm.companyName || ''}
            onChange={(e) => updateHeaderField('companyName', e.target.value)}
          />

          <input
            className="w-full rounded-2xl border border-[#dcc7a6] px-4 py-3"
            placeholder="Logo text"
            value={headerForm.logoText || ''}
            onChange={(e) => updateHeaderField('logoText', e.target.value)}
          />

          <input
            className="w-full rounded-2xl border border-[#dcc7a6] px-4 py-3"
            placeholder="Hotline label"
            value={headerForm.hotlineLabel || ''}
            onChange={(e) => updateHeaderField('hotlineLabel', e.target.value)}
          />

          <input
            className="w-full rounded-2xl border border-[#dcc7a6] px-4 py-3"
            placeholder="Hotline number"
            value={headerForm.hotlineNumber || ''}
            onChange={(e) => updateHeaderField('hotlineNumber', e.target.value)}
          />

          <textarea
            className="min-h-[180px] w-full rounded-2xl border border-[#dcc7a6] px-4 py-3"
            placeholder='Menu JSON'
            value={JSON.stringify(headerForm.menuItems || [], null, 2)}
            onChange={(e) => {
              try {
                updateHeaderField('menuItems', JSON.parse(e.target.value));
              } catch {}
            }}
          />

          <button
            onClick={saveHeader}
            disabled={saving}
            className="rounded-2xl bg-[#8b5a22] px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white"
          >
            {saving ? 'Đang lưu...' : 'Lưu Header'}
          </button>
        </div>
      )}

      {activeTab === 'footer' && (
        <div className="space-y-4">
          <input
            className="w-full rounded-2xl border border-[#dcc7a6] px-4 py-3"
            placeholder="Tên công ty footer"
            value={footerForm.companyTitle || ''}
            onChange={(e) => updateFooterField('companyTitle', e.target.value)}
          />

          <input
            className="w-full rounded-2xl border border-[#dcc7a6] px-4 py-3"
            placeholder="Địa chỉ"
            value={footerForm.address || ''}
            onChange={(e) => updateFooterField('address', e.target.value)}
          />

          <input
            className="w-full rounded-2xl border border-[#dcc7a6] px-4 py-3"
            placeholder="Điện thoại"
            value={footerForm.phone || ''}
            onChange={(e) => updateFooterField('phone', e.target.value)}
          />

          <input
            className="w-full rounded-2xl border border-[#dcc7a6] px-4 py-3"
            placeholder="Hotline"
            value={footerForm.hotline || ''}
            onChange={(e) => updateFooterField('hotline', e.target.value)}
          />

          <input
            className="w-full rounded-2xl border border-[#dcc7a6] px-4 py-3"
            placeholder="Email"
            value={footerForm.email || ''}
            onChange={(e) => updateFooterField('email', e.target.value)}
          />

          <textarea
            className="min-h-[140px] w-full rounded-2xl border border-[#dcc7a6] px-4 py-3"
            placeholder='Tour hot JSON'
            value={JSON.stringify(footerForm.tourHot || [], null, 2)}
            onChange={(e) => {
              try {
                updateFooterField('tourHot', JSON.parse(e.target.value));
              } catch {}
            }}
          />

          <textarea
            className="min-h-[140px] w-full rounded-2xl border border-[#dcc7a6] px-4 py-3"
            placeholder='Services JSON'
            value={JSON.stringify(footerForm.services || [], null, 2)}
            onChange={(e) => {
              try {
                updateFooterField('services', JSON.parse(e.target.value));
              } catch {}
            }}
          />

          <button
            onClick={saveFooter}
            disabled={saving}
            className="rounded-2xl bg-[#8b5a22] px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white"
          >
            {saving ? 'Đang lưu...' : 'Lưu Footer'}
          </button>
        </div>
      )}
    </div>
  );
}