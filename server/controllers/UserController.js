const { User } = require('../models')
const helper = require('../helpers/helper')

class UserController {
  static doLogin(req, res, next){
    let objData = {
      email: req.body.email,
      password: req.body.password
    }
    User.findOne({
      where: {
        email : objData.email
      }
    })
    .then(user => {
      if(user){
        let objUser = {
          id: user.id,
          email: user.email
        }
        const token = helper.authSign(objUser, 'secretkey')
        res.status(200).json({ access_token : token })
      }else{
        next({
          statusCode: 400,
          message: "Email or password wrong"
        })
      }
    })
    .catch(err => {
      next(err)
    })
  }

  static doRegister(req, res, next){
    let objData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }
    User.findOne({
      where: {
        email: objData.email
      }
    })
    .then(user => {
      if(!user){
        return User.create(objData)
      }else{
        let objUser = {
          id: user.id,
          email: user.email
        }
        const token = helper.authSign(objUser, 'secretkey')
        res.status(200).json({ Token : token })
      }
    })
    .then(newuser => {
      res.status(200).json(newuser)
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = UserController