export async function saveNote(note) {
  const response = await fetch(`/notes/save`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ date: note.date, content: note.content }),
  });
  const data = await response.json();
  return data;
}