
const mongoose = require('mongoose');
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const bcrypt = require('bcrypt')
require("./User");

const User = mongoose.model("user")

app.use(bodyParser.json())

const mongoUri = 'mongodb+srv://admin:admin@cluster0.jbcb7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
  console.log('Connected to Mongo instance')
})
mongoose.connection.on('error', (err) => {
  console.log('Error connecting to Mongo', err)
});

app.get('/', (req, res) => {
    res.send('Hi there');
  
});

app.post('/',(req,res) => {
    const {username,password} = req.body
    const user = new User({username,password});
    user.save()
    .then(data =>{
        console.log(data)
        res.send(data)
    }).catch(err => {
        console.log(err)
    })
})

app.post('/signin',async (req,res) => {
    const {username,password} = req.body
    if(!username || !password) {
        return res.status(422).send({error:"Must provide username or password"})
    }
    const user = await User.findOne({username})
    console.log(user.password)
    if(!user) {
        return res.status(422).send({error:"Must provide valid username"})
    }
    try {
      if (user && password === user.password) {
        console.log("Login success")
        res.status(200).send({body:"Login success"})
      }
      else {
        res.status(404).send({error:"Invalid login"})
        console.log("Login failed")
      }
    }catch(err) {
        console.log(err)
    }
    
    /*try {
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
          return res.status(422).send({error:"Invalid"})
        }
        res.send(data)
      }catch(err) {
        console.log(err)
      }
      */
    
})

app.listen(3000, () => {
  console.log('Listening on port 3000');
})
