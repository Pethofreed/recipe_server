const router = require("express").Router()
const {
  createRecipe,
  listRecipes
} = require("../controllers/recipe.controller")

router.route('/create').post(createRecipe)
router.route('/list').get(listRecipes)

module.exports = router