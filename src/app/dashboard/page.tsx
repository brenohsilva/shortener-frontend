"use client";
import CreateLinkModal from "@/components/createLink";
import FilterDropdown from "@/components/filterDropdown";
import { useState, useRef, useEffect } from "react";
import { FiLink, FiBarChart2, FiSettings } from "react-icons/fi";
import { Edit3, Copy, Trash2 } from "lucide-react";
import ClicksChart from "../../components/lineCharts";
import WorkspaceSettings from "./components/setting/setting";

export default function Dashboard() {
  const menuRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState("Links");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const handleCopy = () => {
    navigator.clipboard.writeText("https://dub.sh/l7JmKzs");
    alert("Link copiado!");
    setMenuOpen(false);
  };

  const handleDelete = () => {
    alert("Deletar link?");
    setMenuOpen(false);
  };

  const handleEdit = () => {
    alert("Abrir modal de edição...");
    setMenuOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <aside className="w-60 bg-blue-50 border-r border-gray-200 p-4 flex flex-col justify-between">
        <div>
          <h1 className="text-lg font-bold">BSoftwares</h1>

          <div className="mb-6 mt-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                B
              </div>
              <div>
                <p className="font-medium text-sm">bcprodutos</p>
                <p className="text-xs text-gray-500">Free</p>
              </div>
            </div>

            {/* Menu */}
            <nav className="space-y-2 text-sm">
              {[
                { label: "Links", icon: <FiLink /> },
                { label: "Analytics", icon: <FiBarChart2 /> },
                { label: "Settings", icon: <FiSettings /> },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => setActive(item.label)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md w-full text-left border border-blue-100 rounded-r-sm ${
                    active === item.label
                      ? "bg-blue-50 text-blue-600"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </aside>
      {/* Conteúdo principal */}

      { active === 'Links' && <main className="flex-1 p-9">
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
          <div className="flex justify-between items-center">
            <div>
              <a href="#" className="text-blue-600 font-medium text-sm">
                dub.sh/l7JmKzs
              </a>
              <p className="text-sm text-gray-600 truncate max-w-md">
                pichau.com.br/gabinete-gamer-acegeek-aviator-mini-tower-lateral-de-acrilico...
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>Apr 7</span>
              <span>1 clicks</span>
              <button
                className="text-xl px-2"
                onClick={() => setMenuOpen((prev) => !prev)}
              >
                ⋯
              </button>
              {menuOpen && (
                <div
                  ref={menuRef}
                  className="absolute mt-32 w-40 bg-white border rounded shadow-md z-10"
                >
                  <button
                    className="w-full flex items-center gap-2 text-left px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={handleEdit}
                  >
                    <Edit3 size={16} /> Editar
                  </button>
                  <button
                    className="w-full flex items-center gap-2 text-left px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={handleCopy}
                  >
                    <Copy size={16} /> Copiar
                  </button>
                  <button
                    className="w-full flex items-center gap-2 text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    onClick={handleDelete}
                  >
                    <Trash2 size={16} /> Deletar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>}

      { active === 'Analytics' && <main className="flex-1 p-9">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Analises</h2>
        </div>

        <div className="flex justify-start mb-4">
          <div className="flex items-center gap-2">
            <FilterDropdown />
            <div className=" px-2 py-1  border rounded">
              <span className="text-sm text-gray-800">Ultimos 30 dias</span>
            </div>
          </div>
        </div>

        <div className=" p-4 rounded-md border border-gray-200">
          <div className="flex flex-col gap-2">
            <strong>Clicks</strong>
            <span>1</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow-sm space-y-4">
          <ClicksChart />
        </div>
      </main>}
      {active === 'Settings' && <WorkspaceSettings/>}
    </div>
  );
}
