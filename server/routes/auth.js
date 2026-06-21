import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'organic-secret'

const createSafeUser = (user) => {
  const safeUser = user.toObject ? user.toObject() : { ...user }
  safeUser.id = safeUser._id
  delete safeUser.password
  return safeUser
}

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }

  const user = await User.findOne({ email: email.toLowerCase() })
  if (!user || !user.active) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const passwordValid = await bcrypt.compare(password, user.password)
  if (!passwordValid) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' })
  res.json({ user: createSafeUser(user), token })
})

router.post('/register', async (req, res) => {
  const { fullName, email, phone, password } = req.body
  if (!fullName || !email || !phone || !password) {
    return res.status(400).json({ message: 'Missing registration fields' })
  }

  const existingUser = await User.findOne({ email: email.toLowerCase() })
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const user = new User({
    name: fullName,
    email: email.toLowerCase(),
    phone,
    password: hashedPassword,
    role: 'customer'
  })

  await user.save()
  res.status(201).json({ user: createSafeUser(user) })
})

export default router
