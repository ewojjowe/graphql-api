require('dotenv').config()

const bcrypt = require('bcryptjs')

const User = require('../../models/users')

const {findUserByEmail} = require('../../utils')

const {SALT_ROUND} = process.env

const userResolvers = {
  createUser: async (args) => {
    const {
      email,
      password
    } = args.userInput

    try {
      const isUserExisting = await findUserByEmail({email})

      if (isUserExisting) {
        throw new Error('Email already in used.')
      }

      const hashedPassword = await bcrypt.hash(password, Number(SALT_ROUND))
      const user = new User({
        email,
        password: hashedPassword
      })

      await user.save()

      return {
        ...user._doc,
        password: null
      }
    } catch (err) {
      throw err
    }
  }
}

module.exports = userResolvers
