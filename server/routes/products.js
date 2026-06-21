import express from 'express'
import Product from '../models/Product.js'
import { authenticate, authorizeRole } from '../middleware/auth.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 })
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: 'Failed to load products', error })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.json(product)
  } catch (error) {
    res.status(500).json({ message: 'Failed to load product', error })
  }
})

router.post('/', authenticate, authorizeRole('admin', 'employee'), async (req, res) => {
  try {
    const product = new Product(req.body)
    const saved = await product.save()
    res.status(201).json(saved)
  } catch (error) {
    res.status(400).json({ message: 'Failed to create product', error })
  }
})

router.put('/:id', authenticate, authorizeRole('admin', 'employee'), async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updated) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.json(updated)
  } catch (error) {
    res.status(400).json({ message: 'Failed to update product', error })
  }
})

router.delete('/:id', authenticate, authorizeRole('admin', 'employee'), async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id)
    if (!deleted) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.json({ message: 'Product deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product', error })
  }
})

export default router
