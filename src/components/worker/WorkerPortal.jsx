import React, { useState } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Globe, 
  Mic, 
  ShieldAlert, 
  ShieldCheck, 
  Award, 
  Clock, 
  TrendingUp, 
  User, 
  ChevronRight,
  Sparkles,
  AlertTriangle,
  History,
  Info
} from 'lucide-react';
import { ShiftPunch } from './ShiftPunch';
import { WageBreakdownCard } from './WageBreakdownCard';
import { VoiceHazardModal } from './VoiceHazardModal';
import { AnonymousGrievanceModal } from './AnonymousGrievanceModal';
import { SkillPassportModal } from './SkillPassportModal';
import { speakAloud, stopSpeaking, AUDIO_PROMPTS } from '../../utils/speech';
import { getTranslation, getLocalizedWorker, getLocalizedSupervisor } from '../../utils/i18n';

export function WorkerPortal({
  currentWorker,
  currentSector,
  currentLang,
  onSelectLanguage,
  onPunchToggle,
  onSubmitHazard,
  onSubmitGrievance,
  initialModal
}) {
  const t = getTranslation(currentLang);
  const [isVoiceHazardOpen, setIsVoiceHazardOpen] = useState(initialModal === 'hazard');
  const [isGrievanceOpen, setIsGrievanceOpen] = useState(initialModal === 'grievance');
  const [isPassportOpen, setIsPassportOpen] = useState(initialModal === 'passport');
  const [isSpeakingSummary, setIsSpeakingSummary] = useState(false);

  const localizedWorker = getLocalizedWorker(currentWorker, currentLang);
  const localizedSupervisor = getLocalizedSupervisor(currentSector?.supervisors?.[0], currentLang);

  // Audio Read-Aloud for the Entire Screen
  const handleReadAloudScreen = () => {
    if (isSpeakingSummary) {
      stopSpeaking();
      setIsSpeakingSummary(false);
      return;
    }

    setIsSpeakingSummary(true);
    const langKey = currentLang in AUDIO_PROMPTS ? currentLang : 'en';

    const isPunchedIn = currentWorker?.shiftStatus === 'active';
    const statusText = isPunchedIn 
      ? (currentLang === 'ta' ? 'நீங்கள் தற்போது பணி எல்லைக்குள் வேலை செய்கிறீர்கள்.' : currentLang === 'hi' ? 'आप वर्तमान में कार्य शिफ्ट पर हैं।' : 'You are currently punched in.')
      : (currentLang === 'ta' ? 'நீங்கள் பணி தொடங்கும் முன் உள்ளீர்கள்.' : currentLang === 'hi' ? 'आप अभी शिफ्ट से बाहर हैं।' : 'You are currently off shift.');

    const summaryText = `${AUDIO_PROMPTS[langKey].welcome} ${statusText} ${AUDIO_PROMPTS[langKey].readWage(
      currentWorker?.todayStandardHours || 5.5,
      currentWorker?.todayOvertimeHours || 1.5,
      Math.round((currentWorker?.todayStandardHours || 5.5) * (currentWorker?.hourlyRate || 95) + (currentWorker?.todayOvertimeHours || 1.5) * (currentWorker?.hourlyRate || 95) * 1.5)
    )}`;

    speakAloud(summaryText, langKey, () => setIsSpeakingSummary(false));
  };

  return (
    <div className="max-w-md mx-auto py-4 px-3 sm:px-4 space-y-4">
      
      {/* 1. Language & Speech Playback Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2.5 shadow-md flex items-center justify-between gap-2">
        
        {/* Language Selector: English | தமிழ் | हिंदी */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => onSelectLanguage('en')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
              currentLang === 'en'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            English
          </button>
          <button
            onClick={() => onSelectLanguage('ta')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
              currentLang === 'ta'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            தமிழ்
          </button>
          <button
            onClick={() => onSelectLanguage('hi')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
              currentLang === 'hi'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            हिंदी
          </button>
        </div>

        {/* Global Audio Read-Aloud Button */}
        <button
          onClick={handleReadAloudScreen}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition ${
            isSpeakingSummary
              ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/30 animate-pulse'
              : 'bg-slate-800 hover:bg-slate-750 text-amber-400 border-slate-700'
          }`}
          title="Read entire screen aloud using browser speech synthesis"
          aria-label="Read screen status aloud"
        >
          {isSpeakingSummary ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          <span>{isSpeakingSummary ? t.stopVoice : t.readAloud}</span>
        </button>
      </div>

      {/* Worker Quick Identity Header Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={currentWorker?.avatar}
            alt={currentWorker?.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-amber-400"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="font-bold text-white text-base">{localizedWorker?.name}</h2>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700 font-mono">
                {currentWorker?.id}
              </span>
            </div>
            <p className="text-xs text-amber-400 font-medium">{localizedWorker?.role}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">{currentSector?.shortName}</p>
          </div>
        </div>

        {/* Skill Passport Trigger Button */}
        <button
          onClick={() => setIsPassportOpen(true)}
          className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 flex flex-col sm:flex-row items-center gap-1 text-[11px] font-semibold transition"
          title="Open Verifiable Digital Skill Passport"
        >
          <Award className="w-4 h-4 text-amber-400" />
          <span className="hidden sm:inline">Passport</span>
        </button>
      </div>

      {/* 2. Transparent Shift & Overtime Ledger (SDG 8.5) */}
      <ShiftPunch
        worker={currentWorker}
        currentSector={currentSector}
        currentLang={currentLang}
        onPunchToggle={onPunchToggle}
      />

      <WageBreakdownCard
        worker={currentWorker}
        currentSector={currentSector}
        currentLang={currentLang}
        isPunchedIn={currentWorker?.shiftStatus === 'active'}
      />

      {/* High-Contrast Primary Worker Action Cards (Requirement 1: Local language UI) */}
      <div className="grid grid-cols-1 gap-2.5">
        
        {/* 3. Voice Hazard Reporter Action Card */}
        <button
          onClick={() => setIsVoiceHazardOpen(true)}
          className="p-4 rounded-2xl bg-gradient-to-r from-red-950/60 via-slate-900 to-slate-900 border border-red-500/30 hover:border-red-500/60 text-left flex items-center justify-between group transition shadow-md"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
              <Mic className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-white text-sm">{t.reportHazard}</h3>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-red-500/20 text-red-300 font-semibold border border-red-500/30">
                  SDG 8.8
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {t.reportHazardSub}
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-red-400 group-hover:translate-x-1 transition" />
        </button>

        {/* 4. Retaliation-Proof Anonymous Grievance Action Card */}
        <button
          onClick={() => setIsGrievanceOpen(true)}
          className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/50 via-slate-900 to-slate-900 border border-emerald-500/30 hover:border-emerald-500/60 text-left flex items-center justify-between group transition shadow-md"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-white text-sm">{t.anonymousGrievance}</h3>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                  {t.zeroRetaliation}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {t.anonymousGrievanceSub}
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition" />
        </button>

        {/* 5. Verifiable Digital Skill Passport Action Card */}
        <button
          onClick={() => setIsPassportOpen(true)}
          className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/30 hover:border-amber-500/60 text-left flex items-center justify-between group transition shadow-md"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-white text-sm">{t.skillPassport}</h3>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
                  QR Portable
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {currentWorker?.skillPassport?.totalVerifiedHours?.toLocaleString()} {t.totalHours} • {t.skillPassportSub}
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition" />
        </button>

      </div>

      {/* Assigned Shift Supervisor Info */}
      <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-slate-500 block">{t.dutySupervisor}</span>
          <span className="font-semibold text-slate-200">
            {localizedSupervisor?.name || currentSector?.supervisors?.[0]?.name}
          </span>
          <span className="text-[10px] text-slate-400 block">{localizedSupervisor?.role || currentSector?.supervisors?.[0]?.role}</span>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-slate-500 block">{t.siteGeofence}</span>
          <span className="text-emerald-400 font-mono text-[11px] font-semibold">{t.monitored}</span>
        </div>
      </div>

      {/* Modals */}
      <VoiceHazardModal
        isOpen={isVoiceHazardOpen}
        onClose={() => setIsVoiceHazardOpen(false)}
        currentSector={currentSector}
        currentWorker={currentWorker}
        currentLang={currentLang}
        onSubmitHazard={onSubmitHazard}
      />

      <AnonymousGrievanceModal
        isOpen={isGrievanceOpen}
        onClose={() => setIsGrievanceOpen(false)}
        currentSector={currentSector}
        currentWorker={currentWorker}
        currentLang={currentLang}
        onSubmitGrievance={onSubmitGrievance}
      />

      <SkillPassportModal
        isOpen={isPassportOpen}
        onClose={() => setIsPassportOpen(false)}
        worker={currentWorker}
        currentSector={currentSector}
        currentLang={currentLang}
      />
    </div>
  );
}
