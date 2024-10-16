const crypto = require('crypto');
const dbClient = require('../utils/db');

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).send({ error: 'Missing email' });
    }
    if (!password) {
      return res.status(400).send({ error: 'Missing password' });
    }
    const userfound = await dbClient.userFound(email);
    if (userfound) {
      return res.status(400).send({ error: 'Already exist' });
    }
    const hashedPassword = crypto.createHash('sha1').update(password).digest('hex');
    const user = await dbClient.addUser(email, hashedPassword);
    const userInfo = { id: user._id, email: user.email };
    return res.status(201).send(userInfo);
  }

  static async getMe(req, res) {
    res.status(200).send('I am me');
  }
}

export default UsersController;
