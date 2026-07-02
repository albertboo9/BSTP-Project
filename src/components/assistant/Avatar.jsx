import { motion } from 'framer-motion';
import { clsx } from 'clsx';

const stateColors = {
  idle: '#1E3A5F',
  welcome: '#2E7D32',
  waiting: '#F9A825',
  success: '#27AE60',
};

const stateExpressions = {
  idle: { eyeOpen: true, smile: true },
  welcome: { eyeOpen: true, smile: true },
  waiting: { eyeOpen: true, smile: false },
  success: { eyeOpen: true, smile: true },
};

function Avatar({ state = 'idle', size = 'md', showPulse = true }) {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
    xl: 'w-28 h-28',
  };

  const currentColor = stateColors[state] || stateColors.idle;
  const expression = stateExpressions[state] || stateExpressions.idle;

  return (
    <div className={clsx('relative', sizeClasses[size])}>
      {/* Pulse ring */}
      {showPulse && (
        <motion.div
          className="absolute inset-0 rounded-full border-2"
          style={{ borderColor: currentColor }}
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
        />
      )}
      
      {/* Main avatar */}
      <motion.div
        className="relative rounded-full flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: currentColor }}
        animate={{
          y: [0, -2, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Face */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Head */}
          <circle cx="50" cy="35" r="28" fill="white" fillOpacity="0.2" />
          
          {/* Eyes */}
          <motion.circle
            cx="38"
            cy="32"
            r="4"
            fill="white"
            animate={expression.eyeOpen ? { scaleY: [1, 0.1, 1] } : {}}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.circle
            cx="62"
            cy="32"
            r="4"
            fill="white"
            animate={expression.eyeOpen ? { scaleY: [1, 0.1, 1] } : {}}
            transition={{ duration: 4, repeat: Infinity, delay: 0.2 }}
          />
          
          {/* Smile */}
          {expression.smile ? (
            <motion.path
              d="M35 48 Q50 58 65 48"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5 }}
            />
          ) : (
            <line
              x1="40"
              y1="50"
              x2="60"
              y2="50"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
            />
          )}
        </svg>
      </motion.div>
    </div>
  );
}

export default Avatar;
