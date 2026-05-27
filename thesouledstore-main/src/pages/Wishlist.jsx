import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Wishlist = () => {
  const { wishlist, toggleWishlist, moveToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon empty-icon-ghost">
          <svg viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 30 12 L 30 110 L 110 110 L 110 12" stroke="#999" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
            <line x1="30" y1="22" x2="110" y2="22" stroke="#999" strokeWidth="1.5" />
            <path d="M 65 22 L 65 28 Q 65 32 70 32 L 80 32 Q 85 32 85 28 L 85 22" stroke="#0E7B7B" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
            <path
              d="M 45 55 Q 45 45 60 45 L 78 45 Q 92 45 92 55 L 92 100 L 87 95 L 80 100 L 72 95 L 64 100 L 56 95 L 50 100 L 45 95 Z"
              stroke="#666"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
              fill="#fff"
            />
            <circle cx="60" cy="63" r="2.5" fill="#666" />
            <circle cx="75" cy="68" r="9" stroke="#666" strokeWidth="2" fill="#fff" />
            <circle cx="75" cy="68" r="1.5" fill="#666" />
            <line x1="82" y1="75" x2="90" y2="86" stroke="#666" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>

        <h2 className="empty-title">Your wishlist is lonely and looking for love.</h2>
        <p className="empty-text">
          Add products to your wishlist, review them anytime and easily move to cart.
        </p>

        <div className="empty-actions">
          <Link to="/" className="btn btn-outline-teal">CONTINUE SHOPPING</Link>
          <Link to="/login" className="btn btn-teal">LOGIN</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="container">
        <h2 className="wishlist-head">
          My Wishlist <span>({wishlist.length} {wishlist.length === 1 ? 'item' : 'items'})</span>
        </h2>

        <div className="wishlist-grid">
          {wishlist.map((product) => {
            const productImage = product.images?.[0] || product.image || product.img;

            return (
              <div key={product.id} className="wishlist-card">
                <button
                  type="button"
                  className="wishlist-remove"
                  onClick={() => toggleWishlist(product)}
                  aria-label="Remove from wishlist"
                >
                  <X size={14} />
                </button>

                <Link to={`/product/${product.id}`} className="wishlist-card-img">
                  <img src={productImage} alt={product.name} />
                </Link>

                <div className="wishlist-card-body">
                  <Link to={`/product/${product.id}`} className="wishlist-card-link">
                    <h3>{product.name}</h3>
                    <p className="wishlist-card-cat">{product.category}</p>
                    <p className="wishlist-card-price">₹ {product.price}</p>
                  </Link>

                  <button
                    type="button"
                    className="move-to-cart-btn"
                    onClick={() => moveToCart(product)}
                  >
                    MOVE TO BAG
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;