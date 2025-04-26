"use client";
import { createUrl } from "@/server-actions/urlActions";
import { useActionState, useEffect, useState } from "react";

import Link from "next/link";

export default function Home() {
  const [state, action, pending] = useActionState(createUrl, null);
  const [minutesLeft, setMinutesLeft] = useState<number | null>(null);

  const calculateMinutesLeft = (expiresAt: string | null) => {
    if (!expiresAt) return null;
    const expires = new Date(expiresAt).getTime();
    const now = new Date().getTime();
    const diff = expires - now;
    return Math.max(Math.floor(diff / 1000 / 60), 0);
  };

  useEffect(() => {
    if (!state?.expires_at) return;

    setMinutesLeft(calculateMinutesLeft(state.expires_at));

    const interval = setInterval(() => {
      setMinutesLeft(calculateMinutesLeft(state.expires_at));
    }, 30_000);

    return () => clearInterval(interval);
  }, [state?.expires_at]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 text-gray-900">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4">
        <div className="text-xl font-bold">BSoftwares</div>

        <div className="flex gap-4">
          <Link href="/auth/login">
            <button className="px-4 py-2 text-sm rounded border cursor-pointer">
              Log in
            </button>
          </Link>
          <Link href="/auth/register">
            <button className="px-4 py-2 text-sm rounded bg-black text-white cursor-pointer">
              Cadastre-se
            </button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="flex flex-col items-center justify-center px-4 mt-20 text-center">
        <h1 className="text-4xl sm:text-5xl font-semibold max-w-3xl">
          Crie suas Urls encurtadas de maneira{" "}
          <span className="text-blue-600">eficiente</span>
        </h1>

        {/* Botões */}
        <div className="mt-6 flex gap-4 flex-col sm:flex-row">
          <button className="px-6 py-2 text-sm bg-black text-white rounded">
            Comece agora
          </button>
          <button className="px-6 py-2 text-sm bg-white border rounded">
            Teste agora mesmo
          </button>
        </div>

        {/* Input de encurtador */}
        <form
          action={action}
          className="relative mt-10 bg-blue-50 p-4 rounded-xl shadow-md w-full max-w-xl"
        >
          <input
            name="origin_url"
            type="text"
            placeholder="Encurte qualquer url..."
            className="w-full px-4 py-2 border border-gray-300 rounded text-sm"
          />
          <button
            disabled={pending}
            type="submit"
            className="absolute cursor-pointer right-6 top-[21px] bg-blue-500 text-white px-3 py-1 rounded text-sm"
          >
            {pending ? "Criando..." : "Criar"}
          </button>

          {/* Resultado simulado */}
          {state?.shorten_url && (
            <div className="mt-6 flex items-center border border-gray-300 justify-between bg-blue-50 p-3 rounded max-w-xl w-full">
              <div className="flex flex-col justify-start text-left">
                <a
                  href={state.shorten_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-blue-600 hover:underline"
                >
                  {state.shorten_url}
                </a>
                <a
                  href={state.origin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 hover:underline"
                >
                  {state.origin_url}
                </a>
              </div>
              <div className="text-xs text-gray-500 text-right">
                {minutesLeft !== null
                  ? `Expira em ${minutesLeft} minutos`
                  : "Sem tempo de expiração"}
              </div>
            </div>
          )}
        </form>
      </main>
    </div>
  );
}
