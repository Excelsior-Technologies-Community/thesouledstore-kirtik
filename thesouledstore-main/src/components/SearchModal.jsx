import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { products } from '../data/products';

const SearchModal = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const filteredProducts = query
    ? products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.subCategory.toLowerCase().includes(query.toLowerCase()) ||
        p.theme.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
    : [];

  const handleSelect = (id) => {
    navigate(`/product/${id}`);
    onClose();
  };

  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="search-modal" onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Search size={20} color="#737373" />
          <input
            type="text"
            className="search-modal-input"
            placeholder="Search for products, themes, categories..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
          />
          <button onClick={onClose} aria-label="Close" style={{ padding: 4 }}>
            <X size={20} />
          </button>
        </div>

        {filteredProducts.length > 0 && (
          <div className="search-results">
            {filteredProducts.map(p => (
              <div
                key={p.id}
                className="search-result-item"
                onClick={() => handleSelect(p.id)}
              >
                <img src={p.images[0]} alt={p.name} className="search-result-img" />
                <div className="search-result-info">
                  <strong>{p.name}</strong>
                  <small>{p.subCategory}</small>
                  <div style={{ fontWeight: 700, marginTop: 4 }}>₹ {p.price}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {query && filteredProducts.length === 0 && (
          <div style={{ padding: 24, textAlign: 'center', color: '#737373', fontSize: 13 }}>
            No products found for "{query}"
          </div>
        )}

        {!query && (
          <div style={{ padding: 16, color: '#737373', fontSize: 13 }}>
            <strong style={{ fontSize: 12, letterSpacing: 1 }}>POPULAR SEARCHES</strong>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
              {['Oversized', 'Streetwear', 'Sneakers', 'Vintage', 'Hoodies'].map(t => (
                <button
                  key={t}
                  onClick={() => setQuery(t)}
                  style={{
                    border: '1px solid #d4d4d4',
                    padding: '6px 12px',
                    background: '#fff',
                    fontSize: 12,
                    color: '#333',
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
