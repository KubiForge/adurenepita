import React, { useState } from 'react';
import { SUPPORT_CENTERS_DATA } from '../data/sriLankaData';
import { SupportCenter } from '../types/directory';
import { SriLankaMap } from '../components/directory/SriLankaMap';
import { SupportCenterCard } from '../components/directory/SupportCenterCard';
import { DirectoryFilters } from '../components/directory/DirectoryFilters';
import { ReferralRequestModal } from '../components/directory/ReferralRequestModal';
import { Map, List, ShieldCheck, PhoneCall } from 'lucide-react';
import { Button } from '../components/common/Button';
import { ASSETS } from '../config/assets';

export const SupportDirectoryPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedServiceType, setSelectedServiceType] = useState('');

  const [selectedCenter, setSelectedCenter] = useState<SupportCenter | null>(null);
  const [referralCenter, setReferralCenter] = useState<SupportCenter | null>(null);
  const [viewMode, setViewMode] = useState<'both' | 'map' | 'list'>('both');

  const filteredCenters = SUPPORT_CENTERS_DATA.filter((center) => {
    const matchQuery =
      center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      center.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      center.district.toLowerCase().includes(searchQuery.toLowerCase());

    const matchProvince = !selectedProvince || center.province.toLowerCase() === selectedProvince.toLowerCase();
    const matchDistrict = !selectedDistrict || center.district.toLowerCase() === selectedDistrict.toLowerCase();
    const matchType = !selectedServiceType || (center.serviceTypes as string[]).includes(selectedServiceType);

    return matchQuery && matchProvince && matchDistrict && matchType;
  });

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedProvince('');
    setSelectedDistrict('');
    setSelectedServiceType('');
  };

  const handleReportError = (center: SupportCenter) => {
    alert(
      `Thank you for helping us maintain data accuracy. A verification ticket for "${center.name}" has been logged for the Technical Crew.`
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Page Header */}
      <div
        className="relative isolate overflow-hidden rounded-3xl border border-gold/20 px-6 py-10 sm:px-10 sm:py-14"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(16, 17, 19, 0.98) 0%, rgba(16, 17, 19, 0.86) 52%, rgba(16, 17, 19, 0.28) 100%), url(${ASSETS.servicesBg})`,
          backgroundPosition: 'center, right center',
          backgroundSize: 'cover',
        }}
      >
        <div className="max-w-2xl space-y-3">
          <span className="text-xs uppercase tracking-wider text-gold font-bold">
            Verified Sri Lankan Directory
          </span>
          <h1 className="text-4xl font-bold font-heading text-ivory">
            Find Rehabilitation & Professional Support
          </h1>
          <p className="text-sm text-ivory/80 leading-relaxed">
            Locate verified government hospitals, NDDCB residential rehabilitation centers, and non-profit counseling facilities across all 9 provinces and 25 districts.
          </p>
        </div>
      </div>

      {/* Directory Filter Component */}
      <DirectoryFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedProvince={selectedProvince}
        onProvinceChange={setSelectedProvince}
        selectedDistrict={selectedDistrict}
        onDistrictChange={setSelectedDistrict}
        selectedServiceType={selectedServiceType}
        onServiceTypeChange={setSelectedServiceType}
        onReset={handleResetFilters}
      />

      {/* View Mode Toggle Controls */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-ivory/60 font-semibold">
          Showing <strong>{filteredCenters.length}</strong> verified facilities
        </span>

        <div className="flex p-1 rounded-xl bg-charcoal border border-charcoal-light">
          <button
            onClick={() => setViewMode('both')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'both' ? 'bg-gold text-midnight' : 'text-ivory/60 hover:text-ivory'
            }`}
          >
            Split View
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'map' ? 'bg-gold text-midnight' : 'text-ivory/60 hover:text-ivory'
            }`}
          >
            Map Only
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'list' ? 'bg-gold text-midnight' : 'text-ivory/60 hover:text-ivory'
            }`}
          >
            List Only
          </button>
        </div>
      </div>

      {/* Layout Grid */}
      <div className={`grid gap-8 ${viewMode === 'both' ? 'grid-cols-1 lg:grid-cols-12' : 'grid-cols-1'}`}>
        {/* Interactive Map */}
        {(viewMode === 'both' || viewMode === 'map') && (
          <div className={`${viewMode === 'both' ? 'lg:col-span-6 xl:col-span-7' : 'w-full'}`}>
            <SriLankaMap
              centers={filteredCenters}
              selectedCenter={selectedCenter}
              onSelectCenter={(c) => setSelectedCenter(c)}
            />
          </div>
        )}

        {/* Center Cards List */}
        {(viewMode === 'both' || viewMode === 'list') && (
          <div className={`${viewMode === 'both' ? 'lg:col-span-6 xl:col-span-5' : 'w-full'} space-y-4`}>
            {filteredCenters.length > 0 ? (
              filteredCenters.map((center) => (
                <SupportCenterCard
                  key={center.id}
                  center={center}
                  isSelected={selectedCenter?.id === center.id}
                  onSelect={() => setSelectedCenter(center)}
                  onRequestReferral={(c) => setReferralCenter(c)}
                  onReportError={handleReportError}
                />
              ))
            ) : (
              <div className="charcoal-card p-8 text-center space-y-3">
                <p className="text-sm font-semibold text-ivory">No facilities matched your filters.</p>
                <p className="text-xs text-ivory/60">Try clearing your district or care type filters.</p>
                <Button variant="charcoal" size="sm" onClick={handleResetFilters}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Confidential Referral Modal */}
      {referralCenter && (
        <ReferralRequestModal
          isOpen={!!referralCenter}
          onClose={() => setReferralCenter(null)}
          center={referralCenter}
        />
      )}
    </div>
  );
};
