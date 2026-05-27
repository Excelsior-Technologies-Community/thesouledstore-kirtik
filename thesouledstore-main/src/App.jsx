import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BrandStripe from './components/BrandStripe';
import HappyCustomers from './components/HappyCustomers';
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Address from './pages/Address';
import Payment from './pages/Payment';
import OrderSuccess from './pages/OrderSuccess';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';

/* ── Scroll to top on every route change ── */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

/* ── 404 ── */
const NotFound = () => (
  <div style={{ padding: '80px 20px', textAlign: 'center' }}>
    <h1 style={{ fontSize: 72, fontWeight: 800, color: '#0E7B7B', margin: 0 }}>404</h1>
    <p style={{ fontSize: 18, color: '#666', marginBottom: 24 }}>Page not found</p>
    <a href="/" className="btn btn-teal">GO HOME</a>
  </div>
);

function App() {
  const { pathname } = useLocation();

  /*
   * BUG FIX ✅ — "/" was routed to <ProductListing /> so <Home /> was NEVER rendered.
   * LatestDrops and TrendingPants live inside Home — that's why they didn't show.
   * Fix: "/" now correctly renders <Home />.
   *
   * BrandStripe + HappyCustomers:
   *   • Home renders them internally — don't double-render from App.
   *   • Show on product listing / detail pages only.
   *   • Hide on checkout flow (cart, address, payment, order-success, login).
   */
  const isHome     = pathname === '/';
  const isCheckout = ['/cart','/address','/payment','/order-success','/login']
    .some(p => pathname.startsWith(p));

  return (
    <div className="app-root">
      <ScrollToTop />
      <Navbar />

      <main className="app-main">
        <Routes>
          {/* ✅ FIXED: "/" → Home (was ProductListing) */}
          <Route path="/"                   element={<Home />} />
          <Route path="/products"           element={<ProductListing />} />
          <Route path="/products/:category" element={<ProductListing />} />
          <Route path="/product/:id"        element={<ProductDetail />} />
          <Route path="/cart"               element={<Cart />} />
          <Route path="/address"            element={<Address />} />
          <Route path="/payment"            element={<Payment />} />
          <Route path="/order-success"      element={<OrderSuccess />} />
          <Route path="/wishlist"           element={<Wishlist />} />
          <Route path="/login"              element={<Login />} />
          <Route path="*"                   element={<NotFound />} />
        </Routes>
      </main>

      {/* Show on listing/detail pages only — Home has them internally */}
      {!isHome && !isCheckout && (
        <>
          <BrandStripe />
          <HappyCustomers />
        </>
      )}

      <Footer />
    </div>
  );
}

export default App;
