const jwt = require('express-jwt');
const dotenv = require('dotenv');

const isAuthenticated = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    requestProperty: "payload",
    getToken: (req) => {
        if(
            req.headers.authorization &&
            req.headers.authorization.split(' ')[0] === 'Bearer'
        ) {
            const token = req.headers.authorization.split(' ')[1]
            return token
        } else {
            return null
        }
    }
})

module.exports = {
    isAuthenticated,
}