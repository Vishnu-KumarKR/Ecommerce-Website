import React, { useCallback, useEffect, useRef, useState } from 'react';
import { apiClient } from '../api/client';
import { logout } from '../auth';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const formatINR = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);
const formatDisplayINR = (price) => formatINR(price);

const heroSlides = [
  {
    title: 'SMART WEARABLES',
    headline: 'Track every move with precision',
    offer: 'Flat 20% OFF on premium smart watches',
    cta: 'Shop Wearables',
    image: '/products/fitness-watch.jpg',
    gradient: 'linear-gradient(120deg,#0f1842 0%,#1d3e91 100%)',
    category: 'Watches',
  },
  {
    title: 'COSMETICS CARNIVAL',
    headline: 'Glow like never before',
    offer: 'Buy 2 get 1 free on bestsellers',
    cta: 'Explore Cosmetics',
    image: '/products/lipstick.jpg',
    gradient: 'linear-gradient(120deg,#461250 0%,#a73e83 100%)',
    category: 'Cosmetics',
  },
  {
    title: 'LUXURY WATCHES',
    headline: 'Timeless elegance on your wrist',
    offer: 'EMI starting ₹2,499/month',
    cta: 'View Collection',
    image: '/products/gold-watch.jpg',
    gradient: 'linear-gradient(120deg,#2c0f0f 0%,#5b2d0c 100%)',
    category: 'Watches',
  },
  {
    title: 'HOME DECOR DEALS',
    headline: 'Transform spaces effortlessly',
    offer: 'Up to 60% OFF on decor accents',
    cta: 'Refresh Your Home',
    image: '/products/wall-art.jpg',
    gradient: 'linear-gradient(120deg,#0f2f2f 0%,#178885 100%)',
    category: 'Decor',
  },
  {
    title: 'ACCESSORIES FEST',
    headline: 'Stay stylish, stay connected',
    offer: 'Power banks & audio essentials from ₹999',
    cta: 'Grab Accessories',
    image: '/products/earbuds.jpg',
    gradient: 'linear-gradient(120deg,#102144 0%,#2d55a2 100%)',
    category: 'Accessories',
  },
];

const categories = [
  { name: 'Mobile', icon: '📱' },
  { name: 'Cosmetics', icon: '💄' },
  { name: 'Furniture', icon: '🛋️' },
  { name: 'Watches', icon: '⌚' },
  { name: 'Decor', icon: '🌱' },
  { name: 'Accessories', icon: '🧢' },
];
const brands = [
  { name: 'Apple', color: '#ededed', label: 'UP TO 80% OFF', icon: '🍏' },
  { name: 'Realme', color: '#fffbe3', label: 'UP TO 80% OFF', icon: '🟡' },
  { name: 'Xiaomi', color: '#ffede3', label: 'UP TO 80% OFF', icon: '🟠' },
  { name: 'Samsung', color: '#e3f0ff', label: 'UP TO 80% OFF', icon: '🔵' },
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const productSectionRef = useRef(null);

  function handleLogout() {
    logout();
    navigate('/login');
  }

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product);
    alert('Product added to cart!');
  };

  const handleBuyNow = (e, product) => {
    e.stopPropagation();
    addToCart(product);
    navigate('/cart');
  };

  const loadProducts = useCallback(async (category, brand) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (category) params.append('category', category);
      if (brand) params.append('brand', brand);
      const query = params.toString();
      const url = query ? `/api/products?${query}` : '/api/products';

      console.log('🌐 Attempting to fetch products from', url);
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('📡 Response status:', res.status, res.statusText);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      console.log('✅ Backend connected! Products loaded:', data.length);
      setProducts(data);
    } catch (e) {
      console.error('❌ Backend connection failed:', {
        message: e.message,
        error: e,
      });
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts(selectedCategory, selectedBrand);
  }, [selectedCategory, selectedBrand, loadProducts]);

const handleCategoryClick = (categoryName) => {
  if (selectedCategory === categoryName) {
    setSelectedCategory(null);
  } else {
    setSelectedCategory(categoryName);
  }
  setSelectedBrand(null);
  setTimeout(() => {
    productSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, 150);
};

const handleBrandClick = (brandName) => {
  if (selectedBrand === brandName) {
    setSelectedBrand(null);
  } else {
    setSelectedBrand(brandName);
  }
  setSelectedCategory(null);
  setTimeout(() => {
    productSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, 150);
};

  const handleHomeClick = () => {
    setSelectedCategory(null);
    setSelectedBrand(null);
    loadProducts(null, null);
    navigate('/');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

const handleSlideCTA = (slide) => {
  if (slide.category || slide.brand) {
    if (slide.category) {
      setSelectedCategory(slide.category);
    } else {
      setSelectedCategory(null);
    }
    if (slide.brand) {
      setSelectedBrand(slide.brand);
    } else {
      setSelectedBrand(null);
    }
    setLoading(true);
    setTimeout(() => {
      productSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  } else if (slide.route) {
    navigate(slide.route);
  }
};

  const activeSlide = heroSlides[currentSlide];
  const hasFilter = Boolean(selectedCategory || selectedBrand);
  const filterTitle = selectedBrand
    ? `Top ${selectedBrand} Deals`
    : selectedCategory
      ? `${selectedCategory} Products`
      : 'All Products';

  return (
    <div style={{ margin:0, padding:0, width:'100%', minWidth:0, boxSizing:'border-box', overflowX:'hidden', background: '#f7fafd', minHeight: '100vh' }}>
      {/* Single header: flush edges, logout rightmost */}
      <header style={{ width:'100%', background: '#fff', borderBottom: '2px solid #eef2f7', display:'flex', alignItems:'center', justifyContent:'space-between', padding: '20px 32px', boxSizing:'border-box', gap: 24, margin:0 }}>
        <img src="/assets/mylogo.png" alt="MiniAmazon" style={{height:50, width:'auto', display:'block', marginRight:24, flexShrink:0}} />
        <input placeholder="Search products, brands, categories..." style={{ flex:1, minWidth:280, maxWidth:700, padding: 13, borderRadius: 8, border: '1px solid #e3e6ea', fontSize: 17, background: '#fcfcff', margin:'0 24px', display:'block' }} />
        <nav style={{display:'flex',gap:24,fontWeight:700, fontSize:17, flexShrink:0, alignItems:'center'}}>
          <a href="#" onClick={(e) => { e.preventDefault(); handleHomeClick(); }} style={{color: '#01336b', textDecoration: 'none'}}>Home</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('/cart'); }} style={{color: '#01336b', textDecoration: 'none'}}>Cart</a>
          <button onClick={handleLogout} style={{marginLeft: 15, padding: '7px 19px', color: '#fff', background:'#ff9100', border:'none', borderRadius:6, fontWeight:700, fontSize:16, cursor:'pointer'}}>Logout</button>
        </nav>
      </header>

      {/* Hero Banner Slider */}
      <div style={{
        width:'100%',
        background: activeSlide.gradient,
        color:'#fff',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        padding:'48px 0 36px 0',
        boxSizing:'border-box',
        margin:0,
        transition: 'background 0.8s ease',
        position: 'relative'
      }}>
        <button
          onClick={goPrevSlide}
          aria-label="Previous slide"
          style={{
            position: 'absolute',
            left: 24,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: '1px solid rgba(0,0,0,0.45)',
            background: 'rgba(255,255,255,0.9)',
            color: '#000',
            fontSize: 18,
            cursor: 'pointer',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            boxShadow:'0 8px 18px rgba(0,0,0,0.08)'
          }}
        >
          ‹
        </button>
        <div style={{display:'flex',alignItems:'center', width:'100%', maxWidth:1500, padding:'0 32px', gap: 40}}>
          <div style={{flex:1, minWidth:260}}>
            <div style={{fontSize:14, fontWeight:700, letterSpacing:4, textTransform:'uppercase', opacity:0.85}}>{activeSlide.title}</div>
            <div style={{fontSize:36, fontWeight:900, marginTop:14, lineHeight:1.2}}>{activeSlide.headline}</div>
            <div style={{marginTop:16, marginBottom:22, fontWeight:500, fontSize:18}}>{activeSlide.offer}</div>
            <button
              onClick={() => handleSlideCTA(activeSlide)}
              style={{background:'#ff9100', color:'#fff', border:'none', padding:'12px 28px', fontWeight:700, borderRadius:9, fontSize: 17, cursor:'pointer', boxShadow:'0 8px 20px rgba(0,0,0,0.2)'}}>
              {activeSlide.cta}
            </button>
          </div>
          <div style={{flex:'0 0 240px', display:'flex', justifyContent:'center'}}>
            <img 
              key={activeSlide.image}
              src={activeSlide.image}
              alt={activeSlide.title}
              style={{width:220, height:220, objectFit:'cover', borderRadius:24, background:'#fff', border:'4px solid rgba(255,255,255,0.2)', boxShadow:'0 12px 28px rgba(0,0,0,0.25)', transition:'opacity 0.5s ease'}}
              onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/220x220/eeeeee/888888?text=Offer'; }}
            />
          </div>
        </div>
        <button
          onClick={goNextSlide}
          aria-label="Next slide"
          style={{
            position: 'absolute',
            right: 24,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: '1px solid rgba(0,0,0,0.45)',
            background: 'rgba(255,255,255,0.9)',
            color: '#000',
            fontSize: 18,
            cursor: 'pointer',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            boxShadow:'0 8px 18px rgba(0,0,0,0.08)'
          }}
        >
          ›
        </button>
      </div>

      {/* Products Section */}
      <section style={{width:'100%', display:'flex', justifyContent:'center', background:'#f7fafd', margin:0}}>
        <div ref={productSectionRef} style={{width:'100%', maxWidth:1300, margin:'28px auto', background:'#fff', borderRadius: 13, padding:'25px 32px', boxShadow:'0 2px 12px rgba(0,0,0,0.04)'}}>
          <div style={{fontWeight:700, fontSize:22, marginBottom:18, color:'#2949b6', textAlign:'center'}}>
            {filterTitle}
            {hasFilter && (
              <button 
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedBrand(null);
                  setLoading(true);
                }}
                style={{
                  marginLeft: 15,
                  padding: '6px 12px',
                  background: '#f0f0f0',
                  border: 'none',
                  borderRadius: 6,
                  fontSize: 12,
                  cursor: 'pointer',
                  color: '#666'
                }}
              >
                Clear Filter
              </button>
            )}
          </div>
          <div className='h-scroll' style={{display:'flex', overflowX:'auto', gap:18, paddingBottom: 12}}>
            {loading ? 'Loading...' : products.length === 0 ? (
              <div style={{width: '100%', textAlign: 'center', padding: '40px', color: '#666'}}>
                No products found in this category.
              </div>
            ) : products.map((p) => {
              const originalName = p.name || '';
              const slug = originalName.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
              const baseNames = [slug];
              const lowerSpaces = originalName.toLowerCase();
              baseNames.push(lowerSpaces.replace(/\s+/g,'-'));
              baseNames.push(lowerSpaces.replace(/\s+/g,'_'));
              baseNames.push(lowerSpaces); // keep spaces (may exist in filename)
              baseNames.push(originalName); // original case with spaces
              const encodedOriginal = encodeURIComponent(originalName);
              const exts = ['webp','jpg','jpeg','png'];
              const candidates = [];
              baseNames.forEach(b=> exts.forEach(ext=> candidates.push(`/products/${b}.${ext}`)));
              // Also try URL-encoded name with spaces retained
              exts.forEach(ext=> candidates.push(`/products/${encodedOriginal}.${ext}`));
              if (p.imageUrl) candidates.unshift(p.imageUrl);
              return (
              <div 
                key={p.id} 
                onClick={() => handleProductClick(p.id)}
                style={{
                  minWidth:200, 
                  background:'#f8fafc', 
                  borderRadius:13, 
                  padding:15, 
                  display:'flex',
                  flexDirection:'column', 
                  alignItems:'center', 
                  boxShadow:'0 2px 9px #e7eaff',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 4px 15px #d0d5ff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 9px #e7eaff';
                }}
              >
                <img 
                  src={candidates[0]} 
                  onError={(e)=>{ 
                    const img = e.currentTarget; 
                    const list = img.dataset.candidates ? JSON.parse(img.dataset.candidates) : candidates;
                    let idx = parseInt(img.dataset.idx || '0', 10) + 1;
                    if (idx < list.length) {
                      img.dataset.idx = String(idx);
                      img.src = list[idx];
                    } else {
                      img.onerror = null; 
                      img.src='https://via.placeholder.com/110x110/eeeeee/888888?text=Image';
                    }
                  }}
                  data-candidates={JSON.stringify(candidates)}
                  style={{width:110, height:110, objectFit:'cover', marginBottom:16, background:'#fff', borderRadius:8, border:'1px solid #eee'}} alt={p.name}/>
                <div style={{fontWeight:700, fontSize:17, marginBottom:5, textAlign: 'center', color:'#01336b'}}>{p.name}</div>
                <div style={{color:'#1db86e', fontWeight:700, fontSize:16}}>{formatDisplayINR(p.price)}</div>
                <div style={{display: 'flex', gap: 8, marginTop: 10}}>
                  <button 
                    onClick={(e) => handleAddToCart(e, p)}
                    style={{
                      background:'#2949b6', 
                      color:'#fff', 
                      border:'none', 
                      borderRadius:5, 
                      padding:'6px 12px', 
                      fontWeight:600, 
                      fontSize:13,
                      cursor: 'pointer'
                    }}
                  >
                    Add to Cart
                  </button>
                  <button 
                    onClick={(e) => handleBuyNow(e, p)}
                    style={{
                      background:'#ff9100', 
                      color:'#fff', 
                      border:'none', 
                      borderRadius:5, 
                      padding:'6px 12px', 
                      fontWeight:600, 
                      fontSize:13,
                      cursor: 'pointer'
                    }}
                  >
                    Buy
                  </button>
                </div>
              </div>
            );})}
          </div>
        </div>
      </section>

      {/* Top Categories */}
      <section style={{width:'100%', display:'flex', justifyContent:'center', background:'#f7fafd', margin:0}}>
        <div style={{width:'100%', maxWidth:1300, margin:'32px auto', background:'#fff', borderRadius: 13, padding:'25px 32px', boxShadow:'0 2px 12px rgba(0,0,0,0.04)'}}>
          <div style={{fontWeight:700, fontSize:21, marginBottom:18, color:'#2949b6', textAlign:'center'}}>Shop From <span style={{color:'#ff9100'}}>Top Categories</span></div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(6, 1fr)', gap:48, justifyItems:'center', alignItems:'start', padding: '6px 4px 14px'}}>
            {categories.map(c => (
              <div 
                key={c.name} 
                onClick={() => handleCategoryClick(c.name)}
                style={{
                  padding: '10px 0', 
                  width:'100%', 
                  textAlign:'center',
                  cursor: 'pointer',
                  borderRadius: 8,
                  transition: 'background 0.2s',
                  backgroundColor: selectedCategory === c.name ? '#e7f0ff' : 'transparent',
                  padding: '15px 10px',
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== c.name) {
                    e.currentTarget.style.backgroundColor = '#f5f8ff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== c.name) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <div style={{fontSize:'2.05rem', marginBottom:8}}>{c.icon}</div>
                <div style={{
                  fontSize:15, 
                  color: selectedCategory === c.name ? '#2949b6' : '#2949b6', 
                  fontWeight: selectedCategory === c.name ? 700 : 600
                }}>
                  {c.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Electronics Brands Row */}
      <section style={{width:'100%', display:'flex', justifyContent:'center', background:'#f7fafd', margin:0}}>
        <div style={{width:'100%', maxWidth:1300, margin:'32px auto', borderRadius: 13, background:'#fff', padding:'25px 32px', boxShadow:'0 2px 12px rgba(0,0,0,0.04)'}}>
          <div style={{fontWeight:700, fontSize:20, marginBottom:18,color:'#2949b6', textAlign:'center'}}>Top <span style={{color:'#ff9100'}}>Electronics Brands</span></div>
          <div style={{display:'flex', gap:28, flexWrap:'wrap'}}>
            {brands.map(b => (
              <div
                key={b.name}
                onClick={() => handleBrandClick(b.name)}
                style={{
                  flex:1,
                  background:b.color,
                  borderRadius:12,
                  padding:'18px 14px',
                  display:'flex',
                  alignItems:'center',
                  boxShadow:selectedBrand === b.name ? '0 6px 16px rgba(41,73,182,0.25)' : '0 2px 8px #e7eaff',
                  minWidth:220,
                  margin:'0 2px',
                  cursor:'pointer',
                  border: selectedBrand === b.name ? '2px solid #ff9100' : '2px solid transparent',
                  transition:'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (selectedBrand !== b.name) {
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(41,73,182,0.15)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedBrand !== b.name) {
                    e.currentTarget.style.boxShadow = '0 2px 8px #e7eaff';
                  }
                }}
              >
                <span style={{fontSize:29, marginRight:15}}>{b.icon}</span>
                <span style={{fontWeight:1000, fontSize:19, marginRight:10,color:'#2949b6'}}>{b.name}</span>
                <span style={{ background:'#1db86e', color:'#fff', padding:'3px 12px', borderRadius:7, fontSize:15, fontWeight:700 }}>{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer: edge-to-edge, centered content */}
      <footer style={{background:'#153266', color:'#eaf6fa', padding:'44px 0 32px 0', width:'100%', boxSizing:'border-box', marginTop:56, overflowX:'hidden'}}>
        <div style={{width:'100%', maxWidth:1200, margin:'0 auto', boxSizing:'border-box', display:'flex', flexWrap:'wrap', justifyContent:'space-between', alignItems:'flex-start', gap:36, padding:'0 24px'}}>
          <div style={{minWidth:240, textAlign:'center'}}>
            <div style={{fontWeight:700, marginBottom:12, fontSize:18}}>Most Popular Categories</div>
            <ul style={{listStyle:'none',padding:0,fontWeight:500, margin:0, display:'grid', gap:10}}>
              <li style={{display:'flex', alignItems:'center', gap:10, justifyContent:'center'}}><span style={{fontSize:18}}>📱</span>Mobiles</li>
              <li style={{display:'flex', alignItems:'center', gap:10, justifyContent:'center'}}><span style={{fontSize:18}}>💻</span>Electronics</li>
              <li style={{display:'flex', alignItems:'center', gap:10, justifyContent:'center'}}><span style={{fontSize:18}}>🛋️</span>Furniture</li>
              <li style={{display:'flex', alignItems:'center', gap:10, justifyContent:'center'}}><span style={{fontSize:18}}>⌚</span>Watches</li>
            </ul>
          </div>
          <div style={{flex:'1 1 320px', textAlign:'center', minWidth:320}}>
            <div style={{fontSize:24, fontWeight:1000, letterSpacing:1, color:'#fffc'}}>MiniAmazon</div>
            <p style={{marginTop:10, color:'#aacbea', fontSize:14, lineHeight:1.6}}>Your trusted destination for premium tech, fashion, and home essentials. Discover curated deals and fast delivery across India.</p>
          </div>
          <div style={{minWidth:240, textAlign:'center'}}>
            <div style={{fontWeight:700, marginBottom:12, fontSize:18}}>Customer Services</div>
            <ul style={{listStyle:'none',padding:0,fontWeight:500, margin:0, display:'grid', gap:10}}>
              <li style={{display:'flex', alignItems:'center', gap:10, justifyContent:'center'}}>
                <span role="img" aria-label="returns" style={{fontSize:18}}>🔄</span>
                <span>Returns</span>
              </li>
              <li style={{display:'flex', alignItems:'center', gap:10, justifyContent:'center'}}>
                <span role="img" aria-label="help" style={{fontSize:18}}>🆘</span>
                <span>Help Center</span>
              </li>
              <li style={{display:'flex', alignItems:'center', gap:10, justifyContent:'center'}}>
                <span role="img" aria-label="privacy" style={{fontSize:18}}>🔐</span>
                <span>Privacy Policy</span>
              </li>
              <li style={{display:'flex', alignItems:'center', gap:10, justifyContent:'center'}}>
                <span role="img" aria-label="agreement" style={{fontSize:18}}>📜</span>
                <span>User Agreement</span>
              </li>
            </ul>
          </div>
        </div>
        <div style={{textAlign:'center', color:'#aacbea', marginTop:23}}>© 2025 MiniAmazon. All rights reserved.</div>
      </footer>
    </div>
  );
}

