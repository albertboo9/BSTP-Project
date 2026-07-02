import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
// import Assistant from '../assistant/Assistant';
// import { motion } from 'framer-motion';

function Layout() {
  const location = useLocation();
  const [showAssistant, setShowAssistant] = useState(true);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isLandingPage = location.pathname === '/';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      <Footer />
      
      {/* Assistant - Only show on non-landing pages */}
      {!isLandingPage && (
        // <Assistant 
        //   isVisible={showAssistant} 
        //   onToggle={() => setShowAssistant(!showAssistant)} 
        // />
        null
      )}
    </div>
  );
}

export default Layout;
