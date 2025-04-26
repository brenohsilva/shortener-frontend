import { useState } from "react";
import { FiX } from "react-icons/fi";


export default function CreateLinkModal({ onClose }: { onClose: () => void }) {
  const [destinationUrl, setDestinationUrl] = useState("");
  const [shortCode, setShortCode] = useState("");

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg p-6 relative max-h-[90vh] overflow-y-auto">
        {/* Top bar */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-md font-medium flex items-center gap-2">
            🌐 Novo link
          </h2>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <button onClick={onClose}>
              <FiX className="text-xl" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 ">
          {/* Left */}
          <div className="space-y-4">
            {/* Destination URL */}
            <div>
              <label className="text-sm font-medium">URL de destino</label>
              <input
                type="text"
                value={destinationUrl}
                onChange={(e) => setDestinationUrl(e.target.value)}
                className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
                placeholder="https://example.com"
              />
            </div>

            {/* Short Link */}
            <div>
              <label className="text-sm font-medium">Url encurtada</label>
              <div className="flex items-center gap-2 mt-1">
                <select className="border px-2 py-2 rounded-md text-sm">
                  <option>utiny.sh</option>
                </select>
                <input
                  type="text"
                  value={shortCode}
                  onChange={(e) => setShortCode(e.target.value)}
                  className="flex-1 px-3 py-2 border rounded-md text-sm"
                  placeholder="Code"
                />
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="text-sm font-medium">Tags</label>
              <input
                type="text"
                className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
                placeholder="Criar tags..."
              />
            </div>

            {/* Comments */}
            <div>
              <label className="text-sm font-medium">Comments</label>
              <textarea
                className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
                rows={3}
                placeholder="Adicionar comentários..."
              />
            </div>

          </div>

        </div>

        <div className="flex justify-end items-center mt-6 text-sm">
          <button className="bg-black text-white px-5 py-2 rounded-md">
            Criar link 
          </button>
        </div>
      </div>
    </div>
  );
}
