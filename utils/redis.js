import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.connexion = false;
    this.client = createClient();
    this.client.on('error', (err) => console.log('Connexion error', err));
    this.connexion = true;
    this.connectToRedis();
  }

  async connectToRedis() {
    try {
      await this.client.connect();
      this.connexion = true;
    } catch (err) {
      console.log('First connexion attemps to redis failed', err);
    }
  }

  isAlive() {
    return this.connexion;
  }

  async get(key) {
    return this.client.get(key);
  }

  async set(key, value, duration) {
    await this.client.set(key, value, { EX: duration });
  }

  async del(key) {
    await this.client.del(key);
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
