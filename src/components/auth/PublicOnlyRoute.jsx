import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentSession, getUserRole } from '../../lib/auth';

export default function PublicOnlyRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [redirectTo, setRedirectTo] = useState(null);

  useEffect(() => {
    async function checkSession() {
      try {
        const session = await getCurrentSession();
        if (!session?.user) {
          setRedirectTo(null);
          return;
        }

        const roleData = await getUserRole(session.user);
        if (roleData?.role === 'admin') {
          setRedirectTo('/admin');
          return;
        }

        if (roleData?.role === 'collaborator') {
          setRedirectTo('/ctv');
          return;
        }

        setRedirectTo(null);
      } catch (error) {
        console.error(error);
        setRedirectTo(null);
      } finally {
        setLoading(false);
      }
    }

    checkSession();
  }, []);

  if (loading) {
    return (
      <section className="mx-auto max-w-[720px] px-4 py-16">
        <div className="rounded-3xl border border-[#eadfce] bg-white p-8 text-[#6b5840] shadow-sm">
          Đang kiểm tra đăng nhập...
        </div>
      </section>
    );
  }

  if (redirectTo) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}