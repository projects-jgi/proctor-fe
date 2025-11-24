"use client";

import { setStudentProfile } from "@/lib/redux/state/StudentProfile";
import { get_student_profile } from "@/lib/server_api/student";
import { StudentUser } from "@/types/student";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

export default function StudentInfo() {
  const dispatch = useDispatch();

  const data = useQuery({
    queryKey: ["student", "profile"],
    queryFn: async () => {
      const response = await get_student_profile();
      if (response.status) {
        dispatch(setStudentProfile(response.data as StudentUser));
        return response.data;
      } else {
        console.log(response.message);
        return new Error(response.message);
      }
    },
  });

  return <></>;
}
