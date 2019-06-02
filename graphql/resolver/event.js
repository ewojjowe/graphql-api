// models
const Event = require('../../models/events')

// Utils
const {findAllEvents} = require('../../utils/event')
const {findUserByID} = require('../../utils/user')

const eventResolvers = {
  events: async () => {
    try {
      const events = await findAllEvents()

      return events.map((event) => {
        const {_doc} = event
        const creator = findUserByID(_doc.creator)

        return {..._doc, creator}
      })
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
        creator: '5cf392499d5aa53154ff3010'
      })

      const user = await findUserByID('5cf392499d5aa53154ff3010')

      if (!user) {
        throw new Error('Please Login')
      }

      const result = await event.save()

      user.createdEvents.push(event)
      await user.save()

      return {
        ...result._doc,
        creator: {...user._doc}
      }
    } catch (err) {
      throw err
    }
  }
}

module.exports = eventResolvers
