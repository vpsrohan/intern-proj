import User from "../models/userModel.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  })
}

const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.login(email, password)

    const token = createToken(user._id)

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    })

    res.status(200).json({ user: user._id })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const signup = async (req, res) => {
  const { email, password, username, rating, bio, previousCompanies } = req.body
  let profilePicture = ''
  if (req.file) {
    profilePicture = req.file.path
  }

  try {
      const user = await User.signup(email, password, username, profilePicture, rating, bio, previousCompanies)
  
      const token = createToken(user._id)
  
      res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24,
      })
  
      res.status(201).json({ user: user._id })
  } catch (error) {
      res.status(400).json({ error: error.message })
  }
}

export { login, signup }