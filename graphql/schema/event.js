const eventSchema = `
  # Input Schema
  input EventInput {
    title: String!
    description: String!
    price: Float!
    date: String!
  }

  # Payload
  type Event {
    _id: ID!
    title: String!
    description: String!
    price: Float!
    date: String!
    creator: User!
  }
`

module.exports = eventSchema
