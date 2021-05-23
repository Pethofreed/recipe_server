const router = require("express").Router()
const { auth } = require("../utils/auth")
const { formData } = require("../utils/formData")
const {
  addPoint,
  getRecipe,
  getRecipes,
  listRecipes,
  createRecipe,
  deleteRecipe
} = require("../controllers/recipe.controller")

router.route('/addPoint').post(auth, addPoint)
router.route('/getAllRecipes').get(listRecipes)
router.route('/delete').put(auth, deleteRecipe)
router.route('/getRecipes').get(auth, getRecipes)
router.route('/getRecipe/:idRecipe').get(getRecipe)
router.route('/create').post(auth, formData, createRecipe)

module.exports = router