import { MongoClient } from 'mongodb';
import 'dotenv/config';

class Database {
  constructor() {
    this.client = new MongoClient(process.env.MONGO_URI);
  }

  async connect() {
    await this.client.connect();
  }

  async close() {
    await this.client.close();
  }

  async createUser(user) {
    const users = this.client.db('timely').collection('users');
    const taken = await users.findOne({username: user.username});
    if (taken) {
      throw new Error("This username is taken.");
    }
    await users.insertOne(user);
  }

  async getUser(username) {
    const users = this.client.db('timely').collection('users');
    const data = await users.findOne({username: username});
    return(data);
  }

  async updateUser(username, settings) {
    const users = this.client.db('timely').collection('users');
    const result = await users.updateOne({username: username}, {$set: {"settings": settings}});
    console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`);
  }

  async deleteUser(username) {
    const users = this.client.db('timely').collection('users');
    const result = await users.deleteOne({username: username});
    console.log(`${result.deletedCount} document(s) deleted`);
  }

  async clear() {
    const users = this.client.db('timely').collection('users');
    const result = await users.deleteMany({});
    console.log(`${result.deletedCount} document(s) deleted`);
  }
}

export default new Database();