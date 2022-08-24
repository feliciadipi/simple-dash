export async function saveState(entry) {
  const response = await fetch(`/save/state`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(entry),
  });
  const body = await response.json();
  return body;
}