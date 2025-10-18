'use server';

import Request from "@/utils/Request";

export async function get_student_exams({ status = "completed" }: { status?: string }){
    return Request({
            url: "http://localhost/api/students/exams?status=" + status,
            method: "GET",
            isAuthorized: true
        }).then(function(response){
            return response.data.data;
        }).catch(function(error){
            return Promise.reject(error.response.data.message)
        })
}