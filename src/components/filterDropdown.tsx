import { useState } from "react";
import { FiChevronRight, FiX } from "react-icons/fi";

export default function FilterDropdown() {
  const [showMenu, setShowMenu] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
    setShowMenu(false);
    setShowTags(false);
  };

  const clearFilter = () => {
    setSelectedTag(null);
  };

  return (
    <div className="relative">
      {/* Botão de Filter */}
      <button
        onClick={() => {
          setShowMenu(!showMenu);
          setShowTags(false);
        }}
        className="border px-3 py-1 rounded text-sm flex items-center gap-1"
      >
        Filter
      </button>

      {/* Dropdown principal */}
      {showMenu && (
        <div className="absolute left-0 mt-2 w-40 bg-white border rounded shadow-md text-sm z-10">
          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center"
            onClick={() => setShowTags(!showTags)}
          >
            Tags <FiChevronRight />
          </button>

          {/* Submenu de Tags */}
          {showTags && (
            <div className="absolute left-full top-0 ml-1 w-40 bg-white border rounded shadow text-sm z-20">
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleTagClick("Marketing")}
              >
                Marketing
              </div>
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleTagClick("Produto")}
              >
                Produto
              </div>
            </div>
          )}
        </div>
      )}

      {/* Filtro selecionado */}
      {selectedTag && (
        <div className="mt-3 border rounded px-3 py-2 text-sm inline-block bg-gray-100">
          <span className="text-gray-600 font-medium "> Tags </span>{" "}
          <span> of </span>
          <span className="font-semibold text-gray-800">{selectedTag}</span>
          <button
            onClick={clearFilter}
            className="text-gray-500 hover:text-red-600 ml-1 cursor-pointer"
            title="Remover filtro"
          >
            <FiX />
          </button>
        </div>
      )}
    </div>
  );
}
