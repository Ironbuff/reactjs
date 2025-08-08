const express = require('express')
const router = express.Router()
const habitController = require('../controller/habit-controller')
const authVerify = require('../middleware/verify')


router.get('/',habitController.getUserHabit)
router.post('/addhabit',authVerify,habitController.addHabit)
router.delete('/:ids',authVerify,habitController.deleteUserHabit)

module.exports = router