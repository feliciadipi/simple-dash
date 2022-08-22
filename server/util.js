// Notes
export async function createNote(res, date, content) {
  // TODO: insert new entry to collection
  let noteEntry = {
    date: date,
    content: content
  };
  console.log(noteEntry);
}

function updateNote(date, content) {
  // Query db for note with that date, err if it exists
}


function deleteNote(date) {

}

// Tasks 
function createTasks(date, content) {
  return {};
}

function updateTasks(date, content) {
  return {};
}

function deleteTasks(date) {
  return {};
}