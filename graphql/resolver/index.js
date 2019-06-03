const eventResolvers = require('./event')
const userResolvers = require('./user')
const bookingResolvers = require('./booking')

const graphQlResolver = {
  ...bookingResolvers,
  ...eventResolvers,
  ...userResolvers
}

module.exports = graphQlResolver
