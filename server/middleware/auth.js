import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const JWT_SECRET = process.env.JWT_SECRET || 'organic-secret'

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null

  if (!token) {
    return res.status(401).json({ message: 'Authentication token missing' })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    const user = await User.findById(decoded.id).select('-password')
    if (!user) {
      return res.status(401).json({ message: 'User not found' })
    }
    req.user = user
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}

export const authorizeRole = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Access denied' })
  }
  next()
}
