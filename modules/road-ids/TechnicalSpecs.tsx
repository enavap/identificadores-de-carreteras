
import React, { useMemo } from 'react';
import { RoadConfig, Language } from '../../types';
import { getAllColorData } from '../../utils/color';
import { roadIdsTranslations } from '../../translations/roadIds';

interface Props {
  activeConfig: RoadConfig;
  currentText: string;
  lang: Language;
}

const TechnicalSpecs: React.FC<Props> = ({ activeConfig, currentText, lang }) => {
  const t = roadIdsTranslations[lang];
  const bgData = useMemo(() => getAllColorData(activeConfig.fondoHex), [activeConfig.fondoHex]);
  const textData = useMemo(() => getAllColorData(activeConfig.colorTexto), [activeConfig.colorTexto]);
  const borderHex = activeConfig.bordeHex || activeConfig.colorTexto;
  const borderData = useMemo(() => getAllColorData(borderHex), [borderHex]);

  const borderWidth = 2.5;
  const padding = borderWidth * 1.5;
  const radius = 10;
  const fontSize = 38;

  return (
    <div className="bg-slate-900 border border-white/5 p-8 rounded-[40px] shadow-2xl space-y-10">
      <h3 className="text-[10px] font-black uppercase text-blue-500 tracking-widest flex items-center gap-2">
        <span>📋</span> {t.techSheet}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-8">
          <ColorSection title={t.background} data={bgData} />
          <ColorSection title={t.border} data={borderData} />
          <ColorSection title={t.text} data={textData} />
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <MetricRow label={t.borderSize} val={`${borderWidth.toFixed(1)}px`} />
            <MetricRow label={t.radius} val={`${radius}px`} />
            <MetricRow label={t.textSize} val={`${fontSize}px`} />
            <MetricRow label={t.padding} val={`${padding.toFixed(2)}px`} />
          </div>

          <div className="pt-6 border-t border-white/5">
            <MetricRow label={t.typography} val="Arial Black / Bold" />
            <div className="mt-4 bg-black/40 p-4 rounded-2xl border border-white/5 flex justify-between items-center">
              <div>
                <p className="text-[9px] font-black text-white/20 uppercase tracking-tighter">{t.plateLength}</p>
                <p className="text-xl font-black text-blue-500 font-mono">{currentText.length} <span className="text-[10px] text-white/40">{t.characters}</span></p>
              </div>
              <div className="text-right">
                <p className="text-[9px] font-black text-white/20 uppercase tracking-tighter">{t.pictogramMadrid}</p>
                <p className={`text-[10px] font-black uppercase ${activeConfig.pictogramaM ? 'text-emerald-500' : 'text-red-500/40'}`}>
                  {activeConfig.pictogramaM ? t.activated : t.deactivated}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ColorSection = ({ title, data }: { title: string, data: any }) => (
  <div className="space-y-3">
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data.hex }}></div>
      <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">{title}</p>
    </div>
    <div className="grid grid-cols-2 gap-x-6 gap-y-2">
      <FormatRow label="HEX" val={data.hex} />
      <FormatRow label="RGB" val={data.rgb} />
      <FormatRow label="CMYK" val={data.cmyk} />
      <FormatRow label="HSL" val={data.hsl} />
      <FormatRow label="HSV" val={data.hsv} />
    </div>
  </div>
);

const FormatRow = ({ label, val }: { label: string, val: string }) => (
  <div className="flex justify-between items-center gap-2 border-b border-white/5 pb-1">
    <span className="text-[8px] font-black text-white/20">{label}</span>
    <span className="text-[10px] font-mono font-bold text-white/80">{val}</span>
  </div>
);

const MetricRow = ({ label, val }: { label: string, val: string }) => (
  <div className="bg-white/5 p-3 rounded-xl border border-white/5">
    <p className="text-[8px] font-black text-white/20 uppercase tracking-tighter mb-1">{label}</p>
    <p className="text-sm font-black text-white/90">{val}</p>
  </div>
);

export default TechnicalSpecs;
