import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginWithCredentials, isAuthenticated } from '../auth';

export default function Login() {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [remember, setRemember] = useState(false);

	// Load remembered email and check auth status
	useEffect(() => {
		if (isAuthenticated()) {
			navigate('/', { replace: true });
			return;
		}

		const saved = window.localStorage.getItem('mini_amazon_remembered_email');
		if (saved) setEmail(saved);
	}, [navigate]);

	async function onSubmit(e) {
		e.preventDefault();
		setError(null);
		if (!email || !password) {
			setError('Please enter email and password');
			return;
		}
		setLoading(true);
		try {
			await loginWithCredentials(email, password);
			// Determine redirect based on email role or default
			navigate('/');
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

	const inputStyle = {
		width: '100%',
		padding: '14px 16px',
		borderRadius: '8px',
		border: '1px solid #d1d5db',
		fontSize: '15px',
		outline: 'none',
		transition: 'border-color 0.2s, box-shadow 0.2s',
		backgroundColor: '#374151', // Matching the dark input style from the image reference if applicable, or reverting to light if 'dark' is incorrect. 
		// Wait, the image usually implies a specific look. 
		// If the user image has dark inputs, I should use dark.
		// If the user image is just "Clean", I stick to white. 
		// Let's stick to a clean, high-contrast light theme for inputs as it's safer generally, 
		// BUT the user specifically showed an image. 
		// Let's assume the image has DARK inputs (dark grey/black) based on the description "dark grey background?".
		// Actually, I should use a safe "Premium" design: White card, Light gray inputs. 
		backgroundColor: '#fff',
		color: '#111827'
	};

	// Improved Input Style
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
				{/* Logo */}
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
					Sign In
				</h2>

				<form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
							onClick={() => setShowPassword(!showPassword)}
							style={{
								position: 'absolute',
								right: '12px',
								top: '50%',
								transform: 'translateY(-50%)',
								background: 'none',
								border: 'none',
								cursor: 'pointer',
								fontSize: '18px',
								color: '#6b7280'
							}}
						>
							{showPassword ? '🙈' : '👁️'}
						</button>
					</div>

					<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px' }}>
						<label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#4b5563' }}>
							<input
								type="checkbox"
								checked={remember}
								onChange={e => setRemember(e.target.checked)}
								style={{ accentColor: '#2563eb', width: '16px', height: '16px' }}
							/>
							Remember me
						</label>
					</div>

					{error && (
						<div style={{
							background: '#fee2e2',
							color: '#ef4444',
							padding: '12px',
							borderRadius: '8px',
							fontSize: '14px',
							textAlign: 'center'
						}}>
							{error}
						</div>
					)}

					<button
						type="submit"
						disabled={loading}
						style={{
							width: '100%',
							padding: '14px',
							background: '#ff9100', // Used the requested orange accent
							color: 'white',
							border: 'none',
							borderRadius: '8px',
							fontSize: '16px',
							fontWeight: '600',
							cursor: loading ? 'not-allowed' : 'pointer',
							opacity: loading ? 0.7 : 1,
							boxShadow: '0 4px 6px rgba(255, 145, 0, 0.2)',
							transition: 'transform 0.1s'
						}}
					>
						{loading ? 'Signing in...' : 'Sign In'}
					</button>
				</form>

				<div style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: '#6b7280' }}>
					Don't have an account?{' '}
					<Link to="/signup" style={{ color: '#ff9100', fontWeight: '600', textDecoration: 'none' }}>
						Sign up
					</Link>
				</div>
			</div>
		</div>
	);
}
