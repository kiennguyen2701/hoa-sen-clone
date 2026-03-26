export default function TourCard({ title, index }) {
  return (
    <div className="group overflow-hidden rounded-md border border-[#e8dcc9] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="h-44 bg-[linear-gradient(135deg,#e7d3ae,#b68a47,#6a431d)]" />
      <div className="space-y-3 p-3">
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9e6d2b]">
          Tour {index + 1}
        </div>
        <h3 className="min-h-[60px] text-sm font-bold leading-5 text-[#3d2a17]">
          {title}
        </h3>
        <button className="rounded-sm border border-[#b78a4d] px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#8b5a22] hover:bg-[#8b5a22] hover:text-white">
          Xem chi tiết
        </button>
      </div>
    </div>
  );
}