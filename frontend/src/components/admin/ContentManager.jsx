import React from 'react';

export default function ContentManager({ activeSubTab }) {
    return (
        <div>
            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', marginBottom: '24px' }}>Content Management</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div style={cardStyle}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <h3 style={sectionTitle}>Promotional Banners</h3>
                        <button style={btnStyle}>+ Add Banner</button>
                    </div>
                    <div style={{ display: 'grid', gap: '16px' }}>
                        {[
                            { name: 'Summer Sale Hero', status: 'Active', views: '12.5k' },
                            { name: 'New Arrivals Sidebar', status: 'Active', views: '8.2k' },
                            { name: 'Diwali Special', status: 'Scheduled', views: '-' }
                        ].map((banner, i) => (
                            <div key={i} style={itemStyle}>
                                <div>
                                    <div style={{ fontWeight: '600', color: '#0f172a' }}>{banner.name}</div>
                                    <div style={{ fontSize: '12px', color: '#64748b' }}>{banner.views} views</div>
                                </div>
                                <span style={{ ...badgeStyle, background: banner.status === 'Active' ? '#ecfdf5' : '#fff7ed', color: banner.status === 'Active' ? '#047857' : '#c2410c' }}>
                                    {banner.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={cardStyle}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <h3 style={sectionTitle}>Page Content</h3>
                        <button style={btnStyle}>+ Add Page</button>
                    </div>
                    <div style={{ display: 'grid', gap: '16px' }}>
                        {['About Us', 'Privacy Policy', 'Terms of Service', 'Return Policy'].map((page, i) => (
                            <div key={i} style={itemStyle}>
                                <div style={{ fontWeight: '600', color: '#0f172a' }}>{page}</div>
                                <button style={{ color: '#3b82f6', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>Edit</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

const cardStyle = { background: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', color: '#0f172a' };
const sectionTitle = { fontSize: '18px', fontWeight: '700', color: '#0f172a', margin: 0 };
const itemStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#f8fafc' };
const btnStyle = { padding: '6px 12px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' };
const badgeStyle = { padding: '4px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: '600' };
