import React, { useState } from 'react';

export default function OrderManager({ activeSubTab }) {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orders] = useState([
        { id: 'ORD-001', customer: 'Vishnu Kumar', date: '2025-04-18', total: '₹2,499', status: 'Pending', payment: 'UPI', items: [{ name: 'Wireless Earbuds', qty: 1, price: '₹2,499' }] },
        { id: 'ORD-002', customer: 'Jane Smith', date: '2025-04-17', total: '₹899', status: 'Shipped', payment: 'Credit Card', items: [{ name: 'Phone Case', qty: 1, price: '₹899' }] },
        { id: 'ORD-003', customer: 'Mike Ross', date: '2025-04-16', total: '₹12,000', status: 'Delivered', payment: 'COD', items: [{ name: 'Smart Watch', qty: 1, price: '₹12,000' }] },
        { id: 'ORD-004', customer: 'Rachel Green', date: '2025-04-15', total: '₹4,500', status: 'Cancelled', payment: 'UPI', items: [{ name: 'Bluetooth Speaker', qty: 1, price: '₹4,500' }] },
    ]);

    // Filter based on activeSubTab (e.g., 'orders-pending')
    const filterStatus = activeSubTab?.split('-')[1];
    const filteredOrders = filterStatus && filterStatus !== 'all'
        ? orders.filter(o => o.status.toLowerCase() === filterStatus)
        : orders;

    return (
        <div>
            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', marginBottom: '24px', textTransform: 'capitalize' }}>
                {filterStatus ? `${filterStatus} Orders` : 'All Orders'}
            </h2>

            {selectedOrder ? (
                <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                    <button onClick={() => setSelectedOrder(null)} style={{ marginBottom: '24px', background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', fontWeight: '600' }}>← Back to Orders</button>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', borderBottom: '1px solid #e2e8f0', paddingBottom: '24px' }}>
                        <div>
                            <h3 style={{ margin: '0 0 8px 0', fontSize: '24px' }}>Order #{selectedOrder.id}</h3>
                            <div style={{ color: '#64748b' }}>Placed on {selectedOrder.date}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a' }}>{selectedOrder.total}</div>
                            <span style={{ padding: '4px 12px', borderRadius: '20px', background: getStatusColor(selectedOrder.status).bg, color: getStatusColor(selectedOrder.status).color, fontWeight: '600', fontSize: '14px', display: 'inline-block', marginTop: '8px' }}>
                                {selectedOrder.status}
                            </span>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '32px', marginBottom: '32px' }}>
                        <div>
                            <h4 style={sectionTitle}>Customer Details</h4>
                            <div style={{ fontWeight: '600' }}>{selectedOrder.customer}</div>
                            <div style={{ color: '#64748b' }}>customer@example.com</div>
                            <div style={{ color: '#64748b' }}>+91 98765 43210</div>
                        </div>
                        <div>
                            <h4 style={sectionTitle}>Shipping Address</h4>
                            <div style={{ color: '#64748b', lineHeight: '1.6' }}>
                                123, Main Street,<br />
                                Tech Park, Bangalore,<br />
                                Karnataka - 560001
                            </div>
                        </div>
                        <div>
                            <h4 style={sectionTitle}>Payment Info</h4>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <span style={{ color: '#64748b' }}>Method:</span>
                                <span style={{ fontWeight: '600' }}>{selectedOrder.payment}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#64748b' }}>Status:</span>
                                <span style={{ color: '#10b981', fontWeight: '600' }}>Paid</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 style={sectionTitle}>Order Items</h4>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid #e2e8f0', textAlign: 'left' }}>
                                    <th style={{ padding: '12px 0', color: '#64748b', fontSize: '13px' }}>Item</th>
                                    <th style={{ padding: '12px 0', color: '#64748b', fontSize: '13px' }}>Quantity</th>
                                    <th style={{ padding: '12px 0', color: '#64748b', fontSize: '13px', textAlign: 'right' }}>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedOrder.items.map((item, i) => (
                                    <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '16px 0' }}>{item.name}</td>
                                        <td style={{ padding: '16px 0' }}>{item.qty}</td>
                                        <td style={{ padding: '16px 0', textAlign: 'right' }}>{item.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div style={{ marginTop: '32px', display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
                        <button style={{ padding: '12px 24px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', color: '#0f172a' }}>Download Invoice</button>
                        <button style={{ padding: '12px 24px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Update Status</button>
                    </div>
                </div>
            ) : (
                <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid #f1f5f9', textAlign: 'left' }}>
                                <th style={thStyle}>Order ID</th>
                                <th style={thStyle}>Customer</th>
                                <th style={thStyle}>Payment</th>
                                <th style={thStyle}>Total</th>
                                <th style={thStyle}>Status</th>
                                <th style={thStyle}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map(order => (
                                <tr key={order.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={tdStyle}>{order.id}</td>
                                    <td style={tdStyle}>{order.customer}</td>
                                    <td style={tdStyle}>{order.payment}</td>
                                    <td style={tdStyle}>{order.total}</td>
                                    <td style={tdStyle}>
                                        <span style={{ padding: '4px 10px', borderRadius: '20px', background: getStatusColor(order.status).bg, color: getStatusColor(order.status).color, fontWeight: '600', fontSize: '12px' }}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td style={tdStyle}>
                                        <button onClick={() => setSelectedOrder(order)} style={{ padding: '6px 12px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}>View Details</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

function getStatusColor(status) {
    switch (status) {
        case 'Pending': return { bg: '#fff7ed', color: '#c2410c' };
        case 'Shipped': return { bg: '#eff6ff', color: '#1d4ed8' };
        case 'Delivered': return { bg: '#ecfdf5', color: '#047857' };
        case 'Cancelled': return { bg: '#fef2f2', color: '#b91c1c' };
        default: return { bg: '#f1f5f9', color: '#475569' };
    }
}

const sectionTitle = { fontSize: '14px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '12px' };
const thStyle = { padding: '16px', color: '#64748b', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase' };
const tdStyle = { padding: '16px', color: '#334155', fontSize: '14px' };
