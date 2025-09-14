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

type registerschema = 
z.infer<typeof FormSchema>

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
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
      toast.success(data?.data?.message || "Register Sucessful");
      navigate("/login");
    },
    onError: (error: AxiosError<errorResponseMessge>) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });

  const onSubmit = (data:registerschema) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-13ch)]">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-50 shadow-lg rounded-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Register
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              {...register("email")}
              className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              {...register("username")}
              className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={seepassword?"text":"password"}
                id="password"
                placeholder="Enter your password"
                {...register("password")}
                className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <span
                onClick={() => setSeepassword(!seepassword)}
                className="absolute right-3 top-2 "
              >
                {seepassword ? <EyeClosed size={20} /> : <Eye size={20} />}
              </span>
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
            className="w-full py-2 text-white bg-green-400 hover:bg-green-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
