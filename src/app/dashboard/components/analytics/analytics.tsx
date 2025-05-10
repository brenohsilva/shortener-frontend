"use client";

import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import ClicksChart from "@/components/lineCharts";
import { getUrlClicks } from "@/server-actions/urlActions";

export function Analytics() {
  const [clicksData, setClicksData] = useState<
    { time: string; clicks: number }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null || "");
  const [groupBy, setGroupBy] = useState<"hour" | "day">("hour");

  useEffect(() => {
    async function fetchClicks() {
      setIsLoading(true);
      try {
        const data = await getUrlClicks(groupBy);
        setClicksData(data);
      } catch (err) {
        console.error(err);
        setError("Erro ao buscar os dados.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchClicks();
  }, [groupBy]);

  return (
    <main className="flex-1 p-9">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Análises</h2>
      </div>

      <div className="flex justify-start mb-4">
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Filtrar por: {groupBy === "hour" ? "Hora" : "Dia"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => {
                  setGroupBy("hour");
                
                }}
              >
                Hora
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setGroupBy("day");
                 
                }}
              >
                Dia
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="px-2 py-1 border rounded">
            <span className="text-sm text-gray-800">
              {groupBy === "hour" ? "Últimas 24h" : "Últimos 7 dias"}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-md border border-gray-200">
        <div className="flex flex-col gap-2">
          <strong>Clicks</strong>
          <span>
            {isLoading
              ? "Carregando..."
              : clicksData.reduce((sum, item) => sum + item.clicks, 0)}
          </span>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow-sm space-y-4">
        {error && <p className="text-red-500">{error}</p>}
        {isLoading ? (
          <p>Carregando gráfico...</p>
        ) : (
          <ClicksChart data={clicksData} />
        )}
      </div>
    </main>
  );
}
