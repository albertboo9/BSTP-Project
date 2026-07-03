import React from 'react';
import SharedPrivateLayout from './SharedPrivateLayout';
import { LayoutDashboard, FileCheck, ShieldCheck, GraduationCap, Briefcase, UserCheck, BookOpen, Map } from "lucide-react";

const pmeMenuItems = [
  { path: "/dashboard", label: "Cockpit PME", icon: LayoutDashboard },
  { path: "/dashboard/onboarding", label: "Profilage & Onboarding", icon: UserCheck },
  { path: "/dashboard/passeport", label: "Passeport Numérique", icon: ShieldCheck },
  { path: "/dashboard/opportunites", label: "Appels d'Offres", icon: Briefcase },
  { path: "/dashboard/suivi-contrat", label: "Mes Contrats", icon: FileCheck },
  { path: "/dashboard/academy", label: "BSTP Academy", icon: GraduationCap },
  { path: "/dashboard/formations", label: "Catalogue Formations", icon: BookOpen },
  { path: "/dashboard/parcours", label: "Mes Parcours", icon: Map },
];

export default function PrivateLayoutPME() {
  return <SharedPrivateLayout menuItems={pmeMenuItems} userRoleLabel="Espace Croissance" />;
}
