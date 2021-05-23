const { Favorite } = require("../models")

module.exports = {
  async addPoint(req, res){
    try {
      const { body, user } = req
      console.log(body)
      await Favorite.create(
        {
          id: user.userId,
          recipeid: body.recipeid
        }
      )
      res.status(201).json({message: 'success'})
    } catch (error) {
      res.status(400).json({ error: error.message})
    }
  },
  async deleteRecipe(req, res) {
    try {
      const { id } = req.body
      const favorite = await Favorite.findByPk(id)
      await favorite.destroy()
      res.status(200).json({message: 'success'})
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }
}
