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
import React from "react";
import { useSelector } from "react-redux";

function HeroBanner() {
  const student = useSelector((state: RootState) => state.student.profile);
  return (
    <div className="w-full bg-primary">
      <Card className="text-primary-foreground bg-transparent border-0 shadow-none container mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome, {student?.name}</CardTitle>
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
