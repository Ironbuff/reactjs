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
    <div className="flex items-center justify-center min-h-[calc(100vh-9ch)] bg-gray-50 px-4">
 
      <div className="w-full max-w-sm bg-white border border-gray-200 shadow-lg rounded-xl p-8">

        <div className="text-center mb-8">

          <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-green-100 rounded-full">
            <Lock className="w-6 h-6 text-green-600" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">Welcome Back</h1>
          <p className="text-gray-500 text-sm mt-1">Sign in to your account</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email
            </label>
            <div className="relative">

              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="email"
                placeholder="Enter your Email"
                {...register("email")}

                className="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-500 outline-none transition-all duration-200"
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-600 mt-1.5">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>

            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-green-600 hover:underline hover:text-green-700 font-medium"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type={seepassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password")}
                className="w-full pl-10 pr-10 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-500 outline-none transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setSeepassword(!seepassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {seepassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-600 mt-1.5">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={mutation.isPending}

            className="group w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white 
            rounded-lg font-medium text-sm flex items-center justify-center transition-all 
            duration-300 disabled:opacity-60 disabled:bg-green-600 hover:shadow-lg focus:outline-none focus-visible:ring-2 
            focus-visible:ring-green-500 focus-visible:ring-offset-2"
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Signing In...
              </>
            ) : (
              <>
                Sign In

                <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-8">
          Don’t have an account?{" "}
          <Link
            to="/register"
            // Made link bolder
            className="text-green-600 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;