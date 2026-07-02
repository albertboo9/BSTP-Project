import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  Building2,
  TrendingUp,
  Users,
  Rocket,
  Mail,
  ExternalLink,
  Heart
} from "lucide-react";

// Components
import PartnerCard from "../../components/partenaires/PartnerCard";
import ProjectCard from "../../components/partenaires/ProjectCard";

// Data
import { partnersData, projectsData, allPartnersLogos } from "../../data/partners.data";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
};

const logoScroll = {
  animate: {
    x: [0, -1000],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 25,
        ease: "linear"
      }
    }
  }
};

function Partenaires() {
  const [activeCategory, setActiveCategory] = useState("all");

  // Scroll smooth vers les sections
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Partners par catégorie
  const allPartners = [
    ...partnersData.gouvernement,
    ...partnersData.ong,
    ...partnersData.financeurs,
    ...partnersData.incubateurs
  ];

  const categories = [
    {
      id: "all",
      label: "Tous",
      icon: Building2,
      count: allPartners.length
    },
    {
      id: "gouvernement",
      label: "Institutions",
      icon: Building2,
      count: partnersData.gouvernement.length
    },
    {
      id: "financeurs",
      label: "Financeurs",
      icon: TrendingUp,
      count: partnersData.financeurs.length
    },
    {
      id: "incubateurs",
      label: "Incubateurs",
      icon: Rocket,
      count: partnersData.incubateurs.length
    }
  ];

  const filteredPartners = activeCategory === "all"
    ? allPartners
    : allPartners.filter(p => {
        if (activeCategory === "gouvernement") {
          return partnersData.gouvernement.some(g => g.id === p.id);
        }
        return p.category?.toLowerCase().includes(activeCategory);
      });

  return (
    <>
      <Helmet>
        <title>Partenaires - STARTERKIT CM</title>
        <meta
          name="description"
          content="Découvrez nos partenaires institutionnels, financiers et accompagnateurs qui soutiennent l'entrepreneuriat au Cameroun."
        />
      </Helmet>

      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        style={{
          padding: "80px 24px 60px",
          background: "linear-gradient(135deg, #1a1a2e 0%, #2d2d4a 50%, #1a1a2e 100%)",
          position: "relative",
          overflow: "hidden"
        }}
      >
        {/* Background elements */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "5%",
            width: "300px",
            height: "300px",
            background: "radial-gradient(circle, rgba(99, 91, 255, 0.15) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(60px)"
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            right: "5%",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(80px)"
          }}
        />

        {/* Logo Carousel Background */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "60px",
            background: "linear-gradient(to top, rgba(255,255,255,0.03), transparent)",
            display: "flex",
            alignItems: "center",
            overflow: "hidden"
          }}
        >
          <motion.div
            style={{
              display: "flex",
              gap: "60px",
              flexShrink: 0
            }}
            animate="animate"
            variants={logoScroll}
          >
            {allPartnersLogos.map((partner, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  opacity: 0.5,
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.5)",
                  whiteSpace: "nowrap"
                }}
              >
                <span
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "6px",
                    background: partner.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "10px",
                    fontWeight: 700
                  }}
                >
                  {partner.name.substring(0, 2).toUpperCase()}
                </span>
                {partner.name}
              </div>
            ))}
          </motion.div>
        </div>

        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            textAlign: "center",
            position: "relative",
            zIndex: 1
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              background: "rgba(99, 91, 255, 0.2)",
              borderRadius: "30px",
              marginBottom: "24px"
            }}
          >
            <Users size={16} style={{ color: "#a78bfa" }} />
            <span style={{ fontSize: "13px", color: "#a78bfa", fontWeight: 500 }}>
              {allPartners.length} partenaires à ce jour
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 800,
              color: "white",
              lineHeight: 1.1,
              marginBottom: "20px"
            }}
          >
            Nos Partenaires
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              Stratégiques
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              fontSize: "clamp(16px, 2vw, 20px)",
              color: "rgba(255, 255, 255, 0.7)",
              maxWidth: "600px",
              margin: "0 auto 32px",
              lineHeight: 1.6
            }}
          >
            Institutions, ONG, financeurs et incubateurs qui croient en
            l'entrepreneuriat camerounais.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection("partners")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 28px",
                background: "linear-gradient(135deg, #635bff 0%, #7c3aed 100%)",
                border: "none",
                borderRadius: "12px",
                color: "white",
                fontSize: "15px",
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 4px 20px rgba(99, 91, 255, 0.4)"
              }}
            >
              Découvrir nos partenaires
              <ArrowRight size={18} />
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Partners Section */}
      <section
        id="partners"
        style={{
          padding: "80px 24px",
          background: "#ffffff"
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: "48px" }}
          >
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 40px)",
                fontWeight: 800,
                color: "#1a1a2e",
                marginBottom: "12px"
              }}
            >
              Écosystème de Partenaires
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "#6b7280",
                maxWidth: "600px",
                margin: "0 auto"
              }}
            >
              Un réseau solide d'acteurs engagés pour votre réussite
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "12px",
              marginBottom: "48px",
              flexWrap: "wrap"
            }}
          >
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 20px",
                  background: activeCategory === cat.id
                    ? "linear-gradient(135deg, #635bff 0%, #7c3aed 100%)"
                    : "white",
                  border: activeCategory === cat.id
                    ? "none"
                    : "1px solid #e5e7eb",
                  borderRadius: "12px",
                  color: activeCategory === cat.id ? "white" : "#6b7280",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: activeCategory === cat.id
                    ? "0 4px 15px rgba(99, 91, 255, 0.3)"
                    : "none",
                  transition: "all 0.2s ease"
                }}
              >
                <cat.icon size={16} />
                {cat.label}
                <span
                  style={{
                    padding: "2px 8px",
                    background: activeCategory === cat.id
                      ? "rgba(255,255,255,0.2)"
                      : "#f3f4f6",
                    borderRadius: "10px",
                    fontSize: "12px"
                  }}
                >
                  {cat.count}
                </span>
              </motion.button>
            ))}
          </motion.div>

          {/* Partners Grid */}
          <motion.div
            key={activeCategory}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "24px"
            }}
          >
            {filteredPartners.map((partner, index) => (
              <PartnerCard key={partner.id} partner={partner} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        style={{
          padding: "80px 24px",
          background: "#f8fafc"
        }}
      >
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: "48px" }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                background: "rgba(99, 91, 255, 0.1)",
                borderRadius: "30px",
                marginBottom: "16px"
              }}
            >
              <Rocket size={16} style={{ color: "#635bff" }} />
              <span
                style={{
                  fontSize: "13px",
                  color: "#635bff",
                  fontWeight: 600
                }}
              >
                Opportunités
              </span>
            </div>

            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 40px)",
                fontWeight: 800,
                color: "#1a1a2e",
                marginBottom: "12px"
              }}
            >
              Appels à Projets
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "#6b7280",
                maxWidth: "600px",
                margin: "0 auto"
              }}
            >
              Soutiens financiers et programmes d'accompagnement disponibles
            </p>
          </motion.div>

          {/* Projects List */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px"
            }}
          >
            {projectsData.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          padding: "100px 24px",
          background: "linear-gradient(135deg, #1a1a2e 0%, #2d2d4a 100%)",
          position: "relative",
          overflow: "hidden"
        }}
      >
        {/* Background elements */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(100px)"
          }}
        />

        <div
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            textAlign: "center",
            position: "relative",
            zIndex: 1
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "80px",
              height: "80px",
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "50%",
              marginBottom: "32px"
            }}
          >
            <Heart size={40} style={{ color: "#a78bfa" }} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 800,
              color: "white",
              marginBottom: "16px",
              lineHeight: 1.2
            }}
          >
            Devenez Partenaire
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            style={{
              fontSize: "18px",
              color: "rgba(255, 255, 255, 0.7)",
              marginBottom: "40px",
              lineHeight: 1.6
            }}
          >
            Rejoignez l'écosystème STARTERKIT CM et accompagnez les entrepreneurs
            camerounais dans leur réussite.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            style={{
              display: "flex",
              gap: "16px",
              justifyContent: "center",
              flexWrap: "wrap"
            }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "16px 32px",
                background: "linear-gradient(135deg, #635bff 0%, #7c3aed 100%)",
                border: "none",
                borderRadius: "14px",
                color: "white",
                fontSize: "16px",
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 4px 25px rgba(99, 91, 255, 0.4)"
              }}
            >
              <Mail size={20} />
              Nous contacter
            </motion.button>

            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "16px 32px",
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "14px",
                color: "white",
                fontSize: "16px",
                fontWeight: 600,
                cursor: "pointer",
                textDecoration: "none"
              }}
            >
              En savoir plus
              <ExternalLink size={18} />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Inline Styles */}
      <style>{`
        .partner-card:hover {
          border-color: rgba(99, 91, 255, 0.1);
        }

        @media (max-width: 768px) {
          .partners-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}

export default Partenaires;
