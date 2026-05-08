"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useloginUser } from "./action/login.action.config";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, UtensilsCrossed } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Invalid email").min(1, "Email is Required"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
});

export type ILoginType = z.infer<typeof loginSchema>;

const Login = () => {
  const form = useForm<ILoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const route = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const { mutate } = useloginUser();

  const onSubmit = (values: ILoginType) => {
    mutate(values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-red-50 px-4">
      <div className="w-full max-w-xl bg-white/90 backdrop-blur-sm border border-orange-100 shadow-2xl rounded-3xl p-8">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-neutral-700 p-4 rounded-full mb-4">
            <UtensilsCrossed className="text-neutral-300" size={32} />
          </div>

          <h2 className="text-3xl font-bold text-gray-800">
            Welcome Back
          </h2>

          <p className="text-gray-500 mt-2 text-center">
            Login to continue ordering your favorite foods
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-y-6"
          >
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-700">
                    Email Address
                  </FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      {...field}
                      className="h-12 rounded-xl border-gray-200 focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:border-orange-400 transition-all"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center">
                    <FormLabel className="text-sm font-semibold text-gray-700">
                      Password
                    </FormLabel>

                    <span className="text-sm text-neutral-800 cursor-pointer hover:underline">
                      Forgot Password?
                    </span>
                  </div>

                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        {...field}
                        className="h-12 rounded-xl border-gray-200 pr-12 focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:border-orange-400 transition-all"
                        placeholder="Enter your password"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-500 transition-colors"
                      >
                        {showPassword ? (
                          <Eye size={20} />
                        ) : (
                          <EyeOff size={20} />
                        )}
                      </button>
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Button */}
            <Button
              type="submit"
              className="w-full h-12 rounded-xl bg-neutral-700 hover:bg-orange-800 text-base font-semibold shadow-lg transition-all duration-200 hover:scale-[1.01]"
            >
              Login
            </Button>

            {/* Footer */}
            <p className="text-center text-gray-600">
              Don’t have an account?{" "}
              <span
                className="text-neutral-800 font-semibold cursor-pointer hover:underline"
                onClick={() => {
                  route.push("/sign");
                }}
              >
                Create Account
              </span>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;