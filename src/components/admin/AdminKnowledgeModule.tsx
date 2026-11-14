import React, { useState } from 'react';
import { DRUGS_DATA } from '../../data/drugsData';
import { DrugKnowledge, SubstanceClassification } from '../../types/drug';
import { Plus, ShieldCheck, Edit2, Trash2, BookOpen, AlertOctagon, X, Save } from 'lucide-react';

export const AdminKnowledgeModule: React.FC = () => {
  const [drugs, setDrugs] = useState<DrugKnowledge[]>(DRUGS_DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDrug, setEditingDrug] = useState<DrugKnowledge | null>(null);

  const [form, setForm] = useState({
    name: '',
    nameSi: '',
    classification: 'Stimulant' as SubstanceClassification,
    description: '',
    shortTermEffects: '',
    emergencySigns: '',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    if (editingDrug) {
      setDrugs((prev) =>
        prev.map((d) =>
          d.id === editingDrug.id
            ? {
                ...d,
                name: form.name,
                nameSi: form.nameSi,
                classification: form.classification,
                description: form.description,
                lastReviewDate: 'Nov 2026',
              }
            : d
        )
      );
    } else {
      const newDrug: DrugKnowledge = {
        id: `drug-${Date.now()}`,
        slug: form.name.toLowerCase().replace(/\s+/g, '-'),
        name: form.name,
        nameSi: form.nameSi,
        nameTa: '',
        classification: form.classification,
        description: form.description,
        descriptionSi: '',
        descriptionTa: '',
        commonNames: [form.name],
        aliases: [],
        shortTermEffects: form.shortTermEffects.split(',').map((s) => s.trim()),
        shortTermEffectsSi: [],
        longTermPhysicalEffects: ['Cognitive impairment', 'Cardiovascular damage'],
        longTermPhysicalEffectsSi: [],
        psychologicalEffects: ['Paranoia', 'Severe anxiety'],
        psychologicalEffectsSi: [],
        warningSigns: ['Behavioral shifts', 'Pupil dilation'],
        warningSignsSi: [],
        dependence: 'High potential for psychological and physiological dependence.',
        dependenceSi: '',
        withdrawalRisks: ['Requires medical detoxification'],
        withdrawalRisksSi: [],
        emergencySigns: form.emergencySigns ? form.emergencySigns.split(',').map((s) => s.trim()) : ['Acute toxicity'],
        emergencySignsSi: [],
        evidenceBasedTreatment: 'Behavioral therapy, rehabilitation, and medical management.',
        evidenceBasedTreatmentSi: '',
        preventionInfo: 'Campus and community educational workshops.',
        preventionInfoSi: '',
        mythsVsFacts: [],
        sources: [
          {
            id: `src-${Date.now()}`,
            title: 'NDDCB Sri Lanka Monograph',
            organization: 'NDDCB',
            url: 'https://nddcb.gov.lk',
            publicationDate: '2026',
            accessDate: '2026-11-10',
          },
        ],
        publicationDate: '2026-11-10',
        lastReviewDate: 'Nov 2026',
        reviewStatus: 'approved',
        reviewerName: 'Clinical Addiction Advisory Board',
        verifiedMedicalReview: true,
      };
      setDrugs([newDrug, ...drugs]);
    }

    setIsModalOpen(false);
    setEditingDrug(null);
  };

  const handleEdit = (d: any) => {
    setEditingDrug(d);
    setForm({
      name: d.name,
      nameSi: d.nameSi,
      classification: d.classification,
      description: d.description,
      shortTermEffects: d.shortTermEffects.join(', '),
      emergencySigns: d.emergencySigns.join(', '),
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this substance record from the knowledge centre?')) {
      setDrugs((prev) => prev.filter((d) => d.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-heading text-ivory">
            Drug Knowledge Centre Management
          </h2>
          <p className="text-xs text-ivory/60 mt-0.5">
            Manage substance clinical monographs, street aliases, pharmacology, and medical review status.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingDrug(null);
            setForm({
              name: '',
              nameSi: '',
              classification: 'Stimulant',
              description: '',
              shortTermEffects: '',
              emergencySigns: '',
            });
            setIsModalOpen(true);
          }}
          className="btn-gold px-4 py-2.5 rounded-xl text-xs font-bold shadow-gold-subtle flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-midnight" />
          <span className="text-midnight">+ Add Substance</span>
        </button>
      </div>

      {/* Grid of Substances (Screen 03 in Image 7) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {drugs.map((drug) => (
          <div
            key={drug.id}
            className="charcoal-card p-6 border-charcoal-light flex flex-col justify-between charcoal-card-hover"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-midnight text-gold border border-gold/30 font-bold uppercase tracking-wider">
                  {drug.classification}
                </span>
                <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Approved</span>
                </span>
              </div>

              <h3 className="font-heading font-bold text-lg text-ivory">
                {drug.name}
              </h3>

              <p className="text-xs text-ivory/70 line-clamp-2 mt-2 leading-relaxed">
                {drug.description}
              </p>

              <div className="mt-4 pt-3 border-t border-charcoal-light text-[11px] text-ivory/50 space-y-1">
                <div>
                  <strong className="text-ivory/70">Emergency Sign:</strong> {drug.emergencySigns[0]}
                </div>
                <div>
                  <strong className="text-ivory/70">Reviewed:</strong> {drug.lastReviewDate}
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-charcoal-light flex items-center justify-between">
              <span className="text-[10px] text-gold font-mono">
                {drug.sources?.length || 1} Verified Sources
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(drug)}
                  className="p-1.5 rounded hover:bg-midnight text-ivory/60 hover:text-gold transition-colors"
                  title="Edit Monograph"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(drug.id)}
                  className="p-1.5 rounded hover:bg-midnight text-ivory/60 hover:text-red-400 transition-colors"
                  title="Delete Substance"
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
          <div className="charcoal-card border-gold/40 max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-charcoal-light pb-3">
              <h3 className="font-heading font-bold text-lg text-ivory">
                {editingDrug ? 'Edit Substance Monograph' : 'Add New Substance Record'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-ivory/40 hover:text-ivory"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <div>
                  <label className="block text-ivory/80 font-semibold mb-1">Substance Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Cocaine"
                    required
                    className="w-full px-3 py-2 rounded-xl bg-midnight border border-charcoal-light text-ivory focus:outline-none focus:border-gold"
                  />
                </div>

              </div>

              <div>
                <label className="block text-ivory/80 font-semibold mb-1">Classification</label>
                <select
                  value={form.classification}
                  onChange={(e) => setForm({ ...form, classification: e.target.value as SubstanceClassification })}
                  className="w-full p-2 rounded-xl bg-midnight border border-charcoal-light text-ivory focus:outline-none focus:border-gold"
                >
                  <option value="Stimulant">Stimulant</option>
                  <option value="Opioid">Opioid</option>
                  <option value="Depressant">Depressant</option>
                  <option value="Cannabinoid">Cannabinoid</option>
                  <option value="Prescription Medicine">Prescription Medicine</option>
                  <option value="Nicotine/Tobacco">Nicotine/Tobacco</option>
                </select>
              </div>

              <div>
                <label className="block text-ivory/80 font-semibold mb-1">Clinical Description</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Pharmacology, origin and effects overview..."
                  required
                  className="w-full p-2.5 rounded-xl bg-midnight border border-charcoal-light text-ivory focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-ivory/80 font-semibold mb-1">
                  Short-Term Effects (Comma-separated)
                </label>
                <input
                  type="text"
                  value={form.shortTermEffects}
                  onChange={(e) => setForm({ ...form, shortTermEffects: e.target.value })}
                  placeholder="e.g. Euphoria, Increased heart rate, Dilated pupils"
                  className="w-full px-3 py-2 rounded-xl bg-midnight border border-charcoal-light text-ivory focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-ivory/80 font-semibold mb-1">
                  Acute Emergency Signs (Comma-separated)
                </label>
                <input
                  type="text"
                  value={form.emergencySigns}
                  onChange={(e) => setForm({ ...form, emergencySigns: e.target.value })}
                  placeholder="e.g. Seizures, Chest pain, Loss of consciousness"
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
                  <span className="text-midnight">Save Substance</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
