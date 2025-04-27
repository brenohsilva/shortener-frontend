"use client";
import { FiLink, FiBarChart2, FiSettings } from "react-icons/fi";

interface SidebarProps {
  active: string;
  setActive: (active: string) => void;
  workspaceName?: string;
}

export default function Sidebar({
  active,
  setActive,
  workspaceName,
}: SidebarProps) {
  return (
    <aside className="w-60 bg-blue-50 border-r border-gray-200 p-4 flex flex-col justify-between">
      <div>
        <h1 className="text-lg font-bold">BSoftwares</h1>

        <div className="mb-6 mt-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
              B
            </div>
            <div>
              <p className="font-semibold text-xs">
                {workspaceName || "My Workspace"}
              </p>
              <p className="text-xs text-gray-500">Free</p>
            </div>
          </div>

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
  );
}
