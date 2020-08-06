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
      connectionString : process.env.DATABASE_URL,
      ssl:{
        rejectUnauthorized: false
      }
    }
  });

const app=express()

app.use(bodyParser.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.send('its working')
})
app.post('/signin',signInHandler(db,bcrypt))
app.post('/register',(req,res)=>{ handleRegister(req,res,bcrypt,db)})
app.get('/profile/:id',profileHandler(db))
app.put('/image', imageHandler(db)) 
app.post('/imageUrl', (req,res)=> handleApiCall(req,res))    

app.listen(process.env.PORT || 3001 ,()=>{
    console.log(`I am running!!! on ${process.env.PORT}`)
})