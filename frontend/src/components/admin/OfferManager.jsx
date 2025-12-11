import React from 'react';

const coupons = [
    { code: 'WELCOME50', discount: '50% OFF', usage: '1,205', status: 'Active' },
    { code: 'FREESHIP', discount: 'Free Shipping', usage: '850', status: 'Active' },
    { code: 'SUMMER20', discount: '20% OFF', usage: 'Expired', status: 'Inactive' }
];

export default function OfferManager({ activeSubTab }) {
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: 0 }}>Offers & Coupons</h2>
                <button style={{ padding: '10px 20px', background: '#0f172a', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>+ Create New Offer</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                {coupons.map((coupon, i) => (
                    <div key={i} style={cardStyle}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                            <span style={{ background: '#e0e7ff', color: '#4338ca', padding: '4px 12px', borderRadius: '6px', fontFamily: 'monospace', fontWeight: '700' }}>{coupon.code}</span>
                            <span style={{ fontSize: '12px', color: coupon.status === 'Active' ? '#047857' : '#94a3b8', fontWeight: '600' }}>{coupon.status}</span>
                        </div>
                        <div style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', marginBottom: '8px' }}>{coupon.discount}</div>
                        <div style={{ color: '#64748b', fontSize: '14px' }}>Used {coupon.usage} times</div>
                        <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '12px' }}>
                            <button style={{ flex: 1, padding: '8px', border: '1px solid #e2e8f0', background: '#fff', borderRadius: '6px', cursor: 'pointer', color: '#475569', fontWeight: '600' }}>Edit</button>
                            <button style={{ flex: 1, padding: '8px', border: '1px solid #fee2e2', background: '#fff', borderRadius: '6px', cursor: 'pointer', color: '#ef4444', fontWeight: '600' }}>End</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const cardStyle = { background: '#fff', padding: '24px', borderRadius: '20px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', color: '#0f172a' };
