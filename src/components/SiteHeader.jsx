import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const navItems = [
  { label: 'Trang chủ', to: '/' },
  { label: 'Giới thiệu', to: '/gioi-thieu' },
  { label: 'Du lịch quốc tế', to: '/du-lich-quoc-te' },
  { label: 'Du lịch trong nước', to: '/du-lich-noi-dia' },
  { label: 'Dịch vụ - Visa', to: '/dich-vu-visa' },
  { label: 'Đánh giá', to: '/danh-gia' },
  { label: 'Liên hệ', to: '/lien-he' },
];

function NavItem({ to, children, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        [
          'transition-colors',
          isActive ? 'text-[#8b5a22] font-bold' : 'text-[#5f4a33] hover:text-[#8b5a22]',
        ].join(' ')
      }
    >
      {children}
    </NavLink>
  );
}

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[#eadfce]">
      <div className="mx-auto max-w-[1180px] px-4">
        <div className="flex items-center justify-between py-3">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#caa56b] text-[#8b5a22] font-extrabold">
              VIP
            </div>
            <div className="min-w-0">
              <div className="truncate text-[18px] font-black uppercase text-[#5c3d18] md:text-[20px]">
                CÔNG TY CỔ PHẦN DU LỊCH MVIP
              </div>
            </div>
          </Link>

          <div className="hidden items-center gap-10 lg:flex">
            <nav className="flex items-center gap-7 text-[15px]">
              {navItems.map((item) => (
                <NavItem key={item.to} to={item.to}>
                  {item.label}
                </NavItem>
              ))}
            </nav>

            <div className="text-right">
              <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#9b6a27]">
                Hotline tư vấn
              </div>
              <a
                href="tel:0965692959"
                className="text-[18px] font-black text-[#6f4817]"
              >
                0965 692 959
              </a>
            </div>
          </div>

          <button
            type="button"
            aria-label="Mở menu"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#dcc7a6] text-[#8b5a22] lg:hidden"
          >
            <span className="relative block h-5 w-5">
              <span
                className={`absolute left-0 top-0 h-[2px] w-5 bg-current transition ${
                  mobileOpen ? 'translate-y-[9px] rotate-45' : ''
                }`}
              />
              <span
                className={`absolute left-0 top-[9px] h-[2px] w-5 bg-current transition ${
                  mobileOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`absolute left-0 top-[18px] h-[2px] w-5 bg-current transition ${
                  mobileOpen ? '-translate-y-[9px] -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-[#eadfce] pb-4 pt-3 lg:hidden">
            <nav className="grid gap-3">
              {navItems.map((item) => (
                <NavItem
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                >
                  <div className="rounded-2xl bg-[#fcfaf5] px-4 py-3">
                    {item.label}
                  </div>
                </NavItem>
              ))}
            </nav>

            <div className="mt-4 rounded-2xl border border-[#eadfce] bg-[#fcfaf5] px-4 py-3">
              <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#9b6a27]">
                Hotline tư vấn
              </div>
              <a
                href="tel:0965692959"
                className="mt-1 block text-[20px] font-black text-[#6f4817]"
              >
                0965 692 959
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}