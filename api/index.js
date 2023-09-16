const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const app = express();
const User = require('./models/User');
const Post = require('./models/Post');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');


// hash password
const salt = bcrypt.genSaltSync(10);
const secret = 'sjkdajshdhhskksasdhsdfads'


app.use(cors({credentials:true, origin:'http://localhost:5173'}));
app.use(express.json());
app.use(cookieParser());

app.use('/uploads', express.static(__dirname + '/uploads'));

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
});

// GET user profile using provided token
app.get('/profile', (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

// GET user profile and posts
app.get('/user/profile', async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;

    try {
      const user = await User.findById(info.id);
      const userPosts = await Post.find({ author: info.id });
      res.json({ user, userPosts });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'An error occurred' });
    }
  });
});

// PUT user profile update
app.put('/user/profile', async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;

    try {
      const { actualName } = req.body;
      const updatedUser = await User.findByIdAndUpdate(
        info.id,
        { actualName },
        { new: true }
      );
      res.json(updatedUser);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'An error occurred' });
    }
  });
});

app.put('/user/profile-info', uploadMiddleware.single('profilePicture'), async (req, res) => {
  try {
    // Verify the token and retrieve user info
    const { token } = req.cookies;
    const info = jwt.verify(token, secret); // Verify without options

    const { description } = req.body;

    // Handle file upload for profile picture
    let newProfilePicturePath = null;
    if (req.file) {
      const { path, originalname } = req.file;
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];
      newProfilePicturePath = path + '.' + ext;
      await fsPromises.rename(path, newProfilePicturePath); // Use fs.promises.rename
    }

    // Update user profile information
    const updatedUser = await User.findByIdAndUpdate(
      info.id,
      { profilePicture: newProfilePicturePath, description },
      { new: true }
    );
    
    res.json(updatedUser);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json('An error occurred.');
  }
});



app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split('.');
  const ext = parts[parts.length - 1];
  const newPath = path + '.' + ext;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id,
    });
    res.json(postDoc);
  });

});

const fsPromises = require('fs').promises; // Import fs.promises

app.put('/post', uploadMiddleware.single('file'), async (req, res) => {
  try {
    let newPath = null;

    // Handle file upload
    if (req.file) {
      const { originalname, path } = req.file;
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];
      newPath = path + '.' + ext;
      await fsPromises.rename(path, newPath); // Use fs.promises.rename
    }

    // Verify the token and retrieve user info
    const { token } = req.cookies;
    const info = jwt.verify(token, secret); // Verify without options
    const { id, title, summary, content } = req.body;

    // Find the post document and check if the user is the author
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);

    if (!isAuthor) {
      return res.status(400).json('You are not the author.');
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        title,
        summary,
        content,
        cover: newPath ? newPath : postDoc.cover,
      },
      { new: true } // To get the updated document after the update
    );

    res.json(updatedPost);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json('An error occurred.');
  }
});

app.delete('/post/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
});



app.get('/post/times/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
});



app.get('/post', async (req, res) => {
  res.json(
    await Post.find()
      .populate('author', ['username'])
      .sort({ createdAt: -1 })
      .limit(20)
  );
});

app.get('/post/:id', async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate('author', ['username']);
  res.json(postDoc);
})


app.listen(4000);
