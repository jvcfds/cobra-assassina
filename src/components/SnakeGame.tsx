import React, { useState, useEffect, useRef } from "react";

type Position = { x: number; y: number };

export const SnakeGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<"UP" | "DOWN" | "LEFT" | "RIGHT">("RIGHT");
  const [gameOver, setGameOver] = useState(false);

  const gridSize = 20;
  const canvasSize = 400;

  // Teclado (funciona no PC)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" && direction !== "DOWN") setDirection("UP");
      if (e.key === "ArrowDown" && direction !== "UP") setDirection("DOWN");
      if (e.key === "ArrowLeft" && direction !== "RIGHT") setDirection("LEFT");
      if (e.key === "ArrowRight" && direction !== "LEFT") setDirection("RIGHT");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction]);

  // Loop do jogo
  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setSnake((prev) => {
        const newSnake = [...prev];
        const head = { ...newSnake[0] };

        if (direction === "UP") head.y -= 1;
        if (direction === "DOWN") head.y += 1;
        if (direction === "LEFT") head.x -= 1;
        if (direction === "RIGHT") head.x += 1;

        newSnake.unshift(head);

        // Comer comida
        if (head.x === food.x && head.y === food.y) {
          setFood({
            x: Math.floor(Math.random() * (canvasSize / gridSize)),
            y: Math.floor(Math.random() * (canvasSize / gridSize)),
          });
        } else {
          newSnake.pop();
        }

        // Colisão
        if (
          head.x < 0 ||
          head.y < 0 ||
          head.x >= canvasSize / gridSize ||
          head.y >= canvasSize / gridSize ||
          newSnake.slice(1).some((part) => part.x === head.x && part.y === head.y)
        ) {
          setGameOver(true);
          return prev;
        }

        return newSnake;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [direction, food, gameOver]);

  // Desenhar
  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    // fundo
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvasSize, canvasSize);

    // cobra
    ctx.fillStyle = "lime";
    snake.forEach((part) => {
      ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize, gridSize);
    });

    // comida
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
  }, [snake, food]);

    return (
    <div style={{ textAlign: "center" }}>
      <canvas
        ref={canvasRef}
        width={canvasSize}
        height={canvasSize}
        style={{ border: "2px solid #fff", background: "#111" }}
      />

      {/* Botões para celular */}
      <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
        <button style={{ fontSize: "2rem", padding: "10px 20px" }} onClick={() => setDirection("UP")}>⬆️</button>
        <div style={{ display: "flex", gap: "10px" }}>
          <button style={{ fontSize: "2rem", padding: "10px 20px" }} onClick={() => setDirection("LEFT")}>⬅️</button>
          <button style={{ fontSize: "2rem", padding: "10px 20px" }} onClick={() => setDirection("DOWN")}>⬇️</button>
          <button style={{ fontSize: "2rem", padding: "10px 20px" }} onClick={() => setDirection("RIGHT")}>➡️</button>
        </div>
      </div>
    </div>
  );
}
