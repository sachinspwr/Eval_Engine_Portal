import { ArrowRight, Copy } from 'lucide-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import toast from 'react-hot-toast';

const ApiCard = ({ method, endpoint, description, onClick }) => {
  return (
    <div className="api-card">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center gap-3">
          <span className={`method-badge ${method.toLowerCase()}`}>
            {method}
          </span>
          <code className="text-white-custom small">{endpoint}</code>
        </div>
        <CopyToClipboard text={endpoint} onCopy={() => toast.success('Copied!')}>
          <button className="btn p-1 text-muted-custom">
            <Copy size={14} />
          </button>
        </CopyToClipboard>
      </div>
      <p className="text-muted-custom small mb-3">{description}</p>
      <button
        onClick={onClick}
        className="btn btn-link text-primary-custom text-decoration-none p-0 d-flex align-items-center gap-2 small"
      >
        <span>Try It</span>
        <ArrowRight size={16} />
      </button>
    </div>
  );
};

export default ApiCard;