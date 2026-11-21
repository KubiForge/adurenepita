import { DRUGS_DATA } from '../../src/data/drugsData';
import { SUPPORT_CENTERS_DATA } from '../../src/data/sriLankaData';
import { SourceCitation } from '../../src/types/chat';

export interface RetrievedKnowledge {
  groundingText: string;
  sources: SourceCitation[];
}

export function retrieveKnowledge(query: string): RetrievedKnowledge {
  const lower = query.toLowerCase();
  const matchedSources: SourceCitation[] = [];
  const contextParts: string[] = [];

  // Match substances in DRUGS_DATA
  for (const drug of DRUGS_DATA) {
    const isMatched =
      lower.includes(drug.name.toLowerCase()) ||
      lower.includes(drug.slug.toLowerCase()) ||
      (drug.nameSi && query.includes(drug.nameSi)) ||
      (drug.nameTa && query.includes(drug.nameTa)) ||
      drug.commonNames.some((cn) => lower.includes(cn.toLowerCase())) ||
      drug.aliases.some((al) => lower.includes(al.toLowerCase()));

    if (isMatched) {
      contextParts.push(
        `[Verified Substance Profile: ${drug.name} / ${drug.nameSi || ''}]\n` +
          `Classification: ${drug.classification}\n` +
          `Medical Description: ${drug.description}\n` +
          `Short-Term Health Effects: ${drug.shortTermEffects.slice(0, 4).join('; ')}\n` +
          `Emergency Signs / Overdose: ${drug.emergencySigns.join('; ')}\n` +
          `Withdrawal & Risks: ${drug.withdrawalRisks.join('; ')}\n` +
          `Evidence-Based Treatment Pathways: ${drug.evidenceBasedTreatment}`
      );

      for (const src of drug.sources) {
        if (!matchedSources.some((s) => s.id === src.id)) {
          matchedSources.push(src);
        }
      }
    }
  }

  // Match Sri Lankan support centers or districts
  for (const center of SUPPORT_CENTERS_DATA) {
    const isMatched =
      lower.includes(center.district.toLowerCase()) ||
      lower.includes(center.city.toLowerCase()) ||
      lower.includes(center.name.toLowerCase()) ||
      (center.nameSi && query.includes(center.nameSi));

    if (isMatched && matchedSources.length < 5) {
      contextParts.push(
        `[Verified Healthcare/Rehab Facility: ${center.name} (${center.district})]\n` +
          `Type: ${center.organizationType} | Services: ${center.serviceTypes.join(', ')}\n` +
          `Address: ${center.address} | Phone: ${center.phone}\n` +
          `Free/Gov: ${center.isFreeOrGovernmentFunded ? 'Yes' : 'No'} | Verified by: ${center.verifiedBy || 'NDDCB'}`
      );

      matchedSources.push({
        id: center.id,
        title: `${center.name} (${center.district})`,
        organization: 'Verified Sri Lanka Support Registry',
        url: center.website || 'https://nddcb.gov.lk',
        snippet: `Phone: ${center.phone} | Address: ${center.address}`,
      });
    }
  }

  // If no specific drug or center matched, provide core official hotlines as reference
  if (matchedSources.length === 0) {
    matchedSources.push({
      id: 'nddcb-helpline',
      title: 'National Dangerous Drugs Control Board (NDDCB)',
      organization: 'Government of Sri Lanka',
      url: 'https://nddcb.gov.lk',
      snippet: 'Official 1927 National Drug Information & Counseling Helpline',
    });
    matchedSources.push({
      id: 'suwaseriya-1990',
      title: '1990 Suwaseriya National Ambulance Service',
      organization: 'Ministry of Health Sri Lanka',
      url: 'https://1990.lk',
      snippet: 'Free Pre-Hospital Emergency Medical Care',
    });
  }

  return {
    groundingText: contextParts.join('\n\n'),
    sources: matchedSources,
  };
}
