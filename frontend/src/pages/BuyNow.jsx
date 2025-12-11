import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const formatINR = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);

export default function BuyNow() {
  const navigate = useNavigate();
  const { cart, getCartTotal, getCartCount } = useCart();

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart', { replace: true });
    }
  }, [cart.length, navigate]);

  if (cart.length === 0) {
    return null;
  }

  const total = getCartTotal();
  const itemCount = getCartCount();

  return (
    <div style={{ minHeight: '100vh', background: '#f7fafd', padding: '40px 20px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', background: '#fff', borderRadius: 20, padding: 32, boxShadow: '0 12px 30px rgba(15, 23, 42, 0.08)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <button
            onClick={() => navigate('/cart')}
            style={{ border: 'none', background: 'transparent', color: '#2949b6', fontWeight: 600, cursor: 'pointer', fontSize: 15 }}
          >
            ← Back to cart
          </button>
          <div style={{ fontWeight: 700, fontSize: 20, color: '#041439' }}>Buy Now</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 28 }}>

          <div style={{ borderRadius: 16, border: '1px solid #e6ecff', padding: 24 }}>
            <h3 style={{ marginTop: 0, fontSize: 20, color: '#01336b', marginBottom: 18 }}>Order summary</h3>
            <div style={{ display: 'grid', gap: 12, marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                <span>Items ({itemCount})</span>
                <strong>{formatINR(total)}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                <span>Shipping</span>
                <strong style={{ color: '#0f9d58' }}>FREE</strong>
              </div>
              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: 12, display: 'flex', justifyContent: 'space-between', fontSize: 18 }}>
                <span style={{ color: '#041439' }}>Payable</span>
                <span style={{ fontWeight: 800, color: '#0f9d58', fontSize: 20 }}>{formatINR(total)}</span>
              </div>
            </div>
            <div style={{ marginBottom: 20, fontSize: 14, color: '#475569' }}>
              After clicking Buy Now you will be asked to review delivery address and payment method.
            </div>
            <button
              onClick={() => navigate('/checkout')}
              style={{
                width: '100%',
                padding: '14px 18px',
                borderRadius: 10,
                border: 'none',
                background: '#ff9100',
                color: '#fff',
                fontWeight: 700,
                fontSize: 16,
                cursor: 'pointer',
                boxShadow: '0 12px 24px rgba(255,145,0,0.3)',
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

