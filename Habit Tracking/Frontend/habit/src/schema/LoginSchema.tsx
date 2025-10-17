import { z } from "zod";

export const FormSchema = z.object({
  username: z.string().min(1, "UserName is Required"),
  password: z
    .string()
    .min(6, "Password Length must be atleast 6 letter long")
    .regex(/[a-z]/, "It must contain atleast one small character")
    .regex(/[A-Z]/, "It must contain atleast one capital letter")
    .regex(/[0-9]/, "Password must contain atleast one number")
    .regex(/[^A-Za-z0-9]/, "Password must have at least one special character"),
  email: z.email().min(1, "Email is Required"),
});

export const LoginSchema = z.object({
  email: z.string().min(1, "Username Required"),
  password: z
    .string()
    .min(6, "Password Must be atleast 6 letter long")
    .regex(/[a-z]/, "It must contain atleast one small character")
    .regex(/[A-Z]/, "It must contain atleast one capital letter")
    .regex(/[0-9]/, "Password must contain atleast one number")
    .regex(/[^A-Za-z0-9]/, "Password must have at least one special character"),
});

export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password Must be atleast 6 letter long")
      .regex(/[a-z]/, "It must contain atleast one small character")
      .regex(/[A-Z]/, "It must contain atleast one capital letter")
      .regex(/[0-9]/, "Password must contain atleast one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must have at least one special character"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"], // Apply error to the confirmPassword field
  });
