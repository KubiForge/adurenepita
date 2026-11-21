export function detectLanguage(
  text: string,
  explicitLang?: 'si' | 'en' | 'ta'
): 'si' | 'en' | 'ta' {
  if (explicitLang && ['si', 'en', 'ta'].includes(explicitLang)) {
    return explicitLang;
  }

  const trimmed = text.trim();

  // Check for Sinhala Unicode characters
  if (/[\u0D80-\u0DFF]/.test(trimmed)) {
    return 'si';
  }

  // Check for Tamil Unicode characters
  if (/[\u0B80-\u0BFF]/.test(trimmed)) {
    return 'ta';
  }

  // Check for common Singlish patterns
  const singlishPatterns = [
    /\b(mata|mage|oyata|oyage|kohomada|monawada|karanna|hithanawa|ona|one|epa|naha|nane|puluwanda|udaw|yaaluwa|mallita|ayyata|bota|bona|ganna|dila|math|dath)\b/i,
    /\b(sihiya|husma|marenna|jeewithe|abbahi|rehab)\b/i,
  ];

  for (const pattern of singlishPatterns) {
    if (pattern.test(trimmed)) {
      return 'si';
    }
  }

  // Default to English
  return 'en';
}
