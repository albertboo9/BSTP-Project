import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet-async";

function AuthLayout() {
  return (
    <>
      <Helmet>
        <html lang="fr" />
      </Helmet>
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #1a1a2e 0%, #2d2d4a 100%)",
        }}
      >
        <Outlet />
      </div>
    </>
  );
}

export default AuthLayout;
