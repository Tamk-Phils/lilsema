import { Suspense } from 'react';
import AdminLoginForm from './AdminLoginForm';

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <p className="text-white/30 text-xs font-black tracking-widest uppercase">Loading...</p>
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
