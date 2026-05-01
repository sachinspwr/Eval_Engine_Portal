import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const UsageRing = ({ used, limit }) => {
  const percentage = (used / limit) * 100;
  
  const getColor = () => {
    if (percentage >= 90) return '#ef4444';
    if (percentage >= 70) return '#f59e0b';
    return '#22c55e';
  };

  return (
    <div className="d-flex justify-content-center">
      <div style={{ width: '128px', height: '128px' }}>
        <CircularProgressbar
          value={percentage}
          text={`${used}/${limit}`}
          styles={buildStyles({
            textColor: '#f1f5f9',
            pathColor: getColor(),
            trailColor: '#1e1e2e',
            textSize: '24px',
            pathTransitionDuration: 1,
          })}
        />
      </div>
    </div>
  );
};

export default UsageRing;