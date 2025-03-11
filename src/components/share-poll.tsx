import { useState } from "react";
import { Share2Icon, CheckIcon } from "lucide-react";

interface SharePollProps {
  pollId: string;
}

export function SharePoll({ pollId }: SharePollProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = `${window.location.origin}/poll/${pollId}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="mt-6">
      <button
        onClick={handleCopyLink}
        className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 rounded px-4 py-2 text-sm"
      >
        {copied ? (
          <>
            <CheckIcon className="h-4 w-4 text-green-500" />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <Share2Icon className="h-4 w-4" />
            <span>Share Poll</span>
          </>
        )}
      </button>
    </div>
  );
}
