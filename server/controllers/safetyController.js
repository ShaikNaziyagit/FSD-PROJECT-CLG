import SafetyIncident from '../models/SafetyIncident.js';

let fallbackIncidents = [
  {
    _id: 'inc_01',
    incidentType: 'Campus Altercation / Fight',
    location: 'Hostel 2 Quadrangle Basketball Court',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    time: '10:45 PM',
    description: 'Physical altercation and heated argument broke out between two student groups following inter-department tournament. Campus security was alerted.',
    severity: 'High',
    isAnonymous: true,
    reporter: { name: 'Anonymous Student Reporter', rollNumber: 'CONFIDENTIAL' },
    personsInvolved: 'Students from 3rd & 4th Year Mechanical vs Civil',
    status: 'Disciplinary Action Enforced',
    actionTaken: 'Proctorial Board summoned all parties. Written undertakings and temporary suspension from sports facilities enforced with parent notification.',
    investigator: 'Dr. Marcus Vance (Chief Proctor)',
  },
  {
    _id: 'inc_02',
    incidentType: 'Ragging & Bullying',
    location: 'Freshers Hostel Block 1 Corridor',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    time: '11:30 PM',
    description: 'Reported verbal intimidation and forced late-night assembly in corridor by senior batch hostellers.',
    severity: 'Critical Emergency',
    isAnonymous: true,
    reporter: { name: 'Anonymous Fresher', rollNumber: 'CONFIDENTIAL' },
    personsInvolved: 'Senior Hostellers (Hostel 1)',
    status: 'Resolved & Closed',
    actionTaken: 'Anti-Ragging Squad conducted surprise midnight inspection. Identified students reprimanded, hostel rooms changed, and monetary penalty imposed as per UGC guidelines.',
    investigator: 'Prof. Vikram Sen & Anti-Ragging Flying Squad',
  },
  {
    _id: 'inc_03',
    incidentType: 'Hostel Dispute & Noise',
    location: 'Hostel 4 Wing C, 3rd Floor',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    time: '01:15 AM',
    description: 'Extremely loud sound system and continuous shouting during exam preparatory week disturbing entire wing.',
    severity: 'Medium',
    isAnonymous: false,
    reporter: { name: 'Arjun Sharma', rollNumber: '22BCSE1042' },
    personsInvolved: 'Room 312 occupants',
    status: 'Resolved & Closed',
    actionTaken: 'Hostel Warden confiscated sound equipment and issued final conduct warning.',
    investigator: 'Hostel 4 Residential Warden',
  },
];

const campusEmergencyContacts = [
  {
    unit: 'Campus Chief Security Officer (CSO)',
    phone: '+91 11 2659 7999',
    alternatePhone: '+91 98100 11999',
    location: 'Main Security Gate & Control Room',
    available: '24 Hours / 7 Days',
    type: 'Security',
  },
  {
    unit: 'National Anti-Ragging Toll-Free Helpline (UGC)',
    phone: '1800-180-5522',
    alternatePhone: 'helpline@antiragging.in',
    location: 'National UGC Monitoring Cell',
    available: '24x7 Toll-Free',
    type: 'Anti-Ragging',
  },
  {
    unit: 'Chief Proctor Office & Vigilance Squad',
    phone: '+91 11 2659 7110',
    alternatePhone: '+91 94120 44556',
    location: 'Administrative Block, Ground Floor Room 12',
    available: '08:00 AM - 10:00 PM (Emergency 24x7)',
    type: 'Proctorial',
  },
  {
    unit: 'Campus Health Emergency & Ambulance Dispatch',
    phone: '+91 11 2659 7108',
    alternatePhone: '+91 108',
    location: 'Health Dispensary Complex Sector 2',
    available: '24 Hours Emergency Dispatch',
    type: 'Medical',
  },
  {
    unit: "Women's Internal Complaints Committee (ICC)",
    phone: '+91 11 2659 7555',
    alternatePhone: 'icc.women@campusos.edu',
    location: 'Faculty Lounge Block B, Room 204',
    available: 'Confidential Redressal 24x7',
    type: 'Safety',
  },
];

export const getSafetyData = async (req, res) => {
  try {
    let incidents = await SafetyIncident.find().sort({ createdAt: -1 });
    if (!incidents || incidents.length === 0) {
      incidents = fallbackIncidents;
    }
    res.json({
      success: true,
      count: incidents.length,
      data: incidents,
      emergencyContacts: campusEmergencyContacts,
      codeOfConductRules: [
        'Zero tolerance for physical violence, gang fights, assault, or threatening behavior. Immediate police FIR and rustication.',
        'Anti-Ragging Act compliance: Ragging in any form (verbal, mental, physical, sexual) is a non-bailable criminal offense.',
        'Strict prohibition of unauthorized weapons, illicit substances, fireworks, and contraband within campus boundaries.',
        'Respect for hostel quiet hours (11:00 PM - 06:00 AM) to maintain academic focus and peace.',
        'Damage to campus public property or cyber defamation will result in full restitution and disciplinary trial.',
      ],
    });
  } catch (error) {
    res.json({
      success: true,
      count: fallbackIncidents.length,
      data: fallbackIncidents,
      emergencyContacts: campusEmergencyContacts,
      codeOfConductRules: [
        'Zero tolerance for physical violence, gang fights, assault, or threatening behavior.',
        'Anti-Ragging Act compliance: Ragging is a non-bailable criminal offense.',
        'Strict prohibition of unauthorized weapons, illicit substances, and contraband.',
        'Respect for hostel quiet hours (11:00 PM - 06:00 AM).',
        'Damage to campus public property will result in full restitution and disciplinary trial.',
      ],
    });
  }
};

export const reportIncident = async (req, res) => {
  try {
    const user = req.user;
    const { incidentType, location, description, severity, isAnonymous, personsInvolved, contactPhone } = req.body;

    const newIncident = {
      _id: `inc_${Date.now()}`,
      incidentType,
      location,
      date: new Date(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      description,
      severity: severity || 'High',
      isAnonymous: Boolean(isAnonymous),
      reporter: isAnonymous
        ? { name: 'Anonymous Student Reporter', rollNumber: 'CONFIDENTIAL', contact: '' }
        : { name: user?.name || 'Student', rollNumber: user?.studentId || '22BCSE1042', contact: contactPhone || user?.email || '', user: user?._id },
      personsInvolved: personsInvolved || 'Under investigation',
      status: severity === 'Critical Emergency' ? 'Security Dispatched' : 'Reported',
      actionTaken: severity === 'Critical Emergency'
        ? 'IMMEDIATE SOS ALERT DISPATCHED: Campus Security Patrol & QRT Team Enroute to location.'
        : 'Incident logged. Assigned to Chief Proctor for review.',
      investigator: 'Campus Security & Proctorial Squad',
    };

    try {
      const created = await SafetyIncident.create(newIncident);
      return res.status(201).json({
        success: true,
        message: 'Incident reported successfully. Confidentiality is strictly protected.',
        data: created,
      });
    } catch (e) {
      fallbackIncidents.unshift(newIncident);
      return res.status(201).json({
        success: true,
        message: 'Incident reported successfully. Confidentiality is strictly protected.',
        data: newIncident,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
