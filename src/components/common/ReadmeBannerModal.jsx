import React from 'react';
import { X, Award, Shield, CheckCircle, Scale, Building2, GraduationCap, ArrowRight, Zap, Terminal } from 'lucide-react';

export function ReadmeBannerModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Banner Header */}
        <div className="sticky top-0 z-10 bg-slate-950/95 backdrop-blur-sm p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500 to-emerald-600 text-slate-950 font-bold">
              <Award className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">FairShift Architecture &amp; SDG 8 Compliance</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Prompt Wars 2026
                </span>
              </div>
              <p className="text-xs text-slate-400">SRM ACM Student Chapter • Decent Work and Economic Growth Platform</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-sm text-slate-300">
          
          {/* UN SDG 8 Targets */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-semibold">
                <Scale className="w-5 h-5" />
                <span>UN SDG Target 8.5: Decent Work &amp; Equal Pay</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Achieve full and productive employment and decent work for all women and men, including for young people and persons with disabilities, and equal pay for work of equal value.
              </p>
              <div className="pt-2 border-t border-amber-500/20 text-[11px] text-amber-200">
                <strong>FairShift Solution:</strong> Transparent hourly ledger, geofence-verified automatic overtime computation at 1.5x, and multi-lingual audio read-aloud wage confirmation.
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <Shield className="w-5 h-5" />
                <span>UN SDG Target 8.8: Safe &amp; Secure Working Environments</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Protect labour rights and promote safe and secure working environments for all workers, including migrant workers and those in precarious employment.
              </p>
              <div className="pt-2 border-t border-emerald-500/20 text-[11px] text-emerald-200">
                <strong>FairShift Solution:</strong> Voice-first hazard reporter (Tamil/Hindi to English via Google Translate API), fatigue risk matrix flagging &gt;48h workweeks, and 100% zero-trace anonymous grievance filing.
              </div>
            </div>
          </div>

          {/* Pain Points Resolution Matrix */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-cyan-400" />
              Resolution of Core Worker Pain Points
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-750">
                <h4 className="font-semibold text-white text-xs mb-1 text-red-400">1. Opaque Pay Calculations</h4>
                <p className="text-xs text-slate-400">
                  Workers previously suffered from arbitrary supervisor cuts and unrecorded overtime. FairShift provides an immutable, transparent daily wage card breaking down base hours, overtime rates, and instant voice confirmation.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-750">
                <h4 className="font-semibold text-white text-xs mb-1 text-amber-400">2. Fear of Identification &amp; Retaliation</h4>
                <p className="text-xs text-slate-400">
                  Workers feared being fired for reporting harassment. FairShift uses cryptographic identity decoupling to generate verified tokens (e.g., <code className="text-emerald-400">#ANON-8F92</code>) that route directly to Central HR and lock out site supervisors.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-750">
                <h4 className="font-semibold text-white text-xs mb-1 text-yellow-400">3. Unreported Safety Risks</h4>
                <p className="text-xs text-slate-400">
                  Hazards went unreported due to language barriers. FairShift enables workers to speak naturally in Tamil or Hindi; reports are instantly transcribed and translated into English for immediate supervisor dispatch.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-750">
                <h4 className="font-semibold text-white text-xs mb-1 text-cyan-400">4. Lost Career History</h4>
                <p className="text-xs text-slate-400">
                  Daily wage workers are forced to restart from zero whenever contractors change. FairShift issues a Verifiable Digital Skill Passport with a scannable QR code storing verified hours, machinery certifications, and zero-incident streaks.
                </p>
              </div>
            </div>
          </div>

          {/* Cross-Sector Adaptation Table */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-amber-400" />
              Cross-Industry Operational Mapping (2+ Sectors Requirement)
            </h3>
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-850 text-slate-300 border-b border-slate-800">
                  <tr>
                    <th className="p-3 font-semibold">Operational Dimension</th>
                    <th className="p-3 font-semibold text-amber-400">🏗️ Sector 1: Metro Rail Construction</th>
                    <th className="p-3 font-semibold text-emerald-400">🎓 Sector 2: Campus Facility Ops (SRMIST)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
                  <tr>
                    <td className="p-3 font-medium text-slate-300">Target Workforce</td>
                    <td className="p-3 text-slate-400">Scaffolders, Tower Crane Operators, Rebar Benders, Welders</td>
                    <td className="p-3 text-slate-400">Hostel Mess Cooks, Sanitation Leads, High-Tension Electricians</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-slate-300">Geofence Boundary</td>
                    <td className="p-3 text-slate-400">13.0067° N, 80.2023° E (Metro Corridor 4 - 350m radius)</td>
                    <td className="p-3 text-slate-400">12.8231° N, 80.0442° E (SRMIST KTR Campus - 500m radius)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-slate-300">Industry Hazards</td>
                    <td className="p-3 text-slate-400">Loose scaffolding, uninsulated cables, deep trench cave-ins</td>
                    <td className="p-3 text-slate-400">Kitchen grease exhaust fires, bio-cleaner spills, compactor jams</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-slate-300">Verified Equipment Skills</td>
                    <td className="p-3 text-slate-400">Potain 25T Tower Crane, Hydraulic CAT 320D, Arc Shielded Rig</td>
                    <td className="p-3 text-slate-400">Industrial Steam Boiler, Roots Scrubber-Dryer, FSSAI Hygiene</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-slate-300">Supervisor Governance</td>
                    <td className="p-3 text-slate-400">Rajesh Kumar (Civil Works In-Charge) — 3 Strikes Flagged</td>
                    <td className="p-3 text-slate-400">Murugesan P. (Facility Estate Head) — Conduct Audit Alert</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Prompt Wars Evaluation Compliance */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <h4 className="font-semibold text-white text-xs flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              Prompt Wars 2026 Submission Rules Compliance
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span><strong>Public GitHub Repo:</strong> Ends with <code>.git</code>, single branch, &lt; 10MB</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span><strong>Deployment:</strong> Multi-stage Dockerfile for Google Cloud Run (No Vercel/Netlify)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span><strong>Dual Interfaces:</strong> Worker Mobile Portal + Central Admin Operations</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span><strong>AI Rubric:</strong> Unit test suite included (<code className="text-cyan-400">npm test</code>)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition"
          >
            Close &amp; Return to Prototype
          </button>
        </div>
      </div>
    </div>
  );
}
