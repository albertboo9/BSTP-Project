import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Clock, CheckCircle2, AlertTriangle, MessageSquare, Image, FileText, ChevronRight, User, Building2, MoreHorizontal } from 'lucide-react';
import MilestonePipeline from '../../components/ui/MilestonePipeline';

// Mock data for contracts with milestones and media
const CONTRACTS = [
  {
    id: "C-2026-001",
    titre: "Construction hangar stockage — Port de Douala",
    pme: "BATIM SARL",
    donneur: "SCDP",
    budgetFcfa: 75000000,
    statut: "en_cours",
    progression: 65,
    milestones: [
      { label: "Signature", statut: "done" },
      { label: "Démarrage", statut: "done" },
      { label: "Livraison 50%", statut: "active" },
      { label: "Recette Technique", statut: "pending" },
      { label: "Recette Finale", statut: "pending" },
    ],
    dernierUpdate: "2026-07-02",
    alert: false,
    media: [
      { type: "image", url: null, label: "Photo chantier J+30", date: "2026-06-15", commentaire: "Avancement fondations terminé" },
      { type: "image", url: null, label: "Photo livraison béton", date: "2026-06-22", commentaire: "Livraison 200m³ effectuée" },
    ],
    remarques: [
      { auteur: "BATIM SARL", date: "2026-06-28", texte: "Demande de validation des plans modifiés pour la toiture.", type: "pme" },
      { auteur: "SCDP", date: "2026-06-30", texte: "Plans reçus, en cours d'analyse par le bureau d'études.", type: "do" },
    ],
  },
  {
    id: "C-2026-002",
    titre: "Audit cybersécurité SI — Siège SOSUCAM",
    pme: "TECHBUILD GROUP",
    donneur: "SOSUCAM",
    budgetFcfa: 12000000,
    statut: "bloque",
    progression: 30,
    milestones: [
      { label: "Signature", statut: "done" },
      { label: "Démarrage", statut: "done" },
      { label: "Audit Phase 1", statut: "blocked" },
      { label: "Rapport", statut: "pending" },
    ],
    dernierUpdate: "2026-06-18",
    alert: true,
    media: [],
    remarques: [
      { auteur: "TECHBUILD", date: "2026-06-18", texte: "Accès VPN non fourni par le client — impossible de démarrer l'audit.", type: "pme" },
    ],
  },
  {
    id: "C-2026-003",
    titre: "Transport navettes Bafoussam",
    pme: "LOGISTIQUE PLUS",
    donneur: "CDC",
    budgetFcfa: 8400000,
    statut: "termine",
    progression: 100,
    milestones: [
      { label: "Signature", statut: "done" },
      { label: "Démarrage", statut: "done" },
      { label: "Mi-parcours", statut: "done" },
      { label: "Clôture", statut: "done" },
    ],
    dernierUpdate: "2026-06-30",
    alert: false,
    media: [
      { type: "image", url: null, label: "Photo véhicules", date: "2026-05-10", commentaire: "Flotte de 6 minibus prête" },
    ],
    remarques: [
      { auteur: "CDC", date: "2026-06-30", texte: "Contrat terminé avec succès. Reconduction envisagée.", type: "do" },
    ],
  },
  {
    id: "C-2026-004",
    titre: "Réfection toitures site Edéa",
    pme: "BATIM SARL",
    donneur: "ALUCAM",
    budgetFcfa: 24000000,
    statut: "en_cours",
    progression: 45,
    milestones: [
      { label: "Signature", statut: "done" },
      { label: "Démarrage", statut: "done" },
      { label: "Livraison 50%", statut: "active" },
      { label: "Recette Finale", statut: "pending" },
    ],
    dernierUpdate: "2026-07-01",
    alert: false,
    media: [],
    remarques: [],
  },
];

const KANBAN_COLUMNS = [
  { id: "en_cours", label: "En Cours", icon: Clock, color: "nexus" },
  { id: "bloque", label: "Bloqué", icon: AlertTriangle, color: "danger" },
  { id: "termine", label: "Terminé", icon: CheckCircle2, color: "success" },
];

const colorMap = {
  nexus: { header: 'bg-nexus-50 text-nexus-700 border-nexus-100', dot: 'bg-nexus-500' },
  danger: { header: 'bg-danger-50 text-danger-700 border-danger-100', dot: 'bg-danger-500' },
  success: { header: 'bg-success-50 text-success-700 border-success-100', dot: 'bg-success-500' },
};

function formatCFA(n) {
  return new Intl.NumberFormat('fr-FR').format(n) + ' FCFA';
}

export default function SuiviChantiers() {
  const [selectedContract, setSelectedContract] = useState(null);
  const [showMediaModal, setShowMediaModal] = useState(null);

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
        className="bg-nexus-900 text-white rounded-2xl p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
      >
        <div>
          <p className="text-white/50 text-sm font-bold uppercase tracking-widest mb-2">Espace Sourcing Sécurisé</p>
          <h1 className="text-3xl font-black tracking-tight">Suivi des Chantiers</h1>
          <p className="text-white/70 mt-2 font-medium text-sm max-w-lg">Pilotez l'avancement de vos contrats, consultez les médias des PME et suivez les jalons en temps réel.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white/10 rounded-2xl px-5 py-4 text-center">
            <span className="text-3xl font-black text-white">{CONTRACTS.length}</span>
            <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mt-1">Contrats</p>
          </div>
          <div className="bg-danger-400/20 rounded-2xl px-5 py-4 text-center">
            <span className="text-3xl font-black text-white">{CONTRACTS.filter(c => c.alert).length}</span>
            <p className="text-[10px] font-bold text-danger-300 uppercase tracking-widest mt-1">Alertes</p>
          </div>
        </div>
      </motion.div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {KANBAN_COLUMNS.map(col => {
          const items = CONTRACTS.filter(c => c.statut === col.id);
          const Icon = col.icon;
          const c = colorMap[col.color];
          return (
            <div key={col.id} className="bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden">
              <div className={`flex items-center justify-between px-5 py-4 border-b ${c.header}`}>
                <div className="flex items-center gap-2">
                  <Icon size={16} />
                  <span className="text-sm font-bold">{col.label}</span>
                </div>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black text-white ${c.dot}`}>
                  {items.length}
                </span>
              </div>
              <div className="p-3 space-y-3 min-h-[200px]">
                {items.length === 0 ? (
                  <div className="text-center py-8 text-xs text-gray-400 font-medium">Aucun contrat</div>
                ) : items.map(contract => (
                  <motion.button
                    key={contract.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => setSelectedContract(contract)}
                    className={`w-full text-left bg-white border rounded-xl p-4 hover:shadow-md transition-all ${
                      selectedContract?.id === contract.id ? 'border-nexus-300 ring-2 ring-nexus-100' : 'border-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-black text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">{contract.id}</span>
                      {contract.alert && <AlertTriangle size={12} className="text-danger-500 animate-pulse" />}
                    </div>
                    <h4 className="text-xs font-bold text-gray-900 leading-snug line-clamp-2">{contract.titre}</h4>
                    <div className="flex items-center gap-1 mt-2 text-[10px] text-gray-500">
                      <Building2 size={10} /> {contract.pme}
                    </div>
                    <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${contract.alert ? 'bg-danger-500' : contract.progression === 100 ? 'bg-success-500' : 'bg-nexus-500'}`}
                        style={{ width: `${contract.progression}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-[9px] font-bold text-gray-400">{contract.progression}%</span>
                      <span className="text-[9px] font-bold text-gray-400">{formatCFA(contract.budgetFcfa)}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Contract Detail Panel */}
      {selectedContract && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-gray-100 rounded-2xl p-6 shadow-soft space-y-6"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-black text-nexus-600 bg-nexus-50 px-2 py-0.5 rounded-full border border-nexus-100">{selectedContract.id}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  selectedContract.statut === 'termine' ? 'bg-success-50 text-success-700' :
                  selectedContract.statut === 'bloque' ? 'bg-danger-50 text-danger-700' :
                  'bg-nexus-50 text-nexus-700'
                }`}>
                  {selectedContract.statut === 'termine' ? 'Terminé' : selectedContract.statut === 'bloque' ? 'Bloqué' : 'En cours'}
                </span>
              </div>
              <h3 className="text-lg font-black text-gray-900">{selectedContract.titre}</h3>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                <span className="flex items-center gap-1"><Building2 size={14} /> {selectedContract.donneur}</span>
                <span className="flex items-center gap-1"><User size={14} /> {selectedContract.pme}</span>
                <span className="font-bold text-gray-900">{formatCFA(selectedContract.budgetFcfa)}</span>
              </div>
            </div>
            <button
              onClick={() => toast.info(`Ajouter une remarque — ${selectedContract.id}`, {
                description: 'Ouvrir l\'espace de communication tripartite.'
              })}
              className="flex items-center gap-2 bg-nexus-500 text-white px-5 py-3 rounded-xl font-bold text-sm hover:bg-nexus-600 transition-colors"
            >
              <MessageSquare size={16} /> Remarquer
            </button>
          </div>

          {/* Milestone Pipeline */}
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-5">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Jalons du Contrat</h4>
            <MilestonePipeline milestones={selectedContract.milestones} />
          </div>

          {/* Progression bar */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-bold text-gray-500">Progression</span>
              <span className="font-black text-gray-900">{selectedContract.progression}%</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  selectedContract.alert ? 'bg-danger-500' : selectedContract.progression === 100 ? 'bg-success-500' : 'bg-nexus-500'
                }`}
                style={{ width: `${selectedContract.progression}%` }}
              />
            </div>
          </div>

          {/* Media Grid */}
          {selectedContract.media.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Image size={14} /> Médias publiés par la PME ({selectedContract.media.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {selectedContract.media.map((m, i) => (
                  <button
                    key={i}
                    onClick={() => setShowMediaModal(m)}
                    className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-left hover:border-nexus-100 hover:bg-nexus-50/30 transition-all group"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Image size={14} className="text-nexus-500" />
                      <span className="text-xs font-bold text-gray-700">{m.label}</span>
                    </div>
                    <p className="text-[10px] text-gray-500 font-medium">{m.commentaire}</p>
                    <p className="text-[9px] text-gray-400 font-bold mt-2">{m.date}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Remarques / Communication */}
          <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
              <MessageSquare size={14} /> Fil de discussion ({selectedContract.remarques.length})
            </h4>
            <div className="space-y-3">
              {selectedContract.remarques.length === 0 ? (
                <p className="text-xs text-gray-400 font-medium">Aucune remarque pour le moment.</p>
              ) : selectedContract.remarques.map((r, i) => (
                <div key={i} className={`rounded-xl p-4 border ${
                  r.type === 'do' ? 'bg-nexus-50 border-nexus-100 ml-8' : 'bg-gray-50 border-gray-100 mr-8'
                }`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-gray-700">{r.auteur}</span>
                    <span className="text-[9px] font-bold text-gray-400">{r.date}</span>
                  </div>
                  <p className="text-xs text-gray-600 font-medium">{r.texte}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Media Modal */}
      {showMediaModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowMediaModal(null)}
          className="fixed inset-0 z-50 bg-nexus-900/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={e => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <Image size={20} className="text-nexus-500" />
              <div>
                <h3 className="font-bold text-gray-900">{showMediaModal.label}</h3>
                <p className="text-xs text-gray-500 font-medium">{showMediaModal.date}</p>
              </div>
            </div>
            <div className="bg-gray-100 rounded-xl h-48 flex items-center justify-center mb-4">
              <Image size={48} className="text-gray-300" />
            </div>
            <p className="text-sm text-gray-700 font-medium">{showMediaModal.commentaire}</p>
            <button
              onClick={() => setShowMediaModal(null)}
              className="mt-4 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl transition-colors"
            >
              Fermer
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}