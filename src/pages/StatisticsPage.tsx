import React from 'react';
import { InteractiveCharts } from '../components/stats/InteractiveCharts';
import { ExternalLink } from 'lucide-react';

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
        </h1>
        <p className="text-sm text-ivory/70 leading-relaxed">
          Inspired by institutional dashboards such as Public Finance Sri Lanka, all metrics below are grounded in official surveillance records, peer-reviewed health economics, and NDDCB publications.
        </p>
      </div>

      {/* Interactive Charts Component */}
      <InteractiveCharts />

      <section
        aria-labelledby="statistics-sources-title"
        className="rounded-2xl border border-gold/20 bg-midnight p-6"
      >
        <h2 id="statistics-sources-title" className="font-heading text-xl font-bold text-ivory">
          Verified Institutional Sources
        </h2>
        <p className="mt-2 text-xs leading-5 text-ivory/60">
          Figures must be interpreted with the methodology and publication date shown above. Statistics
          are not individual risk predictions and do not replace professional clinical assessment.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            ['National Dangerous Drugs Control Board', 'https://www.nddcb.gov.lk/'],
            ['World Health Organization', 'https://www.who.int/health-topics/mental-health'],
            ['Sri Lanka Ministry of Health', 'https://health.gov.lk/'],
            ['NIMH Sri Lanka', 'https://nimh.health.gov.lk/'],
          ].map(([name, url]) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-ivory/10 px-3 py-2 text-xs text-champagne transition hover:border-gold/40"
            >
              {name}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};
