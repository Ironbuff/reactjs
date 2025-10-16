import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { requestPasswordReset } from "../../services/verify"; // Assuming this is your service file
import { AxiosError } from "axios";

interface errorResponseMessge {
  message: string;
}

const VerifyEmailPassword = () => {
  const [email, setEmail] = useState("");
  
  const verifyEmailMutation = useMutation({
    mutationKey: ['verify'],
    mutationFn: requestPasswordReset, 
    onSuccess: (data) => {

      toast.success(data.message); 
    },
    onError: (error:AxiosError<errorResponseMessge>) => {
      const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
      toast.error(errorMessage);
    }
  });

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    verifyEmailMutation.mutate(email); // Pass the email directly to mutate
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Forgot Your Password?
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Enter your email and we'll send you a link to reset your password.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border rounded-lg p-3 focus:ring focus:ring-blue-300"
          />
          <button
            type="submit"
            disabled={verifyEmailMutation.isPending}
            className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition disabled:bg-blue-400"
          >
            {verifyEmailMutation.isPending ? "Sending..." : "Send Verification Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmailPassword;