"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export type AuthState = { error?: string; message?: string } | undefined;

const MIN_PASSWORD_LENGTH = 8;

function readCredentials(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  return { email, password };
}

export async function login(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const { email, password } = readCredentials(formData);
  if (!email || !password) return { error: "Введите email и пароль" };

  const supabase = createClient(await cookies());
  // On success @supabase/ssr stores the JWT access + refresh tokens in cookies.
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: "Неверный email или пароль" };

  redirect("/");
}

export async function signup(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const { email, password } = readCredentials(formData);
  if (!email || !password) return { error: "Введите email и пароль" };
  if (password.length < MIN_PASSWORD_LENGTH) {
    return { error: `Пароль должен быть не короче ${MIN_PASSWORD_LENGTH} символов` };
  }

  const supabase = createClient(await cookies());
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) return { error: error.message };

  // With email confirmations enabled Supabase returns no session until the link is clicked.
  if (!data.session) {
    return { message: "Проверьте почту и подтвердите email, чтобы войти" };
  }

  redirect("/");
}

export async function logout() {
  const supabase = createClient(await cookies());
  await supabase.auth.signOut();
  redirect("/login");
}
