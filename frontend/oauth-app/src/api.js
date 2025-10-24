export async function fetchCsrf() {
  const res = await fetch('/api/csrf', {
    method: "GET",
    credentials: 'include'
  });
  return res.json();
}

export async function getProfile() {
  const res = await fetch('/api/profile', {
    method: "GET",
    credentials: 'include'
  });
  return res;
}

export async function postProfile(data, csrfToken, headerName='X-CSRF-TOKEN') {
  const res = await fetch('/api/profile', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      [headerName]: csrfToken
    },
    body: JSON.stringify(data)
  });
  return res;
}