
import React from 'react';
import { ModuleDefinition } from './types';
import RoadIdentifiersModule from './modules/RoadIdentifiersModule';

// Aquí es donde se añaden o eliminan módulos de la aplicación
export const MODULES: ModuleDefinition[] = [
  {
    id: 'road-ids',
    icon: '🛣️',
    name: { es: 'Identificadores de Carreteras', en: 'Road Identifiers' },
    description: { 
      es: 'Estandarización técnica de cajetines viales de España.', 
      en: 'Technical standardization of Spanish road signs.' 
    },
    component: RoadIdentifiersModule,
    translations: {
      es: { title: 'Gestor de Carreteras', subtitle: 'Panel Técnico' },
      en: { title: 'Road Manager', subtitle: 'Technical Panel' }
    }
  }
];

export function getModuleById(id: string) {
  return MODULES.find(m => m.id === id);
}
