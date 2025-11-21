import z from "zod";

export const AddhabitSchema = z.object({
  title: z.string().min(2, "At least 2 characters long"),
  description: z.string().min(5, "Description should be at least 5 characters long"),
  image: z
    .any()
    .refine((files) => files?.length === 1, "Please upload an image.")
    .refine(
      (files) => ["image/jpeg", "image/png", "image/jpg"].includes(files?.[0]?.type),
      "Only JPG, JPEG, or PNG images are allowed."
    )
    .refine(
      (files) => files?.[0]?.size <= 2 * 1024 * 1024,
      "Image size must be less than 2MB."
    ),
});