import { createClient } from 'redis';


class RedisClient {
    constructor() {
        this.client = createClient()
        .on('error', err => console.log('Connexion failed', err))
        .connect();
    }

    isAlive() {
        if (this.client != null) {
            return true;
        }
        return false;
    }

    async get(key) {
        return await this.client.get(key);
    }

    async set(key, value) {
        return await this.client.set(key, value);
    }

    async del(key) {
        await this.client.del(key);
    }
}

module.exports = new RedisClient();