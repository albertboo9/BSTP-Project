import { useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { Sparkles, AlertTriangle, Lightbulb } from 'lucide-react';

export function useProactiveAI(userRole) {
  const hasTriggered = useRef(false);

  useEffect(() => {
    // Prevent spamming the user on every render/navigation
    if (hasTriggered.current) return;
    
    // Simulate a delay before the AI "wakes up" and makes a proactive recommendation
    const timer = setTimeout(() => {
      hasTriggered.current = true;

      if (userRole === 'pme') {
        // Randomize between a few PME AI insights
        const insights = [
          {
            title: "Recommandation IA",
            desc: "Votre certificat de localisation expire dans 15 jours. L'assistant juridique peut vous guider pour le renouveler rapidement.",
            icon: <AlertTriangle size={16} className="text-amber-500" />
          },
          {
            title: "Opportunité Détectée",
            desc: "Un Appel d'Offres (Construction Hangar) correspond à 92% à vos capacités techniques (BTP, Centre).",
            icon: <Sparkles size={16} className="text-indigo-500" />
          },
          {
            title: "BSTP Academy",
            desc: "D'après votre score de Gouvernance (12/20), nous vous recommandons la formation 'Fondamentaux de gestion'.",
            icon: <Lightbulb size={16} className="text-success-500" />
          }
        ];
        const insight = insights[Math.floor(Math.random() * insights.length)];

        toast.custom((t) => (
          <div className="bg-white border border-indigo-100 rounded-xl p-4 shadow-lg shadow-indigo-100/50 flex gap-3 max-w-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-purple-500" />
            <div className="mt-1">{insight.icon}</div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">{insight.title}</h4>
              <p className="text-xs text-gray-500 mt-1 font-medium leading-relaxed">{insight.desc}</p>
            </div>
            <button onClick={() => toast.dismiss(t)} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">×</button>
          </div>
        ), { duration: 8000, position: 'bottom-right' });
      } 
      else if (userRole === 'donneur_ordre') {
        toast.custom((t) => (
          <div className="bg-white border border-indigo-100 rounded-xl p-4 shadow-lg shadow-indigo-100/50 flex gap-3 max-w-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-purple-500" />
            <div className="mt-1"><Sparkles size={16} className="text-indigo-500" /></div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">Radar IA Donneur d'Ordre</h4>
              <p className="text-xs text-gray-500 mt-1 font-medium leading-relaxed">Une nouvelle PME (BTP) de la région Ouest vient d'obtenir la certification OR. Elle pourrait correspondre à vos futurs marchés.</p>
            </div>
            <button onClick={() => toast.dismiss(t)} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">×</button>
          </div>
        ), { duration: 8000, position: 'bottom-right' });
      }
    }, 4000); // Trigger 4 seconds after layout mounts

    return () => clearTimeout(timer);
  }, [userRole]);
}
