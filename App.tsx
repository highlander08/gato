import React, { useState, useCallback, useMemo } from 'react';
import { MemoryGame } from './components/MemoryGame';
import { QuantumBox } from './components/QuantumBox';
import { AppState, CatState } from './types';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.PRE_SIMULATION);
  const [catState, setCatState] = useState<CatState>(CatState.SUPERPOSITION);
  const [gameKey, setGameKey] = useState<number>(0);

  const handleStart = () => {
    setAppState(AppState.SUPERPOSITION);
  };
  
  const handleSuccess = useCallback(() => {
    setCatState(CatState.ALIVE);
    setAppState(AppState.REVEALING);
  }, []);

  const handleFailure = useCallback(() => {
    setCatState(CatState.DEAD);
    setAppState(AppState.REVEALING);
  }, []);

  const handleReset = () => {
    setCatState(CatState.SUPERPOSITION);
    setAppState(AppState.PRE_SIMULATION);
    setGameKey(prevKey => prevKey + 1);
  };
  
  const resultData = useMemo(() => {
    switch (catState) {
      case CatState.ALIVE:
        return {
          title: "Você salvou o gato!",
          titleClass: "text-green-400",
          text: "A função de onda colapsou em um estado feliz 🐾.",
          buttonText: "Simular Novamente",
        };
      case CatState.DEAD:
        return {
          title: "Você falhou... O gato morreu.",
          titleClass: "text-red-500",
          text: "O colapso da função de onda revelou o pior destino.",
          buttonText: "Tentar Salvar Outro Gato",
        };
      default:
        return null;
    }
  }, [catState]);

  const getHeaderText = () => {
    switch(appState) {
      case AppState.PRE_SIMULATION:
        return "Um Gato e seu Destino Quântico";
      case AppState.SUPERPOSITION:
        return "Observando a Superposição...";
      case AppState.REVEALING:
        return "A Função de Onda Colapsou!";
    }
  }

  return (
    <div className="bg-quantum-dark text-gray-100 min-h-screen flex items-center justify-center p-4 font-mono select-none relative z-10 overflow-hidden">
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-stretch rounded-lg bg-slate-900/40 shadow-2xl shadow-cyan-500/10 border border-cyan-500/20">
        
        {/* Left Column: Information */}
        <aside className="w-full md:w-1/3 p-8 border-b-2 md:border-b-0 md:border-r-2 border-cyan-500/20 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-2 tracking-wider" style={{ textShadow: '0 0 10px #06b6d4, 0 0 5px #06b6d4' }}>Gato de Schrödinger</h1>
          <h2 className="text-lg md:text-xl text-gray-300 mb-8 opacity-80">{getHeaderText()}</h2>

          <div className="text-gray-400 space-y-6 text-left">
            <div>
              <h3 className="font-bold text-cyan-300 text-lg mb-2">O Conceito</h3>
              <p className="text-sm leading-relaxed">
                Um gato é colocado em uma caixa selada com um mecanismo que pode matá-lo, baseado no decaimento de um átomo radioativo.
              </p>
            </div>
             <div>
              <h3 className="font-bold text-cyan-300 text-lg mb-2">Superposição</h3>
              <p className="text-sm leading-relaxed">
                Enquanto a caixa está fechada, o gato existe em uma "superposição" de estados — ele é considerado simultaneamente <strong>vivo E morto</strong>.
              </p>
            </div>
             <div>
              <h3 className="font-bold text-cyan-300 text-lg mb-2">O Observador</h3>
              <p className="text-sm leading-relaxed">
                Somente ao abrir a caixa (observar) o destino do gato é selado. Sua observação força o universo a "escolher" um estado. Você será o observador.
              </p>
            </div>
          </div>
        </aside>

        {/* Right Column: Simulation */}
        <div className="w-full md:w-2/3 p-4 flex flex-col items-center justify-center min-h-[600px] md:min-h-full">
          <main className="w-full flex flex-col items-center justify-center">
            <QuantumBox appState={appState} catState={catState} />

            {appState === AppState.PRE_SIMULATION && (
              <div className="animate-fade-in mt-4">
                <button
                  onClick={handleStart}
                  className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-gray-900 font-bold rounded-lg shadow-lg shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
                >
                  Iniciar Simulação
                </button>
              </div>
            )}

            {appState === AppState.SUPERPOSITION && (
               <MemoryGame
                  key={gameKey}
                  onSuccess={handleSuccess}
                  onFailure={handleFailure}
               />
            )}

            {appState === AppState.REVEALING && resultData && (
              <div className="animate-fade-in text-center min-h-[120px] mt-6">
                 <h3 className={`text-3xl font-bold ${resultData.titleClass}`}>
                   {resultData.title}
                 </h3>
                 <p className="mt-2 text-gray-400">{resultData.text}</p>
                 <button
                     onClick={handleReset}
                     className="mt-8 px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-gray-900 font-bold rounded-lg shadow-lg shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
                 >
                     {resultData.buttonText}
                 </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;