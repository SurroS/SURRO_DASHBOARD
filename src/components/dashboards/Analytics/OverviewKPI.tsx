import { KPIData, kpiData } from "@/utils/mockData";
import { Target } from "lucide-react";
import React, { useState } from "react";
import KPICard from "./KPICard";
import DetailModal from "./DetailModal";

const OverviewKPI = () => {
  const [selectedKPI, setSelectedKPI] = useState<KPIData | null>(null);

  return (
    <section>
      <div className="flex items-center mb-4">
        <Target className="w-5 h-5 text-blue-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">Overview KPIs</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, idx) => (
          <KPICard key={idx} data={kpi} onClick={() => setSelectedKPI(kpi)} />
        ))}
      </div>

      {/* Modals  */}
      {selectedKPI && (
        <DetailModal data={selectedKPI} onClose={() => setSelectedKPI(null)} />
      )}
    </section>
  );
};

export default OverviewKPI;
