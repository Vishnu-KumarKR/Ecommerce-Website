import React from 'react';

export default function SettingsManager({ activeSubTab }) {
    return (
        <div>
            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', marginBottom: '24px' }}>
                {activeSubTab === 'settings-admin' ? 'Admin Management' : 'General Settings'}
            </h2>

            {activeSubTab === 'settings-admin' ? (
                <div style={{ display: 'grid', gap: '24px' }}>
                    <div style={cardStyle}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <h3 style={sectionTitle}>Admin Accounts</h3>
                            <button style={{ padding: '8px 16px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>+ Add Admin</button>
                        </div>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid #f1f5f9', textAlign: 'left' }}>
                                    <th style={thStyle}>Name</th>
                                    <th style={thStyle}>Email</th>
                                    <th style={thStyle}>Role</th>
                                    <th style={thStyle}>Last Active</th>
                                    <th style={thStyle}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={tdStyle}>Admin User</td>
                                    <td style={tdStyle}>admin@miniamazon.com</td>
                                    <td style={tdStyle}><span style={badgeStyle}>Super Admin</span></td>
                                    <td style={tdStyle}>Now</td>
                                    <td style={tdStyle}>-</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={tdStyle}>Support Lead</td>
                                    <td style={tdStyle}>support@miniamazon.com</td>
                                    <td style={tdStyle}><span style={{ ...badgeStyle, background: '#eff6ff', color: '#3b82f6' }}>Support</span></td>
                                    <td style={tdStyle}>2 hours ago</td>
                                    <td style={tdStyle}><button style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}>Remove</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div style={cardStyle}>
                        <h3 style={sectionTitle}>Roles & Permissions</h3>
                        <div style={{ color: '#64748b', fontSize: '14px' }}>Manage access levels for different admin roles.</div>
                        {/* Mock permissions checkboxes */}
                        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '16px' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid #e2e8f0', textAlign: 'left' }}>
                                    <th style={{ padding: '12px', fontSize: '13px', color: '#64748b' }}>Permission</th>
                                    <th style={{ padding: '12px', fontSize: '13px', color: '#64748b', textAlign: 'center' }}>Admin</th>
                                    <th style={{ padding: '12px', fontSize: '13px', color: '#64748b', textAlign: 'center' }}>Manager</th>
                                    <th style={{ padding: '12px', fontSize: '13px', color: '#64748b', textAlign: 'center' }}>Support</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    'Manage Products', 'View Orders', 'Manage Orders', 'Manage Users', 'View Financials', 'System Settings'
                                ].map((perm, i) => (
                                    <tr key={i} style={{ borderBottom: '1px solid #f8fafc' }}>
                                        <td style={{ padding: '12px', fontSize: '14px', color: '#334155', fontWeight: '500' }}>{perm}</td>
                                        <td style={{ textAlign: 'center', padding: '12px' }}><input type="checkbox" checked readOnly /></td>
                                        <td style={{ textAlign: 'center', padding: '12px' }}><input type="checkbox" defaultChecked={i < 4} /></td>
                                        <td style={{ textAlign: 'center', padding: '12px' }}><input type="checkbox" defaultChecked={perm.includes('View')} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div style={{ display: 'grid', gap: '24px', maxWidth: '800px' }}>
                    <div style={cardStyle}>
                        <h3 style={sectionTitle}>Site Identity</h3>
                        <div style={{ display: 'grid', gap: '16px' }}>
                            <div>
                                <label style={labelStyle}>Site Title</label>
                                <input defaultValue="MiniAmazon" style={inputStyle} />
                            </div>
                            <div>
                                <label style={labelStyle}>Logo URL</label>
                                <input defaultValue="/assets/mylogo.png" style={inputStyle} />
                            </div>
                        </div>
                    </div>

                    <div style={cardStyle}>
                        <h3 style={sectionTitle}>Contact Information</h3>
                        <div style={{ display: 'grid', gap: '16px' }}>
                            <div>
                                <label style={labelStyle}>Support Email</label>
                                <input defaultValue="support@miniamazon.com" style={inputStyle} />
                            </div>
                            <div>
                                <label style={labelStyle}>Phone Number</label>
                                <input defaultValue="+91 12345 67890" style={inputStyle} />
                            </div>
                            <div>
                                <label style={labelStyle}>Address</label>
                                <textarea defaultValue="123 Tech Park, Bangalore, India" style={{ ...inputStyle, minHeight: '80px' }} />
                            </div>
                        </div>
                    </div>

                    <div style={cardStyle}>
                        <h3 style={sectionTitle}>Email Templates</h3>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button style={secondaryBtnStyle}>Order Confirmation</button>
                            <button style={secondaryBtnStyle}>Password Reset</button>
                            <button style={secondaryBtnStyle}>Welcome Email</button>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button style={{ padding: '12px 32px', background: '#0f172a', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}>Save Changes</button>
                    </div>
                </div>
            )}
        </div>
    );
}

const cardStyle = { background: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' };
const sectionTitle = { fontSize: '18px', fontWeight: '700', color: '#0f172a', margin: '0 0 16px 0' };
const labelStyle = { display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '8px' };
const inputStyle = { width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none', boxSizing: 'border-box', color: '#0f172a', background: '#fff' };
const secondaryBtnStyle = { padding: '8px 16px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' };
const thStyle = { padding: '16px', color: '#64748b', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase' };
const tdStyle = { padding: '16px', color: '#334155', fontSize: '14px' };
const badgeStyle = { padding: '4px 10px', borderRadius: '20px', background: '#ecfdf5', color: '#047857', fontWeight: '600', fontSize: '12px' };
