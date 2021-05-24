const { Recipe, User } = require("../models")
const Sequelize = require('sequelize')

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
      const recipe = await Recipe
      .scope({ include: [User] })
      .findByPk(idRecipe)
      res.status(200).json(recipe)
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  },
  async getSearch(req, res){
    try {
      const { params: { search } } = req
      const search1 = search.toLowerCase()
      const Op = Sequelize.Op
      const recipe = await Recipe
      .scope({ include: [User] })
      .findAll( { where:
        {
          [Op.or]: [
            {
              title: {
                [Op.like]: `%${search}%`
              }
            },
            {
              title: {
                [Op.like]: `%${search1}%`
              }
            }
          ]
        },
      } )
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
  async addPoint(req, res) {
    try {
      const { body, params: { userId} } = req
      let recipe = await Recipe.findByPk(body.id)
      recipe =  await recipe.update( {positivePoints: recipe.positivePoints + 5} )
      res.status(200).json({message: 'sucess'})
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
