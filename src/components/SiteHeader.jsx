import { NavLink } from 'react-router-dom';
import { menuItems } from '../data/siteDataTemp.js';

export default function SiteHeader() {
  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-4 py-4">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#d8b169] bg-[#fff7e8] text-xl font-extrabold text-[#a56b15]">
            HS
          </div>
          <div>
            <div className="text-xl font-extrabold uppercase tracking-[0.04em] text-[#7c511f]">
              Công Ty Du Lịch Hành Hương Quốc Tế Hoa Sen
            </div>
          </div>
        </div>
        <div className="hidden text-right md:block">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#9b6a27]">
            Hotline tư vấn
          </div>
          <div className="mt-1 text-2xl font-black text-[#744815]">
            0904 999 571
          </div>
        </div>
      </div>

      <nav className="border-y border-[#eadfce] bg-[#f8f1e2]">
        <div className="mx-auto flex max-w-[1180px] items-center gap-1 overflow-x-auto px-4 py-0">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `whitespace-nowrap border-r border-[#eadfce] px-4 py-4 text-sm font-semibold uppercase tracking-[0.04em] ${
                  isActive
                    ? 'bg-[#8c6326] text-white'
                    : 'text-[#6b4a23] hover:bg-[#eddcc0]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}