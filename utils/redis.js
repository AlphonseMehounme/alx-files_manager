import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (err) => console.log('Connexion error', err));
    this.connexion = false;
    this.connectToRedis();
  }

  async connectToRedis() {
    try {
      await this.client.connect();
      this.connexion = true;
      console.log('Connexion Successful');
    } catch (err) {
      console.log('First connexion attemps to redis failed', err);
    }
  }

  isAlive() {
    return this.connexion;
  }

  async get(key) {
    console.log('Hello get');
    return this.client.get(key);
  }

  async set(key, value) {
    await this.client.set(key, value);
  }

  async del(key) {
    await this.client.del(key);
  }
}

module.exports = new RedisClient();
