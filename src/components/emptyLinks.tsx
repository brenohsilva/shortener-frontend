import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LucideLink } from "lucide-react";

export default function EmptyLinks() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6">
    
      <div className="space-y-4 mb-8 w-full max-w-sm">
        {[1].map((item) => (
          <Card key={item} className="flex items-center p-4 space-x-4">
            <LucideLink className="w-5 h-5 text-gray-400" />
            <div className="flex-1 h-3 bg-gray-200 rounded" />
            <LucideLink className="w-4 h-4 text-gray-400" />
          </Card>
        ))}
      </div>

     
      <div className="text-center mb-6">
        <h2 className="text-lg font-semibold mb-2">Ainda sem links</h2>
        <p className="text-sm text-gray-500 max-w-xs">
          Comece criando suas urls para seu marketing, campanhas e muito mais.
        </p>
      </div>

    </div>
  );
}
