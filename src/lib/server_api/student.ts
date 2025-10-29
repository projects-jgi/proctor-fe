'use server';

import Request from "@/utils/Request";

export async function get_student_exams({ status = "completed" }: { status?: string }){
    return Request({
            url: process.env.BACKEND_HOST + "/api/students/exams?status=" + status,
            method: "GET",
            isAuthorized: true
        }).then(function(response){
            return response.data.data;
        }).catch(function(error){
            return Promise.reject(error.response.data.message)
        })
}

export async function make_student_exam_attempt({ exam_id }: { exam_id: number }){
    return Request({
        url: process.env.BACKEND_HOST + `/api/students/exams/${exam_id}/attempts`,
        method: "POST",
        isAuthorized: true
    }).then(function(response){
        return (response.data.data)
    }).catch(function(error){
        if(error.response){
            return Promise.reject(error.response.data.message)
        }
        return Promise.reject("Unknown error occured while starting exam")
    })
}

export async function save_student_exam_attempt({ exam_id, answers }: {exam_id: number, answers: object}){
    return Request({
        url: process.env.BACKEND_HOST + `/api/students/exams/${exam_id}/attempts/answers`,
        method: 'POST',
        isAuthorized: true,
        body: {
            "is_auto_submitted": false,
            "answer": JSON.stringify(answers)
        }
    }).then(function(response){
        return (response.data)
    }).catch(function(error){
        if(error.response){
            return Promise.reject(error.response.data.message)
        }
        return Promise.reject("Unknown error occured while starting exam")
    })
}

export async function get_student_attempt_answers({ exam_id }: { exam_id: number }){
    return Request({
        url: process.env.BACKEND_HOST + `/api/students/exams/${exam_id}/attempts/1/answers`,
        isAuthorized: true,
        method: "GET"
    }).then(function(response){
        return response.data
    }).catch(function(error){
        if(error.response){
            return Promise.reject(error.response.data.message)
        }
        return Promise.reject("Unable to load exam results")
    })
}

export async function get_student_attempt_result({ exam_id }: {exam_id: number}){
    return Request({
        url: process.env.BACKEND_HOST + `/api/students/exams/${exam_id}/attempts/1/result`,
        isAuthorized: true,
        method: "GET"
    }).then(function(response){
        return response.data
    }).catch(function(error){
        if(error.response){
            return Promise.reject(error.response.data.message)
        }
        return Promise.reject("Unable to load exam results")
    })
}