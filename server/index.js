import * as util from './util.js';

import express from 'express';
import logger from 'morgan';

const app = express();
const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/client', express.static('client'));


app.post('/note/create', async function (req, res) {
  const body = JSON.parse(req.body);
  await util.createNote(res, body.date, body.content);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});