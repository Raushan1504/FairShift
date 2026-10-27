// Simple Local Language Dictionary (English, Tamil, Hindi)
// Tailored for low-literacy frontline workers with clear visual and audio cues
// Provides localized names, roles, supervisors, hazard categories, and misconduct tags

export const TRANSLATIONS = {
  en: {
    appName: 'FairShift',
    sdgTag: 'SDG 8 Decent Work',
    workerPortal: 'Worker Portal',
    adminPortal: 'Central Admin',
    metroSector: 'Metro Rail Construction',
    campusSector: 'Campus Facility Ops',
    readAloud: 'Read Aloud',
    stopVoice: 'Stop Voice',
    withinGeofence: 'Within Site Geofence',
    liveGps: 'Live GPS Active',
    shiftActive: 'Current Active Shift',
    shiftEnded: 'Off Shift • Ready to Punch In',
    punchIn: 'Punch In (Start Shift)',
    punchOut: 'Punch Out (End Shift)',
    takeBreak: 'Take 15m Rest Break',
    resumeWork: 'Resume Work',
    wageLedger: 'Transparent Wage Ledger',
    zeroDeductions: 'Zero deductions • 1.5x overtime guaranteed',
    dailyEarned: 'Daily Total Earned Today:',
    auditVerified: 'Audit Verified',
    standardHours: 'Standard Hours',
    overtimeHours: 'Overtime (1.5x)',
    reportHazard: 'Report Hazard via Voice',
    reportHazardSub: 'Speak in Tamil or Hindi • Auto-translated to English',
    anonymousGrievance: 'Anonymous Misconduct Ledger',
    anonymousGrievanceSub: 'Bypasses site supervisors • Direct to Central HR',
    skillPassport: 'Digital Skill Passport',
    skillPassportSub: 'Verified Hours • Never restart from zero',
    dutySupervisor: 'Duty Supervisor Today:',
    siteGeofence: 'Site Geofence:',
    monitored: 'Active & Monitored',
    
    // Voice Hazard Modal
    voiceHazardTitle: 'Voice Hazard Reporter',
    voiceHazardSub: 'Speak naturally in Tamil, Hindi or English',
    selectCategory: '1. Select Hazard Category:',
    tapToSpeak: 'Tap to Speak Hazard',
    listening: 'Listening... Speak native hazard details',
    capturedSpeech: 'Captured Native Speech:',
    translatedDispatch: 'Auto-Translated (English for Dispatch):',
    severityLevel: 'Severity Level:',
    locationZone: 'Location Zone:',
    attachPhoto: '+ Attach Photo',
    photoAttached: '✓ Photo Attached',
    submitHazard: 'Submit Hazard Ticket Instantly',

    // Grievance Modal
    grievanceTitle: 'Anonymous Misconduct Ledger',
    zeroRetaliation: 'Zero Retaliation',
    grievanceSub: 'Direct to Central HR • Completely Bypasses Site Supervisors',
    zkpBannerTitle: '100% Zero-Trace Cryptographic Decoupling:',
    zkpBannerDesc: 'Your name, phone number, and badge ID are mathematically stripped before transmission. Your report is stamped with a one-way hashed token proving you are an active worker on site without exposing your identity.',
    natureOfViolation: '1. Nature of Misconduct / Violation:',
    reportedSupervisor: '2. Reported Supervisor / Person in Authority:',
    supervisorWarning: 'Supervisor cannot view complaints filed against them or delete any logs.',
    speakGrievancePrompt: '3. Speak or Type Honest Account of What Happened:',
    speakGrievanceBtn: 'Tap Mic to Speak Grievance',
    speakingGrievance: 'Listening to your grievance...',
    aiAdjudicationTitle: 'AI Compliance Adjudication Engine (SDG 8 & Labor Standards)',
    assignedToken: 'Assigned Anonymous Token:',
    submitGrievance: 'Submit Protected Anonymous Grievance',
    
    // Skill Passport Modal
    passportTitle: 'Verifiable Digital Skill Passport',
    passportSub: 'Portable career credentials across contractors & sites',
    totalHours: 'Total Hours',
    tenure: 'Tenure',
    zeroIncident: 'Zero Incident',
    instantQrTransfer: 'Instant Employer QR Transfer',
    qrTransferDesc: 'Scan with any contractor device to verify cumulative hours and certified skills immediately. Eliminates starting from zero pay when changing sites.',
    verifiedCerts: 'Verified Certifications & Competencies:'
  },

  ta: {
    appName: 'ஃபேர்ஷிஃப்ட்',
    sdgTag: 'SDG 8 நியாயமான பணி',
    workerPortal: 'தொழிலாளர் பக்கம்',
    adminPortal: 'மத்திய நிர்வாகம் (Central HR)',
    metroSector: '🏗️ மெட்ரோ ரயில் கட்டுமானம்',
    campusSector: '🎓 வளாகப் பணிகள் & விடுதி மேலாண்மை',
    readAloud: 'குரலில் கேள்',
    stopVoice: 'நிறுத்து',
    withinGeofence: 'பணி எல்லைக்குள் உள்ளீர்கள்',
    liveGps: 'நேரலை GPS இயங்குகிறது',
    shiftActive: 'தற்போது பணியில் உள்ளீர்கள்',
    shiftEnded: 'பணி தொடங்க தயார் (வரவு வை)',
    punchIn: 'பணி தொடங்கு (Punch In)',
    punchOut: 'பணி முடி (Punch Out)',
    takeBreak: '15 நிமிடம் ஓய்வு எடு',
    resumeWork: 'பணியை தொடர்',
    wageLedger: 'வெளிப்படையான சம்பளப் பட்டியல்',
    zeroDeductions: 'சம்பளப் பிடித்தம் இல்லை • 1.5 மடங்கு கூடுதல் ஊதியம்',
    dailyEarned: 'இன்றைய மொத்த சம்பளம்:',
    auditVerified: 'சரிபார்க்கப்பட்டது',
    standardHours: 'வழக்கமான நேரம்',
    overtimeHours: 'கூடுதல் நேரம் (1.5 மடங்கு)',
    reportHazard: 'குரல் மூலம் ஆபத்தை தெரிவி',
    reportHazardSub: 'தமிழில் பேசுங்கள் • தானாகவே ஆங்கிலத்தில் மொழிபெயர்க்கப்படும்',
    anonymousGrievance: 'ரகசிய புகார் பதிவு (பயமில்லை)',
    anonymousGrievanceSub: 'மேற்பார்வையாளருக்கு தெரியாது • நேராக தலைமை HR-க்கு போகும்',
    skillPassport: 'டிஜிட்டல் திறன் பாஸ்போர்ட்',
    skillPassportSub: 'உங்கள் அனுபவச் சான்று • புதிய இடத்தில் சம்பளம் குறையாது',
    dutySupervisor: 'இன்றைய மேற்பார்வையாளர்:',
    siteGeofence: 'பணி எல்லை (GPS):',
    monitored: 'பாதுகாக்கப்பட்டு கண்காணிக்கப்படுகிறது',
    
    // Voice Hazard Modal
    voiceHazardTitle: 'குரல் வழி ஆபத்து அறிவிப்பு',
    voiceHazardSub: 'இயல்பாக தமிழில் பேசுங்கள்',
    selectCategory: '1. ஆபத்து வகையைத் தேர்ந்தெடுக்கவும்:',
    tapToSpeak: 'மைக்கை அழுத்தி பேசவும்',
    listening: 'கேட்கிறது... தமிழில் விவரிக்கவும்',
    capturedSpeech: 'பதிவான உங்கள் குரல்:',
    translatedDispatch: 'ஆங்கில மொழிபெயர்ப்பு (அதிகாரிகளுக்கு அனுப்ப):',
    severityLevel: 'ஆபத்தின் தீவிரம்:',
    locationZone: 'இடம் / பகுதி:',
    attachPhoto: '+ படம் இணைக்கவும்',
    photoAttached: '✓ படம் இணைக்கப்பட்டது',
    submitHazard: 'உடனே ஆபத்தை பதிவு செய்',

    // Grievance Modal
    grievanceTitle: 'ரகசிய புகார் பதிவு (பழிவாங்கல் பயமில்லை)',
    zeroRetaliation: '100% பழிவாங்கல் பாதுகாப்பு',
    grievanceSub: 'நேராக தலைமை அலுவலகத்திற்கு போகும் • மேற்பார்வையாளரால் பார்க்க முடியாது',
    zkpBannerTitle: '100% முழு ரகசிய குறியீட்டு பாதுகாப்பு:',
    zkpBannerDesc: 'உங்கள் பெயர், தொலைபேசி எண், அடையாள அட்டை விவரங்கள் எதுவும் காட்டப்படாது. நீங்கள் பணியாளர் என்பதை மட்டும் கணித ரீதியாக உறுதி செய்யும் பாதுகாப்பான ரகசிய குறியீட்டுடன் புகார் செல்லும்.',
    natureOfViolation: '1. புகாரின் தன்மை / என்ன நடந்தது:',
    reportedSupervisor: '2. புகார் செய்யப்படும் மேற்பார்வையாளர்:',
    supervisorWarning: 'மேற்பார்வையாளரால் உங்கள் புகாரை பார்க்கவோ அழிக்கவோ முடியாது.',
    speakGrievancePrompt: '3. என்ன நடந்தது என்பதை தமிழில் பேசவும் அல்லது எழுதவும்:',
    speakGrievanceBtn: 'மைக்கை அழுத்தி புகாரை பேசவும்',
    speakingGrievance: 'உங்கள் புகாரை பதிவு செய்கிறது...',
    aiAdjudicationTitle: 'AI தொழிலாளர் உரிமை ஆய்வு (SDG 8 & சட்ட விதிமுறை)',
    assignedToken: 'ஒதுக்கப்பட்ட ரகசிய குறியீடு:',
    submitGrievance: 'பாதுகாப்பாக புகாரை பதிவு செய்',

    // Skill Passport Modal
    passportTitle: 'சரிபார்க்கப்பட்ட திறன் பாஸ்போர்ட்',
    passportSub: 'வேலை மாறும் போது உங்கள் சம்பளம் குறையாமல் இருக்க உதவும் சான்று',
    totalHours: 'மொத்த மணிநேரம்',
    tenure: 'அனுபவம்',
    zeroIncident: 'விபத்தில்லா நாட்கள்',
    instantQrTransfer: 'QR குறியீடு மூலம் உடனடி சரிபார்ப்பு',
    qrTransferDesc: 'புதிய ஒப்பந்ததாரர் இந்த QR-ஐ ஸ்கேன் செய்து உங்கள் உழைப்பையும் அனுபவத்தையும் உடனே உறுதி செய்யலாம். மீண்டும் பூஜ்ஜியத்தில் இருந்து தொடங்க வேண்டியதில்லை.',
    verifiedCerts: 'அங்கீகரிக்கப்பட்ட திறன்கள் & சான்றிதழ்கள்:'
  },

  hi: {
    appName: 'फेयरशिफ्ट',
    sdgTag: 'SDG 8 उचित कार्य',
    workerPortal: 'श्रमिक पोर्टल',
    adminPortal: 'केंद्रीय प्रशासन (Central HR)',
    metroSector: '🏗️ मेट्रो रेल निर्माण साइट',
    campusSector: '🎓 परिसर सुविधा एवं संचालन',
    readAloud: 'आवाज़ में सुनें',
    stopVoice: 'आवाज़ रोकें',
    withinGeofence: 'कार्य सीमा के अंदर हैं',
    liveGps: 'लाइव GPS सक्रिय',
    shiftActive: 'वर्तमान शिफ्ट चालू है',
    shiftEnded: 'शिफ्ट से बाहर • काम शुरू करने के लिए पंच करें',
    punchIn: 'काम शुरू करें (पंच इन)',
    punchOut: 'काम समाप्त (पंच आउट)',
    takeBreak: '15 मिनट का आराम लें',
    resumeWork: 'काम फिर शुरू करें',
    wageLedger: 'पारदर्शी मजदूरी खाता',
    zeroDeductions: 'कोई कटौती नहीं • 1.5 गुना ओवरटाइम गारंटी',
    dailyEarned: 'आज की कुल कमाई:',
    auditVerified: 'सत्यापित खाता',
    standardHours: 'सामान्य घंटे',
    overtimeHours: 'ओवरटाइम (1.5 गुना)',
    reportHazard: 'आवाज़ से खतरे की सूचना दें',
    reportHazardSub: 'हिंदी में बोलें • तुरंत अंग्रेजी में अनुवाद होगा',
    anonymousGrievance: 'गोपनीय शिकायत (बिना डर के)',
    anonymousGrievanceSub: 'सुपरवाइजर नहीं देख पाएंगे • सीधे हेड ऑफिस HR को जाएगा',
    skillPassport: 'डिजिटल स्किल पासपोर्ट',
    skillPassportSub: 'प्रमाणित अनुभव • नए ठेकेदार के पास भी अनुभव सुरक्षित',
    dutySupervisor: 'आज के ड्यूटी सुपरवाइजर:',
    siteGeofence: 'कार्यस्थल सीमा (GPS):',
    monitored: 'सक्रिय एवं सुरक्षित',
    
    // Voice Hazard Modal
    voiceHazardTitle: 'बोलकर खतरे की सूचना दें',
    voiceHazardSub: 'अपनी सरल भाषा में बोलें',
    selectCategory: '1. खतरे का प्रकार चुनें:',
    tapToSpeak: 'माइक दबाकर बोलें',
    listening: 'सुन रहा है... खतरे का विवरण बोलें',
    capturedSpeech: 'दर्ज हुई आपकी आवाज़:',
    translatedDispatch: 'अंग्रेजी अनुवाद (अधिकारियों को भेजने हेतु):',
    severityLevel: 'गंभीरता का स्तर:',
    locationZone: 'स्थान / क्षेत्र:',
    attachPhoto: '+ फोटो जोड़ें',
    photoAttached: '✓ फोटो संलग्न',
    submitHazard: 'खतरे की रिपोर्ट तुरंत भेजें',

    // Grievance Modal
    grievanceTitle: 'गोपनीय शिकायत (कार्रवाई का कोई डर नहीं)',
    zeroRetaliation: '100% बदले की भावना से सुरक्षा',
    grievanceSub: 'सीधे सेंट्रल HR के पास • साइट सुपरवाइजर को कभी पता नहीं चलेगा',
    zkpBannerTitle: '100% पूर्ण गोपनीय डिजिटल सुरक्षा:',
    zkpBannerDesc: 'आपका नाम, मोबाइल नंबर या पहचान कभी प्रकट नहीं की जाती। केवल एक गोपनीय टोकन के साथ शिकायत दर्ज होती है जो साबित करता है कि आप पंजीकृत कर्मचारी हैं।',
    natureOfViolation: '1. शिकायत का प्रकार / क्या समस्या है:',
    reportedSupervisor: '2. संबंधित सुपरवाइजर / अधिकारी का नाम:',
    supervisorWarning: 'सुपरवाइजर अपनी शिकायत को न देख सकते हैं और न डिलीट कर सकते हैं।',
    speakGrievancePrompt: '3. क्या हुआ, बोलकर या लिखकर बताएं:',
    speakGrievanceBtn: 'माइक दबाकर शिकायत बोलें',
    speakingGrievance: 'शिकायत दर्ज हो रही है...',
    aiAdjudicationTitle: 'AI श्रमिक अधिकार जांच (SDG 8 एवं श्रम कानून)',
    assignedToken: 'गोपनीय टोकन संख्या:',
    submitGrievance: 'सुरक्षित गोपनीय शिकायत दर्ज करें',

    // Skill Passport Modal
    passportTitle: 'प्रमाणित डिजिटल स्किल पासपोर्ट',
    passportSub: 'ठेकेदार बदलने पर भी आपकी मजदूरी और अनुभव कम नहीं होगा',
    totalHours: 'कुल घंटे',
    tenure: 'अनुभव',
    zeroIncident: 'दुर्घटना-मुक्त दिन',
    instantQrTransfer: 'QR कोड से तुरंत अनुभव सत्यापन',
    qrTransferDesc: 'नया ठेकेदार इस QR कोड को स्कैन करके आपके पूरे काम के घंटे और कौशल को तुरंत सत्यापित कर सकता है। बार-बार शून्य से शुरुआत करने की जरूरत नहीं।',
    verifiedCerts: 'प्रमाणित कौशल और सर्टिफिकेट:'
  }
};

export function getTranslation(lang = 'en') {
  return TRANSLATIONS[lang] || TRANSLATIONS.en;
}

// Localized Worker Names & Roles
export const WORKER_TRANSLATIONS = {
  'WRK-C101': {
    en: { name: 'Murugan R.', role: 'Master Scaffolder' },
    ta: { name: 'முருகன் ஆர்.', role: 'தலைமை சாரக்கட்டு நிபுணர்' },
    hi: { name: 'मुरुगन आर.', role: 'मास्टर मचान कारीगर' }
  },
  'WRK-C102': {
    en: { name: 'Ramesh Patel', role: 'Tower Crane Operator' },
    ta: { name: 'ரமேஷ் படேல்', role: 'டவர் கிரேன் ஆபரேட்டர்' },
    hi: { name: 'रमेश पटेल', role: 'टावर क्रेन ऑपरेटर' }
  },
  'WRK-C103': {
    en: { name: 'Arumugam K.', role: 'Bar Bender & Welder' },
    ta: { name: 'ஆறுமுகம் கே.', role: 'கம்பி வளைப்பாளர் & வெல்டர்' },
    hi: { name: 'अरुमुगम के.', role: 'सरिया बेंडर एवं वेल्डर' }
  },
  'WRK-C104': {
    en: { name: 'Sunil Verma', role: 'Heavy Earthmover Driver' },
    ta: { name: 'சுனில் வர்மா', role: 'கனரக வாகன ஓட்டுநர்' },
    hi: { name: 'सुनील वर्मा', role: 'भारी अर्थमूवर चालक' }
  },
  'WRK-U201': {
    en: { name: 'Lakshmi S.', role: 'Hostel Mess Head Cook' },
    ta: { name: 'லக்ஷ்மி எஸ்.', role: 'தலைமை விடுதி சமையலர்' },
    hi: { name: 'लक्ष्मी एस.', role: 'छात्रावास मेस हेड कुक' }
  },
  'WRK-U202': {
    en: { name: 'Devi M.', role: 'Sanitation Lead & Housekeeping' },
    ta: { name: 'தேவி எம்.', role: 'தூய்மைப் பணி மேற்பார்வையாளர்' },
    hi: { name: 'देवी एम.', role: 'स्वच्छता प्रमुख एवं हाउसकीपिंग' }
  },
  'WRK-U203': {
    en: { name: 'Santosh Kumar', role: 'Campus Electrical Maintenance' },
    ta: { name: 'சந்தோஷ் குமார்', role: 'வளாக மின் பராமரிப்பாளர்' },
    hi: { name: 'संतोष कुमार', role: 'परिसर विद्युत रखरखाव' }
  },
  'WRK-U204': {
    en: { name: 'Pooja Sharma', role: 'Waste Management Specialist' },
    ta: { name: 'பூஜா சர்மா', role: 'கழிவு மேலாண்மை நிபுணர்' },
    hi: { name: 'पूजा शर्मा', role: 'अपशिष्ट प्रबंधन विशेषज्ञ' }
  }
};

export function getLocalizedWorker(worker, lang = 'en') {
  if (!worker) return worker;
  const match = WORKER_TRANSLATIONS[worker.id];
  if (match && match[lang]) {
    return {
      ...worker,
      name: match[lang].name || worker.name,
      role: match[lang].role || worker.role
    };
  }
  return worker;
}

// Localized Supervisors
export const SUPERVISOR_TRANSLATIONS = {
  'SUP-C1': {
    en: { name: 'Rajesh Kumar', role: 'Site In-Charge (Civil Works)', department: 'Civil Infrastructure' },
    ta: { name: 'ராஜேஷ் குமார்', role: 'களப் பொறுப்பாளர் (கட்டுமானம்)', department: 'கட்டுமான உள்கட்டமைப்பு' },
    hi: { name: 'राजेश कुमार', role: 'साइट प्रभारी (सिविल कार्य)', department: 'सिविल इंफ्रास्ट्रक्चर' }
  },
  'SUP-C2': {
    en: { name: 'Suresh Nair', role: 'Chief Safety Officer', department: 'EHS & Heavy Machinery' },
    ta: { name: 'சுரேஷ் நாயர்', role: 'தலைமை பாதுகாப்பு அதிகாரி', department: 'பாதுகாப்பு & கனரக இயந்திரம்' },
    hi: { name: 'सुरेश नायर', role: 'मुख्य सुरक्षा अधिकारी', department: 'ईएचएस एवं भारी मशीनरी' }
  },
  'SUP-C3': {
    en: { name: 'Karthik Raman', role: 'Structural Steel Supervisor', department: 'Structural Fabrication' },
    ta: { name: 'கார்த்திக் ராமன்', role: 'எஃகு கட்டமைப்பு மேற்பார்வையாளர்', department: 'எஃகு கட்டமைப்பு பிரிவு' },
    hi: { name: 'कार्तिक रमन', role: 'स्ट्रक्चरल स्टील सुपरवाइजर', department: 'स्ट्रक्चरल फैब्रिकेशन' }
  },
  'SUP-U1': {
    en: { name: 'Murugesan P.', role: 'Facility & Hostel Estate Head', department: 'Campus Estate Ops' },
    ta: { name: 'முருகேசன் பி.', role: 'வளாக & விடுதி நிர்வாக தலைவர்', department: 'வளாகப் பணிகள் பிரிவு' },
    hi: { name: 'मुरुगेसन पी.', role: 'परिसर एवं छात्रावास प्रमुख', department: 'कैंपस एस्टेट ऑपरेशंस' }
  },
  'SUP-U2': {
    en: { name: 'Anitha Krishnan', role: 'Chief Sanitation Superintendent', department: 'Hygiene & Housekeeping' },
    ta: { name: 'அனிதா கிருஷ்ணன்', role: 'தலைமை சுகாதார கண்காணிப்பாளர்', department: 'தூய்மை & சுகாதாரம்' },
    hi: { name: 'अनिता कृष्णन', role: 'मुख्य स्वच्छता अधीक्षक', department: 'स्वच्छता एवं हाउसकीपिंग' }
  },
  'SUP-U3': {
    en: { name: 'Dr. S. Venkatesh', role: 'Campus Infrastructure Director', department: 'Student Welfare & Admin' },
    ta: { name: 'டாக்டர் எஸ். வெங்கடேஷ்', role: 'வளாக உள்கட்டமைப்பு இயக்குனர்', department: 'மாணவர் நலன் & நிர்வாகம்' },
    hi: { name: 'डॉ. एस. वेंकटेश', role: 'परिसर अवसंरचना निदेशक', department: 'छात्र कल्याण एवं प्रशासन' }
  }
};

export function getLocalizedSupervisor(supervisor, lang = 'en') {
  if (!supervisor) return supervisor;
  const match = SUPERVISOR_TRANSLATIONS[supervisor.id];
  if (match && match[lang]) {
    return {
      ...supervisor,
      name: match[lang].name || supervisor.name,
      role: match[lang].role || supervisor.role,
      department: match[lang].department || supervisor.department
    };
  }
  return supervisor;
}

// Localized Misconduct Tags
export const MISCONDUCT_TAGS_I18N = {
  'Forced Unpaid Overtime': {
    en: 'Forced Unpaid Overtime',
    ta: 'சம்பளம் தராமல் கூடுதல் வேலை (Overtime)',
    hi: 'बिना मजदूरी जबरन ओवरटाइम'
  },
  'Verbal Abuse / Harassment': {
    en: 'Verbal Abuse / Harassment',
    ta: 'திட்டுதல் / அவமதிப்பு (Harassment)',
    hi: 'गाली-गलौज / बदसलूकी'
  },
  'Safety Gear Denial': {
    en: 'Safety Gear Denial',
    ta: 'பாதுகாப்பு கவசம் மறுப்பு (PPE Denial)',
    hi: 'सुरक्षा उपकरण देने से इनकार'
  },
  'Wage Deductions / Threat': {
    en: 'Wage Deductions / Threat',
    ta: 'சம்பளப் பிடித்தம் / மிரட்டல்',
    hi: 'मजदूरी काटना / धमकी'
  },
  'Physical Intimidation': {
    en: 'Physical Intimidation',
    ta: 'உடல்ரீதியான அச்சுறுத்தல்',
    hi: 'शारीरिक डराना-धमकाना'
  },
  'Unsafe Speedup Order': {
    en: 'Unsafe Speedup Order',
    ta: 'ஆபத்தான அவசர வேலை உத்தரவு',
    hi: 'असुरक्षित जल्दबाजी का आदेश'
  }
};

export function getLocalizedMisconductTag(tag, lang = 'en') {
  const match = MISCONDUCT_TAGS_I18N[tag];
  if (match && match[lang]) return match[lang];
  return tag;
}

// Localized Hazard Categories
export const HAZARD_CATEGORIES_I18N = {
  'Scaffolding / Fall Risk': {
    en: 'Scaffolding / Fall Risk',
    ta: 'சாரக்கட்டு / கீழே விழும் ஆபத்து',
    hi: 'मचान / गिरने का खतरा'
  },
  'Electrical / Live Wire': {
    en: 'Electrical / Live Wire',
    ta: 'மின்சார கம்பி / மின் அதிர்ச்சி',
    hi: 'बिजली का खुला तार / करंट'
  },
  'Missing PPE Gear': {
    en: 'Missing PPE Gear',
    ta: 'பாதுகாப்பு கவசம் இல்லை (PPE)',
    hi: 'सुरक्षा उपकरण न होना'
  },
  'Deep Trench Cave-In': {
    en: 'Deep Trench Cave-In',
    ta: 'ஆழமான பள்ளம் சரிவு அபாயம்',
    hi: 'गहरे गड्ढे का धंसना'
  },
  'Crane Boom Blindspot': {
    en: 'Crane Boom Blindspot',
    ta: 'கிரேன் ஆபத்து / மறைவான பகுதி',
    hi: 'क्रेन का अंधा क्षेत्र'
  },
  'Kitchen Exhaust Fire Risk': {
    en: 'Kitchen Exhaust Fire Risk',
    ta: 'சமையலறை புகைபோக்கி தீ ஆபத்து',
    hi: 'रसोई चिमनी में आग का खतरा'
  },
  'Chemical / Bio-cleaner Spill': {
    en: 'Chemical / Bio-cleaner Spill',
    ta: 'ரசாயனம் / கிளீனர் கசிவு',
    hi: 'रासायनिक घोल का रिसाव'
  },
  'Wet Walkway Slip Hazard': {
    en: 'Wet Walkway Slip Hazard',
    ta: 'ஈரமான தரை வழுக்கும் ஆபத்து',
    hi: 'गीला फर्श / फिसलने का खतरा'
  },
  'High-Tension Sparking': {
    en: 'High-Tension Sparking',
    ta: 'உயர் மின் அழுத்த தீப்பொறி',
    hi: 'हाई-टेंशन स्पार्किंग'
  },
  'Bio-waste Compactor Jam': {
    en: 'Bio-waste Compactor Jam',
    ta: 'கழிவு இயந்திரம் நெரிசல்',
    hi: 'बायो-कचरा मशीन जाम होना'
  }
};

export function getLocalizedHazardCategory(category, lang = 'en') {
  const match = HAZARD_CATEGORIES_I18N[category];
  if (match && match[lang]) return match[lang];
  return category;
}

// Localized Severity
export const SEVERITY_I18N = {
  'Critical': {
    en: '🚨 Critical (Immediate Danger)',
    ta: '🚨 அவசர ஆபத்து (Critical)',
    hi: '🚨 अति गंभीर (Critical)'
  },
  'High': {
    en: '⚠️ High (Worksite Risk)',
    ta: '⚠️ அதிக ஆபத்து (High)',
    hi: '⚠️ उच्च जोखिम (High)'
  },
  'Moderate': {
    en: '🟡 Moderate (Requires Attention)',
    ta: '🟡 நடுத்தர ஆபத்து (Moderate)',
    hi: '🟡 मध्यम (Moderate)'
  },
  'Low': {
    en: '🟢 Low (Minor Maintenance)',
    ta: '🟢 குறைந்த ஆபத்து (Low)',
    hi: '🟢 सामान्य (Low)'
  }
};

export function getLocalizedSeverity(sev, lang = 'en') {
  const match = SEVERITY_I18N[sev];
  if (match && match[lang]) return match[lang];
  return sev;
}
