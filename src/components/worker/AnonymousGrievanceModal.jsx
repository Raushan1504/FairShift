import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  AlertOctagon, 
  Send, 
  CheckCircle2, 
  EyeOff, 
  Key, 
  Mic,
  MicOff,
  Globe,
  Sparkles,
  Bot,
  Scale,
  Volume2
} from 'lucide-react';
import { generateAnonymousToken } from '../../utils/anonymizer';
import { startVoiceRecognition, speakAloud, AUDIO_PROMPTS } from '../../utils/speech';
import { translateToEnglish } from '../../utils/translator';
import { adjudicateMisconduct } from '../../utils/misconductAdjudicator';
import { getTranslation, getLocalizedMisconductTag, getLocalizedSupervisor } from '../../utils/i18n';

export function AnonymousGrievanceModal({
  isOpen,
  onClose,
  currentSector,
  currentWorker,
  currentLang = 'en',
  onSubmitGrievance
}) {
  const t = getTranslation(currentLang);
  const [selectedTag, setSelectedTag] = useState('Forced Unpaid Overtime');
  const [selectedSupervisor, setSelectedSupervisor] = useState('');
  const [description, setDescription] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recognizerController, setRecognizerController] = useState(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatedEnglish, setTranslatedEnglish] = useState('');
  const [aiAdjudication, setAiAdjudication] = useState(null);

  const supervisors = currentSector?.supervisors || [];
  const defaultSupervisor = selectedSupervisor || (supervisors[0]?.name || 'Site In-Charge');

  const tags = [
    'Forced Unpaid Overtime',
    'Verbal Abuse / Harassment',
    'Safety Gear Denial',
    'Wage Deductions / Threat',
    'Physical Intimidation',
    'Unsafe Speedup Order'
  ];

  // Quick preset voice phrases for instant testing in low-literacy context
  const sampleGrievances = {
    ta: [
      'சூப்பர்வைசர் ராஜேஷ் காசு வெட்டுவேன்னு மிரட்டி 3 மணிநேரம் கூடுதல் வேலை வாங்குனாரு.',
      'சேப்டி பெல்ட் கேட்டா திட்டி அசிங்கமா பேசுறாரு, வேலை விட்டு தூக்கிடுவேன்னு மிரட்டுறாரு.',
      'ராத்திரி 2 மணி வரை வேலை வாங்குனாங்க, ஓவர் டைம் காசு குடுக்கல.'
    ],
    hi: [
      'सुपरवाइजर ने दिहाड़ी काटने की धमकी देकर 3 घंटे ज्यादा काम कराया और गाली दी।',
      'सेफ्टी बेल्ट और हेलमेट नहीं दिया, बोला काम करना है तो करो नहीं तो भगा देंगे।',
      'पूरा हफ्ता बिना आराम के काम कराया, ओवरटाइम का पैसा रोक लिया।'
    ],
    en: [
      'Supervisor threatened to fire us if we ask for our 3 hours overtime pay.',
      'Refused safety harnesses and yelled vulgar language at the pier crew.',
      'Withheld daily wages and forced 14-hour shift without rest break.'
    ]
  };

  // Re-run AI adjudication when description or tag changes
  useEffect(() => {
    if (description.trim().length > 3) {
      const adjudication = adjudicateMisconduct({
        description,
        supervisorName: defaultSupervisor,
        tag: selectedTag,
        sectorId: currentSector?.id,
        lang: currentLang
      });
      setAiAdjudication(adjudication);
    } else {
      setAiAdjudication(null);
    }
  }, [description, selectedTag, defaultSupervisor, currentSector?.id, currentLang]);

  if (!isOpen) return null;

  // Voice recording handler
  const handleToggleVoice = () => {
    if (isRecording) {
      if (recognizerController) recognizerController.stop();
      setIsRecording(false);
      return;
    }

    setIsRecording(true);
    const controller = startVoiceRecognition({
      lang: currentLang,
      onStart: () => setIsRecording(true),
      onResult: async (capturedText, isFinal) => {
        setDescription(capturedText);
        if (isFinal) {
          setIsTranslating(true);
          const res = await translateToEnglish(capturedText, currentLang);
          setTranslatedEnglish(res.translatedText);
          setIsTranslating(false);
        }
      },
      onError: (err) => {
        console.warn('Voice error:', err);
        setIsRecording(false);
      },
      onEnd: () => {
        setIsRecording(false);
      }
    });

    setRecognizerController(controller);
  };

  const applySample = async (phrase) => {
    setDescription(phrase);
    setIsTranslating(true);
    const res = await translateToEnglish(phrase, currentLang);
    setTranslatedEnglish(res.translatedText);
    setIsTranslating(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) return;

    // Cryptographic-style identity decoupling token
    const tokenData = generateAnonymousToken(currentWorker?.id || 'WRK-ANON', currentSector?.id || 'SECTOR');

    // Final AI adjudication
    const finalAdjudication = adjudicateMisconduct({
      description,
      supervisorName: defaultSupervisor,
      tag: selectedTag,
      sectorId: currentSector?.id,
      lang: currentLang
    });

    const newGrievance = {
      id: `GRV-${Date.now().toString().slice(-4)}`,
      token: tokenData.token,
      supervisorId: supervisors.find(s => s.name === defaultSupervisor)?.id || 'SUP-GEN',
      supervisorName: defaultSupervisor,
      tag: finalAdjudication.category || selectedTag,
      severity: finalAdjudication.severity || 'High',
      description: description.trim(),
      translatedEnglish: translatedEnglish || description.trim(),
      timestamp: new Date().toISOString(),
      status: 'Investigating',
      verifiedWorkerProof: tokenData.proofHash,
      hrActionTaken: finalAdjudication.recommendedHrAction || 'Received directly at Central HR.',
      aiAdjudication: finalAdjudication
    };

    onSubmitGrievance(newGrievance);

    // Audio feedback in chosen language
    const promptLang = currentLang in AUDIO_PROMPTS ? currentLang : 'en';
    speakAloud(AUDIO_PROMPTS[promptLang].grievanceLogged, promptLang);

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 my-auto">
        
        {/* Header with Green Zero-Trace Security Badge */}
        <div className="p-4 border-b border-emerald-500/20 bg-emerald-950/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-sm sm:text-base">{t.grievanceTitle}</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  {t.zeroRetaliation}
                </span>
              </div>
              <p className="text-[11px] text-emerald-300/80">{t.grievanceSub}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Security Assurance Banner */}
        <div className="p-3 bg-emerald-950/20 border-b border-emerald-500/20 flex items-start gap-2.5 text-xs text-emerald-200">
          <Lock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5 leading-relaxed text-[11px]">
            <strong className="text-white block font-semibold">{t.zkpBannerTitle}</strong>
            <span>{t.zkpBannerDesc}</span>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          
          {/* Categorized Grievance Tags (Localized to chosen language) */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-2">
              {t.natureOfViolation}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {tags.map((tag) => {
                const isSelected = selectedTag === tag;
                const localizedTagLabel = getLocalizedMisconductTag(tag, currentLang);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSelectedTag(tag)}
                    className={`p-2.5 rounded-xl border text-left text-xs font-medium transition ${
                      isSelected
                        ? 'border-emerald-400 bg-emerald-500/20 text-emerald-200 font-semibold shadow-sm'
                        : 'border-slate-800 bg-slate-850/60 text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    {localizedTagLabel}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Supervisor Selection (Localized & Solid Black Background) */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              {t.reportedSupervisor}
            </label>
            <select
              value={selectedSupervisor || defaultSupervisor}
              onChange={(e) => setSelectedSupervisor(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400 cursor-pointer shadow-inner [&>option]:bg-slate-950 [&>option]:text-white"
            >
              {supervisors.map((s) => {
                const localizedSup = getLocalizedSupervisor(s, currentLang);
                return (
                  <option key={s.id} value={s.name} className="bg-slate-950 text-white py-2">
                    {localizedSup.name} ({localizedSup.role} - {localizedSup.department})
                  </option>
                );
              })}
            </select>
            <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
              <EyeOff className="w-3 h-3 text-emerald-400" />
              <span>{t.supervisorWarning}</span>
            </p>
          </div>

          {/* Voice Input Section (Requirement 3: Enable voice translation in Anonymous Misconduct ledger) */}
          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-2.5">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t.speakGrievancePrompt}</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">Web Speech STT</span>
            </div>

            {/* Big Mic Button for Low-Literacy Frontline Workers */}
            <div className="flex flex-col items-center justify-center py-1">
              <button
                type="button"
                onClick={handleToggleVoice}
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all transform active:scale-95 shadow-lg ${
                  isRecording 
                    ? 'bg-rose-500 text-white animate-voice-pulse shadow-rose-500/40' 
                    : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-emerald-500/20'
                }`}
                title="Tap to speak your grievance"
              >
                {isRecording ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
              </button>
              <span className="text-xs font-semibold text-slate-200 mt-2">
                {isRecording ? t.speakingGrievance : t.speakGrievanceBtn}
              </span>
            </div>

            {/* Quick Test Samples */}
            <div className="pt-2 border-t border-slate-850 flex flex-wrap gap-1.5 justify-center">
              {(sampleGrievances[currentLang] || sampleGrievances.en).map((phrase, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => applySample(phrase)}
                  className="text-[10px] px-2 py-1 rounded-md bg-slate-800 text-slate-300 hover:text-emerald-300 border border-slate-700 transition"
                >
                  "{phrase.slice(0, 32)}..."
                </button>
              ))}
            </div>

            {/* Description Textarea */}
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="State what occurred, time of day, words used, or safety gear denied."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400 resize-none text-left font-sans"
            />

            {/* Auto-translated English Preview if different language */}
            {translatedEnglish && currentLang !== 'en' && (
              <div className="p-2.5 rounded-xl bg-cyan-950/20 border border-cyan-800/30 text-left text-xs">
                <span className="text-[10px] text-cyan-400 font-semibold block mb-0.5">
                  🌐 Auto-Translated for Central HR:
                </span>
                <p className="text-cyan-100 font-sans italic">"{translatedEnglish}"</p>
              </div>
            )}
          </div>

          {/* AI Compliance Adjudication Engine (Requirement 5) */}
          {aiAdjudication && (
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-900 to-purple-950/20 border border-purple-500/30 space-y-2 animate-in fade-in duration-200">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-purple-300 font-bold">
                  <Bot className="w-4 h-4 text-purple-400" />
                  <span>{t.aiAdjudicationTitle}</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                  {aiAdjudication.guidelineStatus}
                </span>
              </div>

              {/* Dialect info if detected */}
              {aiAdjudication.dialectDetected && (
                <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 flex items-center justify-between">
                  <span>🗣️ Dialect Detected: <strong>{aiAdjudication.dialectName}</strong></span>
                  <span className="text-[10px] bg-amber-500/20 px-1.5 py-0.2 rounded font-mono">Normalized</span>
                </div>
              )}

              {/* Verdict Summary & Statutory Reference */}
              <div className="text-[11px] space-y-1 text-slate-300 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                <div className="font-semibold text-white flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-purple-400" />
                  <span>Classified Category: {aiAdjudication.category}</span>
                </div>
                <p className="text-slate-400 leading-snug">{aiAdjudication.verdictSummary}</p>
                <div className="pt-1 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-emerald-400 font-medium">
                  <span>{aiAdjudication.sdgTarget}</span>
                  <span className="font-mono text-purple-300">{aiAdjudication.statutoryBreach}</span>
                </div>
              </div>

              {/* Simple note in worker's native language */}
              <p className="text-xs font-semibold text-emerald-300 bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
                {aiAdjudication.simpleWorkerNote}
              </p>
            </div>
          )}

          {/* Hashed Token Preview */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="text-[10px] text-slate-400 block">{t.assignedToken}</span>
                <span className="font-mono text-emerald-400 font-bold text-xs">#ANON-GENERATED-AT-SUBMIT</span>
              </div>
            </div>
            <span className="text-[10px] bg-slate-900 text-slate-400 px-2 py-1 rounded border border-slate-800">
              Zero-Knowledge Proof
            </span>
          </div>

          {/* Submit Action */}
          <div className="pt-1">
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 transition"
            >
              <Send className="w-4 h-4" />
              <span>{t.submitGrievance}</span>
            </button>
            <p className="text-[10px] text-center text-slate-400 mt-2">
              Routed directly to Central HR Ombudsperson • Zero-Tolerance Anti-Retaliation Policy
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
