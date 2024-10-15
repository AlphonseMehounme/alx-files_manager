import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const DB_HOST = process.env.DB_HOST || 'localhost';
    const DB_PORT = process.env.DB_PORT || '27017';
    const url = `mongodb://${DB_HOST}:${DB_PORT}`;
    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.DB_DATABASE = process.env.DB_DATABASE || 'files_manager';
    this.connexion = false;
    this.connectToDB();
  }

  async connectToDB() {
    try {
      await this.client.connect();
      this.connexion = true;
      this.db = this.client.db(this.DB_DATABASE);
    } catch (err) {
      console.log('Connexion to db Failed', err);
    }
  }

  isAlive() {
    return this.connexion;
  }

  async userFound(email) {
    const users = this.db.collection('users');
    const user = await users.countDocuments({ email });
    if (user) {
      return true;
    }
    return false;
  }

  async addUser(email, password) {
    const users = this.db.collection('users');
    const user = await users.insertOne({ email, password });
    return user.ops[0];
  }

  async nbUsers() {
    const users = this.db.collection('users');
    const nbUsers = await users.countDocuments({});
    return nbUsers;
  }

  async nbFiles() {
    const files = this.db.collection('files');
    const nbFiles = await files.countDocuments({});
    return nbFiles;
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
