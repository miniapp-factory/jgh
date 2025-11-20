'use client';
import { useEffect, useState, useRef } from "react";

interface Obstacle {
  x: number;
}

export default function JumpDodgeGame() {
  const [score, setScore] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const obstacleTimer = useRef<NodeJS.Timeout | null>(null);
  const gameTimer = useRef<NodeJS.Timeout | null>(null);

  // Handle jump
  const handleJump = () => {
    if (gameOver) return;
    setIsJumping(true);
    setTimeout(() => setIsJumping(false), 200);
  };

  // Add new obstacle at random intervals
  useEffect(() => {
    if (gameOver) return;
    obstacleTimer.current = setInterval(() => {
      setObstacles((prev) => [...prev, { x: 100 }]);
    }, 2000);
    return () => {
      if (obstacleTimer.current) clearInterval(obstacleTimer.current);
    };
  }, [gameOver]);

  // Game loop
  useEffect(() => {
    if (gameOver) return;
    gameTimer.current = setInterval(() => {
      setScore((s) => s + 1);

      setObstacles((prev) =>
        prev
          .map((o) => ({ ...o, x: o.x - 5 }))
          .filter((o) => {
            if (o.x <= 0) {
              if (isJumping) {
                // Successfully jumped over
                return false;
              } else {
                // Hit obstacle
                setGameOver(true);
                return false;
              }
            }
            return true;
          })
      );
    }, 100);

    return () => {
      if (gameTimer.current) clearInterval(gameTimer.current);
    };
  }, [isJumping, gameOver]);

  return (
    <div
      className="relative w-[300px] h-[200px] bg-gray-200 border border-gray-400 rounded-md"
      onClick={handleJump}
    >
      <div className="absolute bottom-0 left-0 w-4 h-4 bg-blue-500 rounded-full" />
      {obstacles.map((o, idx) => (
        <div
          key={idx}
          className="absolute bottom-0 w-4 h-4 bg-red-500 rounded-full"
          style={{ left: `${o.x}px` }}
        />
      ))}
      <div className="absolute top-0 left-0 p-2 text-sm">
        Score: {score}
      </div>
      {gameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white">
          <h2 className="text-xl mb-2">Game Over</h2>
          <button
            onClick={() => {
              setScore(0);
              setGameOver(false);
              setObstacles([]);
            }}
            className="px-4 py-2 bg-primary text-primary-foreground rounded"
          >
            Retake
          </button>
        </div>
      )}
    </div>
  );
}
