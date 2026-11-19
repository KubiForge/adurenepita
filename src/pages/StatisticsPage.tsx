import React from 'react';
import { InteractiveCharts } from '../components/stats/InteractiveCharts';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const StatisticsPage: React.FC = () => {
  const { t } = useLanguage();
  const sources = [
    ['statistics.sourceBoard', 'https://www.nddcb.gov.lk/'],
    ['statistics.sourceWho', 'https://www.who.int/health-topics/mental-health'],
    ['statistics.sourceMinistry', 'https://health.gov.lk/'],
    ['statistics.sourceInstitute', 'https://nimh.health.gov.lk/'],
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-wider text-gold font-bold">
          {t('statistics.eyebrow')}
        </span>
        <h1 className="break-words text-3xl font-bold font-heading text-ivory sm:text-4xl">
          {t('statistics.title')}
        </h1>
        <p className="text-sm text-ivory/70 leading-relaxed">
          {t('statistics.description')}
        </p>
      </div>

      {/* Interactive Charts Component */}
      <InteractiveCharts />

      <section
        aria-labelledby="statistics-sources-title"
        className="rounded-2xl border border-gold/20 bg-midnight p-6"
      >
        <h2 id="statistics-sources-title" className="font-heading text-xl font-bold text-ivory">
          {t('statistics.verifiedSources')}
        </h2>
        <p className="mt-2 text-xs leading-5 text-ivory/60">
          {t('statistics.disclaimer')}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {sources.map(([name, url]) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-ivory/10 px-3 py-2 text-xs text-champagne transition hover:border-gold/40"
            >
              {t(name)}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};
