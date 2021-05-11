const router = require("express").Router()
const recipeController = require("../controllers/recipe.controller")

router.route('/create').post(recipeController.createRecipe)

module.exports = router