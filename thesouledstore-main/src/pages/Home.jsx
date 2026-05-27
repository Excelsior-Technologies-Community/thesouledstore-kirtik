import HeroCarousel   from '../components/HeroCarousel';
import FeaturesBar    from '../components/FeaturesBar';
import LatestDrops    from '../components/LatestDrops';
import TrendingPants  from '../components/TrendingPants';
import SubcategoryBar from '../components/SubcategoryBar';
import NewArrivals    from '../components/NewArrivals';
import Categories     from '../components/Categories';
import BrandStripe    from '../components/BrandStripe';
import HappyCustomers from '../components/HappyCustomers';
import ProductCard    from '../components/ProductCard';
import { products }   from '../data/products';

const Home = () => {
  const curated = products.slice(8, 12);

  return (
    <div>
      {/* 1 ─ Hero banner slider */}
      <HeroCarousel />

      {/* 2 ─ Trust bar (free shipping / returns / secure pay) */}
      <FeaturesBar />

      {/* 3 ─ Latest Drops full-width banner carousel */}
      <LatestDrops />

      {/* 4 ─ Trending Pants swiper with Quick-Add */}
      <TrendingPants />

      {/* 5 ─ Subcategory chips + filtered product grid ✅ ADDED */}
      <SubcategoryBar />

      {/* 6 ─ New Arrivals */}
      <NewArrivals />

      {/* 7 ─ Category tiles */}
      <Categories />

      {/* 8 ─ Curated For You */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">CURATED FOR YOU</h2>
          <div className="product-grid">
            {curated.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* 9 ─ Brand stripe + Happy Customers */}
      <BrandStripe />
      <HappyCustomers />
    </div>
  );
};

export default Home;
