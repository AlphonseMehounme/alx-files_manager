import redisClient from '../utils/redis';

class AuthController {
  static getConnect(req, res) {
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
    return res.status(200).send('Get connect');
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
