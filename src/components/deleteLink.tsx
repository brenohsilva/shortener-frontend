import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollText, Trash2 } from "lucide-react";

interface DeleteLinkProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  url: { id: number; shorten_url: string; origin_url: string };
  onDeleteConfirm: () => void;
}

export function DeleteLink({
  open,
  onOpenChange,
  url,
  onDeleteConfirm,
}: DeleteLinkProps) {
  const [verifyText, setVerifyText] = useState("");
  const isVerified = verifyText.trim() === url.shorten_url;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px] rounded-2xl overflow-hidden">
        <DialogHeader>
          <DialogTitle>Delete link</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <p className="text-xs">
           Você tem certeza de que quer apagar essa url? <br />
            
          </p>

          <div className="flex items-center gap-3 p-3 border rounded-lg overflow-hidden bg-background">
            <ScrollText className="w-6 h-6 text-red-500 shrink-0" />
            <div className="flex flex-col min-w-0">
              <span className="font-medium truncate">{url.shorten_url}</span>
              {/* <span className="text-sm text-muted-foreground truncate">
                {url.origin_url}
              </span> */}
            </div>
          </div>

          <div className="space-y-3 text-gray-800">
            <Label htmlFor="verify">
             Para verificar, digite<p className="font-bold m-0 p-0">{url.shorten_url}</p>abaixo:
            </Label>
            <Input
              id="verify"
              value={verifyText}
              onChange={(e) => setVerifyText(e.target.value)}
              placeholder={url.shorten_url}
            />
          </div>
        </div>

        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              onDeleteConfirm();
              onOpenChange(false);
            }}
            disabled={!isVerified}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete link
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
