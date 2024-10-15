import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.connexion = false;
    this.client = createClient();
    this.client.on('error', (err) => console.log('Connexion error', err));
    this.client.on('connect', () => {
      this.client.connexion = true;
    });
  }

  /*async connectToRedis() {
    try {
      await this.client.connect();
      this.connexion = true;
    } catch (err) {
      console.log('First connexion attemps to redis failed', err);
    }
  }*/

  isAlive() {
    return this.connected;
  }

  async get(key) {
    return this.client.get(key);
  }

  async set(key, value, duration) {
    this.client.setex(key, duration, value);
  }

  async del(key) {
    this.client.del(key);
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
