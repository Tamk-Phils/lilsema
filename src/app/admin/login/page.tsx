import { Suspense } from 'react';
import AdminLoginForm from './AdminLoginForm';

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <p className="text-slate-400 text-xs font-black tracking-widest uppercase">Loading Portal...</p>
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
