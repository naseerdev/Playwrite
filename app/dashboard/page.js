"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, logout } from "../lib/auth";

const MESSAGES = [
  "The best way to predict the future is to invent it.",
  "Simplicity is the ultimate sophistication.",
  "Code is like humor. When you have to explain it, it's bad.",
  "First, solve the problem. Then, write the code.",
  "Make it work, make it right, make it fast.",
  "Talk is cheap. Show me the code.",
  "Programs must be written for people to read.",
];

export default function DashboardPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/login");
      return;
    }
    const random = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
    setMessage(random);
    setReady(true);
  }, [router]);

  function handleLogout() {
    logout();
    router.replace("/login");
  }

  if (!ready) return null;

  return (
    <div className="center">
      <div className="card dashboard">
        <div className="topbar">
          <h1 data-testid="dashboard-title">Dashboard</h1>
          <button className="ghost" onClick={handleLogout} data-testid="logout-button">
            Log out
          </button>
        </div>
        <p className="subtitle">You are signed in. Here is something to think about:</p>
        <blockquote className="quote" data-testid="random-text">
          {message}
        </blockquote>
      </div>
    </div>
  );
}
