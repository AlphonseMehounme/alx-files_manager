import { ObjectId } from 'mongodb';

const crypto = require('crypto');
const dbClient = require('../utils/db');
const redisClient = require('../utils/redis');

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
    const userObj = { userId: null, key: null };
    const xToken = req.header('X-Token');
    if (!xToken) {
      return res.status(401).send({ error: 'Unauthorized' });
    }
    userObj.key = `auth_${xToken}`;
    userObj.userId = await redisClient.get(userObj.key);
    const users = dbClient.db.collection('users');
    const user = users.findOne({ _id: ObjectId(userObj.userId) });
    if (!user) {
      return res.status(401).send({ error: 'Unauthorized' });
    }
    const userData = { id: user._id, email: user.email };
    console.log(userData);
    return res.status(200).send(userData);
  }
}

export default UsersController;
