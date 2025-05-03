"use client";
import CreateLinkModal from "@/components/createLink";
import FilterDropdown from "@/components/filterDropdown";
import { useState, useEffect } from "react";
import WorkspaceSettings from "./components/setting/setting";
import Sidebar from "./components/sidebar/sidebar";
import { LinkItem } from "./components/links/links";
import { UrlData } from "../types/urlData";
import { Analytics } from "./components/analytics/analytics";
import { UpdateLink } from "@/components/updateLink";

export default function Dashboard() {
  const [urls, setUrls] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [active, setActive] = useState("Links");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatingUrl, setUpdatingUrl] = useState<UrlData | null>(null);

  async function loadProfile() {
    try {
      const res = await fetch("/api/profile");
      if (!res.ok) {
        console.error("Erro ao carregar perfil:", res.statusText);
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        console.error("Resposta não é JSON:", text);
        throw new Error("Resposta não é JSON");
      }

      const data = await res.json();
      setProfile(data);
    } catch (error) {
      console.error("Erro ao carregar perfil:", error);
    }
  }

  async function loadUrls() {
    try {
      const res = await fetch("/api/urls");
      if (!res.ok) {
        console.error("Erro ao carregar as urls:", res.statusText);
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        console.error("Resposta não é JSON:", text);
        throw new Error("Resposta não é JSON");
      }

      const data = await res.json();
      setUrls(data);
      console.log("Urls:", data);
    } catch (error) {
      console.error("Erro ao carregar perfil:", error);
    }
  }

  useEffect(() => {
    loadProfile();
    loadUrls();
  }, []);

  function handleDelete(url: UrlData) {
    console.log("Deletando", url);
  }

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <Sidebar
        active={active}
        setActive={setActive}
        workspaceName={profile?.workspaces?.[0]?.name}
      />

      {/* Conteúdo principal */}
      {active === "Links" && (
        <main className="flex-1 p-9">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Urls</h2>
          </div>

          <div className="flex justify-between mb-4">
            <div className="flex items-center gap-2">
              <FilterDropdown />
            </div>
            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="Procurar..."
                className="px-4 py-2 text-sm border rounded-md w-64"
              />
              <div>
                <button
                  className="px-4 py-2 bg-black text-white rounded-md text-sm cursor-pointer"
                  onClick={() => setIsModalOpen(true)}
                >
                  Criar Link
                </button>
                {isModalOpen && (
                  <CreateLinkModal onClose={() => setIsModalOpen(false)} />
                )}
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow-sm space-y-4">
            {urls.map((url) => (
              <LinkItem
                key={url.id}
                url={url}
                onEdit={() => setUpdatingUrl(url)}
                onDelete={() => handleDelete(url)}
              />
            ))}
          </div>
        </main>
      )}
      {active === "Analytics" && <Analytics />}

      {active === "Settings" && <WorkspaceSettings />}

      {updatingUrl && (
        <UpdateLink
          url={updatingUrl}
          isOpen={true}
          onClose={() => {
            setUpdatingUrl(null);
            loadUrls();
          }}
        />
      )}
    </div>
  );
}
