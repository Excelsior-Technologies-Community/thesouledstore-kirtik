import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Facebook } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState('login');

  // Login state
  const [mobile, setMobile] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  // Register state
  const [reg, setReg] = useState({
    firstName: '', lastName: '', email: '', password: '', confirmPassword: '',
    birthdate: '', mobile: '', gender: ''
  });
  const [errors, setErrors] = useState({});

  const handleLogin = (e) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(mobile)) {
      setErrors({ mobile: 'Please enter a valid 10-digit mobile number' });
      return;
    }
    if (!otpSent) {
      setOtpSent(true);
      setErrors({});
      return;
    }
    if (otp.length !== 4) {
      setErrors({ otp: 'Please enter the 4-digit OTP' });
      return;
    }
    // Mock login success
    localStorage.setItem('user', JSON.stringify({ mobile, loggedIn: true }));
    navigate('/');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const errs = {};
    if (!reg.firstName.trim()) errs.firstName = 'First name is required';
    if (!reg.lastName.trim()) errs.lastName = 'Last name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(reg.email)) errs.email = 'Valid email is required';
    if (reg.password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (reg.password !== reg.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    if (!reg.birthdate) errs.birthdate = 'Date of birth is required';
    if (!/^\d{10}$/.test(reg.mobile)) errs.mobile = 'Valid 10-digit mobile is required';
    if (!reg.gender) errs.gender = 'Please select your gender';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    localStorage.setItem('user', JSON.stringify({
      name: `${reg.firstName} ${reg.lastName}`,
      email: reg.email,
      mobile: reg.mobile,
      loggedIn: true
    }));
    navigate('/');
  };

  return (
    <div className="login-wrap">
      <div className="login-box">
        <h2 className="login-title">{tab === 'login' ? 'Login with TrendStore' : 'Register with TrendStore'}</h2>
        <div className="login-tabs">
          <button
            className={`login-tab ${tab === 'login' ? 'active' : ''}`}
            onClick={() => { setTab('login'); setErrors({}); }}
          >
            LOGIN
          </button>
          <button
            className={`login-tab ${tab === 'register' ? 'active' : ''}`}
            onClick={() => { setTab('register'); setErrors({}); }}
          >
            REGISTER
          </button>
        </div>

        {tab === 'login' ? (
          <form className="login-form" onSubmit={handleLogin}>
            <div className="social-row">
              <button type="button" className="social-btn fb">
                <Facebook size={16} fill="white" /> Facebook
              </button>
              <button type="button" className="social-btn google">
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
            </div>

            <div className="divider-or"><span>OR</span></div>

            {!otpSent ? (
              <>
                <label className="login-label">Mobile Number</label>
                <div className="phone-input">
                  <span className="phone-code">+91</span>
                  <input
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    maxLength={10}
                  />
                </div>
                {errors.mobile && <p className="form-error">{errors.mobile}</p>}
                <p className="login-helper">
                  By continuing, I agree to the <Link to="#">Terms & Conditions</Link> and <Link to="#">Privacy Policy</Link>
                </p>
                <button type="submit" className="proceed-btn">PROCEED</button>
              </>
            ) : (
              <>
                <p style={{ fontSize: 13, marginBottom: 16, color: '#666' }}>
                  Enter the 4-digit OTP sent to <strong>+91 {mobile}</strong>
                  <button
                    type="button"
                    onClick={() => { setOtpSent(false); setOtp(''); }}
                    style={{ marginLeft: 8, color: '#0E7B7B', fontSize: 12, background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    Change
                  </button>
                </p>
                <input
                  type="text"
                  className="input-full"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  maxLength={4}
                  style={{ letterSpacing: 6, textAlign: 'center', fontSize: 18 }}
                />
                {errors.otp && <p className="form-error">{errors.otp}</p>}
                <p className="login-helper" style={{ textAlign: 'center', marginTop: 12 }}>
                  Didn't receive? <button type="button" style={{ color: '#0E7B7B', background: 'none', border: 'none', cursor: 'pointer' }}>Resend OTP</button>
                </p>
                <button type="submit" className="proceed-btn">VERIFY & LOGIN</button>
              </>
            )}
          </form>
        ) : (
          <form className="login-form" onSubmit={handleRegister}>
            <div className="form-row">
              <div className="form-col">
                <label className="login-label">First Name *</label>
                <input
                  type="text"
                  className="input-full"
                  value={reg.firstName}
                  onChange={(e) => setReg({ ...reg, firstName: e.target.value })}
                />
                {errors.firstName && <p className="form-error">{errors.firstName}</p>}
              </div>
              <div className="form-col">
                <label className="login-label">Last Name *</label>
                <input
                  type="text"
                  className="input-full"
                  value={reg.lastName}
                  onChange={(e) => setReg({ ...reg, lastName: e.target.value })}
                />
                {errors.lastName && <p className="form-error">{errors.lastName}</p>}
              </div>
            </div>

            <label className="login-label">Email *</label>
            <input
              type="email"
              className="input-full"
              value={reg.email}
              onChange={(e) => setReg({ ...reg, email: e.target.value })}
            />
            {errors.email && <p className="form-error">{errors.email}</p>}

            <label className="login-label">Mobile Number *</label>
            <div className="phone-input">
              <span className="phone-code">+91</span>
              <input
                type="tel"
                placeholder="10-digit mobile"
                value={reg.mobile}
                onChange={(e) => setReg({ ...reg, mobile: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                maxLength={10}
              />
            </div>
            {errors.mobile && <p className="form-error">{errors.mobile}</p>}

            <div className="form-row">
              <div className="form-col">
                <label className="login-label">Password *</label>
                <input
                  type="password"
                  className="input-full"
                  value={reg.password}
                  onChange={(e) => setReg({ ...reg, password: e.target.value })}
                />
                {errors.password && <p className="form-error">{errors.password}</p>}
              </div>
              <div className="form-col">
                <label className="login-label">Confirm Password *</label>
                <input
                  type="password"
                  className="input-full"
                  value={reg.confirmPassword}
                  onChange={(e) => setReg({ ...reg, confirmPassword: e.target.value })}
                />
                {errors.confirmPassword && <p className="form-error">{errors.confirmPassword}</p>}
              </div>
            </div>

            <label className="login-label">Date of Birth *</label>
            <input
              type="date"
              className="input-full"
              value={reg.birthdate}
              max={new Date().toISOString().split('T')[0]}
              onChange={(e) => setReg({ ...reg, birthdate: e.target.value })}
            />
            {errors.birthdate && <p className="form-error">{errors.birthdate}</p>}

            <label className="login-label">Gender *</label>
            <div className="gender-row">
              {['Male', 'Female', 'Other'].map(g => (
                <label key={g} className={`gender-opt ${reg.gender === g ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={reg.gender === g}
                    onChange={(e) => setReg({ ...reg, gender: e.target.value })}
                  />
                  {g}
                </label>
              ))}
            </div>
            {errors.gender && <p className="form-error">{errors.gender}</p>}

            <p className="login-helper" style={{ marginTop: 14 }}>
              By creating an account, I agree to the <Link to="#">Terms & Conditions</Link>
            </p>
            <button type="submit" className="proceed-btn proceed-btn-teal">CREATE ACCOUNT</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
