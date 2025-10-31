import React from 'react'

export function ProductCard({ product }) {
	return (
		<div style={{ border: '1px solid #eee', borderRadius: 8, overflow: 'hidden', background: '#fff' }}>
			<img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block' }} />
			<div style={{ padding: 12 }}>
				<div style={{ fontWeight: 600, marginBottom: 6 }}>{product.name}</div>
				<div style={{ color: '#0B6', fontWeight: 700 }}>${product.price.toFixed(2)}</div>
				<button style={{ marginTop: 10, width: '100%', padding: '8px 12px', background: '#ffd814', border: '1px solid #fcd200', borderRadius: 6, cursor: 'pointer' }}>
					Add to Cart
				</button>
			</div>
		</div>
	)
}

