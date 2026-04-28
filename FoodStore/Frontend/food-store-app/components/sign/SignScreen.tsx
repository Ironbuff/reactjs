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
import { useSignUser } from "./action/sign.config.action"
import { Eye, EyeOff } from "lucide-react";

const loginSchema = z.object({

  email: z.email().min(1, "Email is Required"),

  password: z
    .string().optional(),
  username:z.string().min(1,"UserName is Required"),
});

export type ILoginType = z.infer<typeof loginSchema>



const Sign = () => {


  const form = useForm<ILoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      username:""
    },
  });
  const [showPassword,setShowPassword] = useState(false)
  
const {mutate,isPending} = useSignUser()

  const onSubmit = (values:ILoginType) => {
    mutate(values)
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-[550px] border p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-serif font-semibold mb-4 text-center">Sign Up With Us</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

           
            {/* User Name */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">User Name :</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter UserName" {...field} className="h-12" />
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
                  <FormLabel className="text-base">Email :</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email" {...field} className="h-12" />
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
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"} 
                        {...field}
                        className="h-12 pr-12"
                      />

                      {/* Toggle Button */}
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-sm text-gray-500 hover:text-black"
                      >
                        {showPassword ? <Eye size={20}/>  :  <EyeOff size={20} />}
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full h-12 text-base">
              Sign With Us
            </Button>

          </form>
        </Form>
      </div>
    </div>
  );
};

export default Sign;
