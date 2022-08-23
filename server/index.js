import * as util from './util.js';
import express from 'express';
import logger from 'morgan';
import { MongoClient } from 'mongodb';

const URI = 'mongodb+srv://fdipietro:gp6ye7v8iVfgtV30@cluster0.cz6jvww.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(URI, { useUnifiedTopology: true });
const app = express();
const port = 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/client', express.static('client'));

app.post('/notes/save', async function(req, res) {
  try {
    await client.connect();
    const collection = await client.db('onelinerDB').collection('notes');
    console.log("Connected to: " + collection.namespace);
    await util.saveEntry(req.body.date, req.body.content, collection);
    res.status(200).send("Successfully saved note");
  } catch (e) {
    console.error(e);
    res.status(500).send("Error saving note");
  }
  await client.close();
});

app.post('/notes/delete', async function(req, res) {
  try {
    await client.connect();
    const collection = await client.db('onelinerDB').collection('notes');
    console.log("Connected to: " + collection.namespace);
    await util.deleteEntry(req.body.date, collection);
    res.status(200).send("Successfully deleted note");
  } catch (e) {
    console.error(e);
    res.status(500).send("Error deleting note");
  }
  await client.close();
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});