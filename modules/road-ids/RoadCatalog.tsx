
import React from 'react';
import { CcaaType, RealRoadEntry, RoadConfig, Language } from '../../types';
import { roadIdsTranslations } from '../../translations/roadIds';

interface Props {
  currentCcaa: CcaaType | undefined;
  selectedProvId: string | null;
  onSelectProv: (id: string | null) => void;
  search: string;
  onSearchChange: (val: string) => void;
  filteredRoads: RealRoadEntry[];
  onSelectRoad: (name: string) => void;
  catalog: RealRoadEntry[];
  activeConfigId: string;
  lang: Language;
}

const RoadCatalog: React.FC<Props> = ({ 
  currentCcaa, selectedProvId, onSelectProv, search, onSearchChange, 
  filteredRoads, onSelectRoad, catalog, activeConfigId, lang 
}) => {
  const t = roadIdsTranslations[lang];
  return (
    <div className="bg-slate-900 border border-white/5 p-6 rounded-[32px] shadow-xl">
      <h3 className="text-[10px] font-black uppercase text-white/40 mb-4 tracking-widest flex items-center gap-2">
        <span>🔍</span> {t.catalog}
      </h3>
      
      {currentCcaa && (
        <div className="mb-4 space-y-2 bg-black/20 p-4 rounded-2xl border border-white/5">
          <div className="flex justify-between items-center">
            <span className="text-[9px] font-black text-white/20 uppercase">{t.provinces} ({currentCcaa.id})</span>
            <button onClick={() => onSelectProv(null)} className="text-[8px] text-blue-500 font-black uppercase hover:underline">{t.reset}</button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {currentCcaa.provinces.map(p => {
              const hasInCatalog = catalog.some(r => r.typeId === activeConfigId && r.provinceId?.split(',').includes(p.id));
              return (
                <button 
                  key={p.id}
                  onClick={() => onSelectProv(selectedProvId === p.id ? null : p.id)}
                  className={`px-3 py-1.5 rounded-lg text-[9px] font-black border transition-all relative
                    ${selectedProvId === p.id ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white/5 border-white/10 text-white/40 hover:text-white/60'}
                  `}
                >
                  {p.id}
                  {hasInCatalog && <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-blue-400 rounded-full"></span>}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <input 
        type="text" 
        placeholder={t.searchPlaceholder}
        value={search}
        onChange={e => onSearchChange(e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-sm outline-none mb-4 focus:border-blue-500 transition-colors placeholder:text-white/10 uppercase"
      />

      <div className="grid grid-cols-2 gap-2 max-h-[280px] overflow-y-auto pr-2 custom-scrollbar">
        {filteredRoads.map(r => (
          <div 
            key={r.id} 
            onClick={() => onSelectRoad(r.name)}
            className="bg-white/5 border border-white/5 p-3 rounded-2xl cursor-pointer hover:bg-blue-600 hover:border-blue-600 transition-all text-center group"
          >
            <span className="font-mono font-black text-[10px] group-hover:text-white uppercase">{r.name}</span>
          </div>
        ))}
        {filteredRoads.length === 0 && (
          <p className="col-span-2 text-center py-10 text-[10px] text-white/10 font-black uppercase italic">{t.noResults}</p>
        )}
      </div>
    </div>
  );
};

export default RoadCatalog;
