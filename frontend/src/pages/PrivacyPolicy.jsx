import React from 'react';

export default function PrivacyPolicy() {
    return (
        <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', minHeight: '60vh' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '24px', color: '#0f172a' }}>Privacy Policy</h1>
            <div style={{ lineHeight: '1.6', color: '#334155' }}>
                <p style={{ marginBottom: '16px' }}>
                    Your privacy is important to us. This Privacy Policy explains how MiniAmazon collects, uses, and protects your personal information.
                </p>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginTop: '24px', marginBottom: '12px', color: '#1e293b' }}>Information We Collect</h2>
                <p style={{ marginBottom: '16px' }}>
                    We collect information you provide directly to us, such as when you create an account, make a purchase, or contact customer support. This may include your name, email address, shipping address, and payment information.
                </p>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginTop: '24px', marginBottom: '12px', color: '#1e293b' }}>How We Use Your Information</h2>
                <p style={{ marginBottom: '16px' }}>
                    We use your information to process orders, improve our services, and communicate with you about promotions and updates. We do not sell your personal data to third parties.
                </p>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginTop: '24px', marginBottom: '12px', color: '#1e293b' }}>Security</h2>
                <p>
                    We implement industry-standard security measures to protect your data. However, no method of transmission over the internet is 100% secure.
                </p>
            </div>
        </div>
    );
}
