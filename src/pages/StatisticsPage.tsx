import React from 'react';
import { InteractiveCharts } from '../components/stats/InteractiveCharts';
import { BarChart3, ShieldCheck, Database, Calendar } from 'lucide-react';

export const StatisticsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-wider text-gold font-bold">
          Data Storytelling & Public Evidence
        </span>
        <h1 className="text-4xl font-bold font-heading text-ivory">
          Sri Lankan Substance Trends & Impact Analytics
          <span className="block font-sinhalaSerif text-gold text-2xl mt-1">
            ශ්‍රී ලංකාවේ මත්ද්‍රව්‍ය ප්‍රවණතා සහ දත්ත විග්‍රහය
          </span>
        </h1>
        <p className="text-sm text-ivory/70 leading-relaxed">
          Inspired by institutional dashboards such as Public Finance Sri Lanka, all metrics below are grounded in official surveillance records, peer-reviewed health economics, and NDDCB publications.
        </p>
      </div>

      {/* Interactive Charts Component */}
      <InteractiveCharts />
    </div>
  );
};
