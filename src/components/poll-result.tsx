import { PollOption } from "../types";

interface PollResultsProps {
  option: PollOption;
  totalVotes: number;
}

export function PollResults({ option, totalVotes }: PollResultsProps) {
  const getVotePercentage = (votes: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((votes / total) * 100);
  };

  return (
    <div className="bg-gray-700 rounded p-3">
      <div className="flex justify-between mb-1">
        <span>{option.text}</span>
        <span>{getVotePercentage(option.votes, totalVotes)}%</span>
      </div>
      <div className="w-full bg-gray-600 rounded-full h-2">
        <div
          className="bg-blue-500 rounded-full h-2"
          style={{
            width: `${getVotePercentage(option.votes, totalVotes)}%`,
          }}
        />
      </div>
      <div className="text-sm text-gray-400 mt-1">{option.votes} votes</div>
    </div>
  );
}
