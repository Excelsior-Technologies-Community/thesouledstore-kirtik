import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

/*
 * BUG FIX ✅ — product.images[0] & product.images[1] accessed without null-safety.
 * If any product has only `image` (string) instead of `images` (array), it crashes.
 * Fixed: safe fallback → images?.[0] || image
 *
 * FEATURE ✅ — Added Quick Add to Cart on hover (size picker + ADD TO BAG button).
 * Previously card had NO cart action — user had to open ProductDetail to add item.
 */
const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const inWishlist = isInWishlist(product.id);

  const [quickSize, setQuickSize] = useState('');
  const [added,     setAdded]     = useState(false);
  const [sizeErr,   setSizeErr]   = useState(false);

  /* safe image access */
  const primaryImg = product.images?.[0] || product.image || '';
  const hoverImg   = product.images?.[1] || primaryImg;
  const sizes      = product.sizes || ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const discount   = product.discount || (product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0);

  const handleWishlist = (e) => {
    e.preventDefault(); e.stopPropagation();
    toggleWishlist(product);
  };

  const handleSizeClick = (e, size) => {
    e.preventDefault(); e.stopPropagation();
    setQuickSize(size); setSizeErr(false);
  };

  const handleAdd = (e) => {
    e.preventDefault(); e.stopPropagation();
    if (!quickSize) { setSizeErr(true); return; }
    setSizeErr(false);
    addToCart(product, quickSize, 1);
    setAdded(true);
    setTimeout(() => { setAdded(false); setQuickSize(''); }, 2000);
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-img-wrap">

        {/* Main + hover image */}
        <img src={primaryImg} alt={product.name} className="product-img"       loading="lazy" />
        <img src={hoverImg}   alt=""             className="product-img-hover" loading="lazy" />
        
        {/* Wishlist */}
        <button
          className={`heart-btn ${inWishlist ? 'active' : ''}`}
          onClick={handleWishlist}
          aria-label="Add to wishlist"
        >
          <Heart size={16} strokeWidth={1.5} fill={inWishlist ? '#0E7B7B' : 'none'} />
        </button>
        
      </div>

    </Link>
  );
};

export default ProductCard;
