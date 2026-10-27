import React, { useState, useEffect } from 'react';
import { Navbar } from './components/common/Navbar';
import { WorkerPortal } from './components/worker/WorkerPortal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { 
  getInitialPlatformData, 
  savePlatformData, 
  resetPlatformData,
  getActiveSectorId,
  setActiveSectorId,
  getActivePersona,
  setActivePersona,
  getActiveWorkerId,
  setActiveWorkerId,
  getActiveLanguage,
  setActiveLanguage
} from './utils/storage';
import { CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';

export default function App() {
  const [platformData, setPlatformData] = useState(getInitialPlatformData);
  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const initialSector = searchParams?.get('sector') || getActiveSectorId();
  const initialPersona = searchParams?.get('persona') || getActivePersona();
  const initialLang = searchParams?.get('lang') || getActiveLanguage();
  const initialModal = searchParams?.get('modal') || null;

  const [activeSectorKey, setSectorKey] = useState(initialSector);
  const [activePersona, setPersona] = useState(initialPersona);
  const [activeLang, setLang] = useState(initialLang);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync with storage events
  useEffect(() => {
    const handleStateChanged = (e) => setPlatformData(e.detail);
    const handleSectorChanged = (e) => setSectorKey(e.detail);
    const handlePersonaChanged = (e) => setPersona(e.detail);
    const handleLangChanged = (e) => setLang(e.detail);

    window.addEventListener('fairshift_state_changed', handleStateChanged);
    window.addEventListener('fairshift_sector_changed', handleSectorChanged);
    window.addEventListener('fairshift_persona_changed', handlePersonaChanged);
    window.addEventListener('fairshift_lang_changed', handleLangChanged);

    return () => {
      window.removeEventListener('fairshift_state_changed', handleStateChanged);
      window.removeEventListener('fairshift_sector_changed', handleSectorChanged);
      window.removeEventListener('fairshift_persona_changed', handlePersonaChanged);
      window.removeEventListener('fairshift_lang_changed', handleLangChanged);
    };
  }, []);

  const showToast = (title, desc) => {
    setToastMessage({ title, desc });
    setTimeout(() => setToastMessage(null), 4500);
  };

  // Active sector data
  const currentSector = platformData[activeSectorKey] || platformData.CONSTRUCTION;
  const workers = currentSector.workers || [];
  const hazards = currentSector.initialHazards || [];
  const grievances = currentSector.initialGrievances || [];

  // Active worker
  const activeWorkerId = getActiveWorkerId(activeSectorKey);
  const currentWorker = workers.find(w => w.id === activeWorkerId) || workers[0];

  // Sector switcher handler
  const handleSelectSector = (sectorKey) => {
    setActiveSectorId(sectorKey);
    setSectorKey(sectorKey);
  };

  // Persona switcher handler
  const handleSelectPersona = (persona) => {
    setActivePersona(persona);
    setPersona(persona);
  };

  // Worker switcher handler
  const handleSelectWorker = (worker) => {
    setActiveWorkerId(activeSectorKey, worker.id);
    showToast('Badge Tap Recognized', `Switched active worker session to ${worker.name} (${worker.role})`);
  };

  // Language switcher handler
  const handleSelectLanguage = (lang) => {
    setActiveLanguage(lang);
    setLang(lang);
  };

  // Punch in / out toggle handler
  const handlePunchToggle = (newActiveStatus) => {
    const updatedWorkers = workers.map(w => {
      if (w.id === currentWorker.id) {
        return {
          ...w,
          shiftStatus: newActiveStatus ? 'active' : 'punched_out',
          punchInTime: newActiveStatus ? new Date().toISOString() : null,
          todayStandardHours: newActiveStatus ? 5.5 : 8.0,
          todayOvertimeHours: newActiveStatus ? 1.5 : 0.0
        };
      }
      return w;
    });

    const updatedData = {
      ...platformData,
      [activeSectorKey]: {
        ...currentSector,
        workers: updatedWorkers
      }
    };

    savePlatformData(updatedData);
    setPlatformData(updatedData);

    showToast(
      newActiveStatus ? '✅ Shift Punched In' : '🛑 Shift Punched Out',
      newActiveStatus ? 'Geofence confirmed. Shift ledger clock running.' : 'Hours and overtime locked to daily wage ledger.'
    );
  };

  // Submit new hazard ticket
  const handleSubmitHazard = (newHazard) => {
    const updatedHazards = [newHazard, ...hazards];
    const updatedData = {
      ...platformData,
      [activeSectorKey]: {
        ...currentSector,
        initialHazards: updatedHazards
      }
    };

    savePlatformData(updatedData);
    setPlatformData(updatedData);

    showToast(
      '🎙️ Hazard Dispatched',
      `Auto-translated: "${newHazard.translatedText.slice(0, 50)}..." sent to ${newHazard.assignedTo}`
    );
  };

  // Submit new anonymous grievance
  const handleSubmitGrievance = (newGrievance) => {
    const updatedGrievances = [newGrievance, ...grievances];
    const updatedData = {
      ...platformData,
      [activeSectorKey]: {
        ...currentSector,
        initialGrievances: updatedGrievances
      }
    };

    savePlatformData(updatedData);
    setPlatformData(updatedData);

    showToast(
      '🛡️ Zero-Trace Grievance Filed',
      `Assigned token ${newGrievance.token}. Direct to Central HR. Site supervisors have zero visibility.`
    );
  };

  // Update hazard status (Open -> In Progress -> Resolved)
  const handleUpdateHazardStatus = (hazardId, newStatus) => {
    const updatedHazards = hazards.map(h => {
      if (h.id === hazardId) {
        return { ...h, status: newStatus };
      }
      return h;
    });

    const updatedData = {
      ...platformData,
      [activeSectorKey]: {
        ...currentSector,
        initialHazards: updatedHazards
      }
    };

    savePlatformData(updatedData);
    setPlatformData(updatedData);

    showToast('Hazard Status Updated', `Ticket ${hazardId} marked as [${newStatus}]`);
  };

  // Update worker hours (e.g. from Fatigue Matrix mandate rest)
  const handleUpdateWorkerHours = (workerId, newHours) => {
    const updatedWorkers = workers.map(w => {
      if (w.id === workerId) {
        return {
          ...w,
          weeklyHours: newHours,
          todayOvertimeHours: 0
        };
      }
      return w;
    });

    const updatedData = {
      ...platformData,
      [activeSectorKey]: {
        ...currentSector,
        workers: updatedWorkers
      }
    };

    savePlatformData(updatedData);
    setPlatformData(updatedData);

    showToast('Mandatory Rest Enforced', `Worker ${workerId} weekly hours adjusted to 40.0h. Overtime block lifted.`);
  };

  // Reset to pristine data
  const handleResetData = () => {
    if (window.confirm('Reset all demo data (hours, hazards, grievances) back to factory seed?')) {
      const reset = resetPlatformData();
      setPlatformData(reset);
      showToast('Data Reset', 'All records returned to fresh hackathon demonstration baseline.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      
      {/* Global Navbar */}
      <Navbar
        currentSectorKey={activeSectorKey}
        onSelectSector={handleSelectSector}
        currentPersona={activePersona}
        onSelectPersona={handleSelectPersona}
        currentWorker={currentWorker}
        onSelectWorker={handleSelectWorker}
        workers={workers}
        onResetData={handleResetData}
        currentLang={activeLang}
      />

      {/* Main Body */}
      <main className="flex-1 pb-12">
        {activePersona === 'worker' ? (
          <WorkerPortal
            currentWorker={currentWorker}
            currentSector={currentSector}
            currentLang={activeLang}
            onSelectLanguage={handleSelectLanguage}
            onPunchToggle={handlePunchToggle}
            onSubmitHazard={handleSubmitHazard}
            onSubmitGrievance={handleSubmitGrievance}
            initialModal={initialModal}
          />
        ) : (
          <AdminDashboard
            currentSector={currentSector}
            workers={workers}
            hazards={hazards}
            grievances={grievances}
            onUpdateHazardStatus={handleUpdateHazardStatus}
            onUpdateWorkerHours={handleUpdateWorkerHours}
          />
        )}
      </main>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 z-50 max-w-sm p-4 rounded-2xl bg-slate-900 border border-amber-500/40 text-slate-100 shadow-2xl flex items-start gap-3 animate-in slide-in-from-bottom-5 duration-200">
          <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30 shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-white">{toastMessage.title}</h4>
            <p className="text-xs text-slate-300 mt-0.5 leading-snug">{toastMessage.desc}</p>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-4 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">FairShift Decent Work Platform</span>
            <span>•</span>
            <span>Prompt Wars 2026 (SRM ACM Student Chapter)</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <span>Aligned with UN SDG 8 (Targets 8.5 &amp; 8.8)</span>
            <span>•</span>
            <span className="text-emerald-400">Google Cloud Run Ready</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
