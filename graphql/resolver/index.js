const eventResolvers = require('./event')
const userResolvers = require('./user')

const graphQlResolver = {
  ...eventResolvers,
  ...userResolvers
}

module.exports = graphQlResolver
