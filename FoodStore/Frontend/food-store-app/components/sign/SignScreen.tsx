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
import { useSignUser } from "./action/sign.config.action";
import { Eye, EyeOff, UserPlus } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Invalid email").min(1, "Email is Required"),
  password: z.string().optional(),
  username: z.string().min(1, "UserName is Required"),
});

export type ILoginType = z.infer<typeof loginSchema>;

const Sign = () => {
  const form = useForm<ILoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isPending } = useSignUser();

  const onSubmit = (values: ILoginType) => {
    mutate(values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-red-50 px-4">
      <div className="w-full max-w-xl bg-white/90 backdrop-blur-sm border border-orange-100 rounded-3xl shadow-2xl p-8">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-neutral-800 p-4 rounded-full border border-neutral-700 mb-4">
            <UserPlus className="text-neutral-200" size={30} />
          </div>

          <h2 className="text-3xl font-bold text-neutral-700">
            Create Account
          </h2>

          <p className="text-neutral-400 mt-2 text-center">
            Join us and start ordering your favorite food
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* Username */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-neutral-700">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your username"
                      {...field}
                      className="h-12 rounded-xl bg-gray-200 border-gray-200 text-neutral-100 placeholder:text-neutral-500 focus-visible:ring-2 focus-visible:ring-neutral-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-neutral-700">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      {...field}
                      className="h-12 rounded-xl bg-gray-200 border-gray-200 text-neutral-100 placeholder:text-neutral-500 focus-visible:ring-2 focus-visible:ring-neutral-500"
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
                  <FormLabel className="text-sm font-medium text-neutral-700">
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        {...field}
                        className="h-12 rounded-xl bg-gray-200 border-gray-200 placeholder:text-neutral-500 pr-12 focus-visible:ring-2 focus-visible:ring-neutral-500"
                        placeholder="Enter your password"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-600 hover:text-neutral-700 transition-colors"
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

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-12 rounded-xl bg-neutral-700 text-neutral-100 hover:bg-neutral-800 font-semibold text-base transition-all duration-200"
            >
              {isPending ? "Creating Account..." : "Sign Up"}
            </Button>

            {/* Footer */}
            <p className="text-center text-base text-neutral-400">
              Already have an account?{" "}
              <span className="text-neutral-700 font-medium cursor-pointer hover:underline">
                Login
              </span>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Sign;