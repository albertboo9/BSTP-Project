import { Helmet } from "react-helmet-async";

function TestAuth() {
  return (
    <>
      <Helmet>
        <title>Test Auth - STARTERKIT CM</title>
      </Helmet>
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #1a1a2e 0%, #2d2d4a 100%)",
      }}>
        <div style={{
          background: "white",
          borderRadius: "20px",
          padding: "40px",
          textAlign: "center",
        }}>
          <h1 style={{ fontSize: "24px", marginBottom: "16px" }}>Test Auth OK</h1>
          <p style={{ color: "#6b7280" }}>Si vous voyez cette page, le test est réussi.</p>
        </div>
      </div>
    </>
  );
}

export default TestAuth;
