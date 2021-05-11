const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const { User } = require("../models")

module.exports = {
  async signIn(req, res) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({where: { email: email } })

      if(!user){
        throw Error('Usuario o contraseña invalido')
      }

      const isValid = await password === user.password

      if(!isValid){
        throw Error('Usuario o contraseña invalido')
      }

      const token = jwt.sign(
        {
          userId: user.id,
        },
        process.env.SECRET,
        { expiresIn: 80 * 80}
      )

      res.status(200).json({user, token})
    } catch (error) {
      res.status(404).json({message: error.message})
    }
  },
  async signUp(req, res){
    try {
      const { body } = req
      const emailExist = await User.findOne({where: { email: body.email } })

      if(emailExist){
        throw Error('El email ya está en uso')
      }

      const user = await User.create(body)

      const token = jwt.sign(
        {
          userId: user.id,
        },
        process.env.SECRET,
        { expiresIn: 80 * 80}
      )

      res.status(201).json({token, user})
    } catch (error) {
      res.status(400).json({message: error.message})
    }
  },
  async showOne(req, res){
    try {
      const { userId } = req.body
      const user = User.findByPk(userId)
      res.status(200).json(user)
    } catch (error) {
      res.status(400).json(error)
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
      const { userId } = req.params
      const user = await User.findByPk(userId)
      await user.destroy()
      res.status(200).json(user)
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }
}
