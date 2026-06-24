"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  productId: string;
  productName: string;
}

export default function InquiryForm({ productId, productName }: Props) {
  const { data: session } = useSession();
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const body = {
      name: form.get("name"),
      email: form.get("email"),
      phone: form.get("phone"),
      address: form.get("address"),
      service: form.get("service"),
      productId,
      notes: form.get("notes"),
    };

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setSuccess(true);
        setShowForm(false);
      } else if (res.status === 401) {
        router.push("/auth/login");
      } else {
        const data = await res.json();
        setError(data.error || "Failed to submit inquiry");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="flex-1 rounded-xl bg-green-50 border border-green-200 p-4 text-center">
        <p className="font-semibold text-green-700">Inquiry Submitted!</p>
        <p className="text-sm text-green-600 mt-1">We'll get back to you shortly.</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex-1 flex gap-3">
        <button
          onClick={() => router.push("/auth/login")}
          className="flex-1 rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 px-6 py-3.5 text-sm font-semibold text-white hover:from-brand-700 hover:to-brand-800 transition-all shadow-lg shadow-brand-600/25"
        >
          Sign in to Enquire
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1">
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="w-full rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 px-6 py-3.5 text-sm font-semibold text-white hover:from-brand-700 hover:to-brand-800 transition-all shadow-lg shadow-brand-600/25"
        >
          Enquire Now
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3 rounded-2xl border border-brand-100 bg-white p-5 shadow-lg">
          <h3 className="font-display font-semibold text-brand-900">Send Inquiry for {productName}</h3>
          <Input name="name" defaultValue={session.user?.name || ""} placeholder="Your Name" required />
          <Input name="email" defaultValue={session.user?.email || ""} type="email" placeholder="Email" required />
          <Input name="phone" placeholder="Mobile Number" required />
          <Textarea name="address" placeholder="Your Address" required />
          <Input name="service" placeholder="What service do you need?" required />
          <Textarea name="notes" placeholder="Additional notes (optional)" />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex gap-2">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Submitting..." : "Submit Inquiry"}
            </Button>
            <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
