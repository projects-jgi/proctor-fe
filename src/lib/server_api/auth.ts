'use server'

import Request from "@/utils/Request";
import { loginSession } from "@/utils/session";

export async function login({ email, password }: {email: string, password: string}){
    const body = {
        email,
        password
    }

    try{
        const res = await Request({url: "http://localhost/api/auth/student/login", method: 'POST', body: JSON.stringify(body)})
        await loginSession(res)
        return {
            status: true,
            message: "Student authentication successful"
        }
    }catch(err){
        let err_message = undefined;
        if(typeof(err) == "string"){
            err_message = err
        }else if(err instanceof Error){
            err_message = err.message
        }else{
            err_message = "Invalid login credentials"
        }

        throw new Error(JSON.stringify({
            status: false,
            message: err_message
        }))
    }

}