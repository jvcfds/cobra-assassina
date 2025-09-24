import { SnakeGame } from "./components/SnakeGame";
import { useState } from "react";

function App() {
  const [dark, setDark] = useState(false);

  return (
    <div
      style={{
        textAlign: "center",
        backgroundColor: dark ? "#121212" : "#f5f5f5",
        color: dark ? "#f5f5f5" : "#121212",
        minHeight: "100vh",
        padding: "20px",
        transition: "all 0.3s ease",
      }}
    >
      <h1>Cobra Assassina 🐍</h1>
      <button
        onClick={() => setDark(!dark)}
        style={{
          marginBottom: "20px",
          padding: "10px 20px",
          cursor: "pointer",
          borderRadius: "8px",
          border: "none",
          backgroundColor: dark ? "#333" : "#ddd",
          color: dark ? "#fff" : "#000",
        }}
      >
        {dark ? "☀️ Modo Claro" : "🌙 Modo Escuro"}
      </button>
      <SnakeGame />
    </div>
  );
}

export default App;
