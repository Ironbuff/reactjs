"use client";

import React from "react";
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

const loginSchema = z.object({
  userName: z.string().min(1, "UserName is Required"),

  email: z.string().email("Invalid email").min(1, "Email is Required"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
});

export type ILoginType = z.infer<typeof loginSchema>

const Login = () => {
  const form = useForm<ILoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values:ILoginType) => {
    console.log(values);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-[350px] border p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

            {/* Username */}
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter username" {...field} />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email" {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Login
            </Button>

          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
