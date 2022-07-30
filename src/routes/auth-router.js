const express = require(`express`);
const jwt = require(`jsonwebtoken`);
const UserData = require(`../model/user-model`);

const authRouter = express.Router();


authRouter.get(`/`, (req, res)=> {
  res.send(`Hi I'm listening at /auth`);
});

authRouter.post(`/signin`, (req, res)=> {
  // console.log(`POST: /signin - auth-router.js:12`, req.body);
  var userName = req.body.userName.trim();
  var passWord = req.body.passWord.trim();

  UserData.find({'userName': userName})
    .then((user)=> {
      // console.log('auth-router.js:16 - succ', succ[0].userName);
      if(user.length == 0) {
        res.status(200).json({
          status: false,
          result: 'User Not found'
        });
      } else if(user[0].passWord != passWord) {
        res.status(200).json({
          status: false,
          result: `Invalid Password`        
        });
      } else {
        let payload = { subject: userName + passWord}
        let token = jwt.sign(payload, `secretKey`);
        res.status(200).json({
          status: true,
          result: `Authenticated User` ,
          token: token
        });
      }
    }).catch((err)=> {
      console.log('auth-router.js:16 - err', err);
    });
});

authRouter.post(`/signup`, (req, res)=> {
  // console.log(`POST: /signup - auth-router.js:16`, req.body);

  var newUser = {
    fullName : req.body.fullName.trim(),
    userName : req.body.userName.trim(),
    passWord : req.body.passWord.trim()
  }

  const NewUser = new UserData(newUser)
  NewUser.save()
    .then((user)=> {
      console.log(`SUCCESS: (User SignUp) --> ${user.userName}`);
      res.json({
        status: true,
        userId: user._id,
        endpoint: '/api/auth/signup',
        result: `Successfully added ${user.userName}`
      });
    })
    .catch((error)=> {
      console.log('ERROR: (User SignUp) -->', error.code);
      res.json({
        status: false,
        result: `${error.code==11000 ? 'Username already exists' : 'Add user failed'}`,
        endpoint: '/api/auth/signup',
        error: error.code
      });
    });
});

module.exports = authRouter;