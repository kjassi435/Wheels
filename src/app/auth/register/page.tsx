"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const password = form.get("password") as string;
    const confirmPassword = form.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          password,
        }),
      });

      if (res.ok) {
        router.push("/auth/login");
      } else {
        const data = await res.json();
        setError(data.error || "Registration failed");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream-50 via-white to-cream-100 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-700 shadow-lg transition-transform group-hover:scale-105">
              <span className="text-xl font-bold text-white font-display">W</span>
            </div>
          </Link>
          <h1 className="text-3xl font-display font-bold text-brand-900">Create an account</h1>
          <p className="text-brand-500 mt-1">Join Welcome on Wheels today</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl border border-brand-100 bg-white p-8 shadow-xl space-y-5">
          {error && (
            <div className="rounded-xl bg-red-50 border border-red-100 p-4 text-sm text-red-600">
              {error}
            </div>
          )}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-brand-700 mb-1.5">
              Full Name
            </label>
            <Input
              id="name"
              name="name"
              required
              placeholder="Your name"
              className="border-brand-200 focus:border-brand-400 focus:ring-brand-300 rounded-xl"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-brand-700 mb-1.5">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="your@email.com"
              className="border-brand-200 focus:border-brand-400 focus:ring-brand-300 rounded-xl"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-brand-700 mb-1.5">
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Min 8 characters"
              minLength={8}
              className="border-brand-200 focus:border-brand-400 focus:ring-brand-300 rounded-xl"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-brand-700 mb-1.5">
              Confirm Password
            </label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              placeholder="Repeat your password"
              className="border-brand-200 focus:border-brand-400 focus:ring-brand-300 rounded-xl"
            />
          </div>
          <Button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white shadow-lg shadow-brand-600/25 py-3 h-auto"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create Account"}
          </Button>
          <p className="text-center text-sm text-brand-500">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-brand-600 hover:text-brand-700 font-semibold">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
