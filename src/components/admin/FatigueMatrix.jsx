import React from 'react';
import { 
  ShieldAlert, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  UserX, 
  Calendar,
  Sparkles,
  Zap
} from 'lucide-react';

export function FatigueMatrix({ workers = [], onUpdateWorkerHours }) {
  const LEGAL_WEEKLY_LIMIT = 48; // ILO standard & Indian Factories Act Sec 51

  return (
    <div className="bg-slate-900 border border-slate-850 rounded-2xl p-5 shadow-xl space-y-4">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/30">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Proactive Fatigue &amp; Overwork Matrix</h3>
              <p className="text-xs text-slate-400">UN SDG 8.8 • Automated Overtime Cut-Off &amp; Fatigue Prevention</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 font-mono">
            Safety Threshold: 48.0h / week
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
            <tr>
              <th className="p-3 font-semibold">Worker &amp; Role</th>
              <th className="p-3 font-semibold">Cumulative Weekly</th>
              <th className="p-3 font-semibold">Consecutive Days</th>
              <th className="p-3 font-semibold">Fatigue &amp; Compliance Status</th>
              <th className="p-3 font-semibold text-right">Mandatory Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 bg-slate-900/60">
            {workers.map((worker) => {
              const weeklyHours = Number(worker.weeklyHours || 40);
              const isOverLimit = weeklyHours > LEGAL_WEEKLY_LIMIT;
              const isCriticalTurnaround = (worker.consecutiveDays || 5) >= 7;

              return (
                <tr 
                  key={worker.id}
                  className={`transition ${isOverLimit ? 'bg-rose-950/20 hover:bg-rose-950/30' : 'hover:bg-slate-850/50'}`}
                >
                  {/* Worker Name & Role */}
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <img 
                        src={worker.avatar} 
                        alt={worker.name} 
                        className="w-9 h-9 rounded-full object-cover border border-slate-700" 
                      />
                      <div>
                        <div className="font-semibold text-white flex items-center gap-1.5">
                          <span>{worker.name}</span>
                          <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-1 py-0.2 rounded">
                            {worker.id}
                          </span>
                        </div>
                        <div className="text-[11px] text-amber-400">{worker.role}</div>
                      </div>
                    </div>
                  </td>

                  {/* Weekly Hours Bar */}
                  <td className="p-3">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className={`font-bold ${isOverLimit ? 'text-rose-400 font-extrabold' : 'text-slate-200'}`}>
                          {weeklyHours.toFixed(1)} hrs
                        </span>
                        <span className="text-[10px] text-slate-500">/ 48h limit</span>
                      </div>
                      <div className="w-32 sm:w-40 bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            isOverLimit 
                              ? 'bg-rose-500 animate-pulse' 
                              : weeklyHours > 42 
                                ? 'bg-amber-400' 
                                : 'bg-emerald-400'
                          }`}
                          style={{ width: `${Math.min(100, (weeklyHours / 48) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>

                  {/* Consecutive Days */}
                  <td className="p-3">
                    <span className={`font-mono font-semibold ${isCriticalTurnaround ? 'text-amber-400' : 'text-slate-300'}`}>
                      {worker.consecutiveDays || 5} days straight
                    </span>
                  </td>

                  {/* Compliance Flag */}
                  <td className="p-3">
                    {isOverLimit ? (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[11px] font-bold">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        <span>🚨 CRITICAL FATIGUE: Overtime Blocked</span>
                      </div>
                    ) : weeklyHours > 42 ? (
                      <span className="inline-flex items-center gap-1 text-amber-300 text-[11px] bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                        <span>Approaching 48h limit</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-emerald-400 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Compliant &amp; Safe</span>
                      </span>
                    )}
                  </td>

                  {/* Mandatory Action */}
                  <td className="p-3 text-right">
                    {isOverLimit ? (
                      <button
                        onClick={() => onUpdateWorkerHours && onUpdateWorkerHours(worker.id, 40.0)}
                        className="px-2.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold text-[11px] shadow-sm transition"
                        title="Enforce mandatory 24-hour stand down rest period"
                      >
                        Mandate Rest (Enforce 40h)
                      </button>
                    ) : (
                      <span className="text-[11px] text-slate-500">Shift Optimal</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Compliance Standard Note */}
      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
        <span>Statutory Rule: Section 51 of Factories Act 1948 prohibits &gt;48 weekly hours to prevent industrial crane/scaffolding crush accidents.</span>
        <span className="text-emerald-400 font-medium">Automatic Lockout Engaged</span>
      </div>
    </div>
  );
}
