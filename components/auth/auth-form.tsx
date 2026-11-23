"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import type { AuthState } from "@/app/auth/actions";

const inputClass =
  "h-9 w-full rounded-md border bg-transparent px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function AuthForm({
  mode,
  action,
}: {
  mode: "login" | "signup";
  action: (prev: AuthState, formData: FormData) => Promise<AuthState>;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);
  const isLogin = mode === "login";

  return (
    <form action={formAction} className="flex w-full max-w-sm flex-col gap-4">
      <h1 className="text-2xl font-semibold">{isLogin ? "Вход" : "Регистрация"}</h1>

      <label className="flex flex-col gap-1 text-sm">
        Email
        <input name="email" type="email" required autoComplete="email" className={inputClass} />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Пароль
        <input
          name="password"
          type="password"
          required
          minLength={isLogin ? undefined : 8}
          autoComplete={isLogin ? "current-password" : "new-password"}
          className={inputClass}
        />
      </label>

      {state?.error && <p role="alert" className="text-sm text-red-600">{state.error}</p>}
      {state?.message && <p className="text-sm text-green-600">{state.message}</p>}

      <Button type="submit" disabled={pending}>
        {pending ? "Подождите…" : isLogin ? "Войти" : "Зарегистрироваться"}
      </Button>

      <p className="text-sm text-muted-foreground">
        {isLogin ? "Нет аккаунта? " : "Уже есть аккаунт? "}
        <Link href={isLogin ? "/signup" : "/login"} className="underline">
          {isLogin ? "Зарегистрироваться" : "Войти"}
        </Link>
      </p>
    </form>
  );
}
