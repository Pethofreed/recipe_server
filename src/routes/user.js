const router = require("express").Router()
const { auth } = require("../utils/auth")
const { formData } = require("../utils/formData")
const userController = require("../controllers/user.controller")

router.route('/signup').post(userController.signUp)
router.route('/signin').post(userController.signIn)
router.route('/user').get(auth, userController.showOne)
router.route('/updatePicture').put(auth, formData, userController.updatePicture)
router.route('/update').put(auth, userController.update)

module.exports = router
