const {buildSchema} = require('graphql')

const eventSchema = require('./event')
const userSchema = require('./user')

const graphQlSchema = buildSchema(`
  ${eventSchema}
  ${userSchema}

  # Root Queries
  type RootQuery {
    events: [Event!]!
  }

  # Root Mutation
  type RootMutation {
    createEvent(eventInput: EventInput): Event
    createUser(userInput: UserInput): User
  }

  # Overall Schema
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`)

module.exports = graphQlSchema
