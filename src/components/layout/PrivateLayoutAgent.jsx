import React from 'react';
import SharedPrivateLayout from './SharedPrivateLayout';
import { LayoutDashboard, FileCheck, Calendar, Scale } from "lucide-react";

const agentMenuItems = [
  { path: "/agent", label: "Dashboard", icon: LayoutDashboard },
  { path: "/agent/audits", label: "Audit Documentaire", icon: FileCheck },
  { path: "/agent/terrain", label: "Planification Terrain", icon: Calendar },
  { path: "/agent/mediation", label: "Médiation Tripartite", icon: Scale },
];

export default function PrivateLayoutAgent() {
  return <SharedPrivateLayout menuItems={agentMenuItems} userRoleLabel="Agent BSTP" />;
}
