import { Truck, RotateCcw, Wallet } from 'lucide-react';

const FeaturesBar = () => {
  const features = [
    { icon: Wallet, title: '10% Cashback', subtitle: 'on all App orders' },
    { icon: RotateCcw, title: '30 days Easy Returns', subtitle: '& Exchanges' },
    { icon: Truck, title: 'Free &', subtitle: 'Fast Shipping' },
  ];

  return (
    <section className="features-bar">
      <div className="container">
        <div className="features-grid">
          {features.map((f, i) => (
            <div className="feature-item" key={i}>
              <div className="feature-icon">
                <f.icon size={18} strokeWidth={1.5} />
              </div>
              <div className="feature-text">
                <strong>{f.title}</strong>
                <small>{f.subtitle}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesBar;
