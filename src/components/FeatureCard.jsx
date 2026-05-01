const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="feature-card">
      <div className="position-relative" style={{ zIndex: 10 }}>
        <div className="feature-card-icon mb-3">
          <Icon size={24} className="text-primary-custom" />
        </div>
        <h3 className="text-white-custom fw-semibold fs-5 mb-2">{title}</h3>
        <p className="text-muted-custom small lh-base mb-0">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;