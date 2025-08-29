
import { LoginSchema } from "../../schema/LoginSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { LoginUser } from "../../services/GetLogin";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import React from "react";

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });


  const mutation = useMutation({
    mutationKey: ["login"], 
    mutationFn: (formData) => LoginUser(formData),
    onSuccess: (data) => {
      localStorage.setItem("accesstoken",data?.data?.token),
      localStorage.setItem("refreshtoken",data?.data?.refreshtoken),
      localStorage.setItem("expriesAt",data?.data?.refreshTokenExpiresAt)
      toast.success(data?.data?.message || "Login Successful");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message as unknown as string || "Something went wrong");
    },
  });

  // Handle form submit
  const onSubmit = (data) => {
    mutation.mutate(data);
  };
  
  
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-13ch)] bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Login
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

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              {...register("password")}
              className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={mutation.isPending} 
            className="w-full py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 disabled:opacity-50"
          >
           Login
          </button>
        </form>

        {/* Extra Links */}
        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-indigo-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
