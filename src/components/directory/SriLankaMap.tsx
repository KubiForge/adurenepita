import React, { useEffect, useRef } from 'react';
import { SupportCenter } from '../../types/directory';
import L from 'leaflet';

interface SriLankaMapProps {
  centers: SupportCenter[];
  selectedCenter: SupportCenter | null;
  onSelectCenter: (center: SupportCenter) => void;
}

export const SriLankaMap: React.FC<SriLankaMapProps> = ({
  centers,
  selectedCenter,
  onSelectCenter,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [id: string]: L.Marker }>({});

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Initialize Leaflet Map centered on Sri Lanka
      const map = L.map(mapContainerRef.current, {
        center: [7.8731, 80.7718],
        zoom: 7,
        minZoom: 6,
        maxZoom: 15,
        scrollWheelZoom: false,
      });

      // Dark editorial tile layer (CartoDB Dark Matter)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap contributors',
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear old markers
    Object.values(markersRef.current).forEach((m) => m.remove());
    markersRef.current = {};

    // Add new markers for verified centers
    centers.forEach((center) => {
      const isSelected = selectedCenter?.id === center.id;

      const customIcon = L.divIcon({
        className: 'custom-map-marker',
        html: `
          <div style="
            background: ${isSelected ? '#F1DFA5' : '#D8BE82'};
            border: 2px solid ${isSelected ? '#FFFFFF' : '#101113'};
            width: ${isSelected ? '28px' : '22px'};
            height: ${isSelected ? '28px' : '22px'};
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 12px rgba(216, 190, 130, 0.7);
            cursor: pointer;
            transition: all 0.2s ease;
          ">
            <div style="width: 8px; height: 8px; background: #101113; border-radius: 50%;"></div>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      const marker = L.marker([center.latitude, center.longitude], { icon: customIcon }).addTo(map);

      marker.bindPopup(`
        <div style="color: #101113; font-family: Inter, sans-serif; padding: 4px; max-width: 240px;">
          <strong style="font-size: 13px; color: #101113; display: block; margin-bottom: 2px;">${center.name}</strong>
          <span style="font-size: 11px; color: #8F7952; font-weight: 600;">${center.district} • ${center.city}</span>
          <p style="font-size: 11px; color: #434347; margin: 4px 0;">${center.address}</p>
          <div style="margin-top: 6px; padding-top: 4px; border-top: 1px solid #ddd; font-size: 12px;">
            <strong>Phone:</strong> <a href="tel:${center.phone}" style="color: #BA9F60; font-weight: bold;">${center.phone}</a>
          </div>
        </div>
      `);

      marker.on('click', () => {
        onSelectCenter(center);
      });

      markersRef.current[center.id] = marker;
    });

    // If a center is selected, pan map to it
    if (selectedCenter && markersRef.current[selectedCenter.id]) {
      map.setView([selectedCenter.latitude, selectedCenter.longitude], 11, {
        animate: true,
      });
      markersRef.current[selectedCenter.id].openPopup();
    }
  }, [centers, selectedCenter, onSelectCenter]);

  return (
    <div className="relative w-full h-[450px] lg:h-[550px] rounded-2xl overflow-hidden border border-gold/30 shadow-2xl">
      <div ref={mapContainerRef} className="w-full h-full" />
      <div className="absolute bottom-3 left-3 bg-midnight/90 border border-charcoal-light p-2.5 rounded-lg text-[11px] text-ivory/80 z-[1000] backdrop-blur-md shadow-md max-w-xs">
        <p className="font-semibold text-gold">Sri Lanka Support Locator</p>
        <p className="text-ivory/60">Click any marker pin to inspect verified hospital or rehabilitation facilities.</p>
      </div>
    </div>
  );
};
