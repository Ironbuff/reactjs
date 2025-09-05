import z from "zod";



export const AddhabitSchema = z.object({
  title: z.string().min(2,"Atleast the title should 2 letter long"),
  description: z.string().min(5, "Description should be at least 5 letter long")
}) 