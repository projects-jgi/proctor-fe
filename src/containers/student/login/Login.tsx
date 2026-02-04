"use client";

import React, { useState } from "react";
// import { otpSchema, OtpSchema } from "./otp-schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OTPInput } from "input-otp";
import { loginSchema, LoginSchema, OtpSchema } from "@/lib/zod/login";
import LoginForm from "@/components/auth/LoginForm";
import OTPForm from "@/components/auth/OTPForm";
import { login } from "@/lib/server_api/auth";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

function Login() {
  const [isFormValidated, setIsFormValidated] = useState(false);
  const router = useRouter();
  const login_mutate = useMutation({
    mutationFn: login,
  });

  const handleLogin = async (values: LoginSchema) => {
    toast.promise(
      () =>
        login_mutate.mutateAsync(values).then((response) => {
          if (response.status) {
            return response.message;
          }

          return new Error(response.message);
        }),
      {
        loading: "Logging in...",
        success: (data) => {
          router.push("/student/dashboard");
          return data;
        },
        error: (err) => err.message,
      },
    );
  };

  const handleOtpSubmit = (e: OtpSchema) => {
    console.log(e);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Student Login</CardTitle>
          <CardDescription>
            Enter your email and password to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm
            isValidating={login_mutate.isPending}
            handleLogin={handleLogin}
            error={""}
          />
          {isFormValidated && <OTPForm handleOtpSubmit={handleOtpSubmit} />}
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
