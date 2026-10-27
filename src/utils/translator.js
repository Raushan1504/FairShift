// Translation Utility with Real-Time Google Translate API + Offline Fallback Dictionary
// Requirement: https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=...

const OFFLINE_FALLBACKS = {
  // Common Tamil phrases in construction and campus
  'நான்காவது தளத்தில் சாரக்கட்டு கம்பிகள் தளர்வாக உள்ளன': 'On the fourth floor, the scaffolding pipes are loose and unstable.',
  'பாதுகாப்பு வலை கிழிக்கப்பட்டுள்ளது': 'The safety catch-net is torn and needs immediate replacement.',
  'மின்சார கம்பி அறுந்து விழுந்துள்ளது': 'Live electrical wire has snapped and fallen on the ground.',
  'தண்ணீர் கசிவு ஏற்பட்டுள்ளது': 'Water leakage has occurred causing hazardous slippery conditions.',
  'சமையலறையில் புகை அதிகமாக உள்ளது': 'Excessive smoke accumulated in the kitchen area.',
  'கையுறைகள் இல்லை': 'Safety gloves have not been provided.',
  'ஹெல்மெட் உடைந்திருக்கிறது': 'Safety helmet is cracked/damaged.',
  'லிப்ட் வேலை செய்யவில்லை': 'Material hoist/elevator is not functioning safely.',
  
  // Common Hindi phrases
  'पानी में बिजली का तार डूबा है': 'Electric wire is submerged in water; high shock risk.',
  'मचान ढीला है': 'The scaffolding is loose and shaking.',
  'सेफ्टी बेल्ट नहीं मिला': 'Safety harness/belt was not provided.',
  'फर्श पर केमिकल गिर गया है': 'Hazardous chemical spilled on the floor.',
  'सिलेंडर से गैस लीक हो रही है': 'Gas cylinder is leaking in the kitchen area.',
  'कचरा मशीन जाम हो गई है': 'Waste compactor machine has jammed with debris.',
};

export function detectLanguage(text = '') {
  if (!text) return { code: 'en', name: 'English' };
  
  // Tamil Unicode block: U+0B80 to U+0BFF
  if (/[\u0B80-\u0BFF]/.test(text)) {
    return { code: 'ta', name: 'Tamil' };
  }
  
  // Devanagari (Hindi) Unicode block: U+0900 to U+097F
  if (/[\u0900-\u097F]/.test(text)) {
    return { code: 'hi', name: 'Hindi' };
  }
  
  return { code: 'en', name: 'English' };
}

export async function translateToEnglish(text, sourceLang = 'auto') {
  if (!text || text.trim() === '') {
    return { translatedText: '', detectedLang: 'en', detectedLangName: 'English' };
  }

  const detected = detectLanguage(text);
  if (detected.code === 'en' && sourceLang === 'auto') {
    return {
      translatedText: text,
      detectedLang: 'en',
      detectedLangName: 'English'
    };
  }

  // Check offline dictionary match
  const trimmed = text.trim();
  for (const [phrase, translation] of Object.entries(OFFLINE_FALLBACKS)) {
    if (trimmed.includes(phrase)) {
      return {
        translatedText: translation,
        detectedLang: detected.code,
        detectedLangName: detected.name,
        offlineMatch: true
      };
    }
  }

  // Attempt real-time fetch via Google Translate API
  try {
    const sl = sourceLang === 'auto' ? (detected.code !== 'en' ? detected.code : 'auto') : sourceLang;
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=en&dt=t&q=${encodeURIComponent(text)}`;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000); // 4 second timeout

    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      // Google Translate returns format: [[["Translated text", "Original text", null, null, 10]], ...]
      if (Array.isArray(data) && Array.isArray(data[0])) {
        const fullTranslation = data[0].map(item => item[0]).filter(Boolean).join(' ');
        if (fullTranslation) {
          return {
            translatedText: fullTranslation,
            detectedLang: detected.code,
            detectedLangName: detected.name,
            provider: 'Google Translate API'
          };
        }
      }
    }
  } catch (err) {
    console.warn('Real-time Google Translate fetch failed/timed out, applying smart offline fallback:', err);
  }

  // Context-aware fallback if offline/blocked
  let smartFallback = text;
  if (detected.code === 'ta') {
    smartFallback = `[Automated Translation]: Safety hazard report filed in Tamil: "${text}" - Urgent site inspection requested.`;
  } else if (detected.code === 'hi') {
    smartFallback = `[Automated Translation]: Safety incident reported in Hindi: "${text}" - Supervisor review required immediately.`;
  }

  return {
    translatedText: smartFallback,
    detectedLang: detected.code,
    detectedLangName: detected.name,
    fallback: true
  };
}
