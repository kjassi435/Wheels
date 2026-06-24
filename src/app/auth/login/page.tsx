"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const result = await signIn("credentials", {
      email: form.get("email"),
      password: form.get("password"),
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else {
      router.push("/");
      router.refresh();
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
          <h1 className="text-3xl font-display font-bold text-brand-900">Welcome back</h1>
          <p className="text-brand-500 mt-1">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl border border-brand-100 bg-white p-8 shadow-xl space-y-5">
          {error && (
            <div className="rounded-xl bg-red-50 border border-red-100 p-4 text-sm text-red-600">
              {error}
            </div>
          )}
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
              placeholder="Enter your password"
              className="border-brand-200 focus:border-brand-400 focus:ring-brand-300 rounded-xl"
            />
          </div>
          <Button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white shadow-lg shadow-brand-600/25 py-3 h-auto"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
          <p className="text-center text-sm text-brand-500">
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="text-brand-600 hover:text-brand-700 font-semibold">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
