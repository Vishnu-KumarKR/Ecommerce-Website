import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';

export function ProductCard({ product, variant = 'standard' }) {
	const { isInWishlist, toggleWishlist, removeFromWishlist } = useWishlist();
	const { addToCart } = useCart();
	const navigate = useNavigate();
	const isWishlisted = isInWishlist(product.id);

	const handleAddToCart = (e) => {
		e.stopPropagation();
		addToCart(product);
		navigate('/cart');
	};

	const handleCardClick = () => {
		navigate(`/product/${product.id}`);
	};

	const handleWishlistClick = (e) => {
		e.stopPropagation();
		if (variant === 'wishlist') {
			removeFromWishlist(product.id);
		} else {
			toggleWishlist(product);
		}
	};

	return (
		<div
			onClick={handleCardClick}
			style={{
				border: '1px solid #f0f0f0',
				borderRadius: 16,
				overflow: 'hidden',
				background: '#fff',
				position: 'relative',
				boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
				transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
				display: 'flex',
				flexDirection: 'column',
				cursor: 'pointer'
			}}
			onMouseEnter={(e) => {
				e.currentTarget.style.transform = 'translateY(-6px)';
				e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)';
			}}
			onMouseLeave={(e) => {
				e.currentTarget.style.transform = 'translateY(0)';
				e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.03)';
			}}
		>
			{variant === 'wishlist' ? (
				<button
					onClick={handleWishlistClick}
					style={{
						position: 'absolute',
						top: 12,
						right: 12,
						width: 48,
						height: 48,
						borderRadius: '50%',
						background: '#fff',
						border: '1px solid #eee',
						boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						cursor: 'pointer',
						zIndex: 10,
						transition: 'all 0.2s ease',
						color: '#555',
						padding: 0
					}}
					onMouseEnter={(e) => {
						e.currentTarget.style.transform = 'scale(1.1)';
						e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
						e.currentTarget.style.borderColor = '#ffccc7';
						e.currentTarget.style.background = '#fff0f0';
						e.currentTarget.style.color = '#ff4d4f';
						const svg = e.currentTarget.querySelector('svg');
						if (svg) svg.style.stroke = '#ff4d4f';
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.transform = 'scale(1)';
						e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
						e.currentTarget.style.borderColor = '#eee';
						e.currentTarget.style.background = '#fff';
						e.currentTarget.style.color = '#555';
						const svg = e.currentTarget.querySelector('svg');
						if (svg) svg.style.stroke = '#555';
					}}
					aria-label="Remove from wishlist"
				>
					<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.2s' }}>
						<line x1="18" y1="6" x2="6" y2="18"></line>
						<line x1="6" y1="6" x2="18" y2="18"></line>
					</svg>
				</button>
			) : (
				<button
					onClick={handleWishlistClick}
					style={{
						position: 'absolute',
						top: 12,
						right: 12,
						width: 48,
						height: 48,
						borderRadius: '50%',
						background: 'rgba(255,255,255,0.95)',
						border: 'none',
						boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						cursor: 'pointer',
						zIndex: 10,
						transition: 'all 0.2s ease'
					}}
					onMouseEnter={(e) => {
						e.currentTarget.style.transform = 'scale(1.1)';
						e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.15)';
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.transform = 'scale(1)';
						e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
					}}
					aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
				>
					<svg width="28" height="28" viewBox="0 0 24 24" fill={isWishlisted ? "#ff4d4f" : "none"} stroke={isWishlisted ? "#ff4d4f" : "#666"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
					</svg>
				</button>
			)}
			<img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: 220, objectFit: 'cover', display: 'block' }} />
			<div style={{ padding: 20, flex: 1, display: 'flex', flexDirection: 'column' }}>
				<div style={{
					fontWeight: 600,
					marginBottom: 8,
					fontSize: '1.05rem',
					color: '#1a1a1a',
					flex: 1,
					lineHeight: 1.4,
					display: '-webkit-box',
					WebkitLineClamp: 2,
					WebkitBoxOrient: 'vertical',
					overflow: 'hidden'
				}}>{product.name}</div>
				<div style={{ color: '#007600', fontWeight: 700, fontSize: '1.2rem', marginBottom: 16 }}>${product.price.toFixed(2)}</div>
				<button
					onClick={handleAddToCart}
					style={{
						width: '100%',
						padding: '12px 16px',
						background: '#ffd814',
						border: 'none',
						borderRadius: 24,
						cursor: 'pointer',
						fontWeight: 600,
						fontSize: '0.95rem',
						color: '#111',
						transition: 'all 0.2s ease',
						boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
					}}
					onMouseEnter={(e) => {
						e.currentTarget.style.background = '#f7ca00';
						e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
						e.currentTarget.style.transform = 'translateY(-1px)';
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.background = '#ffd814';
						e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
						e.currentTarget.style.transform = 'translateY(0)';
					}}
				>
					Add to Cart
				</button>
			</div>
		</div>
	)
}
