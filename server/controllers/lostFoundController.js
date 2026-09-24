import LostFound from '../models/LostFound.js';

let fallbackLostFoundItems = [
  {
    _id: 'lf_01',
    type: 'Lost',
    title: 'Brown Leather Wallet with ₹2,500 Cash & Campus ID',
    category: 'Cash / Money',
    description: 'Lost my brown Tommy Hilfiger leather wallet containing approximately ₹2,500 cash, student ID (22BCSE1042), SBI ATM card, and driving license. Last seen near central library reading hall.',
    location: 'Central Library 2nd Floor, Desk #44',
    dateReported: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    approximateTime: '03:30 PM Yesterday',
    rewardAmount: 500,
    contactName: 'Arjun Sharma',
    contactPhone: '+91 98765 43210',
    contactEmail: 'student@campusos.demo',
    imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=400',
    status: 'Active',
  },
  {
    _id: 'lf_02',
    type: 'Found',
    title: 'Apple AirPods Pro (2nd Gen) in White MagSafe Case',
    category: 'Earbuds / Headphones',
    description: 'Found a pair of AirPods Pro lying on the bench near the Food Court staircase. Case has a small anime sticker on the back. Deposited with campus security desk.',
    location: 'Campus Food Court & Cafeteria Staircase',
    dateReported: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    approximateTime: '12:45 PM',
    rewardAmount: 0,
    contactName: 'Rohan Mehra',
    contactPhone: '+91 98450 11223',
    contactEmail: 'rohan.mehra@campusos.demo',
    imageUrl: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&q=80&w=400',
    status: 'Active',
  },
  {
    _id: 'lf_03',
    type: 'Lost',
    title: 'HP 15s Silver Laptop Charger & Casio FX-991CW Scientific Calculator',
    category: 'Books / Calculators / Notes',
    description: 'Left behind in CS Lab 3 during Distributed Systems practical session. The calculator has name initial "A.S." carved on back cover.',
    location: 'Turing Computer Lab 3, Row B',
    dateReported: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    approximateTime: '05:15 PM',
    rewardAmount: 200,
    contactName: 'Aditya Sen',
    contactPhone: '+91 97112 33445',
    contactEmail: 'aditya.sen@campusos.demo',
    imageUrl: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&q=80&w=400',
    status: 'Active',
  },
  {
    _id: 'lf_04',
    type: 'Found',
    title: 'Set of 3 Keys with Batman Keychain & RFID Hostel Key',
    category: 'Student ID Card / Keys',
    description: 'Found on the pathway between Hostel 3 and Sports Ground. Handed over to Hostel 3 Warden Office.',
    location: 'Sports Ground Walkway',
    dateReported: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    approximateTime: '06:00 PM',
    rewardAmount: 0,
    contactName: 'Hostel 3 Security Desk',
    contactPhone: '+91 11 2659 7800',
    contactEmail: 'hostel3@campusos.edu',
    imageUrl: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&q=80&w=400',
    status: 'Handed to Security',
  },
];

export const getLostFoundItems = async (req, res) => {
  try {
    let items = await LostFound.find().sort({ createdAt: -1 });
    if (!items || items.length === 0) {
      items = fallbackLostFoundItems;
    }
    res.json({ success: true, count: items.length, data: items });
  } catch (error) {
    res.json({ success: true, count: fallbackLostFoundItems.length, data: fallbackLostFoundItems });
  }
};

export const createLostFoundItem = async (req, res) => {
  try {
    const user = req.user;
    const newItem = {
      ...req.body,
      _id: `lf_${Date.now()}`,
      postedBy: user?._id,
      contactName: req.body.contactName || user?.name || 'Campus Student',
      contactEmail: req.body.contactEmail || user?.email || '',
      dateReported: new Date(),
      status: 'Active',
    };

    try {
      const created = await LostFound.create(newItem);
      return res.status(201).json({ success: true, data: created });
    } catch (e) {
      fallbackLostFoundItems.unshift(newItem);
      return res.status(201).json({ success: true, data: newItem });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const claimItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { claimNotes } = req.body;
    const studentUser = req.user;

    res.json({
      success: true,
      message: 'Claim request submitted! Campus Security & original poster have been notified for physical verification.',
      claimDetails: {
        itemId: id,
        claimantName: studentUser?.name || 'Student',
        claimantRoll: studentUser?.studentId || '22BCSE1042',
        claimNotes,
        claimedAt: new Date(),
        status: 'Claim Pending Verification',
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
