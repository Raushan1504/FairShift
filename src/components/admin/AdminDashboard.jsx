import React from 'react';
import { 
  Building2, 
  MapPin, 
  ShieldCheck, 
  Radio, 
  Download, 
  FileSpreadsheet, 
  ExternalLink,
  Award
} from 'lucide-react';
import { MetricsHeader } from './MetricsHeader';
import { FatigueMatrix } from './FatigueMatrix';
import { IncidentTriageQueue } from './IncidentTriageQueue';
import { SupervisorIndex } from './SupervisorIndex';

export function AdminDashboard({
  currentSector,
  workers,
  hazards,
  grievances,
  onUpdateHazardStatus,
  onUpdateWorkerHours
}) {
  const isConstruction = currentSector?.id === 'construction';

  const exportAuditCSV = () => {
    // Generate an audit CSV report for download
    const rows = [
      ['Report Type', 'FairShift Operations Compliance Audit (UN SDG 8)'],
      ['Timestamp', new Date().toISOString()],
      ['Sector', currentSector?.name],
      ['Location', currentSector?.location],
      ['Active Workers', workers.filter(w => w.shiftStatus === 'active').length],
      ['Total Overtime Logged Today', `${workers.reduce((a, b) => a + (b.todayOvertimeHours || 0), 0)} hrs`],
      ['Total Open Hazards', hazards.filter(h => h.status !== 'Resolved').length],
      ['Total Grievances (Central HR)', grievances.length],
      ['---', '---'],
      ['Worker ID', 'Name', 'Role', 'Weekly Hours', 'Status', 'Fatigue Risk'],
      ...workers.map(w => [w.id, w.name, w.role, w.weeklyHours, w.shiftStatus, w.weeklyHours > 48 ? 'VIOLATION' : 'OK'])
    ];

    const csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `FairShift_Audit_${currentSector?.id}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 space-y-6">
      
      {/* Sector Command Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span>Active Sector Operations View</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
            {currentSector?.name}
          </h1>
          <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-slate-400">
            <span className="flex items-center gap-1 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>{currentSector?.location}</span>
            </span>
            <span>•</span>
            <span className="font-mono text-emerald-400">
              Geofence: {currentSector?.geofence?.lat}° N, {currentSector?.geofence?.lng}° E (Radius: {currentSector?.geofence?.radiusMeters}m)
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={exportAuditCSV}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-2 transition"
            title="Export statutory audit report for Ministry of Labour / Inspection"
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span>Export ESG Audit CSV</span>
          </button>
        </div>
      </div>

      {/* 1. Operational KPI Header */}
      <MetricsHeader
        workers={workers}
        hazards={hazards}
        grievances={grievances}
        currentSector={currentSector}
      />

      {/* 2. Proactive Fatigue & Overwork Matrix (SDG 8.8) */}
      <FatigueMatrix
        workers={workers}
        onUpdateWorkerHours={onUpdateWorkerHours}
      />

      {/* Grid: Multilingual Incident Triage Queue & Aggregated Supervisor Conduct Index */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 3. Incident Triage Queue */}
        <IncidentTriageQueue
          hazards={hazards}
          onUpdateStatus={onUpdateHazardStatus}
        />

        {/* 4. Supervisor Misconduct Index */}
        <SupervisorIndex
          supervisors={currentSector?.supervisors || []}
          grievances={grievances}
        />
      </div>

    </div>
  );
}
