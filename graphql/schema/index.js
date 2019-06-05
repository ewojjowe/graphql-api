const {buildSchema} = require('graphql')

const eventSchema = require('./event')
const userSchema = require('./user')
const bookingSchema = require('./booking')

const graphQlSchema = buildSchema(`
  ${bookingSchema}
  ${eventSchema}
  ${userSchema}

  # Root Queries
  type RootQuery {
    events: [Event!]!
    bookings: [Booking!]!
    login(loginInput: LoginInput): AuthData!
  }

  # Root Mutation
  type RootMutation {
    createEvent(eventInput: EventInput): Event
    createUser(userInput: UserInput): User
    bookEvent(eventId: ID!): Booking!
    cancelBooking(bookingId: ID!): Event!
  }

  # Overall Schema
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`)

module.exports = graphQlSchema
