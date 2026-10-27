import React, { useState, useEffect } from 'react';
import { 
  X, 
  Mic, 
  MicOff, 
  Volume2, 
  Globe, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  Camera, 
  MapPin, 
  Sparkles,
  Zap,
  ArrowRight,
  Send
} from 'lucide-react';
import { startVoiceRecognition, speakAloud, AUDIO_PROMPTS } from '../../utils/speech';
import { translateToEnglish } from '../../utils/translator';
import { generateAnonymousToken } from '../../utils/anonymizer';
import { analyzeLocalDialect } from '../../utils/dialectEngine';
import { getTranslation, getLocalizedHazardCategory, getLocalizedSeverity } from '../../utils/i18n';

export function VoiceHazardModal({
  isOpen,
  onClose,
  currentSector,
  currentWorker,
  currentLang = 'ta',
  onSubmitHazard
}) {
  const t = getTranslation(currentLang);
  const [isRecording, setIsRecording] = useState(false);
  const [recognizerController, setRecognizerController] = useState(null);
  
  const [transcript, setTranscript] = useState('');
  const [detectedLangName, setDetectedLangName] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatedText, setTranslatedText] = useState('');
  const [dialectResult, setDialectResult] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [severity, setSeverity] = useState('High');
  const [locationZone, setLocationZone] = useState('');
  const [photoAttached, setPhotoAttached] = useState(false);

  // Initialize defaults when opened
  useEffect(() => {
    if (isOpen) {
      const defaultCat = currentSector?.hazardCategories?.[0]?.label || 'Safety Hazard';
      setSelectedCategory(defaultCat);
      setLocationZone(currentSector?.id === 'construction' ? 'Pier 42 - South Concourse' : 'Hostel Dining Complex');
      setTranscript('');
      setTranslatedText('');
      setDialectResult(null);
      setPhotoAttached(false);
      setIsRecording(false);
    }
  }, [isOpen, currentSector]);

  if (!isOpen) return null;

  // Process text through dialect engine and translator
  const processInput = async (capturedText) => {
    setTranscript(capturedText);
    const dialect = analyzeLocalDialect(capturedText);
    setDialectResult(dialect);

    setIsTranslating(true);
    const result = await translateToEnglish(capturedText, currentLang);
    setTranslatedText(result.translatedText);
    setDetectedLangName(result.detectedLangName);
    setIsTranslating(false);

    // Auto-update category if dialect recognized a specific hazard category
    if (dialect.matchedCategory && dialect.matchedCategory.includes('Scaffolding')) {
      setSelectedCategory('Scaffolding / Fall Risk');
    } else if (dialect.matchedCategory && dialect.matchedCategory.includes('Safety Gear')) {
      setSelectedCategory('Missing PPE Gear');
    }
  };

  // Handle voice recording
  const handleStartRecording = () => {
    if (isRecording) {
      if (recognizerController) recognizerController.stop();
      setIsRecording(false);
      return;
    }

    setTranscript('');
    setTranslatedText('');
    setDialectResult(null);
    setIsRecording(true);

    const controller = startVoiceRecognition({
      lang: currentLang,
      onStart: () => setIsRecording(true),
      onResult: async (capturedText, isFinal) => {
        setTranscript(capturedText);
        if (isFinal) {
          processInput(capturedText);
        }
      },
      onError: (err) => {
        console.warn('Voice recognition error:', err);
        setIsRecording(false);
      },
      onEnd: () => {
        setIsRecording(false);
      }
    });

    setRecognizerController(controller);
  };

  // Quick preset sample text click
  const applySamplePhrase = (phrase) => {
    processInput(phrase);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const textToSubmit = transcript.trim() || `Urgent hazard detected in ${selectedCategory} category at ${locationZone}`;
    const englishText = translatedText.trim() || textToSubmit;

    const tokenData = generateAnonymousToken(currentWorker?.id || 'WRK-ANON', currentSector?.id || 'SECTOR');

    const newHazard = {
      id: `HAZ-${Date.now().toString().slice(-4)}`,
      category: selectedCategory,
      severity,
      originalText: textToSubmit,
      detectedLang: currentLang,
      detectedLangName: detectedLangName || (currentLang === 'ta' ? 'Tamil' : currentLang === 'hi' ? 'Hindi' : 'English'),
      translatedText: englishText,
      dialectInfo: dialectResult?.dialectDetected ? dialectResult.dialectName : null,
      locationZone: locationZone || 'Active Worksite Area',
      timestamp: new Date().toISOString(),
      status: 'Open',
      reporterToken: tokenData.token,
      assignedTo: currentSector?.supervisors?.[0]?.name || 'Site Safety Officer',
      hasPhoto: photoAttached,
      audioDurationSec: Math.floor(Math.random() * 5) + 4
    };

    onSubmitHazard(newHazard);

    // Audio confirmation
    const promptLang = currentLang in AUDIO_PROMPTS ? currentLang : 'en';
    speakAloud(AUDIO_PROMPTS[promptLang].hazardLogged, promptLang);

    onClose();
  };

  const categories = currentSector?.hazardCategories || [];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-750 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 my-auto">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-850 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/30">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-sm sm:text-base">{t.voiceHazardTitle}</h3>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30 font-semibold">
                  SDG 8.8 Safety
                </span>
              </div>
              <p className="text-xs text-slate-400">{t.voiceHazardSub}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-4 max-h-[80vh] overflow-y-auto">
          
          {/* Quick-Select Icon Chips */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-2">
              {t.selectCategory}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.label;
                const localizedCat = getLocalizedHazardCategory(cat.label, currentLang);
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.label)}
                    className={`p-2.5 rounded-xl border text-left text-xs font-medium flex items-center gap-2 transition ${
                      isSelected
                        ? 'border-amber-400 bg-amber-500/15 text-amber-300 shadow-sm'
                        : 'border-slate-800 bg-slate-800/60 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <AlertTriangle className={`w-4 h-4 shrink-0 ${isSelected ? 'text-amber-400' : 'text-slate-400'}`} />
                    <span className="truncate">{localizedCat}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Voice First Tap-to-Talk Mic Section */}
          <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 text-center space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span className="flex items-center gap-1 text-slate-300 font-medium">
                <Globe className="w-3.5 h-3.5 text-cyan-400" /> 
                Target: {currentLang === 'ta' ? 'தமிழ் (Tamil)' : currentLang === 'hi' ? 'हिंदी (Hindi)' : 'English'}
              </span>
              <span className="text-[11px] text-emerald-400 font-mono">Web Speech + Dialect Normalizer</span>
            </div>

            {/* Central Big Mic Button */}
            <div className="py-2 flex flex-col items-center justify-center">
              <button
                type="button"
                onClick={handleStartRecording}
                className={`w-20 h-20 rounded-full flex items-center justify-center transition-all transform active:scale-95 shadow-2xl ${
                  isRecording 
                    ? 'bg-red-500 text-white animate-voice-pulse shadow-red-500/50' 
                    : 'bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-950 hover:brightness-110 shadow-amber-500/30'
                }`}
                title={isRecording ? 'Tap to stop recording' : 'Tap to start voice recording'}
              >
                {isRecording ? <MicOff className="w-8 h-8 animate-pulse" /> : <Mic className="w-8 h-8" />}
              </button>
              
              <span className="text-xs font-semibold mt-2.5 text-slate-200">
                {isRecording ? t.listening : t.tapToSpeak}
              </span>
              <p className="text-[11px] text-slate-400 max-w-xs mt-0.5">
                Automatically transcribes your dialect and translates to English
              </p>
            </div>

            {/* Quick Presets for Instant 1-Click Testing */}
            <div className="pt-2 border-t border-slate-850">
              <span className="text-[10px] text-slate-500 block mb-1.5 uppercase tracking-wider font-semibold">
                Quick Test Slang Phrases:
              </span>
              <div className="flex flex-wrap gap-1.5 justify-center">
                <button
                  type="button"
                  onClick={() => applySamplePhrase('நான்காவது தளத்தில் சாராம் ஆடுது, கீழ விழப்போகுது')}
                  className="text-[10px] px-2 py-1 rounded-md bg-slate-800 text-slate-300 hover:text-amber-300 border border-slate-700 transition"
                >
                  "சாராம் ஆடுது" (Chennai Tamil Slang)
                </button>
                <button
                  type="button"
                  onClick={() => applySamplePhrase('पिलर 38 के पास मचान हिल रहा है और सेफ्टी बेल्ट नहीं मिला')}
                  className="text-[10px] px-2 py-1 rounded-md bg-slate-800 text-slate-300 hover:text-amber-300 border border-slate-700 transition"
                >
                  "मचान हिल रहा है" (Bhojpuri/Hindi Slang)
                </button>
              </div>
            </div>

            {/* Dialect Notification if matched */}
            {dialectResult?.dialectDetected && (
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-left text-xs text-amber-300 flex items-center justify-between">
                <span>🗣️ <strong>{dialectResult.dialectName}</strong> recognized</span>
                <span className="text-[10px] bg-amber-500/20 px-2 py-0.5 rounded font-medium">Standardized</span>
              </div>
            )}

            {/* Live Dual Transcript Display */}
            {(transcript || isRecording) && (
              <div className="space-y-2 text-left pt-2">
                {/* Native Transcript */}
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span className="font-semibold text-amber-400">{t.capturedSpeech}</span>
                    <span className="font-mono text-[10px] bg-slate-800 px-1.5 py-0.5 rounded">
                      {detectedLangName || 'Native Audio'}
                    </span>
                  </div>
                  <p className="text-xs text-white leading-relaxed font-sans">
                    {transcript || 'Speaking in progress...'}
                  </p>
                </div>

                {/* Auto-Translated Output */}
                <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-800/40">
                  <div className="flex items-center justify-between text-[11px] text-cyan-400 mb-1">
                    <span className="font-semibold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> {t.translatedDispatch}
                    </span>
                    <span className="text-[10px] text-cyan-300 font-mono">Live API</span>
                  </div>
                  <p className="text-xs text-cyan-100 leading-relaxed font-sans">
                    {isTranslating ? 'Translating in real-time...' : (translatedText || 'Waiting for full sentence...')}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Severity & Location Controls */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">{t.severityLevel}</label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer shadow-inner [&>option]:bg-slate-950 [&>option]:text-white"
              >
                <option value="Critical" className="bg-slate-950 text-white py-2">{getLocalizedSeverity('Critical', currentLang)}</option>
                <option value="High" className="bg-slate-950 text-white py-2">{getLocalizedSeverity('High', currentLang)}</option>
                <option value="Moderate" className="bg-slate-950 text-white py-2">{getLocalizedSeverity('Moderate', currentLang)}</option>
                <option value="Low" className="bg-slate-950 text-white py-2">{getLocalizedSeverity('Low', currentLang)}</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">{t.locationZone}</label>
              <input
                type="text"
                value={locationZone}
                onChange={(e) => setLocationZone(e.target.value)}
                placeholder="e.g. Pier 42 or Kitchen Bay 2"
                className="w-full bg-slate-850 border border-slate-750 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Photo attachment simulation */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-750">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-slate-400" />
              <span className="text-xs text-slate-300">Hazard Snapshot Photo</span>
            </div>
            <button
              type="button"
              onClick={() => setPhotoAttached(!photoAttached)}
              className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition ${
                photoAttached 
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                  : 'bg-slate-750 text-slate-400 hover:text-white border-slate-700'
              }`}
            >
              {photoAttached ? t.photoAttached : t.attachPhoto}
            </button>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 transition"
            >
              <Send className="w-4 h-4" />
              <span>{t.submitHazard}</span>
            </button>
            <p className="text-[10px] text-center text-slate-500 mt-2">
              Dispatched with hashed token • Identity protected by platform policy
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
