export async function save(state) {
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