const bcrypt = require('bcryptjs')

// models
const User = require('../../models/users')

// Utils
const {findEventById} = require('../../utils/event')
const {
  findAllUsers,
  findUserByEmail
} = require('../../utils/user')

const userResolvers = {
  users: async () => {
    try {

      const users = await findAllUsers()

      return users.map((user) => {
        const {_doc} = user
        const createdEvents = _doc.createdEvents.map(async (eventId) => {
          return await findEventById(eventId)
        })

        return {..._doc, createdEvents}
      })
    } catch (err) {
      throw err
    }
  },
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

      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new User({
        email,
        password: hashedPassword
      })

      return await user.save()
    } catch (err) {
      throw err
    }
  }
}

module.exports = userResolvers
