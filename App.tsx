
import React, { useState, useEffect } from 'react';
import { Language, User, UserRole, SubModulePermissions, RoadConfig, RealRoadEntry, CcaaType } from './types';
import { ROAD_CONFIGS as INITIAL_CONFIGS, ALL_CCAA as INITIAL_CCAA } from './constants';
import { INITIAL_ROADS } from './roadData';
import RoadIdentifiersModule from './modules/RoadIdentifiersModule';
import DataCenterModule from './modules/DataCenterModule';
import { commonTranslations } from './translations/common';

const INITIAL_PERMS: Record<UserRole, SubModulePermissions> = {
  admin: { showSelector: true, showTechInfo: true, showCCAA: true, showExplorer: true, showPreview: true, showStructure: true, showTechView: true, showInfoBox: true, canEditStructure: true, canScalePreview: true, canClickNoPlateCCAA: true, canAccessDataCenter: true },
  'waze-team': { showSelector: true, showTechInfo: true, showCCAA: true, showExplorer: true, showPreview: true, showStructure: true, showTechView: true, showInfoBox: true, canEditStructure: true, canScalePreview: true, canClickNoPlateCCAA: true, canAccessDataCenter: true },
  champ: { showSelector: true, showTechInfo: true, showCCAA: true, showExplorer: true, showPreview: true, showStructure: true, showTechView: true, showInfoBox: true, canEditStructure: true, canScalePreview: true, canClickNoPlateCCAA: true, canAccessDataCenter: true },
  editor: { showSelector: true, showTechInfo: false, showCCAA: true, showExplorer: true, showPreview: true, showStructure: true, showTechView: false, showInfoBox: true, canEditStructure: true, canScalePreview: true, canClickNoPlateCCAA: false, canAccessDataCenter: true },
  lector: { showSelector: false, showTechInfo: false, showCCAA: true, showExplorer: true, showPreview: true, showStructure: true, showTechView: false, showInfoBox: true, canEditStructure: false, canScalePreview: false, canClickNoPlateCCAA: false, canAccessDataCenter: false },
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(Language.ES);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeView, setActiveView] = useState<'dashboard' | 'admin' | 'module' | 'data'>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const t = commonTranslations[lang];

  // Estado Maestro de Datos
  const [roadConfigs, setRoadConfigs] = useState<RoadConfig[]>(() => {
    const saved = localStorage.getItem('waze_road_configs');
    return saved ? JSON.parse(saved) : INITIAL_CONFIGS;
  });

  const [roadCatalog, setRoadCatalog] = useState<RealRoadEntry[]>(() => {
    const saved = localStorage.getItem('waze_road_catalog');
    return saved ? JSON.parse(saved) : INITIAL_ROADS;
  });

  const [ccaaData, setCcaaData] = useState<CcaaType[]>(() => {
    const saved = localStorage.getItem('waze_ccaa_data');
    return saved ? JSON.parse(saved) : INITIAL_CCAA;
  });

  useEffect(() => {
    localStorage.setItem('waze_road_configs', JSON.stringify(roadConfigs));
    localStorage.setItem('waze_road_catalog', JSON.stringify(roadCatalog));
    localStorage.setItem('waze_ccaa_data', JSON.stringify(ccaaData));
  }, [roadConfigs, roadCatalog, ccaaData]);

  const login = (u: string, p: string) => {
    if (u === 'admin' && p === 'admin') setCurrentUser({id:'1', username:'admin', role:'admin', isValidated: true});
    else if (u === 'editor' && p === 'editor') setCurrentUser({id:'2', username:'editor', role:'editor', isValidated: true});
    else if (u === 'lector' && p === 'lector') setCurrentUser({id:'3', username:'lector', role:'lector', isValidated: true});
  };

  if (!currentUser) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-950 p-6">
        <div className="glass max-w-sm w-full p-10 rounded-[40px] shadow-2xl space-y-8 animate-in border border-white/10">
          <div className="flex justify-center mb-4 text-5xl">🛣️</div>
          <h1 className="text-3xl font-black italic text-blue-500 text-center tracking-tighter">WAZE ES <span className="text-white">DB</span></h1>
          <div className="space-y-4">
            <input id="u" type="text" placeholder={lang === Language.ES ? "Usuario" : "Username"} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm outline-none focus:border-blue-500 transition-colors" />
            <input id="p" type="password" placeholder={lang === Language.ES ? "Contraseña" : "Password"} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm outline-none focus:border-blue-500 transition-colors" />
            <button onClick={() => login((document.getElementById('u') as any).value, (document.getElementById('p') as any).value)} className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all">
              {lang === Language.ES ? "Entrar al Sistema" : "Enter System"}
            </button>
          </div>
          <p className="text-[10px] text-center text-white/20 uppercase font-black tracking-widest">{t.v2}</p>
        </div>
      </div>
    );
  }

  const perms = INITIAL_PERMS[currentUser.role];

  return (
    <div className="flex h-screen bg-[#020617] text-white overflow-hidden font-sans">
      <aside className={`fixed lg:static inset-y-0 left-0 w-72 bg-slate-900 border-r border-white/5 z-50 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-8 border-b border-white/5 flex justify-between items-center">
          <h1 className="text-2xl font-black italic text-blue-500 tracking-tighter leading-none">WAZE ES</h1>
          <button className="lg:hidden text-white/40" onClick={() => setIsSidebarOpen(false)}>✕</button>
        </div>
        <nav className="p-4 space-y-2">
          <button onClick={() => {setActiveView('dashboard'); setIsSidebarOpen(false)}} className={`w-full text-left px-4 py-3 rounded-2xl font-bold text-sm flex items-center gap-3 ${activeView === 'dashboard' ? 'bg-blue-600 shadow-lg shadow-blue-900/20' : 'hover:bg-white/5 text-white/40'}`}><span>🏠</span> {t.dashboard}</button>
          <button onClick={() => {setActiveView('module'); setIsSidebarOpen(false)}} className={`w-full text-left px-4 py-3 rounded-2xl font-bold text-sm flex items-center gap-3 ${activeView === 'module' ? 'bg-white/10' : 'hover:bg-white/5 text-white/40'}`}><span>🛣️</span> {t.roadIdentifiers}</button>
          
          {perms.canAccessDataCenter && (
            <button onClick={() => {setActiveView('data'); setIsSidebarOpen(false)}} className={`w-full text-left px-4 py-3 rounded-2xl font-bold text-sm flex items-center gap-3 ${activeView === 'data' ? 'bg-emerald-600 shadow-lg shadow-emerald-900/20' : 'hover:bg-white/5 text-white/40'}`}><span>📊</span> {t.dataCenter}</button>
          )}

          {currentUser.role === 'admin' && (
            <button onClick={() => {setActiveView('admin'); setIsSidebarOpen(false)}} className={`w-full text-left px-4 py-3 rounded-2xl font-bold text-sm flex items-center gap-3 ${activeView === 'admin' ? 'bg-orange-600 shadow-lg shadow-orange-900/20' : 'hover:bg-white/5 text-white/40'}`}><span>⚙️</span> {t.administration}</button>
          )}
        </nav>
        <div className="absolute bottom-0 w-full p-6 border-t border-white/5 bg-black/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-black shadow-lg shadow-blue-900/40">{currentUser.username[0].toUpperCase()}</div>
            <div>
              <p className="text-xs font-black uppercase tracking-tight">{currentUser.username}</p>
              <p className="text-[10px] text-blue-400 font-bold uppercase">{currentUser.role}</p>
            </div>
          </div>
          <button onClick={() => setCurrentUser(null)} className="w-full py-2.5 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-xl text-[10px] font-black uppercase transition-colors">{t.logout}</button>
        </div>
      </aside>

      <main className="flex-grow overflow-y-auto relative flex flex-col">
        <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-white/5 p-4 flex justify-between items-center px-8">
          <button className="lg:hidden p-2 bg-white/5 rounded-lg" onClick={() => setIsSidebarOpen(true)}>☰</button>
          <div className="flex gap-4 items-center ml-auto">
             <div className="flex bg-slate-900 rounded-xl p-1 border border-white/5 shadow-inner">
               <button onClick={() => setLang(Language.ES)} className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${lang === Language.ES ? 'bg-blue-600 text-white' : 'text-white/30 hover:text-white'}`}>ES</button>
               <button onClick={() => setLang(Language.EN)} className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${lang === Language.EN ? 'bg-blue-600 text-white' : 'text-white/30 hover:text-white'}`}>EN</button>
             </div>
          </div>
        </header>

        <div className="p-6 md:p-12 max-w-7xl mx-auto w-full">
          {activeView === 'dashboard' && (
            <div className="animate-in space-y-12 py-10">
              <div className="space-y-4">
                <h2 className="text-6xl font-black italic tracking-tighter leading-none">DATABASE <br/><span className="text-blue-500">{t.heroTitle}</span></h2>
                <p className="text-white/30 text-lg font-medium max-w-2xl leading-relaxed">{t.heroSub}</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <DashboardCard icon="🛣️" title={t.roadIdentifiers} desc={t.identificadoresCard} onClick={() => setActiveView('module')} color="blue" />
                {perms.canAccessDataCenter && (
                  <DashboardCard icon="📊" title={t.dataCenter} desc={t.centroDatosCard} onClick={() => setActiveView('data')} color="emerald" />
                )}
                {currentUser.role === 'admin' && (
                  <DashboardCard icon="⚙️" title={t.administration} desc={t.permisosCard} onClick={() => setActiveView('admin')} color="orange" />
                )}
              </div>
            </div>
          )}

          {activeView === 'module' && (
            <RoadIdentifiersModule 
              perms={perms} 
              lang={lang} 
              configs={roadConfigs} 
              catalog={roadCatalog} 
              ccaa={ccaaData}
            />
          )}

          {activeView === 'data' && (
            <DataCenterModule 
              lang={lang} 
              configs={roadConfigs} setConfigs={setRoadConfigs} 
              catalog={roadCatalog} setCatalog={setRoadCatalog} 
              ccaa={ccaaData} setCcaa={setCcaaData}
            />
          )}

          {activeView === 'admin' && (
            <div className="animate-in space-y-10">
              <h2 className="text-4xl font-black italic tracking-tighter uppercase">{t.adminPanel}</h2>
              <div className="bg-slate-900 border border-white/5 rounded-[40px] p-8 overflow-x-auto shadow-2xl">
                <p className="text-white/40 font-bold mb-4 uppercase text-xs tracking-widest">{t.accessMatrix}</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const DashboardCard = ({ icon, title, desc, onClick, color }: any) => {
  const colorMap: any = {
    blue: 'hover:border-blue-500 group-hover:bg-blue-500',
    emerald: 'hover:border-emerald-500 group-hover:bg-emerald-500',
    orange: 'hover:border-orange-500 group-hover:bg-orange-500'
  };
  return (
    <div onClick={onClick} className={`p-8 rounded-[40px] bg-slate-900 border border-white/5 cursor-pointer shadow-xl transition-all group overflow-hidden relative ${colorMap[color].split(' ')[0]}`}>
      <div className="text-4xl mb-6">{icon}</div>
      <h3 className="text-2xl font-black mb-2 tracking-tight">{title}</h3>
      <p className="text-xs text-white/40 leading-relaxed font-medium">{desc}</p>
      <div className={`absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 rounded-full opacity-10 transition-all ${colorMap[color].split(' ')[1]}`}></div>
    </div>
  );
}

export default App;
