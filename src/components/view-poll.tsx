import { BarChart3Icon, FlameIcon, ThumbsUpIcon } from "lucide-react";
import { Poll } from "../types";
import { useTheme } from "../context/theme-context";
import { PollResults } from "./poll-result";
import { SharePoll } from "./share-poll";
import { Comments } from "./comments";

interface ViewPollProps {
  poll: Poll;
  showResults: boolean;
  setShowResults: (show: boolean) => void;
  onVote: (optionId: number) => void;
  onAddComment: (text: string) => void;
  onReact: (type: "🔥" | "👍") => void;
}

export function ViewPoll({
  poll,
  showResults,
  setShowResults,
  onVote,
  onAddComment,
  onReact,
}: ViewPollProps) {
  const { isDark } = useTheme();
  const isExpired = Date.now() > poll.expiresAt;
  const shouldShowResults = showResults || isExpired || !poll.hideResults;

  const timeLeft = () => {
    const diff = poll.expiresAt - Date.now();
    if (diff <= 0) return "Expired";
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m remaining`;
  };

  return (
    <div
      className={`max-w-2xl mx-auto ${
        isDark ? "bg-gray-800" : "bg-white"
      } rounded-lg p-6 shadow-xl`}
    >
      <div className="flex justify-between items-start mb-4">
        <h2
          className={`text-xl font-semibold ${
            isDark ? "text-white" : "text-gray-800"
          }`}
        >
          {poll.question}
        </h2>
        <span
          className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
        >
          {timeLeft()}
        </span>
      </div>

      <div className="space-y-3">
        {poll.options.map((option) => (
          <div key={option.id} className="w-full">
            {shouldShowResults ? (
              <PollResults option={option} totalVotes={poll.totalVotes} />
            ) : (
              <button
                onClick={() => !isExpired && onVote(option.id)}
                disabled={isExpired}
                className={`w-full text-left ${
                  isDark
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-100 hover:bg-gray-200"
                } rounded p-3 ${
                  isExpired ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {option.text}
              </button>
            )}
          </div>
        ))}
      </div>

      {!shouldShowResults && !isExpired && (
        <button
          onClick={() => setShowResults(true)}
          className="mt-4 flex items-center text-blue-400 hover:text-blue-300"
        >
          <BarChart3Icon className="h-4 w-4 mr-1" />
          Show Results
        </button>
      )}

      <div className="mt-6 flex items-center justify-between">
        <div
          className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
        >
          Total votes: {poll.totalVotes}
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => onReact("🔥")}
            className="flex items-center space-x-1 text-orange-500 hover:text-orange-400"
          >
            <FlameIcon className="h-5 w-5" />
            <span>{poll.reactions.fire}</span>
          </button>
          <button
            onClick={() => onReact("👍")}
            className="flex items-center space-x-1 text-blue-500 hover:text-blue-400"
          >
            <ThumbsUpIcon className="h-5 w-5" />
            <span>{poll.reactions.like}</span>
          </button>
        </div>
      </div>

      <SharePoll pollId={poll.id} />

      <Comments comments={poll.comments} onAddComment={onAddComment} />
    </div>
  );
}
