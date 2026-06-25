"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, CheckCircle, ImageOff, Plus } from "lucide-react";
import { getDirectImageUrl } from "@/lib/utils";

interface CartUpdate {
  id: string;
  imageUrl: string;
  title: string | null;
  linkUrl: string | null;
  sortOrder: number;
  isActive: boolean;
}

export default function CartUpdatesPage() {
  const [updates, setUpdates] = useState<CartUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({ imageUrl: "", title: "", linkUrl: "" });

  useEffect(() => {
    fetch("/api/cms/cart-updates")
      .then((r) => r.json())
      .then((data) => {
        setUpdates(data);
        setLoading(false);
      });
  }, []);

  async function handleCreate() {
    if (!form.imageUrl) return;
    const res = await fetch("/api/cms/cart-updates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, sortOrder: updates.length }),
    });
    const data = await res.json();
    if (data.id) {
      setUpdates([...updates, { id: data.id, ...form, sortOrder: updates.length, isActive: true, title: form.title || null, linkUrl: form.linkUrl || null }]);
      setCreating(false);
      setForm({ imageUrl: "", title: "", linkUrl: "" });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  }

  async function handleUpdate(id: string) {
    await fetch(`/api/cms/cart-updates/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setUpdates(updates.map((u) => (u.id === id ? { ...u, ...form } : u)));
    setEditing(null);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  async function handleDelete(id: string) {
    if (!confirm("Remove this image?")) return;
    await fetch(`/api/cms/cart-updates/${id}`, { method: "DELETE" });
    setUpdates(updates.filter((u) => u.id !== id));
  }

  function startEdit(update: CartUpdate) {
    setEditing(update.id);
    setCreating(false);
    setForm({
      imageUrl: update.imageUrl,
      title: update.title || "",
      linkUrl: update.linkUrl || "",
    });
  }

  function startCreate() {
    setCreating(true);
    setEditing(null);
    setForm({ imageUrl: "", title: "", linkUrl: "" });
  }

  if (loading) return <div className="text-brand-400 p-8">Loading...</div>;

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-brand-900">New Cart Updates</h1>
          <p className="text-brand-500 mt-1">Manage carousel images for the homepage ({updates.length} images)</p>
        </div>
        <Button onClick={startCreate} className="bg-brand-700 hover:bg-brand-800 text-white">
          <Plus className="h-4 w-4 mr-2" /> Add Image
        </Button>
      </div>

      {saved && (
        <div className="mb-4 flex items-center gap-2 text-green-600 bg-green-50 rounded-xl px-4 py-2 text-sm">
          <CheckCircle className="h-4 w-4" /> Saved successfully
        </div>
      )}

      {creating && (
        <div className="bg-white rounded-2xl border border-brand-100 p-4 mb-4">
          <h3 className="font-semibold text-brand-900 mb-3">Add New Image</h3>
          <div className="space-y-3">
            <Input
              placeholder="Image URL (Google Drive link)"
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            />
            {form.imageUrl && (
              <div className="w-40 h-52 rounded-xl overflow-hidden border">
                <img
                  src={getDirectImageUrl(form.imageUrl)}
                  alt=""
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            )}
            <Input
              placeholder="Link URL (optional - where image links to)"
              value={form.linkUrl}
              onChange={(e) => setForm({ ...form, linkUrl: e.target.value })}
            />
            <div className="flex gap-2">
              <Button onClick={handleCreate} className="bg-brand-700 hover:bg-brand-800 text-white text-sm">
                Create
              </Button>
              <Button variant="outline" onClick={() => setCreating(false)} className="text-sm">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {updates
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map((update) => (
            <div key={update.id} className="bg-white rounded-2xl border border-brand-100 overflow-hidden">
              {editing === update.id ? (
                <div className="p-3 space-y-2">
                  <Input
                    placeholder="Image URL"
                    value={form.imageUrl}
                    onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  />
                  {form.imageUrl && (
                    <div className="w-full h-40 rounded-lg overflow-hidden border">
                      <img
                        src={getDirectImageUrl(form.imageUrl)}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <Input
                    placeholder="Link URL (optional)"
                    value={form.linkUrl}
                    onChange={(e) => setForm({ ...form, linkUrl: e.target.value })}
                  />
                  <div className="flex gap-2">
                    <Button onClick={() => handleUpdate(update.id)} className="bg-brand-700 hover:bg-brand-800 text-white text-xs flex-1">
                      Save
                    </Button>
                    <Button variant="outline" onClick={() => setEditing(null)} className="text-xs flex-1">
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="aspect-[1080/1350] bg-brand-50 relative">
                    {update.imageUrl ? (
                      <img
                        src={getDirectImageUrl(update.imageUrl)}
                        alt={update.title || ""}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <ImageOff className="h-8 w-8 text-brand-300" />
                      </div>
                    )}
                  </div>
                  <div className="p-3 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => startEdit(update)}
                      className="flex-1 text-xs"
                    >
                      <Pencil className="h-3 w-3 mr-1" /> Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(update.id)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 text-xs"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
