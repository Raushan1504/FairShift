import React, { useState } from 'react';
import { Volume2, VolumeX, DollarSign, Clock, ShieldCheck, TrendingUp, Sparkles } from 'lucide-react';
import { speakAloud, stopSpeaking, AUDIO_PROMPTS } from '../../utils/speech';
import { getTranslation } from '../../utils/i18n';

export function WageBreakdownCard({
  worker,
  currentSector,
  currentLang = 'en',
  isPunchedIn
}) {
  const t = getTranslation(currentLang);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Hourly rate breakdown
  const baseRate = worker?.hourlyRate || currentSector?.baseHourlyRate || 95;
  const overtimeRate = Math.round(baseRate * (currentSector?.overtimeMultiplier || 1.5));
  
  const standardHours = Number(worker?.todayStandardHours || (isPunchedIn ? 5.5 : 8.0)).toFixed(1);
  const overtimeHours = Number(worker?.todayOvertimeHours || (isPunchedIn ? 1.5 : 0.0)).toFixed(1);

  const baseEarnings = Math.round(standardHours * baseRate);
  const overtimeEarnings = Math.round(overtimeHours * overtimeRate);
  const totalEarned = baseEarnings + overtimeEarnings;

  const handleReadAloud = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);
    const langKey = currentLang in AUDIO_PROMPTS ? currentLang : 'en';
    const textToSpeak = AUDIO_PROMPTS[langKey].readWage(standardHours, overtimeHours, totalEarned);
    speakAloud(textToSpeak, langKey, () => setIsSpeaking(false));
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border border-slate-750 rounded-2xl p-4 shadow-xl text-slate-100 relative overflow-hidden">
      
      {/* Background glow accent */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <span>{t.wageLedger}</span>
              <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
                SDG 8.5
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">{t.zeroDeductions}</p>
          </div>
        </div>

        {/* Audio confirmation speaker */}
        <button
          onClick={handleReadAloud}
          className={`p-2 rounded-xl transition flex items-center gap-1.5 text-xs font-semibold ${
            isSpeaking 
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30 animate-pulse' 
              : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-750 border border-slate-700'
          }`}
          title="Audio read aloud in selected language"
          aria-label="Speak wage breakdown"
        >
          {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
          <span className="text-[11px] hidden sm:inline">{isSpeaking ? t.stopVoice : t.readAloud}</span>
        </button>
      </div>

      {/* Main Earned Today Badge */}
      <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between my-3">
        <div>
          <span className="text-[11px] text-slate-400 block">{t.dailyEarned}</span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-3xl font-extrabold text-white tracking-tight font-mono">
              ₹{totalEarned.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-emerald-400 font-medium">INR</span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-medium inline-flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> {t.auditVerified}
          </span>
          <p className="text-[10px] text-slate-500 mt-1 font-mono">Ledger ID #WAG-{worker?.id?.slice(-4) || '8021'}</p>
        </div>
      </div>

      {/* Two-Column Transparent Breakdown */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        {/* Standard Hours */}
        <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-750">
          <div className="flex items-center justify-between text-slate-400 text-[11px] mb-1">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-cyan-400" /> {t.standardHours}
            </span>
            <span className="font-mono text-slate-300">₹{baseRate}/hr</span>
          </div>
          <div className="flex items-baseline justify-between mt-1">
            <span className="font-mono text-white text-sm font-bold">{standardHours} hrs</span>
            <span className="text-cyan-300 font-semibold font-mono">₹{baseEarnings}</span>
          </div>
        </div>

        {/* Overtime Hours */}
        <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-750">
          <div className="flex items-center justify-between text-slate-400 text-[11px] mb-1">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" /> {t.overtimeHours}
            </span>
            <span className="font-mono text-amber-300">₹{overtimeRate}/hr</span>
          </div>
          <div className="flex items-baseline justify-between mt-1">
            <span className="font-mono text-amber-400 text-sm font-bold">{overtimeHours} hrs</span>
            <span className="text-amber-300 font-semibold font-mono">₹{overtimeEarnings}</span>
          </div>
        </div>
      </div>

      {/* Compliance footer */}
      <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
        <span>Payment Method: Direct Bank / Daily Escrow</span>
        <span className="text-emerald-400 font-medium">Zero Wage Withholding</span>
      </div>
    </div>
  );
}
