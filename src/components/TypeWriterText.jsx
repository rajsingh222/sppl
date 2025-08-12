import React, { useState, useEffect } from "react";
import "./Typewriter.css";

export default function TypewriterText({ text, speed = 70 }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index === text.length) {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return <span className="typewriter">{displayedText}</span>;
}
