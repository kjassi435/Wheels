"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";

interface Product {
  id: string;
  name: string;
}

export default function InquiryPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then(setProducts);
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          phone: form.get("phone"),
          address: form.get("address"),
          service: form.get("service"),
          productId: form.get("productId") || null,
          notes: form.get("notes"),
        }),
      });

      if (res.ok) {
        setSuccess(true);
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

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-50 pt-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-600 border-t-transparent" />
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-50 pt-20">
        <div className="max-w-md text-center p-8">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-display font-bold text-brand-900 mb-2">Inquiry Submitted!</h1>
          <p className="text-brand-500 mb-6">Thank you for your inquiry. Our team will contact you shortly.</p>
          <Button onClick={() => router.push("/")}>Back to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 pt-28 pb-20">
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-900">Send an Inquiry</h1>
          <p className="text-lg text-brand-500 mt-3">
            Tell us what you need and we'll get back to you with the best solution.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-brand-100 bg-white p-8 shadow-xl">
          {error && (
            <div className="rounded-xl bg-red-50 border border-red-100 p-4 text-sm text-red-600">{error}</div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-brand-700 mb-1">Full Name *</label>
              <Input name="name" defaultValue={session?.user?.name || ""} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-1">Email *</label>
              <Input name="email" type="email" defaultValue={session?.user?.email || ""} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-1">Mobile Number *</label>
              <Input name="phone" type="tel" required />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-brand-700 mb-1">Address *</label>
              <Textarea name="address" required />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-brand-700 mb-1">What service do you need? *</label>
              <Input name="service" placeholder="e.g. Custom food cart, repair service, consultation..." required />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-brand-700 mb-1">Which cart are you interested in? (optional)</label>
              <Select name="productId">
                <option value="">Select a product...</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </Select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-brand-700 mb-1">Additional Notes (optional)</label>
              <Textarea name="notes" />
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full py-3 h-auto text-base">
            {loading ? "Submitting..." : "Submit Inquiry"}
          </Button>
        </form>
      </div>
    </div>
  );
}
