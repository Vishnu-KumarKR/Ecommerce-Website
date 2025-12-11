import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../auth';

export default function Profile() {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        fullName: 'Vishnu Kumar',
        email: 'vishnu@example.com',
        phone: '+91 98765 43210',
        gender: 'Male',
        address: {
            line1: '123, Tech Park Road',
            city: 'Bangalore',
            state: 'Karnataka',
            zip: '560001'
        }
    });

    useEffect(() => {
        // Reload when component mounts (and potentially if user changes, though usually entire page remounts)
        const currentUser = JSON.parse(localStorage.getItem('mini_amazon_user') || 'null');
        if (currentUser) {
            // Pre-fill from auth data if fresh
            const key = `mini_amazon_profile_${currentUser.email}`;
            const savedProfile = localStorage.getItem(key);
            if (savedProfile) {
                setProfile(JSON.parse(savedProfile));
            } else {
                // Initialize with auth data if available
                setProfile(prev => ({ ...prev, fullName: currentUser.name || prev.fullName, email: currentUser.email || prev.email }));
            }
        }
    }, []);

    const handleSave = () => {
        const currentUser = JSON.parse(localStorage.getItem('mini_amazon_user') || 'null');
        if (currentUser) {
            const key = `mini_amazon_profile_${currentUser.email}`;
            localStorage.setItem(key, JSON.stringify(profile));
            setIsEditing(false);
            alert('Profile updated successfully!');
        } else {
            alert('Please login to save profile.');
        }
    };

    const handleChange = (field, value) => {
        setProfile(prev => ({ ...prev, [field]: value }));
    };

    const handleAddressChange = (field, value) => {
        setProfile(prev => ({
            ...prev,
            address: { ...prev.address, [field]: value }
        }));
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const quickLinks = [
        { title: 'My Orders', icon: '📦', path: '/orders', desc: 'Track & buy again' },
        { title: 'Wishlist', icon: '❤️', path: '/wishlist', desc: 'Your saved items' },
        { title: 'Help Center', icon: '🎧', path: '/help', desc: 'Contact support' },
    ];

    return (
        <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '40px 20px', fontFamily: 'Inter, sans-serif' }}>
            <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                    <h1 style={{ fontSize: 32, fontWeight: 800, color: '#0f172a', margin: 0, letterSpacing: '-0.02em' }}>My Profile</h1>
                    {/* Optional: Add a subtle breadcrumb or status here */}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 32, alignItems: 'start' }} className="profile-grid">

                    {/* Left Column: Forms */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

                        {/* Personal Information */}
                        <div style={cardStyle}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                                <div>
                                    <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', margin: 0 }}>Personal Details</h2>
                                    <p style={{ fontSize: 13, color: '#64748b', margin: '4px 0 0 0' }}>Manage your personal information</p>
                                </div>
                                <button
                                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                                    style={{
                                        padding: '8px 20px',
                                        background: isEditing ? '#153266' : '#eff4ff',
                                        color: isEditing ? '#fff' : '#153266',
                                        border: 'none',
                                        borderRadius: 8,
                                        fontWeight: 600,
                                        fontSize: 13,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        boxShadow: isEditing ? '0 4px 12px rgba(21,50,102,0.2)' : 'none'
                                    }}
                                >
                                    {isEditing ? 'Save Changes' : 'Edit Details'}
                                </button>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 24 }}>
                                <div>
                                    <label style={labelStyle}>Full Name</label>
                                    <input
                                        disabled={!isEditing}
                                        value={profile.fullName}
                                        onChange={(e) => handleChange('fullName', e.target.value)}
                                        style={isEditing ? inputStyleActive : inputStyleDisabled}
                                    />
                                </div>
                                <div>
                                    <label style={labelStyle}>Gender</label>
                                    <select
                                        disabled={!isEditing}
                                        value={profile.gender}
                                        onChange={(e) => handleChange('gender', e.target.value)}
                                        style={isEditing ? inputStyleActive : inputStyleDisabled}
                                    >
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={labelStyle}>Email Address</label>
                                    <input
                                        disabled={!isEditing}
                                        value={profile.email}
                                        onChange={(e) => handleChange('email', e.target.value)}
                                        style={isEditing ? inputStyleActive : inputStyleDisabled}
                                    />
                                </div>
                                <div>
                                    <label style={labelStyle}>Phone Number</label>
                                    <input
                                        disabled={!isEditing}
                                        value={profile.phone}
                                        onChange={(e) => handleChange('phone', e.target.value)}
                                        style={isEditing ? inputStyleActive : inputStyleDisabled}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Address */}
                        <div style={cardStyle}>
                            <div style={{ marginBottom: 24 }}>
                                <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', margin: 0 }}>Shipping Address</h2>
                                <p style={{ fontSize: 13, color: '#64748b', margin: '4px 0 0 0' }}>Your default delivery location</p>
                            </div>
                            <div style={{ display: 'grid', gap: 20 }}>
                                <div>
                                    <label style={labelStyle}>Street Address</label>
                                    <input
                                        disabled={!isEditing}
                                        value={profile.address.line1}
                                        onChange={(e) => handleAddressChange('line1', e.target.value)}
                                        style={isEditing ? inputStyleActive : inputStyleDisabled}
                                    />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 20 }}>
                                    <div>
                                        <label style={labelStyle}>City</label>
                                        <input
                                            disabled={!isEditing}
                                            value={profile.address.city}
                                            onChange={(e) => handleAddressChange('city', e.target.value)}
                                            style={isEditing ? inputStyleActive : inputStyleDisabled}
                                        />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>State</label>
                                        <input
                                            disabled={!isEditing}
                                            value={profile.address.state}
                                            onChange={(e) => handleAddressChange('state', e.target.value)}
                                            style={isEditing ? inputStyleActive : inputStyleDisabled}
                                        />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Zip Code</label>
                                        <input
                                            disabled={!isEditing}
                                            value={profile.address.zip}
                                            onChange={(e) => handleAddressChange('zip', e.target.value)}
                                            style={isEditing ? inputStyleActive : inputStyleDisabled}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Login Activity (Visual only for now) */}
                        <div style={cardStyle}>
                            <div style={{ marginBottom: 20 }}>
                                <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', margin: 0 }}>Login Activity</h2>
                                <p style={{ fontSize: 13, color: '#64748b', margin: '4px 0 0 0' }}>Where you're logged in</p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <div style={{ fontSize: 24 }}>💻</div>
                                    <div>
                                        <div style={{ fontWeight: 600, color: '#0f172a', fontSize: 14 }}>Windows PC · Chrome</div>
                                        <div style={{ fontSize: 12, color: '#64748b' }}>Bangalore, KA · Active Now</div>
                                    </div>
                                </div>
                                <div style={{ fontSize: 12, fontWeight: 600, color: '#10b981', background: '#ecfdf5', padding: '4px 10px', borderRadius: 20 }}>Current</div>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Identity Card & Links */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

                        {/* Identity Badge Card */}
                        <div style={{
                            background: '#fff',
                            borderRadius: 24,
                            padding: '40px 24px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            {/* Decorative background element */}
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 100, background: 'linear-gradient(180deg, #f0f7ff 0%, #fff 100%)', zIndex: 0 }} />

                            <div style={{
                                width: 110,
                                height: 110,
                                borderRadius: '50%',
                                background: '#fff',
                                color: '#153266',
                                fontSize: 44,
                                fontWeight: 700,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 0 16px 0',
                                position: 'relative',
                                zIndex: 1,
                                boxShadow: '0 8px 20px rgba(21,50,102,0.15)',
                                border: '4px solid #fff'
                            }}>
                                {profile.fullName.charAt(0)}
                            </div>
                            <div style={{ position: 'relative', zIndex: 1 }}>
                                <div style={{ fontSize: 13, fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>Welcome Back</div>
                                <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>{profile.fullName}</h2>
                                <p style={{ color: '#94a3b8', margin: 0, fontSize: 14 }}>{profile.email}</p>
                            </div>

                            <div style={{ marginTop: 24, padding: '16px 0 0', borderTop: '1px solid #f1f5f9', width: '100%', display: 'flex', justifyContent: 'center', gap: 32, position: 'relative', zIndex: 1 }}>
                                <div>
                                    <div style={{ fontSize: 18, fontWeight: 800, color: '#0f172a' }}>12</div>
                                    <div style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>Orders</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: 18, fontWeight: 800, color: '#0f172a' }}>5</div>
                                    <div style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>Wishlist</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: 18, fontWeight: 800, color: '#0f172a' }}>2</div>
                                    <div style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>Reviews</div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Action Links */}
                        <div style={{ display: 'grid', gap: 16 }}>
                            {quickLinks.map(link => (
                                <div
                                    key={link.title}
                                    onClick={() => navigate(link.path)}
                                    style={{
                                        background: '#fff',
                                        borderRadius: 16,
                                        padding: '16px 20px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 16,
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                                        border: '1px solid transparent',
                                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                        e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.06)';
                                        e.currentTarget.style.borderColor = '#e2e8f0';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.03)';
                                        e.currentTarget.style.borderColor = 'transparent';
                                    }}
                                >
                                    <div style={{ fontSize: 22, background: '#f8fafc', width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#153266' }}>
                                        {link.icon}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 700, color: '#0f172a', fontSize: 15 }}>{link.title}</div>
                                        <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{link.desc}</div>
                                    </div>
                                    <div style={{ color: '#cbd5e1', fontSize: 20 }}>›</div>
                                </div>
                            ))}
                        </div>

                        {/* Logout */}
                        <button
                            onClick={handleLogout}
                            style={{
                                width: '100%',
                                padding: '16px',
                                background: '#fff',
                                color: '#ef4444',
                                border: '1px solid #fee2e2',
                                borderRadius: 16,
                                fontWeight: 700,
                                fontSize: 15,
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 8,
                                boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = '#fef2f2';
                                e.currentTarget.style.borderColor = '#fecaca';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = '#fff';
                                e.currentTarget.style.borderColor = '#fee2e2';
                            }}
                        >
                            <span>🚪</span> Log Out
                        </button>

                    </div>
                </div>
            </div>

            {/* CSS for responsiveness - inline for simplicity in this file */}
            <style>{`
                @media (max-width: 900px) {
                    .profile-grid {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </div>
    );
}

const cardStyle = {
    background: '#fff',
    borderRadius: 24,
    padding: 32,
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02), 0 10px 15px -3px rgba(0,0,0,0.03)',
    border: '1px solid #f1f5f9'
};

const labelStyle = {
    display: 'block',
    fontSize: 12,
    fontWeight: 600,
    color: '#64748b',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: '0.04em'
};

const inputStyleActive = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: 12,
    border: '1px solid #cbd5e1',
    fontSize: 14,
    color: '#0f172a',
    background: '#fff',
    outline: 'none',
    transition: 'all 0.2s',
    boxSizing: 'border-box'
};

const inputStyleDisabled = {
    ...inputStyleActive,
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    color: '#475569',
    cursor: 'default'
};
