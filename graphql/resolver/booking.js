// models
const Booking = require('../../models/bookings')

// Utils
const {
  deleteBookindById,
  singleEventUtils,
  findBookingByIdWithEvent,
  findEventById,
  getAllBooking,
  userUtils
} = require('../../utils')

const eventResolvers = {
  bookings: async () => {
    try {
      const bookings = await getAllBooking()
      const result = bookings.map(async (booking) => {
        const {_doc} = booking
        console.log(_doc)

        return {
          ..._doc,
          user: userUtils.bind(this, _doc.user),
          event: singleEventUtils.bind(this, _doc.event),
          createdAt: new Date(_doc.createdAt).toISOString(),
          updatedAt: new Date(_doc.updatedAt).toISOString()
        }
      })

      return result
    } catch (err) {
      throw err
    }
  },
  bookEvent: async (args) => {
    const {eventId} = args

    try {
      const fetchEvent = await findEventById(eventId)
      const booking = new Booking({
        user: '5cf3dcda18aa3035afb2373e',
        event: fetchEvent
      })
      const result = await booking.save()

      return {
        ...result._doc,
        user: userUtils.bind(this, result._doc.user),
        event: singleEventUtils.bind(this, result._doc.event),
        createdAt: new Date(result._doc.createdAt).toISOString(),
        updatedAt: new Date(result._doc.updatedAt).toISOString()
      }
    } catch (err) {
      throw err
    }
  },
  cancelBooking: async (args) => {
    const {bookingId} = args
    try {
      const booking = await findBookingByIdWithEvent(bookingId)
      console.log(booking)
      const event = {
        ...booking.event._doc,
        creator: userUtils.bind(this, booking.event._doc.creator)
      }

      await deleteBookindById(bookingId)
      return event
    } catch (err) {
      throw err
    }
  }
}

module.exports = eventResolvers
