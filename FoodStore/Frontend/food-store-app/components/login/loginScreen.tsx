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
import { useloginUser } from "./action/login.action.config";
import { useRouter } from "next/navigation";

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

export type ILoginType = z.infer<typeof loginSchema>

const Login = () => {
  const form = useForm<ILoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const route = useRouter()

  const {mutate }= useloginUser()

  const onSubmit = (values:ILoginType) => {
    mutate(values);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-[700px] border p-6 rounded-xl shadow-md ">
        <h2 className="text-2xl font-semibold mb-4 text-center font-mono">Login To Order Food</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-6 min-h-[300px] justify-center">

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Email :</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email" {...field}  className="h-12"/>
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
                  <FormLabel className="text-base">Password:</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter password" {...field}  className="h-12" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full h-12 text-lg leading-relaxed">
              Login
            </Button>
            <span className="text-base font-normal"> Don't have account ? <span className="text-blue-400 underline hover:scale-105 transition-all ease-in-out duration-300" onClick={()=>{
              route.push('/sign')
            }}>Sign With Us</span></span>

          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
