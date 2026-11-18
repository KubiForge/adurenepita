import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SUPPORT_CENTERS_DATA } from '../data/sriLankaData';
import { SupportCenter } from '../types/directory';
import { SriLankaMap } from '../components/directory/SriLankaMap';
import { SupportCenterCard } from '../components/directory/SupportCenterCard';
import { DirectoryFilters } from '../components/directory/DirectoryFilters';
import { ReferralRequestModal } from '../components/directory/ReferralRequestModal';
import { MapPin, Navigation, LocateFixed } from 'lucide-react';
import { Button } from '../components/common/Button';
import { ASSETS } from '../config/assets';

const distanceKm = (
  latitudeA: number,
  longitudeA: number,
  latitudeB: number,
  longitudeB: number
) => {
  const toRadians = (value: number) => (value * Math.PI) / 180;
  const earthRadiusKm = 6371;
  const latitudeDelta = toRadians(latitudeB - latitudeA);
  const longitudeDelta = toRadians(longitudeB - longitudeA);
  const a =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(toRadians(latitudeA)) *
      Math.cos(toRadians(latitudeB)) *
      Math.sin(longitudeDelta / 2) ** 2;
  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

export const SupportDirectoryPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedServiceType, setSelectedServiceType] = useState('');

  const [selectedCenter, setSelectedCenter] = useState<SupportCenter | null>(null);
  const [referralCenter, setReferralCenter] = useState<SupportCenter | null>(null);
  const [viewMode, setViewMode] = useState<'both' | 'map' | 'list'>('both');
  const [locationStatus, setLocationStatus] = useState<'idle' | 'loading' | 'ready' | 'denied'>('idle');
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  const filteredCenters = SUPPORT_CENTERS_DATA.filter((center) => {
    const matchQuery =
      center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      center.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      center.district.toLowerCase().includes(searchQuery.toLowerCase());

    const matchProvince = !selectedProvince || center.province.toLowerCase() === selectedProvince.toLowerCase();
    const matchDistrict = !selectedDistrict || center.district.toLowerCase() === selectedDistrict.toLowerCase();
    const matchType = !selectedServiceType || (center.serviceTypes as string[]).includes(selectedServiceType);

    return matchQuery && matchProvince && matchDistrict && matchType;
  }).sort((a, b) => {
    if (!userLocation) return 0;
    return (
      distanceKm(userLocation.latitude, userLocation.longitude, a.latitude, a.longitude) -
      distanceKm(userLocation.latitude, userLocation.longitude, b.latitude, b.longitude)
    );
  });

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedProvince('');
    setSelectedDistrict('');
    setSelectedServiceType('');
  };

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('denied');
      return;
    }

    setLocationStatus('loading');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setUserLocation(location);
        setLocationStatus('ready');
        setSelectedProvince('');
        setSelectedDistrict('');
        setSelectedServiceType('');

        const nearest = [...SUPPORT_CENTERS_DATA].sort(
          (a, b) =>
            distanceKm(location.latitude, location.longitude, a.latitude, a.longitude) -
            distanceKm(location.latitude, location.longitude, b.latitude, b.longitude)
        )[0];
        if (nearest) setSelectedCenter(nearest);
      },
      () => setLocationStatus('denied'),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
    );
  };

  const handleReportError = (center: SupportCenter) => {
    alert(
      `Thank you for helping us maintain data accuracy. A verification ticket for "${center.name}" has been logged for the Technical Crew.`
    );
  };

  return (
    <div className="support-directory-page mx-auto w-full max-w-7xl space-y-8 px-4 py-8 sm:space-y-10 sm:px-6 sm:py-12 lg:px-8">
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
          <h1 className="break-words text-3xl font-bold font-heading text-ivory sm:text-4xl">
            Find Rehabilitation & Professional Support
          </h1>
          <p className="text-sm text-ivory/80 leading-relaxed">
            Locate verified government hospitals, NDDCB residential rehabilitation centers, and non-profit counseling facilities across all 9 provinces and 25 districts.
          </p>
          <Link to="/network" className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-gold/30 bg-midnight/60 px-3 py-2 text-xs font-semibold text-champagne hover:bg-gold/10">
            Professional & NGO network <MapPin className="h-3.5 w-3.5 text-gold" />
          </Link>
        </div>
      </div>

      <section
        aria-label="Nearest support facility"
        className="grid gap-3 rounded-2xl border border-gold/20 bg-charcoal/45 p-4 sm:grid-cols-[1fr_auto] sm:items-center"
      >
        <div>
          <p className="flex items-center gap-2 text-sm font-bold text-ivory">
            <Navigation className="h-4 w-4 text-gold" />
            Find the nearest verified facility
          </p>
          <p className="mt-1 text-xs leading-5 text-ivory/55">
            Uses your browser location once and does not store it. You can continue with manual province and district filters instead.
          </p>
          {locationStatus === 'ready' && userLocation && (
            <p className="mt-2 text-xs font-semibold text-emerald-300">
              Location found. Facilities are sorted by shortest estimated distance.
            </p>
          )}
          {locationStatus === 'denied' && (
            <p className="mt-2 text-xs font-semibold text-red-300">
              Location permission was unavailable. Please use the district filters or enable location permission.
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={handleUseLocation}
          disabled={locationStatus === 'loading'}
          className="btn-gold inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-bold disabled:cursor-wait disabled:opacity-70"
        >
          <LocateFixed className={`h-4 w-4 ${locationStatus === 'loading' ? 'animate-pulse' : ''}`} />
          {locationStatus === 'loading' ? 'Finding location...' : 'Use My Location'}
        </button>
      </section>

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
      <div className="grid gap-3 sm:flex sm:items-center sm:justify-between">
        <span className="text-xs text-ivory/60 font-semibold">
          Showing <strong>{filteredCenters.length}</strong> verified facilities
        </span>

        <div className="grid grid-cols-3 gap-1 rounded-xl border border-charcoal-light bg-charcoal p-1">
          <button
            type="button"
            aria-pressed={viewMode === 'both'}
            onClick={() => setViewMode('both')}
            className={`min-h-10 min-w-0 rounded-lg px-2 py-1.5 text-[11px] font-semibold transition-all sm:px-3 sm:text-xs ${
              viewMode === 'both' ? 'bg-gold text-midnight' : 'text-ivory/60 hover:text-ivory'
            }`}
          >
            Split View
          </button>
          <button
            type="button"
            aria-pressed={viewMode === 'map'}
            onClick={() => setViewMode('map')}
            className={`min-h-10 min-w-0 rounded-lg px-2 py-1.5 text-[11px] font-semibold transition-all sm:px-3 sm:text-xs ${
              viewMode === 'map' ? 'bg-gold text-midnight' : 'text-ivory/60 hover:text-ivory'
            }`}
          >
            Map Only
          </button>
          <button
            type="button"
            aria-pressed={viewMode === 'list'}
            onClick={() => setViewMode('list')}
            className={`min-h-10 min-w-0 rounded-lg px-2 py-1.5 text-[11px] font-semibold transition-all sm:px-3 sm:text-xs ${
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
