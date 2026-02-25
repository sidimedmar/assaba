import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize, 
  Minimize,
  Keyboard,
  Play,
  Pause,
  Moon,
  Sun,
  Filter,
  Loader2,
  X,
  Download,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Slide1, Slide2, Slide3, Slide4, Slide5, Slide6 } from './components/Slides';
import { cn, ELECTION_DATA, exportToCSV } from './lib/utils';

const slides = [
  { id: 1, component: Slide1 },
  { id: 2, component: Slide2 },
  { id: 3, component: Slide3 },
  { id: 4, component: Slide4 },
  { id: 5, component: Slide5 },
  { id: 6, component: Slide6 },
];

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAutoplay, setIsAutoplay] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [selectedCentres, setSelectedCentres] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Stats for selected centres
  const selectedStats = useMemo(() => {
    if (selectedCentres.length === 0) return null;
    const filtered = ELECTION_DATA.filter(c => selectedCentres.includes(c.centre));
    const totalInscrits = filtered.reduce((acc, curr) => acc + curr.inscrits, 0);
    const avgParticipation = filtered.reduce((acc, curr) => acc + curr.participation, 0) / filtered.length;
    return { totalInscrits, avgParticipation };
  }, [selectedCentres]);

  const handleExport = () => {
    const dataToExport = selectedCentres.length > 0 
      ? ELECTION_DATA.filter(c => selectedCentres.includes(c.centre))
      : ELECTION_DATA;
    
    exportToCSV(dataToExport, `election_data_${new Date().toISOString().split('T')[0]}.csv`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Apply theme to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const nextSlide = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setIsLoading(false);
    }, 300);
  }, []);

  const prevSlide = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setIsLoading(false);
    }, 300);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'f') toggleFullscreen();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoplay) {
      interval = setInterval(nextSlide, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoplay, nextSlide]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const toggleCentre = (centre: string) => {
    setIsLoading(true);
    setSelectedCentres(prev => 
      prev.includes(centre) 
        ? prev.filter(c => c !== centre) 
        : [...prev, centre]
    );
    setTimeout(() => setIsLoading(false), 400);
  };

  const CurrentSlideComponent = slides[currentSlide].component;

  return (
    <div className={cn(
      "min-h-screen flex flex-col items-center justify-center p-4 md:p-8 transition-colors duration-500",
      theme === 'dark' ? "bg-slate-950" : "bg-slate-100"
    )}>
      {/* Top Controls */}
      {!isFullscreen && (
        <div className="w-full max-w-6xl flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex flex-col">
            <h1 className={cn(
              "text-2xl font-display font-bold transition-colors",
              theme === 'dark' ? "text-white" : "text-slate-900"
            )}>Présentation Électorale</h1>
            <p className="text-slate-500 text-sm">Municipalité de Kiffa • 2024</p>
          </div>
          
          <div className="flex items-center flex-wrap gap-2">
            {/* Export Button */}
            <button
              onClick={handleExport}
              className={cn(
                "p-2 rounded-lg transition-all duration-200 border flex items-center space-x-2 px-4",
                theme === 'dark' ? "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              )}
              title="Exporter les données en CSV"
            >
              <Download className="w-4 h-4" />
              <span className="text-sm font-medium hidden sm:inline">Exporter</span>
            </button>

            {/* Theme Toggle */}
            <button 
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className={cn(
                "p-2 rounded-lg transition-all duration-200 border",
                theme === 'dark' ? "bg-slate-800 text-yellow-400 border-slate-700 hover:bg-slate-700" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              )}
              title="Changer de thème"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            {/* Filter Toggle */}
            <button 
              onClick={() => setShowFilter(!showFilter)}
              className={cn(
                "p-2 rounded-lg transition-all duration-200 border flex items-center space-x-2 px-4",
                showFilter ? "bg-blue-600 text-white border-blue-500" : (theme === 'dark' ? "bg-slate-800 text-slate-300 border-slate-700" : "bg-white text-slate-600 border-slate-200")
              )}
            >
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Comparer ({selectedCentres.length})</span>
            </button>

            <button 
              onClick={() => setIsAutoplay(!isAutoplay)}
              className={cn(
                "p-2 rounded-lg transition-all duration-200 flex items-center space-x-2 px-4 border",
                isAutoplay ? "bg-blue-600 text-white border-blue-500" : (theme === 'dark' ? "bg-slate-800 text-slate-300 border-slate-700" : "bg-white text-slate-600 border-slate-200")
              )}
            >
              {isAutoplay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span className="text-sm font-medium">{isAutoplay ? 'Pause' : 'Lecture auto'}</span>
            </button>

            <button 
              onClick={toggleFullscreen}
              className={cn(
                "p-2 rounded-lg transition-all duration-200 border",
                theme === 'dark' ? "bg-slate-800 text-slate-300 border-slate-700" : "bg-white text-slate-600 border-slate-200"
              )}
              title="Plein écran (F)"
            >
              <Maximize className="w-5 h-5" />
            </button>

            <div className={cn(
              "flex items-center rounded-lg p-1 border",
              theme === 'dark' ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"
            )}>
              <button 
                onClick={prevSlide}
                className={cn(
                  "p-2 rounded-md transition-all",
                  theme === 'dark' ? "text-slate-400 hover:bg-slate-700" : "text-slate-600 hover:bg-slate-50"
                )}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className={cn(
                "px-4 text-sm font-bold min-w-[80px] text-center",
                theme === 'dark' ? "text-slate-200" : "text-slate-700"
              )}>
                {currentSlide + 1} / {slides.length}
              </div>
              <button 
                onClick={nextSlide}
                className={cn(
                  "p-2 rounded-md transition-all",
                  theme === 'dark' ? "text-slate-400 hover:bg-slate-700" : "text-slate-600 hover:bg-slate-50"
                )}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilter && !isFullscreen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={cn(
              "w-full max-w-6xl mb-6 overflow-hidden rounded-xl border",
              theme === 'dark' ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
            )}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className={cn(
                  "font-display font-bold",
                  theme === 'dark' ? "text-white" : "text-slate-800"
                )}>Sélectionner des centres pour comparaison</h3>
                <button 
                  onClick={() => setSelectedCentres([])}
                  className="text-xs text-blue-500 hover:underline font-bold"
                >
                  Tout effacer
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                {ELECTION_DATA.slice(0, 15).map(item => (
                  <button
                    key={item.centre}
                    onClick={() => toggleCentre(item.centre)}
                    className={cn(
                      "text-xs p-2 rounded-md text-left transition-all border",
                      selectedCentres.includes(item.centre)
                        ? "bg-blue-600 text-white border-blue-500 shadow-sm"
                        : (theme === 'dark' ? "bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-500" : "bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300")
                    )}
                  >
                    {item.centre}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected Summary */}
      <AnimatePresence>
        {selectedStats && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full max-w-6xl mb-6"
          >
            <div className={cn(
              "p-4 rounded-xl border flex items-center justify-between",
              theme === 'dark' ? "bg-slate-900/50 border-slate-800 text-white" : "bg-blue-50 border-blue-100 text-slate-900"
            )}>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="bg-blue-600 p-1.5 rounded-md">
                    <Filter className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-display font-bold text-sm">Résumé de la sélection</span>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-slate-500 dark:text-slate-400">Centres:</span>
                    <span className="font-bold">{selectedCentres.length}</span>
                  </div>
                  <div className="h-4 w-px bg-slate-300 dark:bg-slate-700" />
                  <div className="flex items-center space-x-1.5">
                    <span className="text-slate-500 dark:text-slate-400">Total Inscrits:</span>
                    <span className="font-bold">{selectedStats.totalInscrits.toLocaleString()}</span>
                  </div>
                  <div className="h-4 w-px bg-slate-300 dark:bg-slate-700" />
                  <div className="flex items-center space-x-1.5">
                    <span className="text-slate-500 dark:text-slate-400">Part. Moyenne:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{selectedStats.avgParticipation.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setSelectedCentres([])}
                className="text-xs text-slate-500 hover:text-red-500 font-bold flex items-center space-x-1"
              >
                <X className="w-3 h-3" />
                <span>Réinitialiser</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slide Container */}
      <div className={cn(
        "relative shadow-2xl overflow-hidden transition-all duration-500",
        isFullscreen ? "w-screen h-screen rounded-none" : "w-full max-w-6xl aspect-video rounded-2xl",
        theme === 'dark' ? "bg-slate-900" : "bg-white"
      )}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentSlide}-${theme}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full h-full"
          >
            <CurrentSlideComponent 
              selectedCentres={selectedCentres} 
              theme={theme} 
              onExport={handleExport}
            />
          </motion.div>
        </AnimatePresence>

        {/* Loading Overlay */}
        <AnimatePresence>
          {isLoading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-[2px]"
            >
              <div className={cn(
                "p-4 rounded-xl shadow-2xl flex items-center space-x-3",
                theme === 'dark' ? "bg-slate-800 text-white" : "bg-white text-slate-900"
              )}>
                <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                <span className="font-display font-bold">Mise à jour...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Navigation Overlay */}
        <div className="absolute inset-y-0 left-0 w-24 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 z-50">
          <button 
            onClick={prevSlide}
            className="w-12 h-12 bg-black/20 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-black/40 transition-all"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 w-24 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 z-50">
          <button 
            onClick={nextSlide}
            className="w-12 h-12 bg-black/20 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-black/40 transition-all"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      </div>

      {/* Global Progress Bar */}
      <div className="fixed bottom-0 left-0 w-full h-1.5 z-[200] bg-slate-200 dark:bg-slate-800 overflow-hidden">
        <motion.div 
          className="h-full bg-blue-600 relative"
          initial={{ width: 0 }}
          animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          transition={{ duration: 0.6, ease: "circOut" }}
        >
          <motion.div 
            className="absolute top-0 right-0 h-full w-24 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[200]"
          >
            <div className="bg-emerald-600 text-white px-6 py-3 rounded-full shadow-2xl flex items-center space-x-3">
              <CheckCircle className="w-5 h-5" />
              <span className="font-display font-bold text-sm">Exportation réussie !</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyboard Help */}
      {!isFullscreen && (
        <div className="mt-8 flex items-center space-x-6 text-slate-400 text-xs uppercase tracking-widest font-bold">
          <div className="flex items-center space-x-2">
            <Keyboard className="w-4 h-4" />
            <span>Raccourcis</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-1.5 py-0.5 rounded">←</span>
            <span className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-1.5 py-0.5 rounded">→</span>
            <span>Naviguer</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-1.5 py-0.5 rounded">ESPACE</span>
            <span>Suivant</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-1.5 py-0.5 rounded">F</span>
            <span>Plein écran</span>
          </div>
        </div>
      )}
    </div>
  );
}
