export async function createNote(note) {
  const response = await fetch(`/note/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ date: note.date, content: note.content }),
  });
  const data = await response.json();
  return data;
}