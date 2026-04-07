import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentSession, getUserRole, signInWithPassword } from '../lib/auth';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function checkSession() {
      try {
        const session = await getCurrentSession();
        if (!session?.user) return;

        const roleData = await getUserRole(session.user);

        if (roleData?.role === 'admin') {
          navigate('/admin', { replace: true });
          return;
        }

        if (roleData?.role === 'collaborator') {
          navigate('/ctv', { replace: true });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setChecking(false);
      }
    }

    checkSession();
  }, [navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const result = await signInWithPassword(email.trim(), password);
      const roleData = await getUserRole(result.user);

      if (!roleData) {
        setMessage('Tài khoản chưa được phân quyền.');
        return;
      }

      if (roleData.role === 'admin') {
        navigate('/admin', { replace: true });
        return;
      }

      if (roleData.role === 'collaborator') {
        navigate('/ctv', { replace: true });
      }
    } catch (error) {
      console.error(error);
      setMessage(error.message || 'Đăng nhập thất bại.');
    } finally {
      setLoading(false);
    }
  }

  if (checking) {
    return (
      <section className="mx-auto max-w-[520px] px-4 py-20">
        <div className="rounded-3xl border border-[#eadfce] bg-white p-8 text-[#6b5840] shadow-sm">
          Đang kiểm tra đăng nhập...
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-[520px] px-4 py-16">
      <div className="rounded-3xl border border-[#eadfce] bg-white p-8 shadow-sm">
        <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#a26d1a]">
          Mvip Travel
        </div>

        <h1 className="mt-3 text-3xl font-black text-[#714b1f]">Đăng nhập hệ thống</h1>

        <p className="mt-3 text-sm leading-7 text-[#5f4a33]">
          Một trang đăng nhập chung cho admin và cộng tác viên. Hệ thống sẽ tự chuyển
          đúng dashboard theo quyền.
        </p>

        {message && (
          <div className="mt-5 rounded-2xl border border-[#eadfce] bg-[#fff7eb] px-4 py-3 text-sm font-semibold text-[#8b5a22]">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          <input
            type="email"value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-2xl border border-[#dcc7a6] px-4 py-3 text-sm outline-none"
            placeholder="Email"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-2xl border border-[#dcc7a6] px-4 py-3 text-sm outline-none"
            placeholder="Mật khẩu"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="rounded-2xl bg-[#8b5a22] px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white"
          >
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>
      </div>
    </section>
  );
}