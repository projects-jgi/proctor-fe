import CompletedExams from "@/containers/student/dashboard/CompletedExams";
import HeroBanner from "@/containers/student/dashboard/HeroBanner";
import OngoingExams from "@/containers/student/dashboard/OnGoingExams";
import Stats from "@/containers/student/dashboard/Stats";
import UpcomingExams from "@/containers/student/dashboard/UpcomingExams";
import React from "react";

export const metadata = {
  title: "Dashboard",
};

function page() {
  return (
    <>
      <main className="">
        <HeroBanner />
        <div className="xl:px-12 container mx-auto">
          <Stats />
          <div className="mb-12">
            <OngoingExams />
            <UpcomingExams />
            <CompletedExams />
          </div>
        </div>
      </main>
    </>
  );
}

export default page;
