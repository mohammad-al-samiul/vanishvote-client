import { useState } from "react";
import { PlusIcon, LockIcon, EyeOffIcon } from "lucide-react";
import { Poll, ExpiryOption } from "../types";
import { useTheme } from "../context/theme-context";

interface CreatePollProps {
  newPoll: Poll;
  setNewPoll: (poll: Poll) => void;
  onCreatePoll: () => void;
}

export function CreatePoll({
  newPoll,
  setNewPoll,
  onCreatePoll,
}: CreatePollProps) {
  const { isDark } = useTheme();
  const [expiryTime, setExpiryTime] = useState<ExpiryOption>("24h");

  const handleAddOption = () => {
    setNewPoll({
      ...newPoll,
      options: [
        ...newPoll.options,
        { id: newPoll.options.length + 1, text: "", votes: 0 },
      ],
    });
  };

  const handleOptionChange = (id: number, value: string) => {
    setNewPoll({
      ...newPoll,
      options: newPoll.options.map((opt) =>
        opt.id === id ? { ...opt, text: value } : opt
      ),
    });
  };

  const handleExpiryChange = (value: ExpiryOption) => {
    const hours = parseInt(value);
    const expiryTime = Date.now() + hours * 60 * 60 * 1000;
    setExpiryTime(value);
    setNewPoll({ ...newPoll, expiresAt: expiryTime });
  };

  return (
    <div
      className={`max-w-2xl mx-auto ${
        isDark ? "bg-gray-800" : "bg-white"
      } rounded-lg p-6 shadow-xl`}
    >
      <h2
        className={`text-xl font-semibold mb-4 ${
          isDark ? "text-white" : "text-gray-800"
        }`}
      >
        Create a New Poll
      </h2>
      <div className="space-y-4">
        <div>
          <label
            className={`block text-sm font-medium mb-2 ${
              isDark ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Question
          </label>
          <input
            type="text"
            value={newPoll.question}
            onChange={(e) =>
              setNewPoll({ ...newPoll, question: e.target.value })
            }
            className={`w-full ${
              isDark ? "bg-gray-700 text-white" : "bg-gray-50 text-gray-900"
            } rounded p-2`}
            placeholder="Enter your question"
          />
        </div>

        <div>
          <label
            className={`block text-sm font-medium mb-2 ${
              isDark ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Options
          </label>
          {newPoll.options.map((option) => (
            <input
              key={option.id}
              type="text"
              value={option.text}
              onChange={(e) => handleOptionChange(option.id, e.target.value)}
              className={`w-full ${
                isDark ? "bg-gray-700 text-white" : "bg-gray-50 text-gray-900"
              } rounded p-2 mb-2`}
              placeholder={`Option ${option.id}`}
            />
          ))}
          <button
            onClick={handleAddOption}
            className="flex items-center text-blue-400 hover:text-blue-300 mt-2"
          >
            <PlusIcon className="h-4 w-4 mr-1" />
            Add Option
          </button>
        </div>

        <div>
          <label
            className={`block text-sm font-medium mb-2 ${
              isDark ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Poll Settings
          </label>
          <div className="space-y-3">
            <div>
              <select
                value={expiryTime}
                onChange={(e) =>
                  handleExpiryChange(e.target.value as ExpiryOption)
                }
                className={`w-full ${
                  isDark ? "bg-gray-700 text-white" : "bg-gray-50 text-gray-900"
                } rounded p-2`}
              >
                <option value="1h">Expires in 1 hour</option>
                <option value="12h">Expires in 12 hours</option>
                <option value="24h">Expires in 24 hours</option>
              </select>
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={newPoll.isPrivate}
                  onChange={(e) =>
                    setNewPoll({ ...newPoll, isPrivate: e.target.checked })
                  }
                  className="rounded"
                />
                <span className="flex items-center">
                  <LockIcon className="h-4 w-4 mr-1" />
                  Private Poll
                </span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={newPoll.hideResults}
                  onChange={(e) =>
                    setNewPoll({ ...newPoll, hideResults: e.target.checked })
                  }
                  className="rounded"
                />
                <span className="flex items-center">
                  <EyeOffIcon className="h-4 w-4 mr-1" />
                  Hide Results Until End
                </span>
              </label>
            </div>
          </div>
        </div>

        <button
          onClick={onCreatePoll}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Create Poll
        </button>
      </div>
    </div>
  );
}
