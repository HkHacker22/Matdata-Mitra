/**
 * Seed script — populates MongoDB with mock data from existing frontend services.
 * Run: cd server && npm run seed
 */
import 'dotenv/config'
import mongoose from 'mongoose'
import connectDB from './config/db.js'
import Voter from './models/Voter.js'
import Booth from './models/Booth.js'
import Complaint from './models/Complaint.js'
import Notification from './models/Notification.js'
import User from './models/User.js'

// ─── Mock Data (from src/services/) ──────────────────

const voters = [
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
  },
  {
    voterId: 'JKL2345678',
    name: 'Sunita Devi',
    age: 55,
    gender: 'Female',
    assemblyConstituency: 'Delhi-43',
    pollingStation: 'Municipal Primary School',
    partNo: '101',
    sectionNo: '3',
    address: 'H.No. 90, Sector-17, Rohini',
  },
  {
    voterId: 'MNO8765432',
    name: 'Mohammad Rafiq',
    age: 31,
    gender: 'Male',
    assemblyConstituency: 'Delhi-43',
    pollingStation: 'Municipal Primary School',
    partNo: '102',
    sectionNo: '5',
    address: 'H.No. 34, Sector-17, Rohini',
  },
]

const booths = [
  {
    name: 'Govt. Senior Secondary School',
    address: 'Sector-15, Rohini, Delhi',
    constituency: 'Delhi-42',
    partNo: '123',
    location: { type: 'Point', coordinates: [77.0575, 28.7307] },
    facilities: { ramp: true, drinkingWater: true, shade: true, electricity: true },
    bloName: 'Ramesh Verma',
    bloPhone: '+91-9876543210',
  },
  {
    name: 'Community Center',
    address: 'Sector-16, Rohini, Delhi',
    constituency: 'Delhi-42',
    partNo: '125',
    location: { type: 'Point', coordinates: [77.0523, 28.7289] },
    facilities: { drinkingWater: true, electricity: true },
    bloName: 'Suresh Kumar',
    bloPhone: '+91-9876543211',
  },
  {
    name: 'Municipal Primary School',
    address: 'Sector-17, Rohini, Delhi',
    constituency: 'Delhi-43',
    partNo: '101',
    location: { type: 'Point', coordinates: [77.0612, 28.7356] },
    facilities: { ramp: true, drinkingWater: true, shade: true, electricity: true, toilet: true },
    bloName: 'Anita Singh',
    bloPhone: '+91-9876543212',
  },
  {
    name: 'NGO Office Complex',
    address: 'Sector-18, Rohini, Delhi',
    constituency: 'Delhi-43',
    partNo: '102',
    location: { type: 'Point', coordinates: [77.0654, 28.7401] },
    facilities: { drinkingWater: true, electricity: true },
    bloName: 'Manoj Tiwari',
    bloPhone: '+91-9876543213',
  },
  {
    name: 'Religious Hall',
    address: 'Sector-19, Rohini, Delhi',
    constituency: 'Delhi-44',
    partNo: '130',
    location: { type: 'Point', coordinates: [77.0701, 28.7456] },
    facilities: { drinkingWater: true, shade: true, electricity: true },
    bloName: 'Fatima Khan',
    bloPhone: '+91-9876543214',
  },
]

const notifications = [
  {
    title: 'Delhi Municipal Elections 2026',
    body: 'Polling scheduled for Phase 1 on May 15, 2026. Check your voter registration status.',
    type: 'election_update',
    targetAudience: 'all',
  },
  {
    title: 'Voter Registration Deadline',
    body: 'Last date to register as a new voter for upcoming elections is May 1, 2026.',
    type: 'reminder',
    targetAudience: 'citizens',
  },
  {
    title: 'BLO Verification Drive',
    body: 'Door-to-door voter verification in Sectors 15-19, Rohini from April 28 to May 5.',
    type: 'general',
    targetAudience: 'blo',
  },
  {
    title: 'Booth Accessibility Update',
    body: 'All polling booths in Delhi-42 now have ramp access and drinking water facilities.',
    type: 'general',
    targetAudience: 'all',
  },
]

const demoUser = {
  uid: 'demo-admin-001',
  name: 'Admin User',
  email: 'admin@matdatamitra.gov.in',
  phone: '+91-9999999999',
  role: 'admin',
}

// ─── Seed Function ────────────────────────────────────

const seed = async () => {
  await connectDB()

  console.log('🌱 Seeding database...\n')

  // Clear existing data
  await Promise.all([
    Voter.deleteMany({}),
    Booth.deleteMany({}),
    Notification.deleteMany({}),
    User.deleteMany({}),
  ])
  console.log('  🗑️  Cleared existing data')

  // Insert seed data
  const [insertedVoters, insertedBooths, insertedNotifications, insertedUser] = await Promise.all([
    Voter.insertMany(voters),
    Booth.insertMany(booths),
    Notification.insertMany(notifications),
    User.create(demoUser),
  ])

  console.log(`  ✅ ${insertedVoters.length} voters`)
  console.log(`  ✅ ${insertedBooths.length} booths`)
  console.log(`  ✅ ${insertedNotifications.length} notifications`)
  console.log(`  ✅ 1 admin user (${demoUser.email})`)

  console.log('\n🎉 Seeding complete!')

  await mongoose.connection.close()
  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err)
  process.exit(1)
})
