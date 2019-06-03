// models
const Event = require('../../models/events')

// Utils
const {
  getAllEvents,
  userUtils,
  findUserById
} = require('../../utils')

const eventResolvers = {
  events: async () => {
    try {
      const events = await getAllEvents()
      const result = events.map(async (event) => {
        const {_doc} = event

        return {
          ..._doc,
          date: new Date(_doc.date).toISOString(),
          creator: userUtils.bind(this, _doc.creator)
        }
      })

      return result
    } catch (err) {
      throw err
    }
  },
  createEvent: async (args) => {
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
        creator: '5cf3dfc44dff4835ee143294'
      })

      const user = await findUserById('5cf3dfc44dff4835ee143294')

      if (!user) {
        throw new Error('Please Login')
      }

      const result = await event.save()

      user.createdEvents.push(event)
      await user.save()

      return {
        ...result._doc,
        creator: userUtils.bind(this, user.id)
      }
    } catch (err) {
      throw err
    }
  }
}

module.exports = eventResolvers
