import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const formatINR = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [expandedOrderId, setExpandedOrderId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const savedOrders = JSON.parse(localStorage.getItem('mini_amazon_orders') || '[]');
            setOrders(savedOrders);
        } catch (err) {
            console.error('Failed to load orders:', err);
        }
    }, []);

    const toggleTracking = (orderId) => {
        setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
    };

    const getStatusStyles = (status) => {
        const s = status?.toLowerCase() || 'processing';
        if (s === 'delivered') return { bg: '#dcfce7', text: '#15803d', border: '#bbf7d0', icon: '✓' };
        if (s === 'shipped') return { bg: '#ffedd5', text: '#c2410c', border: '#fed7aa', icon: '🚚' };
        return { bg: '#e0f2fe', text: '#0369a1', border: '#bae6fd', icon: '⚙️' };
    };

    if (orders.length === 0) {
        return (
            <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '60px 20px', textAlign: 'center' }}>
                <div style={{ maxWidth: 600, margin: '0 auto', background: '#fff', borderRadius: 24, padding: '60px 40px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                    <div style={{ fontSize: 64, marginBottom: 24 }}>📦</div>
                    <h2 style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>No orders yet</h2>
                    <p style={{ fontSize: 16, color: '#64748b', marginBottom: 32, lineHeight: 1.6 }}>
                        Looks like you haven't placed any orders yet.<br />Start shopping to fill this page with amazing items!
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        style={{
                            padding: '14px 32px',
                            background: '#2563eb',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 12,
                            fontWeight: 700,
                            fontSize: 16,
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(37,99,235,0.2)',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 8px 20px rgba(37,99,235,0.3)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(37,99,235,0.2)';
                        }}
                    >
                        Start Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '40px 20px' }}>
            <div style={{ maxWidth: 1000, margin: '0 auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
                    <h1 style={{ fontSize: 32, fontWeight: 800, color: '#0f172a', margin: 0 }}>Your Orders</h1>
                    <span style={{ background: '#fff', padding: '6px 16px', borderRadius: 20, fontSize: 14, fontWeight: 600, color: '#64748b', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                        {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
                    </span>
                </div>

                <div style={{ display: 'grid', gap: 32 }}>
                    {orders.map((order) => {
                        const statusStyle = getStatusStyles(order.status);
                        const isExpanded = expandedOrderId === order.id;

                        return (
                            <div key={order.id} style={{
                                background: '#fff',
                                borderRadius: 20,
                                overflow: 'hidden',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                                border: '1px solid #f1f5f9',
                                transition: 'all 0.3s ease'
                            }}>
                                {/* Order Header */}
                                <div style={{
                                    padding: '20px 24px',
                                    borderBottom: '1px solid #f1f5f9',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                    gap: 16,
                                    background: '#fff'
                                }}>
                                    <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
                                        <div>
                                            <div style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Order Placed</div>
                                            <div style={{ fontSize: 15, color: '#0f172a', fontWeight: 600 }}>{new Date(order.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Total Amount</div>
                                            <div style={{ fontSize: 15, color: '#0f172a', fontWeight: 600 }}>{formatINR(order.total)}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Ship To</div>
                                            <div style={{ fontSize: 15, color: '#2563eb', fontWeight: 600, cursor: 'pointer' }}>{order.address.fullName}</div>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Order ID</div>
                                        <div style={{ fontSize: 14, color: '#334155', fontFamily: 'monospace', fontWeight: 500 }}>#{order.id}</div>
                                    </div>
                                </div>

                                {/* Order Body */}
                                <div style={{ padding: '24px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <div style={{
                                                background: statusStyle.bg,
                                                color: statusStyle.text,
                                                border: `1px solid ${statusStyle.border}`,
                                                padding: '6px 16px',
                                                borderRadius: 999,
                                                fontSize: 14,
                                                fontWeight: 700,
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 6
                                            }}>
                                                <span>{statusStyle.icon}</span>
                                                {order.status}
                                            </div>
                                            <div style={{ fontSize: 14, color: '#64748b' }}>
                                                Estimated Delivery: <span style={{ fontWeight: 600, color: '#334155' }}>{new Date(new Date(order.date).setDate(new Date(order.date).getDate() + 5)).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => toggleTracking(order.id)}
                                            style={{
                                                padding: '10px 20px',
                                                background: isExpanded ? '#f1f5f9' : '#fff',
                                                border: '1px solid #e2e8f0',
                                                borderRadius: 10,
                                                color: '#0f172a',
                                                fontWeight: 600,
                                                fontSize: 14,
                                                cursor: 'pointer',
                                                transition: 'all 0.2s',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 8
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
                                            onMouseLeave={(e) => e.currentTarget.style.background = isExpanded ? '#f1f5f9' : '#fff'}
                                        >
                                            {isExpanded ? 'Hide Tracking' : 'Track Order'}
                                            <span style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>▼</span>
                                        </button>
                                    </div>

                                    {/* Tracking Timeline (Expandable) */}
                                    {isExpanded && (
                                        <div style={{
                                            marginTop: 24,
                                            marginBottom: 32,
                                            padding: '24px',
                                            background: '#f8fafc',
                                            borderRadius: 16,
                                            border: '1px solid #e2e8f0'
                                        }}>
                                            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginTop: 0, marginBottom: 24 }}>Order Status</h3>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', maxWidth: 600, margin: '0 auto' }}>
                                                {/* Connecting Line */}
                                                <div style={{ position: 'absolute', top: 12, left: 0, right: 0, height: 2, background: '#e2e8f0', zIndex: 0 }}></div>
                                                <div style={{ position: 'absolute', top: 12, left: 0, width: '33%', height: 2, background: '#2563eb', zIndex: 0 }}></div>

                                                {/* Steps */}
                                                {['Ordered', 'Processing', 'Shipped', 'Delivered'].map((step, idx) => {
                                                    const isCompleted = idx <= 1; // Mocking 'Processing' state
                                                    const isCurrent = idx === 1;
                                                    return (
                                                        <div key={step} style={{ position: 'relative', zIndex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                                                            <div style={{
                                                                width: 24,
                                                                height: 24,
                                                                borderRadius: '50%',
                                                                background: isCompleted ? '#2563eb' : '#fff',
                                                                border: isCompleted ? 'none' : '2px solid #cbd5e1',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                color: '#fff',
                                                                fontSize: 12,
                                                                fontWeight: 700,
                                                                boxShadow: isCurrent ? '0 0 0 4px rgba(37,99,235,0.2)' : 'none'
                                                            }}>
                                                                {isCompleted && '✓'}
                                                            </div>
                                                            <div style={{ fontSize: 13, fontWeight: isCompleted ? 700 : 500, color: isCompleted ? '#0f172a' : '#64748b' }}>{step}</div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    {/* Items List */}
                                    <div style={{ display: 'grid', gap: 20 }}>
                                        {order.items.map((item, idx) => (
                                            <div key={idx} style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                                                <div style={{
                                                    width: 80,
                                                    height: 80,
                                                    borderRadius: 12,
                                                    overflow: 'hidden',
                                                    border: '1px solid #e2e8f0',
                                                    background: '#fff',
                                                    flexShrink: 0
                                                }}>
                                                    <img
                                                        src={item.imageUrl || 'https://via.placeholder.com/80x80/eeeeee/888888?text=Product'}
                                                        alt={item.name}
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    />
                                                </div>
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>{item.name}</div>
                                                    <div style={{ fontSize: 14, color: '#64748b' }}>Qty: {item.quantity}</div>
                                                </div>
                                                <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a' }}>
                                                    {formatINR(item.price)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
