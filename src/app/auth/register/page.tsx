"use client";

import Image from "next/image";
import { register } from "@/server-actions/userActions";
import { useActionState, useEffect, useState } from "react";
import CreateWorkspace from "@/components/createWorkspace";

export default function RegisterPage() {
  const [state, action, pending] = useActionState(register, null);
  const [step, setStep] = useState<"register" | "workspace">("register");

  useEffect(() => {
    if (state && !state.error) {
      setStep("workspace");
    }
  }, [state]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-pink-50">
      <div className="absolute top-4 left-6 font-semibold text-gray-900">
        BSOFTWARES
      </div>

      {step === "register" ? (
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl px-4 ">
          <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-sm border">
            <h2 className="text-gray-900 text-center text-md font-semibold mb-4">
              Crie sua conta agora mesmo
            </h2>
            <hr />
            <form action={action} className="space-y-6 mt-10">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm mb-1 text-gray-900"
                >
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-black"
                />
                {state?.error?.name && (
                  <p className="text-red-500">{state.error.name}</p>
                )}
              </div>

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
                {state?.error?.password && (
                  <p className="text-red-500">{state.error.password}</p>
                )}
              </div>

              <button
                disabled={pending}
                type="submit"
                className="w-full cursor-pointer text-sm  hover:bg-blue-100 text-black font-semibold border border-gray-400 py-2 px-4 rounded"
              >
                {pending ? "Cadastrando..." : "Cadastrar"}
              </button>
              {state?.error?.global && (
                <p className="text-red-500">{state.error.global}</p>
              )}
            </form>
          </div>

          <div className="ml-12 h-1/2 w-[140%] rounded-xl border border-neutral-200 p-2 shadow-xl">
            <Image
              width={2400}
              height={1260}
              src="/dub.jpg"
              alt="Dashboard Preview"
              className="rounded-xl shadow-md max-w-full"
            />
          </div>
        </div>
      ) : (
        <CreateWorkspace />
      )}

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
