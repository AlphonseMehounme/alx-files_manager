import redis from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.newGet = promisify(this.client.get).bind(this.client);
    this.connexion = false;
    this.client.on('error', (err) => console.log('Connexion error', err.message));
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
    return this.connexion;
  }

  async get(key) {
    const value = this.newGet(key);
    return value;
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
