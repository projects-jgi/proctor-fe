"use client";

import { useProctor } from '@/contexts/ProctorContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function Home() {
  const { currentUser } = useProctor();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
    } else {
      // Redirect based on user role
      switch (currentUser.role) {
        case 'student':
          router.push('/student/dashboard');
          break;
        case 'faculty':
          router.push('/faculty/dashboard');
          break;
        case 'department':
          router.push('/department/dashboard');
          break;
        case 'campus':
          router.push('/campus/dashboard');
          break;
        case 'admin':
          router.push('/admin/dashboard');
          break;
        default:
          router.push('/login');
      }
    }
  }, [currentUser, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Redirecting...</p>
      </div>
    </div>
  );
}

export default Home;

// Force dynamic rendering
export const dynamic = 'force-dynamic';