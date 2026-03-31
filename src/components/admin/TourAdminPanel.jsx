import { useEffect, useMemo, useState } from 'react';
import {
  listToursForAdmin,
  createTour,
  updateTour,
  deleteTour,
} from '../../lib/toursApi';

const tabs = [
  { key: 'list', label: 'Danh sách tour' },
  { key: 'editor', label: 'Thêm / sửa tour' },
  { key: 'guide', label: 'Hướng dẫn nhập liệu' },
];

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
  galleryText: '',
  short_description: '',
  overview: '',
  highlightsText: '',
  includedText: '',
  excludedText: '',
  notesText: '',
  itineraryText: '',
  status: 'active',
  video_url: '',
};

function textToArray(value) {
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
}

function itineraryTextToJson(value) {
  const lines = value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);

  return lines.map((line, index) => {
    const parts = line.split('|').map((p) => p.trim());
    return {
      day: parts[0] || `Ngày ${index + 1}`,
      title: parts[1] || '',
      description: parts[2] || '',
    };
  });
}

function jsonToTextArray(value) {
  if (!Array.isArray(value)) return '';
  return value.join('\n');
}

function jsonToItineraryText(value) {
  if (!Array.isArray(value)) return '';
  return value
    .map((item) => `${item.day || ''} | ${item.title || ''} | ${item.description || ''}`)
    .join('\n');
}

export default function TourAdminPanel() {
  const [activeTab, setActiveTab] = useState('list');
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingTourId, setEditingTourId] = useState(null);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState(emptyForm);

  async function loadTours() {
    try {
      setLoading(true);
      const data = await listToursForAdmin();
      setTours(data || []);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTours();
  }, []);

  const filteredTours = useMemo(() => {
    const keyword = search.toLowerCase().trim();
    if (!keyword) return tours;

    return tours.filter((tour) => {
      const title = (tour.title || '').toLowerCase();
      const slug = (tour.slug || '').toLowerCase();
      const category = (tour.category || '').toLowerCase();
      return (
        title.includes(keyword) ||
        slug.includes(keyword) ||
        category.includes(keyword)
      );
    });
  }, [tours, search]);

  function handleChange(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingTourId(null);
  }

  function handleEdit(tour) {
    setEditingTourId(tour.id);
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
      galleryText: jsonToTextArray(tour.gallery),
      video_url: tour.video_url || '',
      short_description: tour.short_description || '',
      overview: tour.overview || '',
      highlightsText: jsonToTextArray(tour.highlights),
      includedText: jsonToTextArray(tour.included),
      excludedText: jsonToTextArray(tour.excluded),
      notesText: jsonToTextArray(tour.notes),
      itineraryText: jsonToItineraryText(tour.itinerary),
      status: tour.status || 'active',
    });

    setActiveTab('editor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleDelete(tour) {
    const confirmed = window.confirm(`Xóa tour "${tour.title}"?`);
    if (!confirmed) return;

    try {
      await deleteTour(tour.id);
      await loadTours();
      if (editingTourId === tour.id) resetForm();
      alert('Đã xóa tour');
    } catch (error) {
      alert(error.message);
    }
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
        gallery: textToArray(form.galleryText),
        video_url: form.video_url?.trim() || null,
        short_description: form.short_description.trim(),
        overview: form.overview.trim(),
        highlights: textToArray(form.highlightsText),
        included: textToArray(form.includedText),
        excluded: textToArray(form.excludedText),
        notes: textToArray(form.notesText),
        itinerary: itineraryTextToJson(form.itineraryText),
        status: form.status,
      };

      if (!payload.title || !payload.slug) {
        alert('Anh cần nhập ít nhất Tên tour và Slug');
        return;
      }

      if (editingTourId) {
        await updateTour(editingTourId, payload);
        alert('Cập nhật tour thành công');
      } else {
        await createTour(payload);
        alert('Thêm tour thành công');
      }

      resetForm();
      await loadTours();
      setActiveTab('list');
    } catch (error) {
      alert(error.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-[#eadfce] bg-white p-6 shadow-sm">
        <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#a26d1a]">
          Module
        </div>
        <h2 className="mt-2 text-2xl font-black text-[#714b1f]">Quản lý tour</h2>
        <p className="mt-2 text-[15px] leading-8 text-[#5f4a33]">
          Quản lý toàn bộ tour, thêm mới, chỉnh sửa nội dung và tối ưu dữ liệu hiển thị.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-2xl px-4 py-3 text-sm font-bold transition ${
                activeTab === tab.key
                  ? 'bg-[#8b5a22] text-white'
                  : 'bg-[#fcfaf5] text-[#714b1f] hover:bg-[#f3e6cf]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'list' && (
        <div className="rounded-3xl border border-[#eadfce] bg-white p-6 shadow-sm">
          <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <h3 className="text-xl font-black text-[#714b1f]">Danh sách tour</h3>

            <div className="flex gap-3">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm tour theo tên, slug, category..."
                className="w-full rounded-2xl border border-[#dcc7a6] px-4 py-3 text-sm outline-none lg:w-[320px]"
              />
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setActiveTab('editor');
                }}
                className="rounded-2xl bg-[#8b5a22] px-4 py-3 text-sm font-bold text-white"
              >
                Thêm tour
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="text-sm text-[#6b5840]">Đang tải danh sách tour...</div>
            ) : filteredTours.length === 0 ? (
              <div className="text-sm text-[#6b5840]">Không có tour phù hợp.</div>
            ) : (
              filteredTours.map((tour) => (
                <div
                  key={tour.id}
                  className="rounded-2xl border border-[#eadfce] bg-[#fcfaf5] p-4"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0">
                      <div className="text-xs font-bold uppercase tracking-[0.12em] text-[#a26d1a]">
                        {tour.category || 'Tour'}
                      </div>
                      <div className="mt-1 text-lg font-black text-[#714b1f]">
                        {tour.title}
                      </div>
                      <div className="mt-1 break-all text-sm text-[#6b5840]">/{tour.slug}</div>
                      <div className="mt-2 text-sm text-[#5f4a33]">
                        {tour.duration || 'Chưa có thời lượng'} · {tour.departure || 'Chưa có ngày đi'}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-[#f3e6cf] px-3 py-1 text-[11px] font-bold uppercase text-[#8b5a22]">
                        {tour.status || 'active'}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleEdit(tour)}
                        className="rounded-xl border border-[#d8c2a0] px-4 py-2 text-sm font-bold text-[#714b1f]"
                      >
                        Sửa
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(tour)}
                        className="rounded-xl bg-red-500 px-4 py-2 text-sm font-bold text-white"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === 'editor' && (
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-[#eadfce] bg-white p-6 shadow-sm"
        >
          <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <h3 className="text-xl font-black text-[#714b1f]">
              {editingTourId ? 'Chỉnh sửa tour' : 'Thêm tour mới'}
            </h3>

            <button
              type="button"
              onClick={resetForm}
              className="w-fit rounded-2xl border border-[#d8c2a0] px-4 py-2 text-sm font-bold text-[#714b1f]"
            >
              Reset form
            </button>
          </div>

          <div className="grid gap-4">
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

            <select
              value={form.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="rounded-2xl border border-[#dcc7a6] px-4 py-3"
            >
              <option value="Du lịch quốc tế">Du lịch quốc tế</option>
              <option value="Du lịch trong nước">Du lịch trong nước</option>
            </select>

            <div className="grid gap-4 md:grid-cols-2">
              <input
                value={form.duration}
                onChange={(e) => handleChange('duration', e.target.value)}
                placeholder="Thời lượng"
                className="rounded-2xl border border-[#dcc7a6] px-4 py-3"
              />
              <input
                value={form.departure}
                onChange={(e) => handleChange('departure', e.target.value)}
                placeholder="Ngày khởi hành"
                className="rounded-2xl border border-[#dcc7a6] px-4 py-3"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <input
                value={form.transport}
                onChange={(e) => handleChange('transport', e.target.value)}
                placeholder="Phương tiện"
                className="rounded-2xl border border-[#dcc7a6] px-4 py-3"
              />
              <input
                value={form.hotel}
                onChange={(e) => handleChange('hotel', e.target.value)}
                placeholder="Khách sạn"
                className="rounded-2xl border border-[#dcc7a6] px-4 py-3"
              />
            </div>

            <input
              value={form.price}
              onChange={(e) => handleChange('price', e.target.value)}
              placeholder="Giá"
              className="rounded-2xl border border-[#dcc7a6] px-4 py-3"
            />

            <input
              value={form.image}
              onChange={(e) => handleChange('image', e.target.value)}
              placeholder="Ảnh đại diện URL"
              className="rounded-2xl border border-[#dcc7a6] px-4 py-3"
            />
            <div>
  <label className="mb-2 block text-sm font-bold text-[#6f4817]">
    URL Video
  </label>
  <input
    type="text"
    value={form.video_url || ''}
    onChange={(e) =>
      setForm({ ...form, video_url: e.target.value })
    }
    placeholder="https://www.youtube.com/embed/VIDEO_ID"
    className="w-full rounded-2xl border border-[#dcc7a6] px-4 py-3 outline-none"
  />
</div>

            <textarea
              value={form.galleryText}
              onChange={(e) => handleChange('galleryText', e.target.value)}
              placeholder="Gallery URLs, mỗi dòng 1 link"
              className="min-h-[110px] rounded-2xl border border-[#dcc7a6] px-4 py-3"
            />

            <textarea
              value={form.short_description}
              onChange={(e) => handleChange('short_description', e.target.value)}
              placeholder="Mô tả ngắn"
              className="min-h-[100px] rounded-2xl border border-[#dcc7a6] px-4 py-3"
            />

            <textarea
              value={form.overview}
              onChange={(e) => handleChange('overview', e.target.value)}
              placeholder="Tổng quan tour"
              className="min-h-[140px] rounded-2xl border border-[#dcc7a6] px-4 py-3"
            />

            <textarea
              value={form.highlightsText}
              onChange={(e) => handleChange('highlightsText', e.target.value)}
              placeholder="Điểm nổi bật, mỗi dòng 1 ý"
              className="min-h-[120px] rounded-2xl border border-[#dcc7a6] px-4 py-3"
            />

            <textarea
              value={form.itineraryText}
              onChange={(e) => handleChange('itineraryText', e.target.value)}
              placeholder="Lịch trình: mỗi dòng theo format Ngày 1 | Tiêu đề | Mô tả"
              className="min-h-[180px] rounded-2xl border border-[#dcc7a6] px-4 py-3"
            />

            <div className="grid gap-4 md:grid-cols-2">
              <textarea
                value={form.includedText}
                onChange={(e) => handleChange('includedText', e.target.value)}
                placeholder="Bao gồm, mỗi dòng 1 ý"
                className="min-h-[130px] rounded-2xl border border-[#dcc7a6] px-4 py-3"
              />
              <textarea
                value={form.excludedText}
                onChange={(e) => handleChange('excludedText', e.target.value)}
                placeholder="Không bao gồm, mỗi dòng 1 ý"
                className="min-h-[130px] rounded-2xl border border-[#dcc7a6] px-4 py-3"
              />
            </div>

            <textarea
              value={form.notesText}
              onChange={(e) => handleChange('notesText', e.target.value)}
              placeholder="Lưu ý, mỗi dòng 1 ý"
              className="min-h-[120px] rounded-2xl border border-[#dcc7a6] px-4 py-3"
            />

            <select
              value={form.status}
              onChange={(e) => handleChange('status', e.target.value)}
              className="rounded-2xl border border-[#dcc7a6] px-4 py-3"
            >
              <option value="active">active</option>
              <option value="draft">draft</option>
              <option value="hidden">hidden</option>
            </select>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="rounded-2xl bg-[#8b5a22] px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white"
              >
                {saving ? 'Đang lưu...' : editingTourId ? 'Cập nhật tour' : 'Thêm tour'}
              </button>

              {editingTourId && (
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setActiveTab('list');
                  }}
                  className="rounded-2xl border border-[#d8c2a0] px-6 py-3 text-sm font-bold text-[#714b1f]"
                >
                  Hủy chỉnh sửa
                </button>
              )}
            </div>
          </div>
        </form>
      )}

      {activeTab === 'guide' && (
        <div className="rounded-3xl border border-[#eadfce] bg-white p-6 shadow-sm">
          <h3 className="text-xl font-black text-[#714b1f]">Hướng dẫn nhập liệu tour</h3>

          <div className="mt-5 space-y-5 text-sm leading-7 text-[#5f4a33]">
            <div>
              <div className="font-bold text-[#714b1f]">1. Slug</div>
              <div>Dùng chữ thường, không dấu, ngăn cách bằng dấu gạch ngang.</div>
              <div className="mt-1 rounded-xl bg-[#fcfaf5] px-4 py-3 text-[#714b1f]">
                Ví dụ: <strong>han-quoc-seoul</strong>
              </div>
            </div>

            <div>
              <div className="font-bold text-[#714b1f]">2. Gallery</div>
              <div>Mỗi dòng là 1 URL ảnh.</div>
            </div>

            <div>
              <div className="font-bold text-[#714b1f]">3. Highlights / Included / Excluded / Notes</div>
              <div>Mỗi dòng là 1 ý riêng.</div>
            </div>

            <div>
              <div className="font-bold text-[#714b1f]">4. Itinerary</div>
              <div>Mỗi dòng theo format:</div>
              <div className="mt-1 rounded-xl bg-[#fcfaf5] px-4 py-3 text-[#714b1f]">
                Ngày 1 | Hà Nội - Seoul | Bay đến Seoul, nhận phòng khách sạn
              </div>
            </div>

            <div>
              <div className="font-bold text-[#714b1f]">5. Ảnh đại diện</div>
              <div>Dùng 1 link ảnh chuẩn để hiển thị ở card tour và trang chi tiết.</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}