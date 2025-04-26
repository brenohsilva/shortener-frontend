"use client"
import { useState } from "react";

export default function AnalyticsDashboard() {
  const [period, setPeriod] = useState("Last 24 hours");

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Analytics</h2>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 border rounded text-sm text-gray-700 hover:bg-gray-100">
            Filter
          </button>
          <select
            className="px-3 py-1 border rounded text-sm text-gray-700"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            <option>Last 24 hours</option>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 border rounded shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Clicks</p>
          <p className="text-2xl font-bold text-blue-600">1</p>
        </div>
        <div className="p-4 border rounded shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Leads</p>
          <p className="text-2xl font-bold text-purple-600">0</p>
        </div>
        <div className="p-4 border rounded shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">Sales</p>
            <p className="text-2xl font-bold text-green-600">US$ 0</p>
          </div>
          <button className="bg-gray-100 px-2 py-1 text-sm rounded font-semibold text-gray-700">
            $123
          </button>
        </div>
      </div>

      <div className="h-64 border rounded p-4">
        {/* Placeholder para o gráfico */}
        <div className="h-full flex items-end">
          <div className="w-full relative">
            <div className="absolute bottom-0 w-full h-[2px] bg-gray-200"></div>
            <div className="absolute bottom-0 right-0 h-56 w-[2px] bg-blue-500"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-blue-500 rounded-full transform translate-x-1/2 translate-y-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
