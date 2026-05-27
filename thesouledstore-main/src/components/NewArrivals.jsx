import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { products } from '../data/products';

const NewArrivals = () => {
  const trackRef = useRef(null);
  const items = products.slice(0, 8);

  const scroll = (dir) => {
    if (!trackRef.current) return;
    const width = trackRef.current.clientWidth;
    trackRef.current.scrollBy({
      left: dir === 'next' ? width : -width,
      behavior: 'smooth',
    });
  };

  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">NEW ARRIVALS</h2>

        <div className="slider-wrap">
          <button className="slider-arrow prev" onClick={() => scroll('prev')} aria-label="Previous">
            <ChevronLeft size={18} />
          </button>

          <div className="slider-track no-scrollbar" ref={trackRef}>
            {items.map(product => (
              <div className="slider-item" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <button className="slider-arrow next" onClick={() => scroll('next')} aria-label="Next">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
