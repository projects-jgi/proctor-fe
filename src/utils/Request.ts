import axios from "axios";

import { getSession } from "./session"

interface RequestParams {
    url: string,
    method?: string | undefined,
    body?: object,
    isAuthorized?: boolean
}

export default async function Request({ url, method = "GET", isAuthorized = false, body }: RequestParams){
    let headers: any = {}
    
    if(isAuthorized){
        const session = await getSession();
        let token; 
        if(session.user){
            token = session.user.token.access_token;
        }else{
            token = "";
        }
        headers['Authorization'] = 'Bearer ' + token
    }

    return axios(url, {
        method: method,
        data: body,
        headers: headers
    })
}