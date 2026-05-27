import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, ChevronDown, ChevronUp, Facebook, Twitter, Instagram } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductGallery from '../components/ProductGallery';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === parseInt(id)) || products[0];

  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [expandedDetails, setExpandedDetails] = useState(true);
  const [expandedDesc, setExpandedDesc] = useState(false);
  const [expandedArtist, setExpandedArtist] = useState(false);
  const [pincode, setPincode] = useState('');
  const [pincodeMsg, setPincodeMsg] = useState('');
  const [addedMsg, setAddedMsg] = useState('');

  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }

    setSizeError(false);
    addToCart(product, selectedSize, quantity);
    setAddedMsg('Added to bag! Redirecting...');
    setTimeout(() => navigate('/cart'), 1000);
  };

  const handleCheckPincode = () => {
    if (pincode.length !== 6) {
      setPincodeMsg('Please enter a valid 6-digit pincode');
      return;
    }

    setPincodeMsg('✓ Delivery available in 3-5 business days');
  };

  const otherProducts = products.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <div className="container" style={{ paddingTop: 16 }}>
        <p className="breadcrumb">
          <Link to="/">Home</Link> / <Link to="/products">{product.subCategory}</Link> /{' '}
          <span>{product.name}</span>
        </p>
      </div>

      <div className="container">
        <div className="pd-wrap">
          <div className="pd-grid">
            <div className="pd-images">
              <ProductGallery product={product} />

              <div className="fit-badge">
                <span className="label">{product.fit}</span>
                FIT
              </div>

              {product.isPremium && (
                <div className="premium-badge">
                  Premium Heavy
                  <br />
                  Gauge Fabric
                </div>
              )}
            </div>

            <div className="pd-info">
              <h1 className="pd-name">{product.name}</h1>
              <p className="pd-cat">{product.subCategory}</p>

              <div className="pd-price-wrap">
                <p className="pd-price">₹ {product.price}</p>
                <p className="pd-tax">Price incl. of all taxes</p>
              </div>

              <div className="size-section">
                <div className="size-header">
                  <p className="size-label">Please select a size.</p>
                  <button className="size-chart">SIZE CHART</button>
                </div>

                <div className="size-row">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedSize(size);
                        setSizeError(false);
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                <p className={`size-error ${sizeError ? 'show' : ''}`}>
                  Please select a size to continue
                </p>
              </div>

              <div className="qty-section">
                <p className="size-label" style={{ marginBottom: 8 }}>
                  Quantity
                </p>

                <select
                  className="qty-select"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {String(n).padStart(2, '0')}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pd-actions">
                <button
                  onClick={handleAddToCart}
                  className="btn btn-red btn-lg"
                  disabled={!!addedMsg}
                >
                  {addedMsg || 'ADD TO CART'}
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className="btn btn-outline-teal btn-lg"
                  style={{ display: 'flex', gap: 6 }}
                >
                  <Heart size={16} fill={inWishlist ? '#0E7B7B' : 'none'} />
                  {inWishlist ? 'WISHLISTED' : 'WISHLIST'}
                </button>
              </div>

              <div className="share-row">
                <span style={{ fontWeight: 600 }}>Share</span>
                <a href="#" aria-label="WhatsApp">
                  <span style={{ fontSize: 18 }}>📱</span>
                </a>
                <a href="#" aria-label="Facebook">
                  <Facebook size={18} />
                </a>
                <a href="#" aria-label="Twitter">
                  <Twitter size={18} />
                </a>
                <a href="#" aria-label="Instagram">
                  <Instagram size={18} />
                </a>
              </div>

              <div className="delivery-section">
                <p>Delivery Details</p>

                <div className="delivery-input-wrap">
                  <input
                    type="text"
                    placeholder="Enter Pincode"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  />
                  <button onClick={handleCheckPincode}>CHECK</button>
                </div>

                {pincodeMsg && (
                  <p
                    style={{
                      fontSize: 12,
                      marginTop: 8,
                      color: pincodeMsg.startsWith('✓') ? '#0E7B7B' : '#E63946',
                      fontWeight: 600,
                    }}
                  >
                    {pincodeMsg}
                  </p>
                )}

                <div className="return-info">
                  <span style={{ fontSize: 14 }}>🛡️</span>
                  <span>
                    This product is eligible for return or exchange under our 30-day return
                    policy. No questions asked.
                  </span>
                </div>
              </div>

              <div className="accordion">
                <div className="accordion-item">
                  <button
                    className="accordion-head"
                    onClick={() => setExpandedDetails(!expandedDetails)}
                  >
                    <span>Product Details</span>
                    {expandedDetails ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>

                  {expandedDetails && (
                    <div className="accordion-body">
                      <p>
                        <strong>Material & Care:</strong>
                      </p>
                      <p>{product.material}</p>
                      <p>Machine Wash</p>
                      <p style={{ marginTop: 12 }}>
                        <strong>Country of Origin:</strong> India (and proud)
                      </p>
                      <p style={{ marginTop: 12 }}>
                        <strong>Manufactured & Sold By:</strong>
                      </p>
                      <p>TrendStore Pvt. Ltd.</p>
                      <p>Mumbai - 400 011</p>
                    </div>
                  )}
                </div>

                <div className="accordion-item">
                  <button
                    className="accordion-head"
                    onClick={() => setExpandedDesc(!expandedDesc)}
                  >
                    <span>Product Description</span>
                    {expandedDesc ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>

                  {expandedDesc && (
                    <div className="accordion-body">
                      <p>{product.description}</p>
                    </div>
                  )}
                </div>

                <div className="accordion-item">
                  <button
                    className="accordion-head"
                    onClick={() => setExpandedArtist(!expandedArtist)}
                  >
                    <span>Artist&apos;s Details</span>
                    {expandedArtist ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>

                  {expandedArtist && (
                    <div className="accordion-body">
                      <p>
                        Designed in-house by the TrendStore creative team. Each piece reflects
                        our commitment to quality, comfort, and unique design.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="also-bought">
            <h2>Others Also Bought</h2>

            <div className="product-grid">
              {otherProducts.map((item) => (
                <Link key={item.id} to={`/product/${item.id}`} className="product-card">
                  <div className="product-img-wrap">
                    <img
                      src={item.image || item.images?.[0]}
                      alt={item.name}
                      className="product-img"
                    />

                    <div className="fit-badge">
                      <span className="label">{item.fit}</span>
                      FIT
                    </div>
                  </div>

             
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;