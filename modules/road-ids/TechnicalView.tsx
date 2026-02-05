
import React from 'react';
import TechnicalDrawing from '../../components/TechnicalDrawing';
import { RoadConfig, Language } from '../../types';

interface Props {
  activeConfig: RoadConfig;
  scale: number;
  text: string;
  lang: Language;
}

const TechnicalView: React.FC<Props> = ({ activeConfig, scale, text, lang }) => {
  return (
    <div className="bg-white rounded-[48px] p-12 overflow-hidden shadow-2xl border border-black/10">
      <TechnicalDrawing 
        config={activeConfig} 
        currentScale={scale} 
        textOverride={text} 
        isSubComponent={true} 
        lang={lang}
      />
    </div>
  );
};

export default TechnicalView;
