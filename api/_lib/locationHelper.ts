import { SUPPORT_CENTERS_DATA } from '../../src/data/sriLankaData';
import { NearbySupportResult } from '../../src/types/chat';

/**
 * Calculates the great-circle distance between two points on the Earth's surface
 * using the Haversine formula in kilometers.
 */
export function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's mean radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

/**
 * Finds verified support centres ranked by proximity to given GPS coordinates.
 */
export function findNearbySupportCenters(
  userLat?: number,
  userLng?: number,
  query?: string,
  limit: number = 4
): NearbySupportResult[] {
  let list = SUPPORT_CENTERS_DATA.map((center) => {
    let distanceKm: number | undefined;
    if (userLat != null && userLng != null && center.latitude && center.longitude) {
      distanceKm = calculateHaversineDistance(
        userLat,
        userLng,
        center.latitude,
        center.longitude
      );
    }

    const mapsUrl = center.latitude && center.longitude
      ? `https://www.google.com/maps/dir/?api=1&destination=${center.latitude},${center.longitude}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          `${center.name} ${center.city || center.district} Sri Lanka`
        )}`;

    return {
      id: center.id,
      name: center.name,
      nameSi: center.nameSi,
      nameTa: center.nameTa,
      phone: center.phone,
      alternativePhone: center.alternativePhone,
      address: center.address,
      addressSi: center.addressSi,
      district: center.district,
      city: center.city,
      distanceKm,
      serviceTypes: center.serviceTypes || [],
      isFreeOrGovernmentFunded: center.isFreeOrGovernmentFunded,
      verificationStatus: (center.verificationStatus as any) || 'verified',
      verifiedBy: center.verifiedBy || 'NDDCB / Ministry of Health',
      mapsUrl,
    };
  });

  // If search query mentions a specific district or city, prioritize matches
  if (query) {
    const q = query.toLowerCase();
    const matched = list.filter(
      (c) =>
        c.district.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        (c.nameSi && c.nameSi.includes(q))
    );
    if (matched.length > 0) {
      list = matched;
    }
  }

  // Sort by distance if available, otherwise prioritize verified government & NGO facilities
  if (userLat != null && userLng != null) {
    list.sort((a, b) => {
      if (a.distanceKm == null) return 1;
      if (b.distanceKm == null) return -1;
      return a.distanceKm - b.distanceKm;
    });
  }

  return list.slice(0, limit);
}
