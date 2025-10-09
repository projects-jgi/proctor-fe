
interface RequestParams {
    url: string | URL,
    method?: string | undefined,
    body?: string
}

export default async function Request({ url, method = "GET", body }: RequestParams){
    let params: RequestInit = {
        headers: {
            "Accept": "application/json"
        },
        method
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