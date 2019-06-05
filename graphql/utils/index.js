// models
const Event = require('../../models/events')
const User = require('../../models/users')
const Booking = require('../../models/bookings')

const queryType = require('../constants/queryType')
const {
  USER_WITH_EVENT,
  BOOKING,
  EVENT,
  USER
} = queryType

/**
 * Convert Date to String datatype
 * @param {Object} date - the date for conversion
 * @return {<DateString>} newly converted date
 */
const dateToString = (date) => new Date(date).toISOString()

/**
 * Transform result data into desired format
 * @param {Object} data - the data to transform
 * @param {Object} type - the type of query
 * @return {<transformedData>} newly formatted data
 */
const transformData = (data, type) => {
  const {_doc} = data
  let transformedData

  switch(type) {
    case 'CANCEL_BOOKING':
      transformedData = {
        ..._doc,
        creator: userUtils.bind(this, _doc.creator)
      }
      break
    case 'BOOKING':
      transformedData = {
        ..._doc,
        user: userUtils.bind(this, _doc.user),
        event: singleEventUtils.bind(this, _doc.event),
        createdAt: dateToString(_doc.createdAt),
        updatedAt: dateToString(_doc.updatedAt)
      }
      break
    case 'EVENT':
      transformedData = {
        ..._doc,
        date: dateToString(_doc.date),
        creator: userUtils.bind(this, _doc.creator)
      }
      break
    case 'USER_WITH_EVENT':
      transformedData = {
        ..._doc,
        password: null,
        createdEvents: eventsUtils.bind(this, _doc.createdEvents)
      }
      break
    case 'USER':
      transformedData = {
        ..._doc,
        password: null
      }
      break
    default:
      transformedData = 'Case not defined.'
  }

  return transformedData
}

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
      return transformData(event, EVENT)
    })

    return result
  } catch (err) {
    throw err
  }
}

const singleEventUtils = async (eventId) => {
  try {
    const event = await Event.findById(eventId)

    return transformData(event, EVENT)
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

    return transformData(user, USER_WITH_EVENT)
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

const findBookingByIdWithEvent = async (bookingId) => {
  const booking = await Booking.findById(bookingId).populate('event')

  return booking
}

const getAllBooking = async () => {
  const booking = await Booking.find()

  return booking
}

const deleteBookindById = async (bookingId) => {
  await Booking.deleteOne({_id: bookingId})
}

module.exports = {
  findBookingByIdWithEvent,
  deleteBookindById,
  singleEventUtils,
  findEventByTitle,
  findUserByEmail,
  findBookingById,
  getAllBooking,
  transformData,
  findEventById,
  getAllEvents,
  findUserById,
  getAllUsers,
  eventsUtils,
  userUtils
}
