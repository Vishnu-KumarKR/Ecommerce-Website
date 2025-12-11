import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';

const formatINR = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);
const formatDisplayINR = (price) => formatINR(price);

const getProductDescription = (productName) => {
  const descriptions = {
    'Galaxy S22 Ultra': 'The Samsung Galaxy S22 Ultra is a flagship smartphone featuring a powerful Snapdragon processor, stunning 6.8-inch Dynamic AMOLED display with 120Hz refresh rate, and an integrated S Pen for enhanced productivity. With a pro-grade 108MP camera system and all-day battery life, it\'s designed for professionals and creators who demand the best.',
    'iPhone 13': 'Apple iPhone 13 delivers exceptional performance with the A15 Bionic chip, offering lightning-fast speeds and impressive battery life. Features a stunning Super Retina XDR display, advanced dual-camera system with Cinematic mode, and premium build quality. Perfect for users who want a seamless iOS experience with cutting-edge technology.',
    'OnePlus 10 Pro': 'The OnePlus 10 Pro is a premium Android flagship with Snapdragon 8 Gen 1 processor, offering blazing-fast performance for gaming and multitasking. Features a vibrant 6.7-inch LTPO display, Hasselblad-tuned triple camera system, and Warp Charge 65 for ultra-fast charging. Designed for power users and mobile enthusiasts.',
    'Realme Narzo 70 Pro': 'Realme Narzo 70 Pro delivers lightning-fast 5G performance with a Dimensity chipset, 120Hz AMOLED display, and Air Gesture controls. The 50MP Sony IMX890 OIS camera captures sharp, vibrant shots even in low light, while SUPERVOOC charging powers up in minutes.',
    'IQOO Z9s Pro 5G': 'The IQOO Z9s Pro 5G is a gaming-focused smartphone with powerful MediaTek Dimensity processor and advanced cooling system. Features a high refresh rate display, impressive camera capabilities, and fast charging technology. Built for mobile gamers who need smooth performance and immersive visuals.',
    'Redmi Note 13': 'Xiaomi Redmi Note 13 offers exceptional value with premium features including a high-resolution AMOLED display, versatile quad-camera setup, and powerful performance. Delivers excellent battery life and fast charging. Perfect for budget-conscious users who don\'t want to compromise on quality.',
    'Galaxy Z Fold5': 'Samsung Galaxy Z Fold5 delivers a tablet-sized Dynamic AMOLED display in a pocketable form. Powered by Snapdragon 8 Gen 2, it supports S Pen note-taking, multitasking windows, and flagship cameras for productivity on the go.',
    'Galaxy Z Flip5': 'Samsung Galaxy Z Flip5 features an improved Flex Hinge, larger Flex Window cover display, and premium dual cameras. Compact yet powerful, it offers hands-free FlexCam shooting and flagship speed.',
    'Galaxy S23 Ultra': 'Galaxy S23 Ultra refines the S Series with a 200MP quad camera, built-in S Pen, and Snapdragon 8 Gen 2 for Galaxy. A 5000mAh battery and 6.8-inch AMOLED panel make it the ultimate Samsung flagship.',
    'Galaxy Watch6 Classic': 'Galaxy Watch6 Classic pairs a rotating bezel with a sharper Super AMOLED display and advanced health tracking. Includes ECG, blood pressure trends, and Google-powered Wear OS 4 apps.',
    'Galaxy Buds2 Pro': 'Galaxy Buds2 Pro deliver 24-bit Hi-Fi audio, intelligent ANC, and 360 Audio for immersive listening. Compact and sweat-resistant, they offer up to 18 hours of playback with the wireless case.',
    'iPhone 14 Pro Max': 'Apple iPhone 14 Pro Max introduces Dynamic Island, Always-On display, and the A16 Bionic chip. A new 48MP main camera and crash detection make it Apple’s most advanced phone yet.',
    'iPhone 15 Plus': 'iPhone 15 Plus features a color-infused glass back, USB-C connectivity, and the fast A16 Bionic. The 6.7-inch Super Retina XDR display and larger battery deliver all-day entertainment.',
    'Apple Watch Ultra 2': 'Apple Watch Ultra 2 is engineered for adventure with a 49mm titanium case, 3000-nit Retina display, and precision dual-frequency GPS. Offers 36-hour battery life and advanced dive metrics.',
    'AirPods Max': 'AirPods Max combine high-fidelity audio with Apple-designed dynamic drivers, computational audio, and Active Noise Cancellation. Memory foam ear cushions and knit mesh canopy ensure comfort.',
    'MacBook Air M2': 'MacBook Air M2 delivers exceptional performance in a slim fanless design. The 13.6-inch Liquid Retina display, 18-hour battery life, and MagSafe charging create the perfect everyday notebook.',
    'Realme GT Neo 5': 'Realme GT Neo 5 offers blazing-fast 240W charging, Snapdragon 8+ Gen 1 power, and a 144Hz AMOLED display. RGB lighting on the rear accentuates its performance-focused design.',
    'Realme 12 Pro Plus': 'Realme 12 Pro Plus brings a premium vegan leather finish, periscope portrait camera, and Snapdragon 7s Gen 2 performance. A 120Hz curved display delivers an immersive viewing experience.',
    'Realme Narzo 60': 'Realme Narzo 60 packs a 64MP camera, Dimensity 6020 chipset, and 90Hz AMOLED panel. With a cosmic design and large 5000mAh battery, it balances style with capability.',
    'Realme C67': 'Realme C67 features a 108MP ProLight camera, Snapdragon 685 processor, and Rainwater design. 33W SUPERVOOC charging keeps the 5000mAh battery topped up quickly.',
    'Realme Buds Air 5': 'Realme Buds Air 5 offer flagship-grade 50dB ANC, dual drivers, and 45ms low latency for gaming. With Google Fast Pair and up to 38 hours of playback, they are perfect daily earbuds.',
    'Realme Watch 3': 'Realme Watch 3 sports a 1.8-inch curved display, Bluetooth calling with AI noise cancellation, and 110+ workout modes. IP68 water resistance keeps it ready for any routine.',
    'Xiaomi 14 Pro': 'Xiaomi 14 Pro showcases Leica co-engineered optics, Snapdragon 8 Gen 3, and HyperOS. A ceramic body and 120W HyperCharge combine flagship power with elegance.',
    'Redmi K70': 'Redmi K70 delivers outstanding value with a 2K AMOLED display, Snapdragon 8 Gen 2, and vapor chamber cooling. 120W fast charging fuels the 5000mAh battery in minutes.',
    'Mi Pad 6': 'Mi Pad 6 is a productivity tablet with an 11-inch 2.8K display, Snapdragon 870 processor, and quad speakers. Supports Xiaomi Smart Pen and keyboard case for versatile workflows.',
    'Xiaomi Watch S3': 'Xiaomi Watch S3 features interchangeable bezels, dual-band GPS, and 150+ sports modes. The lightweight aluminum case houses advanced health tracking sensors.',
    'Mi Band 8': 'Mi Band 8 redesigns Xiaomi’s iconic fitness tracker with a high-refresh AMOLED display, Pebble mode for shoe mounting, and 150 workout types.',
    'Xiaomi 13T': 'Xiaomi 13T captures stunning imagery with Leica cameras, MediaTek Dimensity 8200 Ultra, and a 144Hz CrystalRes display. IP68 rating ensures durability in any weather.',
    'Lipstick Set': 'A curated collection of long-lasting lipsticks with rich pigmentation and hydrating ingredients. Includes six flattering shades packaged in a premium organizer, ideal for everyday wear or glam nights.',
    'Foundation Makeup': 'Buildable medium-to-full coverage foundation that blends seamlessly into the skin. Infused with hyaluronic acid for all-day hydration and SPF 20 for daily protection.',
    'Mascara Volume': 'High-impact volumizing mascara with a tapered brush that coats every lash from root to tip. Smudge-proof and long-lasting, delivering dramatic definition in a single stroke.',
    'Eyeliner Pencil Set': 'A trio of ultra-creamy eyeliner pencils in classic black, brown, and charcoal shades. Waterproof formula glides on smoothly and stays put for up to 16 hours.',
    'Face Powder Compact': 'Silky soft compact powder that controls shine without caking. Micro-fine minerals blur pores and set makeup for a natural matte finish.',
    'Nail Polish Set': 'Set of six quick-drying nail lacquers in glossy and metallic finishes. Chip-resistant formula ensures salon-quality wear for up to seven days.',
    'Modern Sofa': 'Three-seater modern sofa upholstered in stain-resistant fabric with high-density foam cushions. Features modular armrests and a kiln-dried hardwood frame for lasting comfort.',
    'Wooden Dining Table': 'Solid acacia wood dining table with a hand-finished surface and steel accents. Seats six comfortably and adds warmth to contemporary dining spaces.',
    'Office Chair': 'Ergonomic office chair with breathable mesh back, adjustable lumbar support, and 3D armrests. Smooth-rolling casters and a synchronized tilt mechanism keep you comfortable through long workdays.',
    'Bookshelf Cabinet': 'Five-tier bookshelf with concealed storage at the base. Crafted from engineered wood with walnut veneer, perfect for displaying decor and organizing essentials.',
    'Bed Frame Queen': 'Queen-size platform bed with upholstered headboard and under-bed storage drawers. Reinforced slats eliminate the need for a box spring.',
    'Coffee Table': 'Minimalist coffee table featuring a tempered glass top and powder-coated steel legs. Includes a lower shelf for magazines and remote controls.',
    'Smart Watch': 'Feature-packed smartwatch with AMOLED display, built-in GPS, and voice assistant support. Tracks workouts, sleep, and heart rate with advanced health insights.',
    'Luxury Gold Watch': 'Handcrafted Swiss automatic watch with 18K gold-plated case and sapphire crystal. Water-resistant up to 100 meters and paired with a genuine leather strap.',
    'Sports Digital Watch': 'Rugged digital sports watch with shock-resistant casing, stopwatch, and altimeter. Designed for outdoor adventures with 100-meter water resistance.',
    'Classic Leather Watch': 'Classic analog watch featuring a stainless-steel case, sunray dial, and Italian leather strap. A timeless accessory for formal and casual looks alike.',
    'Fitness Tracker Watch': 'Lightweight fitness tracker with continuous heart-rate monitoring, SpO2 sensor, and 14-day battery life. Syncs seamlessly with iOS and Android devices.',
    'Designer Analog Watch': 'Statement analog watch with a skeleton dial showcasing the automatic movement. Finished with a ceramic bezel and butterfly clasp bracelet.',
    'Plant Pot Set': 'Set of three ceramic planters with drainage trays, perfect for succulents and herbs. Hand-painted gradient finish adds a calming touch to any room.',
    'Wall Art Canvas': 'Gallery-wrapped canvas art printed with archival inks for vibrant color. Ready to hang with wooden stretcher bars and protective UV coating.',
    'Table Lamp Modern': 'Modern table lamp with matte brass finish and frosted glass shade. Offers warm ambient lighting and includes USB ports for charging devices.',
    'Photo Frame Set': 'Collection of five photo frames in assorted sizes with minimalist borders. Features easel backs and wall-mount hardware for versatile display.',
    'Vase Decorative': 'Handblown glass vase with a sculptural silhouette and ombré finish. Ideal for fresh blooms or as a standalone statement piece.',
    'Mirror Wall Decor': 'Round wall mirror with beveled edges and geometric metal frame. Adds dimension and light to entryways and living rooms.',
    'Wireless Earbuds': 'True wireless earbuds with active noise cancellation, wireless charging case, and IPX5 sweat resistance. Delivers studio-quality sound on the go.',
    'Leather Wallet': 'Slim RFID-blocking leather wallet with eight card slots and a dedicated cash compartment. Handcrafted from premium full-grain leather.',
    'Sunglasses Classic': 'Classic aviator sunglasses with polarized lenses and UV400 protection. Lightweight alloy frame includes adjustable nose pads for custom fit.',
    'Backpack Travel': 'Travel backpack with padded laptop compartment, anti-theft pockets, and luggage strap. Water-resistant fabric keeps gear protected.',
    'Phone Case Premium': 'Premium TPU and polycarbonate phone case with shock-absorbing corners and raised bezels. Compatible with magnetic wireless chargers.',
    'Power Bank 20000mAh': 'High-capacity 20,000 mAh power bank featuring dual USB-C ports, fast charging, and LED battery indicator. Airline-approved for travel.',
  };

  return descriptions[productName] || 'Experience premium quality with this amazing product. Perfect for your daily needs.';
};

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const API_BASE = import.meta.env.VITE_API_URL || '';
        const res = await fetch(`${API_BASE}/api/products/${id}`);
        if (!res.ok) throw new Error('Product not found');
        const data = await res.json();
        setProduct(data);
      } catch (e) {
        console.error('Failed to fetch product:', e);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>;
  }

  if (!product) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Product not found</h2>
        <button
          onClick={() => navigate('/')}
          style={{
            marginTop: 20,
            padding: '10px 20px',
            background: '#2949b6',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
          }}
        >
          Back to Home
        </button>
      </div>
    );
  }

  const originalName = product.name || '';
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
  if (product.imageUrl) candidates.unshift(product.imageUrl);

  const handleAddToCart = () => {
    addToCart(product);
    alert('Product added to cart!');
  };

  const handleBuyNow = () => {
    addToCart(product);
    navigate('/buy-now');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f7fafd', padding: '40px 20px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', background: '#fff', borderRadius: 16, padding: '40px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        <button
          onClick={() => navigate('/')}
          style={{
            marginBottom: 30,
            padding: '8px 16px',
            background: '#2949b6',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          ← Back to Home
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'start' }}>
          {/* Product Image */}
          <div>
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
                  img.src = 'https://via.placeholder.com/400x400/eeeeee/888888?text=Image';
                }
              }}
              data-candidates={JSON.stringify(candidates)}
              alt={product.name}
              style={{
                width: '100%',
                maxWidth: 500,
                height: 'auto',
                borderRadius: 12,
                border: '1px solid #eee',
              }}
            />
          </div>

          {/* Product Details */}
          <div>
            <h1 style={{ fontSize: 32, fontWeight: 700, color: '#01336b', marginBottom: 20 }}>
              {product.name}
            </h1>

            <div style={{ marginBottom: 30 }}>
              <div style={{ fontSize: 14, color: '#01336b', marginBottom: 8, fontWeight: 600 }}>Price</div>
              <div style={{ fontSize: 36, fontWeight: 700, color: '#1db86e' }}>
                {formatDisplayINR(product.price)}
              </div>
            </div>

            <div style={{ marginBottom: 30 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 15, color: '#01336b' }}>Description</h3>
              <p style={{ fontSize: 16, color: '#333', lineHeight: 1.6 }}>
                {getProductDescription(product.name)}
              </p>
            </div>

            <div style={{ display: 'flex', gap: 15, marginTop: 40 }}>
              <button
                onClick={handleAddToCart}
                style={{
                  flex: 1,
                  padding: '14px 24px',
                  background: '#2949b6',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  fontWeight: 600,
                  fontSize: 16,
                  cursor: 'pointer',
                }}
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                style={{
                  flex: 1,
                  padding: '14px 24px',
                  background: '#ff9100',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  fontWeight: 600,
                  fontSize: 16,
                  cursor: 'pointer',
                }}
              >
                Buy Now
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                style={{
                  width: 52,
                  height: 48, // Match height roughly with other buttons (padding + font size)
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#fff',
                  border: '1px solid #e0e0e0',
                  borderRadius: 8,
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                  e.currentTarget.style.borderColor = '#d0d0d0';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
                  e.currentTarget.style.borderColor = '#e0e0e0';
                }}
                aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill={isInWishlist(product.id) ? "#ff4d4f" : "none"} stroke={isInWishlist(product.id) ? "#ff4d4f" : "#666"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

