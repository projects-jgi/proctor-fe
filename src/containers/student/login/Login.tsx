'use client';

import React, { useState } from "react";
// import { otpSchema, OtpSchema } from "./otp-schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { OTPInput } from "input-otp";
import { loginSchema, LoginSchema, OtpSchema } from "@/lib/zod/login";
import LoginForm from "@/components/auth/LoginForm";
import OTPForm from "@/components/auth/OTPForm";
import { login } from "@/lib/server_api/auth";
import { useRouter } from "next/navigation";

function Login() {
    const [isFormValidated, setIsFormValidated] = useState(false);
    const [loginError, setLoginError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (values: LoginSchema) => {
        setIsLoading(true)
        try{
            const res = await login(values)
            router.push("/student/dashboard")
            setLoginError("")
        }catch(err){
            let err_message = "Unable to login. Please try again!"
            if(err instanceof Error){
                if(err.message){
                    err_message = err.message
                }
            }
            setLoginError(err_message)
        }finally{
            setIsLoading(false)
        }
    };

    const handleOtpSubmit = (e: OtpSchema) => {
        console.log(e)
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
                    <LoginForm isValidating={isLoading} handleLogin={handleLogin} error={loginError} />
                    {isFormValidated && (
                        <OTPForm handleOtpSubmit={handleOtpSubmit} />
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

export default Login;