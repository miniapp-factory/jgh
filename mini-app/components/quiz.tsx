'use client';
import { useState } from "react";
import Result from "./result";
import { Share } from "@/components/share";
import { url } from "@/lib/metadata";

const questions = [
  {
    question: "What is your favorite type of food?",
    options: [
      { text: "Fish", animal: "cat" },
      { text: "Meat", animal: "dog" },
      { text: "Berries", animal: "fox" },
      { text: "Seeds", animal: "hamster" },
      { text: "Grain", animal: "horse" },
    ],
  },
  {
    question: "Which activity do you enjoy most?",
    options: [
      { text: "Chasing mice", animal: "cat" },
      { text: "Playing fetch", animal: "dog" },
      { text: "Hunting in the woods", animal: "fox" },
      { text: "Nibbling on plants", animal: "hamster" },
      { text: "Running in fields", animal: "horse" },
    ],
  },
  {
    question: "What is your preferred living environment?",
    options: [
      { text: "Indoor cozy home", animal: "cat" },
      { text: "Open yard", animal: "dog" },
      { text: "Forest clearing", animal: "fox" },
      { text: "Small cage", animal: "hamster" },
      { text: "Wide pasture", animal: "horse" },
    ],
  },
  {
    question: "How do you like to spend your free time?",
    options: [
      { text: "Sleeping", animal: "cat" },
      { text: "Playing with toys", animal: "dog" },
      { text: "Exploring", animal: "fox" },
      { text: "Chewing", animal: "hamster" },
      { text: "Galloping", animal: "horse" },
    ],
  },
  {
    question: "What is your favorite sound?",
    options: [
      { text: "Purr", animal: "cat" },
      { text: "Bark", animal: "dog" },
      { text: "Howl", animal: "fox" },
      { text: "Squeak", animal: "hamster" },
      { text: "Neigh", animal: "horse" },
    ],
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({
    cat: 0,
    dog: 0,
    fox: 0,
    hamster: 0,
    horse: 0,
  });
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (animal: string) => {
    setScores((prev) => ({ ...prev, [animal]: prev[animal] + 1 }));
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  const retake = () => {
    setCurrent(0);
    setScores({
      cat: 0,
      dog: 0,
      fox: 0,
      hamster: 0,
      horse: 0,
    });
    setShowResult(false);
  };

  if (showResult) {
    return <Result scores={scores} onRetake={retake} />;
  }

  const q = questions[current];
  const shuffledOptions = shuffleArray(q.options);

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl">{q.question}</h2>
      <div className="flex flex-col gap-2">
        {shuffledOptions.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(opt.animal)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded"
          >
            {opt.text}
          </button>
        ))}
      </div>
    </div>
  );
}
