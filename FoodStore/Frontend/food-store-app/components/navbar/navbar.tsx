"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { useEffect } from "react";
import { setRole } from "@/redux/authSlice";

export const Navbar = () => {
  const topMenu = [
    { id: 1, label: "Login", route: "/login" },
    { id: 2, label: "Sign In", route: "/sign" },
    { id: 3, label: "Order Food", route: "/food" },
    { id: 4, label: "Permissions", route: "/permission" },
    { id: 5, label: "Add Food", route: "/add" },
  ];

  const router = useRouter();
  const dispatch = useDispatch();

  const role = useSelector((state: RootState) => state.auth.role);
  
  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      const parsed = JSON.parse(auth);
      dispatch(setRole(parsed.role));
    }
  }, [dispatch]);

  return (
    <div className="flex items-center justify-between h-[9ch] bg-gray-100 px-7 shadow-md">
      <div className="flex gap-x-2">
        <Link href={"/"}>
          <Image
            src="/foodland.png"
            width={150}
            height={30}
            alt="FoodImage"
            className="rounded-md shadow-md"
          />
        </Link>
      </div>

      <div className="flex gap-x-2 items-center justify-end">
        {topMenu.map((item) => {
          if (
            (item.label === "Permissions" || item.label === "Add Food") &&
            role !== "admin"
          ) {
            return null;
          }

          return (
            <Button
              key={item.id}
              variant="outline"
              onClick={() => router.push(item.route)}
            >
              {item.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
};