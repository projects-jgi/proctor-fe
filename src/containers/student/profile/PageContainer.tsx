"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail } from "lucide-react";
import PersonalForm from "./PersonalForm";
import ChangePasswordForm from "./ChangePasswordForm";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/Loading";
import { get_student_profile } from "@/lib/server_api/student";

export default function PageContainer() {
  const user_query = useQuery({
    queryKey: ["student", "profile"],
    queryFn: async () => {
      const response = await get_student_profile();
      if (response.status) {
        return response.data;
      }

      throw new Error(response.message);
    },
  });

  if (user_query.isLoading) {
    return <Loading />;
  }

  if (user_query.isError) {
    return <div>{user_query.error?.message}</div>;
  }

  return (
    <div className="grid gap-4 mt-4">
      <Card>
        <CardContent>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-20 aspect-square bg-primary rounded-full flex items-center justify-center text-2xl font-bold text-black">
                {user_query.data.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold">{user_query.data.name}</h2>
                {user_query.data.role && (
                  <h3 className="text-md text-muted-foreground">Student</h3>
                )}
                <p className="text-sm text-muted-foreground">Student</p>
                <p className="flex items-center gap-1 text-muted-foreground text-sm">
                  <Mail size={15} /> {user_query.data.email}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Update your personal details and contact information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PersonalForm defaultValues={user_query.data} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Update your account password</CardDescription>
        </CardHeader>
        <CardContent>
          <ChangePasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}
