import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CONTACT_INFO, telephoneHref } from '../config/contactInfo';
import {
  BookOpen,
  Bookmark,
  Download,
  CheckCircle2,
  Clock,
  Compass,
  ArrowRight,
  FileText,
  Heart,
  MapPin,
  Sparkles,
  Trash2,
  Share2,
} from 'lucide-react';

interface SavedItem {
  id: string;
  title: string;
  type: 'guide' | 'article' | 'service';
  meta: string;
  category: string;
  link: string;
  savedDate: string;
}

export const JourneyPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'resources' | 'referrals' | 'notes' | 'progress'>('resources');

  const [savedItems, setSavedItems] = useState<SavedItem[]>([
    {
      id: 'item-1',
      title: 'Recovery Guide for Beginners',
      type: 'guide',
      meta: 'PDF • 2.4 MB',
      category: 'Clinical Guide',
      link: '/learn',
      savedDate: 'Saved 2 days ago',
    },
    {
      id: 'item-2',
      title: 'Coping with Cravings & Withdrawal Urges',
      type: 'article',
      meta: 'Article • 5 min read',
      category: 'Evidence-Based Coping',
      link: '/learn/cannabis',
      savedDate: 'Saved yesterday',
    },
    {
      id: 'item-3',
      title: 'NDDCB National Treatment Centre — Colombo',
      type: 'service',
      meta: 'Verified Provider • Western Province',
      category: 'Rehabilitation Service',
      link: '/support-directory',
      savedDate: 'Saved today',
    },
  ]);

  const [notes, setNotes] = useState<string[]>([
    'Remember: Healing is non-linear. Take it one day at a time.',
    'Contacted Colombo counselling hotline on Tuesday. Spoke with counsellor Sarah.',
  ]);
  const [newNote, setNewNote] = useState('');

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setNotes([newNote.trim(), ...notes]);
    setNewNote('');
  };

  const handleDeleteItem = (id: string) => {
    setSavedItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-charcoal-light pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-gold uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4 text-gold" />
            <span>Personal Recovery & Growth Workspace</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-heading text-ivory">
            My Journey
          </h1>
          <p className="text-xs sm:text-sm text-ivory/60 mt-1">
            Your saved resources, guided plan progress, and confidential referral records.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/wizard"
            className="btn-gold px-4 py-2.5 rounded-full text-xs font-bold shadow-gold-subtle flex items-center gap-2"
          >
            <Compass className="w-4 h-4" />
            <span>Open Guided Wizard</span>
          </Link>
          <Link
            to="/assistant"
            className="btn-charcoal px-4 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-gold" />
            <span>AI Companion</span>
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-charcoal-light gap-2 sm:gap-4 overflow-x-auto pb-1">
        {[
          { id: 'resources', label: 'Saved Resources', count: savedItems.length },
          { id: 'referrals', label: 'Referrals & Status', count: 1 },
          { id: 'notes', label: 'Private Journal', count: notes.length },
          { id: 'progress', label: 'Plan Progress', count: '60%' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-t-xl transition-all flex items-center gap-2 border-b-2 ${
              activeTab === tab.id
                ? 'border-gold text-gold bg-charcoal/50'
                : 'border-transparent text-ivory/60 hover:text-ivory hover:bg-charcoal/20'
            }`}
          >
            <span>{tab.label}</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-midnight border border-charcoal-light text-gold/80 font-mono">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (Main Area) */}
        <div className="lg:col-span-8 space-y-6">
          {activeTab === 'resources' && (
            <div className="space-y-4">
              <h2 className="text-lg font-heading font-bold text-ivory flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-gold" />
                <span>Bookmarked Articles, Guides & Services</span>
              </h2>

              {savedItems.length === 0 ? (
                <div className="charcoal-card p-10 text-center space-y-3">
                  <p className="text-sm text-ivory/60">No saved resources yet.</p>
                  <Link to="/learn" className="text-xs text-gold underline">
                    Browse the Drug Knowledge Centre
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {savedItems.map((item) => (
                    <div
                      key={item.id}
                      className="charcoal-card p-4 sm:p-5 flex items-center justify-between gap-4 charcoal-card-hover"
                    >
                      <div className="flex items-start gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center text-gold flex-shrink-0 mt-0.5">
                          {item.type === 'guide' ? (
                            <FileText className="w-5 h-5" />
                          ) : item.type === 'service' ? (
                            <MapPin className="w-5 h-5" />
                          ) : (
                            <BookOpen className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-gold uppercase tracking-wider">
                            {item.category}
                          </span>
                          <h3 className="text-sm sm:text-base font-semibold text-ivory">
                            {item.title}
                          </h3>
                          <div className="flex items-center gap-3 text-[11px] text-ivory/50 mt-1">
                            <span>{item.meta}</span>
                            <span>•</span>
                            <span>{item.savedDate}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {item.type === 'guide' && (
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              alert('Downloading official recovery reference material (PDF)...');
                            }}
                            className="p-2 rounded-lg bg-midnight border border-charcoal-light text-gold hover:bg-gold hover:text-midnight transition-colors"
                            title="Download PDF"
                          >
                            <Download className="w-4 h-4" />
                          </a>
                        )}
                        <Link
                          to={item.link}
                          className="px-3 py-1.5 rounded-lg bg-midnight border border-charcoal-light text-xs font-semibold text-ivory/80 hover:text-gold hover:border-gold/40 transition-colors"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="p-2 rounded-lg text-ivory/40 hover:text-red-400 hover:bg-midnight transition-colors"
                          title="Remove bookmark"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'referrals' && (
            <div className="space-y-4">
              <h2 className="text-lg font-heading font-bold text-ivory flex items-center gap-2">
                <Heart className="w-4 h-4 text-gold" />
                <span>Professional Support Referral Requests</span>
              </h2>

              <div className="charcoal-card p-6 border-gold/30 space-y-4">
                <div className="flex items-center justify-between border-b border-charcoal-light pb-3">
                  <div>
                    <span className="text-xs font-mono font-bold text-gold">REF-1048</span>
                    <h3 className="text-base font-semibold text-ivory mt-0.5">
                      Professional Counselling Support Request
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-950/80 text-amber-400 border border-amber-800">
                    In Progress
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-ivory/70">
                  <div>
                    <span className="text-ivory/40 block">Requested Centre:</span>
                    <strong>NDDCB Colombo Counselling Unit</strong>
                  </div>
                  <div>
                    <span className="text-ivory/40 block">Submitted Date:</span>
                    <strong>10 November 2026</strong>
                  </div>
                  <div>
                    <span className="text-ivory/40 block">Preferred Contact:</span>
                    <strong>Confidential Email Call-Back</strong>
                  </div>
                  <div>
                    <span className="text-ivory/40 block">Assigned Specialist:</span>
                    <strong>Counselling Support Officer (Verified)</strong>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-midnight/80 border border-charcoal-light text-xs text-ivory/70 leading-relaxed">
                  Your referral request has been reviewed. An authorized professional counsellor will reach out via your preferred method within 24-48 business hours. For urgent needs, call toll-free hotline <strong>{CONTACT_INFO.emergency.drugHelpline.number}</strong>.
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-heading font-bold text-ivory flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gold" />
                  <span>Private Session Journal Notes</span>
                </h2>
                <p className="text-[11px] text-ivory/50 mt-0.5">
                  Reflections are maintained in your client session and are not transmitted to or stored on remote servers.
                </p>
              </div>

              <form onSubmit={handleAddNote} className="space-y-2">
                <textarea
                  rows={3}
                  placeholder="Write a private reflection or note on your recovery journey (stored locally in your private session)..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="w-full p-3 rounded-xl bg-midnight border border-charcoal-light text-ivory text-xs focus:outline-none focus:border-gold"
                />
                <button
                  type="submit"
                  className="btn-gold px-4 py-2 rounded-xl text-xs font-bold shadow-gold-subtle"
                >
                  Save Private Note
                </button>
              </form>

              <div className="space-y-3 pt-2">
                {notes.map((note, idx) => (
                  <div key={idx} className="charcoal-card p-4 text-xs text-ivory/80 leading-relaxed border-charcoal-light">
                    {note}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'progress' && (
            <div className="space-y-4">
              <h2 className="text-lg font-heading font-bold text-ivory flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold" />
                <span>Milestones & Recovery Exploration</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: 'Substance Risk Education', status: 'Completed', date: 'Step 1' },
                  { title: 'Emergency Warning Recognition', status: 'Completed', date: 'Step 2' },
                  { title: 'Local Support Facility Locator', status: 'Completed', date: 'Step 3' },
                  { title: 'Harm Reduction & Coping Skills', status: 'In Progress', date: 'Step 4' },
                  { title: 'Professional Consultation', status: 'Upcoming', date: 'Step 5' },
                  { title: 'Community & Peer Connection', status: 'Upcoming', date: 'Step 6' },
                ].map((m, i) => (
                  <div key={i} className="charcoal-card p-4 border-charcoal-light flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gold font-mono uppercase">{m.date}</span>
                      <h4 className="text-xs font-semibold text-ivory mt-0.5">{m.title}</h4>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        m.status === 'Completed'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : m.status === 'In Progress'
                          ? 'bg-amber-950 text-amber-400 border border-amber-800'
                          : 'bg-midnight text-ivory/40 border border-charcoal-light'
                      }`}
                    >
                      {m.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column (Progress Ring & Quick Summary) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="charcoal-card p-6 border-gold/40 text-center space-y-4">
            <span className="text-xs font-bold text-gold uppercase tracking-wider">
              My Plan Progress
            </span>

            {/* Circular Progress Indicator */}
            <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="rgba(216, 190, 130, 0.15)"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#D8BE82"
                  strokeWidth="8"
                  strokeDasharray="251.2"
                  strokeDashoffset="100.48" /* 60% progress */
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold font-heading text-gold">60%</span>
                <span className="text-[10px] text-ivory/60 uppercase">Completed</span>
              </div>
            </div>

            <p className="text-xs text-ivory/70 leading-relaxed">
              You've explored <strong>60%</strong> of your personalized awareness & support recommendations.
            </p>

            <Link
              to="/wizard"
              className="btn-gold w-full py-2.5 rounded-xl text-xs font-bold shadow-gold-subtle flex items-center justify-center gap-1.5"
            >
              <span>Continue Journey</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Emergency Quick Box */}
          <div className="p-4 rounded-xl bg-red-950/40 border border-red-800/60 text-xs space-y-2">
            <div className="flex items-center gap-2 text-red-400 font-bold">
              <Clock className="w-4 h-4" />
              <span>Immediate Support Available</span>
            </div>
            <p className="text-ivory/70 text-[11px] leading-relaxed">
              Experiencing severe distress, cravings, or anxiety? Call the NDDCB 24/7 hotline free of charge.
            </p>
            <a
              href={telephoneHref(CONTACT_INFO.emergency.drugHelpline.number)}
              className="inline-block font-mono font-bold text-sm text-gold hover:underline"
            >
              📞 Call {CONTACT_INFO.emergency.drugHelpline.number} Toll-Free
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
