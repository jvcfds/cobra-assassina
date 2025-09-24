import { useEffect, useRef, useState } from "react";

const gridSize = 20;
const canvasSize = 400;

type Position = { x: number; y: number };

export function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<"UP" | "DOWN" | "LEFT" | "RIGHT">("RIGHT");

  // Captura teclas
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
      }
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

        // Game Over
        if (
          head.x < 0 ||
          head.y < 0 ||
          head.x >= canvasSize / gridSize ||
          head.y >= canvasSize / gridSize ||
          newSnake.slice(1).some((p) => p.x === head.x && p.y === head.y)
        ) {
          alert("Game Over!");
          return [{ x: 10, y: 10 }];
        }

        return newSnake;
      });
    }, 250); // 👈 velocidade ajustada

    return () => clearInterval(interval);
  }, [direction, food]);

  // Desenhar
  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvasSize, canvasSize);

    ctx.fillStyle = "lime";
    snake.forEach((part) => {
      ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize, gridSize);
    });

    ctx.fillStyle = "red";
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
  }, [snake, food]);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>🐍 Snake Game</h2>
      <canvas
        ref={canvasRef}
        width={canvasSize}
        height={canvasSize}
        style={{ border: "2px solid white" }}
      />
    </div>
  ); // <-- fecha o return certinho
} // <-- fecha o componente
