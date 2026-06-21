import express from 'express'
import Order from '../models/Order.js'
import Product from '../models/Product.js'
import { authenticate, authorizeRole } from '../middleware/auth.js'

const router = express.Router()

router.get('/', authenticate, async (req, res) => {
  try {
    const query = req.user.role === 'admin' ? {} : { userId: req.user._id }
    const orders = await Order.find(query).sort({ createdAt: -1 })
    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: 'Failed to load orders', error })
  }
})

router.post('/', authenticate, async (req, res) => {
  try {
    const { address, city, zipCode, items, total } = req.body
    const order = new Order({
      userId: req.user._id,
      userName: req.user.name,
      email: req.user.email,
      address,
      city,
      zipCode,
      items,
      total
    })
    const savedOrder = await order.save()

    await Promise.all(items.map(async (item) => {
      await Product.findByIdAndUpdate(item.productId, { $inc: { quantity: -item.quantity } })
    }))

    res.status(201).json(savedOrder)
  } catch (error) {
    res.status(400).json({ message: 'Failed to create order', error })
  }
})

router.put('/:id', authenticate, authorizeRole('admin'), async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updated) {
      return res.status(404).json({ message: 'Order not found' })
    }
    res.json(updated)
  } catch (error) {
    res.status(400).json({ message: 'Failed to update order', error })
  }
})

router.delete('/:id', authenticate, authorizeRole('admin'), async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id)
    if (!deleted) {
      return res.status(404).json({ message: 'Order not found' })
    }
    res.json({ message: 'Order deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete order', error })
  }
})

export default router
