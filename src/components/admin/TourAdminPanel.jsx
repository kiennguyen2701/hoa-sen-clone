import { useEffect, useMemo, useState } from 'react';
import { createTour, deleteTour, listTours, updateTour } from '../../lib/toursApi';

const emptyForm = {
  title: '',
  slug: '',
  category: 'Du lịch quốc tế',
  duration: '',
  departure: '',
  transport: '',
  hotel: '',
  price: '',
  image: '',
  gallery: '[]',
  short_description: '',
  overview: '',
  highlights: '[]',
  itinerary: '[]',
  included: '[]',
  excluded: '[]',
  notes: '[]',
  video_url: '',
  status: 'active',
  supplier_name: '',
  supplier_code: '',
  commission_total: '',
  commission_ctv: '',
  commission_mvip: '',
};

function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function safeParseJson(text, fallback) {
  try {
    return text ? JSON.parse(text) : fallback;
  } catch {
    return fallback;
  }
}

function formatNumberInput(value) {
  const raw = String(value || '').replace(/[^\d]/g, '');
  return raw;
}

export default function TourAdminPanel() {
  const [tours, setTours] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function loadTours() {
    try {
      setLoading(true);
      const rows = await listTours();
      setTours(rows);
    } catch (error) {
      console.error(error);
      alert('Không tải được danh sách tour.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTours();
  }, []);

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  function handleChange(field, value) {
    if (field === 'title') {
      setForm((prev) => ({
        ...prev,
        title: value,
        slug: editingId ? prev.slug : slugify(value),
      }));
      return;
    }

    if (field === 'commission_total') {
      const total = Number(formatNumberInput(value) || 0);
      const ctv = Math.floor(total * 0.7);
      const mvip = total - ctv;

      setForm((prev) => ({
        ...prev,
        commission_total: total ? String(total) : '',
        commission_ctv: total ? String(ctv) : '',
        commission_mvip: total ? String(mvip) : '',
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setSaving(true);

      const payload = {
        title: form.title.trim(),
        slug: form.slug.trim(),
        category: form.category.trim(),
        duration: form.duration.trim(),
        departure: form.departure.trim(),
        transport: form.transport.trim(),
        hotel: form.hotel.trim(),
        price: form.price.trim(),
        image: form.image.trim(),
        gallery: safeParseJson(form.gallery, []),
        short_description: form.short_description.trim(),
        overview: form.overview.trim(),
        highlights: safeParseJson(form.highlights, []),
        itinerary: safeParseJson(form.itinerary, []),
        included: safeParseJson(form.included, []),
        excluded: safeParseJson(form.excluded, []),
        notes: safeParseJson(form.notes, []),
        video_url: form.video_url.trim() || null,
        status: form.status,
        supplier_name: form.supplier_name.trim() || null,
        supplier_code: form.supplier_code.trim() || null,
        commission_total: Number(form.commission_total || 0),
        commission_ctv: Number(form.commission_ctv || 0),
        commission_mvip: Number(form.commission_mvip || 0),
      };

      if (!payload.title || !payload.slug) {
        alert('Vui lòng nhập tên tour và slug.');
        return;
      }

      if (editingId) {
        await updateTour(editingId, payload);
        alert('Cập nhật tour thành công.');
      } else {
        await createTour(payload);
        alert('Thêm tour thành công.');
      }

      resetForm();
      await loadTours();
    } catch (error) {
      console.error(error);
      alert(error?.message || 'Lưu tour thất bại.');
    } finally {
      setSaving(false);
    }
  }

  function handleEdit(tour) {
    setEditingId(tour.id);
    setForm({
      title: tour.title || '',
      slug: tour.slug || '',
      category: tour.category || 'Du lịch quốc tế',
      duration: tour.duration || '',
      departure: tour.departure || '',
      transport: tour.transport || '',
      hotel: tour.hotel || '',
      price: tour.price || '',
      image: tour.image || '',
      gallery: JSON.stringify(tour.gallery || [], null, 2),
      short_description: tour.short_description || '',
      overview: tour.overview || '',
      highlights: JSON.stringify(tour.highlights || [], null, 2),
      itinerary: JSON.stringify(tour.itinerary || [], null, 2),
      included: JSON.stringify(tour.included || [], null, 2),
      excluded: JSON.stringify(tour.excluded || [], null, 2),
      notes: JSON.stringify(tour.notes || [], null, 2),
      video_url: tour.video_url || '',
      status: tour.status || 'active',
      supplier_name: tour.supplier_name || '',
      supplier_code: tour.supplier_code || '',
      commission_total: String(tour.commission_total || ''),
      commission_ctv: String(tour.commission_ctv || ''),
      commission_mvip: String(tour.commission_mvip || ''),
    });
  }

  async function handleDelete(tour) {
    const ok = window.confirm(`Xóa tour "${tour.title}"?`);
    if (!ok) return;

    try {
      await deleteTour(tour.id);
      await loadTours();
      if (editingId === tour.id) resetForm();
      alert('Đã xóa tour.');
    } catch (error) {
      console.error(error);
      alert(error?.message || 'Xóa tour thất bại.');
    }
  }

  const formTitle = useMemo(
    () => (editingId ? 'Sửa tour' : 'Thêm tour'),
    [editingId],
  );

  return (
    <div className="grid gap-6 xl:grid-cols-[420px_minmax(0,1fr)]">
      <div className="rounded-3xl border border-[#eadfce] bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-2xl font-black text-[#714b1f]">{formTitle}</h3>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-xl border border-[#d8c4a3] px-4 py-2 text-sm font-bold text-[#8b5a22]"
            >
              Tạo mới
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="grid gap-3">
          <input
            value={form.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="Tên tour"
            className="rounded-2xl border border-[#dcc7a6] px-4 py-3"
          />

          <input
            value={form.slug}
            onChange={(e) => handleChange('slug', e.target.value)}
            placeholder="Slug"
            className="rounded-2xl border border-[#dcc7a6] px-4 py-3"
          />

          <input
            value={form.category}
            onChange={(e) => handleChange('category', e.target.value)}
            placeholder="Danh mục"
            className="rounded-2xl border border-[#dcc7a6] px-4 py-3"
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              value={form.duration}
              onChange={(e) => handleChange('duration', e.target.value)}
              placeholder="Thời lượng"
              className="rounded-2xl border border-[#dcc7a6] px-4 py-3"
            />
            <input
              value={form.price}
              onChange={(e) => handleChange('price', e.target.value)}
              placeholder="Giá bán"
              className="rounded-2xl border border-[#dcc7a6] px-4 py-3"
            />
          </div>

          <textarea
            value={form.departure}
            onChange={(e) => handleChange('departure', e.target.value)}
            placeholder="Lịch khởi hành"
            className="min-h-[90px] rounded-2xl border border-[#dcc7a6] px-4 py-3"
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              value={form.transport}
              onChange={(e) => handleChange('transport', e.target.value)}
              placeholder="Phương tiện"
              className="rounded-2xl border border-[#dcc7a6] px-4 py-3"
            />
            <input
              value={form.hotel}
              onChange={(e) => handleChange('hotel', e.target.value)}
              placeholder="Tiêu chuẩn khách sạn"
              className="rounded-2xl border border-[#dcc7a6] px-4 py-3"
            />
          </div>

          <input
            value={form.image}
            onChange={(e) => handleChange('image', e.target.value)}
            placeholder="Ảnh đại diện"
            className="rounded-2xl border border-[#dcc7a6] px-4 py-3"
          />

          <textarea
            value={form.gallery}
            onChange={(e) => handleChange('gallery', e.target.value)}
            placeholder='Gallery JSON ["url1","url2"]'
            className="min-h-[90px] rounded-2xl border border-[#dcc7a6] px-4 py-3"
          />

          <textarea
            value={form.short_description}
            onChange={(e) => handleChange('short_description', e.target.value)}
            placeholder="Mô tả ngắn"
            className="min-h-[80px] rounded-2xl border border-[#dcc7a6] px-4 py-3"
          />

          <textarea
            value={form.overview}
            onChange={(e) => handleChange('overview', e.target.value)}
            placeholder="Tổng quan"
            className="min-h-[110px] rounded-2xl border border-[#dcc7a6] px-4 py-3"
          />

          <textarea
            value={form.highlights}
            onChange={(e) => handleChange('highlights', e.target.value)}
            placeholder='Highlights JSON ["..."]'
            className="min-h-[90px] rounded-2xl border border-[#dcc7a6] px-4 py-3"
          />

          <textarea
            value={form.itinerary}
            onChange={(e) => handleChange('itinerary', e.target.value)}
            placeholder='Itinerary JSON [{ "day":"Ngày 1", "title":"...", "description":"..." }]'
            className="min-h-[120px] rounded-2xl border border-[#dcc7a6] px-4 py-3"
          />

          <textarea
            value={form.included}
            onChange={(e) => handleChange('included', e.target.value)}
            placeholder='Bao gồm JSON ["..."]'
            className="min-h-[90px] rounded-2xl border border-[#dcc7a6] px-4 py-3"
          />

          <textarea
            value={form.excluded}
            onChange={(e) => handleChange('excluded', e.target.value)}
            placeholder='Không bao gồm JSON ["..."]'
            className="min-h-[90px] rounded-2xl border border-[#dcc7a6] px-4 py-3"
          />

          <textarea
            value={form.notes}
            onChange={(e) => handleChange('notes', e.target.value)}
            placeholder='Lưu ý JSON ["..."]'
            className="min-h-[90px] rounded-2xl border border-[#dcc7a6] px-4 py-3"
          />

          <input
            value={form.video_url}
            onChange={(e) => handleChange('video_url', e.target.value)}
            placeholder="Video URL"
            className="rounded-2xl border border-[#dcc7a6] px-4 py-3"
          />

          <div className="mt-2 rounded-2xl border border-[#eadfce] bg-[#fcfaf5] p-4">
            <div className="mb-3 text-sm font-black uppercase tracking-[0.08em] text-[#8b5a22]">
              Nhà cung cấp & Hoa hồng
            </div>

            <div className="grid gap-3">
              <input
                value={form.supplier_name}
                onChange={(e) => handleChange('supplier_name', e.target.value)}
                placeholder="Nhà cung cấp"
                className="rounded-2xl border border-[#dcc7a6] px-4 py-3"
              />

              <input
                value={form.supplier_code}
                onChange={(e) => handleChange('supplier_code', e.target.value)}
                placeholder="Mã nhà cung cấp"
                className="rounded-2xl border border-[#dcc7a6] px-4 py-3"
              />

              <input
                value={form.commission_total}
                onChange={(e) => handleChange('commission_total', e.target.value)}
                placeholder="Hoa hồng tổng"
                className="rounded-2xl border border-[#dcc7a6] px-4 py-3"
              />

              <div className="grid grid-cols-2 gap-3">
                <input
                  value={form.commission_ctv}
                  readOnly
                  placeholder="Hoa hồng CTV"
                  className="rounded-2xl border border-[#e9dcc7] bg-[#f8f4ed] px-4 py-3"
                />
                <input
                  value={form.commission_mvip}
                  readOnly
                  placeholder="Hoa hồng Mvip"
                  className="rounded-2xl border border-[#e9dcc7] bg-[#f8f4ed] px-4 py-3"
                />
              </div>
            </div>
          </div>

          <select
            value={form.status}
            onChange={(e) => handleChange('status', e.target.value)}
            className="rounded-2xl border border-[#dcc7a6] px-4 py-3"
          >
            <option value="active">active</option>
            <option value="inactive">inactive</option>
          </select>

          <button
            type="submit"
            disabled={saving}
            className="mt-2 rounded-2xl bg-[#8b5a22] px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white"
          >
            {saving ? 'Đang lưu...' : editingId ? 'Cập nhật tour' : 'Thêm tour'}
          </button>
        </form>
      </div>

      <div className="rounded-3xl border border-[#eadfce] bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-2xl font-black text-[#714b1f]">Danh sách tour</h3>

        {loading ? (
          <div className="text-[#6b5840]">Đang tải...</div>
        ) : (
          <div className="grid gap-3">
            {tours.map((tour) => (
              <div
                key={tour.id}
                className="rounded-2xl border border-[#eadfce] bg-[#fcfaf5] p-4"
              >
                <div className="text-lg font-black text-[#6f4817]">{tour.title}</div>
                <div className="mt-1 text-sm text-[#6b5840]">{tour.slug}</div>

                <div className="mt-3 grid gap-1 text-sm text-[#6b5840]">
                  <div>Giá: {tour.price || 'Liên hệ'}</div>
                  <div>Nhà cung cấp: {tour.supplier_name || '-'}</div>
                  <div>HH tổng: {(tour.commission_total || 0).toLocaleString('vi-VN')}đ</div>
                  <div>HH CTV: {(tour.commission_ctv || 0).toLocaleString('vi-VN')}đ</div>
                  <div>HH Mvip: {(tour.commission_mvip || 0).toLocaleString('vi-VN')}đ</div>
                </div>

                <div className="mt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => handleEdit(tour)}
                    className="rounded-xl bg-[#8b5a22] px-4 py-2 text-sm font-bold text-white"
                  >
                    Sửa
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(tour)}
                    className="rounded-xl border border-[#d6b88c] px-4 py-2 text-sm font-bold text-[#8b5a22]"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}