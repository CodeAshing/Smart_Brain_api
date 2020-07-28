const express=require('express')
const bodyParser=require('body-parser')
const bcrypt=require('bcrypt-nodejs')
const cors=require('cors')
const knex=require('knex')
const { handleRegister } = require('./controllers/register')
const { imageHandler, handleApiCall } = require('./controllers/image')
const { signInHandler } = require('./controllers/signin')
const { profileHandler } = require('./controllers/profile')

const db=knex({
    client: 'pg',
    connection: {
      connectString :'postgres://npwmxcviuadgtf:c9872aff8add4d2209d9ee270aebf703323fb2e115ab1146a94b63e0c4b06114@ec2-34-225-162-157.compute-1.amazonaws.com:5432/d18lscnm89p3cv',
      ssl:true,
    }
  });

const app=express()

app.use(bodyParser.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.send('its working')
})
app.post('/signin',signInHandler(db,bcrypt))
app.post('/register',handleRegister(bcrypt,db))
app.get('/profile/:id',profileHandler(db))
app.put('/image', imageHandler(db)) 
app.post('/imageUrl', (req,res)=> handleApiCall(req,res))    

app.listen(process.env.PORT || 3001 ,()=>{
    console.log(`I am running!!! on ${process.env.PORT}`)
})