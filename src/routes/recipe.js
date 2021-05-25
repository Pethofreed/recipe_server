const router = require("express").Router()
const { auth } = require("../utils/auth")
const { formData } = require("../utils/formData")
const {
  update,
  addPoint,
  getSearch,
  getRecipe,
  getRecipes,
  listRecipes,
  createRecipe,
  updateRecipe,
  deleteRecipe
} = require("../controllers/recipe.controller")

router.route('/addPoint').post(auth, addPoint)
router.route('/getAllRecipes').get(listRecipes)
router.route('/delete').put(auth, deleteRecipe)
router.route('/getRecipes').get(auth, getRecipes)
router.route('/getSearch/:search').get(getSearch)
router.route('/getRecipe/:idRecipe').get(getRecipe)
router.route('/create').post(auth, formData, createRecipe)
router.route('/update').put(auth, formData, update)
router.route('/update_with_picture').put(auth, formData, updateRecipe)

module.exports = router