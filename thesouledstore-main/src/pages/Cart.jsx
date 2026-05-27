import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Heart, ChevronDown, ChevronUp, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { popularCategories } from '../data/products';

const CheckoutSteps = ({ active }) => (
  <div className="checkout-steps">
    <span className={`step ${active === 'bag' ? 'active' : 'completed'}`}>MY BAG</span>
    <span className="step-divider">- - - - - - - - - -</span>
    <span className={`step ${active === 'address' ? 'active' : active === 'payment' ? 'completed' : ''}`}>ADDRESS</span>
    <span className="step-divider">- - - - - - - - - -</span>
    <span className={`step ${active === 'payment' ? 'active' : ''}`}>PAYMENT</span>
  </div>
);

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, updateSize, moveToWishlist, cartTotal } = useCart();
  const [openCoupon, setOpenCoupon] = useState(true);
  const [openGift, setOpenGift] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponMsg, setCouponMsg] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'WELCOME10') {
      const discount = Math.floor(cartTotal * 0.1);
      setAppliedDiscount(discount);
      setCouponMsg(`✓ Coupon applied! You saved ₹${discount}`);
    } else if (couponCode.trim() === '') {
      setCouponMsg('Please enter a code');
    } else {
      setCouponMsg('Invalid coupon code');
      setAppliedDiscount(0);
    }
  };

  if (cart.length === 0) {
    return (
      <div style={{ background: '#fff', minHeight: '60vh' }}>
        <div className="container">
          <CheckoutSteps active="bag" />
        </div>
        <div style={{ borderTop: '1px solid #e5e5e5' }}>
          <div className="empty-state">
            <div className="empty-icon empty-icon-ghost">
              <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Ghost body */}
                <path d="M 35 28 Q 35 18 50 18 L 70 18 Q 85 18 85 28 L 85 78 L 78 72 L 70 78 L 60 72 L 50 78 L 42 72 L 35 78 Z"
                      stroke="#666" strokeWidth="2" strokeLinejoin="round" fill="#fff"/>
                {/* Ghost eyes */}
                <circle cx="52" cy="40" r="2.5" fill="#666"/>
                <circle cx="68" cy="40" r="2.5" fill="#666"/>
                {/* Small mouth O */}
                <ellipse cx="60" cy="50" rx="2" ry="3" fill="#666"/>
                {/* Shopping cart body */}
                <rect x="42" y="58" width="36" height="22" rx="2" stroke="#666" strokeWidth="2" fill="#fff"/>
                {/* Cart handle */}
                <path d="M 78 58 L 82 50" stroke="#666" strokeWidth="2" strokeLinecap="round"/>
                {/* Wheels */}
                <circle cx="50" cy="86" r="3" fill="#666"/>
                <circle cx="70" cy="86" r="3" fill="#666"/>
                {/* Teal exclamation circle inside cart */}
                <circle cx="60" cy="69" r="7" fill="#0E7B7B"/>
                <text x="60" y="73" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="700" fontFamily="Arial">!</text>
              </svg>
            </div>
            <h2>Your shopping cart is empty.</h2>
            <p>Please add something soon, carts have feelings too.</p>

            <div className="popular-cats">
              <p>Popular Categories</p>
              <div className="popular-cats-list">
                {popularCategories.map(c => (
                  <Link key={c.name} to={c.path}>{c.name}</Link>
                ))}
              </div>
            </div>

            <div className="empty-actions">
              <Link to="/" className="btn btn-outline-teal">CONTINUE SHOPPING</Link>
              <Link to="/login" className="btn btn-teal">LOGIN</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const shippingDiscount = 50;
  const total = cartTotal - appliedDiscount;

  const handleCheckout = () => {
    navigate('/address');
  };

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <div className="container">
        <CheckoutSteps active="bag" />

        <div className="cart-grid">
          {/* Left: Items */}
          <div>
            <div className="cart-items-header">
              <label>
                <input type="checkbox" defaultChecked />
                {cart.length}/{cart.length} ITEM SELECTED <span className="price">(₹ {cartTotal})</span>
              </label>
              <div className="cart-actions-top">
                <button aria-label="Wishlist all"><Heart size={18} /></button>
                <button
                  aria-label="Delete all"
                  onClick={() => {
                    if (window.confirm('Remove all items from cart?')) {
                      cart.forEach(item => removeFromCart(item.id, item.size));
                    }
                  }}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            {cart.map((item, idx) => (
              <div className="cart-item" key={`${item.id}-${item.size}-${idx}`}>
                <div className="cart-item-row">
                  <input type="checkbox" defaultChecked className="cart-item-check" />
                  <Link to={`/product/${item.id}`} className="cart-item-img">
                    <div>
                      <img src={item.images[0]} alt={item.name} />
                    </div>
                  </Link>
                  <div className="cart-item-body">
                    <div className="cart-item-top">
                      <div>
                        <h3 className="cart-item-name">{item.name}</h3>
                        <p className="cart-item-cat">{item.subCategory}</p>
                      </div>
                      <div>
                        <p className="cart-item-price">₹ {item.price * item.quantity}</p>
                        <p className="cart-item-tax">MRP incl. of all taxes</p>
                      </div>
                    </div>

                    <div className="cart-item-selects">
                      <select
                        className="cart-select"
                        value={item.size}
                        onChange={(e) => updateSize(item.id, item.size, e.target.value)}
                      >
                        {item.sizes.map(s => (
                          <option key={s} value={s}>Size: {s}</option>
                        ))}
                      </select>
                      <select
                        className="cart-select"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, item.size, parseInt(e.target.value))}
                      >
                        {[1,2,3,4,5].map(n => (
                          <option key={n} value={n}>Qty: {n}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="cart-item-buttons">
                  <button onClick={() => removeFromCart(item.id, item.size)}>REMOVE</button>
                  <button onClick={() => moveToWishlist(item.id, item.size)}>MOVE TO WISHLIST</button>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Summary */}
          <div className="cart-sidebar">
            <div className="missing-banner">
              <h4>YOU ARE MISSING OUT ON!</h4>
              <div className="missing-banner-row">
                <div>
                  <p>Save an additional <strong>₹{Math.floor(cartTotal * 0.05)}</strong> by adding</p>
                  <p>membership to your cart.</p>
                </div>
                <button>ADD</button>
              </div>
              <div className="missing-banner-divider">
                <p style={{fontSize: 11}}>Free shipping on all orders</p>
                <div className="missing-benefits">
                  View all benefits <ChevronDown size={12} />
                </div>
              </div>
            </div>

            <div className="coupon-section">
              <button className="coupon-head" onClick={() => setOpenCoupon(!openCoupon)}>
                <span className="coupon-head-left">🏷️ Apply Coupon</span>
                {openCoupon ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {openCoupon && (
                <div className="coupon-body" style={{flexDirection: 'column', gap: 8}}>
                  <div style={{display: 'flex', gap: 8, width: '100%'}}>
                    <input
                      type="text"
                      className="coupon-input"
                      placeholder="Enter Code Here (Try: WELCOME10)"
                      value={couponCode}
                      onChange={e => setCouponCode(e.target.value)}
                    />
                    <button className="coupon-apply" onClick={handleApplyCoupon}>APPLY</button>
                  </div>
                  {couponMsg && (
                    <p style={{
                      fontSize: 11,
                      color: couponMsg.startsWith('✓') ? '#0E7B7B' : '#E63946',
                      fontWeight: 600
                    }}>{couponMsg}</p>
                  )}
                </div>
              )}
            </div>

            <div className="coupon-section">
              <button className="coupon-head" onClick={() => setOpenGift(!openGift)}>
                <span className="coupon-head-left">🎁 Gift Voucher</span>
                {openGift ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {openGift && (
                <div className="coupon-body">
                  <input
                    type="text"
                    className="coupon-input"
                    placeholder="Enter Code Here"
                  />
                  <button className="coupon-apply">APPLY</button>
                </div>
              )}
            </div>

            <div className="billing-box">
              <p className="billing-title">BILLING DETAILS</p>
              <div className="billing-row">
                <span>Cart Total <span className="light">(Incl. of all taxes)</span></span>
                <span>₹ {cartTotal}.00</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="billing-row">
                  <span>Coupon Discount</span>
                  <span style={{color: '#0E7B7B', fontWeight: 600}}>- ₹ {appliedDiscount}.00</span>
                </div>
              )}
              <div className="billing-row">
                <span>Shipping Charges</span>
                <span>
                  <span className="free">Free</span>
                  <span className="strike">₹{shippingDiscount}.00</span>
                </span>
              </div>
              <div className="billing-total">
                <span>Total Amount <span className="light">(Incl. of GST)</span></span>
                <span>₹ {total}.00</span>
              </div>
              <button
                className="btn btn-teal btn-block"
                style={{marginTop: 16}}
                onClick={handleCheckout}
              >
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
