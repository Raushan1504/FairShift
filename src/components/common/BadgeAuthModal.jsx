import React, { useState } from 'react';
import { ShieldCheck, KeyRound, Radio, X, CheckCircle2, UserCheck, AlertCircle } from 'lucide-react';
import { getLocalizedWorker } from '../../utils/i18n';

export function BadgeAuthModal({ isOpen, onClose, workers, currentWorker, onSelectWorker, currentLang = 'en' }) {
  const [pinMode, setPinMode] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [nfcScanning, setNfcScanning] = useState(false);

  if (!isOpen) return null;

  const handlePinDigit = (digit) => {
    if (enteredPin.length < 4) {
      const next = enteredPin + digit;
      setEnteredPin(next);
      setPinError('');

      if (next.length === 4) {
        // Check matching worker
        const matched = workers.find(w => w.pin === next);
        if (matched) {
          onSelectWorker(matched);
          onClose();
        } else {
          setPinError('Invalid 4-Digit PIN. Try default worker PIN (e.g., 1001 or 2001).');
        }
      }
    }
  };

  const handlePinBackspace = () => {
    setEnteredPin(prev => prev.slice(0, -1));
    setPinError('');
  };

  const handleClearPin = () => {
    setEnteredPin('');
    setPinError('');
  };

  const simulateNfcTap = (worker) => {
    setNfcScanning(true);
    setTimeout(() => {
      setNfcScanning(false);
      onSelectWorker(worker);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-750 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-850 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-base">Passwordless Worker Badge Punch</h3>
              <p className="text-xs text-slate-400">Zero-friction NFC tap &amp; accessible 4-digit PIN</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="flex border-b border-slate-800 bg-slate-900/60 p-1.5 gap-1.5">
          <button
            onClick={() => setPinMode(false)}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition ${
              !pinMode 
                ? 'bg-amber-500 text-slate-950 shadow-md font-semibold' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Radio className="w-4 h-4" /> 1-Tap NFC / RFID Badge
          </button>
          <button
            onClick={() => setPinMode(true)}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition ${
              pinMode 
                ? 'bg-amber-500 text-slate-950 shadow-md font-semibold' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <KeyRound className="w-4 h-4" /> Accessible 4-Digit PIN
          </button>
        </div>

        {/* Body */}
        <div className="p-5">
          {!pinMode ? (
            <div className="space-y-3">
              <div className="p-3 bg-amber-500/5 border border-amber-500/20 rounded-xl flex items-center gap-2.5 text-xs text-amber-300">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Simulates hardware smart badge tap on site reader terminal for low-literacy staff.</span>
              </div>

              <div className="space-y-2 mt-3">
                {workers.map((w) => {
                  const isCurrent = currentWorker?.id === w.id;
                  const localizedW = getLocalizedWorker(w, currentLang);
                  return (
                    <button
                      key={w.id}
                      onClick={() => simulateNfcTap(w)}
                      disabled={nfcScanning}
                      className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition group ${
                        isCurrent 
                          ? 'border-amber-500/50 bg-amber-500/10' 
                          : 'border-slate-800 bg-slate-800/50 hover:bg-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img 
                          src={w.avatar} 
                          alt={w.name} 
                          className="w-11 h-11 rounded-full object-cover border-2 border-slate-700 group-hover:border-amber-400 transition" 
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-white text-sm">{localizedW.name}</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 font-mono">
                              {w.id}
                            </span>
                          </div>
                          <p className="text-xs text-amber-400 font-medium">{localizedW.role}</p>
                          <p className="text-[11px] text-slate-400 mt-0.5">PIN: {w.pin} • Rate: ₹{w.hourlyRate}/hr</p>
                        </div>
                      </div>
                      <div className="shrink-0 flex items-center gap-1 text-xs text-slate-400 group-hover:text-amber-300">
                        {isCurrent ? (
                          <span className="flex items-center gap-1 text-emerald-400 font-medium text-xs bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/30">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Active
                          </span>
                        ) : (
                          <span className="px-2.5 py-1.5 rounded-lg bg-slate-750 text-slate-300 font-medium group-hover:bg-amber-500 group-hover:text-slate-950 transition text-xs">
                            Tap Badge
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-xs text-slate-400">Enter your 4-digit site security PIN:</p>
                <div className="flex justify-center gap-3 my-4">
                  {[0, 1, 2, 3].map((idx) => (
                    <div 
                      key={idx} 
                      className={`w-12 h-14 rounded-xl border-2 flex items-center justify-center text-xl font-bold font-mono transition ${
                        enteredPin.length > idx 
                          ? 'border-amber-400 bg-amber-500/10 text-amber-300' 
                          : 'border-slate-750 bg-slate-850 text-slate-500'
                      }`}
                    >
                      {enteredPin.length > idx ? '●' : ''}
                    </div>
                  ))}
                </div>
                {pinError && (
                  <p className="text-xs text-red-400 flex items-center justify-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {pinError}
                  </p>
                )}
              </div>

              {/* Accessible Touch Keypad */}
              <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
                  <button
                    key={digit}
                    onClick={() => handlePinDigit(String(digit))}
                    className="h-13 rounded-xl bg-slate-800 hover:bg-slate-750 active:bg-amber-500 active:text-slate-950 text-white text-lg font-semibold border border-slate-700 transition"
                  >
                    {digit}
                  </button>
                ))}
                <button
                  onClick={handleClearPin}
                  className="h-13 rounded-xl bg-slate-850 hover:bg-slate-800 text-slate-400 text-xs font-medium border border-slate-750 transition"
                >
                  Clear
                </button>
                <button
                  onClick={() => handlePinDigit('0')}
                  className="h-13 rounded-xl bg-slate-800 hover:bg-slate-750 active:bg-amber-500 active:text-slate-950 text-white text-lg font-semibold border border-slate-700 transition"
                >
                  0
                </button>
                <button
                  onClick={handlePinBackspace}
                  className="h-13 rounded-xl bg-slate-850 hover:bg-slate-800 text-amber-400 text-xs font-medium border border-slate-750 transition"
                >
                  Delete
                </button>
              </div>

              <div className="text-center text-[11px] text-slate-500">
                Hint: Worker PINs: {workers.map(w => `${w.name.split(' ')[0]} (${w.pin})`).join(', ')}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
