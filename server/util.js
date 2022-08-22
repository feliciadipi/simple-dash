// Notes
async function createNote(res, date, content) {
  // TODO: insert new entry to collection
  let noteEntry = {
    date: date,
    content: content
  };
  console.log(noteEntry);
/*
  if (date === undefined) {
    res.status(400).send("Error, note not saved.");
  } else {
    res.status(200).send("Note saved successfully.");
  }
  */
  
}

function readNote() {
  return {};
}

function dumpNotes() {
  return {};
}

function deleteNote() {
  return {};
}

// Tasks 
function createTasks() {
  return {};
}

function readTasks() {
  return {};
}

function dumpTasks() {
  return {};
}

function deleteTasks() {
  return {};
}