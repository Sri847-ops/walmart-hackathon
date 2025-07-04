import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import Seller from '../models/Seller.js'

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey'

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password, loginType } = req.body

  try {
    let account

    if (loginType === 'user') {
      account = await User.findOne({ email })
    } else if (loginType === 'seller') {
      account = await Seller.findOne({ email })
    } else {
      return res.status(400).json({ message: 'Invalid login type' })
    }

    if (!account) {
      return res.status(404).json({ message: 'Account not found' })
    }

    // Plain text password check
    if (password !== account.password) {
      return res.status(401).json({ message: 'Incorrect password' })
    }

    const token = jwt.sign(
      { id: account._id, loginType },
      JWT_SECRET,
      { expiresIn: '2h' }
    )

    res.json({
      token,
      user: {
        id: account._id,
        name: account.name || account.storeName || 'Unnamed',
        email: account.email,
        loginType,
      },
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error during login' })
  }
})

export default router
