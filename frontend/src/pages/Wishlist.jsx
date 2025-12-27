import React from 'react';
import { useWishlist } from '../contexts/WishlistContext';
import { ProductCard } from '../components/ProductCard';

export default function Wishlist() {
    const { wishlistItems } = useWishlist();

    return (
        <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{
                borderBottom: '1px solid #eee',
                paddingBottom: '20px',
                marginBottom: '32px',
                display: 'flex',
                alignItems: 'baseline',
                gap: '12px'
            }}>
                <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: 0, color: '#1a1a1a' }}>Your Wishlist</h1>
                <span style={{ fontSize: '1.1rem', color: '#666', fontWeight: 500 }}>
                    ({wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'})
                </span>
            </div>

            {wishlistItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '80px 20px', background: '#fff', borderRadius: 24, boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
                    <div style={{ fontSize: '4.5rem', marginBottom: 24, opacity: 0.8 }}>❤️</div>
                    <h2 style={{ fontSize: '1.8rem', marginBottom: 12, color: '#333', fontWeight: 700 }}>Your wishlist is empty</h2>
                    <p style={{ color: '#666', marginBottom: 24, fontSize: '1.1rem' }}>Save items you love to revisit them later.</p>
                </div>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                    gap: '32px'
                }}>
                    {wishlistItems.map(product => (
                        <ProductCard key={product.id} product={product} variant="wishlist" />
                    ))}
                </div>
            )}
        </div>
    );
}
