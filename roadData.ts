
import { RealRoadEntry } from './types';

export const INITIAL_ROADS: RealRoadEntry[] = [
  // --- RED EUROPEA ---
  { id: 'e1', name: 'E-90', typeId: 'europea', ccaaIds: ['MD', 'EX'], provinceId: 'M,BA,CC' },
  { id: 'e4', name: 'E-05', typeId: 'europea', ccaaIds: ['MD', 'CL', 'GA'], provinceId: 'M,VA,BU,C' },
  
  // --- MADRID ESPECIALES ---
  { id: 'md_m501', name: 'M-501', typeId: 'madrid-1', ccaaIds: ['MD'], provinceId: 'M' },
  { id: 'md_m607', name: 'M-607', typeId: 'madrid-2', ccaaIds: ['MD'], provinceId: 'M' },
  { id: 'md_m404', name: 'M-404', typeId: 'madrid-3', ccaaIds: ['MD'], provinceId: 'M' },
  { id: 'md_m30', name: 'M-30', typeId: 'urbana', ccaaIds: ['MD'], provinceId: 'M' },

  // --- CASTILLA Y LEÓN (CL) ---
  { id: 'cl_a62', name: 'A-62', typeId: 'autovia', ccaaIds: ['CL'], provinceId: 'BU,VA,SA' },
  { id: 'cl_cl601', name: 'CL-601', typeId: 'autonomica-1', ccaaIds: ['CL'], provinceId: 'SG,VA' },
  { id: 'cl_cl602', name: 'CL-602', typeId: 'autonomica-1', ccaaIds: ['CL'], provinceId: 'VA' },
  { id: 'cl_p12', name: 'P-12', typeId: 'autonomica-2', ccaaIds: ['CL'], provinceId: 'P' },
  { id: 'cl_le451', name: 'LE-451', typeId: 'autonomica-3', ccaaIds: ['CL'], provinceId: 'LE' },
  { id: 'cl_za100', name: 'ZA-100', typeId: 'autonomica-2', ccaaIds: ['CL'], provinceId: 'ZA' },
  { id: 'cl_av900', name: 'AV-900', typeId: 'autonomica-3', ccaaIds: ['CL'], provinceId: 'AV' },
  { id: 'cl_so100', name: 'SO-100', typeId: 'autonomica-2', ccaaIds: ['CL'], provinceId: 'SO' },

  // --- PAÍS VASCO (PV) - ÁLAVA (VI) ---
  { id: 'pv_ap1', name: 'AP-1', typeId: 'autovia', ccaaIds: ['PV', 'CL'], provinceId: 'VI,BU' },
  { id: 'pv_a1', name: 'A-1', typeId: 'autovia', ccaaIds: ['PV', 'MD', 'CL'], provinceId: 'VI,M,BU' },
  { id: 'pv_n102', name: 'N-102', typeId: 'nacional', ccaaIds: ['PV'], provinceId: 'VI' },
  { id: 'pv_a627', name: 'A-627', typeId: 'autonomica-1', ccaaIds: ['PV'], provinceId: 'VI' },

  // --- GALICIA (GA) - ORENSE (OU) Y LUGO (LU) ---
  { id: 'ga_ag53', name: 'AG-53', typeId: 'autovia', ccaaIds: ['GA'], provinceId: 'OU' },
  { id: 'ga_ou533', name: 'OU-533', typeId: 'autonomica-1', ccaaIds: ['GA'], provinceId: 'OU' },
  { id: 'ga_ou101', name: 'OU-101', typeId: 'autonomica-2', ccaaIds: ['GA'], provinceId: 'OU' },
  { id: 'ga_lu530', name: 'LU-530', typeId: 'autonomica-1', ccaaIds: ['GA'], provinceId: 'LU' },
  { id: 'ga_lu232', name: 'LU-232', typeId: 'autonomica-2', ccaaIds: ['GA'], provinceId: 'LU' },
  { id: 'ga_lu862', name: 'LU-862', typeId: 'autonomica-3', ccaaIds: ['GA'], provinceId: 'LU' },

  // --- OTROS ---
  { id: 'ri_lo20', name: 'LO-20', typeId: 'autovia', ccaaIds: ['RI'], provinceId: 'LO' },
  { id: 'ce_ce1', name: 'CE-1', typeId: 'autonomica-1', ccaaIds: ['CE'], provinceId: 'CE' },
  { id: 'ml_ml1', name: 'ML-1', typeId: 'autonomica-1', ccaaIds: ['ML'], provinceId: 'ML' }
];
