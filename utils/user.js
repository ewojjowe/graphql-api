// model
const User = require('../models/users')

const getUserWhere = async (where) => {
  const user = await User.findOne({where})

  return user
}

const findUserByID = async (userId) => {
  const user = await User.findById(userId)

  return user
}

const findUserByEmail = (email) => {
  return getUserWhere({email})
}

const findAllUsers = async () => {
  const users = await User.find()

  return users
}

module.exports = {
  findUserByID,
  findUserByEmail,
  findAllUsers
}
