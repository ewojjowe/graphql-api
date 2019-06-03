const bookingSchema = `
  # Payload
  type Booking {
    _id: ID!
    event: Event!
    user: User!
    createdAt: String!
    updatedAt: String!
  }
`

module.exports = bookingSchema
