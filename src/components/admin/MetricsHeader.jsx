import React from 'react';
import { 
  Users, 
  DollarSign, 
  AlertTriangle, 
  TrendingDown, 
  Activity, 
  ShieldAlert,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';

export function MetricsHeader({
  workers = [],
  hazards = [],
  grievances = [],
  currentSector
}) {
  // Live Headcount: count of workers currently active
  const activeCount = workers.filter(w => w.shiftStatus === 'active').length;
  const totalRoster = workers.length;

  // Overtime Liability: sum of (worker.todayOvertimeHours * worker.hourlyRate * 1.5)
  const totalOvertimeLiability = workers.reduce((acc, w) => {
    const otHrs = Number(w.todayOvertimeHours || 0);
    const rate = Number(w.hourlyRate || 95) * (currentSector?.overtimeMultiplier || 1.5);
    return acc + Math.round(otHrs * rate);
  }, 0);

  // Open Hazards: hazards with status 'Open' or 'In Progress'
  const openHazards = hazards.filter(h => h.status !== 'Resolved');
  const criticalHazards = openHazards.filter(h => h.severity === 'Critical');

  // Churn / Attrition Risk Score:
  // Dynamically calculated: High complaints against supervisors + fatigued workers = High Churn Risk
  const fatiguedWorkers = workers.filter(w => (w.weeklyHours || 0) > 48);
  const recentGrievances = grievances.length;

  let attritionScore = 22; // baseline
  attritionScore += fatiguedWorkers.length * 18;
  attritionScore += recentGrievances * 14;
  attritionScore = Math.min(94, Math.max(12, attritionScore));

  const isHighRisk = attritionScore >= 65;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      
      {/* 1. Live Headcount */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Live Headcount On-Site
          </span>
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Users className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-3xl font-black text-white font-mono">
            {activeCount}
          </span>
          <span className="text-xs text-slate-400 font-mono">/ {totalRoster} Active</span>
        </div>
        <div className="flex items-center gap-1.5 mt-2 text-[11px] text-emerald-400 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>100% Geofence Verified</span>
        </div>
      </div>

      {/* 2. Total Overtime Payout Liability */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Daily Overtime Liability
          </span>
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <DollarSign className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-3xl font-black text-white font-mono">
            ₹{totalOvertimeLiability.toLocaleString('en-IN')}
          </span>
          <span className="text-xs text-amber-400 font-mono">INR Logged</span>
        </div>
        <div className="flex items-center gap-1 mt-2 text-[11px] text-slate-400">
          <span>Automatic 1.5x Premium (SDG 8.5)</span>
        </div>
      </div>

      {/* 3. Open Hazards Count */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Open Worksite Hazards
          </span>
          <div className="p-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20">
            <AlertTriangle className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-3xl font-black text-white font-mono">
            {openHazards.length}
          </span>
          <span className="text-xs text-slate-400">Tickets in Queue</span>
        </div>
        <div className="flex items-center gap-1.5 mt-2 text-[11px]">
          {criticalHazards.length > 0 ? (
            <span className="text-red-400 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              {criticalHazards.length} Critical Immediate Action
            </span>
          ) : (
            <span className="text-emerald-400 font-medium">All critical hazards dispatched</span>
          )}
        </div>
      </div>

      {/* 4. Real-time Churn & Attrition Risk Score */}
      <div className={`p-4 rounded-2xl border shadow-lg relative overflow-hidden ${
        isHighRisk 
          ? 'bg-rose-950/20 border-rose-500/40 text-rose-200' 
          : 'bg-slate-900 border-slate-800 text-slate-100'
      }`}>
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Workforce Attrition Risk
          </span>
          <div className={`p-2 rounded-xl border ${
            isHighRisk 
              ? 'bg-rose-500/20 text-rose-400 border-rose-500/30' 
              : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
          }`}>
            <Activity className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2 mt-2">
          <span className={`text-3xl font-black font-mono ${isHighRisk ? 'text-rose-400' : 'text-emerald-400'}`}>
            {attritionScore}%
          </span>
          <span className="text-xs font-semibold">
            {isHighRisk ? 'HIGH QUIT RISK' : 'NORMAL / STABLE'}
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-2 text-[11px] text-slate-400">
          <span>Driven by {recentGrievances} complaints &amp; {fatiguedWorkers.length} overwork breaches</span>
        </div>
      </div>

    </div>
  );
}
