"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Pencil, Trash2, CheckCircle } from "lucide-react";

interface FutureLaunch {
  id: string;
  name: string;
  description: string | null;
  quarter: string | null;
  icon: string | null;
  sortOrder: number;
  isActive: boolean;
}

export default function LaunchesPage() {
  const [launches, setLaunches] = useState<FutureLaunch[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", quarter: "", icon: "🚀" });

  useEffect(() => {
    fetch("/api/cms/launches").then((r) => r.json()).then((data) => { setLaunches(data); setLoading(false); });
  }, []);

  async function handleAdd() {
    const res = await fetch("/api/cms/launches", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, sortOrder: launches.length }),
    });
    const data = await res.json();
    setLaunches([...launches, { ...form, id: data.id, sortOrder: launches.length, isActive: true, description: form.description || null, quarter: form.quarter || null }]);
    setForm({ name: "", description: "", quarter: "", icon: "🚀" });
    setShowNew(false);
  }

  async function handleUpdate(id: string) {
    await fetch(`/api/cms/launches/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setLaunches(launches.map((l) => l.id === id ? { ...l, ...form } : l));
    setEditing(null);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this launch?")) return;
    await fetch(`/api/cms/launches/${id}`, { method: "DELETE" });
    setLaunches(launches.filter((l) => l.id !== id));
  }

  function startEdit(l: FutureLaunch) {
    setEditing(l.id);
    setForm({ name: l.name, description: l.description || "", quarter: l.quarter || "", icon: l.icon || "🚀" });
  }

  if (loading) return <div className="text-brand-400 p-8">Loading...</div>;

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-brand-900">Future Launches</h1>
          <p className="text-brand-500 mt-1">Manage upcoming products ({launches.length} items)</p>
        </div>
        <Button onClick={() => setShowNew(true)} className="bg-gradient-to-r from-brand-700 to-brand-800 hover:from-brand-800 hover:to-brand-900 text-white">
          <Plus className="h-4 w-4 mr-2" /> Add Launch
        </Button>
      </div>

      {saved && (
        <div className="mb-4 flex items-center gap-2 text-green-600 bg-green-50 rounded-xl px-4 py-2 text-sm">
          <CheckCircle className="h-4 w-4" /> Saved successfully
        </div>
      )}

      {showNew && (
        <div className="bg-white rounded-2xl border border-brand-100 p-6 mb-6">
          <h3 className="font-semibold text-brand-800 mb-4">New Future Launch</h3>
          <div className="space-y-3">
            <Input placeholder="Product name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="Quarter (e.g. Q3 2026)" value={form.quarter} onChange={(e) => setForm({ ...form, quarter: e.target.value })} />
              <Input placeholder="Emoji icon (e.g. 🚀)" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAdd} disabled={!form.name} className="bg-brand-700 hover:bg-brand-800 text-white">Add Launch</Button>
              <Button variant="outline" onClick={() => setShowNew(false)}>Cancel</Button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {launches.map((launch, i) => (
          <div key={launch.id} className="bg-white rounded-2xl border border-brand-100 p-4">
            {editing === launch.id ? (
              <div className="space-y-3">
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
                <div className="grid grid-cols-2 gap-3">
                  <Input value={form.quarter} onChange={(e) => setForm({ ...form, quarter: e.target.value })} />
                  <Input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} />
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => handleUpdate(launch.id)} className="bg-brand-700 hover:bg-brand-800 text-white text-sm">Save</Button>
                  <Button variant="outline" onClick={() => setEditing(null)} className="text-sm">Cancel</Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <div className="text-3xl shrink-0">{launch.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-brand-900">{launch.name}</p>
                    {launch.quarter && (
                      <span className="bg-brand-100 text-brand-600 text-xs font-medium px-2 py-0.5 rounded-full">{launch.quarter}</span>
                    )}
                  </div>
                  <p className="text-sm text-brand-500 mt-0.5 line-clamp-2">{launch.description}</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button variant="outline" size="sm" onClick={() => startEdit(launch)}><Pencil className="h-3.5 w-3.5" /></Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(launch.id)} className="text-red-500 hover:text-red-600 hover:bg-red-50"><Trash2 className="h-3.5 w-3.5" /></Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
