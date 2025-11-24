"use client";

import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RootState } from "@/lib/redux/store";
import { AlarmClock, AlarmClockCheck, Award, Siren } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

function Stats() {
  const completed_exams_length = useSelector(
    (state: RootState) => state.exam_list.completed_exams.length
  );
  const ongoing_exams_length = useSelector(
    (state: RootState) => state.exam_list.ongoing_exams.length
  );
  const upcoming_exams_length = useSelector(
    (state: RootState) => state.exam_list.upcoming_exams.length
  );

  return (
    <div className="my-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">{ongoing_exams_length}</CardTitle>
          <CardDescription>Ongoing Exams</CardDescription>
          <CardAction className="bg-primary text-primary-foreground p-4 rounded-full">
            <Siren />
          </CardAction>
        </CardHeader>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">{upcoming_exams_length}</CardTitle>
          <CardDescription>Upcoming Exams</CardDescription>
          <CardAction className="bg-primary text-primary-foreground p-4 rounded-full">
            <AlarmClock />
          </CardAction>
        </CardHeader>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">{completed_exams_length}</CardTitle>
          <CardDescription>Completed Exams</CardDescription>
          <CardAction className="bg-primary text-primary-foreground p-4 rounded-full">
            <AlarmClockCheck />
          </CardAction>
        </CardHeader>
      </Card>
      {/* <Card className="w-full">
                <CardHeader>
                <CardTitle className="text-2xl">78%</CardTitle>
                <CardDescription>Average Score</CardDescription>
                <CardAction className="bg-primary text-primary-foreground p-4 rounded-full">
                    <Award />
                </CardAction>
                </CardHeader>
            </Card> */}
    </div>
  );
}

export default Stats;
