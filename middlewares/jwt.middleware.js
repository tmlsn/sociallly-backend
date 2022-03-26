const jwt = require('express-jwt')
const dotenv = require('dotenv')
dotenv.config()

// variable to hold the authentication state
const isAuthenticated = jwt({
  // sectret jwt key
  secret: process.env.JWT_SECRET,
  // jwt alroithm
  algorithms: ['HS256'],
  // where the data is
  requestProperty: 'payload',
  // function to get the jwt from the request
  getToken: (req) => {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      const token = req.headers.authorization.split(' ')[1]
      return token
    } else {
      return null
    }
  },
})

module.exports = {
  isAuthenticated,
}
