"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RootState } from "@/lib/redux/store";
import { get_student_profile } from "@/lib/server_api/student";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useSelector } from "react-redux";

function HeroBanner() {
  const data = useQuery({
    queryKey: ["student", "profile"],
    queryFn: async () => {
      const response = await get_student_profile();

      if (response.status) {
        return response.data;
      } else {
        console.log(response.message);
        return new Error(response.message);
      }
    },
  });
  return (
    <div className="w-full bg-primary">
      <Card className="text-primary-foreground bg-transparent border-0 shadow-none container mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome, {data.data?.name}</CardTitle>
          <CardDescription className="text-primary-foreground">
            We're glad to see you again.
          </CardDescription>
          {/* <CardAction>
                        <Button variant={"secondary"} className="text-md">
                        Get started
                        </Button>
                    </CardAction> */}
        </CardHeader>
      </Card>
    </div>
  );
}

export default HeroBanner;
