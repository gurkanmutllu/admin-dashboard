'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/LoginForm";
import { STRINGS } from "@/constants/Strings";
import { useAuth } from "@/components/AuthProvider";
import { ROUTES } from "@/constants/routes";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !loading) {
      router.push(ROUTES.USERS);
    }
  }, [user, loading, router]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (user) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">{STRINGS.LOGIN_TITLE}</h1>
      <LoginForm />
    </div>
  );
}
