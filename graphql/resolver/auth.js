require('dotenv').config()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../../models/users')
const {
  findUserByEmail,
  transformData
} = require('../utils')

// constants
const queryType = require('../constants/queryType')
const {USER} = queryType

const {
  SALT_ROUND,
  SECRET_KEY
} = process.env

const userResolvers = {
  createUser: async (args) => {
    const {
      email,
      password,
      firstName,
      middleName,
      lastName
    } = args.userInput

    try {
      const isUserExisting = await findUserByEmail({email})

      if (isUserExisting) {
        throw new Error('Email already in used.')
      }

      const hashedPassword = await bcrypt.hash(password, Number(SALT_ROUND))
      const user = new User({
        email,
        firstName,
        middleName,
        lastName,
        password: hashedPassword
      })

      await user.save()

      return transformData(user, USER)
    } catch (err) {
      throw err
    }
  },
  login: async (args) => {
    const {
      email,
      password
    } = args.loginInput

    const user = await findUserByEmail({email})

    if (!user) {
      throw new Error('User does not exist or incorrect email address!')
    }

    const isEqual = await bcrypt.compare(password, user.password)

    if (!isEqual) {
      throw new Error('Incorrect password!')
    }

    const token = jwt.sign({
      userId: user.id,
      email: user.email
    },
    SECRET_KEY,
    {
      expiresIn: '1h'
    })

    return {
      userId: user.id,
      token,
      tokenExpiration: 1
    }
  }
}

module.exports = userResolvers
