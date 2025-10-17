'use server';

import { SessionTypes } from "@/types/users";
import { getIronSession, IronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionData {
    token: String
}

const PASSWORD = "hR7Wcv5@W#C)rbU%2LZuR]-e:.gu7Rd+!pT?9a77Rj6Qecs0K12)g6Q8-4!40.:uH@RwRto_kFC_DYgk?D,DwCC4TDLppDZDqD7G"

export async function loginSession(data: { data: object}){
    // TODO: set the ttl as the backend authorization ttl
    const session = await getIronSession(await cookies(), { password: PASSWORD, cookieName: SessionTypes.USER_SESSION, ttl: 3600})
    session.user = {
        token: data
    }
    await session.save()

    return session
}

export async function logoutSession(){
    const session = await getIronSession(await cookies(), { password: PASSWORD, cookieName: SessionTypes.USER_SESSION})

    session.destroy()

    return true;
}

export async function getSession(): Promise<IronSession<object>>{
    const session = await getIronSession(await cookies(), { password: PASSWORD, cookieName: SessionTypes.USER_SESSION})
    return session;
}

export async function isAuthorized(): Promise<boolean>{
    const session = await getSession();

    return session.user ? true : false
}