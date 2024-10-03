// common js for backend
const express = require('express')
const router = express.Router()

const {
    getUsage
} = require('../controllers/usageController')
const { protect } = require('../middleware/authMiddleware')


router.get('/', protect, getUsage)

module.exports = router