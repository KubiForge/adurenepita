import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DRUGS_DATA } from '../data/drugsData';
import { DRUG_IMAGE_ENTRIES } from '../data/drugImages';
import { ASSETS } from '../config/assets';
import { Search, ShieldCheck, ArrowRight } from 'lucide-react';

export const DrugKnowledgePage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedClassification, setSelectedClassification] = useState<string>('All');

  const classifications = [
    'All',
    ...Array.from(new Set(DRUG_IMAGE_ENTRIES.map((entry) => entry.classification))),
  ];

  const filtered = DRUG_IMAGE_ENTRIES.filter((entry) => {
    const monograph = entry.monographSlug
      ? DRUGS_DATA.find((drug) => drug.slug === entry.monographSlug)
      : undefined;
    const searchText = [
      entry.name,
      entry.caption,
      ...(monograph ? [monograph.name, ...monograph.commonNames, ...monograph.aliases] : []),
    ].join(' ').toLowerCase();
    const matchSearch = searchText.includes(search.toLowerCase());
    const matchClass = selectedClassification === 'All' || entry.classification === selectedClassification;

    return matchSearch && matchClass;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Page Header */}
      <div
        className="relative isolate overflow-hidden rounded-3xl border border-gold/20 px-6 py-10 sm:px-10 sm:py-14"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(16, 17, 19, 0.98) 0%, rgba(16, 17, 19, 0.88) 48%, rgba(16, 17, 19, 0.3) 100%), url(${ASSETS.knowledgeBg})`,
          backgroundPosition: 'center, right center',
          backgroundSize: 'cover',
        }}
      >
        <div className="max-w-2xl space-y-3">
          <span className="text-xs uppercase tracking-wider text-gold font-bold">
            Substance Awareness Guide
          </span>
          <h1 className="text-4xl font-bold font-heading text-ivory">
            Drug Education
          </h1>
          <p className="text-sm text-ivory/80 leading-relaxed">
            Explore 28 illustrated substance-awareness cards and read the available evidence-based clinical monographs.
          </p>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="charcoal-card p-4 sm:p-6 space-y-4">
        <div className="relative max-w-xl mx-auto">
          <Search className="w-4 h-4 text-ivory/40 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search by substance name or alias (e.g. ICE, Brown Sugar, Pregabalin)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-midnight border border-charcoal-light text-ivory text-xs focus:outline-none focus:border-gold placeholder:text-ivory/40"
          />
        </div>

        {/* Classification Chips */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2">
          {classifications.map((cls) => (
            <button
              key={cls}
              onClick={() => setSelectedClassification(cls)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                selectedClassification === cls
                  ? 'bg-gold text-midnight shadow-gold-subtle'
                  : 'bg-midnight/70 text-ivory/60 hover:text-ivory border border-charcoal-light'
              }`}
            >
              {cls}
            </button>
          ))}
        </div>
      </div>

      {/* Substances Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((entry) => {
          const monograph = entry.monographSlug
            ? DRUGS_DATA.find((drug) => drug.slug === entry.monographSlug)
            : undefined;

          return (
            <div
              key={entry.file}
              className="charcoal-card p-6 border-charcoal-light flex flex-col justify-between charcoal-card-hover"
            >
              <div>
                <img
                  src={`/assets/drugs/${entry.file}`}
                  alt={`${entry.name} awareness illustration`}
                  className="w-full aspect-square object-contain rounded-xl bg-midnight mb-4"
                  loading="lazy"
                  decoding="async"
                />
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-midnight text-gold border border-gold/30 uppercase font-bold tracking-wider">
                    {entry.classification}
                  </span>
                  {monograph && (
                    <span
                      className={`text-[11px] font-semibold flex items-center gap-1 ${
                        monograph.reviewStatus === 'approved'
                          ? 'text-emerald-400'
                          : 'text-amber-300'
                      }`}
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{monograph.reviewStatus === 'approved' ? 'Approved' : 'Pending Review'}</span>
                    </span>
                  )}
                </div>

                <h2 className="font-heading font-bold text-lg text-ivory">
                  {entry.name}
                </h2>
                {monograph ? (
                  <>

                    <div className="mt-2 flex flex-wrap gap-1">
                      {monograph.commonNames.slice(0, 3).map((commonName) => (
                        <span key={commonName} className="text-[10px] px-2 py-0.5 rounded bg-charcoal-light text-ivory/60 font-mono">
                          {commonName}
                        </span>
                      ))}
                    </div>

                    <p className="text-xs text-ivory/70 mt-3 line-clamp-3 leading-relaxed">
                      {monograph.description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-charcoal-light text-xs text-ivory/60 space-y-1.5">
                      <div>
                        <strong className="text-ivory/80">Withdrawal Risk:</strong>{' '}
                        <span className="line-clamp-1">{monograph.withdrawalRisks[0]}</span>
                      </div>
                      <div>
                        <strong className="text-red-300">Emergency Sign:</strong>{' '}
                        <span className="line-clamp-1">{monograph.emergencySigns[0]}</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-xs text-ivory/70 mt-3 line-clamp-3 leading-relaxed">
                    {entry.caption}. Detailed clinical information for this substance is not currently available in the library.
                  </p>
                )}
              </div>

              <div className="mt-6 pt-3 border-t border-charcoal-light flex items-center justify-between">
                {monograph ? (
                  <>
                    <span className="text-[11px] text-ivory/40">
                      Reviewed: {monograph.lastReviewDate}
                    </span>
                    <Link
                      to={`/learn/${monograph.slug}`}
                      className="text-xs font-semibold text-gold hover:text-champagne flex items-center gap-1"
                    >
                      <span>Read Full Monograph</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </>
                ) : (
                  <span className="text-[11px] text-ivory/40">Educational image</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
