import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const navItems = [
  
  { label: 'Giới thiệu', to: '/gioi-thieu' },
  { label: 'Du lịch quốc tế', to: '/du-lich-quoc-te' },
  { label: 'Du lịch trong nước', to: '/du-lich-noi-dia' },
  { label: 'Dịch vụ - Visa', to: '/dich-vu-visa' },
  { label: 'Đánh giá', to: '/danh-gia' },
  { label: 'Liên hệ', to: '/lien-he' },
];

function NavItem({ to, children, onClick, mobile = false }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        mobile
          ? `block rounded-2xl px-4 py-3 font-bold transition ${
              isActive
                ? 'bg-[#8b5a22] text-white'
                : 'bg-[#fcfaf5] text-[#5f4a33] hover:bg-[#f4ead8]'
            }`
          : `whitespace-nowrap text-[14px] xl:text-[15px] font-semibold transition ${
              isActive ? 'text-[#8b5a22]' : 'text-[#5f4a33] hover:text-[#8b5a22]'
            }`
      }
    >
      {children}
    </NavLink>
  );
}

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#eadfce] bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-[1280px] px-4">
        <div className="flex items-center justify-between gap-3 py-3 lg:hidden">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-[#caa56b] text-[#8b5a22] font-extrabold">
              VIP
            </div>
            <div className="min-w-0">
              <div className="truncate text-[17px] font-black uppercase text-[#5c3d18]">
                CÔNG TY CỔ PHẦN DU LỊCH MVIP
              </div>
            </div>
          </Link>

          <button
            type="button"
            aria-label="Mở menu"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#dcc7a6] text-[#8b5a22] lg:hidden"
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

        <div className="hidden lg:grid lg:grid-cols-[360px_1fr_170px] lg:items-center lg:gap-6 lg:py-4">
  <Link to="/" className="flex items-center gap-3">
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-[#caa56b] text-[#8b5a22] font-extrabold">
      VIP
    </div>

    <div className="text-[16px] xl:text-[18px] font-black uppercase whitespace-nowrap text-[#5c3d18]">
      CÔNG TY CỔ PHẦN DU LỊCH MVIP
    </div>
  </Link>

  <nav className="flex items-center justify-center gap-5 xl:gap-6 whitespace-nowrap">
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
      className="block whitespace-nowrap text-[18px] font-black text-[#6f4817]"
    >
      0965 692 959
    </a>
  </div>
</div>

        {mobileOpen && (
          <div className="border-t border-[#eadfce] pb-4 pt-3 lg:hidden">
            <nav className="grid gap-3">
              {navItems.map((item) => (
                <NavItem
                  key={item.to}
                  to={item.to}
                  mobile
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
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