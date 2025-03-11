// PollForm.tsx
import { useState, FormEvent, ChangeEvent } from "react";

interface PollOption {
  text: string;
  votes: number;
}

interface PollFormProps {
  onCreatePoll: (poll: {
    question: string;
    options: PollOption[];
    expiresIn: number;
    privatePoll: boolean;
  }) => void;
}

const PollForm: React.FC<PollFormProps> = ({ onCreatePoll }) => {
  const [question, setQuestion] = useState<string>("");
  const [options, setOptions] = useState<string[]>(["", ""]);
  const [expiresIn, setExpiresIn] = useState<number>(1); // Default: 1 hour
  const [privatePoll, setPrivatePoll] = useState<boolean>(false);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (question && options.every((option) => option !== "")) {
      const poll = {
        question,
        options: options.map((text) => ({ text, votes: 0 })),
        expiresIn,
        privatePoll,
      };
      onCreatePoll(poll);
      setQuestion("");
      setOptions(["", ""]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <input
        type="text"
        value={question}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setQuestion(e.target.value)
        }
        placeholder="Enter your question"
        className="w-full p-2 mb-4 border rounded"
      />
      {options.map((option, index) => (
        <input
          key={index}
          type="text"
          value={option}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleOptionChange(index, e.target.value)
          }
          placeholder={`Option ${index + 1}`}
          className="w-full p-2 mb-2 border rounded"
        />
      ))}
      <button
        type="button"
        onClick={handleAddOption}
        className="w-full p-2 mb-4 bg-blue-500 text-white rounded"
      >
        Add Option
      </button>
      <select
        value={expiresIn}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          setExpiresIn(Number(e.target.value))
        }
        className="w-full p-2 mb-4 border rounded"
      >
        <option value={1}>1 Hour</option>
        <option value={12}>12 Hours</option>
        <option value={24}>24 Hours</option>
      </select>
      <label className="block mb-4">
        <input
          type="checkbox"
          checked={privatePoll}
          onChange={() => setPrivatePoll(!privatePoll)}
        />{" "}
        Private Poll (Only accessible via link)
      </label>
      <button
        type="submit"
        className="w-full p-2 bg-green-500 text-white rounded"
      >
        Create Poll
      </button>
    </form>
  );
};

export default PollForm;
