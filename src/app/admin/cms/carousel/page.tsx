"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Trash2, CheckCircle, ImageOff } from "lucide-react";
import { getDirectImageUrl } from "@/lib/utils";

const categoryNames: Record<string, string> = {
  "food-carts": "Food Carts",
  "food-vans": "Food Vans",
  "electric-vehicle-carts": "EV Carts",
  "food-trailers": "Food Trailers",
  "motorbike-operated-carts": "Motorbike Carts",
  "kiosks": "Kiosks",
  "electric-tricycle-carts": "E-Tricycle",
  "ice-cream-carts": "Ice Cream Carts",
  "mobile-accessory-cart": "Mobile Accessory Cart",
  "cosmetic-cart": "Cosmetic Cart",
  "grocery-cart": "Grocery Cart",
  "garment-shop-cart": "Garment Cart",
  "footwear-cart": "Footwear Cart",
};

interface CarouselCard {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  linkUrl: string | null;
  sortOrder: number;
  isActive: boolean;
}

function getCategorySlug(linkUrl: string | null): string {
  return linkUrl?.split("category=")?.[1] || "";
}

export default function CarouselPage() {
  const [cards, setCards] = useState<CarouselCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", imageUrl: "", linkUrl: "" });

  useEffect(() => {
    fetch("/api/cms/carousel").then((r) => r.json()).then((data) => { setCards(data); setLoading(false); });
  }, []);

  async function handleCreate() {
    const res = await fetch("/api/cms/carousel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, sortOrder: cards.length }),
    });
    const data = await res.json();
    if (data.id) {
      setCards([...cards, { id: data.id, ...form, sortOrder: cards.length, isActive: true, description: form.description || null }]);
      setCreating(false);
      setForm({ title: "", description: "", imageUrl: "", linkUrl: "" });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  }

  function startCreate() {
    setCreating(true);
    setEditing(null);
    setForm({ title: "", description: "", imageUrl: "", linkUrl: "" });
  }

  async function handleUpdate(id: string) {
    await fetch(`/api/cms/carousel/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setCards(cards.map((c) => c.id === id ? { ...c, ...form } : c));
    setEditing(null);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  async function handleDelete(id: string) {
    if (!confirm("Remove this card?")) return;
    await fetch(`/api/cms/carousel/${id}`, { method: "DELETE" });
    setCards(cards.filter((c) => c.id !== id));
  }

  function startEdit(card: CarouselCard) {
    setEditing(card.id);
    setForm({ title: card.title, description: card.description || "", imageUrl: card.imageUrl || "", linkUrl: card.linkUrl || "" });
  }

  if (loading) return <div className="text-brand-400 p-8">Loading...</div>;

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-brand-900">Carousel Cards</h1>
          <p className="text-brand-500 mt-1">All {cards.length} product categories — add images for each</p>
        </div>
        <Button onClick={startCreate} className="bg-brand-700 hover:bg-brand-800 text-white">
          + Add New Card
        </Button>
      </div>

      {saved && (
        <div className="mb-4 flex items-center gap-2 text-green-600 bg-green-50 rounded-xl px-4 py-2 text-sm">
          <CheckCircle className="h-4 w-4" /> Saved successfully
        </div>
      )}

      {creating && (
        <div className="bg-white rounded-2xl border border-brand-100 p-4 mb-4">
          <h3 className="font-semibold text-brand-900 mb-3">Create New Card</h3>
          <div className="space-y-3">
            <Input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <Input placeholder="Image URL (Google Drive link)" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
            {form.imageUrl && (
              <div className="w-40 h-28 rounded-xl overflow-hidden border">
                <img src={getDirectImageUrl(form.imageUrl)} alt="" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
              </div>
            )}
            <Input placeholder="Link URL (e.g., /products?category=food-carts)" value={form.linkUrl} onChange={(e) => setForm({ ...form, linkUrl: e.target.value })} />
            <div className="flex gap-2">
              <Button onClick={handleCreate} className="bg-brand-700 hover:bg-brand-800 text-white text-sm">Create</Button>
              <Button variant="outline" onClick={() => setCreating(false)} className="text-sm">Cancel</Button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {cards.sort((a, b) => a.sortOrder - b.sortOrder).map((card, i) => {
          const slug = getCategorySlug(card.linkUrl);
          const catName = categoryNames[slug] || "";
          const hasImage = !!card.imageUrl;

          return (
            <div key={card.id} className="bg-white rounded-2xl border border-brand-100 p-4">
              {editing === card.id ? (
                <div className="space-y-3">
                  <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                  <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} />
                  <Input placeholder="Image URL (Google Drive link)" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
                  {form.imageUrl && (
                    <div className="w-40 h-28 rounded-xl overflow-hidden border">
                      <img src={getDirectImageUrl(form.imageUrl)} alt="" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                    </div>
                  )}
                  <Input placeholder="Link URL" value={form.linkUrl} onChange={(e) => setForm({ ...form, linkUrl: e.target.value })} />
                  <div className="flex gap-2">
                    <Button onClick={() => handleUpdate(card.id)} className="bg-brand-700 hover:bg-brand-800 text-white text-sm">Save</Button>
                    <Button variant="outline" onClick={() => setEditing(null)} className="text-sm">Cancel</Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  {/* Image / Placeholder */}
                  <div className="w-20 h-14 rounded-lg overflow-hidden border border-brand-100 shrink-0 flex items-center justify-center bg-brand-50">
                    {hasImage ? (
                      <img src={getDirectImageUrl(card.imageUrl!)} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <ImageOff className="h-5 w-5 text-brand-300" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-brand-300">{i + 1}</span>
                      <p className="font-semibold text-brand-900 truncate">{card.title}</p>
                      {!hasImage && (
                        <span className="text-[10px] font-medium text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">No image</span>
                      )}
                    </div>
                    <p className="text-sm text-brand-500 truncate">{card.description}</p>
                    {catName && (
                      <p className="text-xs text-brand-400">
                        Category: <span className="font-mono">{slug}</span>
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-1 shrink-0">
                    <Button variant="outline" size="sm" onClick={() => startEdit(card)} className={hasImage ? "" : "border-amber-300 text-amber-700 hover:bg-amber-50"}>
                      {hasImage ? <Pencil className="h-3.5 w-3.5" /> : "Add Image"}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(card.id)} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
