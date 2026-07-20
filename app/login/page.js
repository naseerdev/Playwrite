"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, DUMMY_EMAIL, DUMMY_PASSWORD } from "../lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (login(email, password)) {
      router.push("/dashboard");
    } else {
      setError("Invalid email or password. Please try again.");
    }
  }

  return (
    <div className="center">
      <form className="card" onSubmit={handleSubmit}>
        <h1>Welcome back</h1>
        <p className="subtitle">Sign in to your account</p>

        {error && (
          <div className="error" role="alert" data-testid="error-message">
            {error}
          </div>
        )}

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="primary" type="submit">
          Sign in
        </button>

        <p className="hint">
          Demo credentials: {DUMMY_EMAIL} / {DUMMY_PASSWORD}
        </p>
      </form>
    </div>
  );
}
