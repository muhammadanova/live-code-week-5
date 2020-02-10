exports.client = function(err, req, res, next){
  try{
    let newError = new Error
    switch(err.name){
      case 'SequelizeDatabaseError':
        next(err)
        break
      case 'SequelizeValidationError':
        newError.statusCode = 401
        newError.message = {}
        err.error.map(el => {
          newError.message[el.path] = el.message
        })
        throw newError
      default: 
        newError.statusCode = err.statusCode
        newError.message = {
          message: err.message
        }
        throw newError
    }
  }
  catch(err){
    res.status(err.statusCode || 402).json(err.message || err)
  }
}

exports.server = function(err, req, res, next){
  res.status(500).json({
    message: "Error not found"
  })
}