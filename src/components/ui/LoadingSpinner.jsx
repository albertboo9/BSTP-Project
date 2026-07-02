import { motion } from "framer-motion";

function LoadingSpinner({ size = "md", color = "primary" }) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  const colorClasses = {
    primary: "border-primary-blue border-t-transparent",
    white: "border-white border-t-transparent",
  };

  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <motion.div
        className={`${sizeClasses[size]} rounded-full border-2 ${colorClasses[color]}`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}

export default LoadingSpinner;
