const { hash } = require("bcrypt-nodejs")

const signInHandler=(db,bcrypt)=>(req,res)=>{
    const {email,password}=req.body
    if(!email  || !password){
        res.status(400).json('Incorrect form submission')
    }else{
        // db.select('email','hash').from('login')
        // .where('email','=', email)
        // .then(data=>{
        //     const isValid=bcrypt.compareSync( password,data[0].hash)
        //     if(isValid){
        //         return db.select('*').from('users')
        //         .where('email','=',req.body.email)
        //         .then(user=>{
        //             res.json(user[0])
        //         })
        //         .catch(err=> res.status(400).json('unable to get user'))
        //     }else{
        //         res.status(400).json('Wrong credentials')
        //     }
        // })
        // .catch(err=>res.status(400).json('Wrong '))
        console.log('here 1',email,password)

        db.select('*').from('login')
        .where(
            'email',email
        ).then(data=>{
            console.log('here 2')
            return db.select('*').from('users')
                    .where('email','=',email)
                    .then(user=>{
                     console.log('here 3')
                        res.json(user[0])
                    })
                    .catch(err=> res.status(400).json('unable to get user'))
                })
                .catch(err=> res.status(400).json(err))
    }
}
module.exports={
    signInHandler:signInHandler
}