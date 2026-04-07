import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentSession, getUserRole } from '../../lib/auth';

export default function ProtectedRoute({ allow, children }) {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    async function checkAccess() {
      try {
        const session = await getCurrentSession();
        if (!session?.user) {
          setAllowed(false);
          return;
        }

        const roleData = await getUserRole(session.user);
        if (!roleData?.role) {
          setAllowed(false);
          return;
        }

        setAllowed(allow.includes(roleData.role));
      } catch (error) {
        console.error(error);
        setAllowed(false);
      } finally {
        setLoading(false);
      }
    }

    checkAccess();
  }, [allow]);

  if (loading) {
    return (
      <section className="mx-auto max-w-[720px] px-4 py-16">
        <div className="rounded-3xl border border-[#eadfce] bg-white p-8 text-[#6b5840] shadow-sm">
          Đang kiểm tra quyền truy cập...
        </div>
      </section>
    );
  }

  if (!allowed) {
    return <Navigate to="/login" replace />;
  }

  return children;
}