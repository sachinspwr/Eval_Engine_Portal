// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth';
// import { getUserProfile } from '../api/evalApi';
// import {
//   Activity,
//   BookOpen,
//   Code2,
//   Clock,
//   ArrowRight,
//   Zap,
//   TrendingUp,
// } from 'lucide-react';
// import UsageRing from '../components/UsageRing';
// import TokenBox from '../components/TokenBox';
// import toast from 'react-hot-toast';

// const DashboardPage = () => {
//   const { user: cachedUser, loading: authLoading } = useAuth();
//   const navigate = useNavigate();
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const data = await getUserProfile();
//         setProfile(data);
//         localStorage.setItem('user', JSON.stringify(data));
//       } catch (error) {
//         toast.error('Failed to load profile');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   const user = profile || cachedUser;
//   const token = localStorage.getItem('accessToken');

//   if (authLoading || loading) {
//     return (
//       <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{paddingTop: '80px'}}>
//         <div className="spinner-custom" style={{width: '40px', height: '40px', borderWidth: '3px'}}></div>
//       </div>
//     );
//   }

//   if (!token) {
//     navigate('/register');
//     return null;
//   }

//   const hitsUsed = user?.hitsUsed || 0;
//   const hitsRemaining = user?.hitsRemaining || 10;
//   const dailyLimit = (user?.hitsUsed || 0) + (user?.hitsRemaining || 10);

//   return (
//     <div className="min-vh-100" style={{paddingTop: '100px', paddingBottom: '60px'}}>
//       <div className="container">
//         {/* Welcome */}
//         <div className="mb-5">
//           <h1 className="display-4 fw-bold text-white-custom mb-2">
//             Welcome back,{' '}
//             <span className="gradient-text">{user?.name || 'User'}</span>
//           </h1>
//           <p className="fs-5 text-muted-custom">
//             Here's your API usage overview
//           </p>
//         </div>

//         {/* Stats Grid */}
//         <div className="row g-4 mb-5">
//           <div className="col-lg-4">
//             <TokenBox token={token} />
//           </div>

//           <div className="col-lg-4">
//             <div className="glass-card p-4">
//               <h3 className="text-white-custom fw-semibold fs-5 mb-4">API Usage</h3>
//               <UsageRing used={hitsUsed} limit={dailyLimit} />
//               <div className="text-center mt-3">
//                 <p className="text-muted-custom small mb-1">
//                   {hitsRemaining} hits remaining today
//                 </p>
//                 <div className="d-flex align-items-center justify-content-center gap-1 text-muted-custom" style={{fontSize: '12px'}}>
//                   <Clock size={12} />
//                   <span>Resets tomorrow</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="col-lg-4">
//             <div className="glass-card p-4 d-flex flex-column gap-3">
//               <h3 className="text-white-custom fw-semibold fs-5 mb-2">Quick Stats</h3>
//               {[
//                 { icon: Activity, label: 'Total Requests Today', value: hitsUsed },
//                 { icon: Zap, label: 'Rate Limit', value: `${dailyLimit}/day` },
//                 { icon: TrendingUp, label: 'Account Status', value: dailyLimit <= 10 ? 'Free' : 'Pro' },
//               ].map((stat, index) => (
//                 <div key={index} className="d-flex align-items-center justify-content-between">
//                   <div className="d-flex align-items-center gap-2">
//                     <stat.icon size={16} className="text-muted-custom" />
//                     <span className="text-muted-custom small">{stat.label}</span>
//                   </div>
//                   <span className="text-white-custom small fw-medium">{stat.value}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Quick Links */}
//         <div className="row g-4 mb-5">
//           <div className="col-sm-6">
//             <button
//               onClick={() => navigate('/docs')}
//               className="glass-card p-4 w-100 border-0 text-start d-flex align-items-center justify-content-between"
//             >
//               <div className="d-flex align-items-center gap-3">
//                 <BookOpen size={24} className="text-primary-custom" />
//                 <div>
//                   <h3 className="text-white-custom fw-medium mb-1">API Documentation</h3>
//                   <p className="text-muted-custom small mb-0">Explore endpoints & examples</p>
//                 </div>
//               </div>
//               <ArrowRight size={20} className="text-muted-custom" />
//             </button>
//           </div>

//           <div className="col-sm-6">
//             <button
//               onClick={() => navigate('/docs')}
//               className="glass-card p-4 w-100 border-0 text-start d-flex align-items-center justify-content-between"
//             >
//               <div className="d-flex align-items-center gap-3">
//                 <Code2 size={24} className="text-success" />
//                 <div>
//                   <h3 className="text-white-custom fw-medium mb-1">Try It Live</h3>
//                   <p className="text-muted-custom small mb-0">Test API endpoints in browser</p>
//                 </div>
//               </div>
//               <ArrowRight size={20} className="text-muted-custom" />
//             </button>
//           </div>
//         </div>

//         {/* Recent Activity Placeholder */}
//         <div className="glass-card p-4 text-center">
//           <h3 className="text-white-custom fw-semibold fs-5 mb-4">Recent Activity</h3>
//           <div className="py-5">
//             <Activity size={48} className="text-muted-custom mb-3" style={{opacity: 0.3}} />
//             <p className="text-muted-custom mb-1">Activity tracking coming soon</p>
//             <p className="text-muted-custom small" style={{opacity: 0.5}}>
//               Monitor API calls and response times in real-time
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardPage;


import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { getClientByEmail } from '../api/evalApi';
import {
  Activity,
  BookOpen,
  Code2,
  Clock,
  ArrowRight,
  Zap,
  TrendingUp,
  Shield,
  Award,
  RefreshCw,
  Mail,
  User,
  Key,
} from 'lucide-react';
import UsageRing from '../components/UsageRing';
import TokenBox from '../components/TokenBox';
import toast from 'react-hot-toast';

const DashboardPage = () => {
  const { user: cachedUser, loading: authLoading, updateUser, refreshUserData } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchProfileData = async () => {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      setLoading(false);
      return;
    }

    try {
      const data = await getClientByEmail(userEmail);
      const updatedUser = {
        name: data.name,
        email: data.email,
        tier: data.tier || 'FREE',
        dailyLimit: data.dailyLimit || 10,
        hitsUsed: data.hitsUsed || 0,
        hitsRemaining: (data.dailyLimit || 10) - (data.hitsUsed || 0),
        accessToken: data.accessToken || localStorage.getItem('accessToken'),
      };
      
      updateUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      localStorage.setItem('accessToken', updatedUser.accessToken);
    } catch (error) {
      console.error('Failed to load profile:', error);
      toast.error('Failed to load profile data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await refreshUserData();
      await fetchProfileData();
      toast.success('Dashboard refreshed!');
    } catch (error) {
      toast.error('Failed to refresh data');
      setRefreshing(false);
    }
  };

  const user = cachedUser;
  const token = localStorage.getItem('accessToken');

  if (authLoading || loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{paddingTop: '80px'}}>
        <div className="text-center">
          <div className="spinner-custom mb-3" style={{width: '48px', height: '48px', borderWidth: '3px'}}></div>
          <p className="text-muted-custom">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!token) {
    navigate('/register');
    return null;
  }

  const hitsUsed = user?.hitsUsed || 0;
  const dailyLimit = user?.dailyLimit || 10;
  const hitsRemaining = user?.hitsRemaining || (dailyLimit - hitsUsed);
  const usagePercentage = dailyLimit > 0 ? (hitsUsed / dailyLimit) * 100 : 0;

  return (
    <div className="min-vh-100" style={{paddingTop: '100px', paddingBottom: '60px'}}>
      <div className="container">
        {/* Welcome & Refresh */}
        <div className="d-flex flex-wrap align-items-center justify-content-between mb-5">
          <div>
            <h1 className="display-4 fw-bold text-white-custom mb-2 d-flex align-items-center gap-2">
              Welcome back,{' '}
              <span className="gradient-text">{user?.name || 'User'}</span>
              <span className="wave-emoji">👋</span>
            </h1>
            <p className="fs-5 text-muted-custom mb-0">
              Here's your API usage overview
            </p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="btn d-flex align-items-center gap-2"
            style={{
              border: '1px solid var(--border-color)',
              color: 'var(--text-muted)',
              borderRadius: '12px',
              padding: '10px 20px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = 'var(--color-primary)';
              e.target.style.color = 'var(--color-primary-light)';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = 'var(--border-color)';
              e.target.style.color = 'var(--text-muted)';
            }}
          >
            <RefreshCw size={16} className={refreshing ? 'spin' : ''} 
                       style={refreshing ? {animation: 'spin 1s linear infinite'} : {}} />
            <span>{refreshing ? 'Refreshing...' : 'Refresh Data'}</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="row g-4 mb-5">
          {/* Token Card */}
          <div className="col-lg-4">
            <TokenBox token={token} />
          </div>

          {/* Usage Stats */}
          <div className="col-lg-4">
            <div className="glass-card p-4 h-100">
              <h3 className="text-white-custom fw-semibold fs-5 mb-4">API Usage</h3>
              <UsageRing used={hitsUsed} limit={dailyLimit} />
              <div className="text-center mt-3">
                <p className="text-muted-custom small mb-1">
                  {hitsRemaining} hits remaining today
                </p>
                <div className="d-flex align-items-center justify-content-center gap-1 text-muted-custom" style={{fontSize: '12px'}}>
                  <Clock size={12} />
                  <span>Resets tomorrow</span>
                </div>
              </div>
              <div className="mt-3">
                <div className="d-flex justify-content-between small mb-1">
                  <span className="text-muted-custom">Usage</span>
                  <span className="text-white-custom">{usagePercentage.toFixed(0)}%</span>
                </div>
                <div className="progress" style={{height: '6px', backgroundColor: 'var(--border-color)', borderRadius: '3px'}}>
                  <div 
                    className="progress-bar" 
                    style={{
                      width: `${usagePercentage}%`,
                      backgroundColor: usagePercentage >= 90 ? 'var(--color-danger)' : 
                                     usagePercentage >= 70 ? 'var(--color-warning)' : 'var(--color-success)',
                      transition: 'width 1s ease',
                      borderRadius: '3px'
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Account Details */}
          <div className="col-lg-4">
            <div className="glass-card p-4 h-100 d-flex flex-column gap-3">
              <h3 className="text-white-custom fw-semibold fs-5 mb-2">Account Details</h3>
              
              <div className="d-flex align-items-center justify-content-between p-2 rounded-3" 
                   style={{background: 'rgba(99,102,241,0.05)'}}>
                <div className="d-flex align-items-center gap-2">
                  <User size={14} className="text-primary-custom" />
                  <span className="text-muted-custom small">Name</span>
                </div>
                <span className="text-white-custom small fw-medium">{user?.name || 'N/A'}</span>
              </div>

              <div className="d-flex align-items-center justify-content-between p-2 rounded-3" 
                   style={{background: 'rgba(99,102,241,0.05)'}}>
                <div className="d-flex align-items-center gap-2">
                  <Mail size={14} className="text-primary-custom" />
                  <span className="text-muted-custom small">Email</span>
                </div>
                <span className="text-white-custom small fw-medium" 
                      style={{maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                  {user?.email || 'N/A'}
                </span>
              </div>

              <div className="d-flex align-items-center justify-content-between p-2 rounded-3" 
                   style={{background: 'rgba(99,102,241,0.05)'}}>
                <div className="d-flex align-items-center gap-2">
                  <Award size={14} className="text-primary-custom" />
                  <span className="text-muted-custom small">Tier</span>
                </div>
                <span className={`badge ${user?.tier === 'PRO' ? 'bg-primary' : 'bg-success'}`}>
                  {user?.tier || 'FREE'}
                </span>
              </div>

              <div className="d-flex align-items-center justify-content-between p-2 rounded-3" 
                   style={{background: 'rgba(99,102,241,0.05)'}}>
                <div className="d-flex align-items-center gap-2">
                  <Activity size={14} className="text-primary-custom" />
                  <span className="text-muted-custom small">Daily Limit</span>
                </div>
                <span className="text-white-custom small fw-medium">{dailyLimit} requests</span>
              </div>

              <div className="d-flex align-items-center justify-content-between p-2 rounded-3" 
                   style={{background: 'rgba(99,102,241,0.05)'}}>
                <div className="d-flex align-items-center gap-2">
                  <Zap size={14} className="text-primary-custom" />
                  <span className="text-muted-custom small">Used Today</span>
                </div>
                <span className="text-white-custom small fw-medium">{hitsUsed}</span>
              </div>

              <div className="d-flex align-items-center justify-content-between p-2 rounded-3" 
                   style={{background: 'rgba(99,102,241,0.05)'}}>
                <div className="d-flex align-items-center gap-2">
                  <Key size={14} className="text-primary-custom" />
                  <span className="text-muted-custom small">Token Status</span>
                </div>
                <span className="badge bg-success">Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="row g-4 mb-5">
          <div className="col-sm-6">
            <button
              onClick={() => navigate('/docs')}
              className="glass-card p-4 w-100 border-0 text-start d-flex align-items-center justify-content-between"
            >
              <div className="d-flex align-items-center gap-3">
                <BookOpen size={24} className="text-primary-custom" />
                <div>
                  <h3 className="text-white-custom fw-medium mb-1">API Documentation</h3>
                  <p className="text-muted-custom small mb-0">Explore endpoints & examples</p>
                </div>
              </div>
              <ArrowRight size={20} className="text-muted-custom" />
            </button>
          </div>

          <div className="col-sm-6">
            <button
              onClick={() => navigate('/docs')}
              className="glass-card p-4 w-100 border-0 text-start d-flex align-items-center justify-content-between"
            >
              <div className="d-flex align-items-center gap-3">
                <Code2 size={24} className="text-success" />
                <div>
                  <h3 className="text-white-custom fw-medium mb-1">Try It Live</h3>
                  <p className="text-muted-custom small mb-0">Test API endpoints in browser</p>
                </div>
              </div>
              <ArrowRight size={20} className="text-muted-custom" />
            </button>
          </div>
        </div>

        {/* Full User Info Summary */}
        {user && (
          <div className="glass-card p-4 mb-4">
            <h3 className="text-white-custom fw-semibold fs-5 mb-3">Session Information</h3>
            <div className="row g-3">
              <div className="col-md-6">
                <small className="text-muted-custom d-block mb-1">Access Token</small>
                <code className="text-white-custom small d-block p-2 rounded-2" 
                      style={{background: 'rgba(15,15,26,0.5)', wordBreak: 'break-all'}}>
                  {token}
                </code>
              </div>
              <div className="col-md-3">
                <small className="text-muted-custom d-block mb-1">Account Tier</small>
                <span className={`badge fs-6 ${user?.tier === 'PRO' ? 'bg-primary' : 'bg-success'}`}>
                  {user?.tier || 'FREE'}
                </span>
              </div>
              <div className="col-md-3">
                <small className="text-muted-custom d-block mb-1">Status</small>
                <span className="badge bg-success fs-6">Active</span>
              </div>
            </div>
          </div>
        )}

        {/* Recent Activity Placeholder */}
        <div className="glass-card p-4 text-center">
          <h3 className="text-white-custom fw-semibold fs-5 mb-4">Recent API Activity</h3>
          <div className="py-5">
            <Activity size={48} className="text-muted-custom mb-3" style={{opacity: 0.3}} />
            <p className="text-muted-custom mb-1">Activity tracking coming soon</p>
            <p className="text-muted-custom small" style={{opacity: 0.5}}>
              Monitor your API calls and response times in real-time
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;