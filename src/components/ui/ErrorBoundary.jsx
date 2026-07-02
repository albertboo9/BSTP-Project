import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1a1a2e",
          color: "white",
          padding: "20px",
          textAlign: "center",
        }}>
          <div>
            <h1 style={{ fontSize: "24px", marginBottom: "16px" }}>
              Une erreur est survenue
            </h1>
            <p style={{ color: "#9ca3af", marginBottom: "16px" }}>
              {this.state.error?.message || "Erreur inconnue"}
            </p>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              style={{
                padding: "12px 24px",
                background: "#635bff",
                border: "none",
                borderRadius: "8px",
                color: "white",
                cursor: "pointer",
              }}
            >
              Recharger la page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
