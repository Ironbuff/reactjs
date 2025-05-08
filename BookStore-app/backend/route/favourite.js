const express = require('express')
const router = express.Router()
const {authenticateToken} = require('../controller/userAuth')
const favouritecontroller = require('../controller/favouritebook-controller')

router.put('/add-favourite-books',authenticateToken,favouritecontroller.addfavourite)
router.put('/delete-favourite-books',authenticateToken,favouritecontroller.deletefavourite)
router.get('/get-all-favourite-books',authenticateToken,favouritecontroller.getfavouritebook)





module.exports = router