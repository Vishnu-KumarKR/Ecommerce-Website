import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginWithCredentials } from '../auth';

// Input style config
const inputStyle = { width: '280px', padding: '13px 14px', borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 14, lineHeight: '22px' };
const placeholderStyle = { fontWeight: 500, color: '#aaa', fontSize: 14 };

export default function Login() {
	const navigate = useNavigate()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [remember, setRemember] = useState(false);

	// Load remembered email
	useEffect(() => {
		const saved = window.localStorage.getItem('mini_amazon_remembered_email');
		if (saved) setEmail(saved);
	}, []);

	async function onSubmit(e) {
		e.preventDefault()
		setError(null);
		if (!email || !password) {
			setError('Please enter email and password')
			return
		}
		setLoading(true);
		try {
			await loginWithCredentials(email, password);
			navigate('/')
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
		if (remember) {
			localStorage.setItem('mini_amazon_remembered_email', email);
		} else {
			localStorage.removeItem('mini_amazon_remembered_email');
		}
	}

	return (
		<div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', maxWidth: 900, margin: '40px auto', background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 10px 24px rgba(0,0,0,0.08)' }}>
			<div style={{
				minHeight: 440,
				padding: '48px 24px',
				background: `linear-gradient(130deg, rgba(255,153,0,0.8) 0%, rgba(255,194,120,0.77) 100%), url('/assets/login-illustration.png')`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				color: '#fff',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				textAlign: 'center',
			}}>
				<h2 style={{ margin: 0, marginBottom: 16, fontSize: 32, fontWeight: 700, lineHeight: 1.1, textShadow: '0 1px 8px rgba(0,0,0,0.11)' }}>Shop smarter with Mini Amazon.</h2>
				<p style={{ marginTop: 0, marginBottom: 0, fontSize: 18, fontWeight: 400, textShadow: '0 1px 6px rgba(0,0,0,0.07)' }}>Discover great deals, fast checkout, and a seamless shopping experience.</p>
			</div>
			<div style={{ padding: 32 }}>
				<img src="/assets/mylogo.png" alt="MiniAmazon" style={{ height: 70, width: 'auto', display: 'block', margin: '0 auto 24px auto' }} />
				<p style={{ marginTop: 0, color: '#666', textAlign: 'center' }}>Please login to your account</p>
				<form onSubmit={onSubmit} style={{ display: 'grid', gap: 15, marginTop: 12, justifyContent: 'center' }}>
					<input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" type="email" style={inputStyle} />
					<div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
						<input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type={showPassword ? 'text' : 'password'} style={inputStyle} />
						<button type="button" tabIndex={-1} aria-label="Show password" onClick={() => setShowPassword(v => !v)} style={{ position: 'absolute', top: '50%', right: 14, transform: 'translateY(-50%)', background: 'none', border: 0, cursor: 'pointer', color: '#888', fontSize: 22, padding:0, lineHeight:1 }}>
							{showPassword ? '🙈' : '👁️'}
						</button>
					</div>
					<label style={{ fontSize: 15, color: '#1a1a1a', marginBottom: -6, marginTop: 2, display: 'flex', alignItems: 'center', gap: 5, fontWeight: 500 }}>
						<input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} style={{ accentColor: '#ff7a18' }} /> Remember me
					</label>
					{error && <div style={{ color: '#e11d48', fontSize: 14, textAlign: 'center' }}>{error}</div>}
					<button type="submit" style={{ padding: '8px 20px', background: '#ff7a18', color: '#fff', border: 0, borderRadius: 8, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, fontWeight: 600, fontSize: 14, margin: '0 auto', display: 'block', width: 'fit-content' }} disabled={loading}>
						{loading ? 'Logging in...' : 'Login'}
					</button>
					<div style={{marginTop:36, textAlign:'center'}}>
						<span style={{color:'#444', fontSize:15}}>Don't have an account?</span> <Link to="/signup" style={{color:'#ff7a18', fontWeight: 600, paddingLeft:4}}>Sign up</Link>
					</div>
				</form>
			</div>
		</div>
	)
}


