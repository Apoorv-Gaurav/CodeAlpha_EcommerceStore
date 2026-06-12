import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const [isTearing, setIsTearing] = useState(false);
  const [activeSubCategory, setActiveSubCategory] = useState('All');

  const handleTear = () => {
    if (isTearing) return;
    setIsTearing(true);
    const banner = document.querySelector('.hero-banner');
    banner.classList.add('torn');

    setTimeout(() => {
      banner.classList.remove('torn');
    }, 3000);

    setTimeout(() => {
      setIsTearing(false);
    }, 4200);
  };

  if (loading) return <div className="loader"></div>;
  if (error) return <div>Error loading products.</div>;

  const categories = ['All', 'Snacks', 'Drinks', 'Dairy'];
  
  // Get unique subcategories for the currently active main category
  const subCategories = activeCategory === 'All' 
    ? [] 
    : ['All', ...new Set(products.filter(p => p.category === activeCategory).map(p => p.subCategory).filter(Boolean))];

  const handleCategoryChange = (cat) => {
    if (activeCategory === cat) {
      // Toggle off: close the accordion and show all products
      setActiveCategory('All');
      setActiveSubCategory('All');
    } else {
      // Toggle on: open the accordion for the new category
      setActiveCategory(cat);
      setActiveSubCategory('All');
    }
  };

  const filteredProducts = products.filter(p => {
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(lowerQuery);
      const matchCat = p.category.toLowerCase().includes(lowerQuery);
      const matchSubCat = p.subCategory && p.subCategory.toLowerCase().includes(lowerQuery);
      if (!matchName && !matchCat && !matchSubCat) {
        return false;
      }
    }
    if (activeCategory !== 'All' && p.category !== activeCategory) return false;
    if (activeSubCategory !== 'All' && p.subCategory !== activeSubCategory) return false;
    return true;
  });

  return (
    <div className="products-container">
      {/* Hero Section */}
      <div className="hero-banner">
        <h1 className="hero-brand" onClick={handleTear}>SNACK-X</h1>
        <p className="hero-subtext">India's Fastest Delivery. Snacks & More.</p>
        <div className="scroll-indicator">
          <span>Scroll down to shop</span>
          <div className="arrow-down">↓</div>
        </div>
      </div>

      <div className="main-layout">
        {/* Sidebar with Accordion Sub-Sidebar */}
        <aside className="sidebar">
          {categories.map(cat => (
            <div key={cat} className="category-group">
              <div 
                className={`category-item ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => handleCategoryChange(cat)}
              >
                {cat}
              </div>
              
              {/* Accordion Sub-Categories */}
              {activeCategory === cat && activeCategory !== 'All' && subCategories.length > 0 && (
                <div className="sub-sidebar">
                  {subCategories.map(sub => (
                    <div 
                      key={sub}
                      className={`sub-category-item ${activeSubCategory === sub ? 'active' : ''}`}
                      onClick={() => setActiveSubCategory(sub)}
                    >
                      {sub}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </aside>

        {/* Main Content */}
        <main className="content-area">
          <h2 className="section-title">
            Buy {activeSubCategory !== 'All' ? activeSubCategory : activeCategory === 'All' ? 'Everything' : activeCategory} Online
          </h2>
          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Products;
