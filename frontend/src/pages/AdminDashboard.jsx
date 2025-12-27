import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../auth';
import AdminOverview from '../components/admin/AdminOverview';
import ProductManager from '../components/admin/ProductManager';
import OrderManager from '../components/admin/OrderManager';
import UserManager from '../components/admin/UserManager';
import OfferManager from '../components/admin/OfferManager';
import ContentManager from '../components/admin/ContentManager';
import SupportManager from '../components/admin/SupportManager';
import AnalyticsManager from '../components/admin/AnalyticsManager';
import SettingsManager from '../components/admin/SettingsManager';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [expandedMenus, setExpandedMenus] = useState({});
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();

    // Force light mode colors for Admin Panel components
    const adminTextStyle = { color: '#0f172a' };

    const handleSearch = () => {
        if (searchText.trim()) {
            setActiveTab('products-all');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const toggleMenu = (menuId) => {
        setExpandedMenus(prev => ({ ...prev, [menuId]: !prev[menuId] }));
    };

    const renderContent = () => {
        // Simple routing based on activeTab (which might be a sub-item like 'users-view')
        if (activeTab === 'dashboard') return <AdminOverview setActiveTab={setActiveTab} />;
        if (activeTab.startsWith('users')) return <UserManager activeSubTab={activeTab} />;
        if (activeTab.startsWith('orders')) return <OrderManager activeSubTab={activeTab} />;
        if (activeTab.startsWith('products')) return <ProductManager activeSubTab={activeTab} />;
        if (activeTab.startsWith('analytics')) return <AnalyticsManager activeSubTab={activeTab} />;
        if (activeTab.startsWith('support')) return <SupportManager activeSubTab={activeTab} />;
        if (activeTab.startsWith('settings')) return <SettingsManager activeSubTab={activeTab} />;
        if (activeTab.startsWith('finance')) return <FinanceManager activeSubTab={activeTab} />;
        if (activeTab.startsWith('offer')) return <OfferManager activeSubTab={activeTab} />;
        if (activeTab.startsWith('content')) return <ContentManager activeSubTab={activeTab} />;
        return <AdminOverview />;
    };

    const menuStructure = [
        { id: 'dashboard', label: 'Dashboard', icon: '📊', type: 'link' },
        {
            id: 'users', label: 'Users Management', icon: '👥', type: 'menu', children: [
                { id: 'users-view', label: 'View Users' },
                { id: 'users-add', label: 'Add User' }
            ]
        },
        {
            id: 'orders', label: 'Orders Management', icon: '🛍️', type: 'menu', children: [
                { id: 'orders-all', label: 'All Orders' },
                { id: 'orders-pending', label: 'Pending Orders' },
                { id: 'orders-delivered', label: 'Delivered Orders' },
                { id: 'orders-cancelled', label: 'Cancelled Orders' }
            ]
        },
        {
            id: 'products', label: 'Products Management', icon: '📦', type: 'menu', children: [
                { id: 'products-all', label: 'All Products' },
                { id: 'products-add', label: 'Add New Product' },
                { id: 'products-categories', label: 'Categories' },
                { id: 'products-inventory', label: 'Inventory' }
            ]
        },
        {
            id: 'analytics', label: 'Analytics & Reports', icon: '📈', type: 'menu', children: [
                { id: 'analytics-sales', label: 'Sales Analytics' },
                { id: 'analytics-users', label: 'User Growth' },
                { id: 'analytics-traffic', label: 'Traffic Report' },
                { id: 'analytics-revenue', label: 'Revenue Report' }
            ]
        },
        {
            id: 'finance', label: 'Payment & Finance', icon: '💳', type: 'menu', children: [
                { id: 'finance-transactions', label: 'Transactions' },
                { id: 'finance-refunds', label: 'Refund Requests' }
            ]
        },
        {
            id: 'offer', label: 'Offers & Coupons', icon: '🏷️', type: 'menu', children: [
                { id: 'offer-active', label: 'Active Offers' },
                { id: 'offer-create', label: 'Create Offer' }
            ]
        },
        {
            id: 'content', label: 'Content Management', icon: '📝', type: 'menu', children: [
                { id: 'content-banners', label: 'Banners' },
                { id: 'content-pages', label: 'Pages' }
            ]
        },
        {
            id: 'support', label: 'Support & Tickets', icon: '🎧', type: 'menu', children: [
                { id: 'support-tickets', label: 'Support Tickets' },
                { id: 'support-messages', label: 'Messages' }
            ]
        },
        {
            id: 'settings', label: 'System Settings', icon: '⚙️', type: 'menu', children: [
                { id: 'settings-general', label: 'General Settings' },
                { id: 'settings-admin', label: 'Admin Accounts' },
                { id: 'settings-roles', label: 'Roles & Permissions' }
            ]
        },
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter, sans-serif' }}>
            {/* Sidebar */}
            <aside style={{
                width: isSidebarOpen ? '280px' : '80px',
                background: '#0f172a',
                color: '#fff',
                transition: 'width 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                position: 'fixed',
                height: '100vh',
                zIndex: 50,
                overflow: 'hidden'
            }}>
                <div style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid #1e293b', minHeight: '80px', boxSizing: 'border-box' }}>
                    <div style={{ width: '32px', height: '32px', background: '#3b82f6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>M</div>
                    {isSidebarOpen && <span style={{ fontSize: '18px', fontWeight: '700', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>AdminPanel</span>}
                </div>

                <nav style={{ flex: 1, padding: '12px', overflowY: 'auto', overflowX: 'hidden' }}>
                    {menuStructure.map(item => (
                        <div key={item.id} style={{ marginBottom: '4px' }}>
                            {item.type === 'link' ? (
                                <button
                                    onClick={() => setActiveTab(item.id)}
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '16px',
                                        padding: '12px 16px',
                                        background: activeTab === item.id ? '#3b82f6' : 'transparent',
                                        color: activeTab === item.id ? '#fff' : '#94a3b8',
                                        border: 'none',
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        justifyContent: isSidebarOpen ? 'flex-start' : 'center'
                                    }}
                                >
                                    <span style={{ fontSize: '20px', minWidth: '24px', textAlign: 'center' }}>{item.icon}</span>
                                    {isSidebarOpen && <span style={{ fontSize: '14px', fontWeight: '500' }}>{item.label}</span>}
                                </button>
                            ) : (
                                <div>
                                    <button
                                        onClick={() => isSidebarOpen ? toggleMenu(item.id) : setIsSidebarOpen(true)}
                                        style={{
                                            width: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            padding: '12px 16px',
                                            background: 'transparent',
                                            color: '#94a3b8',
                                            border: 'none',
                                            borderRadius: '12px',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                            <span style={{ fontSize: '20px', minWidth: '24px', textAlign: 'center' }}>{item.icon}</span>
                                            {isSidebarOpen && <span style={{ fontSize: '14px', fontWeight: '500' }}>{item.label}</span>}
                                        </div>
                                        {isSidebarOpen && <span style={{ fontSize: '12px', transform: expandedMenus[item.id] ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>▼</span>}
                                    </button>

                                    {/* Submenu */}
                                    {isSidebarOpen && expandedMenus[item.id] && (
                                        <div style={{ paddingLeft: '52px', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                            {item.children.map(child => (
                                                <button
                                                    key={child.id}
                                                    onClick={() => setActiveTab(child.id)}
                                                    style={{
                                                        textAlign: 'left',
                                                        padding: '8px 12px',
                                                        background: activeTab === child.id ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                                                        color: activeTab === child.id ? '#3b82f6' : '#64748b',
                                                        border: 'none',
                                                        borderRadius: '8px',
                                                        cursor: 'pointer',
                                                        fontSize: '13px',
                                                        fontWeight: activeTab === child.id ? '600' : '400'
                                                    }}
                                                >
                                                    {child.label}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>

                <div style={{ padding: '24px', borderTop: '1px solid #1e293b', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {/* Premium Home Button */}
                    <button
                        onClick={() => navigate('/')}
                        style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            padding: '16px',
                            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '16px',
                            cursor: 'pointer',
                            justifyContent: isSidebarOpen ? 'flex-start' : 'center',
                            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)',
                            transition: 'transform 0.2s',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        <div style={{
                            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                            background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 100%)',
                            pointerEvents: 'none'
                        }}></div>
                        <span style={{ fontSize: '20px', minWidth: '24px', textAlign: 'center', zIndex: 1 }}>🏠</span>
                        {isSidebarOpen && (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', zIndex: 1 }}>
                                <span style={{ fontSize: '14px', fontWeight: '700' }}>Back to Store</span>
                                <span style={{ fontSize: '11px', opacity: 0.8 }}>Exit Admin Panel</span>
                            </div>
                        )}
                    </button>

                    <button
                        onClick={handleLogout}
                        style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            padding: '12px 16px',
                            background: 'transparent',
                            color: '#94a3b8',
                            border: '1px solid #334155',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            justifyContent: isSidebarOpen ? 'flex-start' : 'center',
                            transition: 'all 0.2s'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.borderColor = '#ef4444';
                            e.currentTarget.style.color = '#ef4444';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.borderColor = '#334155';
                            e.currentTarget.style.color = '#94a3b8';
                        }}
                    >
                        <span style={{ fontSize: '20px', minWidth: '24px', textAlign: 'center' }}>🚪</span>
                        {isSidebarOpen && <span style={{ fontSize: '14px', fontWeight: '600' }}>Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, marginLeft: isSidebarOpen ? '280px' : '80px', transition: 'margin 0.3s ease', minWidth: 0 }}>
                {/* Header */}
                <header style={{ background: '#fff', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 40, height: '80px', boxSizing: 'border-box' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flex: 1 }}>
                        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '24px', color: '#64748b', padding: 0 }}>☰</button>

                        {/* Search Bar */}
                        <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
                            <span
                                style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', cursor: 'pointer' }}
                                onClick={handleSearch}
                            >
                                🔍
                            </span>
                            <input
                                placeholder="Search..."
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px 12px 10px 40px',
                                    borderRadius: '10px',
                                    border: '1px solid #e2e8f0',
                                    background: '#f8fafc',
                                    fontSize: '14px',
                                    outline: 'none',
                                    color: '#000'
                                }}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                        <button
                            onClick={() => setActiveTab('support-messages')}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', position: 'relative' }}
                            title="Messages"
                        >
                            💬
                            <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', background: '#3b82f6', borderRadius: '50%' }}></span>
                        </button>
                        <button
                            onClick={() => setActiveTab('support-tickets')}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', position: 'relative' }}
                            title="Notifications"
                        >
                            🔔
                            <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', background: '#ef4444', borderRadius: '50%' }}></span>
                        </button>
                        <button
                            onClick={() => setActiveTab('settings-general')}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px' }}
                            title="Settings"
                        >
                            ⚙️
                        </button>

                        <div style={{ width: '1px', height: '32px', background: '#e2e8f0' }}></div>

                        <div
                            style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
                            onClick={() => setActiveTab('settings-admin')}
                            title="Profile"
                        >
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a' }}>Admin User</div>
                                <div style={{ fontSize: '12px', color: '#64748b' }}>Super Admin</div>
                            </div>
                            <div style={{ width: '40px', height: '40px', background: '#e2e8f0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#64748b' }}>A</div>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <div style={{ padding: '32px', maxWidth: '1600px', margin: '0 auto', color: '#0f172a' }}>
                    {renderContent()}
                </div>
            </main>
        </div>
    );
}

function FinanceManager({ activeSubTab }) {
    return (
        <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', marginBottom: '24px' }}>
                {activeSubTab === 'finance-transactions' ? 'Transactions' : 'Refund Requests'}
            </h2>
            <div style={{ textAlign: 'center', padding: '48px', color: '#64748b' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>💰</div>
                <h3>Finance Module Placeholder</h3>
                <p>This section is under development.</p>
            </div>
        </div>
    );
}
