
import React from 'react';
import RoadSign from '../../components/RoadSign';
import { RoadConfig, Language } from '../../types';
import { roadIdsTranslations } from '../../translations/roadIds';

interface Props {
  activeConfig: RoadConfig;
  editableParts: string[];
  setEditableParts: (parts: string[]) => void;
  scale: number;
  onScaleChange: (val: number) => void;
  canScale: boolean;
  canEdit: boolean;
  lang: Language;
}

const PreviewView: React.FC<Props> = ({ 
  activeConfig, editableParts, setEditableParts, scale, onScaleChange, canScale, canEdit, lang 
}) => {
  const t = roadIdsTranslations[lang];
  return (
    <div className="bg-slate-900 border border-white/5 rounded-[48px] overflow-hidden shadow-2xl relative">
      <div className="p-16 flex flex-col items-center justify-center bg-gradient-to-b from-blue-500/10 to-transparent min-h-[420px]">
        <div className="transition-transform duration-500 hover:scale-105">
          <RoadSign config={activeConfig} textOverride={editableParts.join('')} scale={scale} />
        </div>

        {canScale && (
          <div className="mt-16 flex items-center gap-4 bg-black/40 p-4 rounded-3xl border border-white/5 backdrop-blur-md">
            <div className="flex flex-col min-w-[100px]">
              <span className="text-[8px] font-black text-white/30 uppercase tracking-widest">{t.scale}</span>
              <span className="text-xs font-black text-blue-500">{scale.toFixed(1)}x</span>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => onScaleChange(scale - 0.1)} className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center font-black transition-all active:scale-90">-</button>
              <input type="range" min="0.1" max="4.0" step="0.1" value={scale} onChange={e => onScaleChange(parseFloat(e.target.value))} className="w-40 accent-blue-600 cursor-pointer" />
              <button onClick={() => onScaleChange(scale + 0.1)} className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center font-black transition-all active:scale-90">+</button>
            </div>
          </div>
        )}
      </div>

      <div className="bg-slate-950/60 p-10 border-t border-white/5">
        <div className="flex flex-wrap justify-center gap-6">
          {activeConfig.partes.map((p, idx) => (
            <div key={idx} className="flex flex-col items-center group">
              <input 
                type="text"
                disabled={!canEdit}
                value={editableParts[idx]}
                onChange={e => {
                  const next = [...editableParts];
                  next[idx] = e.target.value;
                  setEditableParts(next);
                }}
                className={`w-24 md:w-28 bg-white/5 border border-white/10 rounded-2xl py-5 text-center font-mono font-black text-2xl outline-none transition-all uppercase
                  ${canEdit ? 'focus:border-blue-500 focus:bg-white/10 focus:shadow-lg focus:shadow-blue-900/10' : 'opacity-40 grayscale cursor-not-allowed'}
                `}
              />
              <span className="text-[9px] font-black text-white/20 uppercase mt-4 tracking-[0.2em]">{p.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreviewView;
