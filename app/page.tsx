import { Suspense } from "react";
import { cookies } from "next/headers";
import { connection } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { logout } from "@/app/auth/actions";

import { Loading } from "@/components/ui/Loading";
import { Button } from "@/components/ui/button";

async function UserBar() {
  await connection();
  const supabase = createClient(await cookies());
  const { data } = await supabase.auth.getClaims();

  return (
    <header className="flex items-center justify-between border-b p-4">
      <span className="text-sm">{data?.claims?.email}</span>
      <form action={logout}>
        <Button type="submit" variant="outline" size="sm">Выйти</Button>
      </form>
    </header>
  );
}

export default function Page() {
  return (
    <>
      <Suspense fallback={<Loading/>}>
        <UserBar />
      </Suspense>
    </>
  );
}
