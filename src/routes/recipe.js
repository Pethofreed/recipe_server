const router = require("express").Router()
const { auth } = require("../utils/auth")
const { formData } = require("../utils/formData")
const {
  createRecipe,
  listRecipes,
  getRecipes,
  deleteRecipe
} = require("../controllers/recipe.controller")

router.route('/list').get(listRecipes)
router.route('/create').post(auth, formData, createRecipe)
router.route('/getRecipes').get(auth, getRecipes)
router.route('/delete').put(auth, deleteRecipe)

module.exports = router