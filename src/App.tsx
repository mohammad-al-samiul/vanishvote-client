import { useState } from "react";
import { Poll } from "./types";
import { ThemeProvider } from "./context/theme-context";
import { Header } from "./components/header";
import { CreatePoll } from "./components/create-poll";
import { ViewPoll } from "./components/view-poll";

function App() {
  const [showResults, setShowResults] = useState(false);
  const [newPoll, setNewPoll] = useState<Poll>({
    id: crypto.randomUUID(),
    question: "",
    options: [
      { id: 1, text: "", votes: 0 },
      { id: 2, text: "", votes: 0 },
    ],
    totalVotes: 0,
    comments: [],
    expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours by default
    isPrivate: false,
    hideResults: false,
    reactions: {
      fire: 0,
      like: 0,
    },
    created: Date.now(),
  });

  const [currentPoll, setCurrentPoll] = useState<Poll | null>(null);
  const [isCreating, setIsCreating] = useState(true);

  const handleCreatePoll = () => {
    if (newPoll.question.trim() === "") {
      alert("Please enter a question");
      return;
    }
    if (newPoll.options.some((opt) => opt.text.trim() === "")) {
      alert("Please fill in all options");
      return;
    }
    setCurrentPoll(newPoll);
    setIsCreating(false);
  };

  const handleVote = (optionId: number) => {
    if (!currentPoll || Date.now() > currentPoll.expiresAt) return;

    setCurrentPoll((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        totalVotes: prev.totalVotes + 1,
        options: prev.options.map((opt) =>
          opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
        ),
      };
    });
    setShowResults(true);
  };

  const handleAddComment = (text: string) => {
    if (!currentPoll) return;

    setCurrentPoll((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        comments: [
          ...prev.comments,
          { id: crypto.randomUUID(), text, timestamp: Date.now() },
        ],
      };
    });
  };

  const handleReact = (type: "🔥" | "👍") => {
    if (!currentPoll) return;

    setCurrentPoll((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        reactions: {
          ...prev.reactions,
          [type === "🔥" ? "fire" : "like"]:
            prev.reactions[type === "🔥" ? "fire" : "like"] + 1,
        },
      };
    });
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-900 text-white transition-colors duration-200 dark:bg-gray-900 dark:text-white light:bg-gray-100 light:text-gray-900">
        <Header />

        <main className="container mx-auto px-4 py-8">
          {isCreating ? (
            <CreatePoll
              newPoll={newPoll}
              setNewPoll={setNewPoll}
              onCreatePoll={handleCreatePoll}
            />
          ) : currentPoll ? (
            <ViewPoll
              poll={currentPoll}
              showResults={showResults}
              setShowResults={setShowResults}
              onVote={handleVote}
              onAddComment={handleAddComment}
              onReact={handleReact}
            />
          ) : null}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
