"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { update_user } from "@/lib/server_api/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const PersonlFormSchema = z.object({
  name: z.string().min(3, "Full Name must be at least 3 characters"),
  email: z.email({
    pattern:
      /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@jainuniversity.ac.in$/i,
    message: "Email should be a valid college address",
  }),
});

export default function PersonalForm({
  defaultValues,
}: {
  defaultValues: any;
}) {
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(PersonlFormSchema),
    defaultValues,
  });

  const update_mutate = useMutation({
    mutationFn: update_user,
  });

  function handleSubmit(data: z.infer<typeof PersonlFormSchema>) {
    toast.promise(
      () =>
        update_mutate.mutateAsync(data).then((res) => {
          if (res.status) {
            queryClient.invalidateQueries({
              queryKey: ["student", "profile"],
            });
            return res.message;
          }

          return new Error(res.message);
        }),
      {
        loading: "Updating profile...",
        success: "Profile updated successfully",
        error: (err) => `Error: ${err.message}`,
      },
    );
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <FieldSet>
        <FieldGroup className="grid grid-cols-2">
          <Controller
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  aria-invalid={fieldState.invalid}
                  htmlFor={field.name}
                >
                  Full Name
                </FieldLabel>
                <Input {...field} name="name" id={field.name} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Field aria-disabled="true">
            <FieldLabel htmlFor="email">Email Address</FieldLabel>
            <Input
              name="email"
              id="email"
              value={form.getValues("email")}
              disabled
            />
          </Field>
        </FieldGroup>
      </FieldSet>
      <div className="flex justify-end mt-4">
        <Button>Save Profile</Button>
      </div>
    </form>
  );
}
