'use client';
import { Share } from "@/components/share";
import { url } from "@/lib/metadata";

export default function Result({ scores, onRetake }) {
  const animals = ["cat", "dog", "fox", "hamster", "horse"];
  const topAnimal = animals.reduce((a, b) => (scores[a] > scores[b] ? a : b));
  const imageSrc = `/${topAnimal}.png`;
  const description = `You are most like a ${topAnimal}!`;
  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl">{description}</h2>
      <img
        src={imageSrc}
        alt={topAnimal}
        width={512}
        height={512}
        className="size-[512px]"
      />
      <Share text={`I am most like a ${topAnimal}! ${url}`} />
      <button
        onClick={onRetake}
        className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded"
      >
        Retake Quiz
      </button>
    </div>
  );
}
