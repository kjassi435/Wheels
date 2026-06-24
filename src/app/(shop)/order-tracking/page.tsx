"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Package, Truck, CheckCircle, Clock } from "lucide-react";

const statusSteps = [
  { key: "pending", label: "Order Placed", icon: Package },
  { key: "confirmed", label: "Confirmed", icon: Clock },
  { key: "processing", label: "Processing", icon: Clock },
  { key: "shipped", label: "Shipped", icon: Truck },
  { key: "delivered", label: "Delivered", icon: CheckCircle },
];

export default function OrderTrackingPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [tracking, setTracking] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function handleTrack(e: React.FormEvent) {
    e.preventDefault();
    if (!orderNumber.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/orders?orderNumber=${orderNumber}`);
      if (res.ok) {
        const data = await res.json();
        setTracking(data);
      } else {
        setTracking({ notFound: true });
      }
    } catch {
      setTracking({ notFound: true });
    } finally {
      setLoading(false);
    }
  }

  const currentStatusIndex = tracking?.status
    ? statusSteps.findIndex((s) => s.key === tracking.status)
    : -1;

  return (
    <div className="pt-28 pb-20 bg-cream-50 min-h-screen">
      <div className="max-w-2xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-sm font-semibold tracking-[0.2em] uppercase text-brand-400">
            Tracking
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-900 mt-4 leading-tight">
            Track Your Order
          </h1>
          <div className="divider mx-auto mt-6" />
          <p className="text-brand-500 mt-6">
            Enter your order number to check the status
          </p>
        </div>

        <form onSubmit={handleTrack} className="flex gap-3 mb-8">
          <Input
            placeholder="e.g., WOW-001"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            className="h-12 rounded-2xl border-brand-200 focus:border-brand-400 text-brand-800 placeholder:text-brand-400 shadow-sm"
          />
          <Button
            type="submit"
            disabled={loading}
            className="h-12 px-6 rounded-2xl bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white shadow-lg gap-2"
          >
            <Search className="h-4 w-4" />
            {loading ? "..." : "Track"}
          </Button>
        </form>

        {tracking?.notFound && (
          <div className="text-center py-10 rounded-2xl bg-red-50 border border-red-100">
            <p className="text-red-600 font-semibold">Order not found</p>
            <p className="text-sm text-red-500 mt-1">Please check your order number and try again</p>
          </div>
        )}

        {tracking && !tracking.notFound && (
          <div className="card-3d rounded-2xl border border-brand-100 bg-white p-8 lg:p-10 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-xs font-semibold tracking-wider uppercase text-brand-400 mb-1">
                  Order Number
                </p>
                <h3 className="text-2xl font-display font-bold text-brand-900">
                  #{tracking.orderNumber}
                </h3>
              </div>
              <span
                className={`px-4 py-1.5 rounded-full text-xs font-semibold ${
                  tracking.status === "delivered"
                    ? "bg-green-100 text-green-700"
                    : tracking.status === "cancelled"
                    ? "bg-red-100 text-red-700"
                    : "bg-brand-100 text-brand-700"
                }`}
              >
                {tracking.status}
              </span>
            </div>

            <div className="relative">
              {statusSteps.map((step, index) => {
                const Icon = step.icon;
                const isActive = index <= currentStatusIndex;
                const isLast = index === statusSteps.length - 1;

                return (
                  <div key={step.key} className="flex items-start gap-5 pb-8 relative">
                    {!isLast && (
                      <div
                        className={`absolute left-4 top-10 w-0.5 h-full -z-10 ${
                          isActive ? "bg-brand-400" : "bg-brand-100"
                        }`}
                      />
                    )}
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full shrink-0 ${
                        isActive
                          ? "bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-md"
                          : "bg-brand-100 text-brand-300"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="pt-1">
                      <p
                        className={`font-medium ${
                          isActive ? "text-brand-900" : "text-brand-300"
                        }`}
                      >
                        {step.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
