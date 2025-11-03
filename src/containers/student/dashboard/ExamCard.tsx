import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Hourglass } from "lucide-react";
import React from "react";

type ExamType = { name?: string; description?: string; startDate?: string; endDate?: string; duration?: string; action: React.ReactNode };

function ExamCard({ name, description, startDate, endDate, duration, action }: ExamType) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">{ name }</CardTitle>
        <CardDescription>{ description }</CardDescription>
        <CardAction>
            { action }
        </CardAction>
      </CardHeader>
      <CardContent className="text-sm">
        <div className="flex gap-4 flex-wrap">
          <div className="flex gap-2 items-center">
            <span className="inline">
              <CalendarDays size={20} />
            </span>
            <span className="inline">{startDate} to {endDate}</span>
          </div>
          <div className="flex gap-2 items-center">
            <span className="inline">
              <Hourglass size={20} />
            </span>
            <span className="inline">{duration} Minutes</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ExamCard;
