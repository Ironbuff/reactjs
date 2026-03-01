import { Navbar } from "@/components/navbar/navbar";
import PermissionScreen from "@/components/permission/PermissionScreen";
import React from "react";

const page = () => {
  return (
    <>
      <Navbar />
      <PermissionScreen />
    </>
  );
};

export default page;
