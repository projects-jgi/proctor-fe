"use client";

import { useProctor } from '@/contexts/ProctorContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SettingsPage() {
  const { currentUser } = useProctor();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
      return;
    }

    // Redirect based on user role
    switch (currentUser.role) {
      case 'student':
        router.push('/student/settings');
        break;
      case 'faculty':
        router.push('/faculty/settings');
        break;
      case 'department':
        router.push('/department/settings');
        break;
      case 'campus':
        router.push('/school/settings');
        break;
      case 'admin':
        router.push('/admin/settings');
        break;
      default:
        router.push('/login');
    }
  }, [currentUser, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p>Redirecting to your settings...</p>
      </div>
    </div>
  );
}