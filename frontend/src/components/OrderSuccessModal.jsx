import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

export default function OrderSuccessModal({ show, orderId, onClose }) {
    const navigate = useNavigate();
    const { clearCart } = useCart();

    if (!show) return null;

    const handleNavigate = (path) => {
        clearCart(); // Clear cart when leaving the modal
        navigate(path);
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            animation: 'fadeIn 0.2s ease-out'
        }}>
            <div style={{
                background: '#fff',
                borderRadius: '24px',
                width: '90%',
                maxWidth: '450px',
                padding: '40px 32px',
                textAlign: 'center',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                position: 'relative',
                animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}>
                {/* Success Animation Circle */}
                <div style={{
                    width: '80px',
                    height: '80px',
                    background: '#dcfce7',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px auto',
                    position: 'relative'
                }}>
                    <div style={{
                        color: '#16a34a',
                        fontSize: '40px',
                        animation: 'scaleIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                    }}>
                        ✓
                    </div>
                    {/* Pulse Effect */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '50%',
                        border: '2px solid #16a34a',
                        animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
                        opacity: 0.2
                    }} />
                </div>

                <h2 style={{
                    margin: '0 0 12px 0',
                    fontSize: '24px',
                    fontWeight: '800',
                    color: '#0f172a',
                    letterSpacing: '-0.02em'
                }}>
                    Order Placed Successfully!
                </h2>

                <p style={{
                    margin: '0 0 24px 0',
                    fontSize: '15px',
                    color: '#64748b',
                    lineHeight: '1.6'
                }}>
                    Thank you for your purchase. Your order has been securely processed.
                </p>

                <div style={{
                    background: '#f8fafc',
                    borderRadius: '12px',
                    padding: '16px',
                    marginBottom: '32px',
                    border: '1px solid #e2e8f0'
                }}>
                    <div style={{ fontSize: '12px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Order ID</div>
                    <div style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', fontFamily: 'monospace' }}>{orderId || 'ORD-12345678'}</div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <button
                        onClick={() => handleNavigate('/orders')}
                        style={{
                            width: '100%',
                            padding: '14px',
                            background: '#2563eb',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'background 0.2s',
                            boxShadow: '0 4px 6px rgba(37, 99, 235, 0.2)'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#1d4ed8'}
                        onMouseLeave={(e) => e.currentTarget.style.background = '#2563eb'}
                    >
                        Tracking & Details
                    </button>

                    <button
                        onClick={() => handleNavigate('/')}
                        style={{
                            width: '100%',
                            padding: '14px',
                            background: 'transparent',
                            color: '#475569',
                            border: '1px solid #cbd5e1',
                            borderRadius: '12px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#f1f5f9';
                            e.currentTarget.style.color = '#1e293b';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = '#475569';
                        }}
                    >
                        Continue Shopping
                    </button>
                </div>

                {/* Global Styles for Keyframes */}
                <style>{`
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes scaleIn { from { transform: scale(0); } to { transform: scale(1); } }
          @keyframes ping { 75%, 100% { transform: scale(1.5); opacity: 0; } }
        `}</style>
            </div>
        </div>
    );
}
