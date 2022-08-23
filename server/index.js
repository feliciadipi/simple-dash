import 'dotenv/config';
import * as util from './util.js';
import express from 'express';
import logger from 'morgan';
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONG_URI, { useUnifiedTopology: true });
const port = process.env.PORT || 3000;
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/client', express.static('client'));

app.post('/save', async function(req, res) {
  try {
    await client.connect();
    const users = await client.db('onelinerDB').collection('users');
    console.log("Successfully connected to: " + collection.namespace);
    await util.saveEntry(req.body.state, users);
    res.status(200).send("Successfully saved data");
  } catch (e) {
    console.error(e);
    res.status(500).send("Error saving data");
  }
  await client.close();
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});