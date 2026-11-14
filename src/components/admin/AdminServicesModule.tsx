import React, { useState } from 'react';
import { SUPPORT_CENTERS_DATA } from '../../data/sriLankaData';
import { SupportCenter } from '../../types/directory';
import { Plus, Search, MapPin, Phone, CheckCircle2, Clock, ShieldCheck, Edit2, Trash2, X, Save } from 'lucide-react';

export const AdminServicesModule: React.FC = () => {
  const [centers, setCenters] = useState<SupportCenter[]>(SUPPORT_CENTERS_DATA);
  const [provinceFilter, setProvinceFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCenter, setEditingCenter] = useState<SupportCenter | null>(null);

  const [form, setForm] = useState({
    name: '',
    province: 'Western',
    district: 'Colombo',
    city: 'Colombo 07',
    type: 'Rehabilitation',
    phone: '0112 673 285',
    verified: true,
  });

  const filteredCenters = centers.filter((c) => {
    const matchProvince = provinceFilter === 'All' || c.province.toLowerCase() === provinceFilter.toLowerCase();
    const matchStatus =
      statusFilter === 'All' ||
      (statusFilter === 'Verified' && c.verificationStatus === 'verified') ||
      (statusFilter === 'Pending' && c.verificationStatus !== 'verified');
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.district.toLowerCase().includes(search.toLowerCase());

    return matchProvince && matchStatus && matchSearch;
  });

  const handleToggleVerification = (id: string) => {
    setCenters((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              verificationStatus: c.verificationStatus === 'verified' ? 'pending' : 'verified',
              lastVerifiedDate: 'Nov 2026',
            }
          : c
      )
    );
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this service provider listing?')) {
      setCenters((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    if (editingCenter) {
      setCenters((prev) =>
        prev.map((c) =>
          c.id === editingCenter.id
            ? {
                ...c,
                name: form.name,
                province: form.province,
                district: form.district,
                city: form.city,
                serviceTypes: [form.type.toLowerCase() as any],
                phone: form.phone,
                verificationStatus: form.verified ? 'verified' : 'pending',
                lastVerifiedDate: 'Nov 2026',
              }
            : c
        )
      );
    } else {
      const newCenter: SupportCenter = {
        id: `center-${Date.now()}`,
        name: form.name,
        nameSi: '',
        nameTa: '',
        description: 'Verified Sri Lankan health facility.',
        descriptionSi: '',
        organizationType: 'government',
        province: form.province,
        district: form.district,
        city: form.city,
        address: `${form.city}, Sri Lanka`,
        addressSi: '',
        phone: form.phone,
        serviceTypes: [form.type.toLowerCase() as any],
        languagesSupported: ['si', 'en', 'ta'],
        operatingHours: '8:00 AM - 4:00 PM',
        operatingHoursSi: 'පෙ.ව. 8:00 - ප.ව. 4:00',
        isFreeOrGovernmentFunded: true,
        verificationStatus: form.verified ? 'verified' : 'pending',
        lastVerifiedDate: 'Nov 2026',
        verifiedBy: 'Leo Club Verification Team',
        latitude: 6.9271,
        longitude: 79.8612,
      };
      setCenters([newCenter, ...centers]);
    }

    setIsModalOpen(false);
    setEditingCenter(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-heading text-ivory">
            Services Directory & Verification
          </h2>
          <p className="text-xs text-ivory/60 mt-0.5">
            Manage, verify and audit counselling, medical detox, and residential rehabilitation facilities across Sri Lanka.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingCenter(null);
            setForm({
              name: '',
              province: 'Western',
              district: 'Colombo',
              city: 'Colombo 07',
              type: 'Rehabilitation',
              phone: '0112 673 285',
              verified: true,
            });
            setIsModalOpen(true);
          }}
          className="btn-gold px-4 py-2.5 rounded-xl text-xs font-bold shadow-gold-subtle flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-midnight" />
          <span className="text-midnight">+ Add Service</span>
        </button>
      </div>

      {/* Filter Row (Screen 04 in Image 7) */}
      <div className="charcoal-card p-4 grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
        <div>
          <label className="block text-ivory/60 mb-1">Province</label>
          <select
            value={provinceFilter}
            onChange={(e) => setProvinceFilter(e.target.value)}
            className="w-full p-2 rounded-xl bg-midnight border border-charcoal-light text-ivory focus:outline-none focus:border-gold"
          >
            <option value="All">All Provinces</option>
            <option value="Western">Western</option>
            <option value="Central">Central</option>
            <option value="Southern">Southern</option>
            <option value="North Western">North Western</option>
          </select>
        </div>

        <div>
          <label className="block text-ivory/60 mb-1">Status</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full p-2 rounded-xl bg-midnight border border-charcoal-light text-ivory focus:outline-none focus:border-gold"
          >
            <option value="All">All Statuses</option>
            <option value="Verified">Verified Only</option>
            <option value="Pending">Pending Review</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-ivory/60 mb-1">Search Provider</label>
          <div className="relative">
            <Search className="w-4 h-4 text-ivory/40 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by facility name or district..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-midnight border border-charcoal-light text-ivory focus:outline-none focus:border-gold"
            />
          </div>
        </div>
      </div>

      {/* Services Table */}
      <div className="charcoal-card border-charcoal-light overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-charcoal-light bg-midnight/70 text-ivory/60">
                <th className="p-3.5 font-bold uppercase tracking-wider">Service Provider</th>
                <th className="p-3.5 font-bold uppercase tracking-wider">Location</th>
                <th className="p-3.5 font-bold uppercase tracking-wider">Type</th>
                <th className="p-3.5 font-bold uppercase tracking-wider">Status</th>
                <th className="p-3.5 font-bold uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-light">
              {filteredCenters.map((c) => (
                <tr key={c.id} className="hover:bg-midnight/40 transition-colors">
                  <td className="p-3.5">
                    <div className="font-semibold text-ivory">{c.name}</div>
                    <div className="text-[11px] text-ivory/50 flex items-center gap-1.5 mt-0.5">
                      <Phone className="w-3 h-3 text-gold" />
                      <span>{c.phone}</span>
                    </div>
                  </td>
                  <td className="p-3.5">
                    <span className="text-ivory/80">{c.city || c.district}</span>
                    <span className="block text-[10px] text-ivory/50">{c.province} Province</span>
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded bg-charcoal text-ivory/80 border border-charcoal-light capitalize">
                      {c.serviceTypes[0] || 'Counselling'}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <button
                      onClick={() => handleToggleVerification(c.id)}
                      className={`px-3 py-1 rounded-full font-bold text-[10px] transition-all ${
                        c.verificationStatus === 'verified'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : 'bg-amber-950 text-amber-400 border border-amber-800'
                      }`}
                      title="Click to toggle status"
                    >
                      {c.verificationStatus === 'verified' ? '✓ Verified' : '⏳ Pending'}
                    </button>
                  </td>
                  <td className="p-3.5 text-right space-x-2">
                    <button
                      onClick={() => {
                        setEditingCenter(c);
                        setForm({
                          name: c.name,
                          province: c.province,
                          district: c.district,
                          city: c.city,
                          type: c.serviceTypes[0] || 'rehabilitation',
                          phone: c.phone,
                          verified: c.verificationStatus === 'verified',
                        });
                        setIsModalOpen(true);
                      }}
                      className="p-1.5 rounded hover:bg-midnight text-ivory/60 hover:text-gold transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="p-1.5 rounded hover:bg-midnight text-ivory/60 hover:text-red-400 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="charcoal-card border-gold/40 max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-charcoal-light pb-3">
              <h3 className="font-heading font-bold text-lg text-ivory">
                {editingCenter ? 'Edit Service Provider' : 'Add New Service Listing'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-ivory/40 hover:text-ivory">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-ivory/80 font-semibold mb-1">Facility Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. NDDCB National Rehabilitation Center"
                  required
                  className="w-full px-3 py-2 rounded-xl bg-midnight border border-charcoal-light text-ivory focus:outline-none focus:border-gold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-ivory/80 font-semibold mb-1">Province</label>
                  <select
                    value={form.province}
                    onChange={(e) => setForm({ ...form, province: e.target.value })}
                    className="w-full p-2 rounded-xl bg-midnight border border-charcoal-light text-ivory focus:outline-none focus:border-gold"
                  >
                    <option value="Western">Western</option>
                    <option value="Central">Central</option>
                    <option value="Southern">Southern</option>
                    <option value="Northern">Northern</option>
                    <option value="Eastern">Eastern</option>
                    <option value="North Western">North Western</option>
                  </select>
                </div>

                <div>
                  <label className="block text-ivory/80 font-semibold mb-1">District</label>
                  <input
                    type="text"
                    value={form.district}
                    onChange={(e) => setForm({ ...form, district: e.target.value })}
                    placeholder="e.g. Colombo"
                    className="w-full px-3 py-2 rounded-xl bg-midnight border border-charcoal-light text-ivory focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-ivory/80 font-semibold mb-1">Contact Hotline</label>
                  <input
                    type="text"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="e.g. 0112 673 285"
                    className="w-full px-3 py-2 rounded-xl bg-midnight border border-charcoal-light text-ivory focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-ivory/80 font-semibold mb-1">Service Type</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full p-2 rounded-xl bg-midnight border border-charcoal-light text-ivory focus:outline-none focus:border-gold"
                  >
                    <option value="Rehabilitation">Rehabilitation</option>
                    <option value="Counselling">Counselling</option>
                    <option value="Healthcare">Healthcare / Detox</option>
                    <option value="Family Support">Family Support</option>
                  </select>
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={form.verified}
                  onChange={(e) => setForm({ ...form, verified: e.target.checked })}
                  className="h-4 w-4 rounded border-charcoal-light text-gold focus:ring-gold bg-midnight"
                />
                <span className="text-ivory/80 font-semibold">Mark listing as Verified and Active</span>
              </label>

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
                  <span className="text-midnight">Save Listing</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
