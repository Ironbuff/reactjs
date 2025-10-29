import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPassword } from "../../services/verify";
import { ResetPasswordSchema } from "../../schema/LoginSchema";
import z from "zod";
import { Eye, EyeOff, LockKeyhole } from "lucide-react"; // Added LockKeyhole icon

interface IErrorMessage {
  message: string;
}

type IResetPasswordSchema = z.infer<typeof ResetPasswordSchema>;

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IResetPasswordSchema>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const resetPasswordMutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      toast.success(data.message || "Password has been reset successfully!");
      navigate("/login");
    },
    onError: (error: AxiosError<IErrorMessage>) => {
      const errorMessage =
        error.response?.data?.message || "Failed to reset password.";
      toast.error(errorMessage);
    },
  });

  const onSubmit: SubmitHandler<IResetPasswordSchema> = (data) => {
    if (!token) {
      toast.error("Invalid or missing reset token.");
      return;
    }
    resetPasswordMutation.mutate({ token, password: data.password });
  };

  return (
    <div className="flex min-h-[calc(100vh-9ch)] flex-col justify-center items-center bg-gray-100 dark:bg-gray-900 px-6 py-12 lg:px-8">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl space-y-6">
        {/* Header Section */}
        <div className="text-center">
          <LockKeyhole
            className="mx-auto h-12 w-12 text-indigo-400"
            aria-hidden="true"
          />
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Set a New Password
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Create a strong password to keep your account secure.
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* New Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"
            >
              New Password
            </label>
            <div className="relative mt-2">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password")}
                className="block w-full px-2 rounded-md border-0 py-2.5 pr-10 text-gray-900 dark:bg-gray-700 dark:text-white dark:ring-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0  right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-200"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-2 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"
            >
              Confirm New Password
            </label>
            <div className="relative mt-2">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("confirmPassword")}
                className="block w-full rounded-md border-0 px-2 py-2.5 pr-10 text-gray-900 dark:bg-gray-700 dark:text-white dark:ring-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-200"
                tabIndex={-1}
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-2 text-xs text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || resetPasswordMutation.isPending}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {resetPasswordMutation.isPending
              ? "Resetting Password..."
              : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;