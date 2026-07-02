import React from 'react';
import SharedPrivateLayout from './SharedPrivateLayout';
import { LayoutDashboard, Route, BookOpen, Award, FileText, User, Bell, Briefcase } from "lucide-react";

const pmeMenuItems = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/dashboard/parcours", label: "Mes parcours", icon: Route },
  { path: "/dashboard/formations", label: "Mes formations", icon: BookOpen },
  { path: "/dashboard/certification", label: "Mes certifications", icon: Award },
  { path: "/dashboard/documents", label: "Documents", icon: FileText },
  { path: "/dashboard/profile", label: "Mon profil", icon: User },
  { path: "/dashboard/messages", label: "Messages", icon: Bell },
  { path: "/dashboard/projects", label: "Projets", icon: Briefcase },
  { path: "/dashboard/suivi-contrat", label: "Suivi Contrats", icon: Briefcase },
];

export default function PrivateLayoutPME() {
  return <SharedPrivateLayout menuItems={pmeMenuItems} userRoleLabel="PME" />;
}
