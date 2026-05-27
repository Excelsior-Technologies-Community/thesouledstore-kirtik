import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CheckoutSteps = ({ active }) => (
  <div className="checkout-steps">
    <span className="step completed">MY BAG</span>
    <span className="step-divider">- - - - - - - - - -</span>
    <span className={`step ${active === 'address' ? 'active' : 'completed'}`}>ADDRESS</span>
    <span className="step-divider">- - - - - - - - - -</span>
    <span className={`step ${active === 'payment' ? 'active' : ''}`}>PAYMENT</span>
  </div>
);

const Address = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, addresses, selectedAddress, addAddress, removeAddress, updateAddress, setSelectedAddress } = useCart();
  
  const [showForm, setShowForm] = useState(addresses.length === 0);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: '', mobile: '', pincode: '', address: '', locality: '',
    city: '', state: '', tag: 'Home'
  });
  const [errors, setErrors] = useState({});

  if (cart.length === 0) {
    return (
      <div style={{padding: 60, textAlign: 'center'}}>
        <p style={{marginBottom: 16}}>Your cart is empty</p>
        <Link to="/" className="btn btn-teal">CONTINUE SHOPPING</Link>
      </div>
    );
  }

  const validateForm = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!/^\d{10}$/.test(form.mobile)) errs.mobile = 'Enter valid 10-digit mobile';
    if (!/^\d{6}$/.test(form.pincode)) errs.pincode = 'Enter valid 6-digit pincode';
    if (!form.address.trim()) errs.address = 'Address is required';
    if (!form.city.trim()) errs.city = 'City is required';
    if (!form.state.trim()) errs.state = 'State is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;
    if (editingId) {
      updateAddress(editingId, form);
      setEditingId(null);
    } else {
      addAddress(form);
    }
    setForm({ name: '', mobile: '', pincode: '', address: '', locality: '', city: '', state: '', tag: 'Home' });
    setShowForm(false);
    setErrors({});
  };

  const handleEdit = (addr) => {
    setForm(addr);
    setEditingId(addr.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this address?')) {
      removeAddress(id);
    }
  };

  const handleProceed = () => {
    if (!selectedAddress) {
      alert('Please select a delivery address');
      return;
    }
    navigate('/payment');
  };

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <div className="container">
        <CheckoutSteps active="address" />

        <div className="address-page">
          <div className="address-grid">
            <div>
              <h2 style={{fontSize: 16, fontWeight: 700, marginBottom: 16}}>SELECT DELIVERY ADDRESS</h2>

              {addresses.map(addr => (
                <div
                  key={addr.id}
                  className={`address-card ${selectedAddress?.id === addr.id ? 'selected' : ''}`}
                  onClick={() => setSelectedAddress(addr)}
                >
                  <div className="address-card-head">
                    <input
                      type="radio"
                      checked={selectedAddress?.id === addr.id}
                      onChange={() => setSelectedAddress(addr)}
                    />
                    <div style={{flex: 1}}>
                      <span className="address-card-name">{addr.name}</span>
                      <span className="address-tag">{addr.tag.toUpperCase()}</span>
                      <div className="address-card-body">
                        {addr.address}, {addr.locality && `${addr.locality}, `}
                        {addr.city}, {addr.state} - {addr.pincode}
                        <br />
                        Mobile: {addr.mobile}
                      </div>
                    </div>
                  </div>
                  <div className="address-card-actions">
                    <button onClick={(e) => { e.stopPropagation(); handleEdit(addr); }}>
                      <Edit2 size={12} style={{display: 'inline', marginRight: 4}} />
                      EDIT
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); handleDelete(addr.id); }}>
                      <Trash2 size={12} style={{display: 'inline', marginRight: 4}} />
                      DELETE
                    </button>
                  </div>
                </div>
              ))}

              {!showForm && (
                <button className="add-address-btn" onClick={() => setShowForm(true)}>
                  <Plus size={14} style={{display: 'inline', marginRight: 6}} />
                  ADD NEW ADDRESS
                </button>
              )}

              {showForm && (
                <div className="address-form">
                  <h3>{editingId ? 'EDIT ADDRESS' : 'ADD NEW ADDRESS'}</h3>

                  <div className="form-row cols-2">
                    <div>
                      <input
                        className="form-input"
                        placeholder="Full Name *"
                        value={form.name}
                        onChange={e => setForm({...form, name: e.target.value})}
                      />
                      {errors.name && <p style={{color:'#E63946', fontSize:11, marginTop:4}}>{errors.name}</p>}
                    </div>
                    <div>
                      <input
                        className="form-input"
                        placeholder="Mobile Number *"
                        maxLength={10}
                        value={form.mobile}
                        onChange={e => setForm({...form, mobile: e.target.value.replace(/\D/g, '')})}
                      />
                      {errors.mobile && <p style={{color:'#E63946', fontSize:11, marginTop:4}}>{errors.mobile}</p>}
                    </div>
                  </div>

                  <div className="form-row cols-2">
                    <div>
                      <input
                        className="form-input"
                        placeholder="Pincode *"
                        maxLength={6}
                        value={form.pincode}
                        onChange={e => setForm({...form, pincode: e.target.value.replace(/\D/g, '')})}
                      />
                      {errors.pincode && <p style={{color:'#E63946', fontSize:11, marginTop:4}}>{errors.pincode}</p>}
                    </div>
                    <input
                      className="form-input"
                      placeholder="Locality / Area"
                      value={form.locality}
                      onChange={e => setForm({...form, locality: e.target.value})}
                    />
                  </div>

                  <div className="form-row">
                    <div>
                      <textarea
                        className="form-input"
                        placeholder="House / Flat / Building / Street *"
                        rows={3}
                        style={{resize: 'vertical', fontFamily: 'inherit'}}
                        value={form.address}
                        onChange={e => setForm({...form, address: e.target.value})}
                      />
                      {errors.address && <p style={{color:'#E63946', fontSize:11, marginTop:4}}>{errors.address}</p>}
                    </div>
                  </div>

                  <div className="form-row cols-2">
                    <div>
                      <input
                        className="form-input"
                        placeholder="City *"
                        value={form.city}
                        onChange={e => setForm({...form, city: e.target.value})}
                      />
                      {errors.city && <p style={{color:'#E63946', fontSize:11, marginTop:4}}>{errors.city}</p>}
                    </div>
                    <div>
                      <input
                        className="form-input"
                        placeholder="State *"
                        value={form.state}
                        onChange={e => setForm({...form, state: e.target.value})}
                      />
                      {errors.state && <p style={{color:'#E63946', fontSize:11, marginTop:4}}>{errors.state}</p>}
                    </div>
                  </div>

                  <div>
                    <p className="form-label">Address Type</p>
                    <div className="tag-radio">
                      {['Home', 'Office', 'Other'].map(t => (
                        <label key={t}>
                          <input
                            type="radio"
                            checked={form.tag === t}
                            onChange={() => setForm({...form, tag: t})}
                          />
                          {t}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="form-actions">
                    <button className="btn btn-teal" onClick={handleSave}>
                      {editingId ? 'UPDATE' : 'SAVE'} ADDRESS
                    </button>
                    <button
                      className="btn btn-outline"
                      onClick={() => {
                        setShowForm(false);
                        setEditingId(null);
                        setErrors({});
                        setForm({ name: '', mobile: '', pincode: '', address: '', locality: '', city: '', state: '', tag: 'Home' });
                      }}
                    >
                      CANCEL
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Summary */}
            <div>
              <div className="billing-box">
                <p className="billing-title">ORDER SUMMARY</p>
                <div className="billing-row">
                  <span>Items ({cart.length})</span>
                  <span>₹ {cartTotal}.00</span>
                </div>
                <div className="billing-row">
                  <span>Shipping</span>
                  <span className="free">FREE</span>
                </div>
                <div className="billing-total">
                  <span>Total</span>
                  <span>₹ {cartTotal}.00</span>
                </div>
                <button
                  className="btn btn-teal btn-block"
                  style={{marginTop: 16}}
                  onClick={handleProceed}
                  disabled={!selectedAddress}
                >
                  CONTINUE TO PAYMENT
                </button>
                {!selectedAddress && addresses.length > 0 && (
                  <p style={{fontSize: 11, color: '#E63946', marginTop: 8, textAlign: 'center'}}>
                    Please select an address
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;
