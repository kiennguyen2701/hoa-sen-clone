import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabase';
import {
  listToursForAdmin,
  createTour,
  updateTour,
  deleteTour,
  uploadTourImage,
} from '../lib/toursApi';
import SiteSettingsPanel from '../components/admin/SiteSettingsPanel';

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
  status: 'active',
};

export default function AdminPage() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tours, setTours] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null);
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session ?? null);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) return;
    refreshTours();
  }, [session]);

  async function refreshTours() {
    const rows = await listToursForAdmin();
    setTours(rows);
  }

  async function handleLogin(e) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  function mapDbTourToForm(tour) {
    return {
      title: tour.title || '',
      slug: tour.slug || '',
      category: tour.category || 'Du lịch quốc tế',
      duration: tour.duration || '',
      departure: tour.departure || '',
      transport: tour.transport || '',
      hotel: tour.hotel || '',
      price: tour.price || '',
      image: tour.image || '',
      gallery: (tour.gallery || []).join('\n'),
      short_description: tour.short_description || '',
      overview: tour.overview || '',
      highlights: (tour.highlights || []).join('\n'),
      itinerary: JSON.stringify(tour.itinerary || [], null, 2),
      included: (tour.included || []).join('\n'),
      excluded: (tour.excluded || []).join('\n'),
      notes: (tour.notes || []).join('\n'),
      status: tour.status || 'active',
    };
  }
<SiteSettingsPanel />
  function normalizePayload(raw) {
    return {
      title: raw.title.trim(),
      slug: raw.slug.trim(),
      category: raw.category.trim(),
      duration: raw.duration.trim(),
      departure: raw.departure.trim(),
      transport: raw.transport.trim(),
      hotel: raw.hotel.trim(),
      price: raw.price.trim(),
      image: raw.image.trim(),
      gallery: raw.gallery
        .split('\n')
        .map((x) => x.trim())
        .filter(Boolean),
      short_description: raw.short_description.trim(),
      overview: raw.overview.trim(),
      highlights: raw.highlights
        .split('\n')
        .map((x) => x.trim())
        .filter(Boolean),
      itinerary: raw.itinerary.trim() ? JSON.parse(raw.itinerary) : [],
      included: raw.included
        .split('\n')
        .map((x) => x.trim())
        .filter(Boolean),
      excluded: raw.excluded
        .split('\n')
        .map((x) => x.trim())
        .filter(Boolean),
      notes: raw.notes
        .split('\n')
        .map((x) => x.trim())
        .filter(Boolean),
      status: raw.status,
    };
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setSaving(true);
      const payload = normalizePayload(form);

      if (editingId) {
        await updateTour(editingId, payload);
      } else {
        await createTour(payload);
      }

      setForm(emptyForm);
      setEditingId(null);
      await refreshTours();
      alert('Lưu tour thành công');
    } catch (error) {
      alert(error.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Xóa tour này?')) return;
    try {
      await deleteTour(id);
      await refreshTours();
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadTourImage(file);
      setForm((prev) => ({ ...prev, image: url }));
    } catch (error) {
      alert(error.message);
    }
  }

  const formTitle = useMemo(
    () => (editingId ? 'Chỉnh sửa tour' : 'Thêm tour mới'),
    [editingId]
  );

  if (loading) {
    return <div className="mx-auto max-w-[1180px] px-4 py-10">Đang tải admin...</div>;
  }

  if (!session) {
    return (
      <div className="mx-auto max-w-[520px] px-4 py-16">
        <div className="rounded-3xl border border-[#eadfce] bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-black text-[#714b1f]">Đăng nhập quản trị</h1>
          <form onSubmit={handleLogin} className="mt-6 grid gap-4">
            <input
              className="rounded-2xl border border-[#dcc7a6] px-4 py-3"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="rounded-2xl border border-[#dcc7a6] px-4 py-3"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="rounded-2xl bg-[#8b5a22] px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white">
              Đăng nhập
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1180px] px-4 py-10">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <div className="text-sm font-bold uppercase tracking-[0.22em] text-[#a26d1a]">
            Admin
          </div>
          <h1 className="mt-2 text-3xl font-black text-[#714b1f]">Quản lý tour</h1>
        </div>
        <button
          onClick={handleLogout}
          className="rounded-2xl border border-[#d8b169] px-4 py-3 text-sm font-bold text-[#8b5a22]"
        >
          Đăng xuất
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-[#eadfce] bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black text-[#714b1f]">{formTitle}</h2>

          <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
            <input className="rounded-2xl border border-[#dcc7a6] px-4 py-3" placeholder="Tên tour" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <input className="rounded-2xl border border-[#dcc7a6] px-4 py-3" placeholder="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
            <input className="rounded-2xl border border-[#dcc7a6] px-4 py-3" placeholder="Danh mục" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            <div className="grid gap-4 md:grid-cols-2">
              <input className="rounded-2xl border border-[#dcc7a6] px-4 py-3" placeholder="Thời lượng" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} />
              <input className="rounded-2xl border border-[#dcc7a6] px-4 py-3" placeholder="Ngày khởi hành" value={form.departure} onChange={(e) => setForm({ ...form, departure: e.target.value })} />
              <input className="rounded-2xl border border-[#dcc7a6] px-4 py-3" placeholder="Phương tiện" value={form.transport} onChange={(e) => setForm({ ...form, transport: e.target.value })} />
              <input className="rounded-2xl border border-[#dcc7a6] px-4 py-3" placeholder="Khách sạn" value={form.hotel} onChange={(e) => setForm({ ...form, hotel: e.target.value })} />
            </div>
            <input className="rounded-2xl border border-[#dcc7a6] px-4 py-3" placeholder="Giá" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
            <input className="rounded-2xl border border-[#dcc7a6] px-4 py-3" placeholder="Ảnh đại diện URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
            <input type="file" accept="image/*" onChange={handleUpload} className="rounded-2xl border border-[#dcc7a6] px-4 py-3" />
            <textarea className="min-h-[100px] rounded-2xl border border-[#dcc7a6] px-4 py-3" placeholder="Gallery URLs, mỗi dòng 1 link" value={form.gallery} onChange={(e) => setForm({ ...form, gallery: e.target.value })} />
            <textarea className="min-h-[100px] rounded-2xl border border-[#dcc7a6] px-4 py-3" placeholder="Mô tả ngắn" value={form.short_description} onChange={(e) => setForm({ ...form, short_description: e.target.value })} />
            <textarea className="min-h-[120px] rounded-2xl border border-[#dcc7a6] px-4 py-3" placeholder="Tổng quan" value={form.overview} onChange={(e) => setForm({ ...form, overview: e.target.value })} />
            <textarea className="min-h-[100px] rounded-2xl border border-[#dcc7a6] px-4 py-3" placeholder="Highlights, mỗi dòng 1 ý" value={form.highlights} onChange={(e) => setForm({ ...form, highlights: e.target.value })} />
            <textarea className="min-h-[140px] rounded-2xl border border-[#dcc7a6] px-4 py-3 font-mono text-sm" placeholder='Itinerary JSON, ví dụ [{"day":"Ngày 1","title":"...","description":"..."}]' value={form.itinerary} onChange={(e) => setForm({ ...form, itinerary: e.target.value })} />
            <textarea className="min-h-[100px] rounded-2xl border border-[#dcc7a6] px-4 py-3" placeholder="Bao gồm, mỗi dòng 1 ý" value={form.included} onChange={(e) => setForm({ ...form, included: e.target.value })} />
            <textarea className="min-h-[100px] rounded-2xl border border-[#dcc7a6] px-4 py-3" placeholder="Không bao gồm, mỗi dòng 1 ý" value={form.excluded} onChange={(e) => setForm({ ...form, excluded: e.target.value })} />
            <textarea className="min-h-[100px] rounded-2xl border border-[#dcc7a6] px-4 py-3" placeholder="Lưu ý, mỗi dòng 1 ý" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
            <select className="rounded-2xl border border-[#dcc7a6] px-4 py-3" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option value="active">active</option>
              <option value="draft">draft</option>
            </select>

            <div className="flex gap-3">
              <button disabled={saving} className="rounded-2xl bg-[#8b5a22] px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white">
                {saving ? 'Đang lưu...' : 'Lưu tour'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setForm(emptyForm);
                  setEditingId(null);
                }}
                className="rounded-2xl border border-[#d8b169] px-5 py-3 text-sm font-bold text-[#8b5a22]"
              >
                Làm mới
              </button>
            </div>
          </form>
        </div>

        <div className="rounded-3xl border border-[#eadfce] bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black text-[#714b1f]">Danh sách tour</h2>
          <div className="mt-5 space-y-4">
            {tours.map((tour) => (
              <div key={tour.id} className="rounded-2xl border border-[#eadfce] p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.12em] text-[#a26d1a]">
                      {tour.category}
                    </div>
                    <div className="mt-1 text-lg font-black text-[#6f4817]">{tour.title}</div>
                    <div className="mt-1 text-sm text-[#65543e]">/{tour.slug}</div>
                  </div>
                  <div className="rounded-full bg-[#fcfaf5] px-3 py-1 text-xs font-bold uppercase text-[#8b5a22]">
                    {tour.status}
                  </div>
                </div>

                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => {
                      setEditingId(tour.id);
                      setForm(mapDbTourToForm(tour));
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="rounded-xl border border-[#d8b169] px-4 py-2 text-sm font-bold text-[#8b5a22]"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(tour.id)}
                    className="rounded-xl bg-red-600 px-4 py-2 text-sm font-bold text-white"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}