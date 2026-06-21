import mongoose from 'mongoose'

const applicationSchema = new mongoose.Schema({
  careerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Career', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: '' },
  coverLetter: { type: String, default: '' },
}, {
  timestamps: true,
})

const CareerApplication = mongoose.model('CareerApplication', applicationSchema)
export default CareerApplication
