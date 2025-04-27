import FilterDropdown from "@/components/filterDropdown";
import ClicksChart from "@/components/lineCharts";

export function Analytics() {
  return (
    <main className="flex-1 p-9">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Analises</h2>
      </div>

      <div className="flex justify-start mb-4">
        <div className="flex items-center gap-2">
          <FilterDropdown />
          <div className="px-2 py-1 border rounded">
            <span className="text-sm text-gray-800">Ultimos 30 dias</span>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-md border border-gray-200">
        <div className="flex flex-col gap-2">
          <strong>Clicks</strong>
          <span>1</span>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow-sm space-y-4">
        <ClicksChart />
      </div>
    </main>
  );
}
