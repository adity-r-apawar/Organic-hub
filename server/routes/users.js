import express from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import { authenticate, authorizeRole } from '../middleware/auth.js'

const router = express.Router()

router.get('/', authenticate, authorizeRole('admin'), async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 })
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: 'Failed to load users', error })
  }
})

router.get('/me', authenticate, async (req, res) => {
  res.json(req.user)
})

router.post('/', authenticate, authorizeRole('admin'), async (req, res) => {
  try {
    const { name, email, phone, password, role, active } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' })
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({
      name,
      email: email.toLowerCase(),
      phone,
      password: hashedPassword,
      role: role || 'customer',
      active: active !== false
    })

    const savedUser = await newUser.save()
    const safeUser = savedUser.toObject()
    delete safeUser.password
    res.status(201).json(safeUser)
  } catch (error) {
    res.status(400).json({ message: 'Failed to create user', error })
  }
})

router.put('/:id', authenticate, authorizeRole('admin'), async (req, res) => {
  try {
    const updates = { ...req.body }
    if (updates.email) {
      updates.email = updates.email.toLowerCase()
    }
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10)
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password')
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.json(updatedUser)
  } catch (error) {
    res.status(400).json({ message: 'Failed to update user', error })
  }
})

router.delete('/:id', authenticate, authorizeRole('admin'), async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id)
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.json({ message: 'User deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user', error })
  }
})

export default router
