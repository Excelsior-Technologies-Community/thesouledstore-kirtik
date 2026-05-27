import { Link } from 'react-router-dom';
import { homeCategories } from '../data/products';

const Categories = () => {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">CATEGORIES</h2>
        <div className="cat-grid">
          {homeCategories.map(cat => (
            <Link to={cat.path} className="cat-item" key={cat.name}>
              <div className="cat-img-wrap">
                <img src={cat.image} alt={cat.name} className="cat-img" loading="lazy" />
              </div>
              <p className="cat-name">{cat.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
