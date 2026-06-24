"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save, CheckCircle } from "lucide-react";

export default function SiteSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/cms/settings")
      .then((r) => r.json())
      .then((data) => { setSettings(data); setLoading(false); });
  }, []);

  function updateSetting(key: string, value: string) {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    setSaving(true);
    await fetch("/api/cms/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (loading) return <div className="text-brand-400 p-8">Loading...</div>;

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-brand-900">Site Settings</h1>
          <p className="text-brand-500 mt-1">Manage global website content</p>
        </div>
        <Button onClick={handleSave} disabled={saving} className="bg-gradient-to-r from-brand-700 to-brand-800 hover:from-brand-800 hover:to-brand-900 text-white">
          {saving ? "Saving..." : saved ? <><CheckCircle className="h-4 w-4 mr-2" /> Saved</> : <><Save className="h-4 w-4 mr-2" /> Save Changes</>}
        </Button>
      </div>

      <div className="space-y-6">
        {/* Contact Info */}
        <div className="bg-white rounded-2xl border border-brand-100 p-6">
          <h2 className="text-lg font-semibold text-brand-800 mb-4">Contact Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-1">Phone Number</label>
              <Input value={settings.company_phone || ""} onChange={(e) => updateSetting("company_phone", e.target.value)} placeholder="+91 98765 43210" />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-1">Email Address</label>
              <Input value={settings.company_email || ""} onChange={(e) => updateSetting("company_email", e.target.value)} placeholder="info@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-1">Address</label>
              <Textarea value={settings.company_address || ""} onChange={(e) => updateSetting("company_address", e.target.value)} rows={2} />
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white rounded-2xl border border-brand-100 p-6">
          <h2 className="text-lg font-semibold text-brand-800 mb-4">Social Media Links</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-1">Instagram URL</label>
              <Input value={settings.social_instagram || ""} onChange={(e) => updateSetting("social_instagram", e.target.value)} placeholder="https://instagram.com/..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-1">YouTube URL</label>
              <Input value={settings.social_youtube || ""} onChange={(e) => updateSetting("social_youtube", e.target.value)} placeholder="https://youtube.com/..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-1">Facebook URL</label>
              <Input value={settings.social_facebook || ""} onChange={(e) => updateSetting("social_facebook", e.target.value)} placeholder="https://facebook.com/..." />
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-white rounded-2xl border border-brand-100 p-6">
          <h2 className="text-lg font-semibold text-brand-800 mb-4">Hero Section</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-1">Hero Title</label>
              <Input value={settings.hero_title || ""} onChange={(e) => updateSetting("hero_title", e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-1">Hero Subtitle</label>
              <Textarea value={settings.hero_subtitle || ""} onChange={(e) => updateSetting("hero_subtitle", e.target.value)} rows={2} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
