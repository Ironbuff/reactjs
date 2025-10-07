const express = require('express')
const router = express.Router()
const habitController = require('../controller/habit-controller')
const authVerify = require('../middleware/verify')
const optionalAuth = require('../middleware/optionalauth')


router.get('/',optionalAuth,habitController.getUserHabit)
router.post('/addhabit',authVerify,habitController.addHabit)
router.delete('/:ids',authVerify,habitController.deleteUserHabit)
router.post('/toggle/:id',authVerify,habitController.toggleHabitCompletion)
router.put('/updatehabit/:id',authVerify,habitController.updateHabit)

module.exports = router