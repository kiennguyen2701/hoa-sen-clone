import { useFooterSettings } from '../hooks/useSiteSettings';

export default function SiteFooter() {
  const settings = useFooterSettings();

  return (
    <footer className="bg-[#5b3818] text-[#f8ead4]">
      <div className="mx-auto grid max-w-[1180px] gap-8 px-4 py-10 lg:grid-cols-[1.3fr_0.8fr_1fr]">
        <div>
          <h3 className="text-xl font-extrabold uppercase leading-8">
            {settings.companyTitle}
          </h3>
          <div className="mt-4 space-y-2 text-sm leading-7 text-[#f2e3c8]">
            <p>Địa chỉ: {settings.address}</p>
            <p>Điện thoại: {settings.phone}</p>
            <p>Hotline: {settings.hotline}</p>
            <p>Email: {settings.email}</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-extrabold uppercase">Tour Hot</h3>
          <div className="mt-4 space-y-2 text-sm leading-7 text-[#f2e3c8]">
            {settings.tourHot.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-extrabold uppercase">Dịch vụ</h3>
          <div className="mt-4 space-y-2 text-sm leading-7 text-[#f2e3c8]">
            {settings.services.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}