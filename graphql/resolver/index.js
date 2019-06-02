const eventResolvers = require('./event')
const userResolvers = require('./user')

const resolver = {
  ...eventResolvers,
  ...userResolvers
}

module.exports = resolver
