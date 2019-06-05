const jwt = require('jsonwebtoken')

const {SECRET_KEY} = process.env

const isAuth = (req, res, next) => {
  const authHeader = req.get('Authorization')

  if (!authHeader) {
    req.isAuth = false
    return next()
  }

  const token = authHeader.split(' ')[1]

  if (!token || token === '') {
    req.isAuth = false
    return next()
  }

  let decodeToken

  try {
    decodeToken = jwt.verify(token, SECRET_KEY)
  } catch (err) {
    req.isAuth = false
    return next()
  }

  req.isAuth = true
  req.userId = decodeToken.userId
  next()
}

module.exports = isAuth
