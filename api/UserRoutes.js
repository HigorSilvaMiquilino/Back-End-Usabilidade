const router = require('express').Router()
const User = require('../models/User')

router.get('/',(req,res)=>{
    User.find({isServiceProvider:true}).then(users =>{
        res.status(200).json(users)
    }).catch(err => {
        res.status(500).json({error: err.message})
    })
})

router.post('/register', async (req,res)=>{
    if(await userExists(req.body.email)){
        res.status(409).json({error:'Emal already exists'})
    }else{
        const newUser = new User(req.body)
        newUser.save().then(user => {
            res.status(201).json(user)
        }).catch(err =>{
            res.status(500).json({error: err.message})
        })
    }

})



router.post('/login',(req,res)=>{
    User.findOne({email:req.body.email, password:req.body.password}).then(user =>{
        if(user){
            res.status(200).json(user)
        }else{
            res.status(401).json({error:'Incorrect Email or Password'})
        }

    }).catch(err =>{
        res.status(500).json({error: err.message})
    })
})

router.delete('/delete/:firstName', (req, res) => {
    const firstName = req.params.firstName;
  
    User.deleteOne({ firstName: firstName })
      .then(result => {
        if (result.deletedCount > 0) {
          res.status(200).json({ message: 'User deleted successfully' });
        } else {
          res.status(404).json({ error: 'User not found' });
        }
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  router.put('/put/:firstName', (req, res) => {
    const firstName = req.params.firstName;
    const updatedUser = req.body;
  
    User.findOneAndUpdate({ firstName: firstName }, updatedUser, { new: true })
      .then(user => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ error: 'User not found' });
        }
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
  
  router.get('/get/:firstName', async (req, res) => {
    const firstName = req.params.firstName;
  
    try {
      const user = await User.findOne({ firstName: firstName }).exec();
      if (!user) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.status(200).json(user);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

  
const userExists = async (email) =>{
  const user = await User.findOne({email: email.toLowerCase().trim()})

  if(user){
    return true
  }else {
    return false
  }
}

module.exports = router