"use client";

import { useProctor } from '@/contexts/ProctorContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProfilePage() {
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
        router.push('/student/profile');
        break;
      case 'faculty':
        router.push('/faculty/profile');
        break;
      case 'department':
        router.push('/department/profile');
        break;
      case 'campus':
        router.push('/school/profile');
        break;
      case 'admin':
        router.push('/admin/profile');
        break;
      default:
        router.push('/login');
    }
  }, [currentUser, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p>Redirecting to your profile...</p>
      </div>
    </div>
  );
}