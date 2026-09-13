import { sign } from "crypto";
import * as z from "zod";

export const signupSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export const loginSchema = signupSchema;

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInpuit = z.infer<typeof loginSchema>;
