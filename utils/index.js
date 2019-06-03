// models
const Event = require('../models/events')
const User = require('../models/users')
const Booking = require('../models/bookings')

/**
 * Retrieve an event based on a set of condition/s
 * @param {Object} where - where condition for query
 * @return {Promise<Event>} promise to an event object
 */
const getEventWhere = async (where) => {
  const event = await Event.findOne(where)

  return event
}

const eventsUtils = async (eventIds) => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } })
    const result = events.map(event => {
      return {
        ...event._doc,
        date: new Date(event._doc.date).toISOString(),
        creator: userUtils.bind(this, event.creator)
      }
    })

    return result
  } catch (err) {
    throw err
  }
}

const singleEventUtils = async (eventId) => {
  try {
    const event = await Event.findById(eventId)

    return {
      ...event._doc,
      date: new Date(event._doc.date).toISOString(),
      creator: userUtils.bind(this, event.creator)
    }
  } catch (err) {
    throw err
  }
}

const findEventById = async eventId => {
  try {
    return await Event.findById(eventId)
  } catch (err) {
    throw err
  }
}

const findEventByTitle = (title) => {
  return getEventWhere(title)
}

const getAllEvents = async () => {
  const events = await Event.find()

  return events
}

/**
 * Retrieve a user based on a set of condition/s
 * @param {Object} where - where condition for query
 * @return {Promise<User>} promise to a user object
 */
const getUserWhere = async (where) => {
  const user = await User.findOne(where)

  return user
}

const userUtils = async userId => {
  try {
    const user = await User.findById(userId)

    return {
      ...user._doc,
      createdEvents: eventsUtils.bind(this, user._doc.createdEvents)
    }
  } catch (err) {
    throw err
  }
}

const findUserById = async userId => {
  try {
    return await User.findById(userId)
  } catch (err) {
    throw err
  }
}

const findUserByEmail = (email) => {
  return getUserWhere(email)
}

const getAllUsers = async () => {
  const users = await User.find()

  return users
}

/**
 * Retrieve a booking based on a set of condition/s
 * @param {Object} where - where condition for query
 * @return {Promise<Booking>} promise to a booking object
 */
const getBookingWhere = async (where) => {
  const booking = await Booking.findOne(where)

  return booking
}

const findBookingById = async (bookingId) => {
  try {
    return await Booking.findById(bookingId)
  } catch (err) {
    throw err
  }
}

const getAllBooking = async () => {
  const booking = await Booking.find()

  return booking
}

module.exports = {
  singleEventUtils,
  findEventByTitle,
  findUserByEmail,
  findBookingById,
  findEventById,
  getAllBooking,
  getAllEvents,
  findUserById,
  getAllUsers,
  eventsUtils,
  userUtils
}
