# TrendStore — React E-commerce Clone

A pixel-perfect, fully functional e-commerce site built with **React + Vite + Custom CSS** (no Tailwind, no UI library).

## ✨ Features

### 🛍️ Full Shopping Flow
- Browse → Filter → Product Detail → Cart → Address → Payment → Order Success
- Working filters (Category, Theme, Size, Price)
- Working coupon code (try `WELCOME10` for 10% off)
- 5 payment methods (UPI, Cards, NetBanking, Wallet, COD)
- Address management (add, edit, delete, select)
- Order placement with confirmation page

### 🎨 Pages
- **Home** — Hero carousel, features bar, new arrivals, categories
- **Product Listing** — Sidebar filters, sorting, mobile filter drawer
- **Product Detail** — 4-image gallery, size selector, pincode check, accordions
- **Cart** — Items, coupon, gift voucher, billing summary
- **Address** — Saved addresses, add new form with validation
- **Payment** — 5 methods, order summary, secure note
- **Order Success** — Confirmation, timeline, order ID
- **Wishlist** — Grid view + empty state
- **Login / Register** — Tabs, OTP flow, social login, full register form

### 🔧 Technical
- **No Tailwind** — All styling is custom CSS in `src/styles/`
- React Router v6 with all routes wired up
- Context API for cart + wishlist + addresses + orders
- localStorage persistence for cart/wishlist/addresses
- Form validation (mobile, pincode, email, password, etc.)
- Mobile drawer menu
- Search modal with live filtering
- Fully responsive (mobile, tablet, desktop)

## 🚀 Setup

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev

# 3. Open http://localhost:3000
```

## 🏗️ Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx           # Top nav with centered logo, mobile drawer
│   ├── SearchModal.jsx      # Full-screen search overlay
│   ├── HeroCarousel.jsx     # Auto-rotating hero banner
│   ├── FeaturesBar.jsx      # 10% Cashback / Returns / Shipping
│   ├── NewArrivals.jsx      # Horizontal product slider
│   ├── Categories.jsx       # 3-column category grid
│   ├── ProductCard.jsx      # Reusable product card with wishlist
│   ├── BrandStripe.jsx      # Red HOMEGROWN INDIAN BRAND banner
│   ├── HappyCustomers.jsx   # "6 Million Customers" section
│   └── Footer.jsx           # 4-column footer with social/payments
├── pages/
│   ├── Home.jsx
│   ├── ProductListing.jsx   # /products and /products/:category
│   ├── ProductDetail.jsx    # /product/:id
│   ├── Cart.jsx             # /cart
│   ├── Address.jsx          # /address
│   ├── Payment.jsx          # /payment
│   ├── OrderSuccess.jsx     # /order-success
│   ├── Wishlist.jsx         # /wishlist
│   └── Login.jsx            # /login
├── context/
│   └── CartContext.jsx      # Global state (cart, wishlist, addresses, orders)
├── data/
│   └── products.js          # 20 sample products + categories + filters
├── styles/
│   ├── base.css             # Reset + CSS variables + buttons
│   ├── navbar.css           # Navbar + drawer
│   ├── home.css             # Hero + categories + sliders
│   ├── listing.css          # Product listing + product detail
│   ├── pages.css            # Cart, login, checkout, footer, etc.
│   └── main.css             # Imports all stylesheets
├── App.jsx                  # Routes + ScrollToTop
└── main.jsx                 # Entry point
```

## 🎨 Customization

### Change Brand Colors
Edit `src/styles/base.css`:
```css
:root {
  --teal: #0E7B7B;      /* Primary brand color */
  --red: #E63946;       /* Accent color */
  --yellow: #FFD13B;    /* Highlight color */
}
```

### Change Brand Name
Search & replace `TrendStore` in:
- `src/components/Navbar.jsx`
- `src/components/Footer.jsx`
- `index.html`

### Add Real Products
Edit `src/data/products.js`. Each product has:
```js
{
  id, name, category, subCategory, gender,
  theme, fit, price, images: [], sizes: [], colors: []
}
```

## 🧪 Try These Flows

1. **Add a coupon discount** — Add items to cart → Apply coupon → use `WELCOME10`
2. **Filter products** — Go to `/products/men-tshirts` → Use sidebar filters
3. **Complete a checkout** — Add to cart → Place order → Fill address → Pick payment → See order success
4. **Wishlist** — Click heart on any product card → View `/wishlist` → Move to bag
5. **Search** — Click search icon in navbar → Type "shirt"
6. **Mobile menu** — Resize browser to <1024px → Click hamburger

## 📱 Responsive Breakpoints

- Mobile: `< 640px`
- Tablet: `640px – 1024px`
- Desktop: `> 1024px`

## 📝 Notes

- Product images are royalty-free from Unsplash.
- No real backend — all data is mocked and persisted to localStorage.
- For production: replace mock data with API calls, add real payment gateway integration.

## 📄 License

Free to use for learning and personal projects.
