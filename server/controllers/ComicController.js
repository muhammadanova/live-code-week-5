const { Comic } = require('../models')

class ComicController {
  static getListComic(req, res, next){
    Comic.findAll()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      next(err)
    })
  }

  static detailComic(req, res, next){
    let id_comic = Number(req.params.id)
    Comic.findByPk(id_comic)
    .then(result => {
      if(result){
        res.status(200).json(result)
      }else{
        next({
          statusCode: 400,
          message: "Comic not found"
        })
      }
    })
    .catch(err => {
      next(err)
    })
  }

  static updateComic(req, res, next){
    let objUpdate = {
      title: req.body.title,
      author: req.body.author,
      imageUrl: req.body.imageUrl
    }
    let id_comic = Number(req.params.id)
    Comic.findByPk(id_comic)
    .then(result => {
      if(result){
        return result.update(objUpdate, { returning : true })
      }else{
        next({
          statusCode: 400,
          message: "Comic not found"
        })
      }
    })
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = ComicController