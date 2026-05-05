// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { User, Mail, Key, Sparkles, Code2, Zap, Shield } from 'lucide-react';
// import confetti from 'canvas-confetti';
// import toast from 'react-hot-toast';
// import { registerUser } from '../api/evalApi';
// import TokenBox from '../components/TokenBox';

// const RegisterPage = () => {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ name: '', email: '' });
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [token, setToken] = useState(null);

//   const validateForm = () => {
//     const newErrors = {};
//     if (!form.name.trim()) newErrors.name = 'Name is required';
//     if (!form.email.trim()) newErrors.email = 'Email is required';
//     else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email format';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setLoading(true);
//     try {
//       const data = await registerUser(form.name, form.email);
//       setToken(data.accessToken);
//       localStorage.setItem('accessToken', data.accessToken);
//       localStorage.setItem('user', JSON.stringify(data.user || { name: form.name, email: form.email }));
      
//       confetti({
//         particleCount: 100,
//         spread: 70,
//         origin: { y: 0.6 },
//         colors: ['#6366f1', '#22c55e', '#f59e0b', '#ef4444'],
//       });
      
//       toast.success('Token generated successfully!');
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Registration failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-vh-100 d-flex align-items-center" style={{paddingTop: '80px'}}>
//       <div className="container py-5">
//         <div className="row g-5 align-items-start">
//           {/* Left Side - Info */}
//           <div className="col-lg-6">
//             <div className="mb-5">
//               <h1 className="display-4 fw-bold text-white-custom mb-3">
//                 Get Your
//                 <span className="gradient-text"> API Key</span>
//               </h1>
//               <p className="fs-5 text-muted-custom">
//                 Start evaluating answers instantly with our powerful API.
//                 Free tier includes 10 hits per day with all question types.
//               </p>
//             </div>

//             <div className="d-flex flex-column gap-3">
//               {[
//                 { icon: Zap, title: 'Instant Setup', description: 'Get your token in seconds' },
//                 { icon: Shield, title: 'Secure Access', description: 'Token-based authentication' },
//                 { icon: Code2, title: 'Developer Ready', description: 'Copy & paste integration' },
//               ].map((item, index) => (
//                 <div key={index} className="glass-card p-3 d-flex align-items-start gap-3">
//                   <div className="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0" 
//                        style={{width: '40px', height: '40px', backgroundColor: 'rgba(99,102,241,0.1)'}}>
//                     <item.icon size={20} className="text-primary-custom" />
//                   </div>
//                   <div>
//                     <h3 className="text-white-custom fw-medium mb-1">{item.title}</h3>
//                     <p className="text-muted-custom small mb-0">{item.description}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Right Side - Form */}
//           <div className="col-lg-6">
//             {!token ? (
//               <div className="glass-card p-4 p-md-5">
//                 <div className="d-flex align-items-center gap-3 mb-4">
//                   <div className="d-flex align-items-center justify-content-center rounded-3"
//                        style={{width: '40px', height: '40px', backgroundColor: 'rgba(99,102,241,0.1)'}}>
//                     <Key size={20} className="text-primary-custom" />
//                   </div>
//                   <h2 className="text-white-custom fw-bold fs-3 mb-0">Register</h2>
//                 </div>

//                 <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
//                   <div>
//                     <label className="form-label text-muted-custom small fw-medium">Full Name</label>
//                     <div className="input-icon-wrapper">
//                       <User size={18} className="input-icon" />
//                       <input
//                         type="text"
//                         value={form.name}
//                         onChange={(e) => setForm({ ...form, name: e.target.value })}
//                         className={`form-control form-control-dark with-icon ${errors.name ? 'is-invalid' : ''}`}
//                         placeholder="John Doe"
//                       />
//                     </div>
//                     {errors.name && <div className="text-danger small mt-1">{errors.name}</div>}
//                   </div>

//                   <div>
//                     <label className="form-label text-muted-custom small fw-medium">Email Address</label>
//                     <div className="input-icon-wrapper">
//                       <Mail size={18} className="input-icon" />
//                       <input
//                         type="email"
//                         value={form.email}
//                         onChange={(e) => setForm({ ...form, email: e.target.value })}
//                         className={`form-control form-control-dark with-icon ${errors.email ? 'is-invalid' : ''}`}
//                         placeholder="john@example.com"
//                       />
//                     </div>
//                     {errors.email && <div className="text-danger small mt-1">{errors.email}</div>}
//                   </div>

//                   <button
//                     type="submit"
//                     disabled={loading}
//                     className="btn btn-glow w-100 d-flex align-items-center justify-content-center gap-2 mt-2"
//                   >
//                     {loading ? (
//                       <>
//                         <span className="spinner-custom"></span>
//                         <span>Generating...</span>
//                       </>
//                     ) : (
//                       <>
//                         <Sparkles size={20} />
//                         <span>Generate Token</span>
//                       </>
//                     )}
//                   </button>
//                 </form>
//               </div>
//             ) : (
//               <div className="d-flex flex-column gap-4">
//                 <TokenBox token={token} />
                
//                 <button
//                   onClick={() => navigate('/dashboard')}
//                   className="btn w-100 d-flex align-items-center justify-content-center gap-2"
//                   style={{
//                     border: '1px solid var(--color-primary)',
//                     color: 'var(--color-primary)',
//                     borderRadius: '12px',
//                     padding: '12px 24px',
//                     fontWeight: 600,
//                     transition: 'all 0.3s ease'
//                   }}
//                   onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(99,102,241,0.1)'}
//                   onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
//                 >
//                   <Sparkles size={20} />
//                   <span>Go to Dashboard</span>
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;

import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { User, Mail, Key, Sparkles, Code2, Zap, Shield, LogIn } from 'lucide-react';
import confetti from 'canvas-confetti';
import toast from 'react-hot-toast';
import { registerUser, getClientByEmail } from '../api/evalApi';
import { session } from '../hooks/useAuth';
import TokenBox from '../components/TokenBox';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isExistingUser, setIsExistingUser] = useState(false);

  // Check if user already has an active session
  useEffect(() => {
    const email = session.getEmail();
    const name = session.getName();
    const token = session.getToken();

    if (!session.isExpired() && email) {
      // Session is valid — show welcome back and redirect
      setToken(token || '(restoring...)');
      setUserData({ name: name || '', email });
      setIsExistingUser(true);

      const timer = setTimeout(() => navigate('/dashboard'), 2000);
      return () => clearTimeout(timer);
    }

    // Pre-fill email from URL params if exists
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setForm(prev => ({ ...prev, email: emailParam }));
    }
  }, [navigate, searchParams]);

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email format';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Step 1: Register/Login user
      const data = await registerUser(form.name, form.email);
      
      // Step 2: Fetch complete user data from /auth/client endpoint
      const clientData = await getClientByEmail(form.email);
      
      // Step 3: Combine and store all user data
      const userProfile = {
        name: clientData.name || data.name || form.name,
        email: clientData.email || data.email || form.email,
        tier: clientData.tier || data.tier || 'FREE',
        dailyLimit: clientData.dailyLimit || data.dailyLimit || 10,
        hitsUsed: clientData.hitsUsed || data.hitsUsed || 0,
        hitsRemaining: (clientData.dailyLimit || 10) - (clientData.hitsUsed || 0),
        accessToken: clientData.accessToken || data.accessToken,
      };

      // Save using secure session layer
      session.setToken(userProfile.accessToken);          // sessionStorage — clears on browser close
      session.setIdentity(userProfile.email, userProfile.name); // localStorage — only email+name for auto-login

      // Set state for display
      setToken(userProfile.accessToken);
      setUserData(userProfile);
      
      // Trigger confetti
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#22c55e', '#f59e0b', '#ef4444'],
      });
      
      toast.success('Login successful! Redirecting to dashboard...');
      
      // Auto-redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
      
    } catch (error) {
      console.error('Registration/Login error:', error);
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.data?.message || 
                          'Registration failed';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // If user already logged in, show welcome back screen
  if (isExistingUser && userData) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{paddingTop: '80px'}}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="glass-card p-5 text-center">
                <div className="mb-4">
                  <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                       style={{width: '80px', height: '80px', background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(34,197,94,0.2))'}}>
                    <Shield size={40} className="text-primary-custom" />
                  </div>
                  <h2 className="text-white-custom fw-bold fs-3 mb-2">Welcome Back!</h2>
                  <p className="text-muted-custom mb-0">You're already logged in as</p>
                  <h3 className="gradient-text fs-4 mt-1">{userData.name}</h3>
                  <p className="text-muted-custom small">{userData.email}</p>
                </div>

                <div className="glass-card p-3 mb-4">
                  <div className="row g-2">
                    <div className="col-6">
                      <div className="p-2 rounded-3" style={{background: 'rgba(99,102,241,0.1)'}}>
                        <small className="text-muted-custom d-block">Tier</small>
                        <span className={`badge ${userData.tier === 'PRO' ? 'bg-primary' : 'bg-success'} mt-1`}>
                          {userData.tier}
                        </span>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="p-2 rounded-3" style={{background: 'rgba(34,197,94,0.1)'}}>
                        <small className="text-muted-custom d-block">Used Today</small>
                        <span className="text-white-custom fw-bold d-block mt-1">
                          {userData.hitsUsed}/{userData.dailyLimit}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-muted-custom small mb-4">
                  Redirecting to dashboard...
                </p>

                <div className="d-flex gap-3">
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="btn btn-glow flex-grow-1 d-flex align-items-center justify-content-center gap-2"
                  >
                    <Sparkles size={20} />
                    <span>Go to Dashboard</span>
                  </button>
                  <button
                    onClick={() => {
                      session.clearAll();
                      setIsExistingUser(false);
                      setToken(null);
                      setUserData(null);
                    }}
                    className="btn btn-outline-custom d-flex align-items-center justify-content-center gap-2"
                  >
                    <LogIn size={20} />
                    <span>Login as Different User</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 d-flex align-items-center" style={{paddingTop: '80px'}}>
      <div className="container py-5">
        <div className="row g-5 align-items-start">
          {/* Left Side - Info */}
          <div className="col-lg-6">
            <div className="mb-5">
              <h1 className="display-4 fw-bold text-white-custom mb-3">
                Get Your
                <span className="gradient-text"> API Key</span>
              </h1>
              <p className="fs-5 text-muted-custom">
                Register or login to get instant access. Your API key will be 
                generated and you can start evaluating answers immediately.
              </p>
            </div>

            <div className="d-flex flex-column gap-3">
              {[
                { icon: Zap, title: 'Instant Access', description: 'Register or login in seconds' },
                { icon: Shield, title: 'Secure Authentication', description: 'Token-based API access' },
                { icon: Code2, title: 'Developer Ready', description: 'Copy & paste integration' },
              ].map((item, index) => (
                <div key={index} className="glass-card p-3 d-flex align-items-start gap-3">
                  <div className="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0" 
                       style={{width: '40px', height: '40px', backgroundColor: 'rgba(99,102,241,0.1)'}}>
                    <item.icon size={20} className="text-primary-custom" />
                  </div>
                  <div>
                    <h3 className="text-white-custom fw-medium mb-1">{item.title}</h3>
                    <p className="text-muted-custom small mb-0">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="col-lg-6">
            <div className="glass-card p-4 p-md-5">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="d-flex align-items-center justify-content-center rounded-3"
                     style={{width: '40px', height: '40px', backgroundColor: 'rgba(99,102,241,0.1)'}}>
                  <Key size={20} className="text-primary-custom" />
                </div>
                <div>
                  <h2 className="text-white-custom fw-bold fs-3 mb-0">Register / Login</h2>
                  <p className="text-muted-custom small mb-0">Enter your details to continue</p>
                </div>
              </div>

              <div className="alert-custom mb-4 p-3 rounded-3" style={{background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)'}}>
                <div className="d-flex gap-2">
                  <Zap size={16} className="text-primary-custom flex-shrink-0 mt-1" />
                  <p className="text-muted-custom small mb-0">
                    <strong className="text-white-custom">Already have an account?</strong> Just enter your 
                    email and name to login and retrieve your existing API key.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                <div>
                  <label className="form-label text-muted-custom small fw-medium">Full Name</label>
                  <div className="input-icon-wrapper">
                    <User size={18} className="input-icon" />
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={`form-control form-control-dark with-icon ${errors.name ? 'is-invalid' : ''}`}
                      placeholder="John Doe"
                      autoComplete="name"
                    />
                  </div>
                  {errors.name && <div className="text-danger small mt-1">{errors.name}</div>}
                </div>

                <div>
                  <label className="form-label text-muted-custom small fw-medium">Email Address</label>
                  <div className="input-icon-wrapper">
                    <Mail size={18} className="input-icon" />
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={`form-control form-control-dark with-icon ${errors.email ? 'is-invalid' : ''}`}
                      placeholder="john@example.com"
                      autoComplete="email"
                    />
                  </div>
                  {errors.email && <div className="text-danger small mt-1">{errors.email}</div>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-glow w-100 d-flex align-items-center justify-content-center gap-2 mt-2 py-3"
                >
                  {loading ? (
                    <>
                      <span className="spinner-custom"></span>
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <LogIn size={20} />
                      <span>Continue</span>
                    </>
                  )}
                </button>

                <p className="text-muted-custom small text-center mb-0">
                  By continuing, you agree to our Terms of Service and Privacy Policy.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;