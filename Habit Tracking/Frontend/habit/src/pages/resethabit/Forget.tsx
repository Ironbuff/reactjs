import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { requestPasswordReset } from "../../services/verify";
import { AxiosError } from "axios";

interface errorResponseMessge {
  message: string;
}

const VerifyEmailPassword = () => {
  const [email, setEmail] = useState("");

  const verifyEmailMutation = useMutation({
    mutationKey: ["verify"],
    mutationFn: requestPasswordReset,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error: AxiosError<errorResponseMessge>) => {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred.";
      toast.error(errorMessage);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    verifyEmailMutation.mutate(email);
  };

  return (
    <div className="min-h-[calc(100vh-9ch)] flex items-center justify-center bg-gray-200 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl border border-gray-100 transition-all hover:shadow-blue-200">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-3">
          Forgot Password?
        </h1>
        <p className="text-center text-gray-500 mb-8 text-sm leading-relaxed">
          Enter your registered email and we’ll send you a link to reset your
          password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all placeholder-gray-400"
            />
          </div>

          <button
            type="submit"
            disabled={verifyEmailMutation.isPending}
            className={`w-full py-3 rounded-lg font-semibold text-white transition-all shadow-md ${
              verifyEmailMutation.isPending
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98]"
            }`}
          >
            {verifyEmailMutation.isPending
              ? "Sending..."
              : "Send Verification Link"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-8">
          Remembered your password?{" "}
          <a
            href="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Back to Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmailPassword;
