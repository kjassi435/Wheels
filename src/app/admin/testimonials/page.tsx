"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Save, X, Star } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Testimonial {
  id: string;
  name: string;
  company: string | null;
  designation: string | null;
  content: string;
  rating: number;
  avatarUrl: string | null;
  status: string;
  createdAt: string;
}

const statusColors: Record<string, "default" | "secondary" | "success"> = {
  pending: "default",
  approved: "success",
  rejected: "secondary",
};

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", designation: "", content: "", rating: 5, status: "approved" });

  useEffect(() => {
    fetch("/api/testimonials?all=true").then((r) => r.json()).then(setTestimonials);
  }, []);

  async function handleAdd() {
    const res = await fetch("/api/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const data = await res.json();
      setTestimonials([{ ...form, id: data.id, company: form.company || null, designation: form.designation || null, avatarUrl: null, createdAt: new Date().toISOString() }, ...testimonials]);
      setForm({ name: "", company: "", designation: "", content: "", rating: 5, status: "approved" });
      setShowNew(false);
    }
  }

  async function handleUpdate(id: string) {
    await fetch(`/api/testimonials/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setTestimonials(testimonials.map((t) => t.id === id ? { ...t, ...form } : t));
    setEditing(null);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this testimonial?")) return;
    await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
    setTestimonials(testimonials.filter((t) => t.id !== id));
  }

  function startEdit(t: Testimonial) {
    setEditing(t.id);
    setForm({ name: t.name, company: t.company || "", designation: t.designation || "", content: t.content, rating: t.rating, status: t.status });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Testimonials</h1>
          <p className="text-gray-500 mt-1">Manage customer testimonials ({testimonials.length})</p>
        </div>
        <Button onClick={() => setShowNew(true)} className="gap-2"><Plus className="h-4 w-4" /> Add Testimonial</Button>
      </div>

      {showNew && (
        <div className="bg-white rounded-2xl border border-brand-100 p-6 mb-6">
          <h3 className="font-semibold text-brand-800 mb-4">New Testimonial</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2"><Input placeholder="Customer name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <Input placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
            <Input placeholder="Designation" value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} />
            <div className="col-span-2"><Textarea placeholder="Testimonial content" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={3} /></div>
            <Select value={String(form.rating)} onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) })}>
              {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} Stars</option>)}
            </Select>
            <Select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </Select>
          </div>
          <div className="flex gap-2 mt-4">
            <Button onClick={handleAdd} disabled={!form.name || !form.content} className="bg-brand-700 hover:bg-brand-800 text-white">Add</Button>
            <Button variant="outline" onClick={() => setShowNew(false)}>Cancel</Button>
          </div>
        </div>
      )}

      <div className="rounded-xl border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Content</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testimonials.map((t) => (
              <TableRow key={t.id}>
                <TableCell>
                  <p className="font-medium">{t.name}</p>
                  {t.company && <p className="text-xs text-gray-500">{t.company}</p>}
                </TableCell>
                <TableCell className="max-w-xs">
                  <p className="text-sm text-gray-600 truncate">{t.content}</p>
                </TableCell>
                <TableCell>
                  <span className="flex items-center gap-1 text-amber-500">{t.rating} <Star className="h-3 w-3 fill-current" /></span>
                </TableCell>
                <TableCell>
                  {editing === t.id ? (
                    <Select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-28">
                      <option value="approved">Approved</option>
                      <option value="pending">Pending</option>
                      <option value="rejected">Rejected</option>
                    </Select>
                  ) : (
                    <Badge variant={statusColors[t.status] || "default"}>{t.status}</Badge>
                  )}
                </TableCell>
                <TableCell className="text-sm text-gray-500">{formatDate(t.createdAt)}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {editing === t.id ? (
                      <Button variant="ghost" size="icon" onClick={() => handleUpdate(t.id)}><Save className="h-4 w-4 text-green-500" /></Button>
                    ) : (
                      <Button variant="ghost" size="icon" onClick={() => startEdit(t)}><Pencil className="h-4 w-4" /></Button>
                    )}
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(t.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {testimonials.length === 0 && (
              <TableRow><TableCell colSpan={6} className="text-center py-12 text-gray-400">No testimonials yet</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
