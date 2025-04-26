"use client";

import { login } from "@/server-actions/userActions";
import Image from "next/image";
import { useActionState } from "react";

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, null);


  return (
    <div className="relative flex min-h-screen items-center justify-center bg-blue-50 overflow-hidden">
      <div className="absolute top-0 right-0 h-full w-1/2 bg-gradient-to-tr from-blue-50 via-blue-100 to-transparent pointer-events-none z-0" />

      <div className="absolute top-4 left-6 font-semibold text-gray-900">
        BSOFTWARES
      </div>

      <div className="flex flex-col z-10 md:flex-row items-center justify-center  w-full max-w-6xl px-4 ">
        <div className=" bg-white rounded-lg shadow-md p-8 w-full max-w-sm border border-gray-300">
          <div className=" flex items-center justify-center mb-5">
          <Image
            src="/logo.PNG"
            alt="Next.js logo"
            width={90}
            height={19}
            priority
          />
          </div>
          <hr />
          <h2 className="text-gray-900 text-center text-md font-semibold mb-4 mt-4">
            Acesse a sua conta
          </h2>
          <hr />
          <form action={action} className="space-y-6 mt-10">
            <div>
              <label
                htmlFor="email"
                className="block text-sm mb-1 text-gray-900"
              >
                E-mail
              </label>
              <input
                type="email"
                id="email"
                 name="email"
                className="w-full border border-gray-300 rounded px-3 py-2 text-black"
              />
              {state?.error?.email && (
                <p className="text-red-500">{state.error.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm mb-1 text-gray-900"
              >
                Senha
              </label>
              <input
                type="password"
                id="password"
                 name="password"
                className="w-full border border-gray-300 rounded text-black px-3 py-2"
              />
            </div>

            <button
              disabled={pending}
              type="submit"
              className="w-full cursor-pointer text-sm  hover:bg-blue-100 text-black font-semibold border border-gray-400 py-2 px-4 rounded"
            >
              {pending ? "Entrando..." : "Entrar"}
            </button>
            {state?.error?.global && (
              <p className="text-red-500">{state.error.global}</p>
            )}
          </form>
        </div>

      </div>

      <footer className="absolute bottom-4 text-center text-xs text-gray-700 w-full">
        <p>© 2025 BSoftwares Technologies, Inc.</p>
        <p className="space-x-2">
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <span>|</span>
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
        </p>
      </footer>
    </div>
  );
}
