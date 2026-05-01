import { useState } from 'react';
import { Send, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import JsonViewer from './JsonViewer';

const TryItPanel = ({ endpoint, method, defaultRequest }) => {
  const token = localStorage.getItem('accessToken') || '';
  const [requestBody, setRequestBody] = useState(JSON.stringify(defaultRequest, null, 2));
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusCode, setStatusCode] = useState(null);
  const [responseTime, setResponseTime] = useState(null);
  const [error, setError] = useState(null);

  const handleSend = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);
    setStatusCode(null);
    setResponseTime(null);

    const startTime = performance.now();

    try {
      const parsedBody = JSON.parse(requestBody);
      const result = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8085'}${endpoint}`,
        parsedBody,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Access-Token': token,
          },
        }
      );

      const endTime = performance.now();
      setResponse(result.data);
      setStatusCode(result.status);
      setResponseTime((endTime - startTime).toFixed(2));
      toast.success('Request successful!');
    } catch (err) {
      const endTime = performance.now();
      setError(err.response?.data?.message || err.message);
      setStatusCode(err.response?.status || 'Error');
      setResponseTime((endTime - startTime).toFixed(2));
      
      if (err.response) {
        setResponse(err.response.data);
      }
      
      if (err.response?.status === 429) {
        toast.error('Rate limit exceeded!');
      } else {
        toast.error(err.response?.data?.message || 'Request failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const isSuccess = statusCode >= 200 && statusCode < 300;

  return (
    <div className="glass-card p-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h3 className="text-white-custom fw-semibold fs-5 mb-0">Try It</h3>
        <div className="d-flex align-items-center gap-2">
          <span className="bg-dark px-2 py-1 rounded small text-muted-custom">{method}</span>
          <span className="bg-dark px-2 py-1 rounded small text-muted-custom">{endpoint}</span>
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label text-muted-custom small fw-medium">Request Body (JSON)</label>
        <textarea
          value={requestBody}
          onChange={(e) => setRequestBody(e.target.value)}
          className="try-it-textarea"
          spellCheck="false"
        />
      </div>

      <button
        onClick={handleSend}
        disabled={loading}
        className="btn btn-glow w-100 mb-4 d-flex align-items-center justify-content-center gap-2"
      >
        {loading ? (
          <>
            <span className="spinner-custom"></span>
            <span>Sending...</span>
          </>
        ) : (
          <>
            <Send size={18} />
            <span>Send Request</span>
          </>
        )}
      </button>

      {(response || error) && (
        <div className="bg-dark rounded-3 p-4" style={{border: '1px solid var(--border-color)'}}>
          <div className="d-flex align-items-center gap-3 mb-3">
            {statusCode && (
              <div className={`status-badge ${isSuccess ? 'success' : 'error'}`}>
                {isSuccess ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                <span>{statusCode}</span>
              </div>
            )}

            {responseTime && (
              <div className="d-flex align-items-center gap-2 text-muted-custom small">
                <Clock size={14} />
                <span>{responseTime}ms</span>
              </div>
            )}
          </div>

          <div>
            <label className="form-label text-muted-custom small fw-medium mb-2">Response</label>
            <div className="json-viewer-container">
              <JsonViewer data={response} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TryItPanel;