
import { RoadConfig, CcaaType } from './types';

export const ALL_CCAA: CcaaType[] = [
  { id: 'AN', nombre: 'Andalucía', provinces: [{id:'SE', name:'Sevilla'}, {id:'MA', name:'Málaga'}, {id:'CA', name:'Cádiz'}, {id:'CO', name:'Córdoba'}, {id:'GR', name:'Granada'}, {id:'AL', name:'Almería'}, {id:'HU', name:'Huelva'}, {id:'JA', name:'Jaén'}] },
  { id: 'AR', nombre: 'Aragón', provinces: [{id:'Z', name:'Zaragoza'}, {id:'HU', name:'Huesca'}, {id:'TE', name:'Teruel'}] },
  { id: 'AS', nombre: 'Asturias', provinces: [{id:'O', name:'Oviedo'}] },
  { id: 'IB', nombre: 'Baleares', provinces: [{id:'PM', name:'Palma de Mallorca'}] },
  { id: 'CN', nombre: 'Canarias', provinces: [{id:'TF', name:'Tenerife'}, {id:'GC', name:'Gran Canaria'}] },
  { id: 'CB', nombre: 'Cantabria', provinces: [{id:'S', name:'Santander'}] },
  { id: 'CM', nombre: 'Castilla-La Mancha', provinces: [{id:'TO', name:'Toledo'}, {id:'CR', name:'Ciudad Real'}, {id:'AB', name:'Albacete'}, {id:'CU', name:'Cuenca'}, {id:'GU', name:'Guadalajara'}] },
  { id: 'CL', nombre: 'Castilla y León', provinces: [{id:'VA', name:'Valladolid'}, {id:'LE', name:'León'}, {id:'BU', name:'Burgos'}, {id:'SA', name:'Salamanca'}, {id:'ZA', name:'Zamora'}, {id:'SG', name:'Segovia'}, {id:'AV', name:'Ávila'}, {id:'SO', name:'Soria'}, {id:'P', name:'Palencia'}] },
  { id: 'CT', nombre: 'Cataluña', provinces: [{id:'B', name:'Barcelona'}, {id:'GI', name:'Gerona'}, {id:'L', name:'Lérida'}, {id:'T', name:'Tarragona'}] },
  { id: 'EX', nombre: 'Extremadura', provinces: [{id:'BA', name:'Badajoz'}, {id:'CC', name:'Cáceres'}] },
  { id: 'GA', nombre: 'Galicia', provinces: [{id:'C', name:'La Coruña'}, {id:'LU', name:'Lugo'}, {id:'OU', name:'Orense'}, {id:'PO', name:'Pontevedra'}] },
  { id: 'MD', nombre: 'Madrid', provinces: [{id:'M', name:'Madrid'}] },
  { id: 'MC', nombre: 'Murcia', provinces: [{id:'MU', name:'Murcia'}] },
  { id: 'NC', nombre: 'Navarra', provinces: [{id:'NA', name:'Navarra'}] },
  { id: 'PV', nombre: 'País Vasco', provinces: [{id:'BI', name:'Vizcaya'}, {id:'SS', name:'Guipúzcoa'}, {id:'VI', name:'Álava'}] },
  { id: 'RI', nombre: 'La Rioja', provinces: [{id:'LO', name:'Logroño'}] },
  { id: 'VC', nombre: 'C. Valenciana', provinces: [{id:'V', name:'Valencia'}, {id:'A', name:'Alicante'}, {id:'CS', name:'Castellón'}] },
  { id: 'CE', nombre: 'Ceuta', provinces: [{id:'CE', name:'Ceuta'}] },
  { id: 'ML', nombre: 'Melilla', provinces: [{id:'ML', name:'Melilla'}] }
];

const ALL_IDS = ALL_CCAA.map(c => c.id);

export const ROAD_CONFIGS: RoadConfig[] = [
  {
    id: 'europea',
    nombre: 'Red Europea (E-XX)',
    placaEjemplo: 'E-90',
    fondoHex: '#007A33',
    colorTexto: '#FFFFFF',
    ccaaCompatibles: ALL_IDS,
    partes: [{ label: 'Prefijo', value: 'E' }, { label: 'Guion', value: '-' }, { label: 'Número', value: '90' }]
  },
  {
    id: 'autovia',
    nombre: 'Autovía / Autopista (A-X)',
    placaEjemplo: 'A-3',
    fondoHex: '#003399',
    colorTexto: '#FFFFFF',
    ccaaCompatibles: ALL_IDS,
    partes: [{ label: 'Prefijo', value: 'A' }, { label: 'Guion', value: '-' }, { label: 'Número', value: '3' }]
  },
  {
    id: 'nacional',
    nombre: 'Carretera Nacional (N-XXX)',
    placaEjemplo: 'N-340',
    fondoHex: '#C10000',
    colorTexto: '#FFFFFF',
    ccaaCompatibles: ALL_IDS,
    partes: [{ label: 'Prefijo', value: 'N' }, { label: 'Guion', value: '-' }, { label: 'Número', value: '340' }]
  },
  {
    id: 'madrid-m1',
    nombre: 'Madrid Principal (Naranja M-XX)',
    placaEjemplo: 'M-301',
    fondoHex: '#FF6600',
    colorTexto: '#000000',
    pictogramaM: true,
    ccaaCompatibles: ['MD'],
    partes: [{ label: 'Prefijo', value: 'M' }, { label: 'Número', value: '301' }]
  },
  {
    id: 'madrid-m2',
    nombre: 'Madrid Secundaria (Verde M-XX)',
    placaEjemplo: 'M-311',
    fondoHex: '#008000',
    colorTexto: '#FFFFFF',
    pictogramaM: true,
    ccaaCompatibles: ['MD'],
    partes: [{ label: 'Prefijo', value: 'M' }, { label: 'Número', value: '311' }]
  },
  {
    id: 'madrid-m3',
    nombre: 'Madrid Local (Amarillo M-XXXX)',
    placaEjemplo: 'M-549',
    fondoHex: '#FFFF00',
    colorTexto: '#000000',
    pictogramaM: true,
    ccaaCompatibles: ['MD'],
    partes: [{ label: 'Prefijo', value: 'M' }, { label: 'Número', value: '549' }]
  },
  {
    id: 'euskadi-foral',
    nombre: 'Euskadi Foral (Gris)',
    placaEjemplo: 'BI-631',
    fondoHex: '#777777',
    colorTexto: '#FFFFFF',
    ccaaCompatibles: ['PV'],
    partes: [{ label: 'Prefijo', value: 'BI' }, { label: 'Guion', value: '-' }, { label: 'Número', value: '631' }]
  },
  {
    id: 'galicia-provincial',
    nombre: 'Galicia Provincial (Azul DP/EP)',
    placaEjemplo: 'DP-1201',
    fondoHex: '#003399',
    colorTexto: '#FFFFFF',
    ccaaCompatibles: ['GA'],
    partes: [{ label: 'Prefijo', value: 'DP' }, { label: 'Guion', value: '-' }, { label: 'Número', value: '1201' }]
  },
  {
    id: 'ourense-especial',
    nombre: 'Ourense Especial (Blanco/Rojo)',
    placaEjemplo: 'OU-P-0000',
    fondoHex: '#FFFFFF',
    colorTexto: '#C10000',
    bordeHex: '#C10000',
    ccaaCompatibles: ['GA'],
    partes: [{ label: 'Prefijo', value: 'OU-P' }, { label: 'Guion', value: '-' }, { label: 'Número', value: '0000' }]
  },
  {
    id: 'galicia-vias-rapidas',
    nombre: 'Galicia Vías Rápidas (Verde CG/VG)',
    placaEjemplo: 'CG-2.2',
    fondoHex: '#007A33',
    colorTexto: '#FFFFFF',
    ccaaCompatibles: ['GA'],
    partes: [{ label: 'Prefijo', value: 'CG' }, { label: 'Guion', value: '-' }, { label: 'Número', value: '2.2' }]
  },
  {
    id: 'insular-canarias',
    nombre: 'Insular Canarias',
    placaEjemplo: 'GC-1',
    fondoHex: '#003399',
    colorTexto: '#FFFFFF',
    ccaaCompatibles: ['CN'],
    partes: [{ label: 'Prefijo', value: 'GC' }, { label: 'Guion', value: '-' }, { label: 'Número', value: '1' }]
  },
  {
    id: 'insular-baleares',
    nombre: 'Insular Baleares',
    placaEjemplo: 'Ma-1',
    fondoHex: '#003399',
    colorTexto: '#FFFFFF',
    ccaaCompatibles: ['IB'],
    partes: [{ label: 'Prefijo', value: 'Ma' }, { label: 'Guion', value: '-' }, { label: 'Número', value: '1' }]
  },
  {
    id: 'autonomica-2',
    nombre: 'Autonómica 2º Nivel (Verde)',
    placaEjemplo: 'A-401',
    fondoHex: '#007A33',
    colorTexto: '#FFFFFF',
    ccaaCompatibles: ALL_IDS,
    partes: [{ label: 'Prefijo', value: 'A' }, { label: 'Guion', value: '-' }, { label: 'Número', value: '401' }]
  },
  {
    id: 'autonomica-3',
    nombre: 'Autonómica 3º Nivel (Amarillo)',
    placaEjemplo: 'A-4001',
    fondoHex: '#FFD700',
    colorTexto: '#000000',
    ccaaCompatibles: ALL_IDS,
    partes: [{ label: 'Prefijo', value: 'A' }, { label: 'Guion', value: '-' }, { label: 'Número', value: '4001' }]
  },
  {
    id: 'urbana',
    nombre: 'Urbana (Blanco)',
    placaEjemplo: 'M-30',
    fondoHex: '#FFFFFF',
    colorTexto: '#000000',
    bordeHex: '#000000',
    ccaaCompatibles: ALL_IDS,
    partes: [{ label: 'Nombre', value: 'M-30' }]
  }
];
