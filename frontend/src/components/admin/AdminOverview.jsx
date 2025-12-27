import React from 'react';

const formatINR = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);

export default function AdminOverview({ setActiveTab }) {
    // Row 1: Summary Cards
    const stats = [
        { label: 'Total Users', value: '8,500', change: '+15%', icon: '👥', color: '#8b5cf6', bg: '#f5f3ff' },
        { label: 'Total Orders', value: '1,245', change: '+8%', icon: '📦', color: '#3b82f6', bg: '#eff6ff' },
        { label: 'Total Revenue', value: formatINR(1250000), change: '+12%', icon: '💰', color: '#10b981', bg: '#ecfdf5' },
        { label: 'Total Products', value: '450', change: '+5', icon: '🏷️', color: '#f59e0b', bg: '#fffbeb' },
    ];

    // ... (keep lists)
    // Row 3: Recent Orders
    const recentOrders = [
        { id: '#ORD-001', user: 'John Doe', amount: '₹2,499', status: 'Pending', date: '2 mins ago' },
        { id: '#ORD-002', user: 'Jane Smith', amount: '₹899', status: 'Shipped', date: '15 mins ago' },
        { id: '#ORD-003', user: 'Mike Ross', amount: '₹12,000', status: 'Delivered', date: '1 hour ago' },
        { id: '#ORD-004', user: 'Rachel Green', amount: '₹4,500', status: 'Processing', date: '2 hours ago' },
    ];

    // Row 3: Top Selling Products
    const topProducts = [
        { name: 'Wireless Earbuds', sales: 120, revenue: '₹2,40,000' },
        { name: 'Smart Watch Series 5', sales: 85, revenue: '₹4,25,000' },
        { name: 'Ergonomic Chair', sales: 45, revenue: '₹3,60,000' },
        { name: 'Mechanical Keyboard', sales: 30, revenue: '₹1,50,000' },
    ];

    // Chart Data
    const salesData = [
        { label: 'Mon', value: 12000 },
        { label: 'Tue', value: 19000 },
        { label: 'Wed', value: 15000 },
        { label: 'Thu', value: 24000 },
        { label: 'Fri', value: 21000 },
        { label: 'Sat', value: 32000 },
        { label: 'Sun', value: 28000 },
    ];

    const userGrowthData = [
        { label: 'W1', value: 120 },
        { label: 'W2', value: 145 },
        { label: 'W3', value: 132 },
        { label: 'W4', value: 180 },
        { label: 'W5', value: 210 },
        { label: 'W6', value: 250 },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

            {/* Row 1: Summary Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
                {stats.map((stat, index) => (
                    <div key={index} style={cardStyle}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <div style={{ fontSize: '14px', color: '#64748b', fontWeight: '600' }}>{stat.label}</div>
                                <div style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', margin: '8px 0' }}>{stat.value}</div>
                                <div style={{ fontSize: '13px', color: stat.change.startsWith('+') ? '#10b981' : '#ef4444', fontWeight: '600' }}>{stat.change} from last month</div>
                            </div>
                            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: stat.bg, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                                {stat.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Row 2: Graph & Analytics */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
                <div style={cardStyle}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h3 style={titleStyle}>Sales Analytics</h3>
                        <select style={selectStyle}>
                            <option>This Week</option>
                            <option>This Month</option>
                            <option>This Year</option>
                        </select>
                    </div>
                    <div style={{ height: '300px', width: '100%' }}>
                        <SimpleBarChart data={salesData} color="#3b82f6" />
                    </div>
                </div>
                <div style={cardStyle}>
                    <h3 style={{ ...titleStyle, marginBottom: '24px' }}>User Growth</h3>
                    <div style={{ height: '300px', width: '100%' }}>
                        <SimpleLineChart data={userGrowthData} color="#10b981" />
                    </div>
                </div>
            </div>

            {/* Row 3: Tables */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
                <div style={cardStyle}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h3 style={titleStyle}>Recent Orders</h3>
                        <button style={{ color: '#3b82f6', background: 'none', border: 'none', fontWeight: '600', cursor: 'pointer' }}>View All</button>
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid #f1f5f9', textAlign: 'left' }}>
                                <th style={thStyle}>Order ID</th>
                                <th style={thStyle}>User</th>
                                <th style={thStyle}>Amount</th>
                                <th style={thStyle}>Status</th>
                                <th style={thStyle}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders.map((order, i) => (
                                <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={tdStyle}>{order.id}</td>
                                    <td style={tdStyle}>{order.user}</td>
                                    <td style={tdStyle}>{order.amount}</td>
                                    <td style={tdStyle}>
                                        <span style={{ padding: '4px 10px', borderRadius: '20px', background: getStatusColor(order.status).bg, color: getStatusColor(order.status).color, fontWeight: '600', fontSize: '11px' }}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td style={tdStyle}>
                                        <button style={{ color: '#64748b', background: 'none', border: 'none', cursor: 'pointer' }}>👁️</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div style={cardStyle}>
                    <h3 style={{ ...titleStyle, marginBottom: '24px' }}>Top Selling Products</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {topProducts.map((prod, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <div style={{ fontWeight: '600', color: '#0f172a' }}>{prod.name}</div>
                                    <div style={{ fontSize: '12px', color: '#64748b' }}>{prod.sales} sales</div>
                                </div>
                                <div style={{ fontWeight: '700', color: '#0f172a' }}>{prod.revenue}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Row 4: Quick Management Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
                <QuickActionCard
                    icon="➕"
                    title="Add Product"
                    color="#3b82f6"
                    onClick={() => setActiveTab && setActiveTab('products-add')}
                />
                <QuickActionCard
                    icon="📦"
                    title="Manage Inventory"
                    color="#10b981"
                    onClick={() => setActiveTab && setActiveTab('products-inventory')}
                />
                <QuickActionCard
                    icon="🎫"
                    title="View Tickets"
                    color="#f59e0b"
                    onClick={() => setActiveTab && setActiveTab('support-tickets')}
                />
                <QuickActionCard
                    icon="📢"
                    title="Create Announcement"
                    color="#8b5cf6"
                    onClick={() => setActiveTab && setActiveTab('content-banners')}
                />
            </div>
        </div>
    );
}

function QuickActionCard({ icon, title, color, onClick }) {
    return (
        <div
            onClick={onClick}
            style={{ ...cardStyle, display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', transition: 'transform 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${color}20`, color: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                {icon}
            </div>
            <div style={{ fontWeight: '600', color: '#0f172a' }}>{title}</div>
        </div>
    );
}

function getStatusColor(status) {
    switch (status) {
        case 'Pending': return { bg: '#fff7ed', color: '#c2410c' };
        case 'Shipped': return { bg: '#eff6ff', color: '#1d4ed8' };
        case 'Delivered': return { bg: '#ecfdf5', color: '#047857' };
        default: return { bg: '#f1f5f9', color: '#475569' };
    }
}

const SimpleBarChart = ({ data, color }) => {
    const maxVal = Math.max(...data.map(d => d.value));
    const padding = 20; // internal padding
    const width = 100; // percent
    const height = 100; // percent

    return (
        <svg width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="none">
            {/* Axis Lines */}
            <line x1="20" y1="180" x2="380" y2="180" stroke="#e2e8f0" strokeWidth="1" />

            {/* Bars */}
            {data.map((d, i) => {
                const barHeight = (d.value / maxVal) * 150;
                const barWidth = 20;
                const x = 40 + (i * ((340) / (data.length - 1 || 1)));
                return (
                    <g key={i}>
                        <rect
                            x={x - barWidth / 2}
                            y={180 - barHeight}
                            width={barWidth}
                            height={barHeight}
                            fill={color}
                            rx="4"
                        />
                        <text
                            x={x}
                            y="195"
                            textAnchor="middle"
                            fontSize="10"
                            fill="#64748b"
                        >
                            {d.label}
                        </text>
                    </g>
                );
            })}
        </svg>
    );
};

const SimpleLineChart = ({ data, color }) => {
    const maxVal = Math.max(...data.map(d => d.value));
    const points = data.map((d, i) => {
        const x = 20 + (i * (360 / (data.length - 1)));
        const y = 180 - ((d.value / maxVal) * 150);
        return `${x},${y}`;
    }).join(' ');

    return (
        <svg width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="none">
            {/* Grid Lines */}
            <line x1="20" y1="30" x2="380" y2="30" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="20" y1="105" x2="380" y2="105" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="20" y1="180" x2="380" y2="180" stroke="#e2e8f0" strokeWidth="1" />

            {/* Line */}
            <polyline
                fill="none"
                stroke={color}
                strokeWidth="3"
                points={points}
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Dots */}
            {data.map((d, i) => {
                const x = 20 + (i * (360 / (data.length - 1)));
                const y = 180 - ((d.value / maxVal) * 150);
                return (
                    <circle key={i} cx={x} cy={y} r="4" fill="#fff" stroke={color} strokeWidth="2" />
                );
            })}
        </svg>
    );
};

const cardStyle = { background: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', color: '#0f172a' };
const titleStyle = { fontSize: '18px', fontWeight: '700', color: '#0f172a', margin: 0 };
const selectStyle = { padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '14px', color: '#0f172a', background: '#fff' };
const thStyle = { padding: '12px 0', color: '#64748b', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' };
const tdStyle = { padding: '16px 0', color: '#334155', fontSize: '14px' };
