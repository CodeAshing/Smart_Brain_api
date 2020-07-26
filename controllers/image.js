const clarifai=require('clarifai')
const { handleRegister } = require('./register')
const { json } = require('body-parser')

const app=new Clarifai.App({
    apiKey:'3a879ad121ef4d19b77a4b0d465a18f1'
  })

const handleApiCall=(req,res)=>{
      app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
      .then(data=>{
          res.json(data)
      })
      .catch(error=>res.status(400).json('unable to work with api'))
}
const imageHandler=(db)=>(req,res)=>{
    const {id}=req.body
    db('users')
    .where('id', '=', id)
    .increment('entries',1)
    .returning('entries')
    .then(entries=>res.json(entries[0]))
    .catch(error=>res.status(400).json(`Can't get entries`))
}
module.exports={
    imageHandler:imageHandler,
    handleApiCall:handleApiCall
}