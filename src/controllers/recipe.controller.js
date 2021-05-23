const { Recipe, User } = require("../models")

module.exports = {
  async createRecipe(req, res){
    try {
      const { body, user: { userId} } = req
      const recipe = await Recipe.create(
        {
          userid: userId,
          title: body.title,
          level: body.level,
          picture: body.picture,
          duration: body.duration,
          description: body.description,
          ingredients: body.ingredients
        },
        { include: [User] }
      )
      recipe.setUser(userId)
      res.status(201).json(recipe)
    } catch (error) {
      res.status(400).json({ error: error.message})
      console.dir(error)
    }
  },
  async getRecipes(req, res){
    try {
      const { user: {userId} } = req
      const recipes = await Recipe
      .findAll( { where: { UserId: userId } } )
      res.status(200).json({recipes: recipes})
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  },
  async getRecipe(req, res){
    try {
      const { params: { idRecipe } } = req
      console.log(idRecipe)
      const recipe = await Recipe
      .findByPk(idRecipe)
      res.status(200).json(recipe)
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  },
  async listRecipes(req, res){
    try {
      const recipes = await Recipe
      .scope({ include: [User] })
      .findAll()
      res.status(200).json(recipes)
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  },
  async update(req, res) {
    try {
      const { body, params: { userdId} } = req
      let user = await User.findByPk(userId)
      user =  await user.update(body)
      res.status(200).json(user)
    } catch (error) {
      res.status(400).json(error)
    }
  },
  async deleteRecipe(req, res) {
    try {
      const { id } = req.body
      const recipe = await Recipe.findByPk(id)
      await recipe.destroy()
      res.status(200).json({recipe: recipe})
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }
}
