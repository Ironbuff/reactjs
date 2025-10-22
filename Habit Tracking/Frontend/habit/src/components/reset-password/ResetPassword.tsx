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
import { Eye, EyeOff } from "lucide-react";

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
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Set New Password
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Password Field */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your new password"
              {...register("password")}
              className="w-full border rounded-lg p-3 focus:ring focus:ring-blue-300 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm new password"
              {...register("confirmPassword")}
              className="w-full border rounded-lg p-3 focus:ring focus:ring-blue-300 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              tabIndex={-1}
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || resetPasswordMutation.isPending}
            className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition disabled:bg-blue-300"
          >
            {resetPasswordMutation.isPending ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
