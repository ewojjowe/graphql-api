// models
const Event = require('../../models/events')

// Utils
const {
  transformData,
  getAllEvents,
  findUserById,
} = require('../utils')

// constants
const queryType = require('../constants/queryType')
const {EVENT} = queryType

const eventResolvers = {
  events: async (args, req) => {
    const {isAuth} = req

    if (!isAuth) {
      throw new Error('Not Authenticated!')
    }

    try {
      const events = await getAllEvents()
      const result = events.map(async (event) => {
        return transformData(event, EVENT)
      })

      return result
    } catch (err) {
      throw err
    }
  },
  createEvent: async (args, req) => {
    const {
      userId,
      isAuth
    } = req

    if (!isAuth) {
      throw new Error('Not Authenticated!')
    }

    const {
      title,
      description,
      price,
      date
    } = args.eventInput

    try {
      const event = new Event({
        title,
        description,
        price: +price,
        date: new Date(date),
        creator: userId
      })

      const user = await findUserById(userId)

      if (!user) {
        throw new Error('Please Login')
      }

      const result = await event.save()

      user.createdEvents.push(event)
      await user.save()

      return transformData(event, EVENT)
    } catch (err) {
      throw err
    }
  }
}

module.exports = eventResolvers
