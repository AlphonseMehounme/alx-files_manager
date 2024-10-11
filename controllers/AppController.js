const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

const getStatus = ((req, res) => {
  if (redisClient.isAlive() && dbClient.isAlive()) {
    res.status(200).send({ redis: true, db: true });
  }
});

const getStats = ((req, res) => {
  res.status(200).send({ users: dbClient.nbUsers(), files: dbClient.nbFiles() });
});

module.exports = { getStatus, getStats };
