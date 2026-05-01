import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  ListChecks,
  ToggleLeft,
  PenTool,
  FileText,
  Code2,
  Sparkles,
  Zap,
  Shield,
  Globe,
  Key,
} from 'lucide-react';
import FeatureCard from '../components/FeatureCard';
import ApiCard from '../components/ApiCard';

const features = [
  { icon: ListChecks, title: 'Single Choice', description: 'Evaluate single-choice questions with precise answer matching and partial credit options.' },
  { icon: CheckCircle2, title: 'Multiple Choice', description: 'Handle multiple correct answers with configurable scoring for each option.' },
  { icon: ToggleLeft, title: 'True/False', description: 'Instant binary evaluation with confidence scoring and explanation generation.' },
  { icon: PenTool, title: 'Fill in the Blanks', description: 'Smart blank detection with fuzzy matching for typo-tolerant grading.' },
  { icon: FileText, title: 'Essay/NLP', description: 'Advanced NLP analysis for essays with grammar, coherence, and content scoring.' },
  { icon: Code2, title: 'Coding with Test Cases', description: 'Execute code against test cases with performance metrics and code quality analysis.' },
];

const apiCards = [
  {
    method: 'POST',
    endpoint: '/api/eval/question',
    description: 'Evaluate a single question of any type',
  },
  {
    method: 'POST',
    endpoint: '/api/eval/text',
    description: 'Evaluate text or essay content with NLP',
  },
  {
    method: 'POST',
    endpoint: '/api/eval/test',
    description: 'Evaluate complete tests with multiple questions',
  },
];

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-vh-100">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg-gradient"></div>
        <div className="hero-radial-bg"></div>
        
        <div className="container position-relative" style={{ zIndex: 10, paddingTop: '80px', paddingBottom: '80px' }}>
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <h1 className="display-3 fw-bold text-white-custom mb-4 lh-1">
                Evaluate Answers.
                <br />
                <span className="gradient-text">Instantly.</span>
              </h1>
              <p className="fs-5 text-muted-custom mb-5 lh-base">
                AI-powered answer evaluation API for developers. Grade multiple question 
                types with precision and speed. Built for scale, designed for simplicity.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3">
                <button
                  onClick={() => navigate('/register')}
                  className="btn btn-glow d-flex align-items-center justify-content-center gap-2 fs-5"
                >
                  <Key size={20} />
                  <span>Get Free API Key</span>
                </button>
                <button
                  onClick={() => navigate('/docs')}
                  className="btn btn-outline-custom d-flex align-items-center justify-content-center gap-2 fs-5"
                >
                  <ArrowRight size={20} />
                  <span>View Docs</span>
                </button>
              </div>
            </div>

            <div className="col-lg-6 d-none d-lg-block">
              <div className="code-preview-card">
                <div className="code-dots">
                  <div className="code-dot red"></div>
                  <div className="code-dot yellow"></div>
                  <div className="code-dot green"></div>
                </div>
                <pre className="mb-0">
                  <code className="text-white-custom" style={{fontSize: '14px'}}>
{`{
  "questionType": "SINGLE_CHOICE",
  "question": "Capital of France?",
  "answerOptions": "Paris,London,HongKong,Mexico",
  "userAnswer": "Paris",
  "correctAnswer": "Paris"
}

Response:
{
  "isCorrect": true,
  "feedback": "Correct!",
  "timeTaken": "0.45s",
  "score": 10.00,
  "maxScore": 10.00,
  "gradingStatus": "COMPLETED",
  "gradingMethod": "AUTO",
}`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', backgroundColor: 'rgba(17,17,24,0.5)'}}>
        <div className="container py-5">
          <div className="row g-4">
            {[
              { icon: Zap, label: 'Response Time', value: '< 500ms' },
              { icon: Shield, label: 'Uptime', value: '99.9%' },
              { icon: Globe, label: 'Question Types', value: '6+' },
              { icon: Sparkles, label: 'Accuracy', value: '98%' },
            ].map((stat, index) => (
              <div key={index} className="col-6 col-md-3">
                <div className="stat-card">
                  <stat.icon size={32} className="text-primary-custom mb-2" />
                  <div className="stat-value">{stat.value}</div>
                  <div className="text-muted-custom small">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <div className="container py-5">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-white-custom mb-3">
              All Question Types Covered
            </h2>
            <p className="fs-5 text-muted-custom mx-auto" style={{maxWidth: '700px'}}>
              From simple true/false to complex coding challenges, 
              our engine handles it all.
            </p>
          </div>

          <div className="row g-4">
            {features.map((feature, index) => (
              <div key={index} className="col-md-6 col-lg-4">
                <FeatureCard {...feature} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-5" style={{backgroundColor: 'rgba(17,17,24,0.3)'}}>
        <div className="container py-5">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-white-custom mb-3">How It Works</h2>
            <p className="fs-5 text-muted-custom">Get started in three simple steps</p>
          </div>

          <div className="row g-4">
            {[
              {
                step: '01',
                title: 'Register & Get Token',
                description: 'Sign up with your name and email. Get your unique API token instantly.',
                icon: Key,
              },
              {
                step: '02',
                title: 'Send Answer Payload',
                description: 'Make a POST request with question details and user answer.',
                icon: ({size, className}) => (
                  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
                    <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" />
                  </svg>
                ),
              },
              {
                step: '03',
                title: 'Get Graded Result',
                description: 'Receive instant evaluation with scores, feedback, and analysis.',
                icon: Sparkles,
              },
            ].map((item, index) => (
              <div key={index} className="col-md-4">
                <div className="step-card">
                  <div className="step-number">{item.step}</div>
                  <item.icon size={48} className="text-primary-custom mb-3" />
                  <h3 className="text-white-custom fw-semibold fs-5 mb-2">{item.title}</h3>
                  <p className="text-muted-custom mb-0">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API Overview Section */}
      <section className="py-5">
        <div className="container py-5">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-white-custom mb-3">API Endpoints</h2>
            <p className="fs-5 text-muted-custom">Powerful endpoints for every use case</p>
          </div>

          <div className="row g-4">
            {apiCards.map((card, index) => (
              <div key={index} className="col-md-4">
                <ApiCard
                  {...card}
                  onClick={() => navigate('/docs')}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-5" style={{backgroundColor: 'rgba(17,17,24,0.3)'}}>
        <div className="container py-5">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-white-custom mb-3">Simple Pricing</h2>
            <p className="fs-5 text-muted-custom">Start free, scale as you grow</p>
          </div>

          <div className="row g-4 justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="pricing-card featured" onClick={() => navigate('/register')} style={{cursor: 'pointer'}}>
                <h3 className="fs-4 fw-bold text-white-custom mb-2">Free</h3>
                <p className="text-muted-custom mb-4">Perfect for testing and small projects</p>
                <div className="gradient-text fs-1 fw-bold mb-4">$0</div>
                <ul className="list-unstyled mb-4">
                  <li className="d-flex align-items-center gap-2 text-white-custom mb-2">
                    <CheckCircle2 size={20} className="text-success" />
                    <span>10 hits per day</span>
                  </li>
                  <li className="d-flex align-items-center gap-2 text-white-custom mb-2">
                    <CheckCircle2 size={20} className="text-success" />
                    <span>All question types</span>
                  </li>
                  <li className="d-flex align-items-center gap-2 text-white-custom mb-2">
                    <CheckCircle2 size={20} className="text-success" />
                    <span>Basic analytics</span>
                  </li>
                </ul>
                <button className="btn btn-glow w-100">Get Started Free</button>
              </div>
            </div>

            <div className="col-md-6 col-lg-5">
              <div className="pricing-card opacity-50" style={{pointerEvents: 'none'}}>
                <span className="badge bg-primary mb-3">COMING SOON</span>
                <h3 className="fs-4 fw-bold text-white-custom mb-2">Pro</h3>
                <p className="text-muted-custom mb-4">For production applications</p>
                <div className="text-white-custom fs-1 fw-bold mb-4">$29/mo</div>
                <ul className="list-unstyled mb-4">
                  <li className="d-flex align-items-center gap-2 text-muted-custom mb-2">
                    <CheckCircle2 size={20} />
                    <span>Unlimited requests</span>
                  </li>
                  <li className="d-flex align-items-center gap-2 text-muted-custom mb-2">
                    <CheckCircle2 size={20} />
                    <span>Priority support</span>
                  </li>
                  <li className="d-flex align-items-center gap-2 text-muted-custom mb-2">
                    <CheckCircle2 size={20} />
                    <span>Advanced analytics</span>
                  </li>
                </ul>
                <button className="btn btn-outline-custom w-100" disabled>Coming Soon</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;