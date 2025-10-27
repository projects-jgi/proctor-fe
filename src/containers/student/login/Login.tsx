'use client';

import LoginForm from "@/components/auth/LoginForm";
import OTPForm from "@/components/auth/OTPForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useProctor } from "@/contexts/ProctorContext";
import { LoginSchema, OtpSchema } from "@/lib/zod/login";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

function Login() {
    const [isFormValidated, setIsFormValidated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useProctor();
    const router = useRouter();

    const handleLogin = async (values: LoginSchema) => {
        setIsLoading(true);
        try {
            const result = await login(values.email, values.password);

            if (result.success) {
                toast.success("Login successful!");
                // For now, redirect to dashboard. Later we can add OTP verification
                router.push('/student/dashboard');
            } else {
                toast.error(result.error || "Login failed");
            }
        } catch (error) {
            toast.error("An unexpected error occurred");
            console.error("Login error:", error);
        } finally {
            setIsLoading(false);
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
                    <LoginForm handleLogin={handleLogin} />
                    {isFormValidated && (
                        <OTPForm handleOtpSubmit={handleOtpSubmit} />
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

export default Login;