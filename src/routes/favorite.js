const router = require("express").Router()
const { auth } = require("../utils/auth")
const {
  addFavorite,
  getFavorites,
  destroyFavorite
} = require("../controllers/favorite.controller")

router.route('/add').post(auth, addFavorite)
router.route('/destroy').put(auth, destroyFavorite)
router.route('/getFavorites').get(auth, getFavorites)

module.exports = router