'use client';

import React, { useState } from "react";
// import { otpSchema, OtpSchema } from "./otp-schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { OTPInput } from "input-otp";
import { loginSchema, LoginSchema, OtpSchema } from "@/lib/zod/login";
import LoginForm from "@/components/auth/LoginForm";
import OTPForm from "@/components/auth/OTPForm";

function Login() {
    const [isFormValidated, setIsFormValidated] = useState(false);

    const handleLogin = (values: LoginSchema) => {
        setIsFormValidated(true);
        console.log(values)
    };

    const handleOtpSubmit = (e: OtpSchema) => {
        console.log(e)
    };

    return (
        <main className="flex justify-center items-center min-h-screen">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Student Login</CardTitle>
                    <CardDescription>
                        Enter your email and password to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <LoginForm handleLogin={handleLogin} />
                    {isFormValidated && (
                        <OTPForm handleOtpSubmit={handleOtpSubmit} />
                    )}
                </CardContent>
            </Card>
        </main>
    );
}

export default Login;