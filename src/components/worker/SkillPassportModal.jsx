import React from 'react';
import { 
  X, 
  Award, 
  CheckCircle2, 
  QrCode, 
  Clock, 
  ShieldCheck, 
  Download, 
  ExternalLink, 
  Share2,
  Calendar,
  Sparkles
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { getTranslation } from '../../utils/i18n';

export function SkillPassportModal({
  isOpen,
  onClose,
  worker,
  currentSector,
  currentLang = 'en'
}) {
  const t = getTranslation(currentLang);
  if (!isOpen || !worker) return null;

  const passport = worker.skillPassport || {
    totalVerifiedHours: 2400,
    verifiedMonths: 20,
    certifications: [],
    complianceRating: '99.0%',
    zeroIncidentStreakDays: 250
  };

  // QR verification payload (Simulated portable W3C Verifiable Credential)
  const qrPayload = JSON.stringify({
    schema: 'https://fairshift.org/credentials/skill-passport/v1',
    workerId: worker.id,
    holderName: worker.name,
    verifiedHours: passport.totalVerifiedHours,
    activeSector: currentSector?.name,
    role: worker.role,
    certCount: passport.certifications.length,
    complianceScore: passport.complianceRating,
    issuedBy: 'FairShift Decentralized Work Ledger (UN SDG 8.5)'
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 my-auto">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-amber-950/20 to-slate-900 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-base">{t.passportTitle}</h3>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
                  SDG 8.5
                </span>
              </div>
              <p className="text-xs text-slate-400">{t.passportSub}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Passport Body */}
        <div className="p-4 sm:p-5 space-y-4 max-h-[80vh] overflow-y-auto">
          
          {/* Worker Identity Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-850 to-slate-900 border border-slate-750 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={worker.avatar}
                alt={worker.name}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-400 shadow-md"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-white text-base">{worker.name}</h4>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-xs text-amber-400 font-medium">{worker.role}</p>
                <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400 font-mono">
                  <span>ID: {worker.id}</span>
                  <span>•</span>
                  <span>{currentSector?.shortName}</span>
                </div>
              </div>
            </div>

            <div className="hidden sm:block text-right">
              <div className="text-[10px] text-slate-400">Compliance Score</div>
              <div className="text-xl font-black text-emerald-400 font-mono">{passport.complianceRating}</div>
            </div>
          </div>

          {/* Core Metrics: Hours, Months, Incident-Free Streak */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">{t.totalHours}</span>
              <span className="text-xl font-black text-white font-mono">{passport.totalVerifiedHours.toLocaleString()}</span>
              <span className="text-[10px] text-emerald-400 block mt-0.5">Verified</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">{t.tenure}</span>
              <span className="text-xl font-black text-amber-400 font-mono">{passport.verifiedMonths}m</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Active Service</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">{t.zeroIncident}</span>
              <span className="text-xl font-black text-cyan-400 font-mono">{passport.zeroIncidentStreakDays}d</span>
              <span className="text-[10px] text-cyan-400/80 block mt-0.5">Safe Days</span>
            </div>
          </div>

          {/* Scannable Portable QR Code */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="p-2.5 bg-white rounded-xl shadow-lg shrink-0">
              <QRCodeSVG
                value={qrPayload}
                size={110}
                level="M"
                includeMargin={false}
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 justify-center sm:justify-start text-xs font-bold text-white">
                <QrCode className="w-4 h-4 text-amber-400" />
                <span>{t.instantQrTransfer}</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {t.qrTransferDesc}
              </p>
              <div className="text-[10px] text-emerald-400 font-mono pt-1">
                Hash: SHA256-SKILL-{worker.id.slice(-4)}-{passport.totalVerifiedHours}H
              </div>
            </div>
          </div>

          {/* Machinery & Equipment Competency List */}
          <div>
            <h5 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>{t.verifiedCerts}</span>
              <span className="text-[10px] text-amber-400 font-normal">NSDC / ITI Accredited</span>
            </h5>
            <div className="space-y-2">
              {passport.certifications.map((cert, idx) => (
                <div 
                  key={idx}
                  className="p-3 rounded-xl bg-slate-800/60 border border-slate-750 flex items-start justify-between gap-2"
                >
                  <div className="space-y-0.5">
                    <div className="font-semibold text-white text-xs flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{cert.name}</span>
                    </div>
                    <p className="text-[11px] text-slate-400">{cert.issuer}</p>
                    <p className="text-[10px] text-slate-500 font-mono">Issued: {cert.date}</p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-medium shrink-0">
                    {cert.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Security Note */}
          <div className="text-center text-[10px] text-slate-500 pt-2">
            Protected against forge attacks. Anchored to FairShift Decentralized Work Ledger.
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-white font-medium text-xs transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
