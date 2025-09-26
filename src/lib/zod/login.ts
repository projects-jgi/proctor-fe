import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({ pattern: /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@jainuniversity.ac.in$/i, message: "Email should be a valid college address" }),
  password: z.string().min(6, { message: "Password must be at least 8 characters" }),
});
export type LoginSchema = z.infer<typeof loginSchema>;

export const otpSchema = z.object({
  otp: z.string().regex(/^\d{6}$/, { message: "OTP must be 6 digits" }),
});
export type OtpSchema = z.infer<typeof otpSchema>;