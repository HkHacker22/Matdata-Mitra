  import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const voterSchema = new mongoose.Schema({}, { strict: false });
const Voter = mongoose.model('Voter', voterSchema, 'voters');

const mockVoters = [
  { voterId: 'ABC1234567', name: 'Rahul Sharma', assemblyConstituency: 'Delhi-42', partNo: '123', sectionNo: '4', pollingStation: 'Govt. Senior Secondary School', age: 34, gender: 'Male', verified: false, location: { type: 'Point', coordinates: [77.0580, 28.7310] } },
  { voterId: 'XYZ9876543', name: 'Priya Patel', assemblyConstituency: 'Delhi-42', partNo: '123', sectionNo: '4', pollingStation: 'Govt. Senior Secondary School', age: 28, gender: 'Female', verified: false, location: { type: 'Point', coordinates: [77.0570, 28.7300] } },
  { voterId: 'DEF3456789', name: 'Amit Kumar', assemblyConstituency: 'Mumbai South Central', partNo: '45', sectionNo: '1', pollingStation: 'Mumbai Central Community Hall', age: 45, gender: 'Male', verified: false, location: { type: 'Point', coordinates: [72.8430, 19.0180] } },
  { voterId: 'GHI8765432', name: 'Sunita Devi', assemblyConstituency: 'Mumbai South Central', partNo: '45', sectionNo: '1', pollingStation: 'Mumbai Central Community Hall', age: 52, gender: 'Female', verified: false, location: { type: 'Point', coordinates: [72.8420, 19.0170] } },
  { voterId: 'MNO1122334', name: 'Vikram Singh', assemblyConstituency: 'Bengaluru South', partNo: '89', sectionNo: '2', pollingStation: 'Bengaluru Public School', age: 29, gender: 'Male', verified: false, location: { type: 'Point', coordinates: [77.6280, 12.9360] } },
  { voterId: 'PQR5566778', name: 'Sneha Reddy', assemblyConstituency: 'Chennai South', partNo: '12', sectionNo: '3', pollingStation: 'Chennai Corporation School', age: 31, gender: 'Female', verified: false, location: { type: 'Point', coordinates: [80.2340, 13.0410] } },
  { voterId: 'STU9988776', name: 'Arjun Desai', assemblyConstituency: 'Kolkata Dakshin', partNo: '67', sectionNo: '1', pollingStation: 'Kolkata Municipal College', age: 42, gender: 'Male', verified: false, location: { type: 'Point', coordinates: [88.3530, 22.5520] } },
  { voterId: 'VWX4433221', name: 'Meera Iyer', assemblyConstituency: 'Kolkata Dakshin', partNo: '67', sectionNo: '1', pollingStation: 'Kolkata Municipal College', age: 38, gender: 'Female', verified: false, location: { type: 'Point', coordinates: [88.3510, 22.5510] } },
  { voterId: 'YZA1122334', name: 'Alok Singh', assemblyConstituency: 'Lucknow East', partNo: '34', sectionNo: '1', pollingStation: 'Lucknow Vidya Mandir', age: 35, gender: 'Male', verified: false, location: { type: 'Point', coordinates: [80.9470, 26.8470] } },
  { voterId: 'BCD5566778', name: 'Nisha Gupta', assemblyConstituency: 'Lucknow East', partNo: '34', sectionNo: '1', pollingStation: 'Lucknow Vidya Mandir', age: 30, gender: 'Female', verified: false, location: { type: 'Point', coordinates: [80.9450, 26.8450] } },
  { voterId: 'EFG9988776', name: 'Ramesh Patel', assemblyConstituency: 'Ahmedabad West', partNo: '56', sectionNo: '2', pollingStation: 'Ahmedabad Heritage School', age: 40, gender: 'Male', verified: false, location: { type: 'Point', coordinates: [72.5720, 23.0230] } },
  { voterId: 'HIJ4433221', name: 'Sneha Shah', assemblyConstituency: 'Ahmedabad West', partNo: '56', sectionNo: '2', pollingStation: 'Ahmedabad Heritage School', age: 28, gender: 'Female', verified: false, location: { type: 'Point', coordinates: [72.5700, 23.0210] } },
  { voterId: 'KLM7766554', name: 'Rohit Sharma', assemblyConstituency: 'Jaipur City', partNo: '90', sectionNo: '3', pollingStation: 'Jaipur Royal College', age: 48, gender: 'Male', verified: false, location: { type: 'Point', coordinates: [75.7880, 26.9130] } },
  { voterId: 'NOP3322110', name: 'Anita Singh', assemblyConstituency: 'Jaipur City', partNo: '90', sectionNo: '3', pollingStation: 'Jaipur Royal College', age: 45, gender: 'Female', verified: false, location: { type: 'Point', coordinates: [75.7860, 26.9110] } },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    await Voter.deleteMany({});
    await Voter.insertMany(mockVoters);
    console.log('Seeded electoral rolls successfully!');
    
    const voters = await Voter.find({}, { voterId: 1, name: 1, _id: 0 });
    console.log('\n================================');
    console.log('Valid EPIC IDs you can test with:');
    voters.forEach(v => console.log(`- ${v.voterId} (${v.name})`));
    console.log('================================');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding voters:', error);
    process.exit(1);
  }
}

seed();
