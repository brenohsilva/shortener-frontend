"use client";

import { X } from "lucide-react";
import { UrlData } from "@/app/types/urlData";
import { useActionState, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandInput,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Check, Plus } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { updateUrl } from "@/server-actions/urlActions";

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
  const [originUrl, setOriginUrl] = useState(url.origin_url || "");
  const [comments, setComments] = useState(url.comments || "");
  const [selectedTags, setSelectedTags] = useState(url.tags || []);
  const [query, setQuery] = useState("");
  const [state, action, pending] = useActionState(
    (prevState, formData) => updateUrl(url.id, state, formData),
    null
  );

  const toggleTag = (tag: { id: number; name: string }) => {
    if (selectedTags.find((t) => t.id === tag.id)) {
      setSelectedTags(selectedTags.filter((t) => t.id !== tag.id));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{url.shorten_url}</DialogTitle>
          
        </DialogHeader>

        <form action={action} className="flex flex-col gap-8 mt-6">
          {/* Destination URL */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Destination URL
            </label>
            <input
              name="origin_url"
              type="text"
              value={originUrl}
              onChange={(e) => setOriginUrl(e.target.value)}
              className="mt-1 w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                      <CommandItem key={tag.id} onSelect={() => toggleTag(tag)}>
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

                  {!allTags.find(
                    (tag) => tag.name.toLowerCase() === query.toLowerCase()
                  ) &&
                    query.trim() !== "" && (
                      <CommandItem
                        onSelect={() => {
                          const newTag = {
                            id: Math.random(),
                            name: query,
                          };
                          setSelectedTags([...selectedTags, newTag]);
                        }}
                      >
                        <Plus className="mr-2 h-4 w-4" /> Create "{query}"
                      </CommandItem>
                    )}
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
          {selectedTags.map((tag) => (
            <input
              key={`hidden-${tag.id}`}
              type="hidden"
              name="tags"
              value={tag.name}
            />
          ))}

          {/* Comments */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Comments
            </label>
            <Textarea name="comments" onChange={(e) => setComments(e.target.value)} value={comments || ""} />
          </div>

          <DialogFooter>
            <button
              disabled={pending}
              className="border p-2 border-gray-300 rounded-md bg-blue-600 text-white text-xs"
            >
              {pending ? "Salvando..." : "Salvar Alterações"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
