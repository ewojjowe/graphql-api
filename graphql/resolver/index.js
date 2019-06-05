const eventResolvers = require('./event')
const userResolvers = require('./auth')
const bookingResolvers = require('./booking')

const graphQlResolver = {
  ...bookingResolvers,
  ...eventResolvers,
  ...userResolvers
}

module.exports = graphQlResolver
