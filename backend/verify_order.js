// Native fetch is available in Node 18+

async function testOrderPlacement() {
    const API_URL = 'http://localhost:5000/api';

    try {
        console.log('1. Logging in...');
        const loginRes = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'admin@site.com', password: 'demo123' })
        });

        if (!loginRes.ok) throw new Error(`Login failed: ${loginRes.status}`);
        const { token, user } = await loginRes.json();
        console.log('Login successful. Token:', token.substring(0, 10) + '...');

        console.log('2. Placing Order...');
        const orderPayload = {
            items: [
                { id: 1, name: 'Test Product', price: 100, quantity: 1 }
            ],
            total: 100,
            address: {
                fullName: 'Test User',
                phone: '1234567890',
                line1: '123 Test St',
                city: 'Test City',
                state: 'TS',
                postalCode: '123456'
            }
        };

        const orderRes = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(orderPayload)
        });

        const orderData = await orderRes.json();
        if (!orderRes.ok) {
            console.error('Order Response Body:', orderData);
            throw new Error(`Order placement failed: ${orderRes.status}`);
        }

        console.log('Order placed successfully!', orderData);

    } catch (err) {
        console.error('TEST FAILED:', err.message);
    }
}

testOrderPlacement();
