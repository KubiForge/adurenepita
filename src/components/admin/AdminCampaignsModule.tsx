import React, { useState } from 'react';
import { ASSETS } from '../../config/assets';
import { Plus, Calendar, MapPin, Users, Edit2, Trash2, X, Save, CheckCircle } from 'lucide-react';

interface CampaignItem {
  id: string;
  title: string;
  category: string;
  status: 'Active' | 'Upcoming' | 'Completed';
  dateRange: string;
  location: string;
  targetAudience: string;
  registeredCount: number;
  image: string;
}

export const AdminCampaignsModule: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Active' | 'Upcoming' | 'Completed'>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<CampaignItem | null>(null);

  const [campaigns, setCampaigns] = useState<CampaignItem[]>([
    {
      id: 'cmp-1',
      title: 'Beyond the Stigma',
      category: 'Awareness Campaign',
      status: 'Active',
      dateRange: 'Nov 01 – Nov 30, 2026',
      location: 'University of Sri Jayewardenepura Campus',
      targetAudience: 'Undergraduates & Faculty',
      registeredCount: 420,
      image: ASSETS.campaignsBg,
    },
    {
      id: 'cmp-2',
      title: 'Drug Free Youth',
      category: 'School Outreach',
      status: 'Upcoming',
      dateRange: 'Dec 05, 2026',
      location: 'Western Province Schools & Assemblies',
      targetAudience: 'Secondary Students (Grades 9-13)',
      registeredCount: 250,
      image: ASSETS.campaignPoster,
    },
    {
      id: 'cmp-3',
      title: 'Choose a Healthier You',
      category: 'Community Campaign',
      status: 'Upcoming',
      dateRange: 'Jan 10, 2027',
      location: 'Colombo Town Hall Public Grounds',
      targetAudience: 'Families, Youth & General Public',
      registeredCount: 180,
      image: ASSETS.heroBg,
    },
  ]);

  const [form, setForm] = useState({
    title: '',
    category: 'Awareness Campaign',
    status: 'Upcoming' as CampaignItem['status'],
    dateRange: '',
    location: '',
    targetAudience: '',
  });

  const filteredCampaigns = campaigns.filter(
    (c) => filter === 'All' || c.status === filter
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    if (editingCampaign) {
      setCampaigns((prev) =>
        prev.map((c) =>
          c.id === editingCampaign.id
            ? {
                ...c,
                title: form.title,
                category: form.category,
                status: form.status,
                dateRange: form.dateRange,
                location: form.location,
                targetAudience: form.targetAudience,
              }
            : c
        )
      );
    } else {
      const newCamp: CampaignItem = {
        id: `cmp-${Date.now()}`,
        title: form.title,
        category: form.category,
        status: form.status,
        dateRange: form.dateRange,
        location: form.location,
        targetAudience: form.targetAudience,
        registeredCount: 0,
        image: ASSETS.campaignsBg,
      };
      setCampaigns([newCamp, ...campaigns]);
    }

    setIsModalOpen(false);
    setEditingCampaign(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this campaign?')) {
      setCampaigns((prev) => prev.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-heading text-ivory">
            Campaign Management
          </h2>
          <p className="text-xs text-ivory/60 mt-0.5">
            Create and manage awareness campaigns, school outreach caravans, and public community engagement activities.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingCampaign(null);
            setForm({
              title: '',
              category: 'Awareness Campaign',
              status: 'Upcoming',
              dateRange: '',
              location: '',
              targetAudience: '',
            });
            setIsModalOpen(true);
          }}
          className="btn-gold px-4 py-2.5 rounded-xl text-xs font-bold shadow-gold-subtle flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-midnight" />
          <span className="text-midnight">+ New Campaign</span>
        </button>
      </div>

      {/* Filter Tabs (Screen 06 in Image 7) */}
      <div className="flex gap-2 border-b border-charcoal-light pb-2">
        {(['All', 'Active', 'Upcoming', 'Completed'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filter === tab
                ? 'bg-gold text-midnight shadow-gold-subtle'
                : 'text-ivory/60 hover:text-ivory bg-midnight/60'
            }`}
          >
            {tab === 'All' ? 'All Campaigns' : tab}
          </button>
        ))}
      </div>

      {/* Campaign Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredCampaigns.map((camp) => (
          <div
            key={camp.id}
            className="charcoal-card border-charcoal-light overflow-hidden flex flex-col justify-between charcoal-card-hover group"
          >
            {/* Image Preview Banner */}
            <div className="relative h-44 overflow-hidden bg-midnight">
              <img
                src={camp.image}
                alt={camp.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
              <div className="absolute top-3 left-3">
                <span
                  className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-wider ${
                    camp.status === 'Active'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : camp.status === 'Upcoming'
                      ? 'bg-amber-950 text-amber-400 border border-amber-800'
                      : 'bg-midnight text-ivory/50 border border-charcoal-light'
                  }`}
                >
                  {camp.status}
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[10px] font-bold text-gold uppercase tracking-wider block">
                  {camp.category}
                </span>
                <h3 className="font-heading font-bold text-lg text-ivory mt-1">
                  {camp.title}
                </h3>

                <div className="space-y-1.5 mt-3 text-xs text-ivory/70">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                    <span>{camp.dateRange}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                    <span className="truncate">{camp.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                    <span>{camp.registeredCount} Registered Participants</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-charcoal-light flex items-center justify-between">
                <button
                  onClick={() => {
                    setEditingCampaign(camp);
                    setForm({
                      title: camp.title,
                      category: camp.category,
                      status: camp.status,
                      dateRange: camp.dateRange,
                      location: camp.location,
                      targetAudience: camp.targetAudience,
                    });
                    setIsModalOpen(true);
                  }}
                  className="text-xs text-gold hover:text-champagne font-semibold flex items-center gap-1"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit Details</span>
                </button>

                <button
                  onClick={() => handleDelete(camp.id)}
                  className="text-ivory/40 hover:text-red-400 p-1 rounded"
                  title="Delete Campaign"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="charcoal-card border-gold/40 max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-charcoal-light pb-3">
              <h3 className="font-heading font-bold text-lg text-ivory">
                {editingCampaign ? 'Edit Campaign Details' : 'Create New Campaign'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-ivory/40 hover:text-ivory">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-ivory/80 font-semibold mb-1">Campaign Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Beyond the Stigma 2026"
                  required
                  className="w-full px-3 py-2 rounded-xl bg-midnight border border-charcoal-light text-ivory focus:outline-none focus:border-gold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-ivory/80 font-semibold mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full p-2 rounded-xl bg-midnight border border-charcoal-light text-ivory focus:outline-none focus:border-gold"
                  >
                    <option value="Awareness Campaign">Awareness Campaign</option>
                    <option value="School Outreach">School Outreach</option>
                    <option value="Community Campaign">Community Campaign</option>
                    <option value="Workshop">Workshop</option>
                  </select>
                </div>

                <div>
                  <label className="block text-ivory/80 font-semibold mb-1">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value as any })}
                    className="w-full p-2 rounded-xl bg-midnight border border-charcoal-light text-ivory focus:outline-none focus:border-gold"
                  >
                    <option value="Active">Active</option>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-ivory/80 font-semibold mb-1">Dates / Timeline</label>
                <input
                  type="text"
                  value={form.dateRange}
                  onChange={(e) => setForm({ ...form, dateRange: e.target.value })}
                  placeholder="e.g. Nov 15 – Nov 30, 2026"
                  className="w-full px-3 py-2 rounded-xl bg-midnight border border-charcoal-light text-ivory focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-ivory/80 font-semibold mb-1">Venue / Location</label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  placeholder="e.g. USJ Campus Grounds"
                  className="w-full px-3 py-2 rounded-xl bg-midnight border border-charcoal-light text-ivory focus:outline-none focus:border-gold"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-charcoal-light">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-ivory/60 hover:text-ivory"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-gold px-4 py-2 rounded-xl font-bold shadow-gold-subtle flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4 text-midnight" />
                  <span className="text-midnight">Save Campaign</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
