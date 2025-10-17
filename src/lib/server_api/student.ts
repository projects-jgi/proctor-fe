'use server';

import Request from "@/utils/Request";

export async function get_student_exams({ status = "completed" }: { status?: string }){
    try{
        const res = await Request({
            url: "http://localhost/api/students/exams?status=" + status,
            method: "GET",
            isAuthorized: true
        })

        const data = res.data

        return data 
    }catch(err){
        throw new Error(JSON.stringify({
            status: false,
            message: "Unable to fetch exams"
        }))
    }
}