import React from 'react';

export default function AnalyticsManager({ activeSubTab }) {
    if (!activeSubTab || activeSubTab === 'analytics-sales') {
        return <SalesAnalytics />;
    }
    if (activeSubTab === 'analytics-users') {
        return <UserGrowthAnalytics />;
    }
    if (activeSubTab === 'analytics-traffic') {
        return <TrafficAnalytics />;
    }
    if (activeSubTab === 'analytics-revenue') {
        return <RevenueAnalytics />;
    }
    return <SalesAnalytics />;
}

function SalesAnalytics() {
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={headerStyle}>Sales Analytics</h2>
                <div style={{ padding: '8px 16px', background: '#dbeafe', color: '#1e40af', borderRadius: '8px', fontWeight: '600', fontSize: '14px' }}>
                    Last 30 Days
                </div>
            </div>

            {/* Key Insights Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '24px' }}>
                <div style={{ ...cardStyle, background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', color: '#fff' }}>
                    <div style={{ fontSize: '14px', opacity: 0.9 }}>Total Revenue</div>
                    <div style={{ fontSize: '32px', fontWeight: '800', margin: '4px 0' }}>₹12.4L</div>
                    <div style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ background: 'rgba(255,255,255,0.2)', padding: '2px 6px', borderRadius: '4px' }}>▲ 18%</span>
                        <span style={{ opacity: 0.8 }}>vs last month</span>
                    </div>
                </div>
                <div style={cardStyle}>
                    <div style={{ fontSize: '14px', color: '#64748b' }}>Avg. Order Value</div>
                    <div style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a', margin: '4px 0' }}>₹1,240</div>
                    <div style={{ fontSize: '13px', color: '#10b981' }}>▲ 5% increase</div>
                </div>
                <div style={cardStyle}>
                    <div style={{ fontSize: '14px', color: '#64748b' }}>Conversion Rate</div>
                    <div style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a', margin: '4px 0' }}>3.2%</div>
                    <div style={{ fontSize: '13px', color: '#64748b' }}>Steady growth</div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '24px' }}>
                <div style={cardStyle}>
                    <h3 style={titleStyle}>Monthly Sales Performance</h3>
                    <div style={{ ...chartContainer, flexDirection: 'row', alignItems: 'flex-end', gap: '12px', paddingBottom: '10px' }}>
                        {[40, 65, 45, 80, 55, 90, 70, 60, 75, 50, 85, 95].map((h, i) => (
                            <div key={i} style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                                <div style={{
                                    height: `${h}%`,
                                    background: i === 11 ? 'linear-gradient(180deg, #3b82f6 0%, #2563eb 100%)' : '#e2e8f0',
                                    borderRadius: '6px 6px 0 0',
                                    transition: 'all 0.3s',
                                    width: '100%'
                                }}></div>
                                <div style={{ textAlign: 'center', fontSize: '10px', color: '#64748b', marginTop: '6px', fontWeight: '500' }}>{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}</div>
                            </div>
                        ))}
                    </div>
                    <div style={{
                        marginTop: '20px',
                        padding: '20px',
                        background: 'linear-gradient(135deg, #eff6ff 0%, #f8fafc 100%)',
                        borderRadius: '16px',
                        border: '1px solid #dbeafe',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            bottom: 0,
                            width: '4px',
                            background: '#3b82f6'
                        }}></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                            <div style={{
                                background: '#3b82f6',
                                borderRadius: '50%',
                                width: '24px',
                                height: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '12px'
                            }}>✨</div>
                            <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#1e40af' }}>AI Analysis Insight</h4>
                        </div>
                        <p style={{ margin: 0, fontSize: '14px', color: '#334155', lineHeight: '1.6' }}>
                            December is showing the highest performance with a <span style={{ color: '#16a34a', fontWeight: '700' }}>95% target achievement</span>.
                            The noticeable dip in May was recovered by a strong Summer Sale campaign in June.
                            Projected to close the year with a roughly <span style={{ color: '#2563eb', fontWeight: '700' }}>25% annual growth</span>.
                        </p>
                    </div>
                </div>
                <div style={cardStyle}>
                    <h3 style={titleStyle}>Top Selling Categories</h3>
                    <div style={{ ...chartContainer, justifyContent: 'flex-start', gap: '16px', paddingTop: '10px' }}>
                        {[
                            { name: 'Electronics', pct: 85, color: '#3b82f6' },
                            { name: 'Fashion', pct: 65, color: '#10b981' },
                            { name: 'Home & Kitchen', pct: 45, color: '#f59e0b' },
                            { name: 'Beauty', pct: 30, color: '#ec4899' }
                        ].map((cat, i) => (
                            <div key={i} style={{ width: '100%' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '13px', fontWeight: '500', color: '#0f172a' }}>
                                    <span>{cat.name}</span>
                                    <span>{cat.pct}%</span>
                                </div>
                                <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                                    <div style={{ width: `${cat.pct}%`, height: '100%', background: cat.color, borderRadius: '4px' }}></div>
                                </div>
                            </div>
                        ))}
                        <div style={{ marginTop: 'auto', fontSize: '12px', color: '#64748b', textAlign: 'center' }}>
                            Electronics continues to dominate revenue share.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function UserGrowthAnalytics() {
    return (
        <div>
            <h2 style={headerStyle}>User Growth</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div style={cardStyle}>
                    <h3 style={titleStyle}>New Signups</h3>
                    <div style={{ ...chartContainer, position: 'relative' }}>
                        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '2px', background: '#e2e8f0' }}></div>
                        <svg viewBox="0 0 100 50" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                            <polyline points="0,45 20,35 40,40 60,25 80,30 100,10" fill="none" stroke="#10b981" strokeWidth="2" />
                        </svg>
                    </div>
                </div>
                <div style={cardStyle}>
                    <h3 style={titleStyle}>User Demographics</h3>
                    <div style={{ ...chartContainer, justifyContent: 'center' }}>
                        <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'conic-gradient(#8b5cf6 0% 55%, #ec4899 55% 100%)' }}></div>
                        <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
                            <span style={{ fontSize: '12px', color: '#8b5cf6', fontWeight: 'bold' }}>● Male (55%)</span>
                            <span style={{ fontSize: '12px', color: '#ec4899', fontWeight: 'bold' }}>● Female (45%)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function TrafficAnalytics() {
    return (
        <div>
            <h2 style={headerStyle}>Traffic Report</h2>
            <div style={cardStyle}>
                <h3 style={titleStyle}>Traffic Sources</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                    <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px', textAlign: 'center' }}>
                        <div style={{ fontSize: '24px', fontWeight: '700', color: '#3b82f6' }}>45%</div>
                        <div style={{ fontSize: '13px', color: '#64748b' }}>Direct Search</div>
                    </div>
                    <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px', textAlign: 'center' }}>
                        <div style={{ fontSize: '24px', fontWeight: '700', color: '#10b981' }}>30%</div>
                        <div style={{ fontSize: '13px', color: '#64748b' }}>Social Media</div>
                    </div>
                    <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px', textAlign: 'center' }}>
                        <div style={{ fontSize: '24px', fontWeight: '700', color: '#f59e0b' }}>25%</div>
                        <div style={{ fontSize: '13px', color: '#64748b' }}>Referrals</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function RevenueAnalytics() {
    return (
        <div>
            <h2 style={headerStyle}>Revenue Report</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
                <div style={cardStyle}>
                    <h3 style={titleStyle}>Total Revenue</h3>
                    <div style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>₹45,23,000</div>
                    <div style={{ color: '#10b981', fontWeight: '600', fontSize: '14px' }}>▲ 12% vs last month</div>
                </div>
                <div style={cardStyle}>
                    <h3 style={titleStyle}>Revenue Stream</h3>
                    <div style={{ ...chartContainer, justifyContent: 'center' }}>
                        <div style={{ width: '100%', height: '16px', background: '#e2e8f0', borderRadius: '8px', overflow: 'hidden', display: 'flex' }}>
                            <div style={{ width: '60%', background: '#3b82f6' }}></div>
                            <div style={{ width: '25%', background: '#10b981' }}></div>
                            <div style={{ width: '15%', background: '#f59e0b' }}></div>
                        </div>
                        <div style={{ display: 'flex', gap: '24px', marginTop: '16px' }}>
                            <span style={{ fontSize: '12px', fontWeight: '600', color: '#3b82f6' }}>● Product Sales</span>
                            <span style={{ fontSize: '12px', fontWeight: '600', color: '#10b981' }}>● Subscriptions</span>
                            <span style={{ fontSize: '12px', fontWeight: '600', color: '#f59e0b' }}>● Services</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const headerStyle = { fontSize: '24px', fontWeight: '700', color: '#0f172a', marginBottom: '24px' };

const cardStyle = { background: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', color: '#0f172a' };
const titleStyle = { fontSize: '16px', fontWeight: '700', color: '#0f172a', margin: '0 0 16px 0' };
const chartContainer = { width: '100%', height: '200px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' };
