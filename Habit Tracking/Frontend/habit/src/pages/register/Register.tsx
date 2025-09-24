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
    <div className="flex items-center justify-center min-h-[calc(100vh-13ch)] bg-gradient-to-br from-gray-100 via-white to-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-xl rounded-2xl border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Create an Account
        </h2>
        <p className="text-center text-gray-500 text-sm">
          Join us today and start your journey 🚀
        </p>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-semibold text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              {...register("email")}
              className="w-full px-4 py-2.5 text-gray-900 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition duration-200"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-semibold text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Choose a username"
              {...register("username")}
              className="w-full px-4 py-2.5 text-gray-900 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition duration-200"
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-500">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-semibold text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={seepassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                {...register("password")}
                className="w-full px-4 py-2.5 text-gray-900 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition duration-200"
              />
              <button
                type="button"
                onClick={() => setSeepassword(!seepassword)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 transition"
              >
                {seepassword ? <EyeClosed size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2.5 text-white bg-green-500 hover:bg-green-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-300 font-semibold shadow-sm"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-green-500 font-semibold hover:underline cursor-pointer"
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
