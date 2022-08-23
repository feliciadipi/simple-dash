export async function saveNotes(notes) {
  const response = await fetch(`/notes/save`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ date: notes.date, content: notes.content }),
  });
  const data = await response.json();
  return data;
}

export async function saveTasks(tasks) {
  const response = await fetch(`/tasks/save`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ date: tasks.date, content: tasks.content }),
  });
  const data = await response.json();
  return data;
}