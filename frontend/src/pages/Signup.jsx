import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Consistent modern styling matching Login.jsx
  const modernInputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    background: '#f9fafb',
    fontSize: '15px',
    color: '#111827',
    outline: 'none',
    boxSizing: 'border-box'
  };

  async function onSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    if (!name || !email || !password || !confirm) {
      setError('All fields required');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    const API_BASE = import.meta.env.VITE_API_URL || '/api';
    try {
      const res = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      if (!res.ok) {
        const resp = await res.json().catch(() => ({}));
        throw new Error(resp.message || 'Registration failed');
      }
      setSuccess(true);
      setTimeout(() => navigate('/login'), 1100);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f3f4f6',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        background: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
        padding: '40px',
        boxSizing: 'border-box'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <img src="/assets/mylogo.png" alt="MiniAmazon" style={{ height: '60px', width: 'auto' }} />
        </div>

        <h2 style={{
          textAlign: 'center',
          fontSize: '24px',
          fontWeight: '700',
          color: '#1f2937',
          marginBottom: '32px'
        }}>
          Sign Up
        </h2>

        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your name"
              type="text"
              style={modernInputStyle}
              onFocus={(e) => e.target.style.borderColor = '#2563eb'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>
          <div>
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email address"
              type="email"
              style={modernInputStyle}
              onFocus={(e) => e.target.style.borderColor = '#2563eb'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>

          <div style={{ position: 'relative' }}>
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
              style={modernInputStyle}
              onFocus={(e) => e.target.style.borderColor = '#2563eb'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
            <button
              type="button"
              tabIndex={-1}
              aria-label="Show password"
              onClick={() => setShowPassword(v => !v)}
              style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 0, cursor: 'pointer', color: '#6b7280', fontSize: '18px', padding: 0, lineHeight: 1 }}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>

          <div style={{ position: 'relative' }}>
            <input
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              placeholder="Confirm password"
              type={showConfirm ? 'text' : 'password'}
              style={modernInputStyle}
              onFocus={(e) => e.target.style.borderColor = '#2563eb'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
            <button
              type="button"
              tabIndex={-1}
              aria-label="Show confirm password"
              onClick={() => setShowConfirm(v => !v)}
              style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 0, cursor: 'pointer', color: '#6b7280', fontSize: '18px', padding: 0, lineHeight: 1 }}
            >
              {showConfirm ? '🙈' : '👁️'}
            </button>
          </div>

          {error && (
            <div style={{ color: '#ef4444', fontSize: '14px', textAlign: 'center', background: '#fee2e2', padding: '10px', borderRadius: '8px' }}>
              {error}
            </div>
          )}
          {success && (
            <div style={{ color: '#10b981', fontSize: '14px', textAlign: 'center', background: '#d1fae5', padding: '10px', borderRadius: '8px' }}>
              Account created! Redirecting…
            </div>
          )}

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '14px',
              background: '#ff9100',
              color: '#fff',
              border: 0,
              borderRadius: '8px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              fontSize: '16px',
              boxShadow: '0 4px 6px rgba(255, 145, 0, 0.2)',
              transition: 'transform 0.1s'
            }}
            disabled={loading}
          >
            {loading ? 'Signing up…' : 'Sign Up'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: '#6b7280' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#ff9100', fontWeight: '600', textDecoration: 'none' }}>
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
