import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

function Certification() {
  const [activeTab, setActiveTab] = useState('my');

  const myCerts = [
    { title: 'Certificate of Completion', parcours: 'Sensibilisation', date: '15 janvier 2025', status: 'valid' },
    { title: 'Attestation de Formation', parcours: 'Business Model Canvas', date: 'En cours', status: 'pending' },
  ];

  const availableCerts = [
    { title: 'Certificate Entrepreneur STARTERKITCM', parcours: 'Création d\'entreprise', description: 'Certification officielle du parcours.' },
    { title: 'Attestation MINPEEMSA', parcours: 'Parcours Complet', description: 'Certification partenariat ministère.' },
  ];

  return (
    <>
      <Helmet><title>Certification - STARTERKITCM</title></Helmet>
      
      <div style={{ padding: '100px 24px 60px', background: '#f8f9fa', minHeight: '100vh' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 700, color: '#1a1a2e', marginBottom: '12px' }}>Certification MINPEEMSA</h1>
            <p style={{ fontSize: '16px', color: '#666' }}>Validez vos compétences avec une reconnaissance officielle.</p>
          </motion.div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '40px' }}>
            <button onClick={() => setActiveTab('my')} style={{ padding: '12px 28px', borderRadius: '25px', border: 'none', background: activeTab === 'my' ? 'linear-gradient(135deg, #635bff 0%, #7c3aed 100%)' : 'white', color: activeTab === 'my' ? 'white' : '#666', fontSize: '14px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>Mes certifications</button>
            <button onClick={() => setActiveTab('available')} style={{ padding: '12px 28px', borderRadius: '25px', border: 'none', background: activeTab === 'available' ? 'linear-gradient(135deg, #635bff 0%, #7c3aed 100%)' : 'white', color: activeTab === 'available' ? 'white' : '#666', fontSize: '14px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>Disponibles</button>
          </div>

          {activeTab === 'my' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '700px', margin: '0 auto' }}>
              {myCerts.map((cert, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="featured-card" style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '24px' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '12px', background: 'linear-gradient(135deg, #635bff 0%, #7c3aed 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <span className={`badge ${cert.status === 'valid' ? 'badge-success' : 'badge-warning'}`}>{cert.status === 'valid' ? '✓ Valide' : '⏳ En cours'}</span>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1a1a2e', margin: '12px 0 4px' }}>{cert.title}</h3>
                    <p style={{ fontSize: '14px', color: '#666' }}>{cert.parcours} • {cert.date}</p>
                  </div>
                  <button className="btn-primary">{cert.status === 'valid' ? 'Télécharger' : 'Continuer'}</button>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'available' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {availableCerts.map((cert, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="featured-card" style={{ padding: '24px' }}>
                  <span style={{ display: 'inline-block', padding: '4px 12px', background: 'linear-gradient(135deg, #e94560 0%, #c73e54 100%)', color: 'white', fontSize: '11px', fontWeight: 600, borderRadius: '4px', marginBottom: '12px' }}>Officiel MINPEEMSA</span>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1a1a2e', marginBottom: '8px' }}>{cert.title}</h3>
                  <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>{cert.description}</p>
                  <p style={{ fontSize: '12px', color: '#635bff', fontWeight: 600, marginBottom: '16px' }}>{cert.parcours}</p>
                  <button className="btn-primary" style={{ width: '100%' }}>Commencer</button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Certification;
