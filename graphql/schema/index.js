const {buildSchema} = require('graphql')

const eventSchema = require('./event')
const userSchema = require('./user')

const schema = buildSchema(`
  ${eventSchema}
  ${userSchema}

  type RootQuery {
    events: [Event!]!
    users: [User!]!
  }

  type RootMutation {
    createEvent(eventInput: EventInput): Event
    createUser(userInput: UserInput): User
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`)

module.exports = schema
