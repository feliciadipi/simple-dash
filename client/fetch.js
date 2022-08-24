export async function save(state) {
  const response = await fetch(`/save`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(state),
  });
  const body = await response.json();
  return body;
}

export async function changeTheme(state) {
  const response = await fetch(`/theme/change`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(state),
  });
  const body = await response.json();
  return body;
}