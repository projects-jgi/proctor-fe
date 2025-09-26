import { REGEXP_ONLY_DIGITS } from 'input-otp'
import React from 'react'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { otpSchema, OtpSchema } from '@/lib/zod/login'
import { zodResolver } from '@hookform/resolvers/zod'

function OTPForm({ handleOtpSubmit }: { handleOtpSubmit: (values: any) => void }) {
    const form = useForm<OtpSchema>({
        resolver: zodResolver(otpSchema),
        defaultValues: {
            otp: "",
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleOtpSubmit)} className="space-y-4 mt-6">
                <FormField
                    control={form.control}
                    name='otp'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Enter OTP</FormLabel>
                            <FormControl>
                                <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} {...field}>
                                    <InputOTPGroup>
                                        {Array(6).fill(0).map((_, index) => (
                                            <InputOTPSlot key={index} index={index} />
                                        ))}
                                    </InputOTPGroup>
                                </InputOTP>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">Verify OTP</Button>
            </form>
        </Form>
    )
}

export default OTPForm