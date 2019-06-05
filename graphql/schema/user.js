const userSchema = `
  # Input Create User
  input UserInput {
    email: String!
    password: String!
    firstName: String!
    middleName: String!
    lastName: String!
  }

  # Input Login User
  input LoginInput {
    email: String!
    password: String!
  }

  # Payload Create User
  type User {
    _id: ID!
    email: String!
    password: String
    firstName: String!
    middleName: String!
    lastName: String!
    createdEvents: [Event!]
  }

  # Payload Login User
  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }
`

module.exports = userSchema
