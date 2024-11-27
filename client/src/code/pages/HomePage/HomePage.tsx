import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Cabeçalho */}
      <header className="bg-blue-600 text-white w-full py-6 text-center">
        <h1 className="text-4xl font-bold">Futebol Flashscore</h1>
        <p className="text-lg mt-2">Resultados ao vivo e estatísticas em tempo real</p>
      </header>

      {/* Conteúdo principal */}
      <main className="mt-10 flex flex-col items-center space-y-6">
        {/* Sessão de Jogos ao Vivo */}
        <section className="w-11/12 max-w-2xl bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-center">Jogos ao Vivo</h2>
          <ul className="space-y-4">
            <li className="p-4 border rounded bg-gray-50 flex justify-between">
              <span>Time A vs Time B</span>
              <span className="font-bold">2 - 1</span>
            </li>
            <li className="p-4 border rounded bg-gray-50 flex justify-between">
              <span>Time C vs Time D</span>
              <span className="font-bold">0 - 0</span>
            </li>
          </ul>
        </section>

        {/* Sessão de Resultados Recentes */}
        <section className="w-11/12 max-w-2xl bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-center">Resultados Recentes</h2>
          <ul className="space-y-4">
            <li className="p-4 border rounded bg-gray-50 flex justify-between">
              <span>Time E vs Time F</span>
              <span className="font-bold">3 - 2</span>
            </li>
            <li className="p-4 border rounded bg-gray-50 flex justify-between">
              <span>Time G vs Time H</span>
              <span className="font-bold">1 - 4</span>
            </li>
          </ul>
        </section>
      </main>

      {/* Rodapé */}
      <footer className="mt-10 py-6 bg-gray-800 text-white w-full text-center">
        <p className="text-sm">© 2024 Futebol Flashscore. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default HomePage;
