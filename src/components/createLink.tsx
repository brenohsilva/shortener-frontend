import { useActionState, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createUrlAuthenticated } from "@/server-actions/urlActions";
import { Badge } from "./ui/badge";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Check, Plus, X } from "lucide-react";

type CreateLinkModalProps = {
  open: boolean;
  onClose: () => void;
};

type Tag = {
  id: number;
  name: string;
};

export default function CreateLinkModal({
  open,
  onClose,
}: CreateLinkModalProps) {
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [state, action, pending] = useActionState(
    createUrlAuthenticated,
    null
  );

  const allTags: Tag[] = [
    { id: 1, name: "Marketing" },
    { id: 2, name: "Produto" },
    { id: 3, name: "Interno" },
  ];

  const toggleTag = (tag: Tag) => {
    if (selectedTags.find((t) => t.id === tag.id)) {
      setSelectedTags(selectedTags.filter((t) => t.id !== tag.id));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="flex items-center gap-2 text-md font-medium">
              🌐 Novo link
            </DialogTitle>
          </div>
        </DialogHeader>

        <form className="space-y-4" action={action}>
          {/* Destination URL */}
          <div>
            <label className="text-sm font-medium">URL de destino</label>
            <Input
              type="text"
              name="origin_url"
              placeholder="https://example.com"
              className="mt-1"
            />
          </div>

          {/* Short Link */}
          <div>
            <label className="text-sm font-medium">Url encurtada</label>
            <div className="flex items-center gap-2 mt-1">
              <select className="border px-2 py-2 text-sm">
                <option>utiny.sh</option>
              </select>
              <Input type="text" name="short_code" placeholder="Code" />
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
                placeholder="Buscar ou criar tags..."
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
                          setQuery("");
                        }}
                      >
                        <Plus className="mr-2 h-4 w-4" /> Criar "{query}"
                      </CommandItem>
                    )}
                </CommandGroup>
              </CommandList>
            </Command>
          </div>

          {/* Renderizar os inputs hidden */}
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
            <label className="text-sm font-medium">Comments</label>
            <Textarea
              name="comments"
              rows={3}
              className="mt-1"
              placeholder="Adicionar comentários..."
            />
          </div>

          {state?.error?.comments && (
            <div className="text-red-500 text-sm">{state.error.comments}</div>
          )}
          {state?.success && (
            <div className="text-green-500 text-sm">
              Link criado com sucesso!
            </div>
          )}

          <DialogFooter className="mt-6">
            <Button
              type="submit"
              className="bg-black text-white"
              disabled={pending}
            >
              {pending ? "Criando..." : "Criar link"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
