import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { forwardRef } from 'react';

const variants = {
  success: 'bg-green-100 text-green-700',
  warning: 'bg-amber-100 text-amber-700',
  info: 'bg-blue-100 text-blue-700',
  error: 'bg-red-100 text-red-700',
  neutral: 'bg-gray-100 text-gray-700',
};

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base',
};

const Badge = forwardRef(function Badge(
  {
    children,
    variant = 'neutral',
    size = 'md',
    icon: Icon,
    className,
    pulse = false,
  },
  ref
) {
  return (
    <motion.span
      ref={ref}
      initial={pulse ? { scale: [1, 1.1, 1] } : undefined}
      animate={pulse ? { scale: 1 } : undefined}
      transition={pulse ? { duration: 2, repeat: Infinity } : undefined}
      className={clsx(
        'inline-flex items-center gap-1 font-medium rounded-full',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {Icon && <Icon className="w-3.5 h-3.5" />}
      {children}
    </motion.span>
  );
});

export default Badge;
