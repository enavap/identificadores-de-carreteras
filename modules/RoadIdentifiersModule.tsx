
import React, { useState, useMemo, useEffect } from 'react';
import { SubModulePermissions, Language, RoadConfig, RealRoadEntry, CcaaType } from '../types';
import { roadIdsTranslations } from '../translations/roadIds';

// Subcomponentes refactorizados
import Communities from './road-ids/Communities';
import RoadCatalog from './road-ids/RoadCatalog';
import PreviewView from './road-ids/PreviewView';
import TechnicalSpecs from './road-ids/TechnicalSpecs';
import TechnicalView from './road-ids/TechnicalView';

interface Props {
  perms: SubModulePermissions;
  lang: Language;
  configs: RoadConfig[];
  catalog: RealRoadEntry[];
  ccaa: CcaaType[];
}

const RoadIdentifiersModule: React.FC<Props> = ({ perms, lang, configs, catalog, ccaa }) => {
  const t = roadIdsTranslations[lang];
  const [selectedRoadId, setSelectedRoadId] = useState(configs[0].id);
  const [selectedCcaaId, setSelectedCcaaId] = useState<string | null>(null);
  const [selectedProvId, setSelectedProvId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [scale, setScale] = useState(1.5);
  
  const activeConfig = useMemo(() => configs.find(r => r.id === selectedRoadId) || configs[0], [selectedRoadId, configs]);
  const [editableParts, setEditableParts] = useState<string[]>([]);

  useEffect(() => {
    setEditableParts(activeConfig.partes.map(p => p.value));
  }, [activeConfig]);

  const filteredRoads = useMemo(() => {
    return catalog.filter(r => {
      const typeMatch = r.typeId === activeConfig.id;
      const ccaaMatch = !selectedCcaaId || r.ccaaIds.includes(selectedCcaaId);
      const provMatch = !selectedProvId || r.provinceId?.split(',').includes(selectedProvId);
      const searchMatch = r.name.toLowerCase().includes(search.toLowerCase());
      return typeMatch && ccaaMatch && provMatch && searchMatch;
    }).sort((a,b) => a.name.localeCompare(b.name));
  }, [activeConfig.id, selectedCcaaId, selectedProvId, search, catalog]);

  const selectRoad = (name: string) => {
    if (['europea', 'autovia', 'nacional', 'autonomica-2', 'autonomica-3'].includes(activeConfig.id)) {
      const parts = name.split('-');
      if (parts.length >= 2) {
        setEditableParts([parts[0], '-', parts.slice(1).join('-')]);
      } else {
        setEditableParts([name]);
      }
    } else {
      setEditableParts([name]);
    }
  };

  const currentCcaa = ccaa.find(c => c.id === selectedCcaaId);

  return (
    <div className="space-y-10 animate-in pb-40">
      {/* Header & Selector */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        <div>
          <h2 className="text-5xl font-black italic tracking-tighter uppercase leading-none">{activeConfig.nombre}</h2>
          <p className="text-white/30 text-sm mt-2 font-medium">{t.subtitle}</p>
        </div>
        
        {perms.showSelector && (
          <div className="flex flex-col gap-2">
            <span className="text-[9px] font-black uppercase text-white/30 tracking-widest">{t.networkLevel}</span>
            <select value={selectedRoadId} onChange={e => setSelectedRoadId(e.target.value)} className="bg-slate-900 border border-white/10 p-4 pr-10 rounded-2xl font-bold outline-none cursor-pointer focus:ring-2 focus:ring-blue-500 appearance-none shadow-xl min-w-[300px]">
              {configs.map(r => <option key={r.id} value={r.id}>{r.nombre}</option>)}
            </select>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Left: Control de Datos */}
        <aside className="lg:col-span-4 space-y-6">
          <Communities 
            ccaa={ccaa} 
            catalog={catalog} 
            activeConfig={activeConfig} 
            selectedCcaaId={selectedCcaaId} 
            onSelectCcaa={setSelectedCcaaId}
            canClickNoPlateCCAA={perms.canClickNoPlateCCAA}
            lang={lang}
          />

          <RoadCatalog 
            currentCcaa={currentCcaa}
            selectedProvId={selectedProvId}
            onSelectProv={setSelectedProvId}
            search={search}
            onSearchChange={setSearch}
            filteredRoads={filteredRoads}
            onSelectRoad={selectRoad}
            catalog={catalog}
            activeConfigId={activeConfig.id}
            lang={lang}
          />
        </aside>

        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-8">
           {perms.showPreview && (
             <PreviewView 
               activeConfig={activeConfig}
               editableParts={editableParts}
               setEditableParts={setEditableParts}
               scale={scale}
               onScaleChange={setScale}
               canScale={perms.canScalePreview}
               canEdit={perms.canEditStructure}
               lang={lang}
             />
           )}

           <TechnicalSpecs 
             activeConfig={activeConfig} 
             currentText={editableParts.join('')} 
             lang={lang}
           />

           {perms.showTechView && (
             <TechnicalView 
               activeConfig={activeConfig} 
               scale={scale} 
               text={editableParts.join('')} 
               lang={lang}
             />
           )}
        </div>
      </div>
    </div>
  );
};

export default RoadIdentifiersModule;
