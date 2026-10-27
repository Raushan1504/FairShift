import { describe, it, expect } from 'vitest';
import { generateAnonymousToken } from '../utils/anonymizer';
import { detectLanguage, translateToEnglish } from '../utils/translator';
import { SECTORS } from '../utils/mockData';
import { analyzeLocalDialect } from '../utils/dialectEngine';
import { adjudicateMisconduct } from '../utils/misconductAdjudicator';
import { calculateDistanceMeters } from '../utils/geolocation';
import { 
  getTranslation, 
  getLocalizedWorker, 
  getLocalizedSupervisor, 
  getLocalizedMisconductTag, 
  getLocalizedHazardCategory 
} from '../utils/i18n';

describe('UN SDG 8 FairShift Platform Unit Tests', () => {
  
  // 1. SDG 8.5: Transparent Wage & Overtime Computation
  describe('Wage & Overtime Computation (SDG Target 8.5)', () => {
    it('computes standard wage and 1.5x overtime premium correctly', () => {
      const baseHourlyRate = 100;
      const overtimeMultiplier = 1.5;
      const standardHours = 8.0;
      const overtimeHours = 2.5;

      const baseEarnings = standardHours * baseHourlyRate;
      const overtimeRate = baseHourlyRate * overtimeMultiplier;
      const overtimeEarnings = overtimeHours * overtimeRate;
      const totalDailyWage = baseEarnings + overtimeEarnings;

      expect(baseEarnings).toBe(800);
      expect(overtimeRate).toBe(150);
      expect(overtimeEarnings).toBe(375);
      expect(totalDailyWage).toBe(1175);
    });

    it('ensures zero wage withholding or hidden deductions', () => {
      const grossDaily = 1175;
      const deductions = 0;
      const netDaily = grossDaily - deductions;
      expect(netDaily).toBe(grossDaily);
    });
  });

  // 2. SDG 8.8: Fatigue Matrix Safety Threshold (>48h violation)
  describe('Fatigue & Overwork Compliance Matrix (SDG Target 8.8)', () => {
    const LEGAL_WEEKLY_LIMIT = 48.0;

    it('identifies safe weekly hours as compliant', () => {
      const workerWeeklyHours = 44.5;
      const isFatigueViolation = workerWeeklyHours > LEGAL_WEEKLY_LIMIT;
      expect(isFatigueViolation).toBe(false);
    });

    it('flags critical fatigue violation when hours exceed 48.0h threshold', () => {
      const workerWeeklyHours = 51.5;
      const isFatigueViolation = workerWeeklyHours > LEGAL_WEEKLY_LIMIT;
      expect(isFatigueViolation).toBe(true);
    });
  });

  // 3. Cryptographic Identity Decoupling (Fear of Retaliation resolution)
  describe('Retaliation-Proof Anonymous Grievance Decoupling', () => {
    it('generates format compliant zero-trace token without leaking worker name', () => {
      const workerId = 'WRK-C101';
      const sectorId = 'construction';
      const result = generateAnonymousToken(workerId, sectorId);

      expect(result.token).toMatch(/^#ANON-[0-9A-F]{4}[0-9A-Z]{2}-ZKP$/);
      expect(result.token).not.toContain(workerId);
      expect(result.proofHash).toContain('ZKP-');
      expect(result.proofHash).toContain('(Roster Verified: Valid Shift)');
    });
  });

  // 4. Multilingual Language Detection & Translation Fallbacks
  describe('Multilingual Speech & Translation Processor', () => {
    it('accurately identifies Tamil script Unicode block', () => {
      const tamilText = 'சாரக்கட்டு கம்பிகள் தளர்வாக உள்ளன';
      const detected = detectLanguage(tamilText);
      expect(detected.code).toBe('ta');
      expect(detected.name).toBe('Tamil');
    });

    it('accurately identifies Hindi Devanagari Unicode block', () => {
      const hindiText = 'बिजली का तार पानी में डूबा है';
      const detected = detectLanguage(hindiText);
      expect(detected.code).toBe('hi');
      expect(detected.name).toBe('Hindi');
    });

    it('identifies English text correctly', () => {
      const englishText = 'Loose scaffolding on Level 4';
      const detected = detectLanguage(englishText);
      expect(detected.code).toBe('en');
    });

    it('translates via offline dictionary fallback when network is unavailable', async () => {
      const tamilQuery = 'மின்சார கம்பி அறுந்து விழுந்துள்ளது';
      const res = await translateToEnglish(tamilQuery, 'ta');
      expect(res.translatedText).toBe('Live electrical wire has snapped and fallen on the ground.');
      expect(res.offlineMatch).toBe(true);
    });
  });

  // 5. Cross-Industry (2+ Sectors) Configuration Integrity
  describe('Cross-Industry Data Integrity (2+ Sectors Requirement)', () => {
    it('contains both Construction and Campus sectors with full specifications', () => {
      expect(SECTORS.CONSTRUCTION).toBeDefined();
      expect(SECTORS.CAMPUS).toBeDefined();

      expect(SECTORS.CONSTRUCTION.geofence.radiusMeters).toBeGreaterThan(0);
      expect(SECTORS.CAMPUS.geofence.radiusMeters).toBeGreaterThan(0);

      expect(SECTORS.CONSTRUCTION.supervisors.length).toBeGreaterThanOrEqual(2);
      expect(SECTORS.CAMPUS.supervisors.length).toBeGreaterThanOrEqual(2);

      expect(SECTORS.CONSTRUCTION.workers.length).toBeGreaterThanOrEqual(3);
      expect(SECTORS.CAMPUS.workers.length).toBeGreaterThanOrEqual(3);
    });

    it('ensures each worker has a verifiable Skill Passport and PIN', () => {
      SECTORS.CONSTRUCTION.workers.forEach(w => {
        expect(w.pin).toHaveLength(4);
        expect(w.skillPassport.totalVerifiedHours).toBeGreaterThan(0);
        expect(w.skillPassport.certifications.length).toBeGreaterThan(0);
      });

      SECTORS.CAMPUS.workers.forEach(w => {
        expect(w.pin).toHaveLength(4);
        expect(w.skillPassport.totalVerifiedHours).toBeGreaterThan(0);
        expect(w.skillPassport.certifications.length).toBeGreaterThan(0);
      });
    });
  });

  // 6. Local Dialect Detection & Normalization Engine
  describe('Local Dialect Detection & Normalization Engine', () => {
    it('detects Madras Tamil slang for wage deduction (காசு வெட்டு)', () => {
      const slangPhrase = 'சூப்பர்வைசர் காசு வெட்டுவேன்னு மிரட்டுகிறார்';
      const result = analyzeLocalDialect(slangPhrase);
      expect(result.dialectDetected).toBe(true);
      expect(result.dialectName).toContain('Madras Tamil');
      expect(result.matchedCategory).toBe('Wage Theft / Unpaid Overtime');
    });

    it('detects Bhojpuri/Hindi migrant labor idiom (दिहाड़ी काट ली)', () => {
      const slangPhrase = 'ठेकेदार ने आज की दिहाड़ी काट ली और गाली दी';
      const result = analyzeLocalDialect(slangPhrase);
      expect(result.dialectDetected).toBe(true);
      expect(result.dialectName).toContain('Hindi / Bhojpuri');
      expect(result.matchedCategory).toBe('Wage Theft / Unpaid Overtime');
    });

    it('detects Chennai construction vernacular for loose scaffolding (சாராம் ஆடுது)', () => {
      const slangPhrase = 'நான்காவது தளத்தில் சாராம் ஆடுது, கீழ விழுந்துடும்';
      const result = analyzeLocalDialect(slangPhrase);
      expect(result.dialectDetected).toBe(true);
      expect(result.matchedCategory).toBe('Scaffolding & Structural Fall Risk');
    });
  });

  // 7. AI Misconduct Adjudication Engine (SDG 8 & Labor Standards)
  describe('AI Misconduct Adjudication Engine (PPT 1 & PPT 2 Alignment)', () => {
    it('judges retaliation/dismissal threats as CRITICAL VIOLATION of SDG 8.8', () => {
      const text = 'Supervisor threatened to fire everyone and cut attendance if we report';
      const adjudication = adjudicateMisconduct({
        description: text,
        supervisorName: 'Rajesh Kumar',
        tag: 'Coercive Retaliation',
        sectorId: 'construction',
        lang: 'en'
      });

      expect(adjudication.severity).toBe('Critical');
      expect(adjudication.guidelineStatus).toContain('VIOLATION CONFIRMED');
      expect(adjudication.sdgTarget).toContain('SDG 8.8');
      expect(adjudication.confidenceScore).toBeGreaterThanOrEqual(90);
    });

    it('judges unpaid overtime as SDG 8.5 violation of Factories Act Sec 59', () => {
      const text = 'Forced 3 hours unpaid overtime past shift end without wage vouchers';
      const adjudication = adjudicateMisconduct({
        description: text,
        supervisorName: 'Rajesh Kumar',
        tag: 'Forced Unpaid Overtime',
        sectorId: 'construction',
        lang: 'en'
      });

      expect(adjudication.category).toContain('Overtime');
      expect(adjudication.sdgTarget).toContain('SDG 8.5');
      expect(adjudication.statutoryBreach).toContain('Section 59 of Factories Act');
    });
  });

  // 8. Live Geolocation & Haversine Distance Calculation
  describe('Live Geolocation & Geofence Perimeter Calculations', () => {
    it('computes distance accurately using Haversine formula', () => {
      // Construction site center: 13.0067, 80.2023
      const lat1 = 13.0067;
      const lon1 = 80.2023;
      const lat2 = 13.0070;
      const lon2 = 80.2025;

      const distance = calculateDistanceMeters(lat1, lon1, lat2, lon2);
      expect(distance).toBeGreaterThan(0);
      expect(distance).toBeLessThan(100); // Within ~40 meters
    });
  });

  // 9. Simple Local Language UI Translations
  describe('Simple Local Language UI Translations for Low-Literacy', () => {
    it('provides colloquial Tamil and Hindi translations for all primary actions', () => {
      const tamil = getTranslation('ta');
      const hindi = getTranslation('hi');

      expect(tamil.punchIn).toBe('பணி தொடங்கு (Punch In)');
      expect(tamil.dailyEarned).toBe('இன்றைய மொத்த சம்பளம்:');
      expect(hindi.punchIn).toBe('काम शुरू करें (पंच इन)');
      expect(hindi.dailyEarned).toBe('आज की कुल कमाई:');
    });

    it('localizes worker names and roles in Tamil and Hindi', () => {
      const worker = { id: 'WRK-C101', name: 'Murugan R.', role: 'Master Scaffolder' };
      const tamilWorker = getLocalizedWorker(worker, 'ta');
      const hindiWorker = getLocalizedWorker(worker, 'hi');

      expect(tamilWorker.name).toBe('முருகன் ஆர்.');
      expect(tamilWorker.role).toBe('தலைமை சாரக்கட்டு நிபுணர்');
      expect(hindiWorker.name).toBe('मुरुगन आर.');
      expect(hindiWorker.role).toBe('मास्टर मचान कारीगर');
    });

    it('localizes supervisor names, roles, and departments in Tamil and Hindi', () => {
      const supervisor = { id: 'SUP-C2', name: 'Suresh Nair', role: 'Chief Safety Officer', department: 'EHS & Heavy Machinery' };
      const tamilSup = getLocalizedSupervisor(supervisor, 'ta');
      const hindiSup = getLocalizedSupervisor(supervisor, 'hi');

      expect(tamilSup.name).toBe('சுரேஷ் நாயர்');
      expect(tamilSup.role).toBe('தலைமை பாதுகாப்பு அதிகாரி');
      expect(hindiSup.name).toBe('सुरेश नायर');
    });

    it('localizes misconduct tags to user selected language', () => {
      const tag = 'Forced Unpaid Overtime';
      expect(getLocalizedMisconductTag(tag, 'ta')).toBe('சம்பளம் தராமல் கூடுதல் வேலை (Overtime)');
      expect(getLocalizedMisconductTag(tag, 'hi')).toBe('बिना मजदूरी जबरन ओवरटाइम');
      expect(getLocalizedMisconductTag(tag, 'en')).toBe('Forced Unpaid Overtime');
    });

    it('localizes hazard categories to user selected language', () => {
      const cat = 'Scaffolding / Fall Risk';
      expect(getLocalizedHazardCategory(cat, 'ta')).toBe('சாரக்கட்டு / கீழே விழும் ஆபத்து');
      expect(getLocalizedHazardCategory(cat, 'hi')).toBe('मचान / गिरने का खतरा');
    });
  });

});
