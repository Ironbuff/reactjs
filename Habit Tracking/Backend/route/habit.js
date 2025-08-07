const express = require('express')
const router = express.Router()
const habitController = require('../controller/habit-controller')
const authVerify = require('../middleware/verify')


router.get('/',authVerify,habitController.getUserHabit)
router.post('/addhabit',authVerify,habitController.addHabit)

module.exports = router