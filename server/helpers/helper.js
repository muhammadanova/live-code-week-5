const jwt = require('jsonwebtoken')

exports.authSign = function(user){
  return jwt.sign(user, 'secretkey')
}

exports.authVerify = function(access_token){
  return jwt.verify(access_token, 'secretkey')
}