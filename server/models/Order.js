import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  email: { type: String, required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    }
  ],
  total: { type: Number, required: true },
  status: { type: String, default: 'Processing' },
  address: { type: String, required: true },
  city: { type: String, required: true },
  zipCode: { type: String, default: '' },
}, {
  timestamps: true,
})

const Order = mongoose.model('Order', orderSchema)
export default Order
