import { useState, useEffect } from "react";
import "./Contador.css";

type ContadorProps = {
  titulo: string;
};

export function Contador({ titulo }: ContadorProps) {
  const [contador, setContador] = useState<number>(() => {
    const dadosSalvos = localStorage.getItem(titulo);
    if (dadosSalvos) {
      const obj = JSON.parse(dadosSalvos);
      return obj.contador ?? 0;
    }
    return 0;
  });

  const [historico, setHistorico] = useState<string[]>(() => {
    const dadosSalvos = localStorage.getItem(titulo);
    if (dadosSalvos) {
      const obj = JSON.parse(dadosSalvos);
      return obj.historico ?? [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(
      titulo,
      JSON.stringify({ contador, historico })
    );
  }, [contador, historico, titulo]);

  const registrarAcao = (acao: string, novoValor: number) => {
    setContador(novoValor);
    setHistorico((prev) => [...prev, acao]);
  };

  return (
    <div className="card">
      <h2 className="card-title">{titulo}</h2>
      <p className="card-value">{contador}</p>

      <div className="btn-row">
        <button
          className="btn btn-green"
          onClick={() => registrarAcao("+1", contador + 1)}
        >
          +1
        </button>
        <button
          className="btn btn-red"
          onClick={() => registrarAcao("-1", contador - 1)}
        >
          -1
        </button>
        <button
          className="btn btn-blue"
          onClick={() => registrarAcao("reset", 0)}
        >
          Resetar
        </button>
      </div>

      <h3 className="history-title">Histórico:</h3>
      <ul className="history-list">
        {historico.map((acao, i) => (
          <li
            key={i}
            className={`history-item ${
              acao === "+1" ? "green" : acao === "-1" ? "red" : "blue"
            }`}
          >
            {acao}
          </li>
        ))}
      </ul>
    </div>
  );
}
