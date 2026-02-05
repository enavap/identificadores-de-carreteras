
import React from 'react';
import { CcaaType, RealRoadEntry, RoadConfig, Language } from '../../types';
import { roadIdsTranslations } from '../../translations/roadIds';

interface Props {
  ccaa: CcaaType[];
  catalog: RealRoadEntry[];
  activeConfig: RoadConfig;
  selectedCcaaId: string | null;
  onSelectCcaa: (id: string | null) => void;
  canClickNoPlateCCAA: boolean;
  lang: Language;
}

const Communities: React.FC<Props> = ({ ccaa, catalog, activeConfig, selectedCcaaId, onSelectCcaa, canClickNoPlateCCAA, lang }) => {
  const t = roadIdsTranslations[lang];
  return (
    <div className="bg-slate-900 border border-white/5 p-6 rounded-[32px] shadow-xl">
      <h3 className="text-[10px] font-black uppercase text-white/40 mb-4 tracking-widest flex items-center gap-2">
        <span>🗺️</span> {t.communities}
      </h3>
      <div className="grid grid-cols-5 gap-1.5">
        {ccaa.map(c => {
          const hasInCatalog = catalog.some(r => r.ccaaIds.includes(c.id) && r.typeId === activeConfig.id);
          const isCompatible = activeConfig.ccaaCompatibles.includes(c.id);
          const canClick = isCompatible || canClickNoPlateCCAA;

          return (
            <button 
              key={c.id}
              title={c.nombre}
              disabled={!canClick}
              onClick={() => onSelectCcaa(selectedCcaaId === c.id ? null : c.id)}
              className={`h-10 rounded-xl text-[10px] font-black transition-all border relative flex items-center justify-center
                ${selectedCcaaId === c.id 
                  ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-900/40' 
                  : isCompatible 
                    ? 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10' 
                    : 'bg-black/40 border-transparent text-white/10 cursor-not-allowed grayscale'}
              `}
            >
              {c.id}
              {hasInCatalog && !selectedCcaaId && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full border border-slate-900 animate-pulse"></span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Communities;
