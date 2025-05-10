import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import Image from "next/image";
import { createWorkspace } from "@/server-actions/userActions";

export default function CreateWorkspace() {
   const [state, action, pending] = useActionState(createWorkspace, null);

  return (
    <div className="flex justify-center items-center min-h-screen bg-pink-50 p-4">
      <div className="bg-pink-50 rounded-2xl shadow-lg w-full max-w-md p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/logo.PNG"
            alt="Next.js logo"
            width={80}
            height={9}
            priority
          />
        </div>

        {/* Title */}
        <h2 className="text-center text-xl font-semibold mb-1">
          Criar um workspace
        </h2>
        <p className="text-center text-xs text-gray-500 underline mb-6 cursor-pointer">
         O que é um workspace?
        </p>

        {/* Form */}
        <form action={action} className="space-y-4 ">
          {/* Workspace Name */}
          <div>
            <label className="text-sm font-medium flex items-center gap-1 mb-1">
              Nome do workspace
              <span
                className="text-gray-400 cursor-pointer"
                title="This is the name of your workspace."
              >
                ?
              </span>
            </label>
            <Input
              type="text"
              placeholder="MyWorkspace"
              name='workspace'
            />
             {state?.error?.workspace && (
                  <p className="text-red-500">{state.error.workspace}</p>
                )}
          </div>

          {/* Workspace Slug */}
          <div>
            <label className="text-sm font-medium flex items-center gap-1 mb-1">
              Slug do workspace
              <span
                className="text-gray-400 cursor-pointer"
                title="This is the URL slug."
              >
                ?
              </span>
            </label>
            <div className="flex">
              <div className="flex items-center px-3 rounded-l-md border border-gray-300 text-sm bg-gray-100 text-gray-500">
                app.dub.co
              </div>
              <Input
                type="text"
                placeholder="acme"
                name='slug'
                className="rounded-l-none"
              />
               {state?.error?.slug && (
                  <p className="text-red-500">{state.error.slug}</p>
                )}
            </div>
          </div>

          {/* Button */}
          <Button  disabled={pending} className="w-full bg-blue-600 text-white mt-4 hover:bg-gray-900">
          {pending ? "Criando..." : "Criar workspace"}
          </Button>
        </form>
      </div>
    </div>
  );
}
