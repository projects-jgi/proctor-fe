import { getSession } from "./session"

interface RequestParams {
    url: string | URL,
    method?: string | undefined,
    body?: string,
    isAuthorized?: boolean
}

export default async function Request({ url, method = "GET", isAuthorized = false, body }: RequestParams){
    let params: RequestInit = {
        headers: {
            "Accept": "application/json"
        },
        method
    }

    
    if(isAuthorized){
        const session = await getSession();
        let token; 
        if(session.user){
            token = session.user.token.access_token;
        }else{
            token = "";
        }

        params.headers["Authorization"] = "Bearer " + token
        console.log(params)
    }

    if(body){
        params.headers = {
            ...params.headers,
            "Content-Type": "application/json"
        }
        params.body = body
    }
    
    const request = await fetch(url, params);

    if(!request.ok){
        return Promise.reject(await request.json());
    }

    return Promise.resolve(await request.json());
}