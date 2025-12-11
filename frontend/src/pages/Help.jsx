import React, { useState } from 'react';

const faqData = [
    {
        category: 'Order Support',
        icon: '📦',
        questions: [
            { q: 'How do I track my order?', a: 'You can track your order by visiting the "Orders" section in your profile. Click on "Track Order" to see real-time updates.' },
            { q: 'Can I cancel my order?', a: 'Yes, you can cancel your order within 24 hours of placing it. Go to "My Orders", select the order, and click "Cancel".' },
            { q: 'My order is delayed. What should I do?', a: 'We apologize for the delay. Please check the tracking status for the latest updates. If it has been stuck for more than 48 hours, please contact support.' },
        ]
    },
    {
        category: 'Payment & Refunds',
        icon: '💳',
        questions: [
            { q: 'What payment methods do you accept?', a: 'We accept Credit/Debit cards, UPI (GPay, PhonePe), Net Banking, and Cash on Delivery (COD).' },
            { q: 'How do I request a refund?', a: 'To request a refund, go to "My Orders", select the item, and click "Return/Refund". Refunds are processed within 5-7 business days.' },
            { q: 'My payment failed but money was deducted.', a: 'Don\'t worry! If the amount was deducted, it will be automatically refunded to your source account within 3-5 business days.' },
        ]
    },
    {
        category: 'Account Assistance',
        icon: '👤',
        questions: [
            { q: 'How do I reset my password?', a: 'Go to the Login page and click "Forgot Password". Follow the instructions sent to your email to reset it.' },
            { q: 'Can I change my shipping address?', a: 'Yes, you can update your address in the "Profile" section under "Saved Address".' },
        ]
    },
    {
        category: 'Delivery Information',
        icon: '🚚',
        questions: [
            { q: 'Do you ship internationally?', a: 'Currently, we only ship within India. We are working on expanding our services globally.' },
            { q: 'What are the delivery charges?', a: 'Delivery is free for orders above ₹499. For orders below that, a nominal fee of ₹40 applies.' },
        ]
    }
];

export default function Help() {
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedCategory, setExpandedCategory] = useState(null);
    const [expandedQuestion, setExpandedQuestion] = useState(null);

    const filteredFAQs = faqData.map(cat => ({
        ...cat,
        questions: cat.questions.filter(q =>
            q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.a.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(cat => cat.questions.length > 0);

    const toggleCategory = (category) => {
        setExpandedCategory(expandedCategory === category ? null : category);
    };

    const toggleQuestion = (qIndex) => {
        setExpandedQuestion(expandedQuestion === qIndex ? null : qIndex);
    };

    return (
        <div style={{ minHeight: '100vh', background: '#f8fafc', paddingBottom: 60 }}>
            {/* Hero Search Section */}
            <div style={{ background: '#1e293b', padding: '60px 20px', textAlign: 'center', color: '#fff' }}>
                <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 16 }}>How can we help you?</h1>
                <div style={{ maxWidth: 600, margin: '0 auto', position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="Search for help (e.g., return, tracking, payment)"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '16px 24px',
                            paddingLeft: 50,
                            borderRadius: 30,
                            border: 'none',
                            fontSize: 16,
                            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                            outline: 'none',
                            boxSizing: 'border-box'
                        }}
                    />
                    <span style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', fontSize: 20 }}>🔍</span>
                </div>
            </div>

            <div style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 20px' }}>

                {/* FAQ Sections */}
                <div style={{ display: 'grid', gap: 24 }}>
                    {filteredFAQs.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: 40, color: '#64748b' }}>
                            <h3>No results found for "{searchQuery}"</h3>
                            <p>Try searching for something else or contact support.</p>
                        </div>
                    ) : (
                        filteredFAQs.map((cat, catIdx) => (
                            <div key={catIdx} style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                                <div
                                    onClick={() => toggleCategory(cat.category)}
                                    style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', background: '#fff' }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                        <span style={{ fontSize: 24 }}>{cat.icon}</span>
                                        <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: '#0f172a' }}>{cat.category}</h2>
                                    </div>
                                    <span style={{ transform: expandedCategory === cat.category || searchQuery ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>▼</span>
                                </div>

                                {(expandedCategory === cat.category || searchQuery) && (
                                    <div style={{ padding: '0 24px 24px', borderTop: '1px solid #f1f5f9' }}>
                                        {cat.questions.map((q, qIdx) => {
                                            const uniqueId = `${catIdx}-${qIdx}`;
                                            const isOpen = expandedQuestion === uniqueId;
                                            return (
                                                <div key={qIdx} style={{ borderBottom: qIdx === cat.questions.length - 1 ? 'none' : '1px solid #f1f5f9' }}>
                                                    <div
                                                        onClick={() => toggleQuestion(uniqueId)}
                                                        style={{ padding: '16px 0', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 600, color: '#334155' }}
                                                    >
                                                        {q.q}
                                                        <span style={{ color: '#94a3b8', fontSize: 20 }}>{isOpen ? '−' : '+'}</span>
                                                    </div>
                                                    {isOpen && (
                                                        <div style={{ paddingBottom: 16, color: '#64748b', lineHeight: 1.6, fontSize: 15 }}>
                                                            {q.a}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>

                {/* Contact Support */}
                <div style={{ marginTop: 60, textAlign: 'center' }}>
                    <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', marginBottom: 32 }}>Still need help?</h2>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
                        <button style={contactButtonStyle}>
                            <span style={{ fontSize: 24 }}>💬</span>
                            <div>
                                <div style={{ fontWeight: 700, color: '#0f172a' }}>Chat with Us</div>
                                <div style={{ fontSize: 13, color: '#64748b' }}>Available 24/7</div>
                            </div>
                        </button>
                        <button style={contactButtonStyle}>
                            <span style={{ fontSize: 24 }}>📧</span>
                            <div>
                                <div style={{ fontWeight: 700, color: '#0f172a' }}>Email Support</div>
                                <div style={{ fontSize: 13, color: '#64748b' }}>Response in 24h</div>
                            </div>
                        </button>
                        <button style={contactButtonStyle}>
                            <span style={{ fontSize: 24 }}>📞</span>
                            <div>
                                <div style={{ fontWeight: 700, color: '#0f172a' }}>Call Us</div>
                                <div style={{ fontSize: 13, color: '#64748b' }}>Mon-Fri, 9am-6pm</div>
                            </div>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

const contactButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    padding: '16px 24px',
    background: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: 12,
    cursor: 'pointer',
    minWidth: 200,
    textAlign: 'left',
    transition: 'all 0.2s',
    boxShadow: '0 2px 4px rgba(0,0,0,0.04)'
};
