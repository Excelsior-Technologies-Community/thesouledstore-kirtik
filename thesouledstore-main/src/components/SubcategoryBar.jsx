import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { products } from '../data/products';

/* ── Tab → subCategory mapping ── */
const TABS = [
  { label: 'Trending',           subCat: null },                    // show all men
  { label: 'Oversized T-Shirts', subCat: 'Men Oversized T-Shirts' },
  { label: 'Shirts',             subCat: 'Men Shirts' },
  { label: 'Polos',              subCat: 'Men Polo T-Shirts' },
  { label: 'Men Pants',          subCat: 'Men Pants' },
  { label: 'Men Jeans',          subCat: 'Men Jeans' },
  { label: 'Men Joggers',        subCat: 'Men Joggers' },
  { label: 'Collectibles',       subCat: 'Collectibles' },
];

/* Base men products (all genders = men) */
const menProducts = products.filter(p => p.gender === 'men' || p.gender === 'unisex');

const SubcategoryBar = () => {
  const [activeTab, setActiveTab] = useState('Trending');

  const displayed = useMemo(() => {
    const tab = TABS.find(t => t.label === activeTab);
    if (!tab || !tab.subCat) return menProducts;
    return menProducts.filter(p => p.subCategory === tab.subCat);
  }, [activeTab]);

  /* count per tab */
  const countOf = (tab) => {
    if (!tab.subCat) return menProducts.length;
    return menProducts.filter(p => p.subCategory === tab.subCat).length;
  };

  return (
    <section className="scb-section">
      <div className="container">

        {/* Section heading */}
        <div className="scb-heading">
          <h2 className="scb-title">TRENDING</h2>
        </div>

        {/* ── Subcategory chips bar ── */}
        <div className="subcategory-bar">
          {TABS.map(tab => (
            <button
              key={tab.label}
              className={`subcategory-chip ${activeTab === tab.label ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.label)}
            >
              {tab.label}
              {countOf(tab) > 0 && (
                <span className="scb-chip-count">{countOf(tab)}</span>
              )}
            </button>
          ))}
        </div>

        {/* ── Filtered product grid ── */}
        {displayed.length === 0 ? (
          <div className="scb-empty">
            <p>No products in this category yet.</p>
            <Link to="/products/men" className="btn btn-teal">BROWSE ALL</Link>
          </div>
        ) : (
          <>
            <div className="product-grid scb-grid">
              {displayed.slice(0, 8).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Show more */}
            {displayed.length > 8 && (
              <div className="scb-show-more">
  
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default SubcategoryBar;
