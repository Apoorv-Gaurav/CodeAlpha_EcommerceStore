import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Orders from './pages/Orders';

import Checkout from './pages/Checkout';
import Success from './pages/Success';

const LogoWithBurst = () => {
  const [isBursting, setIsBursting] = useState(false);
  const navigate = useNavigate();

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (isBursting) return;
    
    setIsBursting(true);
    setTimeout(() => {
      setIsBursting(false);
      navigate('/');
    }, 1200);
  };

  const snacks = ['🍫', '🍿', '🍩', '🍪', '🍬', '🥤'];

  return (
    <div className="brand-logo-container" onClick={handleLogoClick}>
      <span className="brand-logo">SNACK-X</span>
      {snacks.map((snack, i) => {
        const angle = (i / snacks.length) * 2 * Math.PI;
        const radius = 90;
        const tx = Math.cos(angle) * radius + 'px';
        const ty = Math.sin(angle) * radius + 'px';
        
        return (
          <span 
            key={i} 
            className={`burst-particle ${isBursting ? 'bursting' : ''}`}
            style={{ '--tx': tx, '--ty': ty }}
          >
            {snack}
          </span>
        );
      })}
    </div>
  );
};

const Header = () => {
  const { getCartCount, getCartTotal } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search') || '';

  const handleSearch = (e) => {
    const val = e.target.value;
    if (val.trim()) {
      navigate(`/?search=${encodeURIComponent(val)}`);

      // Smooth scroll to products area if we're currently at the top (hero banner visible)
      setTimeout(() => {
        const productsSection = document.querySelector('.main-layout');
        if (productsSection) {
          const rect = productsSection.getBoundingClientRect();
          // If products section is far below the header, scroll down to it
          if (rect.top > 120) {
            const y = rect.top + window.scrollY - 90; // offset for the sticky header
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }
      }, 50); // slight delay to ensure DOM is ready if navigating from another page
    } else {
      navigate(`/`);
    }
  };

  return (
    <header className="top-header">
      <div className="brand-section">
        <LogoWithBurst />
        <span className="location-tag">Order for fun 🍿</span>
      </div>

      <div className="search-bar-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search for snacks, drinks, dairy and more"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <div className="header-actions">
        {user ? (
          <>
            <Link to="/orders" className="header-link">📦 Orders</Link>
            <div className="user-menu">
              <span className="user-greeting">Hi, {user.name.split(' ')[0]}</span>
              <button className="logout-btn" onClick={logout}>Logout</button>
            </div>
          </>
        ) : (
          <Link to="/login" className="header-link">Login</Link>
        )}
        <Link to="/cart" className="cart-btn">
          🛒 {getCartCount() > 0 ? `${getCartCount()} items • ₹${getCartTotal()}` : 'My Cart'}
        </Link>
      </div>
    </header>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="app-container">
            <Header />
            <Routes>
              <Route path="/" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/success" element={<Success />} />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
