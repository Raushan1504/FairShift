import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Globe, 
  Volume2, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ChevronDown, 
  ChevronUp, 
  Send, 
  Sparkles,
  ShieldCheck,
  Filter
} from 'lucide-react';
import { speakAloud } from '../../utils/speech';

export function IncidentTriageQueue({
  hazards = [],
  onUpdateStatus
}) {
  const [expandedId, setExpandedId] = useState(null);
  const [filterSeverity, setFilterSeverity] = useState('ALL');

  const toggleExpand = (id) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  const handleSpeakTranscript = (text, lang) => {
    speakAloud(text, lang || 'en');
  };

  const filteredHazards = hazards.filter(h => {
    if (filterSeverity === 'ALL') return true;
    return h.severity === filterSeverity;
  });

  return (
    <div className="bg-slate-900 border border-slate-850 rounded-2xl p-5 shadow-xl space-y-4">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Multilingual Incident Triage Queue</h3>
              <p className="text-xs text-slate-400">Live stream with real-time translation for immediate supervisor dispatch</p>
            </div>
          </div>
        </div>

        {/* Severity Filter */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {['ALL', 'Critical', 'High', 'Moderate'].map((sev) => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              className={`px-2.5 py-1 rounded-lg font-medium transition ${
                filterSeverity === sev
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Tickets List */}
      <div className="space-y-3">
        {filteredHazards.length === 0 ? (
          <div className="p-8 text-center text-slate-500 bg-slate-950/50 rounded-xl border border-slate-800">
            No hazard incidents matching this filter.
          </div>
        ) : (
          filteredHazards.map((hazard) => {
            const isExpanded = expandedId === hazard.id;
            const isCritical = hazard.severity === 'Critical';

            return (
              <div 
                key={hazard.id}
                className={`rounded-xl border transition-all ${
                  isCritical 
                    ? 'border-red-500/40 bg-slate-900/90 shadow-md shadow-red-500/5' 
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-750'
                }`}
              >
                {/* Main Card Summary */}
                <div className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    
                    {/* Category & Status */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        hazard.severity === 'Critical' 
                          ? 'bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse'
                          : hazard.severity === 'High'
                            ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40'
                            : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40'
                      }`}>
                        {hazard.severity} Severity
                      </span>

                      <span className="font-semibold text-white text-xs">{hazard.category}</span>

                      <span className="text-[10px] text-slate-400 font-mono bg-slate-800 px-1.5 py-0.5 rounded">
                        {hazard.id}
                      </span>
                    </div>

                    {/* Status Badges & 1-Click Update */}
                    <div className="flex items-center gap-2">
                      <div className="flex rounded-lg bg-slate-950 p-1 border border-slate-800">
                        {['Open', 'In Progress', 'Resolved'].map((st) => (
                          <button
                            key={st}
                            onClick={() => onUpdateStatus(hazard.id, st)}
                            className={`px-2 py-0.5 rounded text-[10px] font-medium transition ${
                              hazard.status === st
                                ? st === 'Resolved' 
                                  ? 'bg-emerald-500 text-slate-950 font-bold' 
                                  : st === 'In Progress'
                                    ? 'bg-amber-500 text-slate-950 font-bold'
                                    : 'bg-red-500 text-white font-bold'
                                : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => toggleExpand(hazard.id)}
                        className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                        title={isExpanded ? 'Collapse audio transcript' : 'Expand original audio transcript'}
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>

                  </div>

                  {/* Auto-Translated English front-and-center */}
                  <div className="mt-3 p-3 rounded-xl bg-cyan-950/20 border border-cyan-800/30">
                    <div className="flex items-center justify-between text-[11px] text-cyan-400 mb-1">
                      <span className="font-semibold flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5" />
                        <span>🌐 Auto-Translated from {hazard.detectedLangName || 'Native Tongue'} for Dispatch:</span>
                      </span>
                      <span className="text-[10px] text-cyan-300 font-mono">Dispatch Immediate</span>
                    </div>
                    <p className="text-xs text-white leading-relaxed font-sans font-medium">
                      "{hazard.translatedText}"
                    </p>
                  </div>

                  {/* Metadata Row: Location, Time, Assigned */}
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-slate-300">
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        <span>{hazard.locationZone}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        <span>{new Date(hazard.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-slate-400 bg-slate-850 px-2 py-0.5 rounded border border-slate-750">
                        Assigned: {hazard.assignedTo}
                      </span>
                      <span className="text-slate-500 font-mono text-[10px]">{hazard.reporterToken}</span>
                    </div>
                  </div>
                </div>

                {/* Expandable Drawer: Raw Audio Transcript */}
                {isExpanded && (
                  <div className="border-t border-slate-800 bg-slate-950/70 p-4 space-y-3 animate-in fade-in duration-150">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Volume2 className="w-4 h-4 text-amber-400" />
                        <span className="text-xs font-semibold text-white">
                          Original Native Audio Voice Recording ({hazard.detectedLangName}):
                        </span>
                      </div>
                      <button
                        onClick={() => handleSpeakTranscript(hazard.originalText, hazard.detectedLang)}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-750 text-amber-300 border border-slate-700 flex items-center gap-1 transition"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Play Native Speech</span>
                      </button>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-amber-100 font-sans leading-relaxed">
                      "{hazard.originalText}"
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>Audio Captured Duration: ~{hazard.audioDurationSec || 6.2}s via Web Speech API</span>
                      <span>Cryptographic Reporter Token: {hazard.reporterToken}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
