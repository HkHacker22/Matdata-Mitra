export const mockBooths = [
  {
    id: 'B001',
    name: 'Govt. Senior Secondary School',
    address: 'Sector-15, Rohini, Delhi',
    constituency: 'Delhi-42',
    lat: 28.7307,
    lng: 77.0575,
    totalVoters: 1250,
    booths: 3,
    amenities: ['Wheelchair Access', 'Water Facility', 'Shade'],
    timing: '7:00 AM - 6:00 PM',
  },
  {
    id: 'B002',
    name: 'Community Center',
    address: 'Sector-16, Rohini, Delhi',
    constituency: 'Delhi-42',
    lat: 28.7289,
    lng: 77.0523,
    totalVoters: 800,
    booths: 2,
    amenities: ['Water Facility', 'First Aid'],
    timing: '7:00 AM - 6:00 PM',
  },
  {
    id: 'B003',
    name: 'Municipal Primary School',
    address: 'Sector-17, Rohini, Delhi',
    constituency: 'Delhi-43',
    lat: 28.7356,
    lng: 77.0612,
    totalVoters: 1500,
    booths: 4,
    amenities: ['Wheelchair Access', 'Water Facility', 'Shade', 'Fan'],
    timing: '7:00 AM - 6:00 PM',
  },
  {
    id: 'B004',
    name: 'NGO Office Complex',
    address: 'Sector-18, Rohini, Delhi',
    constituency: 'Delhi-43',
    lat: 28.7401,
    lng: 77.0654,
    totalVoters: 600,
    booths: 1,
    amenities: ['Water Facility'],
    timing: '7:00 AM - 6:00 PM',
  },
  {
    id: 'B005',
    name: 'Religious Hall',
    address: 'Sector-19, Rohini, Delhi',
    constituency: 'Delhi-44',
    lat: 28.7456,
    lng: 77.0701,
    totalVoters: 950,
    booths: 2,
    amenities: ['Water Facility', 'Shade'],
    timing: '7:00 AM - 6:00 PM',
  },
]

export const searchBooths = async (query) => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  
  const q = query.toLowerCase()
  return mockBooths.filter(
    (b) =>
      b.name.toLowerCase().includes(q) ||
      b.address.toLowerCase().includes(q) ||
      b.constituency.toLowerCase().includes(q)
  )
}

export const getNearestBooths = async (lat, lng, limit = 5) => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  
  const withDistance = mockBooths.map((b) => ({
    ...b,
    distance: Math.sqrt(
      Math.pow(b.lat - lat, 2) + Math.pow(b.lng - lng, 2)
    ) * 111,
  }))
  
  return withDistance
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit)
}

export const getBoothById = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockBooths.find((b) => b.id === id) || null
}