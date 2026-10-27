import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertOctagon, 
  Lock, 
  EyeOff, 
  UserX, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Clock, 
  FileText,
  Sparkles,
  Globe,
  Volume2,
  Languages
} from 'lucide-react';
import { speakAloud } from '../../utils/speech';
import { translateToEnglish } from '../../utils/translator';

export function SupervisorIndex({
  supervisors = [],
  grievances = [],
  onResolveGrievance
}) {
  const [expandedSupervisor, setExpandedSupervisor] = useState(null);

  // Group grievances by supervisor
  const grievancesBySupervisor = {};
  supervisors.forEach(s => {
    grievancesBySupervisor[s.id] = grievances.filter(g => g.supervisorId === s.id || g.supervisorName === s.name);
  });

  return (
    <div className="bg-slate-900 border border-slate-850 rounded-2xl p-5 shadow-xl space-y-4">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-base">Aggregated Supervisor Misconduct Index</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-semibold border border-purple-500/30">
                  Central HR Only
                </span>
              </div>
              <p className="text-xs text-slate-400">Zero-Trace Anonymous Grievance Ledger &amp; Attrition Predictor</p>
            </div>
          </div>
        </div>

        {/* Access Control Notice */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 text-xs">
          <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="text-[11px]">Site Supervisors Cryptographically Locked Out</span>
        </div>
      </div>

      {/* Supervisor Cards */}
      <div className="space-y-3">
        {supervisors.map((supervisor) => {
          const supervisorGrievances = grievancesBySupervisor[supervisor.id] || [];
          const count = supervisorGrievances.length;
          const isHighRisk = count >= 3;
          const isExpanded = expandedSupervisor === supervisor.id;

          return (
            <div 
              key={supervisor.id}
              className={`rounded-xl border transition-all ${
                isHighRisk 
                  ? 'border-rose-500/50 bg-rose-950/15 shadow-lg shadow-rose-900/10' 
                  : 'border-slate-800 bg-slate-900/50 hover:border-slate-750'
              }`}
            >
              {/* Card Header Row */}
              <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm ${
                    isHighRisk 
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' 
                      : 'bg-slate-800 text-slate-300 border border-slate-700'
                  }`}>
                    {supervisor.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{supervisor.name}</span>
                      <span className="text-[10px] font-mono text-slate-400 bg-slate-850 px-1.5 py-0.2 rounded border border-slate-750">
                        {supervisor.id}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">{supervisor.role} • {supervisor.department}</p>
                  </div>
                </div>

                {/* Complaint Count & Risk Flag */}
                <div className="flex items-center gap-3">
                  
                  {isHighRisk ? (
                    <div className="px-3 py-1.5 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold flex items-center gap-1.5 animate-pulse">
                      <AlertOctagon className="w-4 h-4 text-rose-400 shrink-0" />
                      <span>⚠️ Attrition Risk Flag: Supervisor Conduct Alert ({count} Complaints)</span>
                    </div>
                  ) : (
                    <div className="text-xs text-slate-400">
                      <span className="font-bold font-mono text-white text-sm">{count}</span> grievances logged
                    </div>
                  )}

                  <button
                    onClick={() => setExpandedSupervisor(isExpanded ? null : supervisor.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

              </div>

              {/* Expandable Anonymous Grievance Details */}
              {isExpanded && (
                <div className="border-t border-slate-800 bg-slate-950/80 p-4 space-y-3 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-semibold text-white">Protected Case Files for {supervisor.name}:</span>
                    <span className="text-[10px] text-emerald-400 font-mono">Zero Worker Names Disclosed</span>
                  </div>

                  {supervisorGrievances.length === 0 ? (
                    <p className="text-xs text-slate-500 py-2">No active grievances filed against this supervisor.</p>
                  ) : (
                    <div className="space-y-2">
                      {supervisorGrievances.map((g) => (
                        <div 
                          key={g.id}
                          className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                {g.tag}
                              </span>
                              <span className="font-mono text-emerald-400 font-bold text-xs">
                                {g.token}
                              </span>
                            </div>
                            <div className="text-[10px] text-slate-400">
                              {new Date(g.timestamp).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                            </div>
                          </div>

                          {/* English Translation Front-and-Center for Central HR */}
                          <div className="p-3 rounded-xl bg-cyan-950/25 border border-cyan-800/40 space-y-1">
                            <div className="flex items-center justify-between text-[11px] text-cyan-400">
                              <span className="font-semibold flex items-center gap-1.5">
                                <Globe className="w-3.5 h-3.5" />
                                <span>🌐 Auto-Translated to English (Central HR Investigation):</span>
                              </span>
                              <span className="text-[10px] text-cyan-300 font-mono">Dispatched</span>
                            </div>
                            <p className="text-xs text-cyan-50 font-sans leading-relaxed font-medium">
                              "{g.translatedEnglish || g.description}"
                            </p>
                          </div>

                          {/* Original Native Worker Transcript (if different or vernacular) */}
                          {g.description && g.translatedEnglish && g.description !== g.translatedEnglish && (
                            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] space-y-1">
                              <div className="flex items-center justify-between text-slate-400 text-[10px]">
                                <span className="font-medium">Original Native Speech / Transcript (Tamil/Hindi):</span>
                                <button
                                  type="button"
                                  onClick={() => speakAloud(g.description, /[\u0B80-\u0BFF]/.test(g.description) ? 'ta' : 'hi')}
                                  className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold transition"
                                >
                                  <Volume2 className="w-3 h-3" />
                                  <span>Play Audio</span>
                                </button>
                              </div>
                              <p className="text-amber-100 font-sans italic text-xs">"{g.description}"</p>
                            </div>
                          )}

                          {/* AI Adjudication & Guideline Compliance Card */}
                          {g.aiAdjudication && (
                            <div className="p-2.5 rounded-lg bg-slate-950 border border-purple-500/30 text-[11px] space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="font-semibold text-purple-300 flex items-center gap-1">
                                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                                  <span>AI Engine Adjudication: {g.aiAdjudication.category}</span>
                                </span>
                                <span className="text-[10px] font-bold text-rose-400 bg-rose-500/10 px-1.5 py-0.2 rounded border border-rose-500/20">
                                  {g.aiAdjudication.guidelineStatus}
                                </span>
                              </div>
                              <p className="text-slate-400">{g.aiAdjudication.verdictSummary}</p>
                              <div className="flex flex-wrap items-center justify-between gap-1 text-[10px] pt-1 border-t border-slate-850">
                                <span className="text-emerald-400 font-medium">{g.aiAdjudication.sdgTarget}</span>
                                <span className="text-purple-300 font-mono">{g.aiAdjudication.statutoryBreach}</span>
                              </div>
                            </div>
                          )}

                          <div className="pt-2 border-t border-slate-850 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px]">
                            <span className="text-slate-400 font-mono">
                              ZK-Proof: {g.verifiedWorkerProof}
                            </span>
                            <span className="text-cyan-400 font-medium">
                              HR Action: {g.hrActionTaken}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {isHighRisk && (
                    <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 flex items-center justify-between">
                      <div className="text-xs text-rose-300">
                        <strong>Mandatory HR Protocol:</strong> Initiate formal review with Site General Manager.
                      </div>
                      <button
                        onClick={() => alert(`Central HR Inquiry opened for ${supervisor.name}. Supervisor temporarily placed on non-disciplinary administrative shift review.`)}
                        className="px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs transition"
                      >
                        Initiate HR Inquiry
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer policy */}
      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
        <span>Whistleblower Protection Policy: Retaliatory termination carries automatic de-registration on FairShift ledger.</span>
        <span className="text-purple-400 font-mono text-[10px]">Audit Log #HR-AUD-2026</span>
      </div>
    </div>
  );
}
