"use client";
import React from "react";

export default function EmojiComponent({ text }: { text: string }) {
  const getEmoji = (text: string) => {
    switch (text.toLowerCase()) {
      case "complete":
        return "✔️";
      case "undo":
        return "❌";
      case "delete":
        return "🗑️";
      default:
        return "✔️";
    }
  };

  return <span>{getEmoji(text)}</span>;
}