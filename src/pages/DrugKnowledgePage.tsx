import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DRUGS_DATA } from '../data/drugsData';
import { SubstanceClassification } from '../types/drug';
import { Search, ShieldCheck, ArrowRight, Filter, BookOpen } from 'lucide-react';

export const DrugKnowledgePage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedClassification, setSelectedClassification] = useState<string>('All');

  const classifications = ['All', 'Stimulant', 'Opioid', 'Depressant', 'Cannabinoid', 'Prescription Medicine', 'Nicotine/Tobacco'];

  const filtered = DRUGS_DATA.filter((drug) => {
    const matchSearch =
      drug.name.toLowerCase().includes(search.toLowerCase()) ||
      drug.nameSi.includes(search) ||
      drug.commonNames.some((c) => c.toLowerCase().includes(search.toLowerCase())) ||
      drug.aliases.some((a) => a.toLowerCase().includes(search.toLowerCase()));

    const matchClass = selectedClassification === 'All' || drug.classification === selectedClassification;

    return matchSearch && matchClass;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-wider text-gold font-bold">
          Verified Evidence-Based Library
        </span>
        <h1 className="text-4xl font-bold font-heading text-ivory">
          Drug Knowledge Centre
          <span className="block font-sinhalaSerif text-gold text-2xl mt-1">
            මත්ද්‍රව්‍ය විද්‍යාත්මක තොරතුරු කේන්ද්‍රය
          </span>
        </h1>
        <p className="text-sm text-ivory/70 leading-relaxed">
          Accurate, peer-reviewed clinical monographs covering pharmacology, health risks, withdrawal hazards, emergency overdose protocols, and treatment pathways.
        </p>
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
        {filtered.map((drug) => (
          <div
            key={drug.id}
            className="charcoal-card p-6 border-charcoal-light flex flex-col justify-between charcoal-card-hover"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-midnight text-gold border border-gold/30 uppercase font-bold tracking-wider">
                  {drug.classification}
                </span>
                <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Approved</span>
                </span>
              </div>

              <h2 className="font-heading font-bold text-lg text-ivory">
                {drug.name}
              </h2>
              <p className="text-xs text-gold/80 font-sinhalaSerif mt-0.5">
                {drug.nameSi}
              </p>

              <div className="mt-2 flex flex-wrap gap-1">
                {drug.commonNames.slice(0, 3).map((cn, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-charcoal-light text-ivory/60 font-mono">
                    {cn}
                  </span>
                ))}
              </div>

              <p className="text-xs text-ivory/70 mt-3 line-clamp-3 leading-relaxed">
                {drug.description}
              </p>

              <div className="mt-4 pt-3 border-t border-charcoal-light text-xs text-ivory/60 space-y-1.5">
                <div>
                  <strong className="text-ivory/80">Withdrawal Risk:</strong>{' '}
                  <span className="line-clamp-1">{drug.withdrawalRisks[0]}</span>
                </div>
                <div>
                  <strong className="text-red-300">Emergency Sign:</strong>{' '}
                  <span className="line-clamp-1">{drug.emergencySigns[0]}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-charcoal-light flex items-center justify-between">
              <span className="text-[11px] text-ivory/40">
                Reviewed: {drug.lastReviewDate}
              </span>
              <Link
                to={`/learn/${drug.slug}`}
                className="text-xs font-semibold text-gold hover:text-champagne flex items-center gap-1"
              >
                <span>Read Full Monograph</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
