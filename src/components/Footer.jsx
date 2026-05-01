import { Code2, Github, Twitter, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer-custom">
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-md-6">
            <div className="d-flex align-items-center gap-2 mb-3">
              <Code2 size={24} className="text-primary-custom" />
              <span className="gradient-text fw-bold fs-5">EvalEngine</span>
            </div>
            <p className="text-muted-custom small mb-3">
              AI-powered answer evaluation API for developers. 
              Grade single choice, multiple choice, true/false, fill-in-the-blanks, 
              essays, and coding questions instantly.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-muted-custom footer-link">
                <Github size={20} />
              </a>
              <a href="#" className="text-muted-custom footer-link">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div className="col-md-3">
            <h3 className="text-white-custom fw-semibold fs-6 mb-3">Resources</h3>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" className="footer-link">Documentation</a></li>
              <li className="mb-2"><a href="#" className="footer-link">API Reference</a></li>
              <li className="mb-2"><a href="#" className="footer-link">Guides</a></li>
              <li className="mb-2"><a href="#" className="footer-link">Examples</a></li>
            </ul>
          </div>

          {/* <div className="col-md-3">
            <h3 className="text-white-custom fw-semibold fs-6 mb-3">Built With</h3>
            <ul className="list-unstyled">
              <li className="text-muted-custom small mb-2 d-flex align-items-center gap-2">
                <span className="d-inline-block rounded-circle" style={{width: '8px', height: '8px', backgroundColor: 'var(--color-success)'}}></span>
                Spring Boot
              </li>
              <li className="text-muted-custom small mb-2 d-flex align-items-center gap-2">
                <span className="d-inline-block rounded-circle" style={{width: '8px', height: '8px', backgroundColor: 'var(--color-primary)'}}></span>
                React + Vite
              </li>
              <li className="text-muted-custom small mb-2 d-flex align-items-center gap-2">
                <span className="d-inline-block rounded-circle" style={{width: '8px', height: '8px', backgroundColor: 'var(--color-warning)'}}></span>
                MySQL
              </li>
            </ul>
          </div> */}
        </div>

        <hr className="my-4" style={{borderColor: 'var(--border-color)'}} />
        
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center">
          <p className="text-muted-custom small mb-2 mb-sm-0">
            © 2026 EvalEngine. All rights reserved.
          </p>
          <p className="text-muted-custom small d-flex align-items-center gap-1">
            Made with <Heart size={14} className="text-danger" /> By Sachin
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;