import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer, 
  Cell 
} from 'recharts';
import { 
  Users, 
  Vote, 
  Percent, 
  MapPin, 
  TrendingUp, 
  Trophy, 
  Info, 
  ChevronRight,
  LayoutDashboard,
  CheckCircle2,
  Lightbulb,
  Target,
  Settings,
  Download
} from 'lucide-react';
import { ELECTION_DATA, cn } from '../lib/utils';

const CustomTooltip = ({ active, payload, label, theme }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className={cn(
        "p-4 rounded-xl shadow-2xl border min-w-[200px]", 
        theme === 'dark' ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-slate-100 text-slate-800"
      )}>
        <p className="font-display font-bold mb-2 border-b pb-1 border-slate-200 dark:border-slate-700">{label}</p>
        <div className="space-y-1.5 text-sm">
          <div className="flex justify-between gap-6">
            <span className="text-slate-500 dark:text-slate-400">Inscrits:</span>
            <span className="font-bold">{data.inscrits.toLocaleString()}</span>
          </div>
          <div className="flex justify-between gap-6">
            <span className="text-slate-500 dark:text-slate-400">Votes:</span>
            <span className="font-bold text-blue-500">{data.votes.toLocaleString()}</span>
          </div>
          <div className="flex justify-between gap-6">
            <span className="text-slate-500 dark:text-slate-400">Participation:</span>
            <span className={cn("font-bold", data.participation > 60 ? "text-emerald-500" : "text-orange-500")}>
              {data.participation}%
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

// --- Slide 1: Title Slide ---
export const Slide1 = ({ theme, selectedCentres, onExport }: { theme?: string, selectedCentres?: string[], onExport?: () => void }) => (
  <div className={cn("flex h-full w-full", theme === 'dark' ? "bg-slate-900" : "bg-white")}>
    <div className="w-1/3 bg-blue-900 text-white flex flex-col justify-between p-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full border-8 border-white" />
        <div className="absolute top-48 left-12 w-12 h-12 rounded-full bg-white" />
        <div className="absolute bottom-24 -right-12 w-48 h-48 rounded-full border-4 border-white" />
      </div>
      <div className="z-20 mt-8">
        <div className="w-20 h-20 bg-blue-800 rounded-lg flex items-center justify-center shadow-lg mb-6">
          <LayoutDashboard className="w-10 h-10 text-blue-200" />
        </div>
        <p className="uppercase tracking-widest text-blue-300 text-sm font-bold mb-2">Rapport Officiel</p>
        <div className="h-1 w-16 bg-blue-400" />
      </div>
      <div className="z-20">
        <h3 className="font-display font-bold text-2xl mb-4 text-white">Contexte</h3>
        <p className="text-blue-100 leading-relaxed mb-2 text-lg">Élections Locales</p>
        <p className="text-blue-200 text-sm font-light">Analyse détaillée par centre de vote</p>
      </div>
      <div className="z-20 mb-4 opacity-80">
        <div className="flex items-center space-x-3 mb-2">
          <MapPin className="w-4 h-4 text-blue-300" />
          <p className="text-sm">Région : Assaba</p>
        </div>
        <div className="flex items-center space-x-3">
          <Users className="w-4 h-4 text-blue-300" />
          <p className="text-sm">Ecole Hassi El Bekay</p>
        </div>
      </div>
    </div>
    <div className={cn("w-2/3 flex flex-col justify-center px-16 relative", theme === 'dark' ? "bg-slate-900" : "bg-white")}>
      <div className={cn("absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:20px_20px]", theme === 'dark' && "opacity-10")} />
      <div className="relative z-10">
        <div className="flex items-center mb-8">
          <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Données Statistiques</span>
        </div>
        <h1 className={cn("font-display font-extrabold text-7xl leading-none mb-4", theme === 'dark' ? "text-white" : "text-slate-900")}>
          Analyse<br />
          <span className="text-blue-900 dark:text-blue-400">Électorale</span>
        </h1>
        <h2 className={cn("font-display font-light text-5xl mb-10 border-b-2 pb-8 inline-block", theme === 'dark' ? "text-slate-400 border-slate-800" : "text-slate-600 border-slate-200")}>
          Municipalité de Kiffa
        </h2>
        <div className="flex items-start space-x-4 mb-12 max-w-2xl">
          <Info className="w-6 h-6 text-blue-500 shrink-0 mt-1" />
          <p className={cn("text-xl font-light leading-relaxed", theme === 'dark' ? "text-slate-300" : "text-slate-600")}>
            Synthèse des centres de vote, analyse du nombre d'inscrits, 
            répartition des votes exprimés et étude comparative des taux de participation.
          </p>
        </div>
        <div className={cn("grid grid-cols-2 gap-8 border-t pt-8 w-full max-w-lg", theme === 'dark' ? "border-slate-800" : "border-slate-200")}>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Préparé par</p>
            <p className={cn("font-medium text-lg flex items-center", theme === 'dark' ? "text-slate-200" : "text-slate-800")}>
              <Users className="w-4 h-4 text-slate-400 mr-2" /> Équipe Projet
            </p>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Destinataire</p>
            <p className={cn("font-medium text-lg flex items-center", theme === 'dark' ? "text-slate-200" : "text-slate-800")}>
              <Users className="w-4 h-4 text-slate-400 mr-2" /> Chef de Projet
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- Slide 2: Overview ---
export const Slide2 = ({ theme, selectedCentres, onExport }: { theme?: string, selectedCentres?: string[], onExport?: () => void }) => {
  const topInscrits = [...ELECTION_DATA].sort((a, b) => b.inscrits - a.inscrits).slice(0, 3);
  const topParticipation = [...ELECTION_DATA].sort((a, b) => b.participation - a.participation).slice(0, 3);
  
  return (
    <div className={cn("flex flex-col h-full", theme === 'dark' ? "bg-slate-900" : "bg-white")}>
      <div className="bg-blue-900 text-white h-24 flex items-center justify-between px-12 relative z-20 shrink-0">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-700 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-blue-100" />
          </div>
          <div>
            <h1 className="font-display font-bold text-3xl">Vue d'ensemble</h1>
            <p className="text-blue-200 text-sm font-light">Indicateurs clés de performance - Municipalité de Kiffa</p>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          {onExport && (
            <button 
              onClick={onExport}
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all border border-white/20 text-sm font-bold"
            >
              <Download className="w-4 h-4" />
              <span>Exporter CSV</span>
            </button>
          )}
          <div className="flex items-center space-x-6 opacity-80">
            <div className="text-right">
              <p className="text-xs font-bold uppercase tracking-wider text-blue-300">Total Centres</p>
              <p className="text-xl font-bold">30</p>
            </div>
            <div className="h-8 w-px bg-blue-700" />
            <div className="text-right">
              <p className="text-xs font-bold uppercase tracking-wider text-blue-300">Date</p>
              <p className="text-lg">Ecole Hassi El Bekay</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 p-12 relative flex flex-col justify-between overflow-hidden">
        <div className={cn("absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[radial-gradient(#1e3a8a_2px,transparent_2px)] [background-size:24px:24px]", theme === 'dark' && "opacity-10")} />
        
        <div className="grid grid-cols-4 gap-8 relative z-10 mb-8">
          <div className={cn("rounded-xl p-6 border-l-4 border-blue-500 shadow-lg flex flex-col justify-between h-40", theme === 'dark' ? "bg-slate-800" : "bg-white")}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-500 text-sm font-bold uppercase tracking-wide">Total Inscrits</p>
                <h2 className={cn("font-display font-bold text-4xl mt-2", theme === 'dark' ? "text-white" : "text-slate-800")}>29 274</h2>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-500">
                <Users className="w-6 h-6" />
              </div>
            </div>
            <p className="text-sm text-slate-400 mt-2">Électeurs enregistrés</p>
          </div>

          <div className={cn("rounded-xl p-6 border-l-4 border-emerald-500 shadow-lg flex flex-col justify-between h-40", theme === 'dark' ? "bg-slate-800" : "bg-white")}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-500 text-sm font-bold uppercase tracking-wide">Votes (Ghazouani)</p>
                <h2 className={cn("font-display font-bold text-4xl mt-2", theme === 'dark' ? "text-white" : "text-slate-800")}>10 119</h2>
              </div>
              <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-500">
                <Vote className="w-6 h-6" />
              </div>
            </div>
            <p className="text-sm text-slate-400 mt-2">Suffrages pour le candidat</p>
          </div>

          <div className={cn("rounded-xl p-6 border-l-4 border-indigo-500 shadow-lg flex flex-col justify-between h-40", theme === 'dark' ? "bg-slate-800" : "bg-white")}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-500 text-sm font-bold uppercase tracking-wide">Participation Moy.</p>
                <h2 className={cn("font-display font-bold text-4xl mt-2", theme === 'dark' ? "text-white" : "text-slate-800")}>58,8%</h2>
              </div>
              <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-500">
                <Percent className="w-6 h-6" />
              </div>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full mt-4 overflow-hidden">
              <div className="bg-indigo-500 h-full rounded-full" style={{ width: '58.8%' }} />
            </div>
          </div>

          <div className={cn("rounded-xl p-6 border-l-4 border-orange-400 shadow-lg flex flex-col justify-between h-40", theme === 'dark' ? "bg-slate-800" : "bg-white")}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-500 text-sm font-bold uppercase tracking-wide">Couverture</p>
                <h2 className={cn("font-display font-bold text-4xl mt-2", theme === 'dark' ? "text-white" : "text-slate-800")}>30</h2>
              </div>
              <div className="w-12 h-12 rounded-full bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center text-orange-400">
                <MapPin className="w-6 h-6" />
              </div>
            </div>
            <p className="text-sm text-slate-400 mt-2">Centres de vote analysés</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 flex-1 relative z-10">
          <div className={cn("rounded-xl p-8 shadow-md border", theme === 'dark' ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100")}>
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 dark:bg-blue-900/40 p-2 rounded mr-3">
                <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className={cn("font-display font-bold text-xl", theme === 'dark' ? "text-white" : "text-slate-800")}>Top 3 Centres (Inscrits)</h3>
            </div>
            <div className="space-y-5">
              {topInscrits.map((item, idx) => (
                <div key={item.centre} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 dark:bg-slate-700 text-white text-xs font-bold">{idx + 1}</span>
                      <span className={cn("font-medium", theme === 'dark' ? "text-slate-300" : "text-slate-700")}>{item.centre}</span>
                    </div>
                    <span className="font-bold text-blue-900 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full text-sm">{item.inscrits.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: `${(item.inscrits / topInscrits[0].inscrits) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={cn("rounded-xl p-8 shadow-md border", theme === 'dark' ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100")}>
            <div className="flex items-center mb-6">
              <div className="bg-indigo-100 dark:bg-indigo-900/40 p-2 rounded mr-3">
                <Trophy className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className={cn("font-display font-bold text-xl", theme === 'dark' ? "text-white" : "text-slate-800")}>Top 3 Centres (Participation)</h3>
            </div>
            <div className="space-y-5">
              {topParticipation.map((item, idx) => (
                <div key={item.centre} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-yellow-500 text-white text-xs font-bold">{idx + 1}</span>
                      <span className={cn("font-medium", theme === 'dark' ? "text-slate-300" : "text-slate-700")}>{item.centre}</span>
                    </div>
                    <span className="font-bold text-indigo-900 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full text-sm">{item.participation}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${item.participation}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="h-2 w-full flex">
        <div className="w-1/3 bg-blue-900" />
        <div className="w-1/3 bg-blue-500" />
        <div className="w-1/3 bg-blue-300" />
      </div>
    </div>
  );
};

// --- Slide 3: Votes Chart ---
export const Slide3 = ({ selectedCentres, theme, onExport }: { selectedCentres: string[], theme?: string, onExport?: () => void }) => {
  const chartData = useMemo(() => {
    if (selectedCentres.length > 0) {
      return ELECTION_DATA.filter(item => selectedCentres.includes(item.centre));
    }
    return [...ELECTION_DATA].sort((a, b) => b.votes - a.votes).slice(0, 15);
  }, [selectedCentres]);
  
  return (
    <div className={cn("flex flex-col h-full", theme === 'dark' ? "bg-slate-900" : "bg-white")}>
      <div className={cn("h-20 border-b flex items-center justify-between px-12 z-20", theme === 'dark' ? "border-slate-800" : "border-slate-200")}>
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center text-white">
            <Vote className="w-6 h-6" />
          </div>
          <div>
            <h1 className={cn("font-display font-bold text-2xl", theme === 'dark' ? "text-white" : "text-slate-800")}>Répartition des Votes</h1>
            <p className="text-slate-500 text-sm">Candidat Ghazouani - Détail par Centre</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-blue-900 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full">
          <CheckCircle2 className="w-4 h-4" />
          <span className="text-sm font-semibold">Données brutes validées</span>
        </div>
      </div>
      <div className="flex-1 flex overflow-hidden">
        <div className="w-[68%] p-8 flex flex-col">
          <div className={cn("rounded-xl border p-4 h-full flex flex-col shadow-lg relative", theme === 'dark' ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100")}>
            <h3 className={cn("font-display font-semibold mb-4 pl-2 border-l-4 border-blue-500", theme === 'dark' ? "text-slate-300" : "text-slate-700")}>
              Nombre de voix par centre {selectedCentres.length > 0 ? '(Comparaison)' : '(Top 15)'}
            </h3>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? "#334155" : "#f1f5f9"} />
                  <XAxis 
                    dataKey="centre" 
                    angle={-45} 
                    textAnchor="end" 
                    interval={0} 
                    height={80}
                    tick={{ fontSize: 10, fill: theme === 'dark' ? '#94a3b8' : '#475569' }}
                  />
                  <YAxis tick={{ fontSize: 11, fill: theme === 'dark' ? '#94a3b8' : '#64748b' }} />
                  <Tooltip 
                    cursor={{ fill: theme === 'dark' ? '#1e293b' : '#f8fafc' }}
                    content={<CustomTooltip theme={theme} />}
                  />
                  <Legend verticalAlign="top" height={36}/>
                  <Bar name="Nombre de voix" dataKey="votes" fill="#3b82f6" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 && selectedCentres.length === 0 ? '#1e3a8a' : '#3b82f6'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className={cn("w-[32%] border-l p-8 flex flex-col justify-between", theme === 'dark' ? "bg-slate-800/50 border-slate-700" : "bg-slate-50 border-slate-200")}>
          <div className="bg-blue-900 rounded-xl p-6 text-white mb-6 shadow-lg">
            <div className="flex justify-between items-start mb-2">
              <p className="text-blue-200 text-xs font-bold uppercase tracking-widest">Performance Max</p>
              <Trophy className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="font-display font-bold text-4xl mb-1">1 770</h2>
            <p className="text-blue-100 text-sm">Voix au centre École Hassi El Bekay</p>
            <div className="mt-4 pt-4 border-t border-blue-800 flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <p className="text-xs text-blue-200">Représente <strong>17.5%</strong> du total des votes</p>
            </div>
          </div>
          <div className="flex-1 space-y-6">
            <div>
              <h4 className={cn("font-display font-bold mb-2 flex items-center", theme === 'dark' ? "text-white" : "text-slate-800")}>
                <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs mr-2">1</span>
                Concentration des votes
              </h4>
              <p className={cn("text-sm leading-relaxed", theme === 'dark' ? "text-slate-400" : "text-slate-600")}>
                Une forte disparité est observée : le premier centre cumule plus de 3 fois le volume de votes du second. Cette zone est un bastion électoral critique.
              </p>
            </div>
            <div>
              <h4 className={cn("font-display font-bold mb-2 flex items-center", theme === 'dark' ? "text-white" : "text-slate-800")}>
                <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs mr-2">2</span>
                Répartition "Longue Traîne"
              </h4>
              <p className={cn("text-sm leading-relaxed", theme === 'dark' ? "text-slate-400" : "text-slate-600")}>
                Au-delà du top 5, le volume de votes se stabilise entre 200 et 400 voix par centre. La stratégie doit être adaptée.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Slide 4: Inscrits Chart ---
export const Slide4 = ({ selectedCentres, theme, onExport }: { selectedCentres: string[], theme?: string, onExport?: () => void }) => {
  const chartData = useMemo(() => {
    if (selectedCentres.length > 0) {
      return ELECTION_DATA.filter(item => selectedCentres.includes(item.centre));
    }
    return [...ELECTION_DATA].sort((a, b) => b.inscrits - a.inscrits).slice(0, 15);
  }, [selectedCentres]);
  
  return (
    <div className={cn("flex flex-col h-full", theme === 'dark' ? "bg-slate-900" : "bg-white")}>
      <div className={cn("h-20 border-b flex items-center justify-between px-12 z-20", theme === 'dark' ? "border-slate-800" : "border-slate-200")}>
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h1 className={cn("font-display font-bold text-2xl", theme === 'dark' ? "text-white" : "text-slate-800")}>Inscrits par Centre</h1>
            <p className="text-slate-500 text-sm">Analyse de la capacité et du poids électoral</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-4 py-2 rounded-full">
          <CheckCircle2 className="w-4 h-4" />
          <span className="text-sm font-semibold">Liste électorale officielle</span>
        </div>
      </div>
      <div className="flex-1 flex overflow-hidden">
        <div className="w-[68%] p-8 flex flex-col">
          <div className={cn("rounded-xl border p-4 h-full flex flex-col shadow-lg relative", theme === 'dark' ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100")}>
            <h3 className={cn("font-display font-semibold mb-4 pl-2 border-l-4 border-emerald-600", theme === 'dark' ? "text-slate-300" : "text-slate-700")}>
              Nombre d'inscrits par centre {selectedCentres.length > 0 ? '(Comparaison)' : '(Top 15)'}
            </h3>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? "#334155" : "#f1f5f9"} />
                  <XAxis 
                    dataKey="centre" 
                    angle={-45} 
                    textAnchor="end" 
                    interval={0} 
                    height={80}
                    tick={{ fontSize: 10, fill: theme === 'dark' ? '#94a3b8' : '#475569' }}
                  />
                  <YAxis tick={{ fontSize: 11, fill: theme === 'dark' ? '#94a3b8' : '#64748b' }} />
                  <Tooltip 
                    cursor={{ fill: theme === 'dark' ? '#064e3b' : '#f0fdf4' }}
                    content={<CustomTooltip theme={theme} />}
                  />
                  <Legend verticalAlign="top" height={36}/>
                  <Bar name="Nombre d'inscrits" dataKey="inscrits" fill="#10b981" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 && selectedCentres.length === 0 ? '#064e3b' : '#10b981'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className={cn("w-[32%] border-l p-8 flex flex-col justify-between", theme === 'dark' ? "bg-slate-800/50 border-slate-700" : "bg-slate-50 border-slate-200")}>
          <div className="bg-emerald-600 rounded-xl p-6 text-white mb-6 shadow-lg">
            <div className="flex justify-between items-start mb-2">
              <p className="text-emerald-100 text-xs font-bold uppercase tracking-widest">Plus Grand Centre</p>
              <Target className="w-5 h-5 text-yellow-300" />
            </div>
            <h2 className="font-display font-bold text-4xl mb-1">2 718</h2>
            <p className="text-emerald-100 text-sm">Inscrits à École Hassi El Bekay</p>
            <div className="mt-4 pt-4 border-t border-emerald-700 flex items-center space-x-2">
              <Info className="w-4 h-4 text-white" />
              <p className="text-xs text-emerald-100">Nécessite <strong>3+ bureaux</strong> de vote</p>
            </div>
          </div>
          <div className="flex-1 space-y-6">
            <div>
              <h4 className={cn("font-display font-bold mb-2 flex items-center", theme === 'dark' ? "text-white" : "text-slate-800")}>
                <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs mr-2">1</span>
                Dimensionnement Logistique
              </h4>
              <p className={cn("text-sm leading-relaxed", theme === 'dark' ? "text-slate-400" : "text-slate-600")}>
                Les 5 premiers centres dépassent les 1 600 inscrits. Ils requièrent une gestion de flux prioritaire.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Slide 5: Participation Chart ---
export const Slide5 = ({ selectedCentres, theme, onExport }: { selectedCentres: string[], theme?: string, onExport?: () => void }) => {
  const chartData = useMemo(() => {
    if (selectedCentres.length > 0) {
      return ELECTION_DATA.filter(item => selectedCentres.includes(item.centre));
    }
    return [...ELECTION_DATA].sort((a, b) => b.participation - a.participation).slice(0, 15);
  }, [selectedCentres]);
  
  return (
    <div className={cn("flex flex-col h-full", theme === 'dark' ? "bg-slate-900" : "bg-white")}>
      <div className={cn("h-20 border-b flex items-center justify-between px-12 z-20", theme === 'dark' ? "border-slate-800" : "border-slate-200")}>
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
            <Percent className="w-6 h-6" />
          </div>
          <div>
            <h1 className={cn("font-display font-bold text-2xl", theme === 'dark' ? "text-white" : "text-slate-800")}>Taux de Participation</h1>
            <p className="text-slate-500 text-sm">Engagement électoral par zone géographique</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-4 py-2 rounded-full">
          <CheckCircle2 className="w-4 h-4" />
          <span className="text-sm font-semibold">Calcul basé sur votes exprimés</span>
        </div>
      </div>
      <div className="flex-1 flex overflow-hidden">
        <div className="w-[68%] p-8 flex flex-col">
          <div className={cn("rounded-xl border p-4 h-full flex flex-col shadow-lg relative", theme === 'dark' ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100")}>
            <h3 className={cn("font-display font-semibold mb-4 pl-2 border-l-4 border-indigo-600", theme === 'dark' ? "text-slate-300" : "text-slate-700")}>
              Pourcentage de participation {selectedCentres.length > 0 ? '(Comparaison)' : '(Top 15)'}
            </h3>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? "#334155" : "#f1f5f9"} />
                  <XAxis 
                    dataKey="centre" 
                    angle={-45} 
                    textAnchor="end" 
                    interval={0} 
                    height={80}
                    tick={{ fontSize: 10, fill: theme === 'dark' ? '#94a3b8' : '#475569' }}
                  />
                  <YAxis 
                    domain={[0, 100]} 
                    tick={{ fontSize: 11, fill: theme === 'dark' ? '#94a3b8' : '#64748b' }}
                    tickFormatter={(val) => `${val}%`}
                  />
                  <Tooltip 
                    cursor={{ fill: theme === 'dark' ? '#1e1b4b' : '#eef2ff' }}
                    content={<CustomTooltip theme={theme} />}
                  />
                  <Legend verticalAlign="top" height={36}/>
                  <Bar name="Taux de participation" dataKey="participation" fill="#6366f1" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.participation > 65 ? '#4338ca' : '#6366f1'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className={cn("w-[32%] border-l p-8 flex flex-col justify-between", theme === 'dark' ? "bg-slate-800/50 border-slate-700" : "bg-slate-50 border-slate-200")}>
          <div className="bg-indigo-600 rounded-xl p-6 text-white mb-6 shadow-lg">
            <div className="flex justify-between items-start mb-2">
              <p className="text-indigo-100 text-xs font-bold uppercase tracking-widest">Record Participation</p>
              <Trophy className="w-5 h-5 text-yellow-300" />
            </div>
            <h2 className="font-display font-bold text-4xl mb-1">75,2%</h2>
            <p className="text-indigo-100 text-sm">Au centre École Hassi El Bekay</p>
            <div className="mt-4 pt-4 border-t border-indigo-700 flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-emerald-300" />
              <p className="text-xs text-indigo-100">Supérieur de <strong>16%</strong> à la moyenne</p>
            </div>
          </div>
          <div className="flex-1 space-y-6">
            <div>
              <h4 className={cn("font-display font-bold mb-2 flex items-center", theme === 'dark' ? "text-white" : "text-slate-800")}>
                <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs mr-2">1</span>
                Corrélation Volume/Taux
              </h4>
              <p className={cn("text-sm leading-relaxed", theme === 'dark' ? "text-slate-400" : "text-slate-600")}>
                On remarque que les centres avec le plus grand nombre d'inscrits maintiennent également des taux de participation élevés (&gt;60%).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Slide 6: Conclusions ---
export const Slide6 = ({ theme, selectedCentres, onExport }: { theme?: string, selectedCentres?: string[], onExport?: () => void }) => (
  <div className={cn("flex flex-col h-full", theme === 'dark' ? "bg-slate-900" : "bg-white")}>
    <div className={cn("h-24 border-b flex items-center justify-between px-12 relative z-20 shrink-0", theme === 'dark' ? "border-slate-800" : "border-slate-200")}>
      <div className="flex items-center space-x-5">
        <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center text-white shadow-md">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div>
          <h1 className={cn("font-display font-extrabold text-3xl tracking-tight", theme === 'dark' ? "text-white" : "text-slate-900")}>Conclusions & Recommandations</h1>
          <p className="text-blue-600 dark:text-blue-400 font-medium text-sm tracking-wide uppercase">Synthèse Stratégique - Municipalité de Kiffa</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <div className="h-2 w-12 bg-emerald-500 rounded-full" />
        <div className="h-2 w-4 bg-blue-500 rounded-full" />
        <div className="h-2 w-2 bg-blue-300 rounded-full" />
      </div>
    </div>
    <div className={cn("flex-1 flex p-10 gap-10 relative overflow-hidden", theme === 'dark' ? "bg-slate-900" : "bg-slate-50")}>
      <div className={cn("absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:20px_20px]", theme === 'dark' && "opacity-10")} />
      
      <div className="w-1/2 flex flex-col space-y-6 z-10">
        <div className="flex items-center space-x-3 mb-2">
          <div className="bg-blue-100 dark:bg-blue-900/40 p-2 rounded-md">
            <Lightbulb className="w-6 h-6 text-blue-700 dark:text-blue-400" />
          </div>
          <h2 className={cn("font-display font-bold text-2xl", theme === 'dark' ? "text-white" : "text-blue-900")}>Conclusions Principales</h2>
        </div>
        <div className={cn("p-6 rounded-xl shadow-md border-l-4", theme === 'dark' ? "bg-slate-800 border-blue-900" : "bg-white border-blue-900")}>
          <h3 className={cn("font-display font-bold text-lg mb-2 flex items-center", theme === 'dark' ? "text-white" : "text-slate-800")}>
            <TrendingUp className="w-5 h-5 text-blue-500 mr-3" />
            Polarisation des Votes
          </h3>
          <p className={cn("text-sm leading-relaxed", theme === 'dark' ? "text-slate-400" : "text-slate-600")}>
            Une forte concentration des suffrages est observée sur <strong>5 centres majeurs</strong>. La performance globale dépend critiquement de ces bastions.
          </p>
        </div>
        <div className={cn("p-6 rounded-xl shadow-md border-l-4", theme === 'dark' ? "bg-slate-800 border-blue-400" : "bg-white border-blue-400")}>
          <h3 className={cn("font-display font-bold text-lg mb-2 flex items-center", theme === 'dark' ? "text-white" : "text-slate-800")}>
            <Users className="w-5 h-5 text-blue-400 mr-3" />
            Réservoirs Inexploités
          </h3>
          <p className={cn("text-sm leading-relaxed", theme === 'dark' ? "text-slate-400" : "text-slate-600")}>
            Plusieurs centres à fort potentiel d'inscrits affichent des taux de participation inférieurs à la moyenne (sous les 55%).
          </p>
        </div>
      </div>

      <div className="w-1/2 flex flex-col z-10">
        <div className="bg-blue-900 text-white rounded-t-xl p-6 shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="bg-white bg-opacity-20 p-2 rounded-md">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h2 className="font-display font-bold text-2xl">Plan d'Action Stratégique</h2>
          </div>
        </div>
        <div className={cn("rounded-b-xl p-8 flex-1 shadow-md border-x border-b flex flex-col justify-between", theme === 'dark' ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200")}>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="shrink-0 mt-1">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-200 dark:border-emerald-800 text-sm">1</span>
              </div>
              <div>
                <h4 className={cn("font-display font-bold text-lg mb-1", theme === 'dark' ? "text-white" : "text-slate-800")}>Consolider les Bastions</h4>
                <p className={cn("text-sm", theme === 'dark' ? "text-slate-400" : "text-slate-600")}>
                  Maintenir une présence active sur le top 5 des centres pour sécuriser le socle électoral existant.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="shrink-0 mt-1">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 font-bold border border-orange-200 dark:border-orange-800 text-sm">2</span>
              </div>
              <div>
                <h4 className={cn("font-display font-bold text-lg mb-1", theme === 'dark' ? "text-white" : "text-slate-800")}>Mobilisation Ciblée</h4>
                <p className={cn("text-sm", theme === 'dark' ? "text-slate-400" : "text-slate-600")}>
                  Lancer des campagnes intensives dans les centres identifiés comme "sous-performants".
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="shrink-0 mt-1">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-bold border border-blue-200 dark:border-blue-800 text-sm">3</span>
              </div>
              <div>
                <h4 className={cn("font-display font-bold text-lg mb-1", theme === 'dark' ? "text-white" : "text-slate-800")}>Optimisation Logistique</h4>
                <p className={cn("text-sm", theme === 'dark' ? "text-slate-400" : "text-slate-600")}>
                  Rationaliser les ressources allouées aux petits centres en favorisant des relais locaux légers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className={cn("h-12 flex items-center justify-between px-12 text-xs", theme === 'dark' ? "bg-slate-950 text-slate-500" : "bg-slate-800 text-slate-400")}>
      <p>© 2026 Analyse Électorale - Confidentiel</p>
      <div className="flex space-x-4">
        <p>Page 06</p>
        <p>|</p>
        <p>Kiffa</p>
      </div>
    </div>
  </div>
);
