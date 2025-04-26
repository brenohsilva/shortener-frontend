"use client";
import { createUrl } from "@/server-actions/urlServices";
import { useState } from "react";
import { UrlData } from "../types/urlData";
import { useEffect } from "react";
import Link from "next/link";

const defaultUrlData: UrlData = {
  id: 0,
  users_id: null,
  workspaces_id: null,
  short_code: "",
  origin_url: "",
  shorten_url: "Utiny.com/FBgOlW",
  comments: null,
  created_at: "",
  update_at: "",
  deleted_at: null,
  expires_at: "",
};

export default function Home() {
  const [url, setUrl] = useState<UrlData>(defaultUrlData);
  const [inputUrl, setInputUrl] = useState("");
  const [minutesLeft, setMinutesLeft] = useState<number | null>(null);

  useEffect(() => {
    const updateTimeLeft = () => {
      if (!url.expires_at) {
        setMinutesLeft(null);
        return;
      }

      const expiresAt = new Date(url.expires_at).getTime();
      const now = new Date().getTime();
      const diff = expiresAt - now;

      const minutes = Math.max(Math.floor(diff / 1000 / 60), 0);
      setMinutesLeft(minutes);
    };

    updateTimeLeft();
    const interval = setInterval(updateTimeLeft, 10000);

    return () => clearInterval(interval);
  }, [url.expires_at]);

  const createUrls = async (url: string) => {
    try {
      const response = await createUrl(url);
      if (response) {
        console.log("URL created successfully:", response);
        setUrl(response);
        setInputUrl("");
      } else {
        console.error("Failed to create URL");
      }
    } catch (error) {
      console.error("Error creating URL:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 text-gray-900">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4">
        <div className="text-xl font-bold">BSoftwares</div>
        {/* <nav className="hidden md:flex gap-6 text-sm font-medium">
          <a href="#">Product</a>
          <a href="#">Solutions</a>
          <a href="#">Resources</a>
          <a href="#">Enterprise</a>
          <a href="#">Pricing</a>
        </nav> */}
        <div className="flex gap-4">
          <Link href="/auth/login">
            <button className="px-4 py-2 text-sm rounded border cursor-pointer">Log in</button>
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
        <div className="relative mt-10 bg-blue-50 p-4 rounded-xl shadow-md w-full max-w-xl">
          <input
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            type="text"
            placeholder="Encurte qualquer url..."
            className="w-full px-4 py-2 border border-gray-300 rounded text-sm"
          />
          <button
            onClick={() => createUrls(inputUrl)}
            className="absolute cursor-pointer right-6 top-5 bg-blue-500 text-white px-3 py-1 rounded text-sm"
          >
            Criar
          </button>

          {/* Resultado simulado */}
          <div className="mt-4 flex items-center border border-gray-300 justify-between bg-blue-50 p-3 rounded">
            <div className="flex flex-col justify-start">
              <a
                href={url.shorten_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-start text-blue-600 hover:underline"
              >
                {url.shorten_url}
              </a>
              <a
                href={url.origin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 hover:underline"
              >
                {url.origin_url}
              </a>
            </div>
            <div className="text-xs text-gray-500">
              {minutesLeft !== null
                ? `Expira em ${minutesLeft} minutos`
                : "Sem tempo de expiração"}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
