
import { ROAD_DATA } from './data.js';

export const RoadModule = {
    render: (perms) => {
        const selectedId = window.selectedRoad || 'autovia';
        const config = ROAD_DATA.find(r => r.id === selectedId);
        const text = window.signText || config.ejemplo;
        const isEditor = perms === 'editor';

        return `
            <div class="animate-fade space-y-10">
                <div class="flex justify-between items-end">
                    <div>
                        <h2 class="text-4xl font-black italic tracking-tighter">${config.nombre}</h2>
                        <p class="text-white/30 text-sm mt-1">Nivel de acceso actual: <span class="text-blue-400 font-bold uppercase">${perms}</span></p>
                    </div>
                    <select onchange="window.selectedRoad = this.value; window.signText = null; window.act('NAV', {view: 'module', module: 'road-ids'})" 
                        class="bg-slate-900 border border-white/10 p-3 rounded-xl text-xs font-bold outline-none">
                        ${ROAD_DATA.map(r => `<option value="${r.id}" ${r.id === selectedId ? 'selected' : ''}>${r.nombre}</option>`).join('')}
                    </select>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div class="lg:col-span-8">
                        <div class="bg-slate-900 border border-white/5 rounded-[48px] p-20 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden">
                            <div class="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent"></div>
                            
                            <!-- Cajetín -->
                            <div class="font-road relative z-10" style="
                                background: ${config.fondo}; 
                                color: ${config.texto}; 
                                border: 5px solid ${config.borde || config.texto}; 
                                border-radius: 12px; 
                                padding: 12px 30px; 
                                font-size: 60px;
                                line-height: 1;
                                box-shadow: 0 20px 50px rgba(0,0,0,0.5);
                            ">
                                ${text}
                            </div>

                            ${isEditor ? `
                                <div class="mt-12 w-full max-w-xs relative z-10">
                                    <div class="text-[9px] font-black text-center text-white/20 uppercase mb-3 tracking-widest">Editor de Matrícula</div>
                                    <input type="text" value="${text}" 
                                        oninput="window.signText = this.value; window.act('NAV', {view: 'module', module: 'road-ids'})"
                                        class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-center font-mono font-bold text-xl outline-none focus:border-blue-500 transition-all" />
                                </div>
                            ` : `
                                <div class="mt-8 text-white/20 text-[10px] font-bold uppercase tracking-widest italic">Modo Lectura (Sin edición)</div>
                            `}
                        </div>
                    </div>

                    <div class="lg:col-span-4 space-y-6">
                        <div class="glass p-6 rounded-[32px]">
                            <h3 class="text-[10px] font-black uppercase text-white/30 mb-4">Información Técnica</h3>
                            <div class="space-y-3">
                                <div class="flex justify-between border-b border-white/5 pb-2">
                                    <span class="text-xs text-white/40">Fondo Hex</span>
                                    <span class="text-xs font-mono font-bold">${config.fondo}</span>
                                </div>
                                <div class="flex justify-between border-b border-white/5 pb-2">
                                    <span class="text-xs text-white/40">Color Texto</span>
                                    <span class="text-xs font-mono font-bold">${config.texto}</span>
                                </div>
                            </div>
                        </div>

                        ${isEditor ? `
                            <div class="bg-orange-500/10 border border-orange-500/20 p-6 rounded-[32px]">
                                <h3 class="text-[10px] font-black uppercase text-orange-500 mb-2">Permisos de Edición</h3>
                                <p class="text-[11px] text-orange-500/70 leading-relaxed font-bold italic">
                                    Como editor, puedes modificar los valores del cajetín para documentar variaciones técnicas.
                                </p>
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }
};
