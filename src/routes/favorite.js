const router = require("express").Router()
const { auth } = require("../utils/auth")
const {
  addPoint
} = require("../controllers/favorite.controller")

router.route('/add').post(auth, addPoint)

module.exports = router