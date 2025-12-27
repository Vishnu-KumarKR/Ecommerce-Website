import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const formatINR = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);
const formatDisplayINR = (price) => formatINR(price);

export default function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, addToCart, getCartTotal, getCartCount } = useCart();

  if (cart.length === 0) {
    return (
      <div style={{ minHeight: '100vh', background: '#f7fafd', padding: '60px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', background: '#fff', borderRadius: 16, padding: '60px 40px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
          <div style={{ fontSize: 64, marginBottom: 20 }}>🛒</div>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: '#01336b', marginBottom: 16 }}>Your cart is empty</h2>
          <p style={{ fontSize: 16, color: '#666', marginBottom: 30 }}>Looks like you haven't added any items to your cart yet.</p>
          <button
            onClick={() => navigate('/')}
            style={{
              padding: '12px 24px',
              background: '#2949b6',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontWeight: 600,
              fontSize: 16,
              cursor: 'pointer',
            }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const total = getCartTotal();
  const itemCount = getCartCount();


  return (
    <div style={{ minHeight: '100vh', background: '#f7fafd', padding: '40px 20px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: '#01336b', marginBottom: 30 }}>Shopping Cart</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 30 }}>
          {/* Cart Items */}
          <div style={{ background: '#fff', borderRadius: 16, padding: 30, boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
            {cart.map((item) => {
              const originalName = item.name || '';
              const slug = originalName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
              const baseNames = [slug];
              const lowerSpaces = originalName.toLowerCase();
              baseNames.push(lowerSpaces.replace(/\s+/g, '-'));
              baseNames.push(lowerSpaces.replace(/\s+/g, '_'));
              baseNames.push(lowerSpaces);
              baseNames.push(originalName);
              const encodedOriginal = encodeURIComponent(originalName);
              const exts = ['webp', 'jpg', 'jpeg', 'png'];
              const candidates = [];
              baseNames.forEach(b => exts.forEach(ext => candidates.push(`/products/${b}.${ext}`)));
              exts.forEach(ext => candidates.push(`/products/${encodedOriginal}.${ext}`));
              if (item.imageUrl) candidates.unshift(item.imageUrl);

              return (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    gap: 20,
                    padding: '20px 0',
                    borderBottom: '1px solid #eee',
                  }}
                >
                  <img
                    src={candidates[0]}
                    onError={(e) => {
                      const img = e.currentTarget;
                      const list = img.dataset.candidates ? JSON.parse(img.dataset.candidates) : candidates;
                      let idx = parseInt(img.dataset.idx || '0', 10) + 1;
                      if (idx < list.length) {
                        img.dataset.idx = String(idx);
                        img.src = list[idx];
                      } else {
                        img.onerror = null;
                        img.src = 'https://via.placeholder.com/120x120/eeeeee/888888?text=Image';
                      }
                    }}
                    data-candidates={JSON.stringify(candidates)}
                    alt={item.name}
                    style={{
                      width: 120,
                      height: 120,
                      objectFit: 'cover',
                      borderRadius: 8,
                      border: '1px solid #eee',
                      background: '#f5f5f5',
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 600, color: '#01336b', marginBottom: 8 }}>
                      {item.name}
                    </h3>
                    <div style={{ fontSize: 20, fontWeight: 700, color: '#1db86e', marginBottom: 15 }}>
                      {formatDisplayINR(item.price)}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          style={{
                            width: 36,
                            height: 36,
                            background: '#2949b6',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 6,
                            cursor: 'pointer',
                            fontSize: 20,
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          −
                        </button>
                        <span style={{ fontSize: 16, fontWeight: 600, minWidth: 40, textAlign: 'center', color: '#01336b' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => addToCart(item)}
                          style={{
                            width: 36,
                            height: 36,
                            background: '#2949b6',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 6,
                            cursor: 'pointer',
                            fontSize: 20,
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{
                          padding: '6px 12px',
                          background: '#ff4444',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 6,
                          cursor: 'pointer',
                          fontSize: 14,
                          fontWeight: 600,
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: '#01336b' }}>
                    {formatDisplayINR(item.price * item.quantity)}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div style={{ background: '#fff', borderRadius: 16, padding: 30, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', height: 'fit-content' }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#01336b', marginBottom: 20 }}>Order Summary</h2>
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ color: '#01336b', fontWeight: 600 }}>Subtotal ({itemCount} items)</span>
                <span style={{ fontWeight: 700, color: '#01336b' }}>{formatINR(total)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ color: '#01336b', fontWeight: 600 }}>Shipping</span>
                <span style={{ fontWeight: 700, color: '#1db86e' }}>Free</span>
              </div>
              <div style={{ borderTop: '2px solid #eee', paddingTop: 15, marginTop: 15 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22, fontWeight: 700 }}>
                  <span style={{ color: '#01336b' }}>Total</span>
                  <span style={{ color: '#1db86e', fontSize: 24 }}>{formatINR(total)}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                navigate('/buy-now');
                window.scrollTo(0, 0);
              }}
              style={{
                width: '100%',
                padding: '14px',
                background: '#ff9100',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 16,
                cursor: 'pointer',
                marginBottom: 15,
              }}
            >
              Proceed to Checkout
            </button>
            <button
              onClick={() => {
                navigate('/');
                window.scrollTo(0, 0);
              }}
              style={{
                width: '100%',
                padding: '12px',
                background: 'transparent',
                color: '#2949b6',
                border: '2px solid #2949b6',
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 14,
                cursor: 'pointer',
              }}
            >
              Continue Shopping
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

