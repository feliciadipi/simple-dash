export async function saveEntry(date, content, collection) {
  // create new document
  let newEntry = {
    date: date,
    content: content
  }

  // query the collection for an existing document at current date (catch and log promise error)
  if (await entryExists(date, collection)) {
    // no entry found, create new document
    await createEntry(newEntry, collection);
  } else { 
    // entry found, update document with new data
    await updateEntry(date, newEntry, collection);
  }
}

export async function deleteEntry(date, collection) {
  if (entryExists(date, collection)) {
    await collection.deleteOne({'date': date}).catch(err => console.log(err));
  } else {
    console.log('Deletion error, entry does not exist');
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

async function entryExists(date, collection) {
  let curEntry = await collection.findOne({'date': date}).catch(err => console.log(err));
  return (curEntry === null);
}