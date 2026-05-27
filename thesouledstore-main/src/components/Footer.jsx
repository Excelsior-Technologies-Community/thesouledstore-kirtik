import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, ChevronDown, ChevronUp } from 'lucide-react';

const Footer = () => {
  const [aboutOpen, setAboutOpen] = useState(false);

  const columns = [
    {
      title: 'NEED HELP',
      links: [
        { name: 'Contact Us', path: '/contact' },
        { name: 'Track Order', path: '/track-order' },
        { name: 'Returns & Refunds', path: '/returns' },
        { name: 'FAQs', path: '/faqs' },
        { name: 'My Account', path: '/login' },
      ],
      extras: [
        { icon: '₹', text: 'COD Available' },
        { icon: '↻', text: '30 Days Easy Returns & Exchanges' },
      ],
    },
    {
      title: 'COMPANY',
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Investor Relation', path: '/investor' },
        { name: 'Careers', path: '/careers' },
        { name: 'Gift Vouchers', path: '/gift-vouchers' },
        { name: 'Community Initiatives', path: '/community' },
      ],
    },
    {
      title: 'MORE INFO',
      links: [
        { name: 'T&C', path: '/terms' },
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Sitemap', path: '/sitemap' },
        { name: 'Get Notified', path: '/notify' },
        { name: 'Blogs', path: '/blogs' },
      ],
    },
    {
      title: 'STORE NEAR ME',
      links: [
        { name: 'Mumbai', path: '/stores/mumbai' },
        { name: 'Pune', path: '/stores/pune' },
        { name: 'Bangalore', path: '/stores/bangalore' },
        { name: 'Surat', path: '/stores/surat' },
      ],
      special: { name: 'View More', path: '/stores' },
    },
  ];

  const paymentPartners = ['PhonePe', 'GPay', 'Amazon Pay', 'MasterCard', 'Mobikwik', 'Paytm', 'UPI', 'COD'];
  const shippingPartners = ['DTDC', 'Delhivery', 'EcomExpress', 'XpressBees'];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-cols">
          {columns.map((col, i) => (
            <div className="footer-col" key={i}>
              <h4>{col.title}</h4>
              <ul>
                {col.links.map(link => (
                  <li key={link.name}>
                    <Link to={link.path}>{link.name}</Link>
                  </li>
                ))}
                {col.special && (
                  <li>
                    <Link to={col.special.path} className="footer-blue">
                      {col.special.name}
                    </Link>
                  </li>
                )}
              </ul>
              {col.extras && (
                <div className="footer-extras">
                  {col.extras.map((e, idx) => (
                    <div className="footer-extra" key={idx}>
                      <span className="footer-extra-icon">{e.icon}</span>
                      <span>{e.text}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="footer-app">
          <p>📱 EXPERIENCE THE TRENDSTORE APP</p>
          <div className="app-stores">
            {/* Google Play */}
            <a href="#" className="app-store-btn" aria-label="Get it on Google Play">
              <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.5 1.5v21l11-10.5L0.5 1.5z" fill="#4285F4"/>
                <path d="M0.5 1.5l11 10.5 3.5-3.5L1.5 0.5C1 0.7 0.7 1 0.5 1.5z" fill="#34A853"/>
                <path d="M0.5 22.5c0.2 0.5 0.5 0.8 1 1l13.5-8-3.5-3.5L0.5 22.5z" fill="#FBBC04"/>
                <path d="M15 8.5l3.5 2c0.5 0.3 0.5 1.5 0 1.8L15 14.5l-3.5-3.5L15 8.5z" fill="#EA4335"/>
              </svg>
              <div className="app-store-text">
                <span className="lt">GET IT ON</span>
                <span className="lb">Google Play</span>
              </div>
            </a>

            {/* App Store */}
            <a href="#" className="app-store-btn" aria-label="Download on App Store">
              <svg width="22" height="24" viewBox="0 0 22 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 11.5c0-2.6 2.2-3.9 2.3-4-1.2-1.8-3.2-2.1-3.9-2.1-1.6-0.2-3.2 1-4.1 1-0.9 0-2.2-1-3.6-0.9-1.8 0-3.6 1.1-4.5 2.7-1.9 3.3-0.5 8.2 1.3 10.9 0.9 1.3 2 2.8 3.4 2.7 1.4-0.1 1.9-0.9 3.6-0.9s2.2 0.9 3.6 0.9c1.5 0 2.5-1.3 3.3-2.7 1.1-1.5 1.5-3 1.5-3.1-0.1 0-3-1.1-3-4.5zM13.4 3.8c0.8-0.9 1.3-2.2 1.1-3.4-1.1 0-2.4 0.7-3.2 1.6-0.7 0.8-1.4 2.1-1.2 3.3 1.3 0.1 2.5-0.6 3.3-1.5z"/>
              </svg>
              <div className="app-store-text">
                <span className="lt">Download on the</span>
                <span className="lb">App Store</span>
              </div>
            </a>
          </div>

          <div className="social-bar">
            <span>Follow Us:</span>
            <a href="#" className="social-icon fb" aria-label="Facebook"><Facebook size={14} fill="white" strokeWidth={0} /></a>
            <a href="#" className="social-icon ig" aria-label="Instagram"><Instagram size={14} /></a>
            <a href="#" className="social-icon sc" aria-label="Snapchat" title="Snapchat">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1.5c-3 0-5.5 2-6.4 4.8-0.4 1.2-0.3 2.5-0.3 3.5-0.5 0.3-1.1 0.5-1.7 0.5-0.4 0-0.7-0.1-1-0.2-0.3-0.1-0.5 0.1-0.5 0.4 0 1 1 1.6 2 2 0.4 0.2 0.7 0.3 0.9 0.5-0.1 0.5-0.5 1.5-2 2.7-0.6 0.5-1.3 0.7-1.7 0.7-0.3 0-0.5 0.2-0.4 0.5 0.1 0.4 1.2 1 2.7 1.3 0.1 0.2 0.2 0.5 0.3 0.7 0.1 0.4 0.4 0.5 0.7 0.5 0.6 0 1.4-0.2 2.5-0.1 0.6 0.1 1.2 0.4 1.8 0.9 0.8 0.6 1.6 1.2 3 1.2 0.1 0 0.2 0 0.3 0 0.1 0 0.2 0 0.3 0 1.4 0 2.2-0.6 3-1.2 0.6-0.5 1.2-0.8 1.8-0.9 1.1-0.1 1.9 0.1 2.5 0.1 0.4 0 0.6-0.1 0.7-0.5 0.1-0.2 0.2-0.5 0.3-0.7 1.5-0.3 2.6-0.9 2.7-1.3 0.1-0.3-0.1-0.5-0.4-0.5-0.5-0.1-1.1-0.2-1.7-0.7-1.5-1.2-1.9-2.2-2-2.7 0.2-0.2 0.5-0.3 0.9-0.5 1-0.4 2-1 2-2 0-0.3-0.3-0.5-0.5-0.4-0.3 0.1-0.6 0.2-1 0.2-0.6 0-1.2-0.2-1.7-0.5 0-1 0.1-2.3-0.3-3.5C17.5 3.5 15 1.5 12 1.5z"/></svg>
            </a>
            <a href="#" className="social-icon x" aria-label="X (Twitter)">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
          </div>
        </div>

        <div className="footer-about">
          <button className="footer-about-head" onClick={() => setAboutOpen(!aboutOpen)}>
            <span>WHO WE ARE</span>
            {aboutOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          {aboutOpen && (
            <div className="footer-about-body">
              TrendStore is a homegrown streetwear and lifestyle brand offering premium apparel,
              footwear, and accessories. From oversized tees to limited-edition sneakers, discover
              trending fits, exclusive collections, and a community of over 6 million happy customers.
              Built for the bold and the curious — wear what you love.
            </div>
          )}
        </div>

        <div className="footer-payments">
          <div className="footer-payments-row">
            <strong>100% Secure Payment:</strong>
            <div className="payment-chips">
              {paymentPartners.map(p => (
                <span className="payment-chip" key={p}>{p}</span>
              ))}
            </div>
          </div>
          <div className="footer-payments-row">
            <strong>Shipping Partners:</strong>
            <div className="payment-chips">
              {shippingPartners.map(p => (
                <span className="payment-chip" key={p}>{p}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="footer-copy">© TrendStore 2026-27</p>
    </footer>
  );
};

export default Footer;
