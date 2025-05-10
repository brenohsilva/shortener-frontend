import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const cookie = {
  name: "session",
  options: { httpOnly: true, secure: true, path: "/" },
  duration: 24 * 60 * 60 * 1000, // 24 hours
};


export async function createSession(acessToken: string) {
  const expires = new Date(Date.now() + cookie.duration);
  const cookieStore = await cookies();
  cookieStore.set(cookie.name, acessToken, { ...cookie.options, expires });
}

export async function verifySession() {
  const cookieStore = await cookies();
  const session = cookieStore.get(cookie.name);
  if (!session) {
    redirect("/auth/login");
  }

  const token = session.value;

 return {access_token: token}
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(cookie.name);
  redirect("/auth/login");
}
