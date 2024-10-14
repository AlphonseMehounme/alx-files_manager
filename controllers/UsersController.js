const crypto = require('crypto');
const dbClient = require('../utils/db');

const postNew = (async (req, res) => {
  if (!req.body.email) {
    //const er = new Error('Missing email');
    return res.status(400).send({ error: 'Missing email' });
    
  }
  if (!req.body.password) {
    return res.status(400).send('Missing password');
  }
  const { email, password } = req.body;
  const userfound = await dbClient.userFound(email);
  if (userfound) {
    return res.status(400).send('Already exist');
  } 
  const hashedPassword = crypto.createHash('sha1').update(password).digest('hex');
  const user = await dbClient.addUser(email, hashedPassword);
  const userInfo = { id: user._id, email: user.email };
  return res.status(201).send(userInfo);
});

const getMe = (req, res) => {
    res.status(200).send('I am me');
}

module.exports = { postNew, getMe };
