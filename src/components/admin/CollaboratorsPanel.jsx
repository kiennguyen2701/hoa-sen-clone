import { useEffect, useMemo, useState } from 'react';
import QRCode from 'qrcode';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { supabase } from '../../lib/supabase';

const emptyForm = {
  code: '',
  name: '',
  phone: '',
  email: '',
  password: '',
  commission_rate: '0',
  notes: '',
  create_login: true,
};

function formatCurrency(value) {
  const numeric = Number(value || 0);
  return `${numeric.toLocaleString('vi-VN')}đ`;
}

function formatDateTime(value) {
  if (!value) return '--';
  return new Date(value).toLocaleString('vi-VN');
}

function getReferralLink(code) {
  if (!code) return '';
  return `${window.location.origin}/?ref=${encodeURIComponent(code)}`;
}

function parseAmountToNumber(text) {
  const cleaned = String(text || '').replace(/[^0-9]/g, '');
  return cleaned ? Number(cleaned) : 0;
}

function exportRowsToExcel(rows, filename) {
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Commission');
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
  });
  saveAs(blob, filename);
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-[#eadfce] bg-white p-5 shadow-sm">
      <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#a26d1a]">{label}</div>
      <div className="mt-3 text-2xl font-black text-[#714b1f]">{value}</div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="rounded-2xl border border-[#eadfce] bg-[#fcfaf5] p-4">
      <div className="text-xs font-bold uppercase tracking-[0.12em] text-[#a26d1a]">{label}</div>
      <div className="mt-2 text-sm font-semibold leading-7 text-[#5f4a33]">{value}</div>
    </div>
  );
}

export default function CollaboratorsPanel() {
  const [collaborators, setCollaborators] = useState([]);
  const [commissionRows, setCommissionRows] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [qrUrl, setQrUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [form, setForm] = useState(emptyForm);

  const selectedCollaborator = useMemo(
    () => collaborators.find((item) => item.id === selectedId) || null,
    [collaborators, selectedId]
  );

  async function loadData() {
    setLoading(true);
    setMessage('');

    const [collabRes, commissionRes, bookingsRes] = await Promise.all([
      supabase.from('collaborators').select('*').order('created_at', { ascending: false }),
      supabase.from('collaborator_commission_dashboard').select('*').order('unpaid_commission', { ascending: false }),
      supabase.from('bookings').select('*').order('created_at', { ascending: false }).limit(200),
    ]);

    if (collabRes.error) throw collabRes.error;
    if (commissionRes.error) throw commissionRes.error;
    if (bookingsRes.error) throw bookingsRes.error;

    const collabData = collabRes.data || [];
    setCollaborators(collabData);
    setCommissionRows(commissionRes.data || []);
    setBookings(bookingsRes.data || []);
    setSelectedId((prev) => {
      const stillExists = collabData.some((item) => item.id === prev);
      if (stillExists) return prev;
      return collabData[0]?.id || '';
    });
    setLoading(false);
  }

  useEffect(() => {
    loadData().catch((error) => {
      console.error(error);
      setMessage(error.message || 'Không tải được dữ liệu cộng tác viên');
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    async function buildQr() {
      if (!selectedCollaborator?.code) {
        setQrUrl('');
        return;
      }
      const link = getReferralLink(selectedCollaborator.code);
      const dataUrl = await QRCode.toDataURL(link, { width: 260, margin: 2 });
      setQrUrl(dataUrl);
    }
    buildQr().catch(() => setQrUrl(''));
  }, [selectedCollaborator]);

  async function handleCreate(e) {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const payload = {
        code: String(form.code || '').trim().toUpperCase(),
        name: String(form.name || '').trim(),
        phone: String(form.phone || '').trim(),
        email: String(form.email || '').trim().toLowerCase(),
        password: String(form.password || '').trim(),
        commission_rate: Number(form.commission_rate || 0),
        notes: String(form.notes || '').trim(),
      };

      if (!payload.code || !payload.name) {
        throw new Error('Vui lòng nhập mã CTV và tên cộng tác viên.');
      }

      if (form.create_login) {
        if (!payload.email || !payload.password) {
          throw new Error('Vui lòng nhập email và mật khẩu để tạo tài khoản đăng nhập cho CTV.');
        }

        const { data, error } = await supabase.functions.invoke('create-collaborator-account', {
          body: payload,
        });

        if (error) throw error;
        if (data?.error) throw new Error(data.error);

        setForm(emptyForm);
        setMessage(`Đã tạo CTV và tài khoản đăng nhập cho ${payload.code}.`);
        await loadData();
        return;
      }

      const { error } = await supabase.from('collaborators').insert({
        code: payload.code,
        name: payload.name,
        phone: payload.phone || null,
        email: payload.email || null,
        commission_rate: payload.commission_rate,
        notes: payload.notes || null,
      });

      if (error) throw error;

      setForm(emptyForm);
      setMessage('Đã tạo cộng tác viên mới thành công.');
      await loadData();
    } catch (error) {
      console.error(error);
      setMessage(error.message || 'Không tạo được cộng tác viên.');
    } finally {
      setSaving(false);
    }
  }

  async function handleToggleStatus(item) {
    try {
      const { error } = await supabase
        .from('collaborators')
        .update({ is_active: !item.is_active })
        .eq('id', item.id);

      if (error) throw error;

      setMessage(`Đã ${item.is_active ? 'tắt' : 'bật'} cộng tác viên ${item.code}.`);
      await loadData();
    } catch (error) {
      console.error(error);
      setMessage(error.message || 'Cập nhật trạng thái thất bại.');
    }
  }

  async function handleUpdateBookingStatus(id, field, value) {
    try {
      const payload = { [field]: value };
      if (field === 'commission_status' && value === 'paid') {
        payload.paid_commission_at = new Date().toISOString();
      }
      const { error } = await supabase.from('bookings').update(payload).eq('id', id);
      if (error) throw error;
      setMessage('Đã cập nhật trạng thái booking.');
      await loadData();
    } catch (error) {
      console.error(error);
      setMessage(error.message || 'Không cập nhật được booking.');
    }
  }

  function handleExportCommissionDashboard() {
    const rows = commissionRows.map((row) => ({
      'Mã CTV': row.code,
      'Tên CTV': row.name,
      'Số điện thoại': row.phone || '',
      Email: row.email || '',
      '% hoa hồng': Number(row.commission_rate || 0),
      'Tổng booking': Number(row.total_bookings || 0),
      'Booking đã thanh toán': Number(row.paid_bookings || 0),
      'Tổng hoa hồng': Number(row.total_commission || 0),
      'Hoa hồng phải trả': Number(row.payable_commission || 0),
      'Hoa hồng đã trả': Number(row.paid_commission || 0),
      'Hoa hồng chưa trả': Number(row.unpaid_commission || 0),
      'Booking gần nhất': row.last_booking_at ? new Date(row.last_booking_at).toLocaleString('vi-VN') : '',
    }));
    exportRowsToExcel(rows, `mvip-commission-dashboard-${new Date().toISOString().slice(0, 10)}.xlsx`);
    setMessage('Đã xuất file Excel dashboard hoa hồng.');
  }

  function handleExportSelectedCTV() {
    if (!selectedCollaborator) return;

    const rows = bookings
      .filter((item) => String(item.collaborator_code || '').toUpperCase() === String(selectedCollaborator.code || '').toUpperCase())
      .map((item) => ({
        'Mã booking': item.id,
        'Ngày tạo': item.created_at ? new Date(item.created_at).toLocaleString('vi-VN') : '',
        Tour: item.tour_title,
        'Khách hàng': item.customer_name,
        'Số điện thoại': item.phone,
        Email: item.email || '',
        'Ngày khởi hành': item.departure_date || '',
        'Số khách': item.guest_count || item.guest_count_number || '',
        'Tổng tiền': parseAmountToNumber(item.total_amount || 0),
        'Mã CTV': item.collaborator_code || '',
        'Tên CTV': item.collaborator_name || '',
        'Hoa hồng': Number(item.commission_amount || 0),
        'Trạng thái hoa hồng': item.commission_status || 'unpaid',
        'Thanh toán booking': item.payment_status || 'pending',
        'Xử lý booking': item.status || 'new',
      }));

    exportRowsToExcel(
      rows,
      `mvip-${selectedCollaborator.code}-commission-${new Date().toISOString().slice(0, 10)}.xlsx`
    );
    setMessage(`Đã xuất Excel cho CTV ${selectedCollaborator.code}.`);
  }

  const selectedSummary = useMemo(() => {
    if (!selectedCollaborator?.code) return null;
    return commissionRows.find((row) => row.code === selectedCollaborator.code) || null;
  }, [commissionRows, selectedCollaborator]);

  if (loading) {
    return (
      <div className="rounded-3xl border border-[#eadfce] bg-white p-6 shadow-sm">
        <div className="text-[#6b5840]">Đang tải module cộng tác viên...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {message && (
        <div className="rounded-2xl border border-[#eadfce] bg-[#fff7eb] px-4 py-3 text-sm font-semibold text-[#8b5a22]">
          {message}
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
        <section className="rounded-3xl border border-[#eadfce] bg-white p-5 shadow-sm">
          <div className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[#a26d1a]">
            Tạo cộng tác viên
          </div>

          <form onSubmit={handleCreate} className="grid gap-3">
            <input
              value={form.code}
              onChange={(e) => setForm((prev) => ({ ...prev, code: e.target.value }))}
              className="rounded-2xl border border-[#dcc7a6] px-4 py-3 text-sm outline-none"
              placeholder="Mã CTV, ví dụ: CTV001"
            />

            <input
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              className="rounded-2xl border border-[#dcc7a6] px-4 py-3 text-sm outline-none"
              placeholder="Tên cộng tác viên"
            />

            <input
              value={form.phone}
              onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
              className="rounded-2xl border border-[#dcc7a6] px-4 py-3 text-sm outline-none"
              placeholder="Số điện thoại"
            />

            <input
              value={form.email}
              onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
              className="rounded-2xl border border-[#dcc7a6] px-4 py-3 text-sm outline-none"
              placeholder="Email đăng nhập CTV"
            />

            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
              className="rounded-2xl border border-[#dcc7a6] px-4 py-3 text-sm outline-none"
              placeholder="Mật khẩu đăng nhập"
            />

            <label className="flex items-center gap-3 rounded-2xl border border-[#eadfce] bg-[#fcfaf5] px-4 py-3 text-sm font-semibold text-[#5f4a33]">
              <input
                type="checkbox"
                checked={form.create_login}
                onChange={(e) => setForm((prev) => ({ ...prev, create_login: e.target.checked }))}
              />
              Tạo luôn tài khoản đăng nhập cho CTV
            </label>

            <input
              value={form.commission_rate}
              onChange={(e) => setForm((prev) => ({ ...prev, commission_rate: e.target.value }))}
              className="rounded-2xl border border-[#dcc7a6] px-4 py-3 text-sm outline-none"
              placeholder="% hoa hồng"
              type="number"
              min="0"
              step="0.01"
            />

            <textarea
              value={form.notes}
              onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
              className="min-h-[110px] rounded-2xl border border-[#dcc7a6] px-4 py-3 text-sm outline-none"
              placeholder="Ghi chú"
            />

            <button
              type="submit"
              disabled={saving}
              className="rounded-2xl bg-[#8b5a22] px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white"
            >
              {saving ? 'Đang lưu...' : 'Tạo cộng tác viên'}
            </button>
          </form>
        </section>

        <section className="rounded-3xl border border-[#eadfce] bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#a26d1a]">
                Danh sách cộng tác viên
              </div>
              <h2 className="mt-2 text-2xl font-black text-[#714b1f]">CTV đang hoạt động</h2>
            </div>

            <button
              onClick={handleExportCommissionDashboard}
              className="rounded-2xl bg-[#8b5a22] px-4 py-2.5 text-xs font-bold uppercase tracking-[0.08em] text-white"
            >
              Export Excel Dashboard
            </button>
          </div>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {collaborators.map((item) => {
              const active = selectedId === item.id;
              return (
                <div
                  key={item.id}
                  className={`rounded-2xl border p-4 transition ${
                    active ? 'border-[#8b5a22] bg-[#fffaf2]' : 'border-[#eadfce] bg-[#fcfaf5]'
                  }`}
                >
                  <button type="button" className="w-full text-left" onClick={() => setSelectedId(item.id)}>
                    <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#a26d1a]">
                      {item.code}
                    </div>
                    <div className="mt-2 text-lg font-black text-[#714b1f]">{item.name}</div>
                    <div className="mt-2 text-sm leading-7 text-[#5f4a33]">
                      <div>{item.phone || 'Chưa có SĐT'}</div>
                      <div>{item.email || 'Chưa có email'}</div>
                    </div>
                  </button>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        item.is_active ? 'bg-[#e7f6eb] text-[#237a3b]' : 'bg-[#f4e6e6] text-[#9d3b3b]'
                      }`}
                    >
                      {item.is_active ? 'Đang bật' : 'Đang tắt'}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleToggleStatus(item)}
                      className="rounded-xl bg-[#8b5a22] px-3 py-2 text-xs font-bold uppercase tracking-[0.08em] text-white"
                    >
                      {item.is_active ? 'Tắt' : 'Bật'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {selectedCollaborator && (
        <section className="grid gap-6 xl:grid-cols-[380px_1fr]">
          <div className="rounded-3xl border border-[#eadfce] bg-white p-5 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#a26d1a]">
              Link ref & QR code
            </div>

            <h3 className="mt-2 text-2xl font-black text-[#714b1f]">{selectedCollaborator.name}</h3>
            <div className="mt-1 text-sm text-[#6a563f]">Mã CTV: {selectedCollaborator.code}</div>

            <div className="mt-5 rounded-2xl border border-[#eadfce] bg-[#fcfaf5] p-4">
              <div className="text-xs font-bold uppercase tracking-[0.12em] text-[#9b6a27]">
                Link referral
              </div>
              <div className="mt-2 break-all text-sm leading-7 text-[#5f4a33]">
                {getReferralLink(selectedCollaborator.code)}
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={async () => {
                    await navigator.clipboard.writeText(getReferralLink(selectedCollaborator.code));
                    setMessage('Đã copy link referral.');
                  }}
                  className="rounded-2xl bg-[#8b5a22] px-4 py-2.5 text-xs font-bold uppercase tracking-[0.08em] text-white"
                >
                  Copy link
                </button>

                <button
                  type="button"
                  onClick={async () => {
                    await navigator.clipboard.writeText(selectedCollaborator.code);
                    setMessage('Đã copy mã cộng tác viên.');
                  }}
                  className="rounded-2xl border border-[#cfa871] bg-white px-4 py-2.5 text-xs font-bold uppercase tracking-[0.08em] text-[#8b5a22]"
                >
                  Copy mã CTV
                </button>
              </div>
            </div>

            {qrUrl && (
              <div className="mt-5 rounded-2xl border border-[#eadfce] bg-[#fcfaf5] p-4">
                <img
                  src={qrUrl}
                  alt={`QR ${selectedCollaborator.code}`}
                  className="mx-auto h-[260px] w-[260px] rounded-2xl bg-white p-2"
                />

                <div className="mt-4 flex flex-wrap justify-center gap-3">
                  <a
                    href={qrUrl}
                    download={`mvip-${selectedCollaborator.code}.png`}
                    className="rounded-2xl bg-[#8b5a22] px-4 py-2.5 text-xs font-bold uppercase tracking-[0.08em] text-white"
                  >
                    Tải QR PNG
                  </a>
                </div>
              </div>
            )}

            <div className="mt-5">
              <button
                onClick={handleExportSelectedCTV}
                className="w-full rounded-2xl bg-[#8b5a22] px-4 py-3 text-xs font-bold uppercase tracking-[0.08em] text-white"
              >
                Export Excel CTV này
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <StatCard label="Tổng booking" value={selectedSummary?.total_bookings ?? 0} />
              <StatCard label="Booking đã thanh toán" value={selectedSummary?.paid_bookings ?? 0} />
              <StatCard label="Hoa hồng phải trả" value={formatCurrency(selectedSummary?.payable_commission ?? 0)} />
              <StatCard label="Hoa hồng chưa trả" value={formatCurrency(selectedSummary?.unpaid_commission ?? 0)} />
            </div>

            <div className="rounded-3xl border border-[#eadfce] bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#a26d1a]">
                    Chi tiết CTV
                  </div>
                  <h3 className="mt-2 text-2xl font-black text-[#714b1f]">Thông tin & hoa hồng</h3>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <InfoRow label="Mã CTV" value={selectedCollaborator.code} />
                <InfoRow label="Tên" value={selectedCollaborator.name} />
                <InfoRow label="SĐT" value={selectedCollaborator.phone || '--'} />
                <InfoRow label="Email" value={selectedCollaborator.email || '--'} />
                <InfoRow label="% hoa hồng" value={`${selectedCollaborator.commission_rate || 0}%`} />
                <InfoRow label="Booking gần nhất" value={formatDateTime(selectedSummary?.last_booking_at)} />
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="rounded-3xl border border-[#eadfce] bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#a26d1a]">
              Dashboard hoa hồng
            </div>
            <h2 className="mt-2 text-2xl font-black text-[#714b1f]">Theo cộng tác viên</h2>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#eadfce] text-[#8b5a22]">
                <th className="px-3 py-3 font-bold">Mã</th>
                <th className="px-3 py-3 font-bold">Tên</th>
                <th className="px-3 py-3 font-bold">Tổng booking</th>
                <th className="px-3 py-3 font-bold">Đã thanh toán tour</th>
                <th className="px-3 py-3 font-bold">Tổng hoa hồng</th>
                <th className="px-3 py-3 font-bold">Phải trả</th>
                <th className="px-3 py-3 font-bold">Đã trả</th>
                <th className="px-3 py-3 font-bold">Chưa trả</th>
              </tr>
            </thead>
            <tbody>
              {commissionRows.map((row) => (
                <tr key={row.id} className="border-b border-[#f1e6d5] align-top text-[#5f4a33]">
                  <td className="px-3 py-3 font-bold">{row.code}</td>
                  <td className="px-3 py-3">{row.name}</td>
                  <td className="px-3 py-3">{row.total_bookings}</td>
                  <td className="px-3 py-3">{row.paid_bookings}</td>
                  <td className="px-3 py-3">{formatCurrency(row.total_commission)}</td>
                  <td className="px-3 py-3">{formatCurrency(row.payable_commission)}</td>
                  <td className="px-3 py-3">{formatCurrency(row.paid_commission)}</td>
                  <td className="px-3 py-3 font-bold text-[#b45309]">{formatCurrency(row.unpaid_commission)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-3xl border border-[#eadfce] bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#a26d1a]">
              Booking mới nhất
            </div>
            <h2 className="mt-2 text-2xl font-black text-[#714b1f]">Chi tiết booking + hoa hồng</h2>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#eadfce] text-[#8b5a22]">
                <th className="px-3 py-3 font-bold">Ngày tạo</th>
                <th className="px-3 py-3 font-bold">Tour</th>
                <th className="px-3 py-3 font-bold">Khách</th>
                <th className="px-3 py-3 font-bold">CTV</th>
                <th className="px-3 py-3 font-bold">Tổng tiền</th>
                <th className="px-3 py-3 font-bold">Hoa hồng</th>
                <th className="px-3 py-3 font-bold">Trạng thái HH</th>
                <th className="px-3 py-3 font-bold">Thanh toán tour</th>
                <th className="px-3 py-3 font-bold">Xử lý</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((item) => {
                const amount = parseAmountToNumber(item.total_amount);
                return (
                  <tr key={item.id} className="border-b border-[#f1e6d5] align-top text-[#5f4a33]">
                    <td className="px-3 py-3">{formatDateTime(item.created_at)}</td>
                    <td className="px-3 py-3">
                      <div className="font-semibold text-[#714b1f]">{item.tour_title}</div>
                      <div className="text-xs text-[#8a755c]">{item.departure_date || '--'}</div>
                    </td>
                    <td className="px-3 py-3">
                      <div>{item.customer_name}</div>
                      <div className="text-xs text-[#8a755c]">{item.phone}</div>
                    </td>
                    <td className="px-3 py-3">
                      <div className="font-semibold">{item.collaborator_code || '--'}</div>
                      <div className="text-xs text-[#8a755c]">{item.collaborator_name || '--'}</div>
                    </td>
                    <td className="px-3 py-3">{formatCurrency(amount)}</td>
                    <td className="px-3 py-3">{formatCurrency(item.commission_amount || 0)}</td>
                    <td className="px-3 py-3">
                      <select
                        value={item.commission_status || 'unpaid'}
                        onChange={(e) => handleUpdateBookingStatus(item.id, 'commission_status', e.target.value)}
                        className="rounded-xl border border-[#dcc7a6] bg-white px-3 py-2 text-xs font-semibold outline-none"
                      >
                        <option value="unpaid">unpaid</option>
                        <option value="paid">paid</option>
                      </select>
                    </td>
                    <td className="px-3 py-3">
                      <select
                        value={item.payment_status || 'pending'}
                        onChange={(e) => handleUpdateBookingStatus(item.id, 'payment_status', e.target.value)}
                        className="rounded-xl border border-[#dcc7a6] bg-white px-3 py-2 text-xs font-semibold outline-none"
                      >
                        <option value="pending">pending</option>
                        <option value="paid">paid</option>
                        <option value="cancelled">cancelled</option>
                      </select>
                    </td>
                    <td className="px-3 py-3">
                      <select
                        value={item.status || 'new'}
                        onChange={(e) => handleUpdateBookingStatus(item.id, 'status', e.target.value)}
                        className="rounded-xl border border-[#dcc7a6] bg-white px-3 py-2 text-xs font-semibold outline-none"
                      >
                        <option value="new">new</option>
                        <option value="contacted">contacted</option>
                        <option value="processed">processed</option>
                        <option value="cancelled">cancelled</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}