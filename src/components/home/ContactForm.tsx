"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Send, CheckCircle } from "lucide-react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({ phone: "+916376671590", email: "info@welcomeonwheels.com", address: "61, Mithila Vihar, Jaipur, Rajasthan" });

  useEffect(() => {
    fetch("/api/cms/settings")
      .then((r) => r.json())
      .then((data) => {
        setSettings({
          phone: data.company_phone || "+916376671590",
          email: data.company_email || "info@welcomeonwheels.com",
          address: data.company_address || "61, Mithila Vihar, Jaipur, Rajasthan",
        });
      })
      .catch(() => {});
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          phone: form.get("phone"),
          message: form.get("message"),
        }),
      });
      if (res.ok) setSubmitted(true);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <section className="py-24 lg:py-32 bg-cream-50">
        <div className="max-w-lg mx-auto px-6 text-center">
          <div className="rounded-3xl bg-white border border-brand-100 p-12 shadow-xl">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-5" />
            <h3 className="text-2xl font-display font-bold text-brand-900 mb-2">Thank You!</h3>
            <p className="text-brand-500">
              We&apos;ve received your message. Our team will reach out within 24 hours.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="space-y-8">
            <span className="text-sm font-semibold tracking-[0.2em] uppercase text-brand-400">
              Get in Touch
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-900 leading-tight">
              Let&apos;s Build<br />Your Dream<br />
              <span className="gradient-text">Business</span>
            </h2>
            <p className="text-lg text-brand-600/80 leading-relaxed">
              Ready to start your mobile business journey? Fill out the form and our
              team will reach out to you within 24 hours.
            </p>

            <div className="space-y-5 pt-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-100 to-brand-50">
                  <Phone className="h-5 w-5 text-brand-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-wider uppercase text-brand-400">Phone</p>
                  <a href={`tel:${settings.phone}`} className="font-medium text-brand-800 hover:text-brand-600 transition-colors">
                    {settings.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-100 to-brand-50">
                  <Mail className="h-5 w-5 text-brand-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-wider uppercase text-brand-400">Email</p>
                  <a href={`mailto:${settings.email}`} className="font-medium text-brand-800 hover:text-brand-600 transition-colors">
                    {settings.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-100 to-brand-50 shrink-0">
                  <MapPin className="h-5 w-5 text-brand-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-wider uppercase text-brand-400">Address</p>
                  <p className="font-medium text-brand-800 text-sm leading-relaxed">
                    {settings.address}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-cream-50 to-white border border-brand-100 p-8 lg:p-10 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-brand-700 mb-1.5">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <Input
                  id="name"
                  name="name"
                  required
                  placeholder="Your full name"
                  className="border-brand-200 focus:border-brand-400 focus:ring-brand-300 rounded-xl"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-brand-700 mb-1.5">
                  Email <span className="text-red-400">*</span>
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
                <label htmlFor="phone" className="block text-sm font-medium text-brand-700 mb-1.5">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  className="border-brand-200 focus:border-brand-400 focus:ring-brand-300 rounded-xl"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-brand-700 mb-1.5">
                  Message <span className="text-red-400">*</span>
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Tell us about your requirements..."
                  rows={4}
                  className="border-brand-200 focus:border-brand-400 focus:ring-brand-300 rounded-xl"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white shadow-lg shadow-brand-600/25 py-3.5 h-auto gap-2"
              >
                {loading ? "Sending..." : "Send Message"}
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
