"use client";

import { client } from "@/lib/hono/rpc";

export default function Home() {
  const onClick = async () => {
    try {
      const response = await client.api.users[":id"].$get({
        param: {
          id: "123",
        },
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={onClick}
        >
          fetch user
        </button>
      </main>
    </div>
  );
}
