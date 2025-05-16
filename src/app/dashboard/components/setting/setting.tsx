import { UserProfile } from "@/app/types/profileData";
import { Button } from "@/components/ui/button";
import {
  myProfile,
  updateWorkspaceName,
  updateWorkspaceSlug,
} from "@/server-actions/userActions";
import React, { useEffect, useState } from "react";

export default function WorkspaceSettings() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [workspaceName, setWorkspaceName] = useState("");
  const [workspaceSlug, setWorkspaceSlug] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      try {
        const profileData = await myProfile();
        setProfile(profileData);
        setWorkspaceName(profileData.workspaces?.[0]?.name || "");
        setWorkspaceSlug(profileData.workspaces?.[0]?.slug || "");
      } catch (error) {
        console.error(error);
        setError("Erro ao buscar os dados.");
      }
    }
    fetchProfile();
  }, []);

  const handleSaveChanges = async (section: "name" | "slug") => {
    try {
      if (section === "name") {
        // Exemplo: envia o novo nome
        await updateWorkspaceName(workspaceName);
      } else if (section === "slug") {
        const workspaceId = profile?.workspaces?.[0]?.id;
        if (!workspaceId) {
          setError("ID do workspace não encontrado.");
          return;
        }
        await updateWorkspaceSlug(workspaceId, workspaceSlug);
      }
      alert("Alterações salvas com sucesso!");
    } catch (error) {
      console.error(error);
      setError("Erro ao salvar alterações.");
    }
  };

  return (
    <div className="w-full p-6 space-y-8">
      {/* Workspace Name Section */}
      <div className="rounded-lg border border-gray-200 p-8">
        <div className="space-y-4">
          <div>
            <h2 className="text-md font-semibold text-gray-900">
              Nome do Workspace
            </h2>
            <p className="text-gray-500 mt-2">
              Esse é o nome do seu workspace no nosso site.
            </p>
          </div>

          <input
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
            maxLength={32}
            className="w-full  p-2 rounded border border-gray-200"
          />

          <div className="flex justify-between items-center pt-2">
            <span className="text-sm text-gray-500">
              Maximo de 32 caracteres.
            </span>
            <Button
              className=" border border-gray-200 p-2 rounded-md"
              onClick={() => handleSaveChanges("name")}
            >
              Salvar
            </Button>
          </div>
        </div>
      </div>

      {/* Workspace Slug Section */}
      <div className="rounded-lg border border-gray-200 p-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-md font-semibold text-gray-900">
              Slug do Workspace
            </h2>
            <p className="text-gray-500 mt-1">
              Esse é o slug do seu workspace no nosso site.
            </p>
          </div>

          <input
            value={workspaceSlug}
            onChange={(e) => setWorkspaceSlug(e.target.value)}
            maxLength={48}
            className="w-full  p-2 rounded-md border border-gray-200"
            pattern="[a-z0-9-]*"
          />

          <div className="flex justify-between items-center pt-2">
            <span className="text-sm text-gray-500">
              Apenas letras minúsculas, números e hifens são permitidos. Maximo
              de 48 caracteres.
            </span>
            <Button
              className=" bg border border-gray-200 p-2 rounded-md"
              onClick={() => handleSaveChanges("slug")}
            >
              Salvar
            </Button>
          </div>
        </div>
      </div>
      {/* Account delete Section */}
      <div className="rounded-lg border border-red-700 p-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-md font-semibold text-gray-900">
              Deletar sua conta
            </h2>
            <p className="text-gray-500 mt-3 text-sm">
              Deletar sua conta é uma ação irreversível. Você não poderá
              recuperar os dados depois de apagá-los.
            </p>
          </div>

          <div className="flex justify-end items-center pt-2">
            <Button
              className=" bg-red-500 border border-gray-200 p-2 rounded-md"
              onClick={() => handleSaveChanges("slug")}
            >
              Deletar conta
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
