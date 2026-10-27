// Local Dialect & Slang Detection and Normalization Engine
// Handles vernacular idioms, Madras Tamil / Chennai slang, Bhojpuri, and Hindi migrant worker dialects

export const DIALECT_DICTIONARY = [
  // Tamil / Chennai Vernacular Slang
  {
    patterns: [/காசு\s*(வெட்டு|புடி|பிடி|குறை|தரல)/i, /சம்பளம்\s*(வெட்டி|குறைச்சு|தரல)/i, /ஓவர்\s*டைம்\s*காசு\s*போடல/i],
    dialect: 'Madras Tamil (Chennai Worker Slang)',
    category: 'Wage Theft / Unpaid Overtime',
    standardTermTamil: 'சம்பளப் பிடித்தம் மற்றும் கூடுதல் நேர ஊதியம் வழங்காமை',
    normalizedEnglish: 'Unlawful wage deduction and withholding of overtime remuneration.',
    severity: 'High'
  },
  {
    patterns: [/திட்டு(றாரு|னார்|றாங்க)/i, /கெட்ட\s*வார்த்தை/i, /அசிங்கமா\s*பேசு/i, /மானபங்கம்/i],
    dialect: 'Tamil Vernacular Colloquial',
    category: 'Verbal Abuse & Workplace Harassment',
    standardTermTamil: 'பணியிடத்தில் அவமதிப்பு மற்றும் வாய்மொழி துன்புறுத்தல்',
    normalizedEnglish: 'Verbal abuse, profanity, and harassment violating dignity of labor.',
    severity: 'High'
  },
  {
    patterns: [/சாரக்கட்டு\s*(ஆடுது|சரியில்ல|விழுந்து)/i, /சாராம்\s*(ஆடுது|இளகி)/i, /மசானம்/i],
    dialect: 'Tamil Construction Site Slang (சாராம்/மசானம்)',
    category: 'Scaffolding & Structural Fall Risk',
    standardTermTamil: 'சாரக்கட்டு நிலைத்தன்மையின்மை மற்றும் கீழே விழும் ஆபத்து',
    normalizedEnglish: 'Unstable scaffolding structure and imminent fall hazard at height.',
    severity: 'Critical'
  },
  {
    patterns: [/கையுற\s*(இல்ல|குடுக்கல)/i, /ஹெல்மெட்\s*(இல்ல|உடைஞ்சு)/i, /சேப்டி\s*பெல்ட்\s*இல்ல/i],
    dialect: 'Tamil Workplace Safety Terms',
    category: 'Safety Gear & PPE Denial',
    standardTermTamil: 'பாதுகாப்பு உபகரணங்கள் (PPE) மறுப்பு',
    normalizedEnglish: 'Denial or non-provision of mandatory personal protective equipment.',
    severity: 'Critical'
  },
  {
    patterns: [/வேலை\s*விட்டு\s*(தூக்கிடுவேன்|அனுப்பிடுவேன்|வெரட்டிடுவேன்)/i, /அட்டண்டன்ஸ்\s*கட்/i, /மிரட்டு(றாரு|னார்)/i],
    dialect: 'Madras Tamil Intimidation Slang',
    category: 'Coercive Retaliation & Intimidation',
    standardTermTamil: 'பழிவாங்கும் மிரட்டல் மற்றும் பணிநீக்க அச்சுறுத்தல்',
    normalizedEnglish: 'Coercive retaliation, threats of termination, and attendance deletion.',
    severity: 'Critical'
  },
  {
    patterns: [/ராத்திரி\s*பூரா\s*வேலை/i, /வீட்டுக்கு\s*போக\s*விடல/i, /ஜோர்டா\s*வேலை\s*வாங்கு/i],
    dialect: 'Tamil Colloquial',
    category: 'Forced Turnaround & Excessive Hours',
    standardTermTamil: 'கட்டாய கூடுதல் பணி மற்றும் தூக்கமின்மை',
    normalizedEnglish: 'Forced turnaround and excessive hours without statutory rest.',
    severity: 'High'
  },

  // Hindi & Bhojpuri Migrant Labor Idioms
  {
    patterns: [/दिहाड़ी\s*(काट\s*ली|रोक\s*ली|नहीं\s*दी)/i, /पैसा\s*(काट\s*लिया|नहीं\s*मिला)/i, /हक\s*मारी/i],
    dialect: 'Hindi / Bhojpuri Migrant Worker Dialect (दिहाड़ी)',
    category: 'Wage Theft / Unpaid Overtime',
    standardTermHindi: 'दैनिक मजदूरी की अवैध कटौती एवं भुगतान में हेराफेरी',
    normalizedEnglish: 'Unlawful wage deduction and withholding of earned daily wages.',
    severity: 'High'
  },
  {
    patterns: [/गाली\s*(गलौज|दी|देते\s*हैं)/i, /बेइज्जत\s*किया/i, /अपमान/i, /धौंस/i],
    dialect: 'Hindi Vernacular Colloquial',
    category: 'Verbal Abuse & Workplace Harassment',
    standardTermHindi: 'गाली-गलौज एवं मानवीय गरिमा का उल्लंघन',
    normalizedEnglish: 'Verbal abuse, intimidation, and indignity in the workplace.',
    severity: 'High'
  },
  {
    patterns: [/मचान\s*(हिल\s*रहा|ढीला|टूटा)/i, /सीढ़ी\s*टूटी/i],
    dialect: 'Hindi Construction Vernacular (मचान)',
    category: 'Scaffolding & Structural Fall Risk',
    standardTermHindi: 'मचान की अस्थिरता और ऊंचाई से गिरने का गंभीर जोखिम',
    normalizedEnglish: 'Unstable scaffolding and structural hazard at elevation.',
    severity: 'Critical'
  },
  {
    patterns: [/सेफ्टी\s*(बेल्ट|हेलमेट|दस्ताने)\s*(नहीं\s*दिया|छीन\s*लिया)/i, /बिना\s*सामान\s*के\s*काम/i],
    dialect: 'Hindi Labor Safety Slang',
    category: 'Safety Gear & PPE Denial',
    standardTermHindi: 'सुरक्षा उपकरण (PPE) उपलब्ध न कराना',
    normalizedEnglish: 'Willful denial of mandatory life-safety gear and PPE.',
    severity: 'Critical'
  },
  {
    patterns: [/काम\s*से\s*(निकालने|भगाने)\s*की\s*धमकी/i, /हाजिरी\s*काटने\s*की\s*धमकी/i, /धमका\s*रहा/i],
    dialect: 'Hindi Migrant Labor Intimidation',
    category: 'Coercive Retaliation & Intimidation',
    standardTermHindi: 'बदले की भावना से नौकरी से निकालने की धमकी',
    normalizedEnglish: 'Coercive intimidation and retaliatory threats to terminate employment.',
    severity: 'Critical'
  },
  {
    patterns: [/रात\s*भर\s*जबरदस्ती\s*काम/i, /जाने\s*नहीं\s*दिया/i, /बिना\s*आराम\s*के/i],
    dialect: 'Hindi Colloquial Turnaround',
    category: 'Forced Turnaround & Excessive Hours',
    standardTermHindi: 'जबरन अत्यधिक काम और वैधानिक आराम न देना',
    normalizedEnglish: 'Forced overtime and denial of statutory turnaround rest periods.',
    severity: 'High'
  }
];

export function analyzeLocalDialect(text = '') {
  if (!text || text.trim() === '') {
    return {
      dialectDetected: false,
      dialectName: 'Standard / Neutral',
      normalizedTerm: text,
      matchedCategory: null
    };
  }

  for (const entry of DIALECT_DICTIONARY) {
    for (const pattern of entry.patterns) {
      if (pattern.test(text)) {
        return {
          dialectDetected: true,
          dialectName: entry.dialect,
          matchedCategory: entry.category,
          normalizedEnglish: entry.normalizedEnglish,
          standardTermLocal: entry.standardTermTamil || entry.standardTermHindi,
          severity: entry.severity
        };
      }
    }
  }

  return {
    dialectDetected: false,
    dialectName: 'Standard Regional Speech',
    normalizedEnglish: text,
    matchedCategory: null
  };
}
