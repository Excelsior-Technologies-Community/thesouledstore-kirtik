import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CreditCard, Smartphone, Building2, Wallet, Banknote } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CheckoutSteps = () => (
  <div className="checkout-steps">
    <span className="step completed">MY BAG</span>
    <span className="step-divider">- - - - - - - - - -</span>
    <span className="step completed">ADDRESS</span>
    <span className="step-divider">- - - - - - - - - -</span>
    <span className="step active">PAYMENT</span>
  </div>
);

const Payment = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, selectedAddress, placeOrder } = useCart();

  const [method, setMethod] = useState('upi');
  const [selectedUpi, setSelectedUpi] = useState('');
  const [upiId, setUpiId] = useState('');
  const [cardData, setCardData] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [selectedBank, setSelectedBank] = useState('');
  const [selectedWallet, setSelectedWallet] = useState('');
  const [processing, setProcessing] = useState(false);

  if (cart.length === 0) {
    return (
      <div style={{ padding: 60, textAlign: 'center' }}>
        <p style={{ marginBottom: 16 }}>Your cart is empty</p>
        <Link to="/" className="btn btn-teal">CONTINUE SHOPPING</Link>
      </div>
    );
  }

  if (!selectedAddress) {
    return (
      <div style={{ padding: 60, textAlign: 'center' }}>
        <p style={{ marginBottom: 16 }}>Please select a delivery address first</p>
        <Link to="/address" className="btn btn-teal">SELECT ADDRESS</Link>
      </div>
    );
  }

  const methods = [
    { id: 'upi', label: 'UPI', icon: Smartphone },
    { id: 'card', label: 'Credit / Debit Card', icon: CreditCard },
    { id: 'netbanking', label: 'Net Banking', icon: Building2 },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'cod', label: 'Cash on Delivery', icon: Banknote },
  ];

  const upiApps = [
    { name: 'Google Pay', color: '#4285F4', short: 'G' },
    { name: 'PhonePe', color: '#5F259F', short: 'Pe' },
    { name: 'Paytm', color: '#00BAF2', short: 'PT' },
    { name: 'Amazon Pay', color: '#FF9900', short: 'AP' },
    { name: 'BHIM', color: '#F47C7C', short: 'B' },
    { name: 'Other UPI', color: '#0E7B7B', short: 'UPI' },
  ];

  const banks = ['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra Bank', 'Yes Bank'];
  const wallets = ['Paytm', 'Mobikwik', 'Amazon Pay', 'FreeCharge'];

  const validate = () => {
    if (method === 'upi') {
      if (!selectedUpi && !upiId.trim()) return 'Please select a UPI app or enter UPI ID';
      if (upiId && !/^[\w.-]+@[\w]+$/.test(upiId)) return 'Enter valid UPI ID (e.g. name@bank)';
    } else if (method === 'card') {
      if (!/^\d{16}$/.test(cardData.number.replace(/\s/g, ''))) return 'Enter valid 16-digit card number';
      if (!cardData.name.trim()) return 'Enter cardholder name';
      if (!/^\d{2}\/\d{2}$/.test(cardData.expiry)) return 'Enter valid expiry (MM/YY)';
      if (!/^\d{3}$/.test(cardData.cvv)) return 'Enter valid 3-digit CVV';
    } else if (method === 'netbanking') {
      if (!selectedBank) return 'Please select a bank';
    } else if (method === 'wallet') {
      if (!selectedWallet) return 'Please select a wallet';
    }
    return null;
  };

  const handlePay = () => {
    const err = validate();
    if (err) {
      alert(err);
      return;
    }
    setProcessing(true);
    setTimeout(() => {
      const methodName = method === 'upi' ? (selectedUpi || `UPI: ${upiId}`) :
        method === 'card' ? `Card ending ${cardData.number.slice(-4)}` :
          method === 'netbanking' ? selectedBank :
            method === 'wallet' ? selectedWallet : 'Cash on Delivery';
      const orderId = placeOrder(methodName);
      navigate(`/order-success?id=${orderId}`);
    }, 1500);
  };

  const formatCardNumber = (val) => {
    return val.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})/g, '$1 ').trim();
  };

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <div className="container">
        <CheckoutSteps />

        <div className="payment-grid">
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>SELECT PAYMENT METHOD</h2>

            <div className="payment-methods">
              <div className="payment-tabs">
                {methods.map(m => (
                  <button
                    key={m.id}
                    className={`payment-tab ${method === m.id ? 'active' : ''}`}
                    onClick={() => setMethod(m.id)}
                  >
                    <m.icon size={18} />
                    <span>{m.label}</span>
                  </button>
                ))}
              </div>

              <div className="payment-content">
                {method === 'upi' && (
                  <>
                    <h3>Pay using UPI Apps</h3>
                    <div className="upi-options">
                      {upiApps.map(app => (
                        <div
                          key={app.name}
                          className={`upi-option ${selectedUpi === app.name ? 'selected' : ''}`}
                          onClick={() => { setSelectedUpi(app.name); setUpiId(''); }}
                        >
                          <div className="upi-logo" style={{ background: app.color }}>{app.short}</div>
                          {app.name}
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop: 24 }}>
                      <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Or pay with UPI ID</p>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <input
                          type="text"
                          placeholder="Enter UPI ID (eg. name@okhdfc)"
                          className="form-input"
                          value={upiId}
                          onChange={e => { setUpiId(e.target.value); setSelectedUpi(''); }}
                          style={{ flex: 1 }}
                        />
                      </div>
                    </div>
                  </>
                )}

                {method === 'card' && (
                  <>
                    <h3>Enter Card Details</h3>
                    <div className="card-form">
                      <input
                        type="text"
                        placeholder="Card Number"
                        className="form-input"
                        value={cardData.number}
                        onChange={e => setCardData({ ...cardData, number: formatCardNumber(e.target.value) })}
                      />
                      <input
                        type="text"
                        placeholder="Name on Card"
                        className="form-input"
                        value={cardData.name}
                        onChange={e => setCardData({ ...cardData, name: e.target.value })}
                      />
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          maxLength={5}
                          className="form-input"
                          value={cardData.expiry}
                          onChange={e => {
                            let v = e.target.value.replace(/\D/g, '');
                            if (v.length >= 2) v = v.slice(0, 2) + '/' + v.slice(2, 4);
                            setCardData({ ...cardData, expiry: v });
                          }}
                        />
                        <input
                          type="password"
                          placeholder="CVV"
                          maxLength={3}
                          className="form-input"
                          value={cardData.cvv}
                          onChange={e => setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, '') })}
                        />
                      </div>
                      <p style={{ fontSize: 11, color: '#737373', marginTop: 4 }}>
                        🔒 Your payment information is encrypted and secure
                      </p>
                    </div>
                  </>
                )}

                {method === 'netbanking' && (
                  <>
                    <h3>Select Your Bank</h3>
                    <div style={{ display: 'grid', gap: 8 }}>
                      {banks.map(b => (
                        <label
                          key={b}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                            padding: 12,
                            border: `1px solid ${selectedBank === b ? '#0E7B7B' : '#d4d4d4'}`,
                            background: selectedBank === b ? 'rgba(14,123,123,0.04)' : '#fff',
                            cursor: 'pointer',
                            fontSize: 13,
                          }}
                        >
                          <input
                            type="radio"
                            checked={selectedBank === b}
                            onChange={() => setSelectedBank(b)}
                            style={{ accentColor: '#0E7B7B' }}
                          />
                          {b}
                        </label>
                      ))}
                    </div>
                  </>
                )}

                {method === 'wallet' && (
                  <>
                    <h3>Select Wallet</h3>
                    <div className="upi-options">
                      {wallets.map(w => (
                        <div
                          key={w}
                          className={`upi-option ${selectedWallet === w ? 'selected' : ''}`}
                          onClick={() => setSelectedWallet(w)}
                        >
                          <div className="upi-logo" style={{ background: '#0E7B7B' }}>{w[0]}</div>
                          {w}
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {method === 'cod' && (
                  <>
                    <h3>Cash on Delivery</h3>
                    <div className="cod-info">
                      <p style={{ marginBottom: 8 }}>Pay with cash at the time of delivery.</p>
                      <p>Additional charges of ₹50 may apply for COD orders.</p>
                      <p style={{ marginTop: 12, fontSize: 12 }}>
                        💡 Please keep exact change ready for a contactless experience.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right Summary */}
          <div>
            <div className="billing-box" style={{ marginBottom: 16 }}>
              <p className="billing-title">DELIVERING TO</p>
              <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>
                {selectedAddress.name}
                <span className="address-tag">{selectedAddress.tag.toUpperCase()}</span>
              </p>
              <p style={{ fontSize: 12, color: '#525252', lineHeight: 1.6 }}>
                {selectedAddress.address}<br />
                {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pincode}<br />
                Mobile: {selectedAddress.mobile}
              </p>
              <button
                onClick={() => navigate('/address')}
                style={{ marginTop: 8, fontSize: 11, color: '#0E7B7B', fontWeight: 700, letterSpacing: 1 }}
              >
                CHANGE
              </button>
            </div>

            <div className="billing-box">
              <p className="billing-title">PAYMENT SUMMARY</p>
              <div className="billing-row">
                <span>Items ({cart.length})</span>
                <span>₹ {cartTotal}.00</span>
              </div>
              <div className="billing-row">
                <span>Shipping</span>
                <span className="free">FREE</span>
              </div>
              {method === 'cod' && (
                <div className="billing-row">
                  <span>COD Charges</span>
                  <span>₹ 50.00</span>
                </div>
              )}
              <div className="billing-total">
                <span>Total</span>
                <span>₹ {cartTotal + (method === 'cod' ? 50 : 0)}.00</span>
              </div>
              <button
                className="btn btn-teal btn-block"
                style={{ marginTop: 16 }}
                onClick={handlePay}
                disabled={processing}
              >
                {processing ? 'PROCESSING...' : `PAY ₹ ${cartTotal + (method === 'cod' ? 50 : 0)}.00`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
