const crypto = require('crypto');
const dbClient = require('../utils/db');

const postNew = (async (req, res) => {
  if (!req.body.email) {
    return res.status(400).send('Missing email');
  } else if (!req.body.password) {
    return res.status(400).send('Missing password');
  } else {
    const { email, password } = req.body;
    const userfound = await dbClient.userFound(email);
    if (userfound) {
      return res.status(400).send('Already exist');
    } else {
      const hashedPassword = crypto.createHash('sha1').update(password).digest('hex');
      const user = await dbClient.addUser(email, hashedPassword);
      const userInfo = { user_id: user._id, user_email: user.email };
      return res.status(201).send(userInfo);
    }
  }
});

const getMe = (req, res) => {
    res.status(200).send('I am me');
}

module.exports = { postNew, getMe };
