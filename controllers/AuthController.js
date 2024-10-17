import sha1 from 'sha1';
import redisClient from '../utils/redis';
import dbClient from '../utils/db';

const { v4: uuidv4 } = require('uuid');

class AuthController {
  static async getConnect(req, res) {
    const authHeader = req.header('Authorization') || '';
    const credentials = authHeader.split(' ')[1];
    if (!credentials) {
      return res.status(201).send({ error: 'Unauthorized' });
    }
    const decodedCredentials = Buffer.from(credentials, 'base64').toString('utf-8');
    const [email, password] = decodedCredentials.split(':');
    if (!email || !password) {
      return res.status(401).send({ error: 'Unauthorized' });
    }
    const hashedPassword = sha1(password);
    const users = dbClient.db.collection('users');
    const user = await users.findOne({ email, password: hashedPassword });
    if (!user) {
      return res.status(401).send({ error: 'Unauthorized' });
    }
    const token = uuidv4();
    const key = `auth_${token}`;
    const duration = 24 * 3600;
    await redisClient.set(key, user._id.toString(), duration);
    return res.status(200).send({ token });
  }

  static async getDisconnect(req, res) {
    const userObj = { userId: null, key: null };
    const xToken = req.header('X-Token');
    if (!xToken) {
      return res.status(401).send({ error: 'Unauthorized' });
    }
    userObj.key = `auth_${xToken}`;
    userObj.userId = await redisClient.get(userObj.key);
    if (!userObj.userId) {
      return res.status(401).send({ error: 'Unauthorized' });
    }
    await redisClient.del(userObj.key);
    return res.status(204).send();
  }
}

export default AuthController;
