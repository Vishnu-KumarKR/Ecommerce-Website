const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const Database = require('better-sqlite3');

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_DIR = path.join(__dirname, '..', 'data');
const PRODUCT_FIELDS = `id, name, price, category, brand, imageUrl, description, stock`;

fs.mkdirSync(DATA_DIR, { recursive: true });

const db = new Database(path.join(DATA_DIR, 'store.db'));
db.pragma('journal_mode = WAL');

app.use(cors());
app.use(express.json());

const loginAttempts = {};
const activeTokens = new Map();

const catalogSeed = [
  { name: 'Galaxy S22 Ultra', price: 109999, imageUrl: '/products/samsung-galaxy-s22-ultra.jpeg', category: 'Mobile', brand: 'Samsung' },
  { name: 'Galaxy Z Fold5', price: 154999, imageUrl: '/products/galaxy-z-fold5.jpg', category: 'Mobile', brand: 'Samsung' },
  { name: 'Galaxy Z Flip5', price: 99999, imageUrl: '/products/galaxy-z-flip5.jpg', category: 'Mobile', brand: 'Samsung' },
  { name: 'Galaxy S23 Ultra', price: 124999, imageUrl: '/products/galaxy-s23-ultra.jpg', category: 'Mobile', brand: 'Samsung' },
  { name: 'Galaxy Watch6 Classic', price: 36999, imageUrl: '/products/galaxy-watch6-classic.jpg', category: 'Watches', brand: 'Samsung' },
  { name: 'Galaxy Buds2 Pro', price: 17999, imageUrl: '/products/galaxy-buds2-pro.jpg', category: 'Accessories', brand: 'Samsung' },
  { name: 'iPhone 13', price: 79999, imageUrl: '/products/iphone13.webp', category: 'Mobile', brand: 'Apple' },
  { name: 'iPhone 14 Pro Max', price: 139999, imageUrl: '/products/iphone-14-pro-max.jpg', category: 'Mobile', brand: 'Apple' },
  { name: 'iPhone 15 Plus', price: 89999, imageUrl: '/products/iphone-15-plus.jpg', category: 'Mobile', brand: 'Apple' },
  { name: 'Apple Watch Ultra 2', price: 89999, imageUrl: '/products/apple-watch-ultra-2.jpg', category: 'Watches', brand: 'Apple' },
  { name: 'AirPods Max', price: 59999, imageUrl: '/products/airpods-max.jpg', category: 'Accessories', brand: 'Apple' },
  { name: 'MacBook Air M2', price: 112990, imageUrl: '/products/macbook-air-m2.jpg', category: 'Mobile', brand: 'Apple' },
  { name: 'Realme GT Neo 5', price: 39999, imageUrl: '/products/realme-gt-neo-5.jpg', category: 'Mobile', brand: 'Realme' },
  { name: 'Realme 12 Pro Plus', price: 32999, imageUrl: '/products/realme-12-pro-plus.jpg', category: 'Mobile', brand: 'Realme' },
  { name: 'Realme Narzo 60', price: 17999, imageUrl: '/products/realme-narzo-60.jpg', category: 'Mobile', brand: 'Realme' },
  { name: 'Realme C67', price: 14999, imageUrl: '/products/realme-c67.jpg', category: 'Mobile', brand: 'Realme' },
  { name: 'Realme Buds Air 5', price: 4599, imageUrl: '/products/realme-buds-air-5.jpg', category: 'Accessories', brand: 'Realme' },
  { name: 'Realme Watch 3', price: 5999, imageUrl: '/products/realme-watch-3.jpg', category: 'Watches', brand: 'Realme' },
  { name: 'Xiaomi 14 Pro', price: 74999, imageUrl: '/products/xiaomi-14-pro.jpg', category: 'Mobile', brand: 'Xiaomi' },
  { name: 'Redmi K70', price: 42999, imageUrl: '/products/redmi-k70.jpg', category: 'Mobile', brand: 'Xiaomi' },
  { name: 'Mi Pad 6', price: 28999, imageUrl: '/products/mi-pad-6.jpg', category: 'Mobile', brand: 'Xiaomi' },
  { name: 'Xiaomi Watch S3', price: 16999, imageUrl: '/products/xiaomi-watch-s3.jpg', category: 'Watches', brand: 'Xiaomi' },
  { name: 'Mi Band 8', price: 4999, imageUrl: '/products/mi-band-8.jpg', category: 'Watches', brand: 'Xiaomi' },
  { name: 'Xiaomi 13T', price: 53999, imageUrl: '/products/xiaomi-13t.jpg', category: 'Mobile', brand: 'Xiaomi' },
  { name: 'OnePlus 10 Pro', price: 61999, imageUrl: '/products/oneplus-10-pro.png', category: 'Mobile', brand: 'OnePlus' },
  { name: 'Moto Fusion 5G', price: 24999, imageUrl: '/products/moto-fusion-5g.png', category: 'Mobile', brand: 'Motorola' },
  { name: 'IQOO Z9s Pro 5G', price: 35999, imageUrl: '/products/iqoo-z9s-pro-5g.jpg', category: 'Mobile', brand: 'iQOO' },
  { name: 'Lipstick Set', price: 750, imageUrl: '/products/lipstick.jpg', category: 'Cosmetics' },
  { name: 'Foundation Makeup', price: 1500, imageUrl: '/products/foundation.jpg', category: 'Cosmetics' },
  { name: 'Mascara Volume', price: 2500, imageUrl: '/products/mascara.jpg', category: 'Cosmetics' },
  { name: 'Eyeliner Pencil Set', price: 3200, imageUrl: '/products/eyeliner.jpg', category: 'Cosmetics' },
  { name: 'Face Powder Compact', price: 7500, imageUrl: '/products/face-powder.jpg', category: 'Cosmetics' },
  { name: 'Nail Polish Set', price: 4500, imageUrl: '/products/nail-polish.jpg', category: 'Cosmetics' },
  { name: 'Modern Sofa', price: 54999, imageUrl: '/products/sofa.jpg', category: 'Furniture' },
  { name: 'Wooden Dining Table', price: 42999, imageUrl: '/products/dining-table.jpg', category: 'Furniture' },
  { name: 'Office Chair', price: 18999, imageUrl: '/products/office-chair.jpg', category: 'Furniture' },
  { name: 'Bookshelf Cabinet', price: 22999, imageUrl: '/products/bookshelf.jpg', category: 'Furniture' },
  { name: 'Bed Frame Queen', price: 37999, imageUrl: '/products/bed-frame.jpg', category: 'Furniture' },
  { name: 'Coffee Table', price: 15999, imageUrl: '/products/coffee-table.jpg', category: 'Furniture' },
  { name: 'Plant Pot Set', price: 1200, imageUrl: '/products/plant.jpg', category: 'Decor' },
  { name: 'Wall Art Canvas', price: 6500, imageUrl: '/products/wall-art.jpg', category: 'Decor' },
  { name: 'Table Lamp Modern', price: 4200, imageUrl: '/products/table-lamp.jpg', category: 'Decor' },
  { name: 'Photo Frame Set', price: 2200, imageUrl: '/products/photo-frame.jpg', category: 'Decor' },
  { name: 'Vase Decorative', price: 12500, imageUrl: '/products/vase.jpg', category: 'Decor' },
  { name: 'Mirror Wall Decor', price: 38000, imageUrl: '/products/mirror.jpg', category: 'Decor' },
  { name: 'Wireless Earbuds', price: 5500, imageUrl: '/products/earbuds.jpg', category: 'Accessories' },
  { name: 'Leather Wallet', price: 2500, imageUrl: '/products/wallet.jpg', category: 'Accessories' },
  { name: 'Sunglasses Classic', price: 14500, imageUrl: '/products/sunglasses.jpg', category: 'Accessories' },
  { name: 'Backpack Travel', price: 18500, imageUrl: '/products/backpack.jpg', category: 'Accessories' },
  { name: 'Phone Case Premium', price: 1200, imageUrl: '/products/phone-case.jpg', category: 'Accessories' },
  { name: 'Power Bank 20000mAh', price: 8500, imageUrl: '/products/power-bank.jpg', category: 'Accessories' },
];

function ensureSchema() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price INTEGER NOT NULL,
      category TEXT,
      brand TEXT,
      imageUrl TEXT,
      description TEXT,
      stock INTEGER DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'customer'
    );
  `);
}

function seedProducts() {
  const count = db.prepare('SELECT COUNT(*) AS count FROM products').get().count;
  if (count > 0) return;
  const insert = db.prepare(`
    INSERT INTO products (name, price, category, brand, imageUrl, description, stock)
    VALUES (@name, @price, @category, @brand, @imageUrl, @description, @stock)
  `);
  const tx = db.transaction((items) => {
    items.forEach((item, idx) => {
      insert.run({
        name: item.name,
        price: item.price,
        category: item.category || '',
        brand: item.brand || '',
        imageUrl: item.imageUrl || '',
        description: `Premium ${item.name} from the MiniAmazon catalog.`,
        stock: item.stock ?? ((idx % 3) + 1) * 25,
      });
    });
  });
  tx(catalogSeed);
  console.log(`Seeded ${catalogSeed.length} products into SQLite DB.`);
}

function seedUsers() {
  const adminExists = db.prepare('SELECT 1 FROM users WHERE email = ?').get('admin@site.com');
  if (!adminExists) {
    db.prepare('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)').run(
      'Admin User',
      'admin@site.com',
      'demo123',
      'admin'
    );
    console.log('Seeded default admin user admin@site.com / demo123');
  }
}

ensureSchema();
seedProducts();
seedUsers();

function normalizeProduct(row) {
  if (!row) return null;
  return {
    id: String(row.id),
    name: row.name,
    price: Number(row.price),
    category: row.category || '',
    brand: row.brand || '',
    imageUrl: row.imageUrl || '',
    description: row.description || '',
    stock: Number(row.stock ?? 0),
  };
}

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization || '';
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  const token = authHeader.split(' ')[1];
  const email = activeTokens.get(token);
  if (!email) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  const user = db.prepare('SELECT id, name, email, role FROM users WHERE email = ?').get(email);
  if (!user) {
    activeTokens.delete(token);
    return res.status(401).json({ message: 'User session expired' });
  }
  req.user = user;
  req.token = token;
  next();
}

function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
}

function sanitizeProductPayload(body) {
  const { name, price, category, brand, imageUrl, description, stock } = body;
  if (!name || typeof name !== 'string') {
    throw new Error('Product name is required');
  }
  const priceValue = Number(price);
  if (!Number.isFinite(priceValue) || priceValue <= 0) {
    throw new Error('Price must be a positive number');
  }
  const stockValue = Number(stock ?? 0);
  if (!Number.isFinite(stockValue) || stockValue < 0) {
    throw new Error('Stock cannot be negative');
  }
  return {
    name: name.trim(),
    price: Math.round(priceValue),
    category: category?.trim() || '',
    brand: brand?.trim() || '',
    imageUrl: imageUrl?.trim() || '',
    description: description?.trim() || '',
    stock: Math.round(stockValue),
  };
}

// Root route - helpful message for direct access
app.get('/', (_req, res) => {
  res.json({
    message: 'Backend API is running',
    endpoints: {
      health: '/health',
      products: '/api/products',
      login: 'POST /api/login',
      register: 'POST /api/register',
      adminProducts: 'CRUD /api/admin/products',
    },
    frontend: 'Please access the frontend at http://localhost:5173',
  });
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/products', (req, res) => {
  const { category, brand, search } = req.query;
  const clauses = [];
  const params = {};
  if (category) {
    clauses.push('category = @category');
    params.category = category;
  }
  if (brand) {
    clauses.push('LOWER(brand) = LOWER(@brand)');
    params.brand = brand;
  }
  if (search) {
    clauses.push('(LOWER(name) LIKE LOWER(@search) OR LOWER(description) LIKE LOWER(@search))');
    params.search = `%${search}%`;
  }
  const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
  const rows = db.prepare(`SELECT ${PRODUCT_FIELDS} FROM products ${where} ORDER BY id DESC`).all(params);
  res.json(rows.map(normalizeProduct));
});

app.get('/api/products/:id', (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) {
    return res.status(400).json({ message: 'Invalid product id' });
  }
  const product = db.prepare(`SELECT ${PRODUCT_FIELDS} FROM products WHERE id = ?`).get(id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(normalizeProduct(product));
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }
  const normalizedEmail = email.trim().toLowerCase();

  const now = Date.now();
  if (!loginAttempts[normalizedEmail]) loginAttempts[normalizedEmail] = { fails: 0, blockedUntil: 0 };
  const record = loginAttempts[normalizedEmail];
  if (record.blockedUntil && now < record.blockedUntil) {
    return res.status(429).json({ message: 'Too many failed attempts. Try again in 1 minute.' });
  }

  const user = db.prepare('SELECT id, name, email, password, role FROM users WHERE email = ?').get(normalizedEmail);
  if (!user) {
    record.fails++;
    if (record.fails >= 5) record.blockedUntil = now + 60000;
    return res.status(404).json({ message: 'Email not found' });
  }

  if (user.password !== password) {
    record.fails++;
    if (record.fails >= 5) record.blockedUntil = now + 60000;
    return res.status(401).json({ message: 'Incorrect password' });
  }

  loginAttempts[normalizedEmail] = { fails: 0, blockedUntil: 0 };
  const token = crypto.randomBytes(32).toString('hex');
  activeTokens.set(token, user.email);

  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields required' });
  }
  const trimmedEmail = email.trim().toLowerCase();
  const exists = db.prepare('SELECT 1 FROM users WHERE email = ?').get(trimmedEmail);
  if (exists) {
    return res.status(409).json({ message: 'Email already registered' });
  }
  db.prepare('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)').run(
    name.trim(),
    trimmedEmail,
    password,
    'customer'
  );
  res.json({ success: true });
});

app.get('/api/admin/products', authenticate, requireAdmin, (_req, res) => {
  const rows = db.prepare(`SELECT ${PRODUCT_FIELDS} FROM products ORDER BY id DESC`).all();
  res.json(rows.map(normalizeProduct));
});

app.post('/api/admin/products', authenticate, requireAdmin, (req, res) => {
  try {
    const payload = sanitizeProductPayload(req.body);
    const info = db.prepare(`
      INSERT INTO products (name, price, category, brand, imageUrl, description, stock)
      VALUES (@name, @price, @category, @brand, @imageUrl, @description, @stock)
    `).run(payload);
    const product = db.prepare(`SELECT ${PRODUCT_FIELDS} FROM products WHERE id = ?`).get(info.lastInsertRowid);
    res.status(201).json(normalizeProduct(product));
  } catch (err) {
    res.status(400).json({ message: err.message || 'Invalid product payload' });
  }
});

app.put('/api/admin/products/:id', authenticate, requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) {
    return res.status(400).json({ message: 'Invalid product id' });
  }
  const existing = db.prepare(`SELECT ${PRODUCT_FIELDS} FROM products WHERE id = ?`).get(id);
  if (!existing) {
    return res.status(404).json({ message: 'Product not found' });
  }
  try {
    const payload = sanitizeProductPayload({ ...existing, ...req.body });
    db.prepare(`
      UPDATE products
      SET name=@name, price=@price, category=@category, brand=@brand, imageUrl=@imageUrl, description=@description, stock=@stock
      WHERE id=@id
    `).run({ ...payload, id });
    const updated = db.prepare(`SELECT ${PRODUCT_FIELDS} FROM products WHERE id = ?`).get(id);
    res.json(normalizeProduct(updated));
  } catch (err) {
    res.status(400).json({ message: err.message || 'Invalid product payload' });
  }
});

app.delete('/api/admin/products/:id', authenticate, requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) {
    return res.status(400).json({ message: 'Invalid product id' });
  }
  const result = db.prepare('DELETE FROM products WHERE id = ?').run(id);
  if (result.changes === 0) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});