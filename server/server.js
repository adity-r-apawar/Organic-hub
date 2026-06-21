import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import path from 'path'
import bcrypt from 'bcryptjs'
import productsRouter from './routes/products.js'
import ordersRouter from './routes/orders.js'
import authRouter from './routes/auth.js'
import usersRouter from './routes/users.js'
import careersRouter from './routes/careers.js'
import uploadRouter from './routes/upload.js'
import Product from './models/Product.js'
import User from './models/User.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

app.use('/api/products', productsRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/careers', careersRouter)
app.use('/api/uploads', uploadRouter)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

const seedProducts = async () => {
  const count = await Product.countDocuments()
  if (count > 0) return

  await Product.create([
    {
      name: 'Organic Apples',
      category: 'Fruits',
      price: 199,
      quantity: 50,
      unit: 'kg',
      image: 'https://images.unsplash.com/photo-1560806887-1295db8edd8e?w=500&h=500&fit=crop',
      description: 'Fresh, crispy, and sweet organic apples grown without pesticides.',
      reviews: 120,
      emoji: '🍎'
    },
    {
      name: 'Fresh Carrots',
      category: 'Vegetables',
      price: 79,
      quantity: 100,
      unit: 'kg',
      image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd0a495?w=500&h=500&fit=crop',
      description: 'Nutrient-rich organic carrots perfect for salads and cooking.',
      reviews: 85,
      emoji: '🥕'
    },
    {
      name: 'Organic Bananas',
      category: 'Fruits',
      price: 139,
      quantity: 60,
      unit: 'kg',
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&h=500&fit=crop',
      description: 'Naturally ripened organic bananas rich in potassium.',
      reviews: 95,
      emoji: '🍌'
    },
    {
      name: 'Fresh Broccoli',
      category: 'Vegetables',
      price: 219,
      quantity: 40,
      unit: 'kg',
      image: 'https://images.unsplash.com/photo-1584868877997-b0ec3e8e5a48?w=500&h=500&fit=crop',
      description: 'Tender green organic broccoli packed with nutrients.',
      reviews: 70,
      emoji: '🥦'
    },
    {
      name: 'Organic Strawberries',
      category: 'Fruits',
      price: 259,
      quantity: 35,
      unit: 'kg',
      image: 'https://images.unsplash.com/photo-1464454709131-ffd692591ee5?w=500&h=500&fit=crop',
      description: 'Sweet and juicy organic strawberries bursting with flavor.',
      reviews: 110,
      emoji: '🍓'
    }
  ])
}

const seedAdminUser = async () => {
  const existingAdmin = await User.findOne({ email: 'vikas@organic.com' })
  if (existingAdmin) return

  const hashedPassword = await bcrypt.hash('VISABA@#3105', 10)
  await User.create({
    name: 'Vikas Admin',
    email: 'vikas@organic.com',
    phone: '',
    password: hashedPassword,
    role: 'admin',
    active: true
  })
}

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/organic-hub'

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async () => {
    await seedProducts()
    await seedAdminUser()
    app.listen(port, () => {
      console.log(`MongoDB connected to ${mongoUri}`)
      console.log(`Backend running on http://localhost:${port}`)
    })
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error)
    process.exit(1)
  })
