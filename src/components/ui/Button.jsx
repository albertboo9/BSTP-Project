import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { forwardRef } from 'react';

const variants = {
  primary: 'bg-primary-blue text-white hover:bg-blue-700 focus:ring-blue-500',
  secondary: 'bg-primary-green text-white hover:bg-green-700 focus:ring-green-500',
  outline: 'border-2 border-primary-blue text-primary-blue hover:bg-blue-50 focus:ring-blue-500',
  ghost: 'text-primary-blue hover:bg-blue-50 focus:ring-blue-500',
  danger: 'bg-state-error text-white hover:bg-red-700 focus:ring-red-500',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
  icon: 'p-3',
};

const Button = forwardRef(function Button(
  {
    children,
    variant = 'primary',
    size = 'md',
    icon: Icon,
    iconPosition = 'left',
    className,
    disabled = false,
    loading = false,
    fullWidth = false,
    ...props
  },
  ref
) {
  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      className={clsx(
        'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <motion.div
          className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-5 h-5 mr-2" />}
          {children}
          {Icon && iconPosition === 'right' && <Icon className="w-5 h-5 ml-2" />}
        </>
      )}
    </motion.button>
  );
});

export default Button;
