import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../contexts/WishlistContext';

export default function UserDashboard() {
    const navigate = useNavigate();
    const { wishlistItems } = useWishlist();
    const [showNotifications, setShowNotifications] = useState(false);
    const notifRef = useRef(null);

    const [profile] = useState(() => {
        const saved = localStorage.getItem('mini_amazon_profile');
        return saved ? JSON.parse(saved) : {
            fullName: 'Vishnu Kumar',
            email: 'vishnu@example.com',
            phone: '+91 98765 43210',
            address: { line1: '123, Tech Park' }
        };
    });

    const [notifications, setNotifications] = useState([
        { id: 1, title: 'Order Out for Delivery', msg: 'Your order #12345 is on its way.', time: '2h ago', read: false, icon: '🚚', color: '#10b981', bg: '#ecfdf5' },
        { id: 2, title: 'Flash Sale Alert', msg: '50% off sale starts in 30 mins!', time: '1h ago', read: false, icon: '⚡', color: '#f59e0b', bg: '#fffbeb' },
        { id: 3, title: 'Payment Successful', msg: 'Payment for order #12344 confirmed.', time: '1d ago', read: true, icon: '✅', color: '#3b82f6', bg: '#eff6ff' },
    ]);

    const unreadCount = notifications.filter(n => !n.read).length;

    useEffect(() => {
        function handleClickOutside(event) {
            if (notifRef.current && !notifRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const markAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const clearAll = () => {
        setNotifications([]);
    };

    const alerts = [
        { id: 1, type: 'delivery', message: 'Your order #12345 is out for delivery!', time: '2 hours ago', icon: '🚚', color: '#10b981', bg: '#ecfdf5' },
        { id: 2, type: 'offer', message: 'Flash Sale: 50% off on Electronics starts in 1h.', time: '30 mins ago', icon: '⚡', color: '#f59e0b', bg: '#fffbeb' },
    ];

    const insights = [
        { label: 'Spending', value: '$1,250', change: '+12%', data: [40, 65, 45, 80, 55, 90] },
        { label: 'Orders', value: '12', change: '+2', data: [2, 4, 3, 5, 2, 6] },
    ];

    const recentOrders = [
        { id: '12345', item: 'Sony WH-1000XM5', price: '$348.00', status: 'Out for Delivery', date: 'Today', img: '🎧' },
        { id: '12344', item: 'Nike Air Max', price: '$120.00', status: 'Delivered', date: 'Yesterday', img: '👟' },
    ];

    return (
        <div style={styles.container}>
            {/* Header Section */}
            <header style={styles.header}>
                <div style={styles.profileSection}>
                    <div style={styles.avatar}>
                        {profile.fullName.charAt(0)}
                        <div style={styles.onlineStatus} />
                    </div>
                    <div>
                        <h1 style={styles.welcomeText}>Welcome back, {profile.fullName.split(' ')[0]}!</h1>
                        <div style={styles.badges}>
                            <span style={styles.badgeGold}>🌟 Gold Member</span>
                            <span style={styles.badgeTrust}>🛡️ Trust Score: 98/100</span>
                        </div>
                    </div>
                </div>
                <div style={styles.headerActions}>
                    <div style={{ position: 'relative' }} ref={notifRef}>
                        <button
                            style={styles.iconButton}
                            onClick={() => setShowNotifications(!showNotifications)}
                        >
                            🔔
                            {unreadCount > 0 && <span style={styles.notifDot} />}
                        </button>

                        {/* Notification Dropdown */}
                        {showNotifications && (
                            <div style={styles.dropdown}>
                                <div style={styles.dropdownHeader}>
                                    <h3 style={styles.dropdownTitle}>Notifications</h3>
                                    <div style={{ display: 'flex', gap: '12px' }}>
                                        <button onClick={markAsRead} style={styles.textBtn}>Mark read</button>
                                        <button onClick={clearAll} style={styles.textBtn}>Clear</button>
                                    </div>
                                </div>
                                <div style={styles.notifList}>
                                    {notifications.length > 0 ? notifications.map(notif => (
                                        <div key={notif.id} style={{ ...styles.notifItem, opacity: notif.read ? 0.6 : 1 }}>
                                            <div style={{ ...styles.notifIcon, background: notif.bg, color: notif.color }}>{notif.icon}</div>
                                            <div>
                                                <div style={styles.notifTitle}>{notif.title}</div>
                                                <div style={styles.notifMsg}>{notif.msg}</div>
                                                <div style={styles.notifTime}>{notif.time}</div>
                                            </div>
                                            {!notif.read && <div style={styles.unreadDot} />}
                                        </div>
                                    )) : (
                                        <div style={styles.emptyNotif}>No new notifications</div>
                                    )}
                                </div>
                                <div style={styles.dropdownFooter}>
                                    <button style={styles.viewAllBtn}>View All Notifications</button>
                                </div>
                            </div>
                        )}
                    </div>
                    <button style={styles.iconButton} onClick={() => navigate('/profile')}>⚙️</button>
                </div>
            </header>

            {/* Intelligent Alerts */}
            <section style={styles.section}>
                <h2 style={styles.sectionTitle}>Notifications & Alerts</h2>
                <div style={styles.alertsGrid}>
                    {alerts.map(alert => (
                        <div key={alert.id} style={{ ...styles.alertCard, background: alert.bg, borderColor: alert.color }}>
                            <div style={{ ...styles.alertIcon, color: alert.color }}>{alert.icon}</div>
                            <div>
                                <p style={styles.alertMessage}>{alert.message}</p>
                                <span style={styles.alertTime}>{alert.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Main Dashboard Grid */}
            <div style={styles.mainGrid}>

                {/* Left Column */}
                <div style={styles.leftColumn}>

                    {/* Recent Orders */}
                    <div style={styles.card}>
                        <div style={styles.cardHeader}>
                            <h3 style={styles.cardTitle}>Recent Orders</h3>
                            <button style={styles.linkButton} onClick={() => navigate('/orders')}>View All</button>
                        </div>
                        <div style={styles.ordersList}>
                            {recentOrders.map(order => (
                                <div key={order.id} style={styles.orderItem}>
                                    <div style={styles.orderImg}>{order.img}</div>
                                    <div style={{ flex: 1 }}>
                                        <div style={styles.orderName}>{order.item}</div>
                                        <div style={styles.orderMeta}>Order #{order.id} • {order.price}</div>
                                    </div>
                                    <div style={styles.orderStatus}>
                                        <span style={{ ...styles.statusDot, background: order.status === 'Delivered' ? '#10b981' : '#3b82f6' }} />
                                        {order.status}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Activity Insights */}
                    <div style={styles.card}>
                        <h3 style={styles.cardTitle}>Activity Insights</h3>
                        <div style={styles.insightsGrid}>
                            {insights.map((insight, idx) => (
                                <div key={idx} style={styles.insightItem}>
                                    <div style={styles.insightLabel}>{insight.label}</div>
                                    <div style={styles.insightValue}>{insight.value} <span style={styles.insightChange}>{insight.change}</span></div>
                                    <div style={styles.chartRow}>
                                        {insight.data.map((h, i) => (
                                            <div key={i} style={{ ...styles.chartBar, height: `${h}%` }} />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Right Column */}
                <div style={styles.rightColumn}>

                    {/* Wishlist Highlights */}
                    <div style={styles.card}>
                        <div style={styles.cardHeader}>
                            <h3 style={styles.cardTitle}>Wishlist Highlights</h3>
                            <button style={styles.linkButton} onClick={() => navigate('/wishlist')}>See All</button>
                        </div>
                        {wishlistItems.length > 0 ? (
                            <div style={styles.wishlistGrid}>
                                {wishlistItems.slice(0, 4).map(item => (
                                    <div key={item.id} style={styles.wishlistCard}>
                                        <div style={styles.wishlistImg}>🎁</div>
                                        <div style={styles.wishlistName}>{item.name}</div>
                                        <div style={styles.wishlistPrice}>${item.price}</div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div style={styles.emptyState}>Your wishlist is empty</div>
                        )}
                    </div>

                    {/* Quick Actions */}
                    <div style={styles.card}>
                        <h3 style={styles.cardTitle}>Quick Actions</h3>
                        <div style={styles.actionsGrid}>
                            <ActionButton icon="📦" label="Track Order" onClick={() => navigate('/orders')} />
                            <ActionButton icon="👤" label="Edit Profile" onClick={() => navigate('/profile')} />
                            <ActionButton icon="🎧" label="Support" onClick={() => navigate('/help')} />
                            <ActionButton
                                icon="🛡️"
                                label="Security"
                                onClick={() => {
                                    navigate('/profile');
                                    setTimeout(() => document.getElementById('security-settings')?.scrollIntoView({ behavior: 'smooth' }), 100);
                                }}
                            />
                        </div>
                    </div>

                    {/* Account Summary Mini */}
                    <div style={styles.card}>
                        <h3 style={styles.cardTitle}>Account Overview</h3>
                        <div style={styles.summaryRow}>
                            <div style={styles.summaryItem}>
                                <div style={styles.summaryLabel}>Email</div>
                                <div style={styles.summaryValue}>{profile.email}</div>
                            </div>
                            <div style={styles.summaryItem}>
                                <div style={styles.summaryLabel}>Phone</div>
                                <div style={styles.summaryValue}>{profile.phone}</div>
                            </div>
                        </div>
                        <div style={{ ...styles.summaryRow, border: 'none' }}>
                            <div style={styles.summaryItem}>
                                <div style={styles.summaryLabel}>Default Address</div>
                                <div style={styles.summaryValue}>{profile.address?.line1 || 'No address set'}</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

function ActionButton({ icon, label, onClick }) {
    return (
        <button style={styles.actionBtn} onClick={onClick}>
            <div style={styles.actionIcon}>{icon}</div>
            <span style={styles.actionLabel}>{label}</span>
        </button>
    );
}

const styles = {
    container: {
        padding: '40px',
        maxWidth: '1400px',
        margin: '0 auto',
        minHeight: '100vh',
        background: '#f8fafc',
        fontFamily: "'Inter', sans-serif",
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '40px',
        background: '#fff',
        padding: '32px',
        borderRadius: '24px',
        boxShadow: '0 4px 20px -4px rgba(0,0,0,0.05)',
        position: 'relative',
        zIndex: 100
    },
    profileSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
    },
    avatar: {
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        color: '#fff',
        fontSize: '32px',
        fontWeight: '700',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        boxShadow: '0 8px 16px rgba(99, 102, 241, 0.2)',
    },
    onlineStatus: {
        position: 'absolute',
        bottom: '4px',
        right: '4px',
        width: '16px',
        height: '16px',
        background: '#10b981',
        borderRadius: '50%',
        border: '3px solid #fff',
    },
    welcomeText: {
        fontSize: '2rem',
        fontWeight: '800',
        color: '#0f172a',
        margin: '0 0 8px 0',
    },
    badges: {
        display: 'flex',
        gap: '12px',
    },
    badgeGold: {
        background: '#fffbeb',
        color: '#b45309',
        padding: '6px 12px',
        borderRadius: '20px',
        fontSize: '0.85rem',
        fontWeight: '700',
        border: '1px solid #fcd34d',
    },
    badgeTrust: {
        background: '#ecfdf5',
        color: '#047857',
        padding: '6px 12px',
        borderRadius: '20px',
        fontSize: '0.85rem',
        fontWeight: '700',
        border: '1px solid #6ee7b7',
    },
    headerActions: {
        display: 'flex',
        gap: '16px',
    },
    iconButton: {
        width: '48px',
        height: '48px',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        background: '#fff',
        fontSize: '20px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s',
        position: 'relative',
    },
    notifDot: {
        position: 'absolute',
        top: '12px',
        right: '12px',
        width: '8px',
        height: '8px',
        background: '#ef4444',
        borderRadius: '50%',
        border: '2px solid #fff'
    },
    dropdown: {
        position: 'absolute',
        top: '60px',
        right: '0',
        width: '360px',
        background: '#fff',
        borderRadius: '20px',
        boxShadow: '0 10px 40px -10px rgba(0,0,0,0.15)',
        border: '1px solid #f1f5f9',
        overflow: 'hidden',
        zIndex: 1000,
        animation: 'fadeIn 0.2s ease-out'
    },
    dropdownHeader: {
        padding: '16px 20px',
        borderBottom: '1px solid #f1f5f9',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#f8fafc'
    },
    dropdownTitle: {
        fontSize: '1rem',
        fontWeight: '700',
        color: '#0f172a',
        margin: 0
    },
    textBtn: {
        background: 'none',
        border: 'none',
        color: '#6366f1',
        fontSize: '0.8rem',
        fontWeight: '600',
        cursor: 'pointer'
    },
    notifList: {
        maxHeight: '300px',
        overflowY: 'auto'
    },
    notifItem: {
        padding: '16px 20px',
        borderBottom: '1px solid #f1f5f9',
        display: 'flex',
        gap: '16px',
        alignItems: 'start',
        cursor: 'pointer',
        transition: 'background 0.2s'
    },
    notifIcon: {
        width: '36px',
        height: '36px',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '18px',
        flexShrink: 0
    },
    notifTitle: {
        fontSize: '0.9rem',
        fontWeight: '600',
        color: '#0f172a',
        marginBottom: '2px'
    },
    notifMsg: {
        fontSize: '0.85rem',
        color: '#64748b',
        lineHeight: '1.4',
        marginBottom: '4px'
    },
    notifTime: {
        fontSize: '0.75rem',
        color: '#94a3b8',
        fontWeight: '500'
    },
    unreadDot: {
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: '#3b82f6',
        marginTop: '6px'
    },
    emptyNotif: {
        padding: '32px',
        textAlign: 'center',
        color: '#94a3b8',
        fontSize: '0.9rem'
    },
    dropdownFooter: {
        padding: '12px',
        borderTop: '1px solid #f1f5f9',
        textAlign: 'center'
    },
    viewAllBtn: {
        background: 'none',
        border: 'none',
        color: '#0f172a',
        fontSize: '0.85rem',
        fontWeight: '600',
        cursor: 'pointer'
    },
    section: {
        marginBottom: '32px',
    },
    sectionTitle: {
        fontSize: '1.25rem',
        fontWeight: '700',
        color: '#334155',
        marginBottom: '20px',
        marginLeft: '8px',
    },
    alertsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
    },
    alertCard: {
        padding: '20px',
        borderRadius: '16px',
        borderLeft: '4px solid',
        display: 'flex',
        alignItems: 'start',
        gap: '16px',
    },
    alertIcon: {
        fontSize: '24px',
    },
    alertMessage: {
        margin: '0 0 4px 0',
        fontWeight: '600',
        color: '#1e293b',
        fontSize: '0.95rem',
    },
    alertTime: {
        fontSize: '0.8rem',
        color: '#64748b',
    },
    mainGrid: {
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '32px',
        alignItems: 'start',
    },
    leftColumn: {
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
    },
    rightColumn: {
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
    },
    card: {
        background: '#fff',
        borderRadius: '24px',
        padding: '32px',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
    },
    cardHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
    },
    cardTitle: {
        fontSize: '1.25rem',
        fontWeight: '700',
        color: '#0f172a',
        margin: 0,
    },
    linkButton: {
        background: 'none',
        border: 'none',
        color: '#4f46e5',
        fontWeight: '600',
        cursor: 'pointer',
        fontSize: '0.9rem',
    },
    ordersList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    orderItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        padding: '16px',
        background: '#f8fafc',
        borderRadius: '16px',
        transition: 'transform 0.2s',
    },
    orderImg: {
        width: '56px',
        height: '56px',
        background: '#fff',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    },
    orderName: {
        fontWeight: '600',
        color: '#0f172a',
        marginBottom: '4px',
    },
    orderMeta: {
        fontSize: '0.85rem',
        color: '#64748b',
    },
    orderStatus: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '0.9rem',
        fontWeight: '600',
        color: '#334155',
    },
    statusDot: {
        width: '8px',
        height: '8px',
        borderRadius: '50%',
    },
    insightsGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px',
    },
    insightItem: {
        padding: '20px',
        background: '#f8fafc',
        borderRadius: '16px',
    },
    insightLabel: {
        fontSize: '0.9rem',
        color: '#64748b',
        marginBottom: '8px',
    },
    insightValue: {
        fontSize: '1.5rem',
        fontWeight: '800',
        color: '#0f172a',
        marginBottom: '16px',
    },
    insightChange: {
        fontSize: '0.85rem',
        color: '#10b981',
        background: '#d1fae5',
        padding: '2px 6px',
        borderRadius: '6px',
        marginLeft: '8px',
        verticalAlign: 'middle',
    },
    chartRow: {
        display: 'flex',
        alignItems: 'flex-end',
        gap: '8px',
        height: '60px',
    },
    chartBar: {
        flex: 1,
        background: '#cbd5e1',
        borderRadius: '4px',
        transition: 'height 0.5s ease',
    },
    wishlistGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
    },
    wishlistCard: {
        padding: '16px',
        border: '1px solid #e2e8f0',
        borderRadius: '16px',
        textAlign: 'center',
    },
    wishlistImg: {
        fontSize: '32px',
        marginBottom: '12px',
    },
    wishlistName: {
        fontSize: '0.9rem',
        fontWeight: '600',
        color: '#0f172a',
        marginBottom: '4px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    wishlistPrice: {
        fontSize: '0.85rem',
        color: '#64748b',
        fontWeight: '600',
    },
    emptyState: {
        textAlign: 'center',
        color: '#94a3b8',
        padding: '20px',
    },
    actionsGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
    },
    actionBtn: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '16px',
        cursor: 'pointer',
        transition: 'all 0.2s',
    },
    actionIcon: {
        fontSize: '24px',
        marginBottom: '8px',
    },
    actionLabel: {
        fontSize: '0.85rem',
        fontWeight: '600',
        color: '#475569',
    },
    summaryRow: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingBottom: '16px',
        marginBottom: '16px',
        borderBottom: '1px solid #f1f5f9',
    },
    summaryItem: {
        flex: 1,
    },
    summaryLabel: {
        fontSize: '0.8rem',
        color: '#94a3b8',
        textTransform: 'uppercase',
        fontWeight: '600',
        marginBottom: '4px',
    },
    summaryValue: {
        fontSize: '0.95rem',
        color: '#0f172a',
        fontWeight: '500',
    },
};
