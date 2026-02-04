"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { update_password } from "@/lib/server_api/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const ChangePasswordFormSchema = z
  .object({
    current_password: z
      .string()
      .min(8, "Current Password must be at least 8 characters"),
    password: z
      .string()
      .min(8, "New Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Must contain at least one number")
      .regex(/[^a-zA-Z0-9]/, "Must contain at least one special character"),
    password_confirmation: z
      .string()
      .min(8, "Confirm New Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });
export default function ChangePasswordForm() {
  const form = useForm({
    resolver: zodResolver(ChangePasswordFormSchema),
    defaultValues: {
      current_password: "",
      password: "",
      password_confirmation: "",
    },
  });

  const update_mutate = useMutation({
    mutationFn: update_password,
  });

  function handleSubmit(data: z.infer<typeof ChangePasswordFormSchema>) {
    toast.promise(
      () =>
        update_mutate.mutateAsync(data).then((res) => {
          if (res.status) {
            return res.message;
          }

          return new Error(res.message);
        }),
      {
        loading: "Updating password...",
        success: "Password updated successfully",
        error: (err) => `${err.message}`,
      },
    );
  }
  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <FieldSet>
        <FieldGroup>
          <Controller
            control={form.control}
            name="current_password"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor={field.name}
                  aria-invalid={fieldState.invalid}
                >
                  Current Password
                </FieldLabel>
                <Input type="password" id={field.name} {...field} />
                <FieldDescription>
                  You must provide your current password in order to change it.
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor={field.name}
                  aria-invalid={fieldState.invalid}
                >
                  New Password
                </FieldLabel>
                <Input type="password" id={field.name} {...field} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="password_confirmation"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor={field.name}
                  aria-invalid={fieldState.invalid}
                >
                  Confirm New Password
                </FieldLabel>
                <Input type="password" id={field.name} {...field} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </FieldSet>
      <div className="flex justify-end mt-4">
        <Button>Update Password</Button>
      </div>
    </form>
  );
}
