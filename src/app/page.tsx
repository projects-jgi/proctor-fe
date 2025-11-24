import { ThemeToggle } from "@/components/ThemeToggle";
import { redirect } from "next/navigation";
import React from "react";

function Home() {
  redirect("/student/dashboard");

  return (
    <div>
      <ThemeToggle />
    </div>
  );
}

export default Home;
