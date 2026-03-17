"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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

  useEffect(() => {
    if (!role) {
      router.push("/login");
      return;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
      router.push("/");
    }
  }, [role, router, allowedRoles]);

  return <>{children}</>;
}