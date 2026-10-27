import React, { useState } from 'react';
import { 
  HardHat, 
  Building2, 
  GraduationCap, 
  Smartphone, 
  LayoutDashboard, 
  Radio, 
  RotateCcw, 
  Info, 
  ChevronDown,
  Sparkles,
  ShieldAlert,
  UserCheck
} from 'lucide-react';
import { BadgeAuthModal } from './BadgeAuthModal';
import { ReadmeBannerModal } from './ReadmeBannerModal';
import { getLocalizedWorker } from '../../utils/i18n';

export function Navbar({
  currentSectorKey,
  onSelectSector,
  currentPersona,
  onSelectPersona,
  currentWorker,
  onSelectWorker,
  workers,
  onResetData,
  currentLang = 'en'
}) {
  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState(false);
  const [isReadmeModalOpen, setIsReadmeModalOpen] = useState(false);
  const [sectorDropdownOpen, setSectorDropdownOpen] = useState(false);

  const isConstruction = currentSectorKey === 'CONSTRUCTION';

  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-lg">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
            
            {/* Left: Brand & SDG 8 Tag */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 flex items-center justify-center font-black shadow-md shadow-amber-500/20">
                  <span className="text-lg">⚡</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-base sm:text-lg tracking-tight text-white">FairShift</span>
                    <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                      SDG 8 Decent Work
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 hidden sm:block">Prompt Wars 2026 • SRM ACM Student Chapter</p>
                </div>
              </div>
            </div>

            {/* Middle: Cross-Sector Switcher & Persona Toggle */}
            <div className="flex items-center gap-2">
              
              {/* Sector Switcher */}
              <div className="relative">
                <button
                  onClick={() => setSectorDropdownOpen(!sectorDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-xs font-medium text-slate-200 transition"
                  title="Switch Operational Sector"
                >
                  {isConstruction ? (
                    <>
                      <HardHat className="w-4 h-4 text-amber-400" />
                      <span className="hidden md:inline">🏗️ Metro Rail Construction</span>
                      <span className="md:hidden">Metro Rail</span>
                    </>
                  ) : (
                    <>
                      <GraduationCap className="w-4 h-4 text-emerald-400" />
                      <span className="hidden md:inline">🎓 Campus Facility Ops</span>
                      <span className="md:hidden">Campus Ops</span>
                    </>
                  )}
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {sectorDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in-95">
                    <div className="px-3 py-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                      Switch Active Sector (2+ Sectors)
                    </div>
                    <button
                      onClick={() => {
                        onSelectSector('CONSTRUCTION');
                        setSectorDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left flex items-center gap-2.5 text-xs transition ${
                        isConstruction ? 'bg-amber-500/10 text-amber-300 font-semibold' : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <HardHat className="w-4 h-4 text-amber-400" />
                      <div>
                        <div>🏗️ Metro Rail Construction</div>
                        <div className="text-[10px] text-slate-400 font-normal">L&T Metro Phase 2 Guindy</div>
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        onSelectSector('CAMPUS');
                        setSectorDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left flex items-center gap-2.5 text-xs transition ${
                        !isConstruction ? 'bg-emerald-500/10 text-emerald-300 font-semibold' : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <GraduationCap className="w-4 h-4 text-emerald-400" />
                      <div>
                        <div>🎓 Campus Facility Ops</div>
                        <div className="text-[10px] text-slate-400 font-normal">SRMIST KTR Dining &amp; Grounds</div>
                      </div>
                    </button>
                  </div>
                )}
              </div>

              {/* Persona Switcher: Worker Mobile vs Central Admin */}
              <div className="flex bg-slate-850 p-1 rounded-xl border border-slate-750">
                <button
                  onClick={() => onSelectPersona('worker')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition ${
                    currentPersona === 'worker'
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="Worker Mobile Portal (Mobile Framed)"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">👷 Worker Mobile</span>
                  <span className="sm:hidden">Worker</span>
                </button>
                <button
                  onClick={() => onSelectPersona('admin')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition ${
                    currentPersona === 'admin'
                      ? 'bg-cyan-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="Central Admin & HR Operations Command Center"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">🏢 Central Admin</span>
                  <span className="sm:hidden">Admin</span>
                </button>
              </div>
            </div>

            {/* Right: Quick Worker Badge & Quick Controls */}
            <div className="flex items-center gap-2">
              
              {/* Quick Badge Switcher Button */}
              {currentWorker && (() => {
                const localizedWorker = getLocalizedWorker(currentWorker, currentLang);
                return (
                  <button
                    onClick={() => setIsBadgeModalOpen(true)}
                    className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1 rounded-xl bg-slate-800/80 hover:bg-slate-750 border border-slate-700 text-left transition group"
                    title="1-Tap NFC Badge / PIN Switcher"
                  >
                    <img
                      src={currentWorker.avatar}
                      alt={currentWorker.name}
                      className="w-7 h-7 rounded-full object-cover border border-amber-400/60"
                    />
                    <div className="hidden lg:block">
                      <div className="text-xs font-semibold text-white leading-tight flex items-center gap-1">
                        <span>{localizedWorker.name}</span>
                        <Radio className="w-3 h-3 text-amber-400 animate-pulse" />
                      </div>
                      <div className="text-[10px] text-amber-400/90">{localizedWorker.role}</div>
                    </div>
                    <div className="hidden sm:block text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 font-mono">
                      {currentWorker.id}
                    </div>
                  </button>
                );
              })()}

              {/* Info / Readme Modal */}
              <button
                onClick={() => setIsReadmeModalOpen(true)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 transition"
                title="View UN SDG 8 & Architecture Specifications"
              >
                <Info className="w-4 h-4 text-cyan-400" />
              </button>

              {/* Reset Data to Pristine */}
              <button
                onClick={onResetData}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-400 hover:text-amber-400 border border-slate-700 transition"
                title="Reset Local Demo Data to Pristine"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Badge Auth Modal */}
      <BadgeAuthModal
        isOpen={isBadgeModalOpen}
        onClose={() => setIsBadgeModalOpen(false)}
        workers={workers}
        currentWorker={currentWorker}
        onSelectWorker={onSelectWorker}
        currentLang={currentLang}
      />

      {/* Readme / Architecture Specs Modal */}
      <ReadmeBannerModal
        isOpen={isReadmeModalOpen}
        onClose={() => setIsReadmeModalOpen(false)}
      />
    </>
  );
}
