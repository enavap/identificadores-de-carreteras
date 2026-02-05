
import React from 'react';
import { RoadConfig } from '../types';

interface RoadSignProps {
  config: RoadConfig;
  textOverride?: string;
  scale?: number;
}

const RoadSign: React.FC<RoadSignProps> = ({ config, textOverride, scale = 1 }) => {
  const content = textOverride || config.placaEjemplo;
  
  // Determinamos si el contenido tiene la 'M' de Madrid para tratarla como pictograma tipográfico
  const isMadridPictogram = config.pictogramaM && content.toUpperCase().startsWith('M');
  
  let restOfContent = content;
  if (isMadridPictogram) {
    // Lógica para Madrid: la M es el pictograma rojo con borde negro
    restOfContent = content.substring(1);
    
    // REGLA: Si después de la M hay un guion, se ignora en la visualización para Madrid
    if (restOfContent.startsWith('-')) {
      restOfContent = restOfContent.substring(1);
    }
  }

  const borderColor = config.bordeHex || config.colorTexto;
  // Grosor del borde base
  const borderWidth = 2.5 * scale;
  
  // REGLA: padding = 1.5 * borde
  const paddingValue = borderWidth * 1.5;

  // Tamaño de texto unificado basado en la altura del pictograma (38px base)
  const unifiedFontSize = 38 * scale;

  const style: React.CSSProperties = {
    backgroundColor: config.fondoHex,
    color: config.colorTexto,
    borderColor: borderColor,
    borderWidth: `${borderWidth}px`,
    borderStyle: 'solid',
    borderRadius: `${10 * scale}px`, 
    padding: `${paddingValue}px`,
    // El tamaño del texto ahora es igual para todos, basado en el pictograma
    fontSize: `${unifiedFontSize}px`,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: `${2 * scale}px`, 
    lineHeight: '1',
    boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
    userSelect: 'none',
    width: 'fit-content',
    whiteSpace: 'nowrap'
  };

  // Borde de la M fino (0.35 de escala)
  const mStrokeWidth = 0.35 * scale;

  return (
    <div style={style} className="font-road transition-all duration-300">
      {isMadridPictogram && (
        <span 
          style={{ 
            color: '#C10000', // Rojo Madrid
            WebkitTextStroke: `${mStrokeWidth}px #000000`, // Borde negro fino
            fontSize: `${unifiedFontSize}px`, // Misma altura que el resto del texto
            display: 'inline-block',
            lineHeight: '1',
            transform: 'translateY(-1px)' // Ajuste óptico mínimo para alineación superior
          }}
        >
          M
        </span>
      )}
      <span style={{ 
        display: 'inline-block', 
        lineHeight: '1'
      }}>
        {restOfContent}
      </span>
    </div>
  );
};

export default RoadSign;
