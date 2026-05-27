import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight, Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

import 'swiper/css';

// ── Data ──────────────────────────────────────────────────────────────────
// BUG FIX: Previously imported from products.js where data had
// `title` (not `name`), single `image` (not `images[]`), no `subCategory`,
// no `sizes` — causing ProductCard to crash (product.images[0] = undefined).
// FIXED: self-contained data with all required fields + ID range 1001+ to
// avoid collision with main products[] (IDs 1–N).
const pantsData = [
  {
    id: 1001,
    name: 'Easy Pants: Kohl Black',
    subCategory: 'Men Pants',
    price: 1899,
    originalPrice: 2499,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    fit: 'Baggy',
    label: 'BAGGY FIT',
    image: 'https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/Pants-Tiles5_PjRgyw1.jpg?w=360&dpr=2',
   
  },
  {
    id: 1002,
    name: 'Super Pants: Grey Stripes',
    subCategory: 'Men Pants',
    price: 1799,
    originalPrice: 2299,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    fit: 'Regular',
    label: 'REGULAR FIT',
    image: 'https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/Pants-Tiles7.jpg?w=360&dpr=2',
  },
  {
    id: 1003,
    name: 'Super Pants: Fawn',
    subCategory: 'Men Pants',
    price: 2499,
    originalPrice: 2999,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    fit: 'Korean',
    label: 'KOREAN FIT',
    image: 'https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/Pants-Tiles3.jpg?w=360&dpr=2',
  
  },
  {
    id: 1004,
    name: 'Super Pants: Mocha',
    subCategory: 'Men Pants',
    price: 2199,
    originalPrice: 2699,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    fit: 'Baggy',
    label: 'BAGGY FIT',
    image: 'https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/Pants-Tiles4.jpg?w=360&dpr=2',
  
  },
  {
    id: 1005,
    name: 'Korean Joggers: Tan Brown',
    subCategory: 'Men Joggers',
    price: 1599,
    originalPrice: 1999,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    fit: 'Korean',
    label: 'KOREAN FIT',
    image: 'https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/Pants-Tiles5_PjRgyw1.jpg?w=360&dpr=2',
  
    subCategory: 'Men Pants',
    price: 2199,
    originalPrice: 2699,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    fit: 'Baggy',
    label: 'BAGGY FIT',
    image: 'https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/Pants-Tiles3.jpg?w=360&dpr=2',
  
  },
];

// ── Single Pants Card ─────────────────────────────────────────────────────
const PantsCard = ({ item }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const inWl = isInWishlist(item.id);

  const [selSize,  setSelSize]  = useState('');
  const [added,    setAdded]    = useState(false);
  const [sizeErr,  setSizeErr]  = useState(false);
  const [hovered,  setHovered]  = useState(false);

  const discount = item.originalPrice
    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
    : 0;

  const handleWishlist = (e) => {
    e.preventDefault(); e.stopPropagation();
    toggleWishlist({ ...item, images: [item.image, item.hoverImage] });
  };

  const handleSizeClick = (e, s) => {
    e.preventDefault(); e.stopPropagation();
    setSelSize(s); setSizeErr(false);
  };

  const handleAdd = (e) => {
    e.preventDefault(); e.stopPropagation();
    if (!selSize) { setSizeErr(true); return; }
    addToCart({ ...item, images: [item.image, item.hoverImage] }, selSize, 1);
    setAdded(true);
    setTimeout(() => { setAdded(false); setSelSize(''); }, 2000);
  };

  return (
    <Link
      to={`/product/${item.id}`}
      className="tp-card"
      onMouseEnter={() => setHovered(false)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image area */}
      <div className="tp-img-wrap">
        <img
          src={item.image}
          alt={item.name}
          className={`tp-img-main${hovered ? ' hidden' : ''}`}
          loading="lazy"
        />
        <img
          src={item.hoverImage}
          alt=""
          className={`tp-img-hover${hovered ? ' visible' : ''}`}
          loading="lazy"
        />

        {/* Wishlist */}
        <button
          className={`tp-heart${inWl ? ' active' : ''}`}
          onClick={handleWishlist}
          aria-label="Wishlist"
        >
          <Heart size={15} strokeWidth={1.8} fill={inWl ? '#0E7B7B' : 'none'} />
        </button>

      </div>

      {/* Product info */}
      <div className="tp-info">
        <h3 className="tp-name">{item.name}</h3>
        <p className="tp-cat">{item.subCategory}</p>
        <div className="tp-price-row">
          <span className="tp-price">₹ {item.price}</span>
          {item.originalPrice && (
            <span className="tp-orig">₹ {item.originalPrice}</span>
          )}
          {discount > 0 && (
            <span className="tp-save">({discount}% off)</span>
          )}
        </div>
      </div>
    </Link>
  );
};

// ── Main Section ──────────────────────────────────────────────────────────
const TrendingPants = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="tp-section">
      <div className="tp-container">

        {/* Header */}
        <div className="tp-header">
          <div>
            <h2 className="tp-title">TRENDING IN PANTS</h2>
          </div>
        </div>

        {/* Swiper with custom nav arrows */}
        <div className="tp-slider-wrap">
          <button ref={prevRef} className="tp-arrow tp-arrow-prev" aria-label="Previous">
            <ChevronLeft size={22} strokeWidth={2.5}/>
          </button>

          <Swiper
            modules={[Navigation, Autoplay]}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop
            speed={600}
            spaceBetween={16}
            breakpoints={{
              0:    { slidesPerView: 1.2 },
              480:  { slidesPerView: 2 },
              768:  { slidesPerView: 3 },
              1200: { slidesPerView: 4 },
            }}
            className="tp-swiper"
          >
            {pantsData.map(item => (
              <SwiperSlide key={item.id}>
                <PantsCard item={item}/>
              </SwiperSlide>
            ))}
          </Swiper>

          <button ref={nextRef} className="tp-arrow tp-arrow-next" aria-label="Next">
            <ChevronRight size={22} strokeWidth={2.5}/>
          </button>
        </div>

      </div>
    </section>
  );
};

export default TrendingPants;
