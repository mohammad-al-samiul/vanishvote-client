import React, { useState } from "react";
import { Comment } from "../types";

interface CommentsProps {
  comments: Comment[];
  onAddComment: (text: string) => void;
}

export function Comments({ comments, onAddComment }: CommentsProps) {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment("");
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">Comments</h3>

      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full bg-gray-700 rounded p-3 text-white min-h-[100px]"
          placeholder="Add your comment..."
        />
        <button
          type="submit"
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Add Comment
        </button>
      </form>

      <div className="space-y-4">
        {comments.map((comment, index) => (
          <div key={index} className="bg-gray-700 rounded p-4">
            <div className="text-gray-300 mb-2">Anonymous User</div>
            <div>{comment.text}</div>
            <div className="text-sm text-gray-400 mt-2">
              {new Date(comment.timestamp).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
