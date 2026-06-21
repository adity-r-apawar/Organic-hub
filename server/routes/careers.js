import express from 'express'
import Career from '../models/Career.js'
import CareerApplication from '../models/CareerApplication.js'
import { authenticate, authorizeRole } from '../middleware/auth.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const careers = await Career.find({ status: 'Open' }).sort({ createdAt: -1 })
    res.json(careers)
  } catch (error) {
    res.status(500).json({ message: 'Failed to load careers', error })
  }
})

router.post('/', authenticate, authorizeRole('admin', 'employee'), async (req, res) => {
  try {
    const career = new Career({ ...req.body, postedBy: req.user._id })
    const saved = await career.save()
    res.status(201).json(saved)
  } catch (error) {
    res.status(400).json({ message: 'Failed to create career', error })
  }
})

router.put('/:id', authenticate, authorizeRole('admin', 'employee'), async (req, res) => {
  try {
    const updated = await Career.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updated) {
      return res.status(404).json({ message: 'Career not found' })
    }
    res.json(updated)
  } catch (error) {
    res.status(400).json({ message: 'Failed to update career', error })
  }
})

router.delete('/:id', authenticate, authorizeRole('admin', 'employee'), async (req, res) => {
  try {
    const deleted = await Career.findByIdAndDelete(req.params.id)
    if (!deleted) {
      return res.status(404).json({ message: 'Career not found' })
    }
    res.json({ message: 'Career deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete career', error })
  }
})

router.post('/:id/apply', async (req, res) => {
  try {
    const { name, email, phone, coverLetter } = req.body
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' })
    }

    const application = new CareerApplication({
      careerId: req.params.id,
      name,
      email,
      phone,
      coverLetter
    })

    await application.save()
    res.status(201).json({ message: 'Application submitted successfully' })
  } catch (error) {
    res.status(400).json({ message: 'Failed to submit application', error })
  }
})

router.get('/:id/applications', authenticate, authorizeRole('admin', 'employee'), async (req, res) => {
  try {
    const applications = await CareerApplication.find({ careerId: req.params.id }).sort({ createdAt: -1 })
    res.json(applications)
  } catch (error) {
    res.status(500).json({ message: 'Failed to load applications', error })
  }
})

export default router
