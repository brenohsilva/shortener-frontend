"use client";
import CreateLinkModal from "@/components/createLink";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import WorkspaceSettings from "./components/setting/setting";
import Sidebar from "./components/sidebar/sidebar";
import { LinkItem } from "./components/links/links";
import { UrlData } from "../types/urlData";
import { Analytics } from "./components/analytics/analytics";
import { UpdateLink } from "@/components/updateLink";
import { DeleteLink } from "@/components/deleteLink";
import EmptyLinks from "@/components/emptyLinks";
import { Button } from "@/components/ui/button";
import { getClientUrls, getUserTags } from "@/server-actions/urlActions";
import { myProfile } from "@/server-actions/userActions";

export default function Dashboard() {
  const [urls, setUrls] = useState<UrlData[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [active, setActive] = useState("Links");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatingUrl, setUpdatingUrl] = useState<UrlData | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState<UrlData | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [error, setError] = useState(null || "");

  async function loadUrls(tag?: string) {
    try {
      const data = await getClientUrls(tag);
      setUrls(data);
    } catch (error) {
      console.error(error);
      setError("Erro ao buscar os dados.");
    }
  }

  async function handleDelete(url: UrlData) {
    try {
      const res = await fetch("/api/urls", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: url.id }),
      });

      if (!res.ok) throw new Error("Erro ao deletar URL");

      loadUrls(selectedTag ?? undefined);
    } catch (error) {
      console.error("Erro ao deletar URL:", error);
      alert("Ocorreu um erro ao deletar a URL");
    }
  }

  useEffect(() => {
    async function fetchTags() {
      try {
        const response = await getUserTags();
        const tagNames = response.data.map((tag: { name: string }) => tag.name);
        setAvailableTags(tagNames);
      } catch (error) {
        console.error(error);
        setError("Erro ao buscar os dados.");
      }
    }
    fetchTags();
  }, []);

  useEffect(() => {
    loadUrls(selectedTag ?? undefined);
  }, [selectedTag]);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await myProfile();
        setProfile(data);
      } catch (error) {
        console.error(error);
        setError("Erro ao buscar os dados.");
      }
    }
    fetchProfile();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <Sidebar
        active={active}
        setActive={setActive}
        workspaceName={profile?.workspaces?.[0]?.name}
      />

      {active === "Links" && (
        <main className="flex-1 p-9">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Urls</h2>
          </div>

          <div className="flex justify-between mb-4">
            <div className="flex items-center gap-4">
              {/* Dropdown para filtrar por tag */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="text-gray-500" variant="outline">
                    {selectedTag ? `Tag: ${selectedTag}` : "Filtrar por Tag"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {availableTags.map((tag) => (
                    <DropdownMenuItem
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                    >
                      {tag}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuItem className="font-bold" onClick={() => setSelectedTag(null)}>
                    Limpar filtro
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <input
                type="text"
                placeholder="Procurar..."
                className="px-4 py-2 text-sm border rounded-md w-64"
              />

              <Button
               
                onClick={() => setIsModalOpen(true)}
              >
                Criar Link
              </Button>
              {isModalOpen && (
                <CreateLinkModal
                  open={isModalOpen}
                  onClose={() => {
                    setIsModalOpen(false);
                    loadUrls(selectedTag ?? undefined);
                  }}
                />
              )}
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow-sm space-y-4">
            {urls.length === 0 ? (
              <EmptyLinks />
            ) : (
              urls.map((url) => (
                <LinkItem
                  key={url.id}
                  url={url}
                  onEdit={() => setUpdatingUrl(url)}
                  onDelete={() => {
                    setSelectedUrl(url);
                    setIsDeleteOpen(true);
                  }}
                />
              ))
            )}
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
            loadUrls(selectedTag ?? undefined);
          }}
        />
      )}

      {selectedUrl && (
        <DeleteLink
          open={isDeleteOpen}
          onOpenChange={setIsDeleteOpen}
          url={selectedUrl}
          onDeleteConfirm={async () => {
            await handleDelete(selectedUrl);
            setSelectedUrl(null);
          }}
        />
      )}
    </div>
  );
}
