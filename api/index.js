const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const User = require('./modals/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');


// hash password
const salt = bcrypt.genSaltSync(10);
const secret = 'sjkdajshdhhskksasdhsdfads'


app.use(cors({credentials:true, origin:'http://localhost:5173'}));
app.use(express.json());
app.use(cookieParser());

// Connect to mongo
mongoose.connect('mongodb+srv://eclarkhalid:machipo12@cluster0.gjr7jtf.mongodb.net/?retryWrites=true&w=majority');

// handle registration
app.post('/register', async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const userDoc = await User.create({
      email,
      username,
      password:bcrypt.hashSync(password, salt),
    })
    res.json(userDoc);
  } catch (e) {
    res.status(400).json(e);
  }
});

// handle login
app.post('/login', async (req, res) => {
  const {username, password } = req.body;

  const userDoc = await User.findOne({username});
  const passOk = bcrypt.compareSync(password, userDoc.password);

  if (passOk) {
    jwt.sign({
      username,
      id:userDoc._id
    }, 
    secret, {}, (err,token) =>{
      if (err) throw err;
      res.cookie('token', token).json('ok');
    }
    )
  } else {
    res.status(400).json('Wrong details')
  }
});

// profile

app.get('/profile', (req,res) => {
  const {token} = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  })
  res.json(req.cookies)
})

// logout
app.post('/logout', (req,res) => {
  res.cookie('token', '').json('ok');
})


app.listen(4000);
