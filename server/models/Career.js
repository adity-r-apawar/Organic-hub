import mongoose from 'mongoose'

const careerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, default: 'Remote' },
  type: { type: String, default: 'Full-time' },
  salary: { type: String, default: 'Competitive' },
  description: { type: String, default: '' },
  requirements: { type: String, default: '' },
  status: { type: String, enum: ['Open', 'Closed'], default: 'Open' },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: true,
})

const Career = mongoose.model('Career', careerSchema)
export default Career
