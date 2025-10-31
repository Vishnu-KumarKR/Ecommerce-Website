const AUTH_KEY = 'mini_amazon_token'

export function isAuthenticated() {
	return Boolean(localStorage.getItem(AUTH_KEY))
}

export function login({ email }) {
	const token = `demo-${btoa(email)}-${Date.now()}`
	localStorage.setItem(AUTH_KEY, token)
	return token
}

export function logout() {
	localStorage.removeItem(AUTH_KEY)
}

export function getToken() {
  return localStorage.getItem(AUTH_KEY);
}

export function getUser() {
  const data = localStorage.getItem('mini_amazon_user');
  return data ? JSON.parse(data) : null;
}

export async function loginWithCredentials(email, password) {
  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) {
      const payload = await res.json().catch(() => ({}));
      throw new Error(payload.message || 'Invalid login');
    }
    const payload = await res.json();
    localStorage.setItem(AUTH_KEY, payload.token);
    localStorage.setItem('mini_amazon_user', JSON.stringify(payload.user));
    return payload.user;
  } catch (err) {
    throw err;
  }
}


