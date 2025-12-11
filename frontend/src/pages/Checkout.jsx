import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import OrderSuccessModal from '../components/OrderSuccessModal';

const formatINR = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);

const paymentOptions = [
  { id: 'card', title: 'Credit / Debit Card', description: 'Visa, Mastercard, RuPay, Amex' },
  { id: 'upi', title: 'UPI Apps', description: 'GPay, PhonePe, Paytm, BHIM' },
  { id: 'netbanking', title: 'Net Banking', description: 'All major Indian banks' },
  { id: 'cod', title: 'Cash on Delivery', description: 'Pay when your order arrives' },
];

const initialAddress = {
  fullName: '',
  phone: '',
  line1: '',
  line2: '',
  city: '',
  state: '',
  postalCode: '',
};

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const [address, setAddress] = useState(initialAddress);
  const [selectedPayment, setSelectedPayment] = useState(paymentOptions[0].id);
  const [error, setError] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState(null);

  useEffect(() => {
    if (cart.length === 0 && !showSuccess) {
      navigate('/', { replace: true });
    }
  }, [cart.length, navigate, showSuccess]);

  if (cart.length === 0) {
    return null;
  }

  const total = getCartTotal();

  const handleInputChange = (field, value) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setError('');
    const requiredFields = ['fullName', 'phone', 'line1', 'city', 'state', 'postalCode'];
    const missing = requiredFields.filter((field) => !address[field]);
    if (missing.length) {
      setError('Please fill in all required address fields.');
      return;
    }
    setIsPlacingOrder(true);

    // Create new order object
    const newOrder = {
      id: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      date: new Date().toISOString(),
      items: [...cart],
      total: getCartTotal(),
      address: { ...address },
      paymentMethod: selectedPayment,
      status: 'Processing'
    };

    // Save to localStorage
    try {
      const existingOrders = JSON.parse(localStorage.getItem('mini_amazon_orders') || '[]');
      const updatedOrders = [newOrder, ...existingOrders];
      localStorage.setItem('mini_amazon_orders', JSON.stringify(updatedOrders));
    } catch (err) {
      console.error('Failed to save order:', err);
    }

    setTimeout(() => {
      // Do NOT clear cart here. Wait for user to interact with modal.
      // If we clear here, the useEffect will redirect us to home immediately.
      setPlacedOrderId(newOrder.id);
      setShowSuccess(true);
    }, 1500);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fb', padding: '40px 20px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ margin: 0, fontSize: 30, color: '#041439' }}>Checkout</h1>
          <button
            onClick={() => navigate('/cart')}
            style={{ border: 'none', background: 'transparent', color: '#2949b6', fontWeight: 600, cursor: 'pointer' }}
          >
            Edit cart
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.7fr', gap: 28 }}>
          <form onSubmit={handlePlaceOrder} style={{ display: 'grid', gap: 24 }}>
            <section style={{ background: '#fff', borderRadius: 18, padding: 24, boxShadow: '0 14px 35px rgba(15,23,42,0.07)' }}>
              <h2 style={{ marginTop: 0, fontSize: 20, color: '#01336b' }}>Shipping address</h2>
              <div style={{ display: 'grid', gap: 16 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <input
                    value={address.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Full name *"
                    style={inputStyle}
                    className="light-input"
                  />
                  <input
                    value={address.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Phone number *"
                    style={inputStyle}
                    className="light-input"
                  />
                </div>
                <input
                  value={address.line1}
                  onChange={(e) => handleInputChange('line1', e.target.value)}
                  placeholder="Address line 1 *"
                  style={inputStyle}
                  className="light-input"
                />
                <input
                  value={address.line2}
                  onChange={(e) => handleInputChange('line2', e.target.value)}
                  placeholder="Address line 2 (optional)"
                  style={inputStyle}
                  className="light-input"
                />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <input
                    value={address.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="City *"
                    style={inputStyle}
                    className="light-input"
                  />
                  <input
                    value={address.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    placeholder="State *"
                    style={inputStyle}
                    className="light-input"
                  />
                </div>
                <input
                  value={address.postalCode}
                  onChange={(e) => handleInputChange('postalCode', e.target.value)}
                  placeholder="PIN code *"
                  style={inputStyle}
                  className="light-input"
                />
              </div>
            </section>

            <section style={{ background: '#fff', borderRadius: 18, padding: 24, boxShadow: '0 14px 35px rgba(15,23,42,0.07)' }}>
              <h2 style={{ marginTop: 0, fontSize: 20, color: '#01336b' }}>Payment method</h2>
              <div style={{ display: 'grid', gap: 12 }}>
                {paymentOptions.map((option) => (
                  <label
                    key={option.id}
                    style={{
                      border: selectedPayment === option.id ? '2px solid #2949b6' : '1px solid #e2e8f0',
                      borderRadius: 14,
                      padding: '12px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      cursor: 'pointer',
                    }}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={option.id}
                      checked={selectedPayment === option.id}
                      onChange={() => setSelectedPayment(option.id)}
                      style={{ accentColor: '#2949b6' }}
                    />
                    <div>
                      <div style={{ fontWeight: 600, color: '#041439' }}>{option.title}</div>
                      <div style={{ fontSize: 13, color: '#64748b' }}>{option.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </section>

            {error && (
              <div style={{ color: '#dc2626', fontWeight: 600 }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isPlacingOrder}
              style={{
                padding: '16px 22px',
                borderRadius: 12,
                border: 'none',
                background: isPlacingOrder ? '#ffd6a6' : '#ff9100',
                color: '#fff',
                fontWeight: 700,
                fontSize: 18,
                cursor: isPlacingOrder ? 'not-allowed' : 'pointer',
                boxShadow: '0 16px 32px rgba(255,145,0,0.4)',
              }}
            >
              {isPlacingOrder ? 'Placing order…' : 'Place Order'}
            </button>
          </form>

          <aside style={{ background: '#fff', borderRadius: 18, padding: 24, boxShadow: '0 14px 35px rgba(15,23,42,0.07)' }}>
            <h3 style={{ marginTop: 0, fontSize: 18, color: '#01336b' }}>Order details</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, color: '#475569' }}>
              <span>Items total</span>
              <strong>{formatINR(total)}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, color: '#475569' }}>
              <span>Shipping</span>
              <strong style={{ color: '#0f9d58' }}>FREE</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 20, borderTop: '1px solid #e2e8f0', paddingTop: 14, marginTop: 12 }}>
              <span style={{ color: '#041439' }}>Amount due</span>
              <span style={{ fontWeight: 800, color: '#0f9d58' }}>{formatINR(total)}</span>
            </div>
            <ul style={{ marginTop: 24, paddingLeft: 20, color: '#475569', lineHeight: 1.6, fontSize: 14 }}>
              <li>Securely encrypted payments powered by Razorpay sandbox.</li>
              <li>Address and payment details can be edited until order is placed.</li>
              <li>You will receive confirmation e-mail once payment succeeds.</li>
            </ul>
          </aside>
        </div>
      </div>
      <OrderSuccessModal
        show={showSuccess}
        orderId={placedOrderId}
        onClose={() => setShowSuccess(false)}
      />
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: 10,
  border: '1px solid #d8e1ff',
  fontSize: 14,
  fontWeight: 500,
  color: '#0f172a',
  background: '#ffffff',
  outline: 'none',
  boxSizing: 'border-box',
};

