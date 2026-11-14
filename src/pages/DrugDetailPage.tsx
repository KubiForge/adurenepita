import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { DRUGS_DATA } from '../data/drugsData';
import { Button } from '../components/common/Button';
import {
  ArrowLeft,
  ShieldCheck,
  AlertOctagon,
  ExternalLink,
  BookOpen,
  Sparkles,
  MapPin,
  HeartPulse,
  Brain,
  HelpCircle,
} from 'lucide-react';

interface DrugDetailPageProps {
  onOpenAiChatWithPrompt?: (prompt: string) => void;
}

export const DrugDetailPage: React.FC<DrugDetailPageProps> = ({ onOpenAiChatWithPrompt }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const drug = DRUGS_DATA.find((d) => d.slug === slug || d.id === slug);
  const isApproved = drug?.reviewStatus === 'approved';

  if (!drug) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold font-heading text-ivory">
          Substance Monograph Not Found
        </h2>
        <p className="text-xs text-ivory/60">
          The requested monograph does not exist in the approved clinical knowledge base.
        </p>
        <Link to="/learn">
          <Button variant="gold" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Back to Knowledge Centre
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Back & Breadcrumbs */}
      <div className="flex items-center justify-between">
        <Link
          to="/learn"
          className="text-xs text-gold hover:underline flex items-center gap-1.5 font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Knowledge Library</span>
        </Link>

        <div
          className={`flex items-center gap-1.5 text-xs px-3 py-1 rounded-full border ${
            isApproved
              ? 'text-emerald-400 bg-emerald-950/60 border-emerald-800'
              : 'text-amber-300 bg-amber-950/40 border-amber-700/60'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>
            {isApproved ? 'Medically Approved' : 'Pending Review'} • Review Date: {drug.lastReviewDate}
          </span>
        </div>
      </div>

      {/* Header Monograph Summary */}
      <div className="charcoal-card p-6 sm:p-8 border-gold/40 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-wider px-3 py-1 rounded-full bg-midnight text-gold font-bold border border-gold/30">
            {drug.classification}
          </span>
          {drug.commonNames.map((cn, i) => (
            <span key={i} className="text-xs px-2.5 py-0.5 rounded-full bg-charcoal-light text-ivory/70 font-mono">
              {cn}
            </span>
          ))}
        </div>

        <div>
          <h1 className="text-3xl sm:text-4xl font-bold font-heading text-ivory">
            {drug.name}
          </h1>
        </div>

        <p className="text-sm text-ivory/80 leading-relaxed max-w-3xl">
          {drug.description}
        </p>

        {/* Quick Action CTAs */}
        <div className="pt-3 flex flex-wrap gap-3 border-t border-charcoal-light">
          <Button
            variant="gold"
            size="sm"
            onClick={() => {
              if (onOpenAiChatWithPrompt) {
                onOpenAiChatWithPrompt(`Can you explain the effects and safe recovery steps for ${drug.name}?`);
              }
            }}
            leftIcon={<Sparkles className="w-4 h-4" />}
          >
            Ask AI Assistant About This
          </Button>

          <Link to="/support-directory">
            <Button variant="charcoal" size="sm" leftIcon={<MapPin className="w-4 h-4 text-gold" />}>
              Find Treatment Centers
            </Button>
          </Link>
        </div>
      </div>

      {/* Emergency Signs Warning Alert */}
      <div className="p-6 rounded-2xl bg-red-950/50 border border-red-500/40 text-xs sm:text-sm text-red-200 space-y-3">
        <div className="flex items-center gap-2 text-red-400 font-bold text-base">
          <AlertOctagon className="w-5 h-5 animate-pulse" />
          <span>Critical Emergency Warning Signs (Overdose / Severe Toxicity)</span>
        </div>
        <p className="text-ivory/80">
          If someone displays any of these life-threatening indicators, call <strong>1990 (Suwaseriya Free Ambulance)</strong> immediately:
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 list-disc pl-5 text-ivory/70">
          {drug.emergencySigns.map((sign, i) => (
            <li key={i}>{sign}</li>
          ))}
        </ul>
      </div>

      {/* Grid: Short-Term vs Long-Term Effects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="charcoal-card p-6 space-y-3">
          <h3 className="font-heading font-bold text-lg text-champagne flex items-center gap-2">
            <Brain className="w-5 h-5 text-gold" />
            <span>Short-Term Effects</span>
          </h3>
          <ul className="space-y-2 text-xs text-ivory/80">
            {drug.shortTermEffects.map((eff, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 flex-shrink-0" />
                <span>{eff}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="charcoal-card p-6 space-y-3">
          <h3 className="font-heading font-bold text-lg text-champagne flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-gold" />
            <span>Long-Term Physical Health Risks</span>
          </h3>
          <ul className="space-y-2 text-xs text-ivory/80">
            {drug.longTermPhysicalEffects.map((eff, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 flex-shrink-0" />
                <span>{eff}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Dependence & Withdrawal Hazards */}
      <div className="charcoal-card p-6 sm:p-8 space-y-4">
        <h3 className="font-heading font-bold text-xl text-ivory">
          Dependence & Withdrawal Risks
        </h3>
        <p className="text-xs text-ivory/80 leading-relaxed">
          {drug.dependence}
        </p>

        <div className="pt-3 border-t border-charcoal-light">
          <h4 className="text-sm font-semibold text-gold mb-2">
            Withdrawal Manifestations:
          </h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-ivory/70 list-disc pl-5">
            {drug.withdrawalRisks.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Evidence-Based Care & Medical Treatment */}
      <div className="charcoal-card p-6 sm:p-8 space-y-3">
        <h3 className="font-heading font-bold text-xl text-ivory">
          Evidence-Based Treatment & Clinical Protocols
        </h3>
        <p className="text-xs text-ivory/80 leading-relaxed">
          {drug.evidenceBasedTreatment}
        </p>
      </div>

      {/* Myths vs Facts */}
      {drug.mythsVsFacts.length > 0 && (
        <div className="charcoal-card p-6 sm:p-8 space-y-4">
          <h3 className="font-heading font-bold text-xl text-ivory flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-gold" />
            <span>Myths vs. Facts</span>
          </h3>

          <div className="space-y-4">
            {drug.mythsVsFacts.map((item, i) => (
              <div key={i} className="p-4 rounded-xl bg-midnight border border-charcoal-light space-y-2">
                <div className="text-xs text-red-300 font-semibold">
                  <strong>Myth:</strong> "{item.myth}"
                </div>
                <div className="text-xs text-emerald-300 font-semibold">
                  <strong>Fact:</strong> {item.fact}
                </div>
                <div className="text-[11px] text-ivory/40 pt-1 border-t border-charcoal-light">
                  Evidence: {item.evidence}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sources & Citations */}
      <div className="p-6 rounded-2xl bg-midnight border border-charcoal-light space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-gold flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          <span>Peer-Reviewed Institutional Sources</span>
        </h4>
        <div className="space-y-2">
          {drug.sources.map((src) => (
            <a
              key={src.id}
              href={src.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-charcoal border border-charcoal-light flex items-center justify-between hover:border-gold/40 transition-colors text-xs text-ivory"
            >
              <div>
                <span className="font-bold block text-champagne">{src.title}</span>
                <span className="text-[11px] text-ivory/50">Publisher: {src.organization} • {src.publicationDate}</span>
              </div>
              <ExternalLink className="w-4 h-4 text-gold flex-shrink-0 ml-2" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
