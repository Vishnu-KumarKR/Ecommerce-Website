import { apiClient } from './api/client';

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

export async function loginWithCredentials(email, password) {
  try {
    const res = await apiClient.post('/api/login', { email, password });
    const payload = res.data;
    localStorage.setItem(AUTH_KEY, payload.token);
    localStorage.setItem(USER_KEY, JSON.stringify(payload.user));
    window.dispatchEvent(new Event('auth-change'));
    return payload.user;
  } catch (err) {
    // Extract error message from axios error object
    const message = err.response?.data?.message || err.message || 'Invalid login';
    throw new Error(message);
  }
}


