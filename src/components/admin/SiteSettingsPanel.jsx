import { useEffect, useState } from 'react';
import { getSetting, upsertSetting } from '../../lib/settingsApi';

const headerDefault = {
  companyName: '',
  logoText: '',
  hotlineLabel: '',
  hotlineNumber: '',
  menuItemsText: '',
};

const footerDefault = {
  companyTitle: '',
  address: '',
  phone: '',
  hotline: '',
  email: '',
  tourHotText: '',
  servicesText: '',
};

export default function SiteSettingsPanel() {
  const [header, setHeader] = useState(headerDefault);
  const [footer, setFooter] = useState(footerDefault);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const headerData = await getSetting('header');
      const footerData = await getSetting('footer');

      if (headerData) {
        setHeader({
          companyName: headerData.companyName || '',
          logoText: headerData.logoText || '',
          hotlineLabel: headerData.hotlineLabel || '',
          hotlineNumber: headerData.hotlineNumber || '',
          menuItemsText: (headerData.menuItems || [])
            .map((item) => `${item.label}|${item.to}`)
            .join('\n'),
        });
      }

      if (footerData) {
        setFooter({
          companyTitle: footerData.companyTitle || '',
          address: footerData.address || '',
          phone: footerData.phone || '',
          hotline: footerData.hotline || '',
          email: footerData.email || '',
          tourHotText: (footerData.tourHot || []).join('\n'),
          servicesText: (footerData.services || []).join('\n'),
        });
      }
    }

    load();
  }, []);

  async function handleSave() {
    try {
      setSaving(true);

      await upsertSetting('header', {
        companyName: header.companyName,
        logoText: header.logoText,
        hotlineLabel: header.hotlineLabel,
        hotlineNumber: header.hotlineNumber,
        menuItems: header.menuItemsText
          .split('\n')
          .map((line) => line.trim())
          .filter(Boolean)
          .map((line) => {
            const [label, to] = line.split('|');
            return { label: label?.trim(), to: to?.trim() };
          }),
      });

      await upsertSetting('footer', {
        companyTitle: footer.companyTitle,
        address: footer.address,
        phone: footer.phone,
        hotline: footer.hotline,
        email: footer.email,
        tourHot: footer.tourHotText
          .split('\n')
          .map((x) => x.trim())
          .filter(Boolean),
        services: footer.servicesText
          .split('\n')
          .map((x) => x.trim())
          .filter(Boolean),
      });

      alert('Lưu header/footer thành công');
    } catch (error) {
      alert(error.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-2">
      <div className="rounded-3xl border border-[#eadfce] bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-black text-[#714b1f]">Cài đặt Header</h2>
        <div className="mt-5 grid gap-4">
          <input className="rounded-2xl border border-[#dcc7a6] px-4 py-3" placeholder="Tên công ty" value={header.companyName} onChange={(e) => setHeader({ ...header, companyName: e.target.value })} />
          <input className="rounded-2xl border border-[#dcc7a6] px-4 py-3" placeholder="Logo text" value={header.logoText} onChange={(e) => setHeader({ ...header, logoText: e.target.value })} />
          <input className="rounded-2xl border border-[#dcc7a6] px-4 py-3" placeholder="Nhãn hotline" value={header.hotlineLabel} onChange={(e) => setHeader({ ...header, hotlineLabel: e.target.value })} />
          <input className="rounded-2xl border border-[#dcc7a6] px-4 py-3" placeholder="Số hotline" value={header.hotlineNumber} onChange={(e) => setHeader({ ...header, hotlineNumber: e.target.value })} />
          <textarea
            className="min-h-[180px] rounded-2xl border border-[#dcc7a6] px-4 py-3"
            placeholder="Menu items, mỗi dòng theo format: LABEL|/route"
            value={header.menuItemsText}
            onChange={(e) => setHeader({ ...header, menuItemsText: e.target.value })}
          />
        </div>
      </div>

      <div className="rounded-3xl border border-[#eadfce] bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-black text-[#714b1f]">Cài đặt Footer</h2>
        <div className="mt-5 grid gap-4">
          <input className="rounded-2xl border border-[#dcc7a6] px-4 py-3" placeholder="Tên công ty footer" value={footer.companyTitle} onChange={(e) => setFooter({ ...footer, companyTitle: e.target.value })} />
          <input className="rounded-2xl border border-[#dcc7a6] px-4 py-3" placeholder="Địa chỉ" value={footer.address} onChange={(e) => setFooter({ ...footer, address: e.target.value })} />
          <input className="rounded-2xl border border-[#dcc7a6] px-4 py-3" placeholder="Điện thoại" value={footer.phone} onChange={(e) => setFooter({ ...footer, phone: e.target.value })} />
          <input className="rounded-2xl border border-[#dcc7a6] px-4 py-3" placeholder="Hotline" value={footer.hotline} onChange={(e) => setFooter({ ...footer, hotline: e.target.value })} />
          <input className="rounded-2xl border border-[#dcc7a6] px-4 py-3" placeholder="Email" value={footer.email} onChange={(e) => setFooter({ ...footer, email: e.target.value })} />
          <textarea
            className="min-h-[120px] rounded-2xl border border-[#dcc7a6] px-4 py-3"
            placeholder="Tour hot, mỗi dòng 1 mục"
            value={footer.tourHotText}
            onChange={(e) => setFooter({ ...footer, tourHotText: e.target.value })}
          />
          <textarea
            className="min-h-[120px] rounded-2xl border border-[#dcc7a6] px-4 py-3"
            placeholder="Dịch vụ, mỗi dòng 1 mục"
            value={footer.servicesText}
            onChange={(e) => setFooter({ ...footer, servicesText: e.target.value })}
          />
        </div>
      </div>

      <div className="lg:col-span-2">
        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-2xl bg-[#8b5a22] px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white"
        >
          {saving ? 'Đang lưu...' : 'Lưu Header / Footer'}
        </button>
      </div>
    </div>
  );
}