import { LoginSchema } from "../../schema/LoginSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { LoginUser } from "../../services/GetLogin";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { authAction } from "../../store/auth";
import { AxiosError } from "axios";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import z from "zod";

interface errorResponseMessge {
  message: string;
}

type loginSchema = z.infer<typeof LoginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [seepassword, setSeepassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginSchema>({
    resolver: zodResolver(LoginSchema),
  });

  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: LoginUser,
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data?.data?.token);
      localStorage.setItem("refreshToken", data?.data?.refreshtoken);
      localStorage.setItem("expiresAt", data?.data?.accessTokenExpiresAt);
      localStorage.setItem("id", data?.data?.user?.id);
      toast.success(data?.data?.message || "Login Successful");
      dispatch(authAction.login());
      navigate("/");
    },
    onError: (error: AxiosError<errorResponseMessge>) => {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    },
  });

  const onSubmit = (data: loginSchema) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-9ch)] bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white border border-gray-100 shadow-md rounded-xl p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <Lock className="mx-auto text-green-500 w-10 h-10 mb-2" />
          <h1 className="text-2xl font-semibold text-gray-800">Welcome Back</h1>
          <p className="text-gray-500 text-sm mt-1">Sign in to your account</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
              <input
                type="email"
                placeholder="you@example.com"
                {...register("email")}
                className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-400 focus:border-green-400 outline-none transition"
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
              <input
                type={seepassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password")}
                className="w-full pl-10 pr-10 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-400 focus:border-green-400 outline-none transition"
              />
              <button
                type="button"
                onClick={() => setSeepassword(!seepassword)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                {seepassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end -mt-3">
            <Link
              to="/forgot-password"
              className="text-sm text-green-500 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={mutation.isPending}
            className="group w-full py-2.5 bg-green-500 hover:bg-green-600 text-white 
          rounded-lg font-medium text-sm flex items-center justify-center transition-all 
          duration-200 disabled:opacity-50 hover:shadow-md"
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Signing In...
              </>
            ) : (
              <>
                Sign In
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-2" />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-5">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-green-500 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
