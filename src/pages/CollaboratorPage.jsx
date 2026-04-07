import { useEffect, useMemo, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import QRCode from 'qrcode';
import { supabase } from '../lib/supabase';
import { getCurrentSession, getUserRole, signOutUser } from '../lib/auth';

function formatCurrency(value) {
  const numeric = Number(value || 0);
  return `${numeric.toLocaleString('vi-VN')}đ`;
}

function formatDateTime(value) {
  if (!value) return '--';
  return new Date(value).toLocaleString('vi-VN');
}

function parseAmountToNumber(text) {
  const cleaned = String(text || '').replace(/[^0-9]/g, '');
  return cleaned ? Number(cleaned) : 0;
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-[#eadfce] bg-white p-5 shadow-sm">
      <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#a26d1a]">{label}</div>
      <div className="mt-3 text-2xl font-black text-[#714b1f]">{value}</div>
    </div>
  );
}

export default function CollaboratorPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [collaborator, setCollaborator] = useState(null);
  const [dashboard, setDashboard] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [qrUrl, setQrUrl] = useState('');
  const [message, setMessage] = useState('');

  const referralLink = useMemo(() => {
    if (!collaborator?.code) return '';
    return `${window.location.origin}/?ref=${encodeURIComponent(collaborator.code)}`;
  }, [collaborator]);

  useEffect(() => {
    async function loadData() {
      try {
        const session = await getCurrentSession();
        if (!session?.user) {
          navigate('/login', { replace: true });
          return;
        }

        const roleData = await getUserRole(session.user);
        if (!roleData || roleData.role !== 'collaborator') {
          navigate('/login', { replace: true });
          return;
        }

        setProfile(roleData);

        const collaboratorId = roleData.collaboratorUser.collaborator_id;

        const [{ data: collab, error: collabError }, { data: dashRows, error: dashError }] =
          await Promise.all([
            supabase.from('collaborators').select('*').eq('id', collaboratorId).single(),
            supabase.from('collaborator_commission_dashboard').select('*'),
          ]);

        if (collabError) throw collabError;
        if (dashError) throw dashError;

        const { data: bookingRows, error: bookingError } = await supabase
          .from('bookings')
          .select('*')
          .eq('collaborator_code', collab.code)
          .order('created_at', { ascending: false })
          .limit(200);

        if (bookingError) throw bookingError;

        setCollaborator(collab);
        setDashboard((dashRows || []).find((item) => item.code === collab.code) || null);
        setBookings(bookingRows || []);
      } catch (error) {
        console.error(error);
        setMessage(error.message || 'Không tải được dashboard CTV.');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [navigate]);

  useEffect(() => {
    async function buildQr() {
      if (!referralLink) {
        setQrUrl('');
        return;
      }

      const dataUrl = await QRCode.toDataURL(referralLink, {
        width: 260,
        margin: 2,
      });
      setQrUrl(dataUrl);
    }

    buildQr().catch(() => setQrUrl(''));
  }, [referralLink]);

  if (!loading && !profile) {
    return <Navigate to="/login" replace />;
  }

  return (
    <section className="mx-auto max-w-[1280px] px-4 py-10">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#a26d1a]">
            Cộng tác viên
          </div>
          <h1 className="mt-2 text-4xl font-black text-[#714b1f]">Dashboard CTV</h1>
          <p className="mt-3 max-w-3xl text-[15px] leading-8 text-[#5f4a33]">
            Theo dõi link ref, QR, booking đổ về và hoa hồng của riêng anh/chị.
          </p>
        </div>

        <button
          onClick={async () => {
            await signOutUser();
            navigate('/login', { replace: true });
          }}
          className="rounded-2xl border border-[#cfa871] bg-white px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[#8b5a22]"
        >
          Đăng xuất
        </button>
      </div>

      {message && (
        <div className="mb-6 rounded-2xl border border-[#eadfce] bg-[#fff7eb] px-4 py-3 text-sm font-semibold text-[#8b5a22]">
          {message}
        </div>
      )}

      {loading ? (
        <div className="rounded-3xl border border-[#eadfce] bg-white p-6 text-[#6b5840] shadow-sm">
          Đang tải dashboard...
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid gap-6 xl:grid-cols-[380px_1fr]">
            <section className="rounded-3xl border border-[#eadfce] bg-white p-5 shadow-sm">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#a26d1a]">
                Thông tin CTV
              </div>

              <h2 className="mt-2 text-2xl font-black text-[#714b1f]">
                {collaborator?.name || '--'}
              </h2>

              <div className="mt-2 text-sm leading-7 text-[#5f4a33]">
                <div><strong>Mã CTV:</strong> {collaborator?.code || '--'}</div>
                <div><strong>SĐT:</strong> {collaborator?.phone || '--'}</div>
                <div><strong>Email:</strong> {collaborator?.email || '--'}</div>
                <div><strong>% hoa hồng:</strong> {collaborator?.commission_rate || 0}%</div>
              </div>

              <div className="mt-5 rounded-2xl border border-[#eadfce] bg-[#fcfaf5] p-4">
                <div className="text-xs font-bold uppercase tracking-[0.12em] text-[#9b6a27]">
                  Link referral
                </div>
                <div className="mt-2 break-all text-sm leading-7 text-[#5f4a33]">
                  {referralLink}
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={async () => {
                      await navigator.clipboard.writeText(referralLink);
                      setMessage('Đã copy link referral.');
                    }}
                    className="rounded-2xl bg-[#8b5a22] px-4 py-2.5 text-xs font-bold uppercase tracking-[0.08em] text-white"
                  >
                    Copy link
                  </button>
                </div>
              </div>

              {qrUrl && (
                <div className="mt-5 rounded-2xl border border-[#eadfce] bg-[#fcfaf5] p-4">
                  <img
                    src={qrUrl}
                    alt={`QR ${collaborator?.code || ''}`}
                    className="mx-auto h-[260px] w-[260px] rounded-2xl bg-white p-2"
                  />

                  <div className="mt-4 flex justify-center">
                    <a
                      href={qrUrl}
                      download={`mvip-${collaborator?.code || 'ctv'}.png`}
                      className="rounded-2xl bg-[#8b5a22] px-4 py-2.5 text-xs font-bold uppercase tracking-[0.08em] text-white"
                    >
                      Tải QR PNG
                    </a>
                  </div>
                </div>
              )}
            </section>

            <section className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <StatCard label="Tổng booking" value={dashboard?.total_bookings ?? 0} />
                <StatCard label="Booking đã thanh toán" value={dashboard?.paid_bookings ?? 0} />
                <StatCard
                  label="Hoa hồng phải trả"
                  value={formatCurrency(dashboard?.payable_commission ?? 0)}
                />
                <StatCard
                  label="Hoa hồng chưa trả"
                  value={formatCurrency(dashboard?.unpaid_commission ?? 0)}
                />
              </div>

              <div className="rounded-3xl border border-[#eadfce] bg-white p-5 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#a26d1a]">
                  Theo dõi booking
                </div>
                <h2 className="mt-2 text-2xl font-black text-[#714b1f]">
                  Booking của riêng anh/chị
                </h2>

                <div className="mt-5 overflow-x-auto">
                  <table className="min-w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-[#eadfce] text-[#8b5a22]">
                        <th className="px-3 py-3 font-bold">Ngày tạo</th>
                        <th className="px-3 py-3 font-bold">Tour</th>
                        <th className="px-3 py-3 font-bold">Khách</th>
                        <th className="px-3 py-3 font-bold">Tổng tiền</th>
                        <th className="px-3 py-3 font-bold">Hoa hồng</th>
                        <th className="px-3 py-3 font-bold">Thanh toán</th>
                        <th className="px-3 py-3 font-bold">Xử lý</th>
                        <th className="px-3 py-3 font-bold">Trạng thái HH</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((item) => (
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
                            {formatCurrency(parseAmountToNumber(item.total_amount))}
                          </td>
                          <td className="px-3 py-3">{formatCurrency(item.commission_amount || 0)}</td>
                          <td className="px-3 py-3">{item.payment_status || 'pending'}</td>
                          <td className="px-3 py-3">{item.status || 'new'}</td>
                          <td className="px-3 py-3">{item.commission_status || 'unpaid'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </section>
  );
}