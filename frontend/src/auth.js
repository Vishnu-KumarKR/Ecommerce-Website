const AUTH_KEY = 'mini_amazon_token'
const USER_KEY = 'mini_amazon_user'
const CART_KEY = 'mini_amazon_cart'
const STACK_KEY = 'mini_amazon_cart_stack'

export function isAuthenticated() {
  return Boolean(localStorage.getItem(AUTH_KEY))
}

export function login({ email }) {
  const token = `demo-${btoa(email)}-${Date.now()}`
  localStorage.setItem(AUTH_KEY, token)
  window.dispatchEvent(new Event('auth-change'));
  return token
}

export function logout() {
  localStorage.removeItem(AUTH_KEY)
  localStorage.removeItem(USER_KEY)
  localStorage.removeItem(CART_KEY)
  try {
    sessionStorage.removeItem(STACK_KEY)
  } catch (_) {
    // ignored - sessionStorage unavailable (SSR/tests)
  }
  window.dispatchEvent(new Event('auth-change'));
}

export function getToken() {
  return localStorage.getItem(AUTH_KEY);
}

export function getUser() {
  const data = localStorage.getItem(USER_KEY);
  return data ? JSON.parse(data) : null;
}

const API_BASE = import.meta.env.VITE_API_URL || '';

export async function loginWithCredentials(email, password) {
  try {
    const res = await fetch(`${API_BASE}/api/login`, {
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
    localStorage.setItem(USER_KEY, JSON.stringify(payload.user));
    window.dispatchEvent(new Event('auth-change'));
    return payload.user;
  } catch (err) {
    // If API fails (e.g. backend not deployed), fall back to mock
    console.warn('Backend connection failed:', err);
    console.info('Falling back to MOCK login for demo purposes.');
    return mockLogin(email, password);
  }
}

async function mockLogin(email, password) {
  // Simulate network delay
  await new Promise(r => setTimeout(r, 800));

  if (email === 'admin@site.com' && password === 'demo123') {
    const mockUser = { id: 1, name: 'Admin User', email, role: 'admin' };
    const token = `mock-token-${Date.now()}`;
    localStorage.setItem(AUTH_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(mockUser));
    window.dispatchEvent(new Event('auth-change'));
    return mockUser;
  }

  // Accept any other login for demo
  const mockUser = { id: 999, name: 'Demo User', email, role: 'customer' };
  const token = `mock-demo-token-${Date.now()}`;
  localStorage.setItem(AUTH_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(mockUser));
  window.dispatchEvent(new Event('auth-change'));
  return mockUser;
}


