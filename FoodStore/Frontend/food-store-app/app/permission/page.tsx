import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { Navbar } from "@/components/navbar/navbar";
import PermissionScreen from "@/components/permission/PermissionScreen";
import React from "react";

const page = () => {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <Navbar />
      <PermissionScreen />
    </ProtectedRoute>
  );
};

export default page;
