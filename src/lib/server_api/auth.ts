"use server";

import Request from "@/utils/Request";
import { loginSession, logoutSession } from "@/utils/session";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const body = {
    email,
    password,
  };

  try {
    const response = await Request({
      url: process.env.BACKEND_HOST + "/api/auth/student/login",
      method: "POST",
      body: body,
    });
    await loginSession(response.data);
    return {
      status: true,
    };
  } catch (error: any) {
    const error_message = error.response?.data?.message || "Unable to login";
    return {
      status: false,
      message: error_message,
    };
  }
}

export async function logout() {
  await logoutSession();

  return true;
}
