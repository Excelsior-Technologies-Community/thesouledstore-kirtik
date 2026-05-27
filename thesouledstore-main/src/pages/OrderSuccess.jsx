import { useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, Package, Truck } from 'lucide-react';

const OrderSuccess = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const orderId = params.get('id') || `OD${Date.now().toString().slice(-10)}`;

  // Estimated delivery: 5 days from now
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 5);
  const dateStr = deliveryDate.toLocaleDateString('en-IN', {
    weekday: 'long', day: 'numeric', month: 'long'
  });

  useEffect(() => {
    // If user lands here without an order ID, send them home after a delay
    if (!params.get('id')) {
      const t = setTimeout(() => navigate('/'), 5000);
      return () => clearTimeout(t);
    }
  }, [params, navigate]);

  return (
    <div className="success-page">
      <div className="success-card">
        <div className="success-icon">
          <CheckCircle2 size={72} color="#0E7B7B" strokeWidth={1.5} />
        </div>
        <h1 className="success-title">Order Placed Successfully!</h1>
        <p className="success-sub">Thank you for shopping with us. Your order is being processed.</p>

        <div className="success-order">
          <div className="success-order-row">
            <span>Order ID:</span>
            <strong>{orderId}</strong>
          </div>
          <div className="success-order-row">
            <span>Estimated Delivery:</span>
            <strong>{dateStr}</strong>
          </div>
        </div>

        <div className="success-timeline">
          <div className="timeline-step done">
            <div className="timeline-dot"><CheckCircle2 size={16} /></div>
            <span>Order Confirmed</span>
          </div>
          <div className="timeline-line" />
          <div className="timeline-step">
            <div className="timeline-dot"><Package size={16} /></div>
            <span>Packed</span>
          </div>
          <div className="timeline-line" />
          <div className="timeline-step">
            <div className="timeline-dot"><Truck size={16} /></div>
            <span>Out for Delivery</span>
          </div>
        </div>

        <p className="success-note">
          A confirmation email has been sent to your registered email address.
          You can track your order from the 'My Orders' section.
        </p>

        <div className="success-actions">
          <Link to="/" className="btn btn-outline-teal">CONTINUE SHOPPING</Link>
          <Link to="/products" className="btn btn-teal">BROWSE MORE</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
