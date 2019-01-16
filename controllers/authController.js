const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');

function login(req, res, next) {
  User.findOne({ email: req.body.email })
    .then(user => {
      if(!user || !user.validatePassword(req.body.password)) {
        return res.status(401).json({ message: 'Unauthorised' });
      }
      // user validation succeeded
      createAndSendToken(user, res, `Welcome back ${user.username}`);

    })
    .catch(next);
}

function register(req, res, next) {
  User.create(req.body)
    .then(user => createAndSendToken(user, res, `user has successfully registered ${user.email}`))
    .catch(next);
}

function createAndSendToken(user, res, message) {
  const token = jwt.sign({ sub: user._id, username: user.username }, secret, { expiresIn: '6h'});
  res.json({ message , token});
}

module.exports = {
  login,
  register
};
