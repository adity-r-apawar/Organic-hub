import express from 'express'
import multer from 'multer'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const uploadsPath = path.join(__dirname, '../uploads')

if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true })
}

const storage = multer.diskStorage({
  destination: uploadsPath,
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname)
    const safeName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`
    cb(null, safeName)
  }
})

const upload = multer({ storage })
const router = express.Router()

router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No image file provided' })
  }

  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
  res.status(201).json({ imageUrl })
})

export default router
