import React, { useState } from 'react';
import { CONTACT_INFO } from '../../config/contactInfo';
import {
  Settings, Users, Cpu, Shield, Database, Plus,
  CheckCircle2, AlertTriangle, Key, Lock, RefreshCw, X, Save
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Content Manager' | 'Technical Crew';
  accessScope: string;
  status: 'Active' | 'Pending';
}

export const AdminSettingsModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'team' | 'general' | 'ai' | 'integrations' | 'security' | 'backup'>('team');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [members, setMembers] = useState<TeamMember[]>([
    {
      id: 'm-1',
      name: 'Admin Specialist',
      email: 'admin@btd.lk',
      role: 'Admin',
      accessScope: 'Full Operational Access',
      status: 'Active',
    },
    {
      id: 'm-2',
      name: 'Content Editor',
      email: 'editor@btd.lk',
      role: 'Content Manager',
      accessScope: 'Content, Knowledge & Campaigns',
      status: 'Active',
    },
    {
      id: 'm-3',
      name: 'Technical Crew',
      email: 'tech@btd.lk',
      role: 'Technical Crew',
      accessScope: 'System Architecture, APIs & AI Model',
      status: 'Active',
    },
  ]);

  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    role: 'Admin' as TeamMember['role'],
    accessScope: 'Full Access',
  });

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMember.name.trim() || !newMember.email.trim()) return;

    setMembers([
      ...members,
      {
        id: `m-${Date.now()}`,
        name: newMember.name,
        email: newMember.email,
        role: newMember.role,
        accessScope: newMember.accessScope,
        status: 'Active',
      },
    ]);

    setIsModalOpen(false);
    setNewMember({ name: '', email: '', role: 'Admin', accessScope: 'Full Access' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-heading text-ivory">
            System Settings & Team Management
          </h2>
          <p className="text-xs text-ivory/60 mt-0.5">
            Manage platform configuration, team access control, AI assistant parameters and technical integrations.
          </p>
        </div>

        {activeTab === 'team' && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-gold px-4 py-2.5 rounded-xl text-xs font-bold shadow-gold-subtle flex items-center gap-2 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4 text-midnight" />
            <span className="text-midnight">+ Add Member</span>
          </button>
        )}
      </div>

      {/* Tabs (Screen 09 in Image 7) */}
      <div className="flex flex-wrap gap-2 border-b border-charcoal-light pb-2">
        {[
          { id: 'team', label: 'Team & Roles' },
          { id: 'general', label: 'General' },
          { id: 'ai', label: 'AI Configuration' },
          { id: 'integrations', label: 'Integrations' },
          { id: 'security', label: 'Security' },
          { id: 'backup', label: 'Backup & Recovery' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === tab.id
                ? 'bg-gold text-midnight font-bold shadow-sm'
                : 'text-ivory/60 hover:text-ivory bg-midnight/60'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Team & Roles Tab Content */}
      {activeTab === 'team' && (
        <div className="charcoal-card border-charcoal-light overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-charcoal-light bg-midnight/70 text-ivory/60">
                  <th className="p-3.5 font-bold uppercase tracking-wider">Team Member</th>
                  <th className="p-3.5 font-bold uppercase tracking-wider">Role</th>
                  <th className="p-3.5 font-bold uppercase tracking-wider">Access Scope</th>
                  <th className="p-3.5 font-bold uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-light">
                {members.map((m) => (
                  <tr key={m.id} className="hover:bg-midnight/40 transition-colors">
                    <td className="p-3.5">
                      <div className="font-semibold text-ivory">{m.name}</div>
                      <div className="text-[11px] text-gold font-mono">{m.email}</div>
                    </td>
                    <td className="p-3.5">
                      <span className="px-2.5 py-0.5 rounded-full font-bold text-[10px] bg-charcoal text-gold border border-gold/30">
                        {m.role}
                      </span>
                    </td>
                    <td className="p-3.5 text-ivory/70">{m.accessScope}</td>
                    <td className="p-3.5">
                      <span className="px-2.5 py-0.5 rounded-full font-bold text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800">
                        ● {m.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* AI Configuration Tab */}
      {activeTab === 'ai' && (
        <div className="space-y-6">
          <div className="charcoal-card p-6 border-gold/30 space-y-4">
            <div className="flex items-center justify-between border-b border-charcoal-light pb-3">
              <div>
                <h3 className="font-heading font-bold text-base text-ivory flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-gold" />
                  <span>Grok API Model Configuration</span>
                </h3>
                <p className="text-xs text-ivory/60">Server-side proxy settings via Google Apps Script</p>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                Connected
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-ivory/70 mb-1">Active Model</label>
                <input
                  type="text"
                  value="grok-beta (xAI)"
                  readOnly
                  className="w-full p-2.5 rounded-xl bg-midnight border border-charcoal-light text-gold font-mono"
                />
              </div>

              <div>
                <label className="block text-ivory/70 mb-1">Temperature (Safety Bound)</label>
                <input
                  type="text"
                  value="0.3 (Strict Clinical Determinism)"
                  readOnly
                  className="w-full p-2.5 rounded-xl bg-midnight border border-charcoal-light text-ivory font-mono"
                />
              </div>

              <div>
                <label className="block text-ivory/70 mb-1">Grok Secret Storage</label>
                <div className="p-2.5 rounded-xl bg-midnight border border-charcoal-light text-xs text-emerald-400 flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-gold" />
                  <span>Google Apps Script Script Properties (`GROK_API_KEY`)</span>
                </div>
              </div>

              <div>
                <label className="block text-ivory/70 mb-1">Max Tokens per Turn</label>
                <input
                  type="text"
                  value="800 Tokens (Cost & Safety Capped)"
                  readOnly
                  className="w-full p-2.5 rounded-xl bg-midnight border border-charcoal-light text-ivory font-mono"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-midnight/70 border border-charcoal-light text-xs text-ivory/60 leading-relaxed">
              <strong>Emergency Override:</strong> All incoming messages containing crisis keywords (e.g. suicidal ideation, acute overdose, breathing arrest) trigger immediate escalation to <strong>{CONTACT_INFO.emergency.drugHelpline.number}</strong> and <strong>{CONTACT_INFO.emergency.ambulance.number}</strong> before model generation.
            </div>
          </div>
        </div>
      )}

      {/* Integrations Tab */}
      {activeTab === 'integrations' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="charcoal-card p-5 border-charcoal-light space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-ivory">Google Apps Script Web App</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400">
                  Online
                </span>
              </div>
              <p className="text-xs text-ivory/60 leading-relaxed">
                Central REST API router handling AI prompts, wizard submissions, donation verification, and directory queries.
              </p>
            </div>

            <div className="charcoal-card p-5 border-charcoal-light space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-ivory">Google Sheets Database</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400">
                  10 Tabs Synced
                </span>
              </div>
              <p className="text-xs text-ivory/60 leading-relaxed">
                SiteContent, DrugKnowledge, SupportDirectory, WizardSubmissions, DonationRecords, Campaigns, AIUsage, AdminUsers, AuditLog.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Security & Backup Tabs */}
      {(activeTab === 'general' || activeTab === 'security' || activeTab === 'backup') && (
        <div className="charcoal-card p-6 border-charcoal-light space-y-4 text-xs">
          <h3 className="font-heading font-bold text-base text-ivory">
            {activeTab === 'general' ? 'Platform General Settings' : activeTab === 'security' ? 'Security & Access Audits' : 'Automated Backup & Recovery'}
          </h3>
          <p className="text-ivory/60 leading-relaxed">
            All administrative actions, login attempts, and record mutations are recorded in the immutable audit log tab in Google Sheets. Backups are snapshotted daily into restricted Google Drive folders.
          </p>
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => alert('Snapshotting Google Sheets database and Drive archives now...')}
              className="btn-charcoal px-3 py-2 rounded-xl font-semibold flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5 text-gold" />
              <span>Trigger Manual Backup Snapshot</span>
            </button>
          </div>
        </div>
      )}

      {/* Add Member Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="charcoal-card border-gold/40 max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-charcoal-light pb-3">
              <h3 className="font-heading font-bold text-lg text-ivory">
                Add Team Member
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-ivory/40 hover:text-ivory">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddMember} className="space-y-4 text-xs">
              <div>
                <label className="block text-ivory/80 font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  placeholder="e.g. Kasun Jayawardena"
                  required
                  className="w-full px-3 py-2 rounded-xl bg-midnight border border-charcoal-light text-ivory focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-ivory/80 font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  value={newMember.email}
                  onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                  placeholder="e.g. kasun@btd.lk"
                  required
                  className="w-full px-3 py-2 rounded-xl bg-midnight border border-charcoal-light text-ivory focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-ivory/80 font-semibold mb-1">System Role</label>
                <select
                  value={newMember.role}
                  onChange={(e) => setNewMember({ ...newMember, role: e.target.value as any })}
                  className="w-full p-2 rounded-xl bg-midnight border border-charcoal-light text-ivory focus:outline-none focus:border-gold"
                >
                  <option value="Admin">Admin (Full Operational)</option>
                  <option value="Content Manager">Content Manager</option>
                  <option value="Technical Crew">Technical Crew (System & AI)</option>
                </select>
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
                  <span className="text-midnight">Add Member</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
