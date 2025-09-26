'use client';

import React, { useState } from 'react'

import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from "lucide-react";
import { Button } from '@/components/ui/button';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { loginSchema, LoginSchema } from '@/lib/zod/login';

function LoginForm({ handleLogin}: { handleLogin: (values: any) => void }) {
    const [showPassword, setShowPassword] = useState(false);
    
    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Enter your password"
                          type={showPassword ? "text" : "password"}
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                          tabIndex={-1}
                          onClick={() => setShowPassword((v) => !v)}
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button variant={"default"} type="submit" className="w-full">Login</Button>
            </form>
          </Form>
    )
}

export default LoginForm