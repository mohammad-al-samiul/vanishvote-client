// Poll Option interface: to match the poll options
export interface IPollOption {
  text: string;
  votes: number;
}

// Poll interface: to represent the entire poll
export interface IPoll {
  _id: string; // poll ID as a string (in frontend, we use string)
  question: string;
  options: IPollOption[]; // Array of poll options
  expiresAt: string; // ISO date string (expiresAt will be a string, not a Date object in frontend)
  private: boolean; // Boolean for privacy
  createdAt: string; // ISO date string (createdAt will be a string, not a Date object in frontend)
}

// CreatePollDTO: used for creating a new poll
export interface ICreatePollDTO {
  question: string;
  options: { text: string }[]; // Options as an array of text strings
  expiresIn: number; // Expiry in hours or minutes (number)
  privatePoll: boolean; // Whether the poll is private or not
}

// Vote interface: used to represent a user's vote in the poll
export interface IVote {
  pollId: string; // pollId will be a string in frontend
  votedOption: string; // The selected option by the user
  createdAt: string; // Date when the vote was created (ISO string format)
}
