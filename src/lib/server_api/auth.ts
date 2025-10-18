'use server'

import Request from "@/utils/Request";
import { loginSession, logoutSession } from "@/utils/session";

export async function login({ email, password }: {email: string, password: string}){
    const body = {
        email,
        password
    }

    try{
        const response = await Request({url: "http://localhost/api/auth/student/login", method: 'POST', body: body})
        await loginSession(response.data)
        return {}
    }catch(error){
        if(error.response){
            return Promise.reject(error.response.data.message)
        }
        return Promise.reject("Unknown error occured")
    }

}

export async function logout(){
    await logoutSession()

    return true;
}