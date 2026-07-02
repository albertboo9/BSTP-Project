import { motion } from "framer-motion";

function StepIndicator({ currentStep, totalSteps, stepLabels }) {
  const steps = Array.from({ length: totalSteps }, (_, i) => ({
    number: i + 1,
    label: stepLabels[i] || `Étape ${i + 1}`,
  }));

  return (
    <div style={{ marginBottom: "32px" }}>
      {/* Progress bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "12px",
          position: "relative",
        }}
      >
        {/* Background line */}
        <div
          style={{
            position: "absolute",
            top: "16px",
            left: "16px",
            right: "16px",
            height: "4px",
            background: "#e5e7eb",
            borderRadius: "2px",
            zIndex: 0,
          }}
        />

        {/* Progress fill */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: "16px",
            left: "16px",
            height: "4px",
            background: "linear-gradient(90deg, #635bff 0%, #7c3aed 100%)",
            borderRadius: "2px",
            zIndex: 1,
          }}
        />

        {/* Steps */}
        {steps.map((step) => {
          const isCompleted = step.number < currentStep;
          const isCurrent = step.number === currentStep;

          return (
            <div
              key={step.number}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                zIndex: 2,
                position: "relative",
              }}
            >
              <motion.div
                initial={false}
                animate={{
                  scale: isCurrent ? 1.1 : 1,
                  backgroundColor: isCompleted
                    ? "#10B981"
                    : isCurrent
                    ? "#635bff"
                    : "#ffffff",
                  borderColor: isCompleted
                    ? "#10B981"
                    : isCurrent
                    ? "#635bff"
                    : "#e5e7eb",
                  boxShadow: isCurrent
                    ? "0 0 0 4px rgba(99, 91, 255, 0.2)"
                    : "0 0 0 0 rgba(99, 91, 255, 0)",
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  border: "3px solid",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: isCurrent ? "14px" : "13px",
                  fontWeight: 700,
                  color: isCompleted || isCurrent ? "white" : "#9ca3af",
                }}
              >
                {isCompleted ? (
                  <CheckIcon />
                ) : (
                  <span>{step.number}</span>
                )}
              </motion.div>

              {/* Label */}
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{
                  opacity: isCurrent ? 1 : 0.6,
                  y: 0,
                  color: isCurrent ? "#1a1a2e" : "#6b7280",
                  fontWeight: isCurrent ? 600 : 500,
                }}
                transition={{ delay: 0.1 }}
                style={{
                  marginTop: "8px",
                  fontSize: "12px",
                  whiteSpace: "nowrap",
                }}
              >
                {step.label}
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Step progress text */}
      <div
        style={{
          textAlign: "center",
          fontSize: "13px",
          color: "#6b7280",
        }}
      >
        Étape {currentStep} sur {totalSteps}
      </div>
    </div>
  );
}

// Check icon
function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default StepIndicator;
