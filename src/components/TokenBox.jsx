import { useState } from 'react';
import { Copy, Eye, EyeOff } from 'lucide-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import toast from 'react-hot-toast';

const TokenBox = ({ token }) => {
  const [isVisible, setIsVisible] = useState(false);

  const maskedToken = token 
    ? `${token.substring(0, 8)}${'•'.repeat(24)}${token.substring(token.length - 8)}` 
    : '';

  return (
    <div className="glass-card p-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h3 className="text-white-custom fw-semibold fs-5 mb-0">Your API Token</h3>
        <div className="d-flex gap-2">
          <button
            onClick={() => setIsVisible(!isVisible)}
            className="btn p-2 text-muted-custom hover:text-white"
          >
            {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          <CopyToClipboard text={token} onCopy={() => toast.success('Token copied!')}>
            <button className="btn p-2 text-muted-custom hover:text-white">
              <Copy size={18} />
            </button>
          </CopyToClipboard>
        </div>
      </div>
      
      <div className="token-display">
        <code className="text-break">
          {isVisible ? token : maskedToken}
        </code>
      </div>

      <div className="alert alert-warning-custom mt-3 mb-0">
        ⚠️ Store this token safely. You won't be able to see it again.
      </div>
    </div>
  );
};

export default TokenBox;