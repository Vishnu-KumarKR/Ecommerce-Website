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

  const inputStyle = { width: '100%', padding: '11px 12px', borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 15, lineHeight: '20px' };

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
    try {
      const res = await fetch('/api/register', {
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
    <div style={{ maxWidth: 400, margin: '60px auto', background: '#fff', padding: 32, borderRadius: 14, boxShadow: '0 4px 18px rgba(0,0,0,0.07)' }}>
      <img src="/assets/mylogo.png" alt="MiniAmazon" style={{ height: 70, width: 'auto', display: 'block', margin: '0 auto 24px auto' }} />
      <h2 style={{ marginBottom: 18, color: '#1a1a1a', fontWeight: 700, textAlign: 'center' }}>Sign Up</h2>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 15 }}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" type="text" style={inputStyle}/>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" type="email" style={inputStyle}/>
        <div style={{ position: 'relative' }}>
          <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type={showPassword ? 'text' : 'password'} style={inputStyle} />
          <button type="button" tabIndex={-1} aria-label="Show password" onClick={() => setShowPassword(v => !v)} style={{ position: 'absolute', top: '50%', right: 14, transform: 'translateY(-50%)', background: 'none', border: 0, cursor: 'pointer', color: '#888', fontSize: 22, padding:0, lineHeight:1 }}>{showPassword ? '🙈' : '👁️'}</button>
        </div>
        <div style={{ position: 'relative' }}>
          <input value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Confirm password" type={showConfirm ? 'text' : 'password'} style={inputStyle} />
          <button type="button" tabIndex={-1} aria-label="Show confirm password" onClick={() => setShowConfirm(v => !v)} style={{ position: 'absolute', top: '50%', right: 14, transform: 'translateY(-50%)', background: 'none', border: 0, cursor: 'pointer', color: '#888', fontSize: 22, padding:0, lineHeight:1 }} >{showConfirm ? '🙈' : '👁️'}</button>
        </div>
        {error && <div style={{ color: '#e11d48', fontSize: 14, textAlign: 'center' }}>{error}</div>}
        {success && <div style={{ color: '#10b981', fontSize: 14, textAlign: 'center' }}>Account created! Redirecting…</div>}
        <button type="submit" style={{ padding: '8px 20px', background: '#ff7a18', color: '#fff', border: 0, borderRadius: 8, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, fontSize: 14, margin: '0 auto', display: 'block', width: 'fit-content' }} disabled={loading}>{loading ? 'Signing up…' : 'Sign In'}</button>
      </form>
      <div style={{marginTop:16, textAlign: 'center'}}>
        <span style={{fontSize:15, color:'#444', marginRight: 8}}>Already have an account?</span>
        <Link to="/login" style={{color:'#ff7a18', fontWeight: 600, textDecoration: 'none'}}>Log In</Link>
      </div>
    </div>
  );
}
