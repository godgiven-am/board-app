import { Suspense } from 'react';
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

async function TodoList() {

  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase.from('todos').select('*');

  if (error) {
    return <pre>Ошибка: {error.message}</pre>;
  }

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}


export default function Page() {
  return (
    <Suspense fallback={<p>Загрузка…</p>}>
      <TodoList />
    </Suspense>
  );
}
