// Poll.tsx
import { useState } from "react";

interface PollOption {
  text: string;
  votes: number;
}

interface PollProps {
  pollData: { question: string; options: PollOption[] };
  onVote: (option: string) => void;
}

const Poll: React.FC<PollProps> = ({ pollData, onVote }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleVote = (option: string) => {
    setSelectedOption(option);
    onVote(option);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl mb-4">{pollData.question}</h2>
      {pollData.options.map((option, index) => (
        <button
          key={index}
          onClick={() => handleVote(option.text)}
          className="w-full p-2 mb-2 bg-gray-200 rounded"
        >
          {option.text}
        </button>
      ))}
      {selectedOption && (
        <p className="text-green-500">You voted for: {selectedOption}</p>
      )}
    </div>
  );
};

export default Poll;
