import React from 'react';

export default function Returns() {
    return (
        <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', minHeight: '60vh' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '24px', color: '#0f172a' }}>Returns Policy</h1>
            <div style={{ lineHeight: '1.6', color: '#334155' }}>
                <p style={{ marginBottom: '16px' }}>
                    At MiniAmazon, we want you to be completely satisfied with your purchase. If you are not happy with your order, you can return it within 30 days of delivery for a full refund or exchange.
                </p>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginTop: '24px', marginBottom: '12px', color: '#1e293b' }}>Eligibility</h2>
                <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
                    <li>Items must be unused and in original packaging.</li>
                    <li>Tags and labels must be intact.</li>
                    <li>Proof of purchase is required.</li>
                </ul>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginTop: '24px', marginBottom: '12px', color: '#1e293b' }}>Process</h2>
                <p>
                    To initiate a return, please visit your Orders page and select "Return Item". You will receive a shipping label to send the item back to us. Once received, we will process your refund within 5-7 business days.
                </p>
            </div>
        </div>
    );
}
