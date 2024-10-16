import redis from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    // this.connexion = false;
    this.client = redis.createClient();
    this.newGet = promisify(this.client.get).bind(this.client);
    this.client.on('error', (err) => console.log('Connexion error', err.message));
    this.client.on('connect', () => {
      console.log('Redis connected...');
    });
    // this.connexion = true;
  }

  isAlive() {
    return this.client.ready;
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
