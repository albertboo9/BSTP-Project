import React from 'react';
import SharedPrivateLayout from './SharedPrivateLayout';
import { LayoutDashboard, Activity, Users, AlertTriangle } from "lucide-react";

const dgMenuItems = [
  { path: "/observatoire", label: "Cockpit de Pilotage", icon: LayoutDashboard },
  { path: "/observatoire/pipeline", label: "Pipeline Statutaire", icon: Activity },
  { path: "/observatoire/capital-humain", label: "Capital Humain", icon: Users },
  { path: "/observatoire/vigilance", label: "Vigilance Opérationnelle", icon: AlertTriangle },
];

export default function PrivateLayoutDG() {
  return <SharedPrivateLayout menuItems={dgMenuItems} userRoleLabel="Direction Générale" />;
}
