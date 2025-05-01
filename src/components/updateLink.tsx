import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { UrlData } from "@/app/types/urlData";

interface UpdateLinkProps {
  url: UrlData;
  isOpen: boolean;
  onClose: () => void;
}

export function UpdateLink({ url, isOpen, onClose }: UpdateLinkProps) {
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

            <div>
              <label className="text-sm font-medium text-gray-700">Tags</label>
              <input
                type="text"
                placeholder="Adicionar tags"
                className="mt-1 p-2 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Comments
              </label>
              <textarea
                placeholder="Adicionar comentários"
                className="mt-1 w-full rounded-md p-2 text-sm border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={3}
              />
            </div>

            <div className="flex justify-end">
                <button className="border p-2 border-gray-300 rounded-md bg-blue-600 text-white text-xs"> Salvar alterações</button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
