import { MongoClient } from 'mongodb';

class DBClient {
    constructor () {
        const DB_HOST = process.env.DB_HOST || 'localhost';
        const DB_PORT = process.env.DB_PORT || '27017';
        const url = `mongodb://${DB_HOST}:${DB_PORT}`;
        this.client = new MongoClient(url);
        this.DB_DATABASE = process.env.DB_DATABASE || 'files_manager';
        this.connexion = false;
        this.connectToDB();
    }

    async connectToDB () {
        try {
            await client.connect();
            this.connexion = true;
            console.log('Connexion to DB Successful');
            const db = client.db(DB_DATABASE);
        } catch(err) {
            console.log('Connexion to db Failed');
        }
    }

    isAlive () {
        return this.connexion;
    }

    async nbUsers () {
        const Users = this.client.db.collection('users');
        const nbUsers = await Users.count.findall();
        return nbUsers;
    }

    async nbFiles () {
        const Files = this.client.db.collection('files');
        const nbFiles = await Files.count.findall();
        return nbFiles;
    }
}

const dbClient = new DBClient();
module.exports = dbClient;




