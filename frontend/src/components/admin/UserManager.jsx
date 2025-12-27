import React, { useState } from 'react';

export default function UserManager({ activeSubTab }) {
    const [selectedUser, setSelectedUser] = useState(null);
    const [users] = useState([
        { id: 1, name: 'Vishnu Kumar', email: 'vishnu@example.com', phone: '+91 98765 43210', role: 'Admin', status: 'Active', joined: 'Jan 2025', orders: 12, totalSpent: '₹45,000' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+91 98765 43211', role: 'Customer', status: 'Active', joined: 'Feb 2025', orders: 5, totalSpent: '₹12,500' },
        { id: 3, name: 'Bob Wilson', email: 'bob@example.com', phone: '+91 98765 43212', role: 'Customer', status: 'Blocked', joined: 'Mar 2025', orders: 0, totalSpent: '₹0' },
    ]);

    return (
        <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: 0 }}>
                    {activeSubTab === 'users-add' ? 'Add New User' : 'User Management'}
                </h2>
                {activeSubTab !== 'users-add' && (
                    <button style={{ padding: '10px 20px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}>+ Add User</button>
                )}
            </div>

            {activeSubTab === 'users-add' ? (
                <div style={cardStyle}>
                    <h3>Add User Form Placeholder</h3>
                </div>
            ) : (
                <div style={cardStyle}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid #f1f5f9', textAlign: 'left' }}>
                                <th style={thStyle}>User ID</th>
                                <th style={thStyle}>Name</th>
                                <th style={thStyle}>Email</th>
                                <th style={thStyle}>Phone</th>
                                <th style={thStyle}>Status</th>
                                <th style={thStyle}>Role</th>
                                <th style={thStyle}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={tdStyle}>#{user.id}</td>
                                    <td style={tdStyle}>
                                        <div style={{ fontWeight: '600', color: '#0f172a' }}>{user.name}</div>
                                    </td>
                                    <td style={tdStyle}>{user.email}</td>
                                    <td style={tdStyle}>{user.phone}</td>
                                    <td style={tdStyle}>
                                        <span style={{ padding: '4px 10px', borderRadius: '20px', background: user.status === 'Active' ? '#ecfdf5' : '#fef2f2', color: user.status === 'Active' ? '#047857' : '#ef4444', fontWeight: '600', fontSize: '12px' }}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td style={tdStyle}>{user.role}</td>
                                    <td style={tdStyle}>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button onClick={() => setSelectedUser(user)} style={{ ...actionBtnStyle, color: '#3b82f6' }}>View</button>
                                            <button style={{ ...actionBtnStyle, color: '#f59e0b' }}>Edit</button>
                                            <button style={{ ...actionBtnStyle, color: '#ef4444' }}>Block</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* User Details Sidebar */}
            {selectedUser && (
                <>
                    <div onClick={() => setSelectedUser(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 60 }} />
                    <div style={{ position: 'fixed', top: 0, right: 0, height: '100vh', width: '400px', background: '#fff', zIndex: 70, boxShadow: '-4px 0 20px rgba(0,0,0,0.1)', padding: '32px', overflowY: 'auto', transition: 'transform 0.3s ease' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                            <h3 style={{ fontSize: '20px', fontWeight: '700', margin: 0 }}>User Details</h3>
                            <button onClick={() => setSelectedUser(null)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#64748b' }}>×</button>
                        </div>

                        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                            <div style={{ width: '80px', height: '80px', background: '#e2e8f0', borderRadius: '50%', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px' }}>👤</div>
                            <h4 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: '700' }}>{selectedUser.name}</h4>
                            <div style={{ color: '#64748b' }}>{selectedUser.email}</div>
                        </div>

                        <div style={{ display: 'grid', gap: '24px' }}>
                            <Section title="Profile Info">
                                <InfoRow label="Phone" value={selectedUser.phone} />
                                <InfoRow label="Role" value={selectedUser.role} />
                                <InfoRow label="Status" value={selectedUser.status} />
                                <InfoRow label="Joined" value={selectedUser.joined} />
                            </Section>

                            <Section title="Activity Stats">
                                <InfoRow label="Total Orders" value={selectedUser.orders} />
                                <InfoRow label="Total Spent" value={selectedUser.totalSpent} />
                            </Section>

                            <Section title="Actions">
                                <div style={{ display: 'grid', gap: '12px' }}>
                                    <button style={{ width: '100%', padding: '12px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Edit Profile</button>
                                    <button style={{ width: '100%', padding: '12px', background: '#fff', border: '1px solid #e2e8f0', color: '#0f172a', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Reset Password</button>
                                </div>
                            </Section>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

function Section({ title, children }) {
    return (
        <div>
            <h5 style={{ fontSize: '14px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '12px' }}>{title}</h5>
            <div style={{ display: 'grid', gap: '12px' }}>{children}</div>
        </div>
    );
}

function InfoRow({ label, value }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
            <span style={{ color: '#64748b' }}>{label}</span>
            <span style={{ fontWeight: '500', color: '#0f172a' }}>{value}</span>
        </div>
    );
}

const cardStyle = { background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', color: '#0f172a' };
const thStyle = { padding: '16px', color: '#64748b', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase' };
const tdStyle = { padding: '16px', color: '#334155', fontSize: '14px' };
const actionBtnStyle = { background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '13px' };
