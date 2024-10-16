const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

class AppController {
  static getStatus(req, res) {
    if (redisClient.isAlive() && dbClient.isAlive()) {
      res.status(200).send({ redis: redisClient.isAlive(), db: dbClient.isAlive() });
    }
  }

  static async getStats(req, res) {
    const nbUsers = await dbClient.nbUsers();
    const nbFiles = await dbClient.nbFiles();
    res.status(200).send({ users: nbUsers, files: nbFiles });
  }
}

export default AppController;
