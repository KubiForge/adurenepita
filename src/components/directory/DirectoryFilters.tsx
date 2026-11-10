import React from 'react';
import { PROVINCES_AND_DISTRICTS } from '../../data/sriLankaData';
import { Search, Filter, RotateCcw } from 'lucide-react';
import { ServiceType } from '../../types/directory';

interface DirectoryFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedProvince: string;
  onProvinceChange: (province: string) => void;
  selectedDistrict: string;
  onDistrictChange: (district: string) => void;
  selectedServiceType: string;
  onServiceTypeChange: (type: string) => void;
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
  onReset,
}) => {
  const currentProvinceObj = PROVINCES_AND_DISTRICTS.find((p) => p.name === selectedProvince);

  return (
    <div className="charcoal-card p-4 sm:p-6 mb-6 space-y-4">
      <div className="flex items-center justify-between border-b border-charcoal-light pb-3">
        <h3 className="font-heading font-bold text-base text-ivory flex items-center gap-2">
          <Filter className="w-4 h-4 text-gold" />
          <span>Filter Sri Lankan Directory</span>
        </h3>
        <button
          onClick={onReset}
          className="text-xs text-ivory/50 hover:text-gold flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Filters</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Search */}
        <div className="relative">
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
        <div>
          <select
            value={selectedProvince}
            onChange={(e) => {
              onProvinceChange(e.target.value);
              onDistrictChange('');
            }}
            className="w-full px-3.5 py-2.5 rounded-xl bg-midnight border border-charcoal-light text-ivory text-xs focus:outline-none focus:border-gold"
          >
            <option value="">All Provinces (සියලු පළාත්)</option>
            {PROVINCES_AND_DISTRICTS.map((p) => (
              <option key={p.id} value={p.name}>
                {p.name} ({p.nameSi})
              </option>
            ))}
          </select>
        </div>

        {/* District Select */}
        <div>
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
                {d.name} ({d.nameSi})
              </option>
            ))}
          </select>
        </div>

        {/* Service Type Select */}
        <div>
          <select
            value={selectedServiceType}
            onChange={(e) => onServiceTypeChange(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-midnight border border-charcoal-light text-ivory text-xs focus:outline-none focus:border-gold"
          >
            <option value="">All Care Types</option>
            <option value="rehabilitation">Inpatient Rehabilitation</option>
            <option value="counseling">Psychosocial Counseling</option>
            <option value="medical">Hospital Medical Detox</option>
            <option value="family_support">Family & Peer Support</option>
          </select>
        </div>
      </div>
    </div>
  );
};
