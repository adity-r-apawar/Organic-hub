import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, default: 'Fruits' },
  price: { type: Number, required: true },
  unit: { type: String, enum: ['kg', 'g', 'liter'], default: 'kg' },
  quantity: { type: Number, default: 0 },
  image: { type: String, default: '' },
  description: { type: String, default: '' },
  reviews: { type: Number, default: 0 },
  emoji: { type: String, default: '🥬' },
}, {
  timestamps: true,
})

const Product = mongoose.model('Product', productSchema)
export default Product
