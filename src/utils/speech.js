// Web Speech Synthesis (TTS) and Web Speech Recognition (STT) Utility
// Supports English, Tamil (ta-IN), and Hindi (hi-IN)

export const LANG_CODES = {
  en: 'en-IN',
  ta: 'ta-IN',
  hi: 'hi-IN',
};

// Translations for standard UI voice announcements
export const AUDIO_PROMPTS = {
  en: {
    welcome: 'Welcome to FairShift. Your shift ledger is active.',
    punchedIn: 'Shift punched in successfully. Standard shift timer is now running. Site geofence verified.',
    punchedOut: 'Shift punched out. Your earnings and hours have been recorded in the blockchain-style ledger.',
    hazardLogged: 'Safety hazard ticket submitted. Your report has been auto-translated and dispatched to site management.',
    grievanceLogged: 'Grievance submitted directly to Central HR under zero-trace anonymous token. Site supervisors cannot see your identity.',
    readWage: (stdHrs, otHrs, total) => `Today you worked ${stdHrs} regular hours and ${otHrs} overtime hours. Total earnings today are ₹${total}.`,
    fatigueAlert: 'Warning. Cumulative weekly hours exceed legal safety threshold. Overtime blocked for your health and safety.'
  },
  ta: {
    welcome: 'ஃபேர்ஷிஃப்ட் உங்களை வரவேற்கிறது. உங்கள் பணிப்பதிவு தயாராக உள்ளது.',
    punchedIn: 'பணி வருகை வெற்றிகரமாக பதிவு செய்யப்பட்டது. நேரக் கணக்கீடு தொடங்குகிறது.',
    punchedOut: 'பணி முடிவு பதிவு செய்யப்பட்டது. உங்கள் ஊதியம் கணக்கிடப்பட்டது.',
    hazardLogged: 'பாதுகாப்பு அபாய தகவல் அனுப்பப்பட்டது. உடனடியாக ஆங்கிலத்தில் மொழிபெயர்க்கப்பட்டு மேலாளருக்கு அனுப்பப்பட்டுள்ளது.',
    grievanceLogged: 'உங்கள் புகார் மத்திய மனிதவளத் துறைக்கு முற்றிலும் அநாமதேயமாக அனுப்பப்பட்டது. உங்கள் பெயர் ரகசியமாக வைக்கப்பட்டுள்ளது.',
    readWage: (stdHrs, otHrs, total) => `இன்று நீங்கள் ${stdHrs} மணிநேர வழக்கமான பணியும், ${otHrs} மணிநேர கூடுதல் பணியும் செய்துள்ளீர்கள். மொத்த சம்பளம் ₹${total}.`,
    fatigueAlert: 'எச்சரிக்கை. வாராந்திர பணி நேரம் அனுமதிக்கப்பட்ட வரம்பை தாண்டியுள்ளது. பாதுகாப்புக்காக கூடுதல் பணி நிறுத்தி வைக்கப்பட்டுள்ளது.'
  },
  hi: {
    welcome: 'फेयरशिफ्ट में आपका स्वागत है। आपका कार्य रजिस्टर सक्रिय है।',
    punchedIn: 'शिफ्ट पंच-इन सफल रहा। समय और जीपीएस लोकेशन दर्ज हो गई है।',
    punchedOut: 'शिफ्ट पंच-आउट दर्ज हुआ। आज की मजदूरी लेजर में सुरक्षित है।',
    hazardLogged: 'सुरक्षा खतरे की रिपोर्ट दर्ज हो गई है। तुरंत अनुवाद करके सुरक्षा अधिकारी को भेज दिया गया है।',
    grievanceLogged: 'आपकी शिकायत केंद्रीय एचआर को पूरी तरह गोपनीय टोकन के साथ भेज दी गई है। सुपरवाइजर आपका नाम नहीं देख सकते।',
    readWage: (stdHrs, otHrs, total) => `आज आपने ${stdHrs} सामान्य घंटे और ${otHrs} ओवरटाइम घंटे काम किया है। आज की कुल कमाई ₹${total} है।`,
    fatigueAlert: 'सावधान! इस सप्ताह काम के घंटे कानूनी सुरक्षा सीमा से अधिक हो गए हैं। सुरक्षा नियमों के तहत ओवरटाइम बंद है।'
  }
};

export function isSpeechSynthesisSupported() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function isSpeechRecognitionSupported() {
  return typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);
}

// Speak aloud helper
export function speakAloud(text, lang = 'en', onEnd = null) {
  if (!isSpeechSynthesisSupported()) {
    console.warn('SpeechSynthesis is not supported in this browser.');
    if (onEnd) onEnd();
    return false;
  }

  try {
    window.speechSynthesis.cancel(); // Stop active speaking

    const utterance = new SpeechSynthesisUtterance(text);
    const targetLangCode = LANG_CODES[lang] || 'en-IN';
    utterance.lang = targetLangCode;
    utterance.rate = 0.95; // Slightly slower for low-literacy clarity
    utterance.pitch = 1.0;

    // Pick best matching voice
    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      const match = voices.find(v => v.lang.startsWith(lang) || v.lang.includes(lang));
      if (match) utterance.voice = match;
    }

    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (e) {
    console.error('Speech error:', e);
    if (onEnd) onEnd();
    return false;
  }
}

export function stopSpeaking() {
  if (isSpeechSynthesisSupported()) {
    window.speechSynthesis.cancel();
  }
}

// Speech Recognition helper with simulated fallback
export function startVoiceRecognition({ lang = 'ta', onResult, onError, onStart, onEnd }) {
  const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognitionClass) {
    console.warn('SpeechRecognition not natively supported, activating high-fidelity demo simulator');
    if (onStart) onStart();

    // Simulated voice capture for environments without microphone permissions or unsupported browser
    const simulatedPhrases = {
      ta: [
        'நான்காவது தளத்தில் சாரக்கட்டு கம்பிகள் தளர்வாக உள்ளன, பாதுகாப்பு வலை கிழிக்கப்பட்டுள்ளது.',
        'மின்சார கம்பி அறுந்து விழுந்துள்ளது, உடனடியாக சரி செய்ய வேண்டும்.',
        'சமையலறை குழாயில் எண்ணெய் கசிந்து தீப்பொறி தெறிக்கிறது.'
      ],
      hi: [
        'पिलर 38 के पास पानी भरा है और जनरेटर की नंगी तार पानी में डूबी है।',
        'फर्श पर केमिकल गिर गया है और सांस लेने में दिक्कत हो रही है।',
        'मचान ढीला है और सेफ्टी बेल्ट उपलब्ध नहीं कराई गई है।'
      ],
      en: [
        'Scaffolding joint clamps are loose on Level 4; fall risk is very high.',
        'High voltage generator cable is lying in standing rainwater.',
        'Chemical drum leaking toxic cleaning vapor in basement.'
      ]
    };

    const phrases = simulatedPhrases[lang] || simulatedPhrases.en;
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];

    const timer = setTimeout(() => {
      if (onResult) onResult(randomPhrase, true);
      if (onEnd) onEnd();
    }, 2500);

    return {
      stop: () => clearTimeout(timer),
      abort: () => clearTimeout(timer),
      isSimulated: true
    };
  }

  try {
    const recognition = new SpeechRecognitionClass();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = LANG_CODES[lang] || 'ta-IN';

    recognition.onstart = () => {
      if (onStart) onStart();
    };

    recognition.onresult = (event) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      const text = finalTranscript || interimTranscript;
      if (onResult && text) {
        onResult(text, Boolean(finalTranscript));
      }
    };

    recognition.onerror = (event) => {
      console.warn('Speech recognition error:', event.error);
      if (onError) onError(event.error);
    };

    recognition.onend = () => {
      if (onEnd) onEnd();
    };

    recognition.start();

    return {
      stop: () => recognition.stop(),
      abort: () => recognition.abort(),
      isSimulated: false
    };
  } catch (e) {
    console.error('Error starting recognition:', e);
    if (onError) onError(e);
    return null;
  }
}
