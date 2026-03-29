import { useEffect, useState } from 'react';
import { getSetting } from '../lib/settingsApi';

const defaultHeader = {
  companyName: 'CÔNG TY CỔ PHẦN DU LỊCH MVIP',
  logoText: 'MVIP',
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
  phone: '028.9999.9999',
  hotline: '0965 692 959 - 0366 040 959',
  email: 'mviptravel@gmail.com',
  tourHot: [
    'DU LỊCH QUỐC TẾ',
    'DU LỊCH TRONG NƯỚC',
    'DỊCH VỤ - VISA',
    'TOUR INBOUND',
  ],
  services: [
    'HỒ SƠ NĂNG LỰC',
    'CHÍNH SÁCH BẢO MẬT THÔNG TIN',
    'PHƯƠNG THỨC THANH TOÁN',
    'CHÍNH SÁCH THAY ĐỔI, CHUYỂN HOẶC HỦY TOUR',
    'CHÍNH SÁCH CHUNG',
  ],
};

const defaultHeroSlider = {
  slides: [
    {
      id: 1,
      image:
        'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1800&auto=format&fit=crop',
      badge: 'Hành hương cao cấp',
      title: 'Hoa Sen Xứ Phật',
      subtitle:
        'Hành trình tâm linh, du lịch cao cấp và trải nghiệm chân thật cho khách hàng Việt Nam.',
      buttonText: 'Khám phá tour',
      buttonLink: '/du-lich-quoc-te',
    },
    {
      id: 2,
      image:
        'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1800&auto=format&fit=crop',
      badge: 'Tour quốc tế nổi bật',
      title: 'Singapore - Malaysia 2026',
      subtitle:
        'Khám phá hai quốc gia hiện đại với lịch trình tối ưu, dịch vụ chỉn chu và nhiều lựa chọn linh hoạt.',
      buttonText: 'Xem ngay',
      buttonLink: '/du-lich-quoc-te',
    },
    {
      id: 3,
      image:
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1800&auto=format&fit=crop',
      badge: 'Du lịch trong nước',
      title: 'Biển đảo và nghỉ dưỡng Việt Nam',
      subtitle:
        'Lựa chọn các hành trình thư giãn, biển đảo, miền Trung, Tây Bắc và nhiều tuyến trong nước hấp dẫn.',
      buttonText: 'Xem tour trong nước',
      buttonLink: '/du-lich-trong-nuoc',
    },
  ],
};

export function useHeaderSettings() {
  const [settings, setSettings] = useState(defaultHeader);

  useEffect(() => {
    getSetting('header')
      .then((data) => {
        if (data) setSettings({ ...defaultHeader, ...data });
      })
      .catch(() => {});
  }, []);

  return settings;
}

export function useFooterSettings() {
  const [settings, setSettings] = useState(defaultFooter);

  useEffect(() => {
    getSetting('footer')
      .then((data) => {
        if (data) setSettings({ ...defaultFooter, ...data });
      })
      .catch(() => {});
  }, []);

  return settings;
}

export function useHeroSliderSettings() {
  const [settings, setSettings] = useState(defaultHeroSlider);

  useEffect(() => {
    getSetting('hero_slider')
      .then((data) => {
        if (data) setSettings({ ...defaultHeroSlider, ...data });
      })
      .catch(() => {});
  }, []);

  return settings;
}