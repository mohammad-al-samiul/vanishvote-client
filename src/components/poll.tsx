/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

export interface PollProps {
  pollData: Poll;
}

export interface Poll {
  question: string;
  options: string[];
}

export const Poll = ({ pollData }: PollProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState<boolean>(false);

  const handleVote = (option: string): void => {
    setSelectedOption(option);
    setHasVoted(true);
  };
  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl mb-4">{pollData.question}</h2>
      <div className="mb-4">
        {pollData.options.map((option: any, index: any) => (
          <button
            key={index}
            onClick={() => handleVote(option)}
            className="w-full p-2 mb-2 bg-gray-200 rounded"
          >
            {option}
          </button>
        ))}
      </div>
      {hasVoted && <p className="text-green-500">You have voted!</p>}
    </div>
  );
};
