import { useState } from 'react';
import { Copy } from 'lucide-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import toast from 'react-hot-toast';
import { apiEndpoints } from '../constants/apiDocs';
import JsonViewer from '../components/JsonViewer';
import TryItPanel from '../components/TryItPanel';

const DocsPage = () => {
  const [selectedApi, setSelectedApi] = useState(apiEndpoints[0]);
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-vh-100" style={{paddingTop: '100px', paddingBottom: '60px'}}>
      <div className="container">
        <div className="mb-5">
          <h1 className="display-4 fw-bold text-white-custom mb-2">API Documentation</h1>
          <p className="fs-5 text-muted-custom">
            Everything you need to integrate EvalEngine into your application
          </p>
        </div>

        <div className="row g-4">
          {/* Sidebar */}
          <div className="col-lg-3 d-none d-lg-block">
            <div className="sidebar-nav-custom">
              <h3 className="text-muted-custom small fw-semibold text-uppercase mb-3" style={{letterSpacing: '1px'}}>
                Endpoints
              </h3>
              <nav className="d-flex flex-column gap-1">
                {apiEndpoints.map((api) => (
                  <button
                    key={api.id}
                    onClick={() => {
                      setSelectedApi(api);
                      setActiveTab('overview');
                    }}
                    className={`sidebar-nav-btn ${selectedApi.id === api.id ? 'active' : ''}`}
                  >
                    <span className={`method-badge ${api.method.toLowerCase()}`}>
                      {api.method}
                    </span>
                    <span>{api.title}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-lg-9">
            {/* Mobile API Selector */}
            <div className="d-lg-none mb-4">
              <select
                value={selectedApi.id}
                onChange={(e) => setSelectedApi(apiEndpoints.find(api => api.id === e.target.value))}
                className="form-control form-control-dark"
              >
                {apiEndpoints.map((api) => (
                  <option key={api.id} value={api.id}>{api.title}</option>
                ))}
              </select>
            </div>

            {/* API Header */}
            <div className="glass-card p-4 mb-4">
              <div className="d-flex align-items-center gap-3 mb-3">
                <span className={`method-badge ${selectedApi.method.toLowerCase()}`}>
                  {selectedApi.method}
                </span>
                <code className="text-white-custom fs-5">{selectedApi.endpoint}</code>
                <CopyToClipboard text={selectedApi.endpoint} onCopy={() => toast.success('Copied!')}>
                  <button className="btn p-1 text-muted-custom">
                    <Copy size={16} />
                  </button>
                </CopyToClipboard>
              </div>
              <p className="text-muted-custom mb-0">{selectedApi.description}</p>
            </div>

            {/* Tabs */}
            <div className="tab-nav-custom mb-4">
              <button
                onClick={() => setActiveTab('overview')}
                className={`tab-btn-custom ${activeTab === 'overview' ? 'active' : ''}`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('example')}
                className={`tab-btn-custom ${activeTab === 'example' ? 'active' : ''}`}
              >
                Example
              </button>
              <button
                onClick={() => setActiveTab('try-it')}
                className={`tab-btn-custom ${activeTab === 'try-it' ? 'active' : ''}`}
              >
                Try It
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="d-flex flex-column gap-4">
                <div className="glass-card p-4">
                  <h3 className="text-white-custom fw-semibold fs-5 mb-4">Request Fields</h3>
                  <div className="table-responsive">
                    <table className="table-dark-custom">
                      <thead>
                        <tr>
                          <th>Field</th>
                          <th>Type</th>
                          <th>Required</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedApi.requestFields.map((field, index) => (
                          <tr key={index}>
                            <td className="text-white-custom font-monospace">{field.field}</td>
                            <td>
                              <span className="badge-type">{field.type}</span>
                            </td>
                            <td>
                              {field.required ? (
                                <span className="badge-required">Yes</span>
                              ) : (
                                <span className="badge-optional">No</span>
                              )}
                            </td>
                            <td>{field.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="glass-card p-4">
                  <h3 className="text-white-custom fw-semibold fs-5 mb-4">Response Fields</h3>
                  <div className="table-responsive">
                    <table className="table-dark-custom">
                      <thead>
                        <tr>
                          <th>Field</th>
                          <th>Type</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedApi.responseFields.map((field, index) => (
                          <tr key={index}>
                            <td className="text-white-custom font-monospace">{field.field}</td>
                            <td>
                              <span className="badge-type" style={{backgroundColor: 'rgba(34,197,94,0.1)', color: 'var(--color-success)'}}>
                                {field.type}
                              </span>
                            </td>
                            <td>{field.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'example' && (
              <div className="d-flex flex-column gap-4">
                <div className="glass-card p-4">
                  <h3 className="text-white-custom fw-semibold fs-5 mb-4">Example Request</h3>
                  <div className="json-viewer-container">
                    <JsonViewer data={selectedApi.exampleRequest} />
                  </div>
                </div>
                <div className="glass-card p-4">
                  <h3 className="text-white-custom fw-semibold fs-5 mb-4">Example Response</h3>
                  <div className="json-viewer-container">
                    <JsonViewer data={selectedApi.exampleResponse} />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'try-it' && (
              <TryItPanel
                endpoint={selectedApi.endpoint}
                method={selectedApi.method}
                defaultRequest={selectedApi.exampleRequest}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsPage;