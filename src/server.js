require("dotenv").config()
const cors = require("cors")
const morgan = require("morgan")
const express = require("express")
const { sequelize } = require("./models")
const userRouter = require("./routes/user")
const recipeRouter = require("./routes/recipe")

const port = process.env.PORT || 8000
const app = express()
sequelize.sync()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use('/users', userRouter)
app.use('/recipes', recipeRouter)

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`)
})
