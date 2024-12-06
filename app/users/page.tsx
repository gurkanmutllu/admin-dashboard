"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import UserList from "@/components/UserList";
import { ROUTES } from "@/constants/routes";
import LoadingSpinner from "@/components/LoadingSpinner";
import { renderAuthContent } from "@/components/RenderAuthContent";

export default function Users() {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!loading && !user) {
      router.push(ROUTES.LOGIN);
    }
  }, [user, loading, router]);

  

  return renderAuthContent(loading, user, 
    <div className="flex flex-col items-center p-8">
      <div className="flex items-center mb-4"></div>
      <UserList />
    </div>
  );

}
