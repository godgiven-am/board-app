import { AuthForm } from "@/components/auth/auth-form";
import { login } from "@/app/auth/actions";

export default function LoginPage() {
  return (
    <main className="flex flex-1 items-center justify-center p-6">
      <AuthForm mode="login" action={login} />
    </main>
  );
}
