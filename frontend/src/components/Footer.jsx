import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
    const navigate = useNavigate();

    const goCategory = (cat) => {
        navigate(`/?category=${cat}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const goPage = (path) => {
        navigate(path);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer style={styles.footer}>
            <div style={styles.container}>

                {/* Most Popular Categories */}
                <div style={styles.columnCenter}>
                    <div style={styles.colTitle}>Most Popular Categories</div>
                    <ul style={styles.linkList}>
                        <li style={styles.linkItem} onClick={() => goCategory('Mobile')}>
                            <span style={{ fontSize: 18 }}>📱</span> Mobiles
                        </li>
                        <li style={styles.linkItem} onClick={() => goCategory('Accessories')}>
                            <span style={{ fontSize: 18 }}>🧢</span> Accessories
                        </li>
                        <li style={styles.linkItem} onClick={() => goCategory('Furniture')}>
                            <span style={{ fontSize: 18 }}>🛋️</span> Furniture
                        </li>
                        <li style={styles.linkItem} onClick={() => goCategory('Watches')}>
                            <span style={{ fontSize: 18 }}>⌚</span> Watches
                        </li>
                    </ul>
                </div>

                {/* Brand Info */}
                <div style={styles.columnBrand}>
                    <div style={styles.brandTitle}>MiniAmazon</div>
                    <p style={styles.brandDesc}>
                        Your trusted destination for premium tech, fashion, and home essentials. Discover curated deals and fast delivery across India.
                    </p>
                </div>

                {/* Customer Services */}
                <div style={styles.columnCenter}>
                    <div style={styles.colTitle}>Customer Services</div>
                    <ul style={styles.linkList}>
                        <li style={styles.linkItem} onClick={() => goPage('/returns')}>
                            <span style={{ fontSize: 18 }}>🔄</span> Returns
                        </li>
                        <li style={styles.linkItem} onClick={() => goPage('/help')}>
                            <span style={{ fontSize: 18 }}>🆘</span> Help Center
                        </li>
                        <li style={styles.linkItem} onClick={() => goPage('/privacy-policy')}>
                            <span style={{ fontSize: 18 }}>🔐</span> Privacy Policy
                        </li>
                        <li style={styles.linkItem} onClick={() => goPage('/user-agreement')}>
                            <span style={{ fontSize: 18 }}>📜</span> User Agreement
                        </li>
                    </ul>
                </div>

            </div>
            <div style={styles.copyright}>
                © {new Date().getFullYear()} MiniAmazon. All rights reserved.
            </div>
        </footer>
    );
}

const styles = {
    footer: {
        background: 'var(--color-sidebar-bg)',
        color: 'var(--color-text-light)',
        padding: '44px 0 32px 0',
        width: '100%',
        boxSizing: 'border-box',
        marginTop: 56,
        overflowX: 'hidden',
    },
    container: {
        width: '100%',
        maxWidth: 1200,
        margin: '0 auto',
        boxSizing: 'border-box',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 36,
        padding: '0 24px',
    },
    columnCenter: {
        minWidth: 240,
        textAlign: 'center',
    },
    columnBrand: {
        flex: '1 1 320px',
        textAlign: 'center',
        minWidth: 320,
    },
    brandTitle: {
        fontSize: 24,
        fontWeight: 1000,
        letterSpacing: 1,
        color: '#fffc',
        marginBottom: 10,
    },
    brandDesc: {
        marginTop: 10,
        color: '#aacbea',
        fontSize: 14,
        lineHeight: 1.6,
    },
    colTitle: {
        fontWeight: 700,
        marginBottom: 12,
        fontSize: 18,
    },
    linkList: {
        listStyle: 'none',
        padding: 0,
        fontWeight: 500,
        margin: 0,
        display: 'grid',
        gap: 10,
    },
    linkItem: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'opacity 0.2s',
    },
    copyright: {
        textAlign: 'center',
        color: '#aacbea',
        marginTop: 23,
    }
};
