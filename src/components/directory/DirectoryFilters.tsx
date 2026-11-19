import React from 'react';
import { PROVINCES_AND_DISTRICTS } from '../../data/sriLankaData';
import { Search, Filter, RotateCcw } from 'lucide-react';
import { SUPPORT_PROGRAM_FILTERS, SupportProgram } from '../../types/directory';

interface DirectoryFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedProvince: string;
  onProvinceChange: (province: string) => void;
  selectedDistrict: string;
  onDistrictChange: (district: string) => void;
  selectedServiceType: string;
  onServiceTypeChange: (type: string) => void;
  selectedProgram: SupportProgram | '';
  onProgramChange: (program: SupportProgram | '') => void;
  onReset: () => void;
}

export const DirectoryFilters: React.FC<DirectoryFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedProvince,
  onProvinceChange,
  selectedDistrict,
  onDistrictChange,
  selectedServiceType,
  onServiceTypeChange,
  selectedProgram,
  onProgramChange,
  onReset,
}) => {
  const currentProvinceObj = PROVINCES_AND_DISTRICTS.find((p) => p.name === selectedProvince);

  return (
    <div className="charcoal-card p-4 sm:p-6 mb-6 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-charcoal-light pb-3">
        <h3 className="flex min-w-0 items-center gap-2 font-heading text-base font-bold text-ivory">
          <Filter className="w-4 h-4 text-gold" />
          <span>Filter Sri Lankan Directory</span>
        </h3>
        <button
          onClick={onReset}
          className="inline-flex min-h-10 shrink-0 items-center gap-1 text-xs text-ivory/50 transition-colors hover:text-gold"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Filters</span>
        </button>
      </div>

      <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {/* Search */}
        <div className="relative min-w-0">
          <Search className="w-4 h-4 text-ivory/40 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search center name or town..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-midnight border border-charcoal-light text-ivory text-xs focus:outline-none focus:border-gold placeholder:text-ivory/40"
          />
        </div>

        {/* Province Select */}
        <div className="min-w-0">
          <select
            value={selectedProvince}
            onChange={(e) => {
              onProvinceChange(e.target.value);
              onDistrictChange('');
            }}
            className="w-full px-3.5 py-2.5 rounded-xl bg-midnight border border-charcoal-light text-ivory text-xs focus:outline-none focus:border-gold"
          >
            <option value="">All Provinces</option>
            {PROVINCES_AND_DISTRICTS.map((p) => (
              <option key={p.id} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* District Select */}
        <div className="min-w-0">
          <select
            value={selectedDistrict}
            onChange={(e) => onDistrictChange(e.target.value)}
            disabled={!selectedProvince}
            className="w-full px-3.5 py-2.5 rounded-xl bg-midnight border border-charcoal-light text-ivory text-xs focus:outline-none focus:border-gold disabled:opacity-50"
          >
            <option value="">
              {selectedProvince ? 'All Districts in Province' : 'Select Province First'}
            </option>
            {currentProvinceObj?.districts.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        {/* Service Type Select */}
        <div className="min-w-0">
          <select
            value={selectedServiceType}
            onChange={(e) => onServiceTypeChange(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-midnight border border-charcoal-light text-ivory text-xs focus:outline-none focus:border-gold"
          >
            <option value="">All Care Types</option>
            <option value="rehabilitation">Rehabilitation</option>
            <option value="referral">Hospital referral (not rehab)</option>
            <option value="counseling">Psychosocial Counseling</option>
            <option value="medical">Medical Care</option>
            <option value="family_support">Family Support</option>
            <option value="peer_support">Peer Support</option>
            <option value="hotline">Helpline</option>
          </select>
        </div>

        <div className="min-w-0">
          <label htmlFor="support-program-filter" className="sr-only">Filter by program or population</label>
          <select
            id="support-program-filter"
            value={selectedProgram}
            onChange={(e) => {
              const program = SUPPORT_PROGRAM_FILTERS.find((option) => option.id === e.target.value)?.id || '';
              onProgramChange(program);
            }}
            className="w-full px-3.5 py-2.5 rounded-xl bg-midnight border border-charcoal-light text-ivory text-xs focus:outline-none focus:border-gold"
          >
            <option value="">All Programs & Populations</option>
            {SUPPORT_PROGRAM_FILTERS.map((program) => (
              <option key={program.id} value={program.id}>
                {program.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <p className="text-[11px] leading-relaxed text-ivory/50">
        Program filters include only listings with confirmed tags. A missing result does not mean a
        facility cannot provide that service; contact the facility to confirm.
      </p>
    </div>
  );
};
