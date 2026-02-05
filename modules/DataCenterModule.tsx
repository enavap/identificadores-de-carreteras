
import React, { useState } from 'react';
import { Language, RoadConfig, RealRoadEntry, CcaaType } from '../types';
import RoadSign from '../components/RoadSign';
import { dataCenterTranslations } from '../translations/dataCenter';

interface Props {
  lang: Language;
  configs: RoadConfig[];
  setConfigs: (c: RoadConfig[]) => void;
  catalog: RealRoadEntry[];
  setCatalog: (c: RealRoadEntry[]) => void;
  ccaa: CcaaType[];
  setCcaa: (c: CcaaType[]) => void;
}

const DataCenterModule: React.FC<Props> = ({ lang, configs, setConfigs, catalog, setCatalog, ccaa, setCcaa }) => {
  const t = dataCenterTranslations[lang];
  const [activeTab, setActiveTab] = useState<'configs' | 'catalog' | 'ccaa'>('configs');
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [bulkStep, setBulkStep] = useState<'names' | 'meta'>('names');
  const [bulkInput, setBulkInput] = useState('');
  const [bulkConfigId, setBulkConfigId] = useState(configs[0]?.id || '');
  const [bulkSelectedCcaas, setBulkSelectedCcaas] = useState<string[]>([]);
  const [bulkSelectedProvs, setBulkSelectedProvs] = useState<string[]>([]);

  const updateConfig = (id: string, field: keyof RoadConfig, value: any) => {
    setConfigs(configs.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const deleteConfig = (id: string) => {
    if (confirm('¿Eliminar este nivel de red?')) setConfigs(configs.filter(c => c.id !== id));
  };

  const addNewConfig = () => {
    const id = `type-${Date.now()}`;
    const newCfg: RoadConfig = {
      id,
      nombre: 'Nueva Categoría',
      placaEjemplo: 'CAT-1',
      fondoHex: '#334155',
      colorTexto: '#FFFFFF',
      ccaaCompatibles: ccaa.map(c => c.id),
      partes: [{ label: 'Nombre', value: 'CAT-1' }]
    };
    setConfigs([...configs, newCfg]);
  };

  const addNewRoad = () => {
    const newRoad: RealRoadEntry = {
      id: `road-${Date.now()}`,
      name: 'Nueva Vía',
      typeId: configs[0]?.id || '',
      ccaaIds: [],
      provinceId: ''
    };
    setCatalog([newRoad, ...catalog]);
  };

  const updateRoad = (id: string, field: keyof RealRoadEntry, value: any) => {
    setCatalog(catalog.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const deleteRoad = (id: string) => {
    if (confirm('¿Eliminar esta carretera?')) setCatalog(catalog.filter(r => r.id !== id));
  };

  const handleBulkInsert = () => {
    const names = bulkInput
      .split(/[\n,;]/)
      .map(n => n.trim())
      .filter(n => n !== '');

    const newEntries: RealRoadEntry[] = names.map((name, i) => ({
      id: `bulk-${Date.now()}-${i}`,
      name,
      typeId: bulkConfigId,
      ccaaIds: bulkSelectedCcaas,
      provinceId: bulkSelectedProvs.join(',')
    }));

    setCatalog([...newEntries, ...catalog]);
    resetBulk();
  };

  const resetBulk = () => {
    setBulkInput('');
    setBulkStep('names');
    setIsBulkModalOpen(false);
    setBulkSelectedCcaas([]);
    setBulkSelectedProvs([]);
  };

  const addNewCcaa = () => {
    const id = prompt('ID de la CCAA (ej: MD):')?.toUpperCase();
    if (!id) return;
    const nombre = prompt('Nombre de la CCAA:');
    if (!nombre) return;
    setCcaa([...ccaa, { id, nombre, provinces: [] }]);
  };

  const deleteCcaa = (id: string) => {
    if (confirm(`¿Borrar ${id}?`)) setCcaa(ccaa.filter(c => c.id !== id));
  };

  const addProvince = (ccaaId: string) => {
    const id = prompt('ID de la Provincia (ej: M):')?.toUpperCase();
    if (!id) return;
    const name = prompt('Nombre de la Provincia:');
    if (!name) return;
    setCcaa(ccaa.map(c => c.id === ccaaId ? { ...c, provinces: [...c.provinces, { id, name }] } : c));
  };

  const removeProvince = (ccaaId: string, provId: string) => {
    setCcaa(ccaa.map(c => c.id === ccaaId ? { ...c, provinces: c.provinces.filter(p => p.id !== provId) } : c));
  };

  const getProvincesFromCcaas = (ccaas: string[]) => {
    const list: {id: string, name: string, ccaaId: string}[] = [];
    ccaas.forEach(cid => {
      const found = ccaa.find(c => c.id === cid);
      if (found) found.provinces.forEach(p => list.push({ ...p, ccaaId: cid }));
    });
    return list;
  };

  const TabBtn = ({ active, onClick, icon, label }: any) => (
    <button onClick={onClick} className={`px-6 py-4 flex items-center gap-3 text-[10px] font-black uppercase tracking-widest transition-all rounded-2xl whitespace-nowrap ${active ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-900/20' : 'text-white/20 hover:text-white/40'}`}>
      <span className="text-xl">{icon}</span>
      {label}
    </button>
  );

  return (
    <div className="space-y-8 animate-in pb-40">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="space-y-2">
          <h2 className="text-5xl font-black italic tracking-tighter uppercase leading-none">{t.title} <span className="text-emerald-500">{t.titleHighlight}</span></h2>
          <p className="text-white/30 text-sm font-medium">{t.subtitle}</p>
        </div>
        <div className="flex gap-4">
          <button onClick={() => { localStorage.clear(); window.location.reload(); }} className="px-6 py-3 bg-red-600/10 text-red-500 border border-red-500/20 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">{t.resetDb}</button>
        </div>
      </div>

      <div className="bg-slate-900 border border-white/5 rounded-[48px] overflow-hidden shadow-2xl">
        <div className="flex bg-black/40 border-b border-white/5 p-2 overflow-x-auto">
          <TabBtn active={activeTab === 'configs'} onClick={() => setActiveTab('configs'} icon="🚦" label={t.tabNetwork} />
          <TabBtn active={activeTab === 'catalog'} onClick={() => setActiveTab('catalog'} icon="📋" label={t.tabCatalog} />
          <TabBtn active={activeTab === 'ccaa'} onClick={() => setActiveTab('ccaa'} icon="🌍" label={t.tabCcaa} />
        </div>

        <div className="p-8 overflow-x-auto max-h-[800px] custom-scrollbar">
          {activeTab === 'configs' && (
            <div className="space-y-6">
              <div className="flex justify-end">
                <button onClick={addNewConfig} className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2"><span>➕</span> {t.addLevel}</button>
              </div>
              <table className="w-full text-left min-w-[1000px]">
                <thead>
                  <tr className="text-[10px] font-black uppercase text-white/20 tracking-[0.2em] border-b border-white/5">
                    <th className="pb-4 px-4">{t.tablePublicName}</th>
                    <th className="pb-4 px-4">{t.tableBgColor}</th>
                    <th className="pb-4 px-4">{t.tableTextColor}</th>
                    <th className="pb-4 px-4">{t.tablePictogram}</th>
                    <th className="pb-4 px-4">{t.tablePreview}</th>
                    <th className="pb-4 px-4">{t.tableAction}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {configs.map(c => (
                    <tr key={c.id} className="group hover:bg-white/[0.02]">
                      <td className="py-4 px-4">
                        <input type="text" value={c.nombre} onChange={e => updateConfig(c.id, 'nombre', e.target.value)} className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs font-black outline-none focus:border-blue-500 w-full" />
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <input type="color" value={c.fondoHex} onChange={e => updateConfig(c.id, 'fondoHex', e.target.value)} className="w-6 h-6 rounded cursor-pointer" />
                          <input type="text" value={c.fondoHex} onChange={e => updateConfig(c.id, 'fondoHex', e.target.value)} className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-[10px] font-mono w-20" />
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <select value={c.colorTexto} onChange={e => updateConfig(c.id, 'colorTexto', e.target.value)} className="bg-slate-800 border border-white/10 rounded-lg px-2 py-1 text-[10px]">
                          <option value="#FFFFFF">{lang === Language.ES ? 'Blanco' : 'White'}</option>
                          <option value="#000000">{lang === Language.ES ? 'Negro' : 'Black'}</option>
                        </select>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <input type="checkbox" checked={c.pictogramaM} onChange={e => updateConfig(c.id, 'pictogramaM', e.target.checked)} className="accent-blue-600 scale-125" />
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-center bg-black/10 rounded-xl p-3 min-w-[140px]">
                          <RoadSign config={c} scale={0.7} />
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <button onClick={() => deleteConfig(c.id)} className="text-red-500 hover:text-red-400">🗑️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'catalog' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-black/20 p-4 rounded-3xl border border-white/5">
                <div className="flex gap-4">
                   <button onClick={addNewRoad} className="bg-emerald-600 hover:bg-emerald-500 px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg"><span>➕</span> {t.addRoad}</button>
                   <button onClick={() => setIsBulkModalOpen(true)} className="bg-slate-700 hover:bg-slate-600 px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg"><span>⚡</span> {t.bulkInsert}</button>
                </div>
                <div className="text-[10px] font-black uppercase text-white/20">{t.records}: {catalog.length}</div>
              </div>

              <table className="w-full text-left min-w-[1100px]">
                <thead>
                  <tr className="text-[10px] font-black uppercase text-white/20 tracking-[0.2em] border-b border-white/5">
                    <th className="pb-4 px-4">{t.tablePlate}</th>
                    <th className="pb-4 px-4">{t.tableType}</th>
                    <th className="pb-4 px-4">{t.tableCcaa}</th>
                    <th className="pb-4 px-4">{t.tableProvinces}</th>
                    <th className="pb-4 px-4">{t.tableAction}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {catalog.map(r => (
                    <tr key={r.id} className="group hover:bg-white/[0.02]">
                      <td className="py-4 px-4">
                        <input type="text" value={r.name} onChange={e => updateRoad(r.id, 'name', e.target.value)} className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs font-black outline-none focus:border-emerald-500 w-full uppercase" />
                      </td>
                      <td className="py-4 px-4">
                        <select value={r.typeId} onChange={e => updateRoad(r.id, 'typeId', e.target.value)} className="bg-slate-800 border border-white/10 rounded-lg px-2 py-1.5 text-[10px] outline-none">
                          {configs.map(cfg => <option key={cfg.id} value={cfg.id}>{cfg.nombre}</option>)}
                        </select>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-wrap gap-1 max-w-[280px]">
                            {ccaa.map(c => (
                              <button 
                                key={c.id} 
                                onClick={() => {
                                  const active = r.ccaaIds.includes(c.id);
                                  const next = active ? r.ccaaIds.filter(id => id !== c.id) : [...r.ccaaIds, c.id];
                                  updateRoad(r.id, 'ccaaIds', next);
                                  if (active) {
                                    const cProvs = c.provinces.map(p => p.id);
                                    const nextProvs = (r.provinceId?.split(',') || []).filter(pId => !cProvs.includes(pId));
                                    updateRoad(r.id, 'provinceId', nextProvs.join(','));
                                  }
                                }}
                                className={`px-1.5 py-0.5 rounded text-[8px] font-black border transition-all ${r.ccaaIds.includes(c.id) ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white/5 border-white/10 text-white/30 hover:bg-white/10'}`}
                              >
                                {c.id}
                              </button>
                            ))}
                          </div>
                          <div className="flex gap-2">
                             <button onClick={() => updateRoad(r.id, 'ccaaIds', ccaa.map(c => c.id))} className="text-[7px] font-black uppercase text-blue-400 hover:text-blue-300">{t.all}</button>
                             <button onClick={() => { updateRoad(r.id, 'ccaaIds', []); updateRoad(r.id, 'provinceId', ''); }} className="text-[7px] font-black uppercase text-white/20 hover:text-white/40">{t.clear}</button>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-col gap-2">
                           <div className="flex flex-wrap gap-1 max-w-[250px] min-h-[24px]">
                              {getProvincesFromCcaas(r.ccaaIds).map(p => (
                                <button 
                                  key={p.id}
                                  onClick={() => {
                                    const current = r.provinceId?.split(',').filter(x => x) || [];
                                    const next = current.includes(p.id) ? current.filter(id => id !== p.id) : [...current, p.id];
                                    updateRoad(r.id, 'provinceId', next.join(','));
                                  }}
                                  className={`px-1.5 py-0.5 rounded text-[8px] font-black border transition-all ${r.provinceId?.split(',').includes(p.id) ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white/5 border-white/10 text-white/30 hover:text-white/50'}`}
                                >
                                  {p.id}
                                </button>
                              ))}
                              {r.ccaaIds.length === 0 && <span className="text-[8px] text-white/10 italic">{t.selectCcaaFirst}</span>}
                           </div>
                           {r.ccaaIds.length > 0 && (
                             <div className="flex gap-2">
                               <button onClick={() => {
                                  const allIds = getProvincesFromCcaas(r.ccaaIds).map(p => p.id);
                                  updateRoad(r.id, 'provinceId', allIds.join(','));
                               }} className="text-[7px] font-black uppercase text-blue-400 hover:text-blue-300">{t.all}</button>
                               <button onClick={() => updateRoad(r.id, 'provinceId', '')} className="text-[7px] font-black uppercase text-white/20 hover:text-white/40">{t.clear}</button>
                             </div>
                           )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <button onClick={() => deleteRoad(r.id)} className="text-red-500/40 hover:text-red-500">🗑️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'ccaa' && (
            <div className="space-y-6">
              <div className="flex justify-end">
                <button onClick={addNewCcaa} className="bg-emerald-600 hover:bg-emerald-500 px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg"><span>➕</span> {t.addCommunity}</button>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ccaa.map(c => (
                  <div key={c.id} className="bg-white/5 p-6 rounded-[32px] border border-white/10 hover:border-emerald-500/40 transition-all group relative">
                    <button onClick={() => deleteCcaa(c.id)} className="absolute top-4 right-4 text-red-500/20 group-hover:text-red-500 transition-colors">🗑️</button>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-emerald-600 text-white text-[10px] font-black px-2 py-1 rounded-lg shadow-lg">{c.id}</span>
                      <h4 className="font-black text-xl italic tracking-tighter uppercase">{c.nombre}</h4>
                    </div>
                    <div className="space-y-4">
                       <div className="flex flex-wrap gap-1.5 min-h-[40px] bg-black/20 p-3 rounded-2xl border border-white/5 shadow-inner">
                          {c.provinces.map(p => (
                            <div key={p.id} className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-lg border border-white/5">
                              <span className="text-[9px] font-black text-white/80">{p.id}</span>
                              <button onClick={() => removeProvince(c.id, p.id)} className="text-red-500 hover:text-red-400 text-[10px] font-black">×</button>
                            </div>
                          ))}
                       </div>
                       <button onClick={() => addProvince(c.id)} className="w-full py-2 border border-dashed border-white/10 rounded-xl text-[8px] font-black uppercase text-white/20 hover:text-white/60 hover:border-white/20 transition-all">+ {t.addProvince}</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {isBulkModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-6">
           <div className="glass max-w-2xl w-full p-10 rounded-[48px] shadow-2xl border border-white/10 space-y-8 animate-in">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-3xl font-black italic tracking-tighter uppercase leading-none">{t.bulkTitle} <span className="text-emerald-500">{t.bulkHighlight}</span></h3>
                  <p className="text-white/30 text-[10px] font-black uppercase tracking-widest mt-2">
                    {bulkStep === 'names' ? t.bulkStep1 : t.bulkStep2}
                  </p>
                </div>
                <button onClick={resetBulk} className="text-white/20 hover:text-white transition-colors text-2xl">✕</button>
              </div>

              {bulkStep === 'names' ? (
                <div className="space-y-6">
                  <div>
                    <label className="text-[9px] font-black uppercase text-white/30 mb-2 block tracking-widest">{t.bulkLabel}</label>
                    <textarea 
                      value={bulkInput} onChange={e => setBulkInput(e.target.value)}
                      placeholder={t.bulkPlaceholder}
                      className="w-full h-48 bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-sm font-mono outline-none focus:border-emerald-500 custom-scrollbar uppercase"
                    />
                  </div>
                  <button 
                    onClick={() => bulkInput.trim() ? setBulkStep('meta') : alert(lang === Language.ES ? 'Escribe al menos un nombre' : 'Type at least one name')}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl text-[10px] font-black uppercase transition-all shadow-xl shadow-blue-900/40"
                  >
                    {t.bulkNext}
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="text-[9px] font-black uppercase text-white/30 mb-2 block tracking-widest">{t.tableType}</label>
                      <select value={bulkConfigId} onChange={e => setBulkConfigId(e.target.value)} className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-xs font-bold outline-none">
                        {configs.map(cfg => <option key={cfg.id} value={cfg.id}>{cfg.nombre}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-[9px] font-black uppercase text-white/30 mb-2 block tracking-widest">{t.bulkDestinationCcaa}</label>
                      <div className="flex flex-wrap gap-1 max-h-32 overflow-y-auto bg-white/5 p-3 rounded-xl border border-white/10 custom-scrollbar">
                         {ccaa.map(c => (
                           <button 
                            key={c.id} 
                            onClick={() => {
                              const next = bulkSelectedCcaas.includes(c.id) ? bulkSelectedCcaas.filter(x => x !== c.id) : [...bulkSelectedCcaas, c.id];
                              setBulkSelectedCcaas(next);
                            }}
                            className={`px-2 py-1 rounded text-[8px] font-black border ${bulkSelectedCcaas.includes(c.id) ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-black/40 border-white/5 text-white/20'}`}
                           >{c.id}</button>
                         ))}
                         <button onClick={() => setBulkSelectedCcaas(ccaa.map(c => c.id))} className="text-[8px] font-black text-blue-400 uppercase ml-auto">{t.all}</button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-[9px] font-black uppercase text-white/30 mb-2 block tracking-widest">{t.bulkDestinationProv}</label>
                    <div className="flex flex-wrap gap-1 bg-white/5 p-4 rounded-xl border border-white/10 min-h-[60px]">
                       {getProvincesFromCcaas(bulkSelectedCcaas).map(p => (
                         <button 
                           key={p.id}
                           onClick={() => {
                            const next = bulkSelectedProvs.includes(p.id) ? bulkSelectedProvs.filter(x => x !== p.id) : [...bulkSelectedProvs, p.id];
                            setBulkSelectedProvs(next);
                           }}
                           className={`px-2 py-1 rounded text-[8px] font-black border ${bulkSelectedProvs.includes(p.id) ? 'bg-blue-600 border-blue-600 text-white' : 'bg-black/40 border-white/5 text-white/20'}`}
                         >{p.id}</button>
                       ))}
                       {bulkSelectedCcaas.length > 0 && (
                         <button onClick={() => setBulkSelectedProvs(getProvincesFromCcaas(bulkSelectedCcaas).map(p => p.id))} className="text-[8px] font-black text-blue-400 uppercase ml-auto">{t.all}</button>
                       )}
                       {bulkSelectedCcaas.length === 0 && <span className="text-[9px] font-black text-white/10 uppercase italic">{t.selectCcaaFirst}</span>}
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button onClick={() => setBulkStep('names')} className="flex-1 py-4 border border-white/10 rounded-2xl text-[10px] font-black uppercase hover:bg-white/5 transition-all">{t.bulkPrev}</button>
                    <button onClick={handleBulkInsert} className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-500 rounded-2xl text-[10px] font-black uppercase transition-all shadow-xl shadow-emerald-900/40">{t.bulkFinish}</button>
                  </div>
                </div>
              )}
           </div>
        </div>
      )}
    </div>
  );
};

export default DataCenterModule;
