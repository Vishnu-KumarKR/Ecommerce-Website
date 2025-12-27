import React from 'react';

export default function UserAgreement() {
    return (
        <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', minHeight: '60vh' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '24px', color: '#0f172a' }}>User Agreement</h1>
            <div style={{ lineHeight: '1.6', color: '#334155' }}>
                <p style={{ marginBottom: '16px' }}>
                    Welcome to MiniAmazon. By accessing or using our website, you agree to be bound by these terms and conditions.
                </p>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginTop: '24px', marginBottom: '12px', color: '#1e293b' }}>Account Responsibilities</h2>
                <p style={{ marginBottom: '16px' }}>
                    You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
                </p>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginTop: '24px', marginBottom: '12px', color: '#1e293b' }}>Prohibited Activities</h2>
                <p style={{ marginBottom: '16px' }}>
                    You may not use our services for any illegal or unauthorized purpose. You must not transmit any worms or viruses or any code of a destructive nature.
                </p>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginTop: '24px', marginBottom: '12px', color: '#1e293b' }}>Termination</h2>
                <p>
                    We reserve the right to terminate or suspend your account at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason.
                </p>
            </div>
        </div>
    );
}
