import React from 'react';
import SharedPrivateLayout from './SharedPrivateLayout';
import { LayoutDashboard, FileCheck, ShieldCheck, GraduationCap, Briefcase } from "lucide-react";

const pmeMenuItems = [
  { path: "/dashboard", label: "Cockpit PME", icon: LayoutDashboard },
  { path: "/dashboard/passeport", label: "Passeport Numérique", icon: ShieldCheck },
  { path: "/dashboard/opportunites", label: "Appels d'Offres", icon: Briefcase },
  { path: "/dashboard/suivi-contrat", label: "Mes Contrats", icon: FileCheck },
  { path: "/dashboard/academy", label: "BSTP Academy", icon: GraduationCap },
];

export default function PrivateLayoutPME() {
  return <SharedPrivateLayout menuItems={pmeMenuItems} userRoleLabel="PME" />;
}
