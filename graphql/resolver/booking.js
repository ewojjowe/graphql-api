// models
const Booking = require('../../models/bookings')

// Utils
const {
  deleteBookindById,
  findBookingByIdWithEvent,
  findEventById,
  getAllBooking,
  transformData
} = require('../utils')

// constants
const queryType = require('../constants/queryType')
const {
  CANCEL_BOOKING,
  BOOKING
} = queryType

const eventResolvers = {
  bookings: async (args, req) => {
    const {isAuth} = req

    if (!isAuth) {
      throw new Error('Not Authenticated!')
    }

    try {
      const bookings = await getAllBooking()
      const result = bookings.map(async (booking) => {
        return transformData(booking, BOOKING)
      })

      return result
    } catch (err) {
      throw err
    }
  },
  bookEvent: async (args, req) => {
    const {
      userId,
      isAuth
    } = req

    if (!isAuth) {
      throw new Error('Not Authenticated!')
    }

    const {eventId} = args

    try {
      const fetchEvent = await findEventById(eventId)
      const booking = new Booking({
        user: userId,
        event: fetchEvent
      })
      const result = await booking.save()

      return transformData(booking, BOOKING)
    } catch (err) {
      throw err
    }
  },
  cancelBooking: async (args, req) => {
    const {isAuth} = req

    if (!isAuth) {
      throw new Error('Not Authenticated!')
    }

    const {bookingId} = args
    try {
      const booking = await findBookingByIdWithEvent(bookingId)
      const event = transformData(booking.event, CANCEL_BOOKING)

      await deleteBookindById(bookingId)

      return event
    } catch (err) {
      throw err
    }
  }
}

module.exports = eventResolvers
