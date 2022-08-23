export async function saveEntry(req, res, collection) {
  // create new document
  let newEntry = {
    date: req.body.date,
    content: req.body.content
  }
  // query the collection for an existing document at current date (catch and log promise error)
  let curEntry = await collection.findOne({'date': req.body.date}).catch(err => console.log(err));

  if (curEntry === null) {
    // no entry found, create new document
    await createEntry(newEntry, collection);
  } else { 
    // entry found, update document with new data
    await updateEntry(req.body.date, newEntry, collection);
  }
}

async function createEntry(newEntry, collection) {
  // try to insert to collection
  await collection.insertOne(newEntry).catch(err => console.log(err));
}

async function updateEntry(date, newEntry, collection) {
  // try to replace document
  await collection.updateOne({'date': date}, newEntry).catch(err => console.log(err));
}

export async function deleteEntry(date, collection) {
  await collection.deleteOne({'date': date}).catch(err => console.log(err));
}