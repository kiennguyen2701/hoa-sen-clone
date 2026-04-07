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
  gallery: '',
  short_description: '',
  overview: '',
  highlights: '',
  itinerary: '',
  included: '',
  excluded: '',
  notes: '',
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

function parseLineArray(text) {
  return String(text || '')
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseGalleryLines(text) {
  return parseLineArray(text);
}

function formatLineArray(value) {
  if (Array.isArray(value)) return value.join('\n');
  return '';
}

function formatNumberInput(value) {
  return String(value || '').replace(/[^\d]/g, '');
}

function formatMoney(value) {
  const num = Number(value || 0);
  if (!num) return '0đ';
  return `${num.toLocaleString('vi-VN')}đ`;
}

export default function TourAdminPanel() {
  const [tours, setTours] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [keyword, setKeyword] = useState('');

  async function loadTours() {
    try {
      setLoading(true);
      const rows = await listTours();
      setTours(rows || []);
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
        gallery: parseGalleryLines(form.gallery),
        short_description: form.short_description.trim(),
        overview: form.overview.trim(),
        highlights: parseLineArray(form.highlights),
        itinerary: parseLineArray(form.itinerary),
        included: parseLineArray(form.included),
        excluded: parseLineArray(form.excluded),
        notes: parseLineArray(form.notes),
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
      gallery: formatLineArray(tour.gallery),
      short_description: tour.short_description || '',
      overview: tour.overview || '',
      highlights: formatLineArray(tour.highlights),
      itinerary: formatLineArray(tour.itinerary),
      included: formatLineArray(tour.included),
      excluded: formatLineArray(tour.excluded),
      notes: formatLineArray(tour.notes),
      video_url: tour.video_url || '',
      status: tour.status || 'active',
      supplier_name: tour.supplier_name || '',
      supplier_code: tour.supplier_code || '',
      commission_total: String(tour.commission_total || ''),
      commission_ctv: String(tour.commission_ctv || ''),
      commission_mvip: String(tour.commission_mvip || ''),
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  const filteredTours = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    if (!q) return tours;

    return tours.filter((tour) => {
      return (
        String(tour.title || '').toLowerCase().includes(q) ||
        String(tour.slug || '').toLowerCase().includes(q) ||
        String(tour.category || '').toLowerCase().includes(q) ||
        String(tour.supplier_name || '').toLowerCase().includes(q)
      );
    });
  }, [tours, keyword]);

  return (
    <div className="grid gap-6">
      <div className="rounded-[28px] border border-[#eadfce] bg-white p-5 shadow-sm md:p-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#a26d1a]">
              Quản lý tour
            </div>
            <h3 className="mt-1 text-2xl font-black text-[#714b1f]">
              {editingId ? 'Sửa tour' : 'Thêm tour mới'}
            </h3>
          </div>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-2xl border border-[#d8c4a3] px-4 py-2 text-sm font-bold text-[#8b5a22]"
            >
              Tạo tour mới
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
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
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <input
              value={form.category}
              onChange={(e) => handleChange('category', e.target.value)}
              placeholder="Danh mục"
              className="rounded-2xl border border-[#dcc7a6] px-4 py-3"
            />
            <input
              value={form.duration}
              onChange={(e) => handleChange('duration', e.target.value)}
              placeholder="Thời lượng"
              className="rounded-2xl border border-[#dcc7a6] px-4 py-3"
            />
            <input
              value={form.transport}
              onChange={(e) => handleChange('transport', e.target.value)}
              placeholder="Phương tiện"
              className="rounded-2xl border border-[#dcc7a6] px-4 py-3"
            />
            <input
              value={form.hotel}
              onChange={(e) => handleChange('hotel', e.target.value)}
              placeholder="Tiêu chuẩn KS"
              className="rounded-2xl border border-[#dcc7a6] px-4 py-3"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <input
              value={form.price}
              onChange={(e) => handleChange('price', e.target.value)}
              placeholder="Giá bán"
              className="rounded-2xl border border-[#dcc7a6] px-4 py-3"
            />
            <select
              value={form.status}
              onChange={(e) => handleChange('status', e.target.value)}
              className="rounded-2xl border border-[#dcc7a6] px-4 py-3"
            >
              <option value="active">active</option>
              <option value="inactive">inactive</option>
            </select>
          </div>

          <textarea
            value={form.departure}
            onChange={(e) => handleChange('departure', e.target.value)}
            placeholder="Lịch khởi hành"
            className="min-h-[90px] rounded-2xl border border-[#dcc7a6] px-4 py-3"
          />

          <div className="rounded-2xl border border-[#eadfce] bg-[#fcfaf5] p-4">
            <div className="mb-3 text-sm font-black uppercase tracking-[0.08em] text-[#8b5a22]">
              Ảnh tour
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <input
                value={form.image}
                onChange={(e) => handleChange('image', e.target.value)}
                placeholder="Ảnh đại diện"
                className="rounded-2xl border border-[#dcc7a6] px-4 py-3"
              />

              <input
                value={form.video_url}
                onChange={(e) => handleChange('video_url', e.target.value)}
                placeholder="Video URL"
                className="rounded-2xl border border-[#dcc7a6] px-4 py-3"
              />
            </div>

            <textarea
              value={form.gallery}
              onChange={(e) => handleChange('gallery', e.target.value)}
              placeholder={`Gallery ảnh - mỗi link 1 dòng\nhttps://...\nhttps://...\nhttps://...`}
              className="mt-4 min-h-[120px] rounded-2xl border border-[#dcc7a6] px-4 py-3"
            />
          </div>

          <div className="rounded-2xl border border-[#eadfce] bg-[#fcfaf5] p-4">
            <div className="mb-3 text-sm font-black uppercase tracking-[0.08em] text-[#8b5a22]">
              Nhà cung cấp & Hoa hồng
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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

              <div className="grid grid-cols-2 gap-3 md:col-span-2 lg:col-span-1">
                <input
                  value={form.commission_ctv}
                  readOnly
                  placeholder="CTV"
                  className="rounded-2xl border border-[#e9dcc7] bg-[#f8f4ed] px-4 py-3"
                />
                <input
                  value={form.commission_mvip}
                  readOnly
                  placeholder="Mvip"
                  className="rounded-2xl border border-[#e9dcc7] bg-[#f8f4ed] px-4 py-3"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <textarea
              value={form.short_description}
              onChange={(e) => handleChange('short_description', e.target.value)}
              placeholder="Mô tả ngắn"
              className="min-h-[100px] rounded-2xl border border-[#dcc7a6] px-4 py-3"
            />

            <textarea
              value={form.overview}
              onChange={(e) => handleChange('overview', e.target.value)}
              placeholder="Tổng quan"
              className="min-h-[100px] rounded-2xl border border-[#dcc7a6] px-4 py-3"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <textarea
              value={form.highlights}
              onChange={(e) => handleChange('highlights', e.target.value)}
              placeholder={`Highlights - mỗi dòng 1 ý\nCheck in...\nThưởng thức...\nKhám phá...`}
              className="min-h-[140px] rounded-2xl border border-[#dcc7a6] px-4 py-3"
            />

            <textarea
              value={form.itinerary}
              onChange={(e) => handleChange('itinerary', e.target.value)}
              placeholder={`Lịch trình - tạm mỗi dòng 1 mục\nNgày 1: ...\nNgày 2: ...\nNgày 3: ...`}
              className="min-h-[140px] rounded-2xl border border-[#dcc7a6] px-4 py-3"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <textarea
              value={form.included}
              onChange={(e) => handleChange('included', e.target.value)}
              placeholder={`Bao gồm - mỗi dòng 1 ý\nVé máy bay...\nKhách sạn...\nĂn uống...`}
              className="min-h-[140px] rounded-2xl border border-[#dcc7a6] px-4 py-3"
            />

            <textarea
              value={form.excluded}
              onChange={(e) => handleChange('excluded', e.target.value)}
              placeholder={`Không bao gồm - mỗi dòng 1 ý\nTip...\nChi phí cá nhân...`}
              className="min-h-[140px] rounded-2xl border border-[#dcc7a6] px-4 py-3"
            />

            <textarea
              value={form.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder={`Lưu ý - mỗi dòng 1 ý\nThứ tự có thể thay đổi...\nKhách mang thai...`}
              className="min-h-[140px] rounded-2xl border border-[#dcc7a6] px-4 py-3"
            />
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="rounded-2xl bg-[#8b5a22] px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white"
            >
              {saving ? 'Đang lưu...' : editingId ? 'Cập nhật tour' : 'Thêm tour'}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-2xl border border-[#d8c4a3] px-6 py-3 text-sm font-bold text-[#8b5a22]"
              >
                Hủy sửa
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="rounded-[28px] border border-[#eadfce] bg-white p-5 shadow-sm md:p-6">
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#a26d1a]">
              Danh sách tour
            </div>
            <h3 className="mt-1 text-2xl font-black text-[#714b1f]">
              Tổng: {filteredTours.length} tour
            </h3>
          </div>

          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Tìm theo tên tour, slug, NCC..."
            className="w-full rounded-2xl border border-[#dcc7a6] px-4 py-3 md:max-w-[360px]"
          />
        </div>

        {loading ? (
          <div className="text-[#6b5840]">Đang tải...</div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-[#eadfce]">
            <table className="min-w-[1200px] w-full border-collapse">
              <thead className="bg-[#fcfaf5]">
                <tr className="text-left text-sm text-[#8b5a22]">
                  <th className="px-4 py-3 font-bold">Tên tour</th>
                  <th className="px-4 py-3 font-bold">Danh mục</th>
                  <th className="px-4 py-3 font-bold">Giá</th>
                  <th className="px-4 py-3 font-bold">NCC</th>
                  <th className="px-4 py-3 font-bold">HH tổng</th>
                  <th className="px-4 py-3 font-bold">CTV</th>
                  <th className="px-4 py-3 font-bold">Mvip</th>
                  <th className="px-4 py-3 font-bold">Trạng thái</th>
                  <th className="px-4 py-3 font-bold">Thao tác</th>
                </tr>
              </thead>

              <tbody>
                {filteredTours.map((tour) => {
                  const active = editingId === tour.id;

                  return (
                    <tr
                      key={tour.id}
                      className={`border-t border-[#f0e5d4] ${
                        active ? 'bg-[#fff9f0]' : 'bg-white'
                      }`}
                    >
                      <td className="px-4 py-3 align-top">
                        <div className="max-w-[320px]">
                          <div className="font-black text-[#5f3b16]">{tour.title}</div>
                          <div className="mt-1 text-xs text-[#7a6853]">{tour.slug}</div>
                        </div>
                      </td>

                      <td className="px-4 py-3 text-sm text-[#6b5840]">{tour.category || '-'}</td>
                      <td className="px-4 py-3 text-sm text-[#6b5840]">{tour.price || '-'}</td>
                      <td className="px-4 py-3 text-sm text-[#6b5840]">{tour.supplier_name || '-'}</td>
                      <td className="px-4 py-3 text-sm text-[#6b5840]">
                        {formatMoney(tour.commission_total)}
                      </td>
                      <td className="px-4 py-3 text-sm text-[#6b5840]">
                        {formatMoney(tour.commission_ctv)}
                      </td>
                      <td className="px-4 py-3 text-sm text-[#6b5840]">
                        {formatMoney(tour.commission_mvip)}
                      </td>
                      <td className="px-4 py-3 text-sm text-[#6b5840]">{tour.status || '-'}</td>

                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleEdit(tour)}
                            className={`rounded-xl px-4 py-2 text-sm font-bold ${
                              active
                                ? 'bg-[#6f4817] text-white'
                                : 'bg-[#8b5a22] text-white'
                            }`}
                          >
                            {active ? 'Đang sửa' : 'Sửa'}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(tour)}
                            className="rounded-xl border border-[#d6b88c] px-4 py-2 text-sm font-bold text-[#8b5a22]"
                          >
                            Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {!filteredTours.length && (
                  <tr>
                    <td colSpan="9" className="px-4 py-8 text-center text-[#6b5840]">
                      Chưa có tour nào.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}