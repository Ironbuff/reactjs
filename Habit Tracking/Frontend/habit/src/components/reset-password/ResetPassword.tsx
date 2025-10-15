import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { resetPassword } from "../../services/verify";
import { ResetPasswordSchema } from "../../schema/LoginSchema";
import z from "zod";




interface IErrorMessage {
    message: string;
}

type  IResetPasswordSchema = z.infer<typeof ResetPasswordSchema>

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();

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
            const errorMessage = error.response?.data?.message || "Failed to reset password.";
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
                {/* 4. Connect handleSubmit to your form's onSubmit event */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <input
                            type="password"
                            placeholder="Enter your new password"
                            {...register("password")} // 5. Register the input
                            className="w-full border rounded-lg p-3 focus:ring focus:ring-blue-300"
                        />
                        {/* 6. Display validation errors */}
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Confirm new password"
                            {...register("confirmPassword")} // 5. Register the input
                            className="w-full border rounded-lg p-3 focus:ring focus:ring-blue-300"
                        />
                        {/* 6. Display validation errors */}
                        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
                    </div>
                    <button
                        type="submit"
                        // Disable the button while the form is submitting or the mutation is pending
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