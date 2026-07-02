import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

function Upload() {
  const [dragActive, setDragActive] = useState(false);
  const [uploaded, setUploaded] = useState(null);
  const [status, setStatus] = useState('idle'); // idle, uploading, validating, validated

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file) => {
    setUploaded(file);
    setStatus('uploading');
    setTimeout(() => {
      setStatus('validating');
      setTimeout(() => {
        setStatus('validated');
      }, 2000);
    }, 1500);
  };

  const certifications = [
    { title: 'Sensibilisation à l\'entrepreneuriat', date: '15 janvier 2025', status: 'En cours de validation' },
    { title: 'Business Model Canvas', date: '20 janvier 2025', status: 'En cours de validation' },
  ];

  return (
    <>
      <Helmet><title>Upload certificat - STARTERKITCM</title></Helmet>
      
      <div style={{ padding: '100px 24px 60px', background: '#f8f9fa', minHeight: '100vh' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#1a1a2e', marginBottom: '8px', textAlign: 'center' }}>Téléverser votre certificat</h1>
            <p style={{ fontSize: '16px', color: '#666', textAlign: 'center', marginBottom: '32px' }}>
              Ajoutez les certificats obtenus sur le campus e-learning pour valider votre parcours.
            </p>

            {/* Drop Zone */}
            {!uploaded ? (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="featured-card" style={{ padding: '48px', textAlign: 'center' }} onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}>
                <input type="file" id="file-upload" accept=".pdf,.jpg,.png" onChange={(e) => e.target.files[0] && handleFile(e.target.files[0])} style={{ display: 'none' }} />
                
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: dragActive ? 'linear-gradient(135deg, rgba(99, 91, 255, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)' : 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', border: dragActive ? '2px dashed #635bff' : '2px dashed #e5e7eb', transition: 'all 0.3s' }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={dragActive ? '#635bff' : '#9ca3af'} strokeWidth="2">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                  </svg>
                </div>
                
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1a1a2e', marginBottom: '8px' }}>
                  {dragActive ? 'Déposez votre fichier' : 'Glissez-déposez votre certificat'}
                </h3>
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>ou cliquez pour sélectionner</p>
                
                <p style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '24px' }}>Formats acceptés : PDF, JPG, PNG (max 5MB)</p>
                
                <label htmlFor="file-upload" className="btn-primary" style={{ cursor: 'pointer' }}>
                  Choisir un fichier
                </label>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="featured-card" style={{ padding: '32px' }}>
                {/* Uploaded file */}
                {status !== 'validated' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
                    <div style={{ width: '60px', height: '60px', borderRadius: '12px', background: 'linear-gradient(135deg, #635bff 0%, #7c3aed 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                        <path d="M14 2v6h6M12 18v-6M9 15l3 3 3-3" />
                      </svg>
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a2e', margin: 0 }}>{uploaded.name}</p>
                      <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>{(uploaded.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    {status === 'uploading' && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className="badge badge-primary">Téléversement...</span>
                      </div>
                    )}
                    {status === 'validating' && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className="badge badge-warning">Validation en cours...</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Progress */}
                {status === 'uploading' && (
                  <div style={{ marginBottom: '24px' }}>
                    <div className="progress-bar" style={{ height: '8px' }}>
                      <motion.div initial={{ width: 0 }} animate={{ width: '70%' }} transition={{ duration: 1 }} className="progress-fill" />
                    </div>
                  </div>
                )}

                {/* Validated */}
                {status === 'validated' && (
                  <div style={{ textAlign: 'center', padding: '24px' }}>
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                    <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#10b981', marginBottom: '8px' }}>Certificat validé !</h3>
                    <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>Votre certificat a été accepté et ajouté à votre parcours.</p>
                    <button className="btn-primary" onClick={() => { setUploaded(null); setStatus('idle'); }}>Téléverser un autre</button>
                  </div>
                )}
              </motion.div>
            )}

            {/* Pending validations */}
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1a1a2e', margin: '48px 0 16px' }}>Certificats en attente</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {certifications.map((cert, index) => (
                <div key={index} className="featured-card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
                      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a2e', margin: 0 }}>{cert.title}</p>
                    <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>{cert.date}</p>
                  </div>
                  <span className="badge badge-warning">{cert.status}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default Upload;
