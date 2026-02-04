"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const topMenu = [
    { id: 1, label: "Login", route: "/login" },
    { id: 2, label: "Sign In", route: "/sign" },
    { id: 3, label: "Order Food", route: "/food" },
    { id: 4, label: "Permissions", route: "/permission" }
  ];

  const router = useRouter();

  return (
    <div className="flex items-center justify-between h-[9ch] bg-gray-100 px-7 shadow-md">
      <div className="flex gap-x-2">
        {/* <Image src="/food.png" width={30} height={30} alt="FoodImage" /> */}
        <h1 className="text-2xl font-serif font-bold text-gray-800 leading-relaxed">FoodLand</h1>
      </div>

      <div className="flex gap-x-2 items-center justify-end">
        {topMenu.map((item) => (
          <Button
            key={item.id}
            variant="outline"
            onClick={() => router.push(item.route)}
          >
            {item.label}
          </Button>
        ))}
      </div>
    </div>
  );
};
