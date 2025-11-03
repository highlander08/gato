import React, { useState, useCallback, useMemo } from 'react';
import { MemoryGame } from './components/MemoryGame';
import { QuantumBox } from './components/QuantumBox';
import { AppState, CatState } from './types';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.HOME);
  const [catState, setCatState] = useState<CatState>(CatState.SUPERPOSITION);
  const [gameKey, setGameKey] = useState<number>(0);

  const handleStart = () => {
    setAppState(AppState.PLAYING);
  };

  const handleSuccess = useCallback(() => {
    const finalState = Math.random() < 0.5 ? CatState.ALIVE : CatState.DEAD;
    setCatState(finalState);
    setAppState(AppState.RESULT);
  }, []);

  const handleFailure = useCallback(() => {
    setCatState(CatState.SUPERPOSITION);
    setAppState(AppState.RESULT);
  }, []);

  const handleReset = () => {
    setCatState(CatState.SUPERPOSITION);
    setAppState(AppState.HOME);
    setGameKey(prevKey => prevKey + 1);
  };
  
  const resultData = useMemo(() => {
    switch (catState) {
      case CatState.ALIVE:
        return {
          title: "O gato está vivo!",
          titleClass: "text-green-400",
          icon: "🟢",
          text: "A observação colapsou a função de onda. O destino do gato foi revelado!",
          buttonText: "Jogar novamente",
        };
      case CatState.DEAD:
        return {
          title: "O gato está morto!",
          titleClass: "text-red-500",
          icon: "🔴",
          text: "A observação colapsou a função de onda. O destino do gato foi revelado!",
          buttonText: "Jogar novamente",
        };
      case CatState.SUPERPOSITION: // This case is for failure
        return {
          title: "Erro de observação!",
          titleClass: "text-yellow-400",
          icon: "",
          text: "O estado quântico permanece indefinido. A caixa continua selada.",
          buttonText: "Tentar novamente",
        };
    }
  }, [catState]);

  return (
    <div className="bg-quantum-dark text-gray-100 min-h-screen flex flex-col items-center justify-center p-4 font-mono select-none relative z-10">
      <div className="w-full max-w-2xl text-center flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-4 tracking-wider" style={{ textShadow: '0 0 10px #06b6d4, 0 0 5px #06b6d4' }}>Gato de Schrödinger</h1>
        <h2 className="text-lg md:text-xl text-gray-300 mb-8 opacity-80">Um Jogo de Memória Quântica</h2>

        <main className="w-full min-h-[450px] flex flex-col items-center justify-center">
          {appState === AppState.HOME && (
            <div className="animate-fade-in flex flex-col items-center">
              <QuantumBox catState={catState} />
              <p className="mt-6 text-lg max-w-md opacity-90 text-center">
                O gato está em superposição: vivo e morto ao mesmo tempo. Para descobrir seu destino, vença o jogo de memória.
              </p>
              <button
                onClick={handleStart}
                className="mt-8 px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-gray-900 font-bold rounded-lg shadow-lg shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
              >
                Iniciar Experimento
              </button>
            </div>
          )}

          {appState === AppState.PLAYING && (
             <MemoryGame
                key={gameKey}
                onSuccess={handleSuccess}
                onFailure={handleFailure}
             />
          )}

          {appState === AppState.RESULT && (
            <div className="animate-fade-in flex flex-col items-center">
              <QuantumBox catState={catState} />
               <div className="mt-6 text-center min-h-[120px]">
                  <h3 className={`text-3xl font-bold ${resultData.titleClass}`}>
                    {resultData.title} {resultData.icon}
                  </h3>
                  <p className="mt-2 text-gray-400">{resultData.text}</p>
                  <button
                      onClick={handleReset}
                      className="mt-8 px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-gray-900 font-bold rounded-lg shadow-lg shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
                  >
                      {resultData.buttonText}
                  </button>
               </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;