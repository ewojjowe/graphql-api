const userSchema = `
  # Input
  input UserInput {
    email: String!
    password: String!
  }

  # Payload
  type User {
    _id: ID!
    email: String!
    password: String
    createdEvents: [Event!]
  }
`

module.exports = userSchema
