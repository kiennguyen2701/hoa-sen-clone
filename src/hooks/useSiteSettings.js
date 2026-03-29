import { useEffect, useState } from 'react';
import { getSetting } from '../lib/settingsApi';

const defaultHeader = {
  companyName: 'CÔNG TY DU LỊCH HÀNH HƯƠNG QUỐC TẾ HOA SEN',
  logoText: 'HS',
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
  companyTitle: 'CÔNG TY CỔ PHẦN DU LỊCH MVIP ',
  address: 'Số 1 Ngách 160/6 Bạch Đằng, Phường Hồng Hà, Hà Nội',
  phone: '0366 040 959',
  hotline: '0965 692 959 ',
  email: 'MvipTravel@gmail.com',
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