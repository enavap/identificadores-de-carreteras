
import React from 'react';
import { RoadConfig, Language } from '../types';
import RoadSign from './RoadSign';
import { roadIdsTranslations } from '../translations/roadIds';

interface TechnicalDrawingProps {
  config: RoadConfig;
  currentScale: number;
  textOverride?: string;
  isSubComponent?: boolean;
  lang: Language;
}

const TechnicalDrawing: React.FC<TechnicalDrawingProps> = ({ config, currentScale, textOverride, isSubComponent = false, lang }) => {
  const t = roadIdsTranslations[lang];
  const visualScale = 2.2;
  
  const realBorder = 2.5 * currentScale;
  const realPadding = realBorder * 1.5; 
  const realRadius = 10 * currentScale;
  const realTextSize = 38 * currentScale;
  
  const visBorder = 2.5 * visualScale;
  const visPadding = visBorder * 1.5;
  const visRadius = 10 * visualScale;

  const containerClasses = isSubComponent 
    ? "relative w-full flex flex-col items-center select-none" 
    : "relative bg-white p-8 rounded-3xl shadow-2xl border border-black/20 overflow-hidden mb-12 flex flex-col items-center select-none";

  return (
    <div className={containerClasses}>
      {!isSubComponent && (
        <div className="w-full flex justify-between items-start mb-16 z-10 text-black">
          <div className="flex flex-col">
            <span className="text-[20px] font-black tracking-tighter uppercase italic">ESQUEMA TÉCNICO V.15</span>
            <span className="text-[10px] font-bold text-black/40 uppercase tracking-widest">Dimensiones Unificadas: T=38px base</span>
          </div>
        </div>
      )}

      <div className="relative flex items-center justify-center w-full min-h-[340px] py-12">
        <div className="relative flex items-center justify-center">
          <div className="relative opacity-15 grayscale-[0.2] z-0">
            <RoadSign config={config} scale={visualScale} textOverride={textOverride} />
          </div>

          <div className="absolute inset-0 z-10 pointer-events-none">
            <div className="absolute inset-0 border-[2.5px] border-orange-500/40" style={{ borderRadius: `${visRadius}px` }}>
              <div className="absolute -top-14 right-8 flex flex-col items-center">
                 <div className="bg-white px-2 py-0.5 text-[10px] font-black text-orange-700 font-mono shadow border border-orange-200 rounded-md mb-1">
                   B: {realBorder.toFixed(2)}px
                 </div>
                 <div className="w-[2px] h-14 bg-orange-600"></div>
              </div>
            </div>

            <div className="absolute border border-dashed border-emerald-500/60" style={{ 
                top: `${visBorder}px`, left: `${visBorder}px`, right: `${visBorder}px`, bottom: `${visBorder}px`,
                borderRadius: `${visRadius - visBorder}px`
            }}>
               <div className="absolute -top-24 left-1/3 flex flex-col items-center">
                 <div className="bg-white px-2 py-0.5 text-[10px] font-black text-emerald-700 font-mono shadow border border-emerald-200 rounded-md mb-1 whitespace-nowrap">
                   {t.padding}: {realPadding.toFixed(2)}px
                 </div>
                 <div className="w-[2px] h-24 bg-emerald-600"></div>
              </div>
            </div>

            <div className="absolute border border-blue-400/30 bg-blue-400/5" style={{ 
                top: `${visBorder + visPadding}px`, left: `${visBorder + visPadding}px`, 
                right: `${visBorder + visPadding}px`, bottom: `${visBorder + visPadding}px`
            }}>
               <div className="absolute -left-40 top-0 bottom-0 flex items-center">
                 <div className="bg-white px-2 py-1 text-[11px] font-black text-blue-800 font-mono shadow border border-blue-200 rounded-md mr-4 whitespace-nowrap">
                   {t.text.toUpperCase()} / M: {realTextSize.toFixed(1)}px
                 </div>
                 <div className="h-full w-[2px] bg-blue-600 relative">
                    <div className="absolute top-0 left-[-6px] w-4 h-[2px] bg-blue-600"></div>
                    <div className="absolute bottom-0 left-[-6px] w-4 h-[2px] bg-blue-600"></div>
                 </div>
              </div>
            </div>

            <div className="absolute top-0 left-0">
               <svg width="120" height="120" className="absolute top-0 left-0 text-indigo-500 opacity-80 overflow-visible">
                 <path d={`M 0,${visRadius} A ${visRadius},${visRadius} 0 0 1 ${visRadius},0`} fill="none" stroke="currentColor" strokeWidth="4" />
                 <line x1={visRadius * 0.4} y1={visRadius * 0.4} x2="-22" y2="-22" stroke="currentColor" strokeWidth="2" />
               </svg>
               <div className="absolute -top-14 -left-14 bg-white px-2 py-0.5 text-[11px] font-black text-indigo-700 font-mono shadow border border-indigo-200 rounded-md z-20">
                 R: {realRadius.toFixed(1)}px
               </div>
            </div>

            <div className="absolute -bottom-14 left-0 right-0 text-center">
              <span className="bg-black/5 px-4 py-1 text-[9px] font-black text-black/30 uppercase tracking-[0.3em] rounded-full border border-black/5">{t.visualCalibration}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalDrawing;
