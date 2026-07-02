import React from 'react';
import SharedPrivateLayout from './SharedPrivateLayout';
import { LayoutDashboard, Search, FilePlus, BarChart } from "lucide-react";

const doMenuItems = [
  { path: "/donneur-ordre", label: "Dashboard", icon: LayoutDashboard },
  { path: "/donneur-ordre/annuaire", label: "Annuaire Certifié", icon: Search },
  { path: "/donneur-ordre/publier", label: "Publier un AO", icon: FilePlus },
  { path: "/donneur-ordre/analytics", label: "Mes AO / Analytics", icon: BarChart },
];

export default function PrivateLayoutDO() {
  return <SharedPrivateLayout menuItems={doMenuItems} userRoleLabel="Donneur d'Ordre" />;
}
