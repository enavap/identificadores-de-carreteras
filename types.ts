
import React from 'react';

export enum Language {
  ES = 'es',
  EN = 'en'
}

export type UserRole = 'admin' | 'waze-team' | 'champ' | 'editor' | 'lector';

export interface SubModulePermissions {
  showSelector: boolean;
  showTechInfo: boolean;
  showCCAA: boolean;
  showExplorer: boolean;
  showPreview: boolean;
  showStructure: boolean;
  showTechView: boolean;
  showInfoBox: boolean;
  canEditStructure: boolean;
  canScalePreview: boolean;
  canClickNoPlateCCAA: boolean;
  canAccessDataCenter: boolean;
}

export interface User {
  id: string;
  username: string;
  password?: string;
  role: UserRole;
  isValidated: boolean;
}

export interface Province {
  id: string;
  name: string;
}

export interface CcaaType {
  id: string;
  nombre: string;
  provinces: Province[];
}

export interface RoadPart {
  label: string;
  value: string;
  fixed?: boolean;
}

export interface RoadConfig {
  id: string;
  nombre: string;
  placaEjemplo: string;
  fondoHex: string;
  colorTexto: string;
  partes: RoadPart[];
  bordeHex?: string;
  pictogramaM?: boolean;
  ccaaCompatibles: string[];
}

export interface RealRoadEntry {
  id: string;
  name: string;
  typeId: string;
  ccaaIds: string[];
  provinceId?: string; // Representa la provincia principal o código de provincias
}

export interface ColorData {
  hex: string;
  rgb: string;
  hsl: string;
  hsv: string;
  cmyk: string;
}

export interface ModuleDefinition {
  id: string;
  icon: string;
  name: { [key in Language]: string };
  description: { [key in Language]: string };
  component: React.ComponentType<any>;
  translations: {
    [key in Language]: { title: string; subtitle: string };
  };
}
