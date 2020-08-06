const handleRegister=(bcrypt,db)=>(req,res)=>{    
    const {email,name,password}=req.body
    if(!email || !name || !password){
        res.status(400).json('Incorrect form submission')
    }else{
        const hash =bcrypt.hashSync(password)    
        db.transaction(trx=>{
            trx.insert({
                hash:hash,
                email:email
            })
            .into('login')
            .returning('email')
            .then(loginEmail=>{
                console.log('1',loginEmail[0])               
                 trx('users')
                .returning('*')
                .insert({
                    email:loginEmail[0],
                    name:name,
                    joined:new Date()
                })    
                .then(user=>{ 
                    console.log('2',user)   
                    res.json(user[0])
                })
                .catch(err=> res.status(400).json(err))
            })
            .then(trx.commit)
            .catch(trx.rollback)        
        }) 
        .catch(err=> res.status(400).json('unable to register'))
    }
}

module.exports={
    handleRegister:handleRegister
}