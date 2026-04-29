export const voters = [
  {
    voterId: 'ABC1234567',
    name: 'Rajesh Kumar',
    age: 35,
    gender: 'Male',
    assemblyConstituency: 'Delhi-42',
    pollingStation: 'Govt. Senior Secondary School',
    partNo: '123',
    sectionNo: '4',
    address: 'H.No. 45, Sector-15, Rohini',
    verified: false,
    location: { type: 'Point', coordinates: [77.0575, 28.7307] }
  },
  {
    voterId: 'DEF9876543',
    name: 'Priya Sharma',
    age: 28,
    gender: 'Female',
    assemblyConstituency: 'Delhi-42',
    pollingStation: 'Govt. Senior Secondary School',
    partNo: '124',
    sectionNo: '2',
    address: 'H.No. 78, Sector-15, Rohini',
    verified: false,
    location: { type: 'Point', coordinates: [77.0570, 28.7300] }
  },
  {
    voterId: 'GHI4567890',
    name: 'Amit Patel',
    age: 42,
    gender: 'Male',
    assemblyConstituency: 'Delhi-42',
    pollingStation: 'Community Center',
    partNo: '125',
    sectionNo: '1',
    address: 'H.No. 12, Sector-16, Rohini',
    verified: false,
    location: { type: 'Point', coordinates: [77.0580, 28.7310] }
  }
];

export const booths = [
  {
    id: 'booth1',
    name: 'Govt. Senior Secondary School',
    address: 'Sector-15, Rohini, Delhi',
    constituency: 'Delhi-42',
    partNo: '123',
    location: { type: 'Point', coordinates: [77.0575, 28.7307] },
    facilities: { ramp: true, drinkingWater: true, shade: true, electricity: true },
    bloName: 'Ramesh Verma',
    bloPhone: '+91-9876543210',
    isActive: true
  },
  {
    id: 'booth2',
    name: 'Mumbai Central Community Hall',
    address: 'Dadar West, Mumbai, Maharashtra',
    constituency: 'Mumbai South Central',
    partNo: '45',
    location: { type: 'Point', coordinates: [72.8426, 19.0176] },
    facilities: { ramp: true, drinkingWater: true, electricity: true, toilet: true },
    bloName: 'Prakash Patil',
    bloPhone: '+91-9876543211',
    isActive: true
  }
];

export const notifications = [
  {
    id: '1',
    title: 'Delhi Municipal Elections 2026',
    body: 'Polling scheduled for Phase 1 on May 15, 2026.',
    type: 'election_update',
    createdAt: new Date().toISOString(),
    read: false
  },
  {
    id: '2',
    title: 'Voter Registration Deadline',
    body: 'Last date to register is May 1, 2026.',
    type: 'reminder',
    createdAt: new Date().toISOString(),
    read: false
  }
];

export const demoUser = {
  uid: 'demo_user_123',
  name: 'Demo BLO',
  email: 'blo@example.com',
  role: 'blo',
  phone: '+91-9999999999'
};
