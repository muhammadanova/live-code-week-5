const helper = require('../helpers/helper')

exports.verifyToken = function(req, res, next){
  try{
    if(req.headers.access_token){
      let userToken = helper.authVerify(req.headers.access_token)
      if(userToken){
        req.user = userToken
        next()
      }
    }else{
      next({
        statusCode: 402,
        message: "Access token is invalid"
      })
    }
  }
  catch(err){
    next(err)
  }
}