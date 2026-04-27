export const mockVoters = [
  {
    id: 'V001',
    name: 'Rajesh Kumar',
    age: 35,
    gender: 'Male',
    voterId: 'ABC1234567',
    assemblyConstituency: 'Delhi-42',
    pollingStation: 'Govt. Senior Secondary School',
    partNo: '123',
    sectionNo: '4',
    address: 'H.No. 45, Sector-15, Rohini',
    photo: null,
  },
  {
    id: 'V002',
    name: 'Priya Sharma',
    age: 28,
    gender: 'Female',
    voterId: 'DEF9876543',
    assemblyConstituency: 'Delhi-42',
    pollingStation: 'Govt. Senior Secondary School',
    partNo: '124',
    sectionNo: '2',
    address: 'H.No. 78, Sector-15, Rohini',
    photo: null,
  },
  {
    id: 'V003',
    name: 'Amit Patel',
    age: 42,
    gender: 'Male',
    voterId: 'GHI4567890',
    assemblyConstituency: 'Delhi-42',
    pollingStation: 'Community Center',
    partNo: '125',
    sectionNo: '1',
    address: 'H.No. 12, Sector-16, Rohini',
    photo: null,
  },
  {
    id: 'V004',
    name: 'Sunita Devi',
    age: 55,
    gender: 'Female',
    voterId: 'JKL2345678',
    assemblyConstituency: 'Delhi-43',
    pollingStation: 'Municipal Primary School',
    partNo: '101',
    sectionNo: '3',
    address: 'H.No. 90, Sector-17, Rohini',
    photo: null,
  },
  {
    id: 'V005',
    name: 'Mohammad Rafiq',
    age: 31,
    gender: 'Male',
    voterId: 'MNO8765432',
    assemblyConstituency: 'Delhi-43',
    pollingStation: 'Municipal Primary School',
    partNo: '102',
    sectionNo: '5',
    address: 'H.No. 34, Sector-17, Rohini',
    photo: null,
  },
]

export const searchVoters = async (query) => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  
  const q = query.toLowerCase()
  return mockVoters.filter(
    (v) =>
      v.name.toLowerCase().includes(q) ||
      v.voterId.toLowerCase().includes(q) ||
      v.address.toLowerCase().includes(q)
  )
}

export const getVoterById = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockVoters.find((v) => v.id === id) || null
}

export const generateVoterQRData = (voter) => {
  return JSON.stringify({
    id: voter.id,
    voterId: voter.voterId,
    name: voter.name,
    partNo: voter.partNo,
    sectionNo: voter.sectionNo,
    timestamp: new Date().toISOString(),
  })
}