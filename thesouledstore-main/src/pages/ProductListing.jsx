import { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SlidersHorizontal, X, ChevronDown, ChevronUp } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, filterOptions, getCategoryFilter } from '../data/products';
import HeroCarousel from '../components/HeroCarousel';
import FeaturesBar from '../components/FeaturesBar';
import Categories from '../components/Categories';

const ProductListing = () => {
  const { category: urlCategory } = useParams();
  const category = urlCategory || 'men';
  console.log('ProductListing render category:', category);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [activeSubCategoryTab, setActiveSubCategoryTab] = useState('Trending');
  
  // Filter state
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [categorySearch, setCategorySearch] = useState('');
  const [themeSearch, setThemeSearch] = useState('');
  
  // Sections expanded
  const [expanded, setExpanded] = useState({
    categories: true, themes: true, size: true, prices: true
  });

  // Reset filters on category change
  useEffect(() => {
    setSelectedSubCategories([]);
    setSelectedThemes([]);
    setSelectedSizes([]);
    setSelectedPriceRange(null);
    setActiveSubCategoryTab('Trending');
  }, [category]);

  const toggleSection = (key) => {
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  };
  const toggleArrayFilter = (arr, value, setter) => {
    if (arr.includes(value)) {
      setter(arr.filter(v => v !== value));
    } else {
      setter([...arr, value]);
    }
  };

  // Apply URL category + manual filters
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Apply URL category filter
    const urlFilter = getCategoryFilter(category);
    if (urlFilter.gender) {
      result = result.filter(p => p.gender === urlFilter.gender || p.gender === 'unisex');
    }
    if (urlFilter.category) {
      result = result.filter(p => p.category === urlFilter.category);
    }
    if (urlFilter.isNew) {
      result = result.filter(p => p.isNew);
    }

    // Chip filter for Men category
    if (category === 'men' && activeSubCategoryTab !== 'Trending') {
      const mapTabsToSubCat = {
        'Oversized T-Shirts': 'Men Oversized T-Shirts',
        'Shirts': 'Men Shirts',
        'Polos': 'Men Polo T-Shirts',
        'Men Pants': 'Men Pants',
        'Men Jeans': 'Men Jeans',
        'Men Joggers': 'Men Joggers',
        'Collectibles': 'Collectibles'
      };
      const targetSubCat = mapTabsToSubCat[activeSubCategoryTab];
      if (targetSubCat) {
        result = result.filter(p => p.subCategory === targetSubCat);
      }
    }

    // Sub-category filter
    if (selectedSubCategories.length > 0) {
      result = result.filter(p => selectedSubCategories.includes(p.subCategory));
    }

    // Theme filter
    if (selectedThemes.length > 0) {
      result = result.filter(p => selectedThemes.includes(p.theme));
    }

    // Size filter (all products have all sizes, so this is illustrative)
    if (selectedSizes.length > 0) {
      result = result.filter(p => p.sizes.some(s => selectedSizes.includes(s)));
    }

    // Price filter
    if (selectedPriceRange) {
      result = result.filter(p => p.price >= selectedPriceRange.min && p.price <= selectedPriceRange.max);
    }

    // Sort
    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    else if (sortBy === 'newest') result.sort((a, b) => b.id - a.id);
    else if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [category, selectedSubCategories, selectedThemes, selectedSizes, selectedPriceRange, sortBy, activeSubCategoryTab]);
  // Counts per sub-category (based on URL filter)
  const subCatCounts = useMemo(() => {
    const baseProducts = (() => {
      const urlFilter = getCategoryFilter(category);
      let r = [...products];
      if (urlFilter.gender) r = r.filter(p => p.gender === urlFilter.gender || p.gender === 'unisex');
      if (urlFilter.category) r = r.filter(p => p.category === urlFilter.category);
      if (urlFilter.isNew) r = r.filter(p => p.isNew);
      return r;
    })();
    const counts = {};
    baseProducts.forEach(p => {
      counts[p.subCategory] = (counts[p.subCategory] || 0) + 1;
    });
    return counts;
  }, [category]);

  const themeCounts = useMemo(() => {
    const counts = {};
    products.forEach(p => {
      counts[p.theme] = (counts[p.theme] || 0) + 1;
    });
    return counts;
  }, []);

  const filteredSubCats = filterOptions.categories.filter(c =>
    c.name.toLowerCase().includes(categorySearch.toLowerCase())
  );

  const filteredThemes = filterOptions.themes.filter(t =>
    t.toLowerCase().includes(themeSearch.toLowerCase())
  );

  const clearAllFilters = () => {
    setSelectedSubCategories([]);
    setSelectedThemes([]);
    setSelectedSizes([]);
    setSelectedPriceRange(null);
  };

  const hasActiveFilters = selectedSubCategories.length > 0 || selectedThemes.length > 0 ||
                           selectedSizes.length > 0 || selectedPriceRange;

  const pageTitle = category
    ? category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ')
    : 'All Products';

  // Filters JSX (reusable for mobile & desktop)
  const FiltersContent = () => (
    <>
      {/* Categories */}
      <div className="filter-section">
        <button className="filter-head" onClick={() => toggleSection('categories')}>
          <h3>CATEGORIES</h3>
          {expanded.categories ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {expanded.categories && (
          <>
            <input
              type="text"
              className="filter-search"
              placeholder="Search for Categories"
              value={categorySearch}
              onChange={e => setCategorySearch(e.target.value)}
            />
            <div className="filter-list no-scrollbar">
              {filteredSubCats.map(cat => (
                <label className="filter-item" key={cat.value}>
                  <input
                    type="checkbox"
                    checked={selectedSubCategories.includes(cat.name)}
                    onChange={() => toggleArrayFilter(selectedSubCategories, cat.name, setSelectedSubCategories)}
                  />
                  <span className="filter-label">{cat.name}</span>
                  <span className="filter-count">{subCatCounts[cat.name] || 0}</span>
                </label>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Themes */}
      <div className="filter-section">
        <button className="filter-head" onClick={() => toggleSection('themes')}>
          <h3>THEMES</h3>
          {expanded.themes ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {expanded.themes && (
          <>
            <input
              type="text"
              className="filter-search"
              placeholder="Search for Themes"
              value={themeSearch}
              onChange={e => setThemeSearch(e.target.value)}
            />
            <div className="filter-list no-scrollbar">
              {filteredThemes.map(theme => (
                <label className="filter-item" key={theme}>
                  <input
                    type="checkbox"
                    checked={selectedThemes.includes(theme)}
                    onChange={() => toggleArrayFilter(selectedThemes, theme, setSelectedThemes)}
                  />
                  <span className="filter-label">{theme}</span>
                  <span className="filter-count">{themeCounts[theme] || 0}</span>
                </label>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Size */}
      <div className="filter-section">
        <button className="filter-head" onClick={() => toggleSection('size')}>
          <h3>SIZE</h3>
          {expanded.size ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {expanded.size && (
          <div className="size-grid">
            {filterOptions.sizes.map(size => (
              <button
                key={size}
                className={`size-chip ${selectedSizes.includes(size) ? 'active' : ''}`}
                onClick={() => toggleArrayFilter(selectedSizes, size, setSelectedSizes)}
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Prices */}
      <div className="filter-section">
        <button className="filter-head" onClick={() => toggleSection('prices')}>
          <h3>PRICES</h3>
          {expanded.prices ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {expanded.prices && (
          <div>
            {filterOptions.prices.map(range => (
              <label className="filter-item" key={range.label}>
                <input
                  type="radio"
                  name="price"
                  checked={selectedPriceRange?.label === range.label}
                  onChange={() => setSelectedPriceRange(range)}
                />
                <span className="filter-label">{range.label}</span>
              </label>
            ))}
            {selectedPriceRange && (
              <button
                onClick={() => setSelectedPriceRange(null)}
                style={{ fontSize: 11, color: '#E63946', marginTop: 8, fontWeight: 600 }}
              >
                Clear
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      {category === 'men' ? (
        <>
          <HeroCarousel />
          <FeaturesBar />
          <Categories />
          <div className="container" style={{ paddingBottom: '60px', marginTop: '40px' }}>
            <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '24px', fontWeight: 800 }}>TRENDING</h2>
            <div className="subcategory-bar">
              {['Trending', 'Oversized T-Shirts', 'Shirts', 'Polos', 'Men Pants', 'Men Jeans', 'Men Joggers', 'Collectibles'].map(tab => (
                <button
                  key={tab}
                  className={`subcategory-chip ${activeSubCategoryTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveSubCategoryTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            {filteredProducts.length === 0 ? (
              <div className="no-products">
                <p style={{ fontSize: 16, marginBottom: 8 }}>No products match your filters</p>
                <button
                  onClick={clearAllFilters}
                  className="btn btn-outline-teal"
                  style={{ marginTop: 16 }}
                >
                  CLEAR FILTERS
                </button>
              </div>
            ) : (
              <div className="product-grid">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="listing-header">
            <div className="container">
              <div className="listing-header-inner">
                <div>
                  <p className="breadcrumb">
                    <Link to="/">Home</Link> / {pageTitle}
                  </p>
                  <h1 className="listing-title">
                    {pageTitle}
                    <span>- {filteredProducts.length} items</span>
                  </h1>
                </div>
                <div className="listing-controls">
                  <button
                    className="filter-mobile-btn"
                    onClick={() => setShowMobileFilters(true)}
                  >
                    <SlidersHorizontal size={14} />
                    FILTERS{hasActiveFilters && ` (${selectedSubCategories.length + selectedThemes.length + selectedSizes.length + (selectedPriceRange ? 1 : 0)})`}
                  </button>
                  <select
                    className="sort-select"
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                  >
                    <option value="popular">Select Sorting Options</option>
                    <option value="newest">Newest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="listing-body">
              {/* Desktop Sidebar */}
              <aside className="sidebar">
                {hasActiveFilters && (
                  <div style={{ padding: '12px 0', borderBottom: '1px solid #e5e5e5' }}>
                    <button
                      onClick={clearAllFilters}
                      style={{ fontSize: 12, color: '#E63946', fontWeight: 700, letterSpacing: 1 }}
                    >
                      CLEAR ALL FILTERS
                    </button>
                  </div>
                )}
                <FiltersContent />
              </aside>

              {/* Products */}
              <div style={{ flex: 1 }}>
                {filteredProducts.length === 0 ? (
                  <div className="no-products">
                    <p style={{ fontSize: 16, marginBottom: 8 }}>No products match your filters</p>
                    <button
                      onClick={clearAllFilters}
                      className="btn btn-outline-teal"
                      style={{ marginTop: 16 }}
                    >
                      CLEAR FILTERS
                    </button>
                  </div>
                ) : (
                  <div className="product-grid">
                    {filteredProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Filter Drawer */}
          {showMobileFilters && (
            <div className="filter-drawer">
              <div className="filter-drawer-overlay" onClick={() => setShowMobileFilters(false)} />
              <div className="filter-drawer-panel">
                <div className="filter-drawer-header">
                  <h2 style={{ fontSize: 15, fontWeight: 700 }}>FILTERS</h2>
                  <button onClick={() => setShowMobileFilters(false)}>
                    <X size={22} />
                  </button>
                </div>
                <div className="filter-drawer-body">
                  <FiltersContent />
                </div>
                <div className="filter-drawer-footer">
                  <button className="btn btn-outline" onClick={clearAllFilters}>CLEAR</button>
                  <button className="btn btn-teal" onClick={() => setShowMobileFilters(false)}>
                    APPLY ({filteredProducts.length})
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default ProductListing;
