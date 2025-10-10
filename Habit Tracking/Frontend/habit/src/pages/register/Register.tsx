import React, { useState } from "react";
import { FormSchema } from "../../schema/LoginSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { UseRegister } from "../../services/GetRegister";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { Eye, EyeClosed } from "lucide-react";
import z from "zod";

interface errorResponseMessge {
  message: string;
}

type registerschema = z.infer<typeof FormSchema>;

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerschema>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const [seepassword, setSeepassword] = useState(false);

  const mutation = useMutation({
    mutationKey: ["register"],
    mutationFn: UseRegister,
    onSuccess: (data) => {
      toast.success(data?.data?.message || "Register Successful");
      navigate("/login");
    },
    onError: (error: AxiosError<errorResponseMessge>) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });

  const onSubmit = (data: registerschema) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-1">
          Create an account
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Join us to start tracking your habits
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-green-400 focus:border-green-400 outline-none"
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              {...register("username")}
              placeholder="Your username"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-green-400 focus:border-green-400 outline-none"
            />
            {errors.username && (
              <p className="text-xs text-red-500 mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={seepassword ? "text" : "password"}
                {...register("password")}
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-green-400 focus:border-green-400 outline-none"
              />
              <button
                type="button"
                onClick={() => setSeepassword(!seepassword)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
              >
                {seepassword ? <EyeClosed size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium text-sm transition duration-200"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-green-500 font-medium hover:underline cursor-pointer"
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
