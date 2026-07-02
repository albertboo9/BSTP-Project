import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Lock,
  Mail,
  User,
  Phone,
  Building,
  MapPin,
} from "lucide-react";

// Icons mapping - use string keys only
const icons = {
  email: "Mail",
  password: "Lock",
  text: "User",
  phone: "Phone",
  building: "Building",
  location: "MapPin",
};

function FloatingLabelInput({
  label,
  type = "text",
  value,
  onChange,
  placeholder = "",
  required = false,
  error = "",
  showStrength = false,
  iconType = "text",
  disabled = false,
  name,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Icon mapping - resolve to actual component
  const iconComponents = { Mail, Lock, User, Phone, Building, MapPin };
  const Icon = iconComponents[icons[iconType]] || User;
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  // Calculate password strength
  const getPasswordStrength = () => {
    if (!value) return { width: "0%", color: "#e5e7eb", label: "" };

    let strength = 0;
    if (value.length >= 8) strength++;
    if (/[A-Z]/.test(value)) strength++;
    if (/[0-9]/.test(value)) strength++;
    if (/[^A-Za-z0-9]/.test(value)) strength++;

    const levels = [
      { width: "25%", color: "#EF4444", label: "Très faible" },
      { width: "50%", color: "#F59E0B", label: "Faible" },
      { width: "75%", color: "#F59E0B", label: "Moyen" },
      { width: "100%", color: "#10B981", label: "Fort" },
    ];

    return levels[strength - 1] || levels[0];
  };

  const strength = getPasswordStrength();

  return (
    <div style={{ marginBottom: "20px", position: "relative" }}>
      <div
        style={{
          position: "relative",
          background: "white",
          borderRadius: "12px",
          border: `2px solid ${error ? "#EF4444" : isFocused ? "#635bff" : "#e5e7eb"}`,
          overflow: "hidden",
        }}
      >
        {/* Icon */}
        <div
          style={{
            position: "absolute",
            left: "16px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2,
          }}
        >
          <Icon
            size={20}
            style={{
              color: error ? "#EF4444" : isFocused ? "#635bff" : "#9ca3af",
            }}
          />
        </div>

        {/* Input */}
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          name={name}
          required={required}
          placeholder={placeholder}
          style={{
            width: "100%",
            padding: isFocused || value ? "20px 48px 8px 48px" : "14px 48px 14px 48px",
            border: "none",
            outline: "none",
            fontSize: "15px",
            color: "#1a1a2e",
            background: "transparent",
          }}
        />

        {/* Floating Label */}
        <label
          style={{
            position: "absolute",
            left: "48px",
            top: isFocused || value ? "8px" : "50%",
            fontSize: isFocused || value ? "11px" : "15px",
            color: error ? "#EF4444" : isFocused ? "#635bff" : "#9ca3af",
            fontWeight: 500,
            whiteSpace: "nowrap",
            transform: isFocused || value ? "translateY(0)" : "translateY(-50%)",
            pointerEvents: "none",
            transition: "all 0.2s ease",
          }}
        >
          {label}
          {required && <span style={{ color: "#EF4444", marginLeft: "4px" }}>*</span>}
        </label>

        {/* Password toggle */}
        {isPassword && value && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {showPassword ? <EyeOff size={20} style={{ color: "#9ca3af" }} /> : <Eye size={20} style={{ color: "#9ca3af" }} />}
          </button>
        )}

        {/* Success indicator */}
        {value && !error && !isPassword && (
          <div
            style={{
              position: "absolute",
              right: "16px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <CheckCircle size={20} style={{ color: "#10B981" }} />
          </div>
        )}
      </div>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginTop: "6px",
              paddingLeft: "4px",
            }}
          >
            <AlertCircle size={14} style={{ color: "#EF4444" }} />
            <span style={{ fontSize: "12px", color: "#EF4444" }}>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Password strength indicator */}
      {showStrength && value && (
        <div style={{ marginTop: "8px" }}>
          <div
            style={{
              height: "4px",
              background: "#e5e7eb",
              borderRadius: "2px",
              overflow: "hidden",
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: strength.width }}
              transition={{ duration: 0.3 }}
              style={{
                height: "100%",
                background: strength.color,
                borderRadius: "2px",
              }}
            />
          </div>
          <span
            style={{
              fontSize: "11px",
              color: strength.color,
              marginTop: "4px",
              display: "block",
            }}
          >
            {strength.label}
          </span>
        </div>
      )}
    </div>
  );
}

export default FloatingLabelInput;
