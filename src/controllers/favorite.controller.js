const { Favorite, Recipe } = require("../models")

module.exports = {
  async addFavorite(req, res){
    try {
      const { body, user } = req
      console.log(body)
      await Favorite.create(
        {
          userid: user.userId,
          recipeid: body.recipeid
        }
      )
      res.status(201).json({message: 'success'})
    } catch (error) {
      res.status(400).json({ error: error.message})
    }
  },
  async getFavorites(req, res){
    try {
      const { user: {userId} } = req
      const favorites = await Favorite
      .findAll( { where: { userid: userId } } )
      res.status(200).json(favorites)
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  },
  async destroyFavorite(req, res) {
    try {
      const { body, user: { userId } } = req
      const favorite = await Favorite.findOne( {where: { userid: userId, recipeid: body.recipeid}} )
      await favorite.destroy()
      res.status(200).json({message: 'success'})
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }
}
