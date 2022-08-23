export async function save(state) {
  const response = await fetch(`/save`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(state),
  });
  const data = await response.json();
}