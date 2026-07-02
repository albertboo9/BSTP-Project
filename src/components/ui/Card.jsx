import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { forwardRef } from 'react';

const Card = forwardRef(function Card(
  {
    children,
    className,
    hover = false,
    padding = 'md',
    onClick,
    ...props
  },
  ref
) {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  
  const Component = hover ? motion.div : 'div';
  const hoverProps = hover ? {
    whileHover: { y: -4, shadow: '0 20px 40px -15px rgba(0, 0, 0, 0.15)' },
    transition: { duration: 0.2 },
  } : {};
  
  return (
    <Component
      ref={ref}
      className={clsx(
        'bg-white rounded-2xl shadow-soft border border-gray-100',
        paddingClasses[padding],
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      {...hoverProps}
      {...props}
    >
      {children}
    </Component>
  );
});

export default Card;
