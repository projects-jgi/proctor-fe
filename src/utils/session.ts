'use server';

import { SessionTypes } from "@/types/users";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

const PASSWORD = "hR7Wcv5@W#C)rbU%2LZuR]-e:.gu7Rd+!pT?9a77Rj6Qecs0K12)g6Q8-4!40.:uH@RwRto_kFC_DYgk?D,DwCC4TDLppDZDqD7G"

export async function loginSession(data){
    const session = await getIronSession(await cookies(), { password: PASSWORD, cookieName: SessionTypes.USER_SESSION})
    session.token = data
    await session.save()

    return session
}