export interface PollOption {
  id: number;
  text: string;
  votes: number;
}

export interface Comment {
  id: string;
  text: string;
  timestamp: number;
}

export interface Reaction {
  type: "🔥" | "👍";
  count: number;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
  comments: Comment[];
  expiresAt: number;
  isPrivate: boolean;
  hideResults: boolean;
  reactions: {
    fire: number;
    like: number;
  };
  created: number;
}

export type ExpiryOption = "1h" | "12h" | "24h";

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}
