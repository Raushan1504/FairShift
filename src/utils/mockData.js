// Comprehensive Seed Data for FairShift Decent Work & Safety Platform
// Aligned with UN SDG 8 (Decent Work & Economic Growth - Targets 8.5 & 8.8)

export const SECTORS = {
  CONSTRUCTION: {
    id: 'construction',
    name: 'Metro Rail Construction Site',
    shortName: 'Metro Rail Site',
    icon: 'HardHat',
    location: 'Chennai Metro Phase 2 - Corridor 4 (Guindy-Porur)',
    geofence: { lat: 13.0067, lng: 80.2023, radiusMeters: 350 },
    baseHourlyRate: 95, // INR
    overtimeMultiplier: 1.5,
    supervisors: [
      { id: 'SUP-C1', name: 'Rajesh Kumar', role: 'Site In-Charge (Civil Works)', department: 'Civil Infrastructure' },
      { id: 'SUP-C2', name: 'Suresh Nair', role: 'Chief Safety Officer', department: 'EHS & Heavy Machinery' },
      { id: 'SUP-C3', name: 'Karthik Raman', role: 'Structural Steel Supervisor', department: 'Structural Fabrication' },
    ],
    hazardCategories: [
      { id: 'scaffold', label: 'Scaffolding / Fall Risk', icon: 'AlertTriangle', color: 'text-amber-500 bg-amber-500/10 border-amber-500/30' },
      { id: 'electric', label: 'Electrical / Live Wire', icon: 'Zap', color: 'text-red-500 bg-red-500/10 border-red-500/30' },
      { id: 'ppe', label: 'Missing PPE Gear', icon: 'ShieldAlert', color: 'text-orange-500 bg-orange-500/10 border-orange-500/30' },
      { id: 'trench', label: 'Deep Trench Cave-In', icon: 'AlertOctagon', color: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30' },
      { id: 'crane', label: 'Crane Boom Blindspot', icon: 'Truck', color: 'text-purple-500 bg-purple-500/10 border-purple-500/30' },
    ],
    workers: [
      {
        id: 'WRK-C101',
        name: 'Murugan R.',
        pin: '1001',
        role: 'Master Scaffolder',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        phone: '+91 98401 23456',
        preferredLang: 'ta',
        hourlyRate: 110,
        weeklyHours: 44.5,
        shiftStatus: 'active', // active, punched_out
        punchInTime: new Date(Date.now() - 5.5 * 3600 * 1000).toISOString(),
        todayStandardHours: 5.5,
        todayOvertimeHours: 1.5,
        skillPassport: {
          totalVerifiedHours: 2840,
          verifiedMonths: 24,
          certifications: [
            { name: 'Scaffolding Safety Level-2 (BS 5973)', issuer: 'National Skill Development Corp (NSDC)', date: '2024-03-15', status: 'Verified' },
            { name: 'Working at Heights & Fall Arrest', issuer: 'Metro Rail EHS Board', date: '2025-01-10', status: 'Verified' },
            { name: 'Heavy Rigging & Slinging Ops', issuer: 'L&T Skill Academy', date: '2023-11-20', status: 'Verified' }
          ],
          complianceRating: '99.4%',
          zeroIncidentStreakDays: 312,
        }
      },
      {
        id: 'WRK-C102',
        name: 'Ramesh Patel',
        pin: '1002',
        role: 'Tower Crane Operator',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        phone: '+91 98250 87654',
        preferredLang: 'hi',
        hourlyRate: 140,
        weeklyHours: 51.5, // Exceeds 48h limit! Fatigue alert trigger
        shiftStatus: 'active',
        punchInTime: new Date(Date.now() - 9.0 * 3600 * 1000).toISOString(),
        todayStandardHours: 8.0,
        todayOvertimeHours: 2.5,
        consecutiveDays: 7,
        skillPassport: {
          totalVerifiedHours: 4120,
          verifiedMonths: 36,
          certifications: [
            { name: 'Heavy Tower Crane Grade-A (Potain 25T)', issuer: 'DGMS / MoL&E', date: '2023-05-12', status: 'Verified' },
            { name: 'High-Wind Operations Protocol', issuer: 'Metro Infrastructure Safety Council', date: '2024-08-01', status: 'Verified' }
          ],
          complianceRating: '98.8%',
          zeroIncidentStreakDays: 450,
        }
      },
      {
        id: 'WRK-C103',
        name: 'Arumugam K.',
        pin: '1003',
        role: 'Bar Bender & Welder',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
        phone: '+91 97910 11223',
        preferredLang: 'ta',
        hourlyRate: 95,
        weeklyHours: 38.0,
        shiftStatus: 'punched_out',
        punchInTime: null,
        todayStandardHours: 8.0,
        todayOvertimeHours: 0,
        skillPassport: {
          totalVerifiedHours: 1980,
          verifiedMonths: 18,
          certifications: [
            { name: 'Structural Rebar Fabrication (IS 1786)', issuer: 'Govt Industrial Training Institute (ITI)', date: '2024-02-14', status: 'Verified' },
            { name: 'Arc & Gas Shielded Welding', issuer: 'National Apprenticeship Scheme', date: '2023-09-10', status: 'Verified' }
          ],
          complianceRating: '97.5%',
          zeroIncidentStreakDays: 195,
        }
      },
      {
        id: 'WRK-C104',
        name: 'Sunil Verma',
        pin: '1004',
        role: 'Heavy Earthmover Driver',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
        phone: '+91 94150 99887',
        preferredLang: 'hi',
        hourlyRate: 125,
        weeklyHours: 53.0, // Critical fatigue!
        shiftStatus: 'active',
        punchInTime: new Date(Date.now() - 7.0 * 3600 * 1000).toISOString(),
        todayStandardHours: 7.0,
        todayOvertimeHours: 2.0,
        consecutiveDays: 8,
        skillPassport: {
          totalVerifiedHours: 3500,
          verifiedMonths: 30,
          certifications: [
            { name: 'Hydraulic Excavator (CAT 320D) Licensure', issuer: 'Automotive Skills Development Council', date: '2023-04-18', status: 'Verified' }
          ],
          complianceRating: '96.9%',
          zeroIncidentStreakDays: 240,
        }
      }
    ],
    initialHazards: [
      {
        id: 'HAZ-C001',
        category: 'Scaffolding / Fall Risk',
        severity: 'Critical',
        originalText: 'நான்காவது தளத்தில் சாரக்கட்டு கம்பிகள் தளர்வாக உள்ளன, பாதுகாப்பு வலை கிழிக்கப்பட்டுள்ளது.',
        detectedLang: 'ta',
        detectedLangName: 'Tamil',
        translatedText: 'On the fourth floor, the scaffolding pipes are loose and the safety catch-net is torn.',
        locationZone: 'Pier 42 - South Concourse',
        timestamp: new Date(Date.now() - 28 * 60 * 1000).toISOString(),
        status: 'In Progress', // Open, In Progress, Resolved
        reporterToken: '#ANON-7B14-ZKP',
        assignedTo: 'Rajesh Kumar (Site In-Charge)',
        audioDurationSec: 6.4
      },
      {
        id: 'HAZ-C002',
        category: 'Electrical / Live Wire',
        severity: 'High',
        originalText: 'पिलर 38 के पास पानी भरा है और जनरेटर की नंगी तार पानी में डूबी है। किसी को भी करंट लग सकता है।',
        detectedLang: 'hi',
        detectedLangName: 'Hindi',
        translatedText: 'Near Pillar 38, water is stagnant and an uninsulated generator cable is submerged in it. High electrocution danger.',
        locationZone: 'Trench Zone B - Substation Yard',
        timestamp: new Date(Date.now() - 72 * 60 * 1000).toISOString(),
        status: 'Open',
        reporterToken: '#ANON-4E89-ZKP',
        assignedTo: 'Suresh Nair (EHS)',
        audioDurationSec: 8.2
      },
      {
        id: 'HAZ-C003',
        category: 'Missing PPE Gear',
        severity: 'Moderate',
        originalText: 'Steel welding team was not provided shaded face shields; working with broken sunglasses.',
        detectedLang: 'en',
        detectedLangName: 'English',
        translatedText: 'Steel welding team was not provided shaded face shields; working with broken sunglasses.',
        locationZone: 'Girder Fabrication Shed 3',
        timestamp: new Date(Date.now() - 190 * 60 * 1000).toISOString(),
        status: 'Resolved',
        reporterToken: '#ANON-9A21-ZKP',
        assignedTo: 'Karthik Raman (Steel Lead)',
        resolutionNotes: 'Dispatched 6 certified DIN 11 auto-darkening welding helmets at 09:30 AM.',
        audioDurationSec: 5.1
      }
    ],
    initialGrievances: [
      {
        id: 'GRV-C201',
        token: '#ANON-8F92-ZKP',
        supervisorId: 'SUP-C1',
        supervisorName: 'Rajesh Kumar',
        tag: 'Forced Unpaid Overtime',
        severity: 'High',
        description: 'Supervisor Rajesh forced the whole pier 42 gang to stay back 3 hours past 7 PM and explicitly threatened that if we ask for overtime voucher, our names will be cut from tomorrow attendance register.',
        timestamp: new Date(Date.now() - 140 * 60 * 1000).toISOString(),
        status: 'Investigating',
        verifiedWorkerProof: 'SHA256: 8f92e...b31 (Active On-Site Staff Verified)',
        hrActionTaken: 'Shift supervisor logs requisitioned by Central HR. Clock-in timestamp delta matched.',
        aiAdjudication: {
          category: 'Forced Unpaid Overtime & Wage Theft',
          severity: 'High',
          guidelineStatus: '🚨 VIOLATION CONFIRMED',
          sdgTarget: 'UN SDG 8.5 (Decent Work & Remuneration)',
          statutoryBreach: 'Section 59 of Factories Act 1948 (Mandatory Overtime Pay)',
          verdictSummary: 'REMUNERATION VIOLATION: Unpaid overtime violates SDG Target 8.5 and statutory wage calculations. Matches Prompt Wars Core Pain Point #1 (Opaque Pay).',
          confidenceScore: 96
        }
      },
      {
        id: 'GRV-C202',
        token: '#ANON-1B33-ZKP',
        supervisorId: 'SUP-C1',
        supervisorName: 'Rajesh Kumar',
        tag: 'Verbal Abuse / Harassment',
        severity: 'High',
        description: 'Used vulgar language against helper workers from Bihar when pouring concrete mix took 10 minutes longer due to pump choking.',
        timestamp: new Date(Date.now() - 360 * 60 * 1000).toISOString(),
        status: 'Investigating',
        verifiedWorkerProof: 'SHA256: 1b33f...98a (Active On-Site Staff Verified)',
        hrActionTaken: 'Incident combined with Grievance #ANON-8F92 under Supervisor Conduct Audit Protocol.',
        aiAdjudication: {
          category: 'Verbal Abuse & Dignity Violation',
          severity: 'High',
          guidelineStatus: '🚨 VIOLATION CONFIRMED',
          sdgTarget: 'UN SDG 8.8 (Dignity at Work)',
          statutoryBreach: 'Workplace Code of Conduct & Dignity of Labor Protections',
          verdictSummary: 'CONDUCT INFRACTION: Abusive verbal conduct degrades workplace safety and directly correlates with high workforce attrition.',
          confidenceScore: 94
        }
      },
      {
        id: 'GRV-C203',
        token: '#ANON-6C40-ZKP',
        supervisorId: 'SUP-C1',
        supervisorName: 'Rajesh Kumar',
        tag: 'Safety Gear Denial',
        severity: 'Critical',
        description: 'Told workers who requested safety harness replacements to "stop acting like princesses and climb with ropes or get replaced by day laborers".',
        timestamp: new Date(Date.now() - 520 * 60 * 1000).toISOString(),
        status: 'Escalated to Director',
        verifiedWorkerProof: 'SHA256: 6c40a...421 (Active On-Site Staff Verified)',
        hrActionTaken: 'CRITICAL AUDIT: 3rd strike against Supervisor Rajesh Kumar. High attrition flag active.',
        aiAdjudication: {
          category: 'Safety Gear (PPE) Denial & Endangerment',
          severity: 'Critical',
          guidelineStatus: '🚨 VIOLATION CONFIRMED',
          sdgTarget: 'UN SDG 8.8 (Safe & Secure Working Environments)',
          statutoryBreach: 'Section 21 & 41 of Factories Act 1948 (Mandatory Personal Protective Equipment)',
          verdictSummary: 'SAFETY COMPLIANCE BREACH: Refusal to supply mandatory PPE gear violates statutory safety minimums. High probability of site injury.',
          confidenceScore: 98
        }
      }
    ]
  },

  CAMPUS: {
    id: 'campus',
    name: 'Campus Support & Facility Operations',
    shortName: 'Campus Facility Ops',
    icon: 'GraduationCap',
    location: 'SRMIST KTR Campus - Tech Park & Hostel Dining Complex',
    geofence: { lat: 12.8231, lng: 80.0442, radiusMeters: 500 },
    baseHourlyRate: 75, // INR
    overtimeMultiplier: 1.5,
    supervisors: [
      { id: 'SUP-U1', name: 'Murugesan P.', role: 'Facility & Hostel Estate Head', department: 'Campus Estate Ops' },
      { id: 'SUP-U2', name: 'Anitha Krishnan', role: 'Chief Sanitation Superintendent', department: 'Hygiene & Housekeeping' },
      { id: 'SUP-U3', name: 'Dr. S. Venkatesh', role: 'Campus Infrastructure Director', department: 'Student Welfare & Admin' },
    ],
    hazardCategories: [
      { id: 'kitchen', label: 'Kitchen Exhaust Fire Risk', icon: 'Flame', color: 'text-red-500 bg-red-500/10 border-red-500/30' },
      { id: 'chemical', label: 'Chemical / Bio-cleaner Spill', icon: 'Biohazard', color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30' },
      { id: 'slip', label: 'Wet Walkway Slip Hazard', icon: 'Footprints', color: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/30' },
      { id: 'transformer', label: 'High-Tension Sparking', icon: 'Zap', color: 'text-amber-500 bg-amber-500/10 border-amber-500/30' },
      { id: 'waste', label: 'Bio-waste Compactor Jam', icon: 'Trash2', color: 'text-purple-500 bg-purple-500/10 border-purple-500/30' },
    ],
    workers: [
      {
        id: 'WRK-U201',
        name: 'Lakshmi S.',
        pin: '2001',
        role: 'Hostel Mess Head Cook',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
        phone: '+91 94440 33445',
        preferredLang: 'ta',
        hourlyRate: 90,
        weeklyHours: 42.0,
        shiftStatus: 'active',
        punchInTime: new Date(Date.now() - 4.5 * 3600 * 1000).toISOString(),
        todayStandardHours: 4.5,
        todayOvertimeHours: 0.5,
        skillPassport: {
          totalVerifiedHours: 3200,
          verifiedMonths: 30,
          certifications: [
            { name: 'Commercial Culinary Hygiene & FSSAI Standards', issuer: 'Food Safety and Standards Authority of India', date: '2024-01-20', status: 'Verified' },
            { name: 'Industrial Steam Boiler Operations', issuer: 'National Productivity Council', date: '2023-08-11', status: 'Verified' },
            { name: 'First Aid & Burn Treatment Protocol', issuer: 'Indian Red Cross Society', date: '2024-09-05', status: 'Verified' }
          ],
          complianceRating: '99.8%',
          zeroIncidentStreakDays: 520,
        }
      },
      {
        id: 'WRK-U202',
        name: 'Devi M.',
        pin: '2002',
        role: 'Sanitation Lead & Housekeeping',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        phone: '+91 98840 99881',
        preferredLang: 'ta',
        hourlyRate: 75,
        weeklyHours: 49.5, // Fatigue breach >48 hrs!
        shiftStatus: 'active',
        punchInTime: new Date(Date.now() - 8.5 * 3600 * 1000).toISOString(),
        todayStandardHours: 8.0,
        todayOvertimeHours: 2.0,
        consecutiveDays: 7,
        skillPassport: {
          totalVerifiedHours: 2150,
          verifiedMonths: 22,
          certifications: [
            { name: 'Hospital-Grade Chemical Disinfection', issuer: 'Clean India Skill Council', date: '2024-04-12', status: 'Verified' },
            { name: 'Automated Ride-on Scrubber Maintenance', issuer: 'Roots Multiclean Ltd', date: '2023-10-18', status: 'Verified' }
          ],
          complianceRating: '98.5%',
          zeroIncidentStreakDays: 310,
        }
      },
      {
        id: 'WRK-U203',
        name: 'Santosh Kumar',
        pin: '2003',
        role: 'Campus Electrical Maintenance',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
        phone: '+91 97110 55443',
        preferredLang: 'hi',
        hourlyRate: 105,
        weeklyHours: 36.0,
        shiftStatus: 'punched_out',
        punchInTime: null,
        todayStandardHours: 8.0,
        todayOvertimeHours: 0,
        skillPassport: {
          totalVerifiedHours: 3800,
          verifiedMonths: 34,
          certifications: [
            { name: 'High-Tension Substation Certified Wireman', issuer: 'Central Electricity Authority (CEA)', date: '2023-06-25', status: 'Verified' },
            { name: 'Solar PV Inverter Maintenance', issuer: 'Skill Council for Green Jobs', date: '2024-07-19', status: 'Verified' }
          ],
          complianceRating: '99.1%',
          zeroIncidentStreakDays: 410,
        }
      },
      {
        id: 'WRK-U204',
        name: 'Pooja Sharma',
        pin: '2004',
        role: 'Waste Management Specialist',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
        phone: '+91 91234 56789',
        preferredLang: 'hi',
        hourlyRate: 80,
        weeklyHours: 52.0, // Fatigue alert!
        shiftStatus: 'active',
        punchInTime: new Date(Date.now() - 9.0 * 3600 * 1000).toISOString(),
        todayStandardHours: 8.0,
        todayOvertimeHours: 2.5,
        consecutiveDays: 8,
        skillPassport: {
          totalVerifiedHours: 1900,
          verifiedMonths: 19,
          certifications: [
            { name: 'Hazardous & E-Waste Segregation (CPCB)', issuer: 'National Green Tribunal Training', date: '2024-02-28', status: 'Verified' }
          ],
          complianceRating: '97.2%',
          zeroIncidentStreakDays: 180,
        }
      }
    ],
    initialHazards: [
      {
        id: 'HAZ-U001',
        category: 'Kitchen Exhaust Fire Risk',
        severity: 'Critical',
        originalText: 'ஹாஸ்டல் மெஸ் சமையலறையில் எண்ணெய் புகை வெளியேற்றும் குழாயில் தீப்பொறி தெறிக்கிறது, உடனடியாக சரிசெய்ய வேண்டும்.',
        detectedLang: 'ta',
        detectedLangName: 'Tamil',
        translatedText: 'Sparks are flying from the oil grease exhaust duct in the hostel mess kitchen; immediate repair needed before dinner shift.',
        locationZone: 'Central Dining Hall B - Main Range',
        timestamp: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
        status: 'In Progress',
        reporterToken: '#ANON-3C18-ZKP',
        assignedTo: 'Murugesan P. (Facility Head)',
        audioDurationSec: 7.1
      },
      {
        id: 'HAZ-U002',
        category: 'Chemical / Bio-cleaner Spill',
        severity: 'High',
        originalText: 'बायो-केमिकल फर्श क्लीनर की दो केन टेक पार्क बेसमेंट में गिरकर टूट गई हैं। तीखी गंध से सांस लेने में तकलीफ हो रही है।',
        detectedLang: 'hi',
        detectedLangName: 'Hindi',
        translatedText: 'Two cans of concentrated bio-chemical floor sanitizer dropped and cracked in Tech Park basement. Strong choking fumes causing breathing distress.',
        locationZone: 'Tech Park Basement - Service Corridor 2',
        timestamp: new Date(Date.now() - 85 * 60 * 1000).toISOString(),
        status: 'Open',
        reporterToken: '#ANON-5A90-ZKP',
        assignedTo: 'Anitha Krishnan (Sanitation Head)',
        audioDurationSec: 9.0
      },
      {
        id: 'HAZ-U003',
        category: 'Wet Walkway Slip Hazard',
        severity: 'Moderate',
        originalText: 'Drainage overflow near Main Audi walkway has caused moss buildup. Students and elderly night sweepers slipping constantly.',
        detectedLang: 'en',
        detectedLangName: 'English',
        translatedText: 'Drainage overflow near Main Audi walkway has caused moss buildup. Students and elderly night sweepers slipping constantly.',
        locationZone: 'Auditorium North Walkway',
        timestamp: new Date(Date.now() - 210 * 60 * 1000).toISOString(),
        status: 'Resolved',
        reporterToken: '#ANON-2D77-ZKP',
        assignedTo: 'Murugesan P. (Facility Head)',
        resolutionNotes: 'Pressure-washed moss and deployed anti-skid rubber mats.',
        audioDurationSec: 6.0
      }
    ],
    initialGrievances: [
      {
        id: 'GRV-U301',
        token: '#ANON-9F12-ZKP',
        supervisorId: 'SUP-U1',
        supervisorName: 'Murugesan P.',
        tag: 'Forced Unpaid Overtime',
        severity: 'High',
        description: 'Facility supervisor Murugesan ordered 4 night sweepers to clean up the VIP convocation hall until 2:30 AM without recording overtime or providing safe night transport back to their village.',
        timestamp: new Date(Date.now() - 95 * 60 * 1000).toISOString(),
        status: 'Investigating',
        verifiedWorkerProof: 'SHA256: 9f12d...aa1 (Active On-Site Staff Verified)',
        hrActionTaken: 'Hostel estate night logs requested. Cab allowance review in progress.',
        aiAdjudication: {
          category: 'Forced Unpaid Overtime & Wage Theft',
          severity: 'High',
          guidelineStatus: '🚨 VIOLATION CONFIRMED',
          sdgTarget: 'UN SDG 8.5 (Equal Pay & Decent Hours)',
          statutoryBreach: 'Factories Act 1948 Sec 51 & Night Work Safety Regulations',
          verdictSummary: 'OVERTIME VIOLATION: Forced night work without transport or overtime recording is an acute labor rights breach.',
          confidenceScore: 97
        }
      },
      {
        id: 'GRV-U302',
        token: '#ANON-4D88-ZKP',
        supervisorId: 'SUP-U1',
        supervisorName: 'Murugesan P.',
        tag: 'Safety Gear Denial',
        severity: 'High',
        description: 'Refused heavy nitrile gloves to mess cleaning staff handling commercial caustic soda, stating budget has run out for this quarter.',
        timestamp: new Date(Date.now() - 280 * 60 * 1000).toISOString(),
        status: 'Investigating',
        verifiedWorkerProof: 'SHA256: 4d88e...512 (Active On-Site Staff Verified)',
        hrActionTaken: 'Emergency requisition of 50 pairs industrial nitrile gloves approved.',
        aiAdjudication: {
          category: 'Safety Gear (PPE) Denial & Endangerment',
          severity: 'Critical',
          guidelineStatus: '🚨 VIOLATION CONFIRMED',
          sdgTarget: 'UN SDG 8.8 (Safe & Secure Working Environments)',
          statutoryBreach: 'Chemical Handling & Hazard Communication Standard (OSHA & CPCB)',
          verdictSummary: 'CHEMICAL HAZARD ENDANGERMENT: Caustic soda contact without nitrile barriers causes chemical skin burns. Severe employer liability.',
          confidenceScore: 99
        }
      },
      {
        id: 'GRV-U303',
        token: '#ANON-7A39-ZKP',
        supervisorId: 'SUP-U1',
        supervisorName: 'Murugesan P.',
        tag: 'Wage Deductions / Threat',
        severity: 'Critical',
        description: 'Threatened to cut 2 days salary if cooks take water breaks during the 12 PM - 3 PM lunch rush while kitchen temperatures exceeded 44°C.',
        timestamp: new Date(Date.now() - 440 * 60 * 1000).toISOString(),
        status: 'Escalated to Director',
        verifiedWorkerProof: 'SHA256: 7a39c...672 (Active On-Site Staff Verified)',
        hrActionTaken: '3rd consecutive complaint logged against Murugesan P. Direct HR inquiry opened.',
        aiAdjudication: {
          category: 'Coercive Retaliation & Intimidation',
          severity: 'Critical',
          guidelineStatus: '🚨 VIOLATION CONFIRMED',
          sdgTarget: 'UN SDG 8.5 & 8.8 (Heat Stress Safety & Fair Pay)',
          statutoryBreach: 'Dignity of Labor & Thermal Stress Safety Thresholds',
          verdictSummary: 'HEAT STRESS VIOLATION: Denial of hydration in extreme ambient heat (>44°C) with wage cut intimidation triggers immediate administrative sanction.',
          confidenceScore: 98
        }
      }
    ]
  }
};
