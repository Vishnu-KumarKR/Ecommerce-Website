import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { WishlistProvider } from './contexts/WishlistContext';
import Footer from './components/Footer';
import { logout, getUser } from './auth';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute('data-theme') || 'classic');
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(getUser());
  // ... (keep existing state)

  useEffect(() => { document.documentElement.setAttribute('data-theme', theme); }, [theme]);

  const isActive = (path) => location.pathname === path;

  // ... (keep existing helper functions)

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const goHome = () => {
    navigate('/');
  };

  const goCategories = () => {
    navigate('/');
    setTimeout(() => {
      const el = document.getElementById('categories');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const goFavourites = () => {
    navigate('/cart');
  };

  const goSettings = () => {
    navigate('/admin');
  };

  const goReturns = () => {
    navigate('/checkout');
  };

  const goShipping = () => {
    navigate('/checkout');
  };

  const goMore = () => {
    navigate('/');
  };

  return (
    <WishlistProvider>
      <div style={{ display: 'flex', minHeight: '100vh', width: '100%', boxSizing: 'border-box', background: 'var(--color-page-bg)', paddingTop: '80px' }}>

        {/* Fixed Header */}
        <header
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '80px',
            background: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            zIndex: 1100,
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            borderBottom: '1px solid #e5e7eb',
            gap: 20
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button
              aria-label="Open menu"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '24px',
                color: '#1f2937',
                padding: '8px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f3f4f6'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              ☰
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={goHome}>
              <img src="/assets/mylogo.png" alt="MiniAmazon" style={{ height: 40, width: 'auto', display: 'block' }} />
            </div>
          </div>

          <input
            placeholder="Search products, brands, categories..."
            style={{ flex: 1, maxWidth: 600, padding: '10px 16px', borderRadius: 12, border: '1px solid #d7ddf2', fontSize: 15, background: '#fbfdff', display: 'block', boxShadow: '0 2px 4px rgba(21,50,102,0.04)', color: '#000' }}
            onFocus={(e) => { e.currentTarget.style.border = '1px solid #2949b6'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(41,73,182,0.12)'; }}
            onBlur={(e) => { e.currentTarget.style.border = '1px solid #d7ddf2'; e.currentTarget.style.boxShadow = '0 2px 4px rgba(21,50,102,0.04)'; }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.currentTarget.value.trim().length > 0) {
                goCategories();
              }
            }}
          />

          <nav style={{ display: 'flex', gap: 16, alignItems: 'center', flexShrink: 0 }}>

            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                style={{
                  background: 'transparent',
                  border: '1px solid transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '6px 12px 6px 8px',
                  borderRadius: 30,
                  transition: 'background 0.2s, border-color 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f8fafc';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'transparent';
                }}
              >
                <div style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  background: '#eff4ff',
                  color: '#153266',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 15,
                  fontWeight: 700,
                  border: '1px solid #dbeafe',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                }}>
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="hide-mobile" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span style={{ fontSize: 11, color: '#64748b', fontWeight: 500, letterSpacing: '0.02em' }}>Welcome</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#0f172a', lineHeight: 1 }}>
                    {user?.name ? user.name.split(' ')[0].charAt(0).toUpperCase() + user.name.split(' ')[0].slice(1).toLowerCase() : 'Guest'}
                  </span>
                </div>
              </button>

              {profileOpen && (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  background: '#fff',
                  border: '1px solid #f3f4f6',
                  borderRadius: 16,
                  boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
                  padding: '8px',
                  minWidth: 240,
                  zIndex: 2000,
                  animation: 'fadeIn 0.2s ease-out'
                }}>
                  <div style={{ padding: '12px 16px', borderBottom: '1px solid #f3f4f6', marginBottom: 8 }}>
                    <div style={{ fontWeight: 700, color: '#111827', fontSize: 15 }}>{user?.name || 'Guest User'}</div>
                    <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>{user?.email || 'Please login'}</div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {[
                      { label: 'My Profile', icon: '👤', path: '/profile' },
                      { label: 'My Orders', icon: '📦', path: '/orders' },
                      { label: 'Wishlist', icon: '❤️', path: '/wishlist' },
                    ].map(item => (
                      <button
                        key={item.label}
                        onClick={() => { navigate(item.path); setProfileOpen(false); }}
                        style={{
                          textAlign: 'left',
                          padding: '10px 12px',
                          background: 'transparent',
                          border: 'none',
                          borderRadius: 8,
                          fontSize: 14,
                          color: '#374151',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          transition: 'background 0.2s',
                          fontWeight: 500
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = '#f9fafb'; e.currentTarget.style.color = '#153266'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#374151'; }}
                      >
                        <span style={{ fontSize: 16 }}>{item.icon}</span> {item.label}
                      </button>
                    ))}
                  </div>

                  <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid #f3f4f6' }}>
                    <button
                      onClick={handleLogout}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        color: '#ef4444',
                        background: 'transparent',
                        border: 'none',
                        borderRadius: 8,
                        fontWeight: 600,
                        fontSize: 14,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        gap: 10,
                        transition: 'background 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#fef2f2'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <span style={{ fontSize: 16 }}>🚪</span> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
            {profileOpen && (
              <div
                onClick={() => setProfileOpen(false)}
                style={{ position: 'fixed', inset: 0, zIndex: 1999 }}
              />
            )}
          </nav>
        </header>

        {/* Collapsible Sidebar */}
        <aside
          style={{
            position: 'fixed',
            left: 0,
            top: '80px',
            height: 'calc(100vh - 80px)',
            width: menuOpen ? '260px' : '80px',
            background: 'linear-gradient(180deg, #1e3a8a 0%, #0f172a 100%)',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px 0',
            boxSizing: 'border-box',
            gap: 16,
            transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            zIndex: 1000,
            overflowX: 'hidden',
            overflowY: 'auto',
            whiteSpace: 'nowrap'
          }}
        >
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', padding: menuOpen ? '0 16px' : '0 10px', boxSizing: 'border-box' }}>
            {[
              { label: 'Home', icon: '🏠', action: goHome, path: '/' },
              { label: 'Shop', icon: '🛍️', action: () => { navigate('/'); setTimeout(() => document.getElementById('product-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }, path: '/shop' },
              { label: 'Categories', icon: '🗂️', action: goCategories, path: '/categories' },
              { label: 'Cart', icon: '🛒', action: () => navigate('/cart'), path: '/cart' },
              { label: 'Orders', icon: '📦', action: () => navigate('/orders'), path: '/orders' },
              { label: 'Wishlist', icon: '❤️', action: () => navigate('/wishlist'), path: '/wishlist' },
              { label: 'Profile', icon: '👤', action: () => navigate('/profile'), path: '/profile' },
              { label: 'Admin Panel', icon: '🛡️', action: () => navigate('/admin'), path: '/admin' },
              { label: 'Help', icon: '❓', action: () => navigate('/help'), path: '/help' },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => { item.action(); setMenuOpen(false); }}
                title={!menuOpen ? item.label : ''}
                style={{
                  width: '100%',
                  height: '48px',
                  borderRadius: '12px',
                  border: 'none',
                  cursor: 'pointer',
                  background: isActive(item.path) || (item.label === 'Shop' && location.pathname === '/' && location.hash === '#shop') ? '#3b82f6' : 'transparent',
                  color: isActive(item.path) || (item.label === 'Shop' && location.pathname === '/' && location.hash === '#shop') ? '#fff' : 'rgba(255,255,255,0.7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: menuOpen ? 'flex-start' : 'center',
                  padding: menuOpen ? '0 16px' : '0',
                  transition: 'all 0.2s ease',
                  fontSize: '1rem',
                  fontWeight: isActive(item.path) ? 600 : 500
                }}
                onMouseEnter={(e) => {
                  if (!isActive(item.path)) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.color = '#fff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(item.path)) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                  }
                }}
              >
                <span style={{ fontSize: '1.4rem', minWidth: '24px', textAlign: 'center', marginRight: menuOpen ? '16px' : '0' }}>{item.icon}</span>
                <span style={{ opacity: menuOpen ? 1 : 0, transition: 'opacity 0.2s', display: menuOpen ? 'block' : 'none' }}>{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Overlay for closing menu on mobile/when open */}
        {
          menuOpen && (
            <div onClick={() => setMenuOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.25)', zIndex: 999 }} />
          )
        }

        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', marginLeft: menuOpen ? '260px' : '80px', transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}>
          <Outlet />
          <Footer />
        </div>
      </div >
    </WishlistProvider >
  );
}


