import { useState, useEffect } from "react";
import { Contador } from "./Contador";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <header className="app-header">
        <h1>Vários Contadores 🚀</h1>
        <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Claro" : "🌙 Escuro"}
        </button>
      </header>

      <div className="grid">
        <Contador titulo="Cliques" />
        <Contador titulo="Visitas" />
        <Contador titulo="Tarefas feitas" />
      </div>
    </div>
  );
}

export default App;
