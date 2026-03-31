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
        'https://media.cntravellerme.com/photos/68870cae16b3b95603955912/16:9/w_2560%2Cc_limit/072425-Unwritten-Rules-Bali-GettyImages-1469116195.jpg',
      badge: 'TOUR BALI',
      title: 'Bali Thiên Đường Nhiệt Đới',
      subtitle:
        'Check-in Handara Gate, đảo Nusa Penida, Bali Swing và Tanah Lot trong hành trình 5N4Đ trọn vẹn.',
      buttonText: 'Chi tiết',
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