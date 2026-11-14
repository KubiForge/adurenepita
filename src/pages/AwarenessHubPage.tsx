import React, { useState } from 'react';
import { ARTICLES_DATA, Article } from '../data/awarenessData';
import { InteractiveQuiz } from '../components/awareness/InteractiveQuiz';
import { Button } from '../components/common/Button';
import { BookOpen, HelpCircle, FileText, Download, CheckCircle, Shield, ArrowRight } from 'lucide-react';

export const AwarenessHubPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'articles' | 'quiz' | 'downloads'>('articles');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const downloadableResources = [
    {
      title: 'Family Guide: Recognizing Early Signs of Substance Distress in Students',
      size: 'PDF • 1.4 MB',
      category: 'Family Guide',
    },
    {
      title: 'Emergency Overdose Protocol & Recovery Position One-Pager',
      size: 'PDF • 850 KB',
      category: 'Clinical Protocol',
    },
    {
      title: 'Methamphetamine (ICE) Facts for University Students',
      size: 'PDF • 2.1 MB',
      category: 'Youth Prevention',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-wider text-gold font-bold">
          Educational Knowledge Platform
        </span>
        <h1 className="text-4xl font-bold font-heading text-ivory">
          Awareness Hub & Community Resources
        </h1>
        <p className="text-sm text-ivory/70 leading-relaxed">
          Explore peer-reviewed educational articles, interactive literacy quizzes, and downloadable guidelines crafted for Sri Lankan youth, educators, and families.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center border-b border-charcoal-light pb-2">
        <div className="flex p-1 rounded-xl bg-charcoal border border-charcoal-light">
          <button
            onClick={() => setActiveTab('articles')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'articles' ? 'bg-gold text-midnight' : 'text-ivory/70 hover:text-ivory'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Educational Articles</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'quiz' ? 'bg-gold text-midnight' : 'text-ivory/70 hover:text-ivory'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Interactive Quiz</span>
          </button>

          <button
            onClick={() => setActiveTab('downloads')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'downloads' ? 'bg-gold text-midnight' : 'text-ivory/70 hover:text-ivory'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Downloadable Materials</span>
          </button>
        </div>
      </div>

      {/* TAB 1: ARTICLES */}
      {activeTab === 'articles' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ARTICLES_DATA.map((art) => (
            <div key={art.id} className="charcoal-card p-6 border-charcoal-light flex flex-col justify-between charcoal-card-hover">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-midnight text-gold border border-gold/30 uppercase font-bold tracking-wider">
                    {art.category}
                  </span>
                  <span className="text-[11px] text-ivory/50">{art.readTime}</span>
                </div>

                <h3 className="font-heading font-bold text-lg text-ivory leading-snug">
                  {art.title}
                </h3>

                <p className="text-xs text-ivory/70 leading-relaxed line-clamp-3">
                  {art.summary}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-charcoal-light flex items-center justify-between">
                <span className="text-[11px] text-ivory/40">{art.publishedDate}</span>
                <button
                  onClick={() => setSelectedArticle(art)}
                  className="text-xs font-semibold text-gold hover:underline flex items-center gap-1"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: INTERACTIVE QUIZ */}
      {activeTab === 'quiz' && (
        <div className="py-4">
          <InteractiveQuiz />
        </div>
      )}

      {/* TAB 3: DOWNLOADABLE MATERIALS */}
      {activeTab === 'downloads' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {downloadableResources.map((res, i) => (
            <div key={i} className="charcoal-card p-6 border-charcoal-light flex flex-col justify-between charcoal-card-hover">
              <div>
                <span className="text-[10px] font-bold text-gold uppercase tracking-wider block mb-1">
                  {res.category}
                </span>
                <h3 className="font-heading font-bold text-base text-ivory">
                  {res.title}
                </h3>
                <span className="text-[11px] font-mono text-ivory/50 block">{res.size}</span>
              </div>

              <div className="mt-6 pt-3 border-t border-charcoal-light">
                <Button
                  variant="charcoal"
                  size="sm"
                  className="w-full text-xs"
                  onClick={() => alert(`Downloading ${res.title}... (PDF generated from verified knowledge repository)`)}
                  leftIcon={<Download className="w-3.5 h-3.5 text-gold" />}
                >
                  Download Free PDF
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div
            className="fixed inset-0 bg-midnight/80 backdrop-blur-md"
            onClick={() => setSelectedArticle(null)}
          />
          <div className="relative w-full max-w-3xl charcoal-card bg-charcoal border-gold/30 p-6 sm:p-8 z-10 my-8 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-charcoal-light mb-4">
              <span className="text-xs uppercase tracking-wider text-gold font-bold">
                {selectedArticle.category} • {selectedArticle.readTime}
              </span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="text-ivory/60 hover:text-gold text-xs font-semibold"
              >
                Close
              </button>
            </div>

            <h2 className="text-2xl font-bold font-heading text-ivory mb-1">
              {selectedArticle.title}
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-ivory/80 leading-relaxed">
              {selectedArticle.content.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-charcoal-light flex items-center justify-between text-xs text-ivory/50">
              <span>Author: {selectedArticle.author}</span>
              <span className="text-emerald-400 font-semibold">Clinically Verified Monograph</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
