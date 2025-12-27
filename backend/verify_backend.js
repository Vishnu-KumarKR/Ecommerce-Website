async function testbackend() {
    const loginUrl = 'http://localhost:5000/api/login';
    const ordersUrl = 'http://localhost:5000/api/orders';

    try {
        // 1. Health
        console.log('Checking health...');
        const health = await fetch('http://localhost:5000/health');
        if (!health.ok) throw new Error('Health Check Failed');
        console.log('Health OK');

        // 2. Login
        console.log('Logging in...');
        const loginRes = await fetch(loginUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'admin@site.com', password: 'demo123' })
        });
        if (!loginRes.ok) throw new Error(`Login Failed: ${loginRes.status}`);
        const loginData = await loginRes.json();
        const token = loginData.token;
        console.log('Login OK, Token acquired:', token.substring(0, 10) + '...');

        // 3. Get Orders (using new token)
        console.log('Fetching orders...');
        const ordersRes = await fetch(ordersUrl, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!ordersRes.ok) throw new Error(`Fetch Orders Failed: ${ordersRes.status}`);
        const ordersData = await ordersRes.json();
        console.log('Orders fetch OK. Count:', ordersData.length);

    } catch (err) {
        console.error('Verification Failed:', err.message);
    }
}

testbackend();
