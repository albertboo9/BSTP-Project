import { motion } from "framer-motion";
import { Calendar, Users, ArrowRight, Clock, CheckCircle } from "lucide-react";

const projectVariants = {
  hidden: {
    opacity: 0,
    x: -30
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.01,
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
    transition: {
      duration: 0.2
    }
  }
};

const badgeVariants = {
  open: {
    scale: [1, 1.1, 1],
    boxShadow: [
      "0 0 0 0 rgba(16, 185, 129, 0)",
      "0 0 0 8px rgba(16, 185, 129, 0.15)",
      "0 0 0 0 rgba(16, 185, 129, 0)"
    ],
    transition: {
      duration: 2,
      repeat: Infinity
    }
  }
};

function ProjectCard({ project, index }) {
  const isOpen = project.status === "open";

  return (
    <motion.div
      variants={projectVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "20px",
        padding: "20px 24px",
        background: "white",
        borderRadius: "16px",
        boxShadow: "0 2px 12px rgba(0, 0, 0, 0.04)",
        cursor: "pointer"
      }}
    >
      {/* Status Badge */}
      <motion.div
        animate={isOpen ? "open" : "static"}
        variants={badgeVariants}
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          background: isOpen
            ? "linear-gradient(135deg, #10B981 0%, #059669 100%)"
            : "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
          color: "white"
        }}
      >
        {isOpen ? (
          <CheckCircle size={28} />
        ) : (
          <Clock size={28} />
        )}
      </motion.div>

      {/* Content */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "6px"
          }}
        >
          <h3
            style={{
              fontSize: "16px",
              fontWeight: 700,
              color: "#1a1a2e",
              margin: 0,
              lineHeight: 1.2
            }}
          >
            {project.title}
          </h3>
          <span
            style={{
              padding: "4px 10px",
              background: isOpen ? "rgba(16, 185, 129, 0.1)" : "rgba(245, 158, 11, 0.1)",
              color: isOpen ? "#10B981" : "#F59E0B",
              borderRadius: "6px",
              fontSize: "11px",
              fontWeight: 600,
              textTransform: "uppercase"
            }}
          >
            {isOpen ? "Ouvert" : "Bientôt"}
          </span>
        </div>

        <p
          style={{
            fontSize: "13px",
            color: "#6b7280",
            margin: 0,
            lineHeight: 1.4,
            marginBottom: "10px"
          }}
        >
          {project.description}
        </p>

        {/* Meta info */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "12px",
            color: "#9ca3af"
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              color: project.color,
              fontWeight: 600
            }}
          >
            <Users size={12} />
            {project.applicants} candidatures
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px"
            }}
          >
            <Calendar size={12} />
            {project.deadline}
          </span>
        </div>
      </div>

      {/* Amount & CTA */}
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <div
          style={{
            fontSize: "18px",
            fontWeight: 700,
            color: "#1a1a2e",
            marginBottom: "4px"
          }}
        >
          {project.amount}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "10px 16px",
            background: isOpen
              ? "linear-gradient(135deg, #635bff 0%, #7c3aed 100%)"
              : "#f3f4f6",
            color: isOpen ? "white" : "#6b7280",
            border: "none",
            borderRadius: "10px",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
            marginTop: "8px"
          }}
        >
          {isOpen ? "Postuler" : "M'alerter"}
          <ArrowRight size={14} />
        </motion.button>
      </div>
    </motion.div>
  );
}

export default ProjectCard;
