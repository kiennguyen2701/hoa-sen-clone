export default function PageContainer({ title, subtitle, children }) {
  return (
    <div className="mx-auto max-w-[1180px] px-4 py-10">
      <div className="mb-6 border-b border-[#eadfce] pb-4">
        <div className="text-sm font-bold uppercase tracking-[0.22em] text-[#a26d1a]">
          Mvip Travel
        </div>
        <h1 className="mt-2 text-3xl font-black text-[#714b1f]">{title}</h1>
        {subtitle ? (
          <p className="mt-3 max-w-4xl text-[15px] leading-8 text-[#5f4a33]">
            {subtitle}
          </p>
        ) : null}
      </div>
      {children}
    </div>
  );
}