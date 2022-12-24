import { MongoClient } from 'mongodb';
import 'dotenv/config';

class Database {
  constructor() {
    this.client = new MongoClient(process.env.MONGO_URI,
                    { useNewUrlParser: true, 
                      useUnifiedTopology: true });
  }

  async createUser(user, pass, config) {
    try {
      // open connection and nav to users collection
      await this.client.connect();
      const timely = this.client.db('timely');
      const users = timely.collection('users');
      // create a new user entry
      let entry = {
        user: user,
        pass: pass,
        config: config
      };
      // insert to collection
      await users.insertOne(entry);
    } catch(err) {
      console.log(err);
    }
  }

  async deleteUser(user) {
    try {
      // open connection and nav to users collection
      await this.client.connect();
      const timely = this.client.db('timely');
      const users = timely.collection('users');
      // delete user entry
      const result = await users.deleteOne({user: user});
      console.log(
        `${result.deletedCount} document(s) deleted`,
      );
    } catch(err) {
      console.log(err);
    }
  }

  async userExists(user) {
    try {
      // open connection and nav to users collection
      await this.client.connect();
      const timely = this.client.db('timely');
      const users = timely.collection('users');
      const found = await users.findOne({user: user});
      return (found !== null);
    } catch(err) {
      console.log(err);
    }
  }

  async getUser(user) {
    try {
      // open connection and nav to users collection
      await this.client.connect();
      const timely = this.client.db('timely');
      const users = timely.collection('users');
      // retriever user's data
      return await users.findOne({user: user});
    } catch(err) {
      console.log(err);
    }
  }
  
  async validatePassword(user, pass) {
    try {
      // open connection and nav to users collection
      await this.client.connect();
      const timely = this.client.db('timely');
      const users = timely.collection('users');
      const entry = await users.findOne({user: user});
      return (entry.pass == pass);
    } catch(err) {
      console.log(err);
      return false;
    }
  }

  // check that user is authenticated in caller context
  async saveState(user, config) {
    try {
      // open connection and nav to users collection
      await this.client.connect();
      const timely = this.client.db('timely');
      const users = timely.collection('users');
      // update entry
      const result = await users.updateOne({user: user}, {config: config});
      console.log(
        `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
      );
    } catch(err) {
      console.log(err);
    }
  }

  async clear() {
    try {
      // open connection and nav to users collection
      await this.client.connect();
      const timely = this.client.db('timely');
      const users = timely.collection('users');
      // update entry
      const result = await users.deleteMany({});
      console.log(
        `${result.deletedCount} document(s) deleted`,
      );
    } catch(err) {
      console.log(err);
    }
  }
}

export default new Database();