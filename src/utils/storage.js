// Reactive LocalStorage Persistence for FairShift Platform
import { SECTORS } from './mockData';

const STORAGE_KEY = 'fairshift_platform_data_v1';
const ACTIVE_SECTOR_KEY = 'fairshift_active_sector';
const ACTIVE_WORKER_KEY = 'fairshift_active_worker';
const ACTIVE_PERSONA_KEY = 'fairshift_active_persona';
const ACTIVE_LANG_KEY = 'fairshift_active_lang';

export function getInitialPlatformData() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.warn('Error reading from localStorage, initializing fresh data', e);
    }
  }

  // Deep clone initial sectors
  const initial = JSON.parse(JSON.stringify(SECTORS));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  return initial;
}

export function savePlatformData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  // Dispatch event for cross-component and cross-tab reactive updates
  window.dispatchEvent(new CustomEvent('fairshift_state_changed', { detail: data }));
}

export function resetPlatformData() {
  const initial = JSON.parse(JSON.stringify(SECTORS));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  window.dispatchEvent(new CustomEvent('fairshift_state_changed', { detail: initial }));
  return initial;
}

// Active Sector
export function getActiveSectorId() {
  return localStorage.getItem(ACTIVE_SECTOR_KEY) || 'CONSTRUCTION';
}

export function setActiveSectorId(sectorId) {
  localStorage.setItem(ACTIVE_SECTOR_KEY, sectorId);
  window.dispatchEvent(new CustomEvent('fairshift_sector_changed', { detail: sectorId }));
}

// Active Persona: 'worker' | 'admin'
export function getActivePersona() {
  return localStorage.getItem(ACTIVE_PERSONA_KEY) || 'worker';
}

export function setActivePersona(persona) {
  localStorage.setItem(ACTIVE_PERSONA_KEY, persona);
  window.dispatchEvent(new CustomEvent('fairshift_persona_changed', { detail: persona }));
}

// Active Worker ID
export function getActiveWorkerId(sectorKey = 'CONSTRUCTION') {
  const stored = localStorage.getItem(`${ACTIVE_WORKER_KEY}_${sectorKey}`);
  if (stored) return stored;
  return sectorKey === 'CONSTRUCTION' ? 'WRK-C101' : 'WRK-U201';
}

export function setActiveWorkerId(sectorKey, workerId) {
  localStorage.setItem(`${ACTIVE_WORKER_KEY}_${sectorKey}`, workerId);
  window.dispatchEvent(new CustomEvent('fairshift_worker_changed', { detail: { sectorKey, workerId } }));
}

// Active UI Language: 'en' | 'ta' | 'hi'
export function getActiveLanguage() {
  return localStorage.getItem(ACTIVE_LANG_KEY) || 'en';
}

export function setActiveLanguage(lang) {
  localStorage.setItem(ACTIVE_LANG_KEY, lang);
  window.dispatchEvent(new CustomEvent('fairshift_lang_changed', { detail: lang }));
}
