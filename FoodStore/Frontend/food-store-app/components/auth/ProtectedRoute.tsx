"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export default function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const role = useSelector((state: RootState) => state.auth.role);
  const router = useRouter();
  
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!role) {
      router.push("/login");
      return;
    }

    if (allowedRoles && !allowedRoles.includes("") && !allowedRoles.includes(role)) {
      router.push("/");
      return;
    }
    setIsAuthorized(true);
    
  }, [role, router, allowedRoles]);
  if (!isAuthorized) {
    return null; 
  }

  return <>{children}</>;
}