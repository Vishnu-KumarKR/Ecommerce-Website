import React, { useState } from 'react';

export default function SupportManager({ activeSubTab }) {
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [tickets] = useState([
        { id: '#TCK-001', user: 'Vishnu Kumar', issue: 'Order not received', priority: 'High', status: 'Open', messages: [{ sender: 'user', text: 'I have not received my order yet.', time: '10:00 AM' }, { sender: 'admin', text: 'Let me check that for you.', time: '10:05 AM' }] },
        { id: '#TCK-002', user: 'Jane Smith', issue: 'Refund Request', priority: 'Medium', status: 'Pending', messages: [{ sender: 'user', text: 'I want to return my item.', time: 'Yesterday' }] },
        { id: '#TCK-003', user: 'Mike Ross', issue: 'Account Issue', priority: 'Low', status: 'Closed', messages: [] },
    ]);

    return (
        <div style={{ display: 'flex', gap: '24px', height: 'calc(100vh - 140px)' }}>
            {/* Tickets List */}
            <div style={{ flex: 1, background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', overflowY: 'auto' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a', marginBottom: '24px' }}>Support Tickets</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #f1f5f9', textAlign: 'left' }}>
                            <th style={thStyle}>Ticket ID</th>
                            <th style={thStyle}>User</th>
                            <th style={thStyle}>Issue</th>
                            <th style={thStyle}>Priority</th>
                            <th style={thStyle}>Status</th>
                            <th style={thStyle}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map(ticket => (
                            <tr key={ticket.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                <td style={tdStyle}>{ticket.id}</td>
                                <td style={tdStyle}>{ticket.user}</td>
                                <td style={tdStyle}>{ticket.issue}</td>
                                <td style={tdStyle}>
                                    <span style={{ padding: '4px 10px', borderRadius: '20px', background: getPriorityColor(ticket.priority).bg, color: getPriorityColor(ticket.priority).color, fontWeight: '600', fontSize: '11px' }}>
                                        {ticket.priority}
                                    </span>
                                </td>
                                <td style={tdStyle}>
                                    <span style={{ padding: '4px 10px', borderRadius: '20px', background: getStatusColor(ticket.status).bg, color: getStatusColor(ticket.status).color, fontWeight: '600', fontSize: '11px' }}>
                                        {ticket.status}
                                    </span>
                                </td>
                                <td style={tdStyle}>
                                    <button onClick={() => setSelectedTicket(ticket)} style={{ color: '#3b82f6', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600' }}>Open</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Chat Window */}
            {selectedTicket && (
                <div style={{ flex: 1, background: '#fff', borderRadius: '16px', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                    <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontWeight: '700', color: '#0f172a' }}>{selectedTicket.issue}</div>
                            <div style={{ fontSize: '12px', color: '#64748b' }}>{selectedTicket.id} • {selectedTicket.user}</div>
                        </div>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button style={{ padding: '6px 12px', background: '#ecfdf5', color: '#047857', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '12px' }}>Mark as Resolved</button>
                            <button onClick={() => setSelectedTicket(null)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#94a3b8' }}>×</button>
                        </div>
                    </div>

                    <div style={{ flex: 1, padding: '20px', overflowY: 'auto', background: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {selectedTicket.messages.map((msg, i) => (
                            <div key={i} style={{ alignSelf: msg.sender === 'admin' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                                <div style={{
                                    padding: '12px 16px',
                                    borderRadius: '12px',
                                    background: msg.sender === 'admin' ? '#3b82f6' : '#fff',
                                    color: msg.sender === 'admin' ? '#fff' : '#0f172a',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                    borderBottomRightRadius: msg.sender === 'admin' ? '4px' : '12px',
                                    borderBottomLeftRadius: msg.sender === 'admin' ? '12px' : '4px'
                                }}>
                                    {msg.text}
                                </div>
                                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px', textAlign: msg.sender === 'admin' ? 'right' : 'left' }}>{msg.time}</div>
                            </div>
                        ))}
                    </div>

                    <div style={{ padding: '16px', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '12px' }}>
                        <input placeholder="Type your reply..." style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', color: '#0f172a', background: '#fff' }} />
                        <button style={{ padding: '12px 24px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Send</button>
                    </div>
                </div>
            )}
        </div>
    );
}

function getPriorityColor(priority) {
    switch (priority) {
        case 'High': return { bg: '#fef2f2', color: '#ef4444' };
        case 'Medium': return { bg: '#fffbeb', color: '#f59e0b' };
        case 'Low': return { bg: '#ecfdf5', color: '#10b981' };
        default: return { bg: '#f1f5f9', color: '#64748b' };
    }
}

function getStatusColor(status) {
    switch (status) {
        case 'Open': return { bg: '#eff6ff', color: '#3b82f6' };
        case 'Pending': return { bg: '#fff7ed', color: '#c2410c' };
        case 'Closed': return { bg: '#f1f5f9', color: '#64748b' };
        default: return { bg: '#f1f5f9', color: '#64748b' };
    }
}

const thStyle = { padding: '16px', color: '#64748b', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase' };
const tdStyle = { padding: '16px', color: '#334155', fontSize: '14px' };
