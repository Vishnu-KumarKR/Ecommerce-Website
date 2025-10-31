const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory product catalog for demo purposes
const products = [
  // Samsung lineup - 6 products
  { id: '1', name: 'Galaxy S22 Ultra', price: 109999, imageUrl: '/products/samsung-galaxy-s22-ultra.jpeg', category: 'Mobile', brand: 'Samsung' },
  { id: '2', name: 'Galaxy Z Fold5', price: 154999, imageUrl: '/products/galaxy-z-fold5.jpg', category: 'Mobile', brand: 'Samsung' },
  { id: '3', name: 'Galaxy Z Flip5', price: 99999, imageUrl: '/products/galaxy-z-flip5.jpg', category: 'Mobile', brand: 'Samsung' },
  { id: '4', name: 'Galaxy S23 Ultra', price: 124999, imageUrl: '/products/galaxy-s23-ultra.jpg', category: 'Mobile', brand: 'Samsung' },
  { id: '5', name: 'Galaxy Watch6 Classic', price: 36999, imageUrl: '/products/galaxy-watch6-classic.jpg', category: 'Watches', brand: 'Samsung' },
  { id: '6', name: 'Galaxy Buds2 Pro', price: 17999, imageUrl: '/products/galaxy-buds2-pro.jpg', category: 'Accessories', brand: 'Samsung' },

  // Apple lineup - 6 products
  { id: '7', name: 'iPhone 13', price: 79999, imageUrl: '/products/iphone13.webp', category: 'Mobile', brand: 'Apple' },
  { id: '8', name: 'iPhone 14 Pro Max', price: 139999, imageUrl: '/products/iphone-14-pro-max.jpg', category: 'Mobile', brand: 'Apple' },
  { id: '9', name: 'iPhone 15 Plus', price: 89999, imageUrl: '/products/iphone-15-plus.jpg', category: 'Mobile', brand: 'Apple' },
  { id: '10', name: 'Apple Watch Ultra 2', price: 89999, imageUrl: '/products/apple-watch-ultra-2.jpg', category: 'Watches', brand: 'Apple' },
  { id: '11', name: 'AirPods Max', price: 59999, imageUrl: '/products/airpods-max.jpg', category: 'Accessories', brand: 'Apple' },
  { id: '12', name: 'MacBook Air M2', price: 112990, imageUrl: '/products/macbook-air-m2.jpg', category: 'Mobile', brand: 'Apple' },

  // Realme lineup - 6 products
  { id: '13', name: 'Realme GT Neo 5', price: 39999, imageUrl: '/products/realme-gt-neo-5.jpg', category: 'Mobile', brand: 'Realme' },
  { id: '14', name: 'Realme 12 Pro Plus', price: 32999, imageUrl: '/products/realme-12-pro-plus.jpg', category: 'Mobile', brand: 'Realme' },
  { id: '15', name: 'Realme Narzo 60', price: 17999, imageUrl: '/products/realme-narzo-60.jpg', category: 'Mobile', brand: 'Realme' },
  { id: '16', name: 'Realme C67', price: 14999, imageUrl: '/products/realme-c67.jpg', category: 'Mobile', brand: 'Realme' },
  { id: '17', name: 'Realme Buds Air 5', price: 4599, imageUrl: '/products/realme-buds-air-5.jpg', category: 'Accessories', brand: 'Realme' },
  { id: '18', name: 'Realme Watch 3', price: 5999, imageUrl: '/products/realme-watch-3.jpg', category: 'Watches', brand: 'Realme' },

  // Xiaomi lineup - 6 products
  { id: '19', name: 'Xiaomi 14 Pro', price: 74999, imageUrl: '/products/xiaomi-14-pro.jpg', category: 'Mobile', brand: 'Xiaomi' },
  { id: '20', name: 'Redmi K70', price: 42999, imageUrl: '/products/redmi-k70.jpg', category: 'Mobile', brand: 'Xiaomi' },
  { id: '21', name: 'Mi Pad 6', price: 28999, imageUrl: '/products/mi-pad-6.jpg', category: 'Mobile', brand: 'Xiaomi' },
  { id: '22', name: 'Xiaomi Watch S3', price: 16999, imageUrl: '/products/xiaomi-watch-s3.jpg', category: 'Watches', brand: 'Xiaomi' },
  { id: '23', name: 'Mi Band 8', price: 4999, imageUrl: '/products/mi-band-8.jpg', category: 'Watches', brand: 'Xiaomi' },
  { id: '24', name: 'Xiaomi 13T', price: 53999, imageUrl: '/products/xiaomi-13t.jpg', category: 'Mobile', brand: 'Xiaomi' },

  // Other mobiles
  { id: '25', name: 'OnePlus 10 Pro', price: 61999, imageUrl: '/products/oneplus-10-pro.png', category: 'Mobile', brand: 'OnePlus' },
  { id: '26', name: 'Moto Fusion 5G', price: 24999, imageUrl: '/products/moto-fusion-5g.png', category: 'Mobile', brand: 'Motorola' },
  { id: '27', name: 'IQOO Z9s Pro 5G', price: 35999, imageUrl: '/products/iqoo-z9s-pro-5g.jpg', category: 'Mobile', brand: 'iQOO' },

  // Cosmetics - 6 products
  { id: '28', name: 'Lipstick Set', price: 750, imageUrl: '/products/lipstick.jpg', category: 'Cosmetics' },
  { id: '29', name: 'Foundation Makeup', price: 1500, imageUrl: '/products/foundation.jpg', category: 'Cosmetics' },
  { id: '30', name: 'Mascara Volume', price: 2500, imageUrl: '/products/mascara.jpg', category: 'Cosmetics' },
  { id: '31', name: 'Eyeliner Pencil Set', price: 3200, imageUrl: '/products/eyeliner.jpg', category: 'Cosmetics' },
  { id: '32', name: 'Face Powder Compact', price: 7500, imageUrl: '/products/face-powder.jpg', category: 'Cosmetics' },
  { id: '33', name: 'Nail Polish Set', price: 4500, imageUrl: '/products/nail-polish.jpg', category: 'Cosmetics' },

  // Furniture - 6 products
  { id: '34', name: 'Modern Sofa', price: 54999, imageUrl: '/products/sofa.jpg', category: 'Furniture' },
  { id: '35', name: 'Wooden Dining Table', price: 42999, imageUrl: '/products/dining-table.jpg', category: 'Furniture' },
  { id: '36', name: 'Office Chair', price: 18999, imageUrl: '/products/office-chair.jpg', category: 'Furniture' },
  { id: '37', name: 'Bookshelf Cabinet', price: 22999, imageUrl: '/products/bookshelf.jpg', category: 'Furniture' },
  { id: '38', name: 'Bed Frame Queen', price: 37999, imageUrl: '/products/bed-frame.jpg', category: 'Furniture' },
  { id: '39', name: 'Coffee Table', price: 15999, imageUrl: '/products/coffee-table.jpg', category: 'Furniture' },

  // Decor - 6 products
  { id: '40', name: 'Plant Pot Set', price: 1200, imageUrl: '/products/plant.jpg', category: 'Decor' },
  { id: '41', name: 'Wall Art Canvas', price: 6500, imageUrl: '/products/wall-art.jpg', category: 'Decor' },
  { id: '42', name: 'Table Lamp Modern', price: 4200, imageUrl: '/products/table-lamp.jpg', category: 'Decor' },
  { id: '43', name: 'Photo Frame Set', price: 2200, imageUrl: '/products/photo-frame.jpg', category: 'Decor' },
  { id: '44', name: 'Vase Decorative', price: 12500, imageUrl: '/products/vase.jpg', category: 'Decor' },
  { id: '45', name: 'Mirror Wall Decor', price: 38000, imageUrl: '/products/mirror.jpg', category: 'Decor' },

  // Accessories - 6 products
  { id: '46', name: 'Wireless Earbuds', price: 5500, imageUrl: '/products/earbuds.jpg', category: 'Accessories' },
  { id: '47', name: 'Leather Wallet', price: 2500, imageUrl: '/products/wallet.jpg', category: 'Accessories' },
  { id: '48', name: 'Sunglasses Classic', price: 14500, imageUrl: '/products/sunglasses.jpg', category: 'Accessories' },
  { id: '49', name: 'Backpack Travel', price: 18500, imageUrl: '/products/backpack.jpg', category: 'Accessories' },
  { id: '50', name: 'Phone Case Premium', price: 1200, imageUrl: '/products/phone-case.jpg', category: 'Accessories' },
  { id: '51', name: 'Power Bank 20000mAh', price: 8500, imageUrl: '/products/power-bank.jpg', category: 'Accessories' },
];

// Simple user store
const USERS = [
  { email: 'admin@site.com', password: 'demo123', name: 'Admin User' }
];

const loginAttempts = {};

// Root route - helpful message for direct access
app.get('/', (_req, res) => {
	res.json({ 
		message: 'Backend API is running',
		endpoints: {
			health: '/health',
			products: '/api/products',
			login: 'POST /api/login',
			register: 'POST /api/register'
		},
		frontend: 'Please access the frontend at http://localhost:5173'
	});
});

app.get('/health', (_req, res) => {
	res.json({ status: 'ok' });
});

app.get('/api/products', (req, res) => {
	const { category, brand } = req.query;
	let filtered = products;
	if (category) {
		filtered = filtered.filter(p => p.category === category);
	}
	if (brand) {
		const normalized = brand.toLowerCase();
		filtered = filtered.filter(p => p.brand && p.brand.toLowerCase() === normalized);
	}
	res.json(filtered);
});

app.get('/api/products/:id', (req, res) => {
	const product = products.find(p => p.id === req.params.id);
	if (!product) return res.status(404).json({ message: 'Product not found' });
	res.json(product);
});

// Auth endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: 'Email and password required' });
  const user = USERS.find(u => u.email === email);

  // Brute-force lockout: after 5 failed attempts, block for 1 min
  const now = Date.now();
  if (!loginAttempts[email]) loginAttempts[email] = { fails: 0, last: 0, blockedUntil: 0 };
  const record = loginAttempts[email];
  if (record.blockedUntil && now < record.blockedUntil) {
    return res.status(429).json({ message: 'Too many failed attempts. Try again in 1 minute.' });
  }

  if (!user) {
    record.fails++;
    record.last = now;
    if (record.fails >= 5) record.blockedUntil = now + 60000;
    return res.status(404).json({ message: 'Email not found' });
  }
  if (user.password !== password) {
    record.fails++;
    record.last = now;
    if (record.fails >= 5) record.blockedUntil = now + 60000;
    return res.status(401).json({ message: 'Incorrect password' });
  }

  // Success: clear fail counter
  loginAttempts[email] = { fails: 0, last: 0, blockedUntil: 0 };
  const token = Buffer.from(email + ':token').toString('base64');
  res.json({ token, user: { email: user.email, name: user.name } });
});

app.listen(PORT, () => {
	console.log(`API server listening on http://localhost:${PORT}`);
});


app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields required' });
  }
  if (USERS.some(u => u.email === email)) {
    return res.status(409).json({ message: 'Email already registered' });
  }
  USERS.push({ email, password, name });
  res.json({ success: true });
});