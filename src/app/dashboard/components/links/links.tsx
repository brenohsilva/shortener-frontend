import { useState, useRef } from "react";
import { Edit3, Copy, Trash2, MessageCircle } from "lucide-react";
import { UrlData } from "@/app/types/urlData";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
} from "@radix-ui/react-tooltip";

import { toast } from "sonner";

interface LinkItemProps {
  url: UrlData;
  onEdit: () => void;
  onCopy: () => void;
  onDelete: () => void;
}

export function LinkItem({ url, onEdit, onCopy, onDelete }: LinkItemProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const handleCopyShortUrl = () => {
    navigator.clipboard
      .writeText(url.shorten_url)
      .then(() => {
        toast.success("Link copiado");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="flex justify-between items-center border border-gray-300 p-2 rounded-md relative">
      <div>
        <div className="flex items-center gap-2">
          <a
            href={url.shorten_url}
            className="text-blue-600 font-medium text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            {url.shorten_url.replace(/^https?:\/\//, "")}
          </a>
          <button
            onClick={handleCopyShortUrl}
            className="cursor-pointer p-1 rounded-full hover:bg-gray-100"
          >
            <Copy size={10} />
          </button>
          {url.comments && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <MessageCircle size={10} />
                </TooltipTrigger>
                <TooltipContent className="bg-gray-800 text-white text-xs p-2 rounded-md">
                  <p>{url.comments}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <p className="text-sm text-gray-600 truncate max-w-md">
          {url.origin_url}
        </p>
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-500 relative">
        {url.tags.map((tag) => (
          <span
            key={tag.id}
            className="inline-block bg-blue-300 text-blue-700 text-xs px-2 py-1 rounded-md"
          >
            {tag.name}
          </span>
        ))}
        <span>
          {new Date(url.created_at).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
          })}
        </span>
        <span>{url._count.clicks} clicks</span>

        <div className="relative inline-block text-left">
          <div>
            <button
              type="button"
              className="inline-flex justify-center rounded-md px-2 py-1 text-sm font-semibold text-gray-900 hover:bg-gray-100"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              ⋯
            </button>
          </div>

          {menuOpen && (
            <div
              ref={menuRef}
              className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
            >
              <div className="py-1">
                <button
                  className="flex w-full items-center gap-2 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    onEdit();
                    setMenuOpen(false);
                  }}
                >
                  <Edit3 size={14} /> Editar
                </button>
                <button
                  className="flex w-full items-center gap-2 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                  onClick={() => {
                    onDelete();
                    setMenuOpen(false);
                  }}
                >
                  <Trash2 size={14} /> Deletar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
