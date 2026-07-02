import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  Users,
  MessageCircle,
  Calendar,
  BookOpen,
  Award,
  Heart,
  Share2,
  ChevronRight,
  Search,
  Plus,
  Send,
  ThumbsUp,
  MessageSquare,
  UserPlus,
  Star,
  Zap,
  Coffee,
} from "lucide-react";

// Mock data - Community
const discussions = [
  {
    id: 1,
    author: "Marie Claire D.",
    avatar: "MC",
    role: "Entrepreneur",
    title: "Comment avez-vous financé votre première année d'activité ?",
    content:
      "Je suis en train de lancer ma startup agri-tech et je me demande quelles sont les meilleures options de financement pour les premiers mois...",
    likes: 45,
    replies: 12,
    tags: ["Financement", "Startup"],
    time: "2h",
    featured: true,
  },
  {
    id: 2,
    author: "Thomas N.",
    avatar: "TN",
    role: "Serial Entrepreneur",
    title: "Recherche de co-fondateur technique pour projet fintech",
    content:
      "Je développe une solution de paiement pour les PME et je cherche un développeur full-stack pour rejoindre l'aventure.",
    likes: 32,
    replies: 8,
    tags: ["Co-fondateur", "Tech"],
    time: "5h",
    featured: false,
  },
  {
    id: 3,
    author: "Dr. Paul M.",
    avatar: "PM",
    role: "Santé",
    title: "Retour d'expérience : levée de fonds pour une healthtech",
    content:
      "Après 18 mois de développement, nous venons de closes notre seed round. Voici ce que j'aurais aimé savoir avant...",
    likes: 89,
    replies: 24,
    tags: ["Levée de fonds", "Healthtech"],
    time: "1j",
    featured: true,
  },
];

const events = [
  {
    id: 1,
    title: "Networking Meetup - Douala",
    date: "2024-02-20",
    time: "18:00",
    location: "Hotel Akwa Palace",
    attendees: 85,
    category: "Networking",
  },
  {
    id: 2,
    title: "Workshop : Pitch parfait pour investisseurs",
    date: "2024-02-25",
    time: "14:00",
    location: "Online",
    attendees: 120,
    category: "Formation",
  },
  {
    id: 3,
    title: "Startup Stories : Interview de fondateurs",
    date: "2024-03-01",
    time: "19:00",
    location: "Online",
    attendees: 200,
    category: "Inspiration",
  },
  {
    id: 4,
    title: "Hackathon AgriTech 2024",
    date: "2024-03-15",
    time: "09:00",
    location: "Nimba Hub, Yaoundé",
    attendees: 150,
    category: "Hackathon",
  },
];

const activeMembers = [
  { name: "Marie Claire D.", role: "AgriTech", avatar: "MC", online: true },
  { name: "Thomas N.", role: "Fintech", avatar: "TN", online: true },
  { name: "Dr. Paul M.", role: "HealthTech", avatar: "PM", online: false },
  { name: "Sophie B.", role: "EdTech", avatar: "SB", online: true },
  { name: "Jean-Pierre K.", role: "CleanTech", avatar: "JK", online: false },
  { name: "Alain M.", role: "Logistique", avatar: "AM", online: true },
];

const stats = [
  { label: "Membres", value: "5,200+", icon: Users },
  { label: "Discussions", value: "12,500+", icon: MessageCircle },
  { label: "Événements", value: "85+", icon: Calendar },
  { label: "Startups", value: "320+", icon: Star },
];

function StarterCommunity() {
  const [activeTab, setActiveTab] = useState("discussions");
  const [newPost, setNewPost] = useState("");

  return (
    <div className="community-page">
      <Helmet>
        <title>
          Communauté Starter | STARTERKIT CM - Échangez avec d'autres
          entrepreneurs
        </title>
        <meta
          name="description"
          content="Rejoignez la communauté des entrepreneurs du Cameroun. Partagez, apprenez et collaborez avec d'autres fondateurs."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="community-hero">
        <div className="community-hero-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="community-badge">
              <Users size={18} />
              <span>5,200+ Entrepreneurs</span>
            </div>
            <h1>
              Communauté
              <br />
              <span className="gradient-text">Starter</span>
            </h1>
            <p>
              Échangez, partagez et collaborez avec des entrepreneurs comme
              vous. Ensemble, nous allons plus loin.
            </p>
          </motion.div>

          {/* Quick CTA */}
          <motion.div
            className="community-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <button className="join-btn" onClick={() => window.location.href = "/signup?redirect=/ressources/communaute"}>
              <UserPlus size={18} />
              Rejoindre la communauté
            </button>
            <button className="event-btn">
              <Calendar size={18} />
              Prochains événements
            </button>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="stats-bar">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="stat-item"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
          >
            <stat.icon size={24} />
            <div>
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <section className="community-content">
        <div className="community-layout">
          {/* Left Sidebar - Navigation & Members */}
          <aside className="community-sidebar">
            {/* Tabs */}
            <nav className="sidebar-nav">
              <button
                className={`nav-item ${activeTab === "discussions" ? "active" : ""}`}
                onClick={() => setActiveTab("discussions")}
              >
                <MessageCircle size={20} />
                Discussions
              </button>
              <button
                className={`nav-item ${activeTab === "events" ? "active" : ""}`}
                onClick={() => setActiveTab("events")}
              >
                <Calendar size={20} />
                Événements
              </button>
              <button
                className={`nav-item ${activeTab === "members" ? "active" : ""}`}
                onClick={() => setActiveTab("members")}
              >
                <Users size={20} />
                Membres
              </button>
              <button
                className={`nav-item ${activeTab === "resources" ? "active" : ""}`}
                onClick={() => setActiveTab("resources")}
              >
                <BookOpen size={20} />
                Ressources
              </button>
            </nav>

            {/* Active Members */}
            <div className="active-members">
              <h3>
                <Zap size={18} />
                Membres en ligne
              </h3>
              <div className="members-list">
                {activeMembers.map((member) => (
                  <div key={member.name} className="member-item">
                    <div className="member-avatar">
                      {member.avatar}
                      {member.online && <span className="online-dot" />}
                    </div>
                    <div className="member-info">
                      <span className="member-name">{member.name}</span>
                      <span className="member-role">{member.role}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="see-all-btn">
                Voir tous les membres
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Quick Links */}
            <div className="quick-links">
              <a href="#">
                <Coffee size={16} />
                Trouver un co-fondateur
              </a>
              <a href="#">
                <Award size={16} />
                Demander une recommandation
              </a>
              <a href="#">
                <BookOpen size={16} />
                Ressources gratuites
              </a>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="community-main">
            {/* Discussions Tab */}
            {activeTab === "discussions" && (
              <div className="discussions-section">
                {/* New Post */}
                <div className="new-post">
                  <div className="post-input">
                    <div className="user-avatar">VO</div>
                    <input
                      type="text"
                      placeholder="Partagez une question, une idée ou une opportunité..."
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                    />
                    <button className="post-btn" onClick={() => window.location.href = "/signup?redirect=/ressources/communaute"} disabled={!newPost.trim()}>
                      <Send size={18} />
                      Publier
                    </button>
                  </div>
                </div>

                {/* Search */}
                <div className="discussions-search">
                  <Search size={18} />
                  <input
                    type="text"
                    placeholder="Rechercher dans les discussions..."
                  />
                </div>

                {/* Featured Discussions */}
                <div className="featured-discussions">
                  <h2>
                    <Star size={20} />
                    Discussions en vedettes
                  </h2>
                  {discussions
                    .filter((d) => d.featured)
                    .map((discussion) => (
                      <DiscussionCard
                        key={discussion.id}
                        discussion={discussion}
                        featured
                      />
                    ))}
                </div>

                {/* All Discussions */}
                <div className="all-discussions">
                  <h2>
                    <MessageSquare size={20} />
                    Toutes les discussions
                  </h2>
                  {discussions
                    .filter((d) => !d.featured)
                    .map((discussion) => (
                      <DiscussionCard
                        key={discussion.id}
                        discussion={discussion}
                      />
                    ))}
                  {discussions.filter((d) => !d.featured).length === 0 && (
                    <div className="empty-state">
                      <MessageCircle size={48} />
                      <p>Aussi aucune discussion pour le moment</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Events Tab */}
            {activeTab === "events" && (
              <div className="events-section">
                <div className="section-header">
                  <h2>
                    <Calendar size={28} />
                    Prochains événements
                  </h2>
                  <button className="create-event-btn" onClick={() => window.location.href = "/signup?redirect=/ressources/communaute"}>
                    <Plus size={18} />
                    Créer un événement
                  </button>
                </div>

                <div className="events-grid">
                  {events.map((event, index) => (
                    <motion.div
                      key={event.id}
                      className="event-card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                    >
                      <div className="event-date">
                        <Calendar size={24} />
                        <span>
                          {new Date(event.date).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "short",
                          })}
                        </span>
                      </div>
                      <h3>{event.title}</h3>
                      <div className="event-meta">
                        <span>
                          <ClockIcon size={14} />
                          {event.time}
                        </span>
                        <span>
                          <MapPin size={14} />
                          {event.location}
                        </span>
                      </div>
                      <div className="event-footer">
                        <span className="attendees">
                          <Users size={14} />
                          {event.attendees} participants
                        </span>
                        <button className="rsvp-btn">S'inscrire</button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Members Tab */}
            {activeTab === "members" && (
              <div className="members-section">
                <div className="section-header">
                  <h2>
                    <Users size={28} />
                    Tous les membres
                  </h2>
                  <div className="search-bar">
                    <Search size={18} />
                    <input type="text" placeholder="Rechercher un membre..." />
                  </div>
                </div>

                <div className="members-grid">
                  {activeMembers.map((member, index) => (
                    <motion.div
                      key={member.name}
                      className="member-card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.4 }}
                    >
                      <div className="member-avatar large">
                        {member.avatar}
                        {member.online && <span className="online-dot large" />}
                      </div>
                      <h3>{member.name}</h3>
                      <span className="member-role">{member.role}</span>
                      <button className="connect-btn" onClick={() => window.location.href = "/signup?redirect=/ressources/communaute"}>
                        <UserPlus size={16} />
                        Se connecter
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Resources Tab */}
            {activeTab === "resources" && (
              <div className="resources-section">
                <h2>
                  <BookOpen size={28} />
                  Ressources partagées
                </h2>
                <div className="resources-grid">
                  <div className="resource-card">
                    <BookOpen size={32} />
                    <h3>Guides gratuits</h3>
                    <p>
                      Articles, tutoriels et guides pratiques pour
                      entrepreneurs.
                    </p>
                  </div>
                  <div className="resource-card">
                    <Video size={32} />
                    <h3>Vidéos & Webinars</h3>
                    <p>Enregistrements de nos événements et formations.</p>
                  </div>
                  <div className="resource-card">
                    <FileText size={32} />
                    <h3>Templates & Outils</h3>
                    <p>Modèles de business plan, pitch deck, et plus.</p>
                  </div>
                  <div className="resource-card">
                    <LinkIcon size={32} />
                    <h3>Liens utiles</h3>
                    <p>Curations de ressources externes essentielles.</p>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </section>

      <style>{`
        .community-page {
          min-height: 100vh;
          background: #f8fafc;
        }

        /* Hero */
        .community-hero {
          background: #059669;
          padding: 80px 24px;
        }

        .community-hero-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .community-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 24px;
        }

        .community-hero h1 {
          font-size: clamp(40px, 6vw, 64px);
          font-weight: 800;
          color: white;
          line-height: 1.1;
          margin-bottom: 20px;
        }

        .gradient-text {
          background: linear-gradient(135deg, #fef3c7 0%, #fbcfe8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .community-hero p {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.85);
          max-width: 600px;
          line-height: 1.6;
          margin-bottom: 40px;
        }

        /* CTA */
        .community-cta {
          display: flex;
          gap: 16px;
        }

        .join-btn,
        .event-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 24px;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          
          transition: all 0.2s ease;
        }

        .join-btn {
          background: white;
          color: #059669;
          border: none;
        }

        .join-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }

        .event-btn {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .event-btn:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        /* Stats Bar */
        .stats-bar {
          display: flex;
          justify-content: center;
          gap: 48px;
          background: white;
          padding: 24px;
          border-bottom: 1px solid #e5e7eb;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .stat-item svg {
          color:#059669;
        }

        .stat-value {
          display: block;
          font-size: 24px;
          font-weight: 800;
          color: #1a1a2e;
        }

        .stat-label {
          font-size: 13px;
          color: #6b7280;
        }

        /* Content */
        .community-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 40px 24px;
        }

        .community-layout {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 40px;
        }

        /* Sidebar */
        .community-sidebar {
          position: sticky;
          top: 96px;
          height: fit-content;
        }

        .sidebar-nav {
          background: white;
          border-radius: 16px;
          padding: 12px;
          margin-bottom: 24px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 14px 16px;
          border-radius: 10px;
          background: transparent;
          border: none;
          font-size: 14px;
          font-weight: 500;
          color: #059669;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
        }

        .nav-item:hover {
          background: #f3f4f6;
        }

        .nav-item.active {
          background: #fce7f3;
          color: #db2777;
        }

        /* Active Members */
        .active-members {
          background: white;
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 24px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
        }

        .active-members h3 {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 15px;
          font-weight: 600;
          color: #1a1a2e;
          margin-bottom: 16px;
        }

        .active-members h3 svg {
          color: #10b981;
        }

        .members-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .member-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .member-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: linear-gradient(135deg, #ec4899 0%, #db2777 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 600;
          position: relative;
        }

        .member-avatar.large {
          width: 64px;
          height: 64px;
          font-size: 18px;
        }

        .online-dot {
          position: absolute;
          bottom: -2px;
          right: -2px;
          width: 12px;
          height: 12px;
          background: #10b981;
          border: 2px solid white;
          border-radius: 50%;
        }

        .online-dot.large {
          width: 16px;
          height: 16px;
        }

        .member-info {
          flex: 1;
        }

        .member-name {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #1a1a2e;
        }

        .member-role {
          font-size: 12px;
          color: #9ca3af;
        }

        .see-all-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          width: 100%;
          justify-content: center;
          background: transparent;
          border: none;
          padding: 12px;
          margin-top: 12px;
          font-size: 14px;
          color: #db2777;
          font-weight: 500;
          cursor: pointer;
        }

        /* Quick Links */
        .quick-links {
          background: white;
          border-radius: 16px;
          padding: 16px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
        }

        .quick-links a {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px;
          border-radius: 10px;
          font-size: 14px;
          color: #6b7280;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .quick-links a:hover {
          background: #f3f4f6;
          color: #1a1a2e;
        }

        /* Main */
        .community-main {
          min-height: 500px;
        }

        /* New Post */
        .new-post {
          background: white;
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 24px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
        }

        .post-input {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .post-input .user-avatar {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: linear-gradient(135deg, #ec4899 0%, #db2777 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 600;
        }

        .post-input input {
          flex: 1;
          border: 1px solid #e5e7eb;
          padding: 12px 16px;
          border-radius: 12px;
          font-size: 14px;
          outline: none;
        }

        .post-input input:focus {
          border-color: #db2777;
        }

        .post-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #db2777;
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .post-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Discussions Search */
        .discussions-search {
          display: flex;
          align-items: center;
          gap: 12px;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 12px 16px;
          margin-bottom: 24px;
        }

        .discussions-search svg {
          color: #9ca3af;
        }

        .discussions-search input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 14px;
        }

        /* Sections */
        .featured-discussions,
        .all-discussions {
          margin-bottom: 40px;
        }

        .featured-discussions h2,
        .all-discussions h2 {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 20px;
          font-weight: 700;
          color: #1a1a2e;
          margin-bottom: 20px;
        }

        /* Discussion Card */
        .discussion-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 16px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
          transition: all 0.3s ease;
        }

        .discussion-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
        }

        .discussion-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .discussion-avatar {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: linear-gradient(135deg, #ec4899 0%, #db2777 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: 600;
        }

        .discussion-author h4 {
          font-size: 16px;
          font-weight: 600;
          color: #1a1a2e;
        }

        .discussion-author span {
          font-size: 13px;
          color: #9ca3af;
        }

        .discussion-card h3 {
          font-size: 18px;
          font-weight: 600;
          color: #1a1a2e;
          margin-bottom: 10px;
        }

        .discussion-card p {
          font-size: 14px;
          color: #6b7280;
          line-height: 1.6;
          margin-bottom: 16px;
        }

        .discussion-tags {
          display: flex;
          gap: 8px;
          margin-bottom: 16px;
        }

        .discussion-tags span {
          background: #f3f4f6;
          color: #6b7280;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 12px;
        }

        .discussion-footer {
          display: flex;
          align-items: center;
          gap: 24px;
          padding-top: 16px;
          border-top: 1px solid #f3f4f6;
        }

        .discussion-action {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #9ca3af;
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .discussion-action:hover {
          color: #db2777;
        }

        .discussion-action.liked {
          color: #db2777;
        }

        /* Events Section */
        .events-section .section-header,
        .members-section .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }

        .events-section h2,
        .members-section h2,
        .resources-section h2 {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 24px;
          font-weight: 700;
          color: #1a1a2e;
          margin-bottom: 24px;
        }

        .create-event-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #db2777;
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
        }

        .events-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
        }

        .event-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
        }

        .event-date {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #db2777;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .event-card h3 {
          font-size: 18px;
          font-weight: 600;
          color: #1a1a2e;
          margin-bottom: 12px;
        }

        .event-meta {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 16px;
        }

        .event-meta span {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #6b7280;
        }

        .event-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 16px;
          border-top: 1px solid #f3f4f6;
        }

        .attendees {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #6b7280;
        }

        .rsvp-btn {
          background: #db2777;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }

        /* Members Section */
        .search-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 12px 16px;
        }

        .search-bar svg {
          color: #9ca3af;
        }

        .search-bar input {
          border: none;
          outline: none;
          font-size: 14px;
          width: 200px;
        }

        .members-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
        }

        .member-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          text-align: center;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
        }

        .member-card h3 {
          font-size: 16px;
          font-weight: 600;
          color: #1a1a2e;
          margin: 12px 0 4px;
        }

        .member-card .member-role {
          font-size: 13px;
          color: #6b7280;
          margin-bottom: 16px;
        }

        .connect-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          background: transparent;
          border: 1px solid #e5e7eb;
          padding: 10px;
          border-radius: 10px;
          font-size: 13px;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .connect-btn:hover {
          border-color: #db2777;
          color: #db2777;
        }

        /* Resources Section */
        .resources-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
        }

        .resource-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .resource-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
        }

        .resource-card svg {
          color: #db2777;
          margin-bottom: 16px;
        }

        .resource-card h3 {
          font-size: 18px;
          font-weight: 600;
          color: #1a1a2e;
          margin-bottom: 8px;
        }

        .resource-card p {
          font-size: 14px;
          color: #6b7280;
          line-height: 1.5;
        }

        /* Empty State */
        .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: #9ca3af;
        }

        .empty-state svg {
          margin-bottom: 16px;
          opacity: 0.5;
        }

        /* Icons */
        .ClockIcon {
          width: 14px;
          height: 14px;
        }

        .Video {
          width: 32px;
          height: 32px;
        }

        .FileText {
          width: 32px;
          height: 32px;
        }

        .LinkIcon {
          width: 32px;
          height: 32px;
        }

        @media (max-width: 900px) {
          .community-layout {
            grid-template-columns: 1fr;
          }

          .community-sidebar {
            position: static;
          }

          .stats-bar {
            flex-wrap: wrap;
            gap: 24px;
          }

          .community-cta {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}

// Discussion Card Component
function DiscussionCard({ discussion, featured }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className={`discussion-card ${featured ? "featured" : ""}`}>
      <div className="discussion-header">
        <div className="discussion-avatar">{discussion.avatar}</div>
        <div className="discussion-author">
          <h4>{discussion.author}</h4>
          <span>
            {discussion.role} • {discussion.time}
          </span>
        </div>
        {featured && (
          <span
            style={{
              marginLeft: "auto",
              background: "#fef3c7",
              color: "#d97706",
              padding: "4px 10px",
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: "600",
            }}
          >
            ★ Vedette
          </span>
        )}
      </div>
      <h3>{discussion.title}</h3>
      <p>{discussion.content}</p>
      <div className="discussion-tags">
        {discussion.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <div className="discussion-footer">
        <span
          className={`discussion-action ${liked ? "liked" : ""}`}
          onClick={() => setLiked(!liked)}
        >
          <ThumbsUp size={16} />
          {discussion.likes}
        </span>
        <span className="discussion-action">
          <MessageSquare size={16} />
          {discussion.replies} réponses
        </span>
        <span className="discussion-action">
          <Share2 size={16} />
          Partager
        </span>
      </div>
    </div>
  );
}

export default StarterCommunity;
