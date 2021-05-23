const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const { User } = require("../models")
const Nodemailer = require("nodemailer")

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

      //Proceso para enviar email de bienvenida.
      const transporter = Nodemailer.createTransport({
        host: "smtp.aol.com",
        post: 465,
        secure: true,
        auth: {
          user: process.env.MAILER_USER,
          pass: process.env.MAILER_PASS,
        }
      })

      const myStatus = await transporter.verify()
      if(myStatus){
        console.log(`Status: ${myStatus}`)
      }

      const style = {
        container: 'width: 400px;height: 800px;',
        header: 'display: flex;background-color: #194350;justify-content: center;font-family:"Times New Roman", Times, serif;color: white;font-family: sans-serif;font-weight: bolder;',
        name: 'font-size: 13px;text-align: center;',
        hr: 'width: 100%;opacity: 0.1;',
        p_1: 'font-size: 13px;text-align: center;',
        content_header: 'font-size:25px;',
        content_body : 'display: flex;background-color: #eeebdd;justify-content: center;font-family: sans-serif;',
        body_main: 'display:block;',
        p_body_1: 'font-weight: bolder;text-align: center;',
        p_body_2: 'padding: 4%;text-align: justify;',
        p_body_3: 'font-weight: bolder;text-align: center;',
        p_body_4: 'font-weight: bolder;text-align: center;',
        btn: 'font-weight: bolder;text-align: center;margin-top: 10px;margin-bottom: 30px;',
        datos: 'padding-left: 5%;',
        btn_web: 'text-decoration: none;padding: 5px;color: #ffffff;background:linear-gradient(to right, #732fdf, #bd00ff);border-radius: 7px;font-weight: normal;'
      }

      const mail = await transporter.sendMail({
        from: `"${process.env.MAILER_USERNAME}" <${process.env.MAILER_USER}>`,
        to: body.email,
        subject: 'Bienvenido a My Recipe',
        html: `
          <div style="width: 400px; height: 800px;">
            <div style="
              display: flex;
              background-color: #194350;
              justify-content: center;
              color: white;
              font-family: sans-serif;
              font-weight: bolder;"
            >
              <div style="font-size: 25px;width:100%">
                <p style="
                  font-size: 13px;
                  text-align: center;"
                >
                  Estamos Felices
                </p>
                <hr style="width: 85%;opacity: 0.1;">
                <p style="text-align: center;">Welcome to My Recipe</p>
                <p style="font-size: 13px;text-align: center;">${body.name}</p>
              </div>
            </div>

            <div style="${style.content_body}">
              <div style="${style.body_main}">
                <p style="${style.p_body_1}">Nos Encanta Que Te Nos Hayas Unido</p>
                <p style="${style.p_body_2}">
                  Te has registrado exitosamente en nuestra app web
                  de recetas, allí podrás encontrar una cantidad enorme
                  de comidas deliciosas para que pongas a prueba y
                  te desafies, también para que sorprendas a tus seres
                  queridos en ocasiones especiales.
                </p>
                <p style="${style.p_body_3}">Tus Datos:</p>
                <div style="${style.datos}">
                  <p>Correo: <span>${body.email}</span></p>
                  <p>Contraseña: ${body.password}</p>
                </div>
                <hr>
                <p style="${style.p_body_4}">
                  ¡Gracias por elegirnos!
                </p>
                <div style="${style.btn}">
                  <a href="http://localhost:3000/signin" target="_blank"
                    style="${style.btn_web}"
                  >
                    Página web
                  </a>
                </div>
              </div>
            </div>

          </div>
        `
      })
      res.status(201).json({token, user})
    } catch (error) {
      res.status(400).json({message: error.message})
    }
  },
  async showOne(req, res){
    try {
      const { user: {userId} } = req
      const user = await User.findByPk(userId)
      res.status(200).json({user: user})
    } catch (error) {
      res.status(400).json(error)
    }
  },
  async update(req, res) {
    try {
      const { body, user: { userId} } = req
      let user = await User.findByPk(userId)
      user =  await user.update(body)
      res.status(200).json({user: user})
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
  },
  async updatePicture(req, res) {
    try {
      const { body, user: { userId} } = req
      let user = await User.findByPk(userId)
      user =  await user.update({picture: body.profilePicture})
      res.status(200).json(user)
    } catch (error) {
      res.status(400).json(error)
    }
  }
}
