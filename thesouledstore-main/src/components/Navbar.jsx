import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingCart, User, Menu, X, Mic } from 'lucide-react';
import { useCart } from '../context/CartContext';
import SearchModal from './SearchModal';
import logo from "../assets/logo.png";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [showPromo, setShowPromo] = useState(true);
  const { cartCount, wishlist } = useCart();
  const location = useLocation();

  const navLinks = [
    { name: 'MEN', path: '/products/men' },
    { name: 'WOMEN', path: '/products/women' },
    { name: 'SNEAKERS', path: '/products/sneakers' },
  ];

  const isActive = (path) => {
    if (location.pathname === path) return true;
    // Match category prefix (e.g. /products/men-tshirts)
    const slug = path.split('/').pop();
    return location.pathname.startsWith(`/products/${slug}-`);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-inner">
          <div className="navbar-left">
            <button
              className="menu-btn"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>

            <ul className="nav-links">
              {navLinks.map(link => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="header__center">
            <img
              src={logo}
              alt="The Souled Store"
              className="header__logo"
            />
          </div>

          <div className="navbar-right">
            <div className="search-box" onClick={() => setSearchOpen(true)}>
              <input
                type="text"
                placeholder="What are you looking for?"
                readOnly
              />
              <Mic size={15} color="#737373" className="search-mic" />
              <Search size={15} color="#737373" />
            </div>

            <button className="search-mobile-btn nav-icon" onClick={() => setSearchOpen(true)} aria-label="Search">
              <Search size={20} strokeWidth={1.5} />
            </button>

            <Link to="/login" className="nav-icon" aria-label="Account">
              <User size={22} strokeWidth={1.5} />
            </Link>

            <Link to="/wishlist" className="nav-icon" aria-label="Wishlist">
              <Heart size={22} strokeWidth={1.5} />
              <span className="nav-badge">{wishlist.length}</span>
            </Link>

            <Link to="/cart" className="nav-icon" aria-label="Cart">
              <ShoppingCart size={22} strokeWidth={1.5} />
              <span className="nav-badge">{cartCount}</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <>
          <div className="drawer-overlay" onClick={() => setMobileMenuOpen(false)} />
          <div className="drawer">
            {/* Top: Login button */}
            <div className="drawer-top">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="drawer-login-btn">
                <User size={16} strokeWidth={2} />
                <span>Log In/Register</span>
              </Link>
              <button className="drawer-close" onClick={() => setMobileMenuOpen(false)} aria-label="Close">
                <X size={20} />
              </button>
            </div>

            {/* Promo banner */}
            {showPromo && (
              <div className="drawer-promo">
                <span>Earn 10% Cashback on Every App Order</span>
                <button onClick={() => setShowPromo(false)} aria-label="dismiss"><X size={12} /></button>
              </div>
            )}

            {/* Three tabs */}
            <div className="drawer-tabs">
              {navLinks.map(link => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`drawer-tab ${isActive(link.path) ? 'active' : ''}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="drawer-content">
              <div className="drawer-section">
                <Link to="/products/brands" onClick={() => setMobileMenuOpen(false)} className="drawer-item">Brands</Link>
                <Link to="/products/crocs" onClick={() => setMobileMenuOpen(false)} className="drawer-item">Crocs</Link>
                <Link to="/products/birkenstock" onClick={() => setMobileMenuOpen(false)} className="drawer-item">Birkenstock <sup className="new-tag">NEW</sup></Link>
                <Link to="/products/skechers" onClick={() => setMobileMenuOpen(false)} className="drawer-item">Skechers</Link>
                <Link to="/products/rocia" onClick={() => setMobileMenuOpen(false)} className="drawer-item">Rocia</Link>
              </div>

              <div className="drawer-section">
                <div className="drawer-section-title">Footwear</div>
                <Link to="/products/sneakers" onClick={() => setMobileMenuOpen(false)} className="drawer-item drawer-item-sm">Shop By Style</Link>
                <Link to="/products/premium-adidas" onClick={() => setMobileMenuOpen(false)} className="drawer-item drawer-item-sm">Premium Adidas</Link>
                <Link to="/products/asics" onClick={() => setMobileMenuOpen(false)} className="drawer-item drawer-item-sm">ASICS</Link>
                <Link to="/products/kenneth-cole" onClick={() => setMobileMenuOpen(false)} className="drawer-item drawer-item-sm">Kenneth Cole</Link>
                <Link to="/products/nuvuo" onClick={() => setMobileMenuOpen(false)} className="drawer-item drawer-item-sm">Nuvuo</Link>
                <Link to="/products/tony-crane" onClick={() => setMobileMenuOpen(false)} className="drawer-item drawer-item-sm">Tony Crane</Link>
                <Link to="/products/vans" onClick={() => setMobileMenuOpen(false)} className="drawer-item drawer-item-sm">Vans</Link>
                <Link to="/products/sneakers" onClick={() => setMobileMenuOpen(false)} className="drawer-item drawer-item-sm drawer-view-all">View All</Link>
              </div>

              <div className="drawer-section">
                <Link to="/gift-vouchers" onClick={() => setMobileMenuOpen(false)} className="drawer-item">GIFT VOUCHERS</Link>
                <Link to="/stores" onClick={() => setMobileMenuOpen(false)} className="drawer-item">Stores Near Me</Link>
                <Link to="/track-order" onClick={() => setMobileMenuOpen(false)} className="drawer-item">Track My Order?</Link>
              </div>

              <div className="drawer-section drawer-bottom">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="drawer-item drawer-item-sm">My Account</Link>
                <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="drawer-item drawer-item-sm">Contact Us</Link>
                <Link to="/careers" onClick={() => setMobileMenuOpen(false)} className="drawer-item drawer-item-sm">Careers</Link>
                <Link to="/community" onClick={() => setMobileMenuOpen(false)} className="drawer-item drawer-item-sm">Community Initiatives</Link>
                <Link to="/awards" onClick={() => setMobileMenuOpen(false)} className="drawer-item drawer-item-sm">Awards</Link>
                <Link to="/privacy" onClick={() => setMobileMenuOpen(false)} className="drawer-item drawer-item-sm">Privacy Policy</Link>
                <Link to="/faqs" onClick={() => setMobileMenuOpen(false)} className="drawer-item drawer-item-sm">FAQs</Link>
              </div>
            </div>
          </div>
        </>
      )}

      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </>
  );
};

export default Navbar;
