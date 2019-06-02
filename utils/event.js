// model
const Event = require('../models/events')

const getEventWhere = async (where) => {
  const event = await Event.findOne({where})

  return event
}

const findEventById = async (eventId) => {
  const event = await Event.findById(eventId)

  return event
}

const findEventByTitle = (title) => {
  return getEventWhere({title})
}

const findAllEvents = async () => {
  const events = await Event.find()

  return events
}

module.exports = {
  findAllEvents,
  findEventByTitle,
  findEventById
}
