import { VoteIcon } from "lucide-react";

export function Header() {
  return (
    <header className="bg-gray-800 p-4 shadow-lg">
      <div className="container mx-auto flex items-center">
        <VoteIcon className="h-8 w-8 text-blue-500 mr-2" />
        <h1 className="text-2xl font-bold">SimplePoll</h1>
      </div>
    </header>
  );
}
