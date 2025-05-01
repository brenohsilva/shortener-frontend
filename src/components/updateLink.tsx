import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { UrlData } from "@/app/types/urlData";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandInput,
} from "@/components/ui/command";
import { Check, Plus } from "lucide-react";
import { Textarea } from "./ui/textarea";

interface UpdateLinkProps {
  url: UrlData;
  isOpen: boolean;
  onClose: () => void;
}

const allTags = [
  { id: 5, name: "Tag1" },
  { id: 6, name: "Tag2" },
  { id: 7, name: "Tag3" },
];

export function UpdateLink({ url, isOpen, onClose }: UpdateLinkProps) {
  const [selectedTags, setSelectedTags] = useState(url.tags || []);
  const [query, setQuery] = useState("");

  const toggleTag = (tag: { id: number; name: string }) => {
    if (selectedTags.find((t) => t.id === tag.id)) {
      setSelectedTags(selectedTags.filter((t) => t.id !== tag.id));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 w-[90%] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg text-black">
          <div className="flex justify-between items-center mb-6">
            <Dialog.Title className="text-md font-bold">
              {url.shorten_url}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </Dialog.Close>
          </div>

          <div className="flex flex-col gap-8">
            {/* Destination URL */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Destination URL
              </label>
              <input
                type="text"
                value={url.origin_url}
                className="mt-1 w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                readOnly
              />
            </div>

            {/* Short Link */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Short Link
              </label>
              <div className="flex mt-1">
                <span className="flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-100 px-3 text-sm">
                  dub.sh
                </span>
                <input
                  disabled
                  type="text"
                  value={url.shorten_url.split("/").pop()}
                  className="w-full pl-2 rounded-r-md border-gray-300 text-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  readOnly
                />
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedTags.map((tag) => (
                  <Badge
                    key={tag.id}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => toggleTag(tag)}
                  >
                    {tag.name} <X className="ml-1 h-3 w-3" />
                  </Badge>
                ))}
              </div>

              <Command>
                <CommandInput
                  placeholder="Search or add tags..."
                  value={query}
                  onValueChange={setQuery}
                />
                <CommandList>
                  <CommandGroup>
                    {allTags
                      .filter((tag) =>
                        tag.name.toLowerCase().includes(query.toLowerCase())
                      )
                      .map((tag) => (
                        <CommandItem
                          key={tag.id}
                          onSelect={() => toggleTag(tag)}
                        >
                          <Check
                            className={`mr-2 h-4 w-4 ${
                              selectedTags.find((t) => t.id === tag.id)
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                          />
                          {tag.name}
                        </CommandItem>
                      ))}

                    {/* Nova tag */}
                    {!allTags.find(
                      (tag) => tag.name.toLowerCase() === query.toLowerCase()
                    ) &&
                      query.trim() !== "" && (
                        <CommandItem
                          onSelect={() => {
                            const newTag = {
                              id: Math.random(), // temp id local
                              name: query,
                            };
                            setSelectedTags([...selectedTags, newTag]);
                            // também adicione no allTags se quiser sugerir depois
                          }}
                        >
                          <Plus className="mr-2 h-4 w-4" /> Create "{query}"
                        </CommandItem>
                      )}
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>

            {/* Comments */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Comments
              </label>
              <Textarea
                
              />
            </div>

            <div className="flex justify-end">
              <button className="border p-2 border-gray-300 rounded-md bg-blue-600 text-white text-xs">
                Salvar alterações
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
