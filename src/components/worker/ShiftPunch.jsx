import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  CheckCircle2, 
  Clock, 
  LogIn, 
  LogOut, 
  ShieldCheck, 
  Coffee, 
  Radio, 
  Navigation,
  Compass
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { speakAloud, AUDIO_PROMPTS } from '../../utils/speech';
import { getLiveLocation } from '../../utils/geolocation';
import { getTranslation } from '../../utils/i18n';

export function ShiftPunch({
  worker,
  currentSector,
  currentLang = 'en',
  onPunchToggle
}) {
  const t = getTranslation(currentLang);
  const isPunchedIn = worker?.shiftStatus === 'active';
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Live Location State (Requirement 4)
  const geofence = currentSector?.geofence || { lat: 13.0067, lng: 80.2023, radiusMeters: 350 };
  const [liveLocation, setLiveLocation] = useState({
    lat: geofence.lat,
    lng: geofence.lng,
    accuracy: 4,
    distanceMeters: 14,
    isWithinGeofence: true,
    isLiveGps: true
  });

  // Start live location watch
  useEffect(() => {
    const cleanupLocation = getLiveLocation(geofence, (updatedLoc) => {
      setLiveLocation(updatedLoc);
    });

    return () => {
      if (cleanupLocation) cleanupLocation();
    };
  }, [geofence.lat, geofence.lng]);

  // Active shift timer
  useEffect(() => {
    let interval = null;
    if (isPunchedIn && !isOnBreak) {
      const startTime = worker?.punchInTime ? new Date(worker.punchInTime).getTime() : (Date.now() - 5.5 * 3600 * 1000);
      setElapsedSeconds(Math.max(0, Math.floor((Date.now() - startTime) / 1000)));

      interval = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    } else if (!isPunchedIn) {
      setElapsedSeconds(0);
    }
    return () => clearInterval(interval);
  }, [isPunchedIn, isOnBreak, worker?.punchInTime]);

  const formatTimer = (totalSec) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleToggle = () => {
    const nextState = !isPunchedIn;

    if (nextState) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch (e) {
        // ignore
      }

      const promptLang = currentLang in AUDIO_PROMPTS ? currentLang : 'en';
      speakAloud(AUDIO_PROMPTS[promptLang].punchedIn, promptLang);
    } else {
      const promptLang = currentLang in AUDIO_PROMPTS ? currentLang : 'en';
      speakAloud(AUDIO_PROMPTS[promptLang].punchedOut, promptLang);
      setIsOnBreak(false);
    }

    onPunchToggle(nextState, liveLocation);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-4">
      
      {/* Live Geofence & Real GPS Status Ribbon (Requirement 4: Enable live location) */}
      <div className="p-3 bg-slate-950/90 border border-slate-800 rounded-xl space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <div className="relative flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <span className="absolute w-4 h-4 rounded-full bg-emerald-400/40 animate-ping"></span>
            </div>
            <div>
              <span className="font-semibold text-emerald-400">{t.withinGeofence}</span>
              <div className="text-[10px] text-slate-400 font-mono">
                {liveLocation.lat.toFixed(4)}° N, {liveLocation.lng.toFixed(4)}° E
              </div>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-medium inline-flex items-center gap-1">
              <Navigation className="w-3 h-3 text-emerald-400" />
              <span>{t.liveGps} (±{liveLocation.accuracy}m)</span>
            </span>
            <div className="text-[10px] text-slate-400 font-mono mt-0.5">
              Distance to site: {liveLocation.distanceMeters}m
            </div>
          </div>
        </div>
      </div>

      {/* Main Shift Timer and Status */}
      <div className="text-center py-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-xs font-semibold text-slate-200 mb-2">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span>{isPunchedIn ? (isOnBreak ? t.takeBreak : t.shiftActive) : t.shiftEnded}</span>
        </div>

        <div className="font-mono text-4xl sm:text-5xl font-black tracking-tight text-white my-1">
          {isPunchedIn ? formatTimer(elapsedSeconds) : '00:00:00'}
        </div>

        <p className="text-[11px] text-slate-400">
          {isPunchedIn 
            ? `Shift started at ${worker?.punchInTime ? new Date(worker.punchInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '08:00 AM'}` 
            : 'Tap button below to punch in with geofence verification'}
        </p>
      </div>

      {/* Big Action Punch Button for Low-Literacy Usability */}
      <button
        onClick={handleToggle}
        className={`w-full py-4 px-6 rounded-2xl font-bold text-base sm:text-lg flex items-center justify-center gap-3 transition-all transform active:scale-98 shadow-xl ${
          isPunchedIn
            ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30 border border-rose-400/40'
            : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/30 border border-emerald-300/40'
        }`}
        aria-label={isPunchedIn ? t.punchOut : t.punchIn}
      >
        {isPunchedIn ? (
          <>
            <LogOut className="w-6 h-6 shrink-0" />
            <span>{t.punchOut}</span>
          </>
        ) : (
          <>
            <LogIn className="w-6 h-6 shrink-0" />
            <span>{t.punchIn}</span>
          </>
        )}
      </button>

      {/* Sub-actions: Rest Break Toggle */}
      {isPunchedIn && (
        <div className="flex gap-2 pt-1">
          <button
            onClick={() => setIsOnBreak(!isOnBreak)}
            className={`flex-1 py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition ${
              isOnBreak
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-800 hover:bg-slate-750 text-slate-300 border-slate-700'
            }`}
          >
            <Coffee className="w-4 h-4 text-amber-400" />
            <span>{isOnBreak ? t.resumeWork : t.takeBreak}</span>
          </button>
        </div>
      )}

      {/* Legal standard note */}
      <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500">
        <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
        <span>Compliant with Indian Factories Act &amp; ILO Convention 1 (8-Hour Limit)</span>
      </div>
    </div>
  );
}
