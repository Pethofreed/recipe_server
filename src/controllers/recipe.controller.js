const { Recipe, User } = require("../models")

module.exports = {
  async createRecipe(req, res){
    try {
      const { body } = req
      const recipe = await Recipe.create(
        body,
        { include: [User] }
      )

      recipe.setUser(body.userid)
      res.status(201).json(recipe)
    } catch (error) {
      res.status(400).json({ error: error.message})
      console.dir(error)
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
  async delete(req, res) {
    try {
      const { id } = req.params
      const recipe = await Recipe.findByPk(id)
      await recipe.destroy()
      res.status(200).json(recipe)
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }
}
