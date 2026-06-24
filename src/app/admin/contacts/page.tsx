"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { Mail, Eye, Trash2 } from "lucide-react";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selected, setSelected] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/contacts").then((r) => r.json()).then((data) => { setContacts(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  async function markRead(id: string) {
    await fetch("/api/contacts", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, isRead: true }),
    });
    setContacts(contacts.map((c) => c.id === id ? { ...c, isRead: true } : c));
  }

  if (loading) return <div className="text-brand-400">Loading...</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Contact Messages</h1>
          <p className="text-gray-500 mt-1">Messages from the contact form ({contacts.length})</p>
        </div>

        <div className="rounded-xl border bg-white shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>From</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-16"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((c) => (
                <TableRow key={c.id} className={!c.isRead ? "bg-brand-50/50" : ""}>
                  <TableCell>
                    <p className="font-medium">{c.name}</p>
                    <p className="text-xs text-gray-500">{c.email}</p>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <p className="text-sm text-gray-600 truncate">{c.message}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant={c.isRead ? "secondary" : "default"}>{c.isRead ? "Read" : "New"}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">{formatDate(c.createdAt)}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => { setSelected(c); if (!c.isRead) markRead(c.id); }}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {contacts.length === 0 && (
                <TableRow><TableCell colSpan={5} className="text-center py-12 text-gray-400">No messages yet</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {selected && (
        <div className="lg:col-span-1">
          <div className="rounded-xl border bg-white p-6 shadow-sm sticky top-6">
            <h3 className="font-semibold text-gray-900 mb-4">Message Detail</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wide">Name</p>
                <p className="font-medium">{selected.name}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wide">Email</p>
                <a href={`mailto:${selected.email}`} className="font-medium text-brand-600 hover:underline">{selected.email}</a>
              </div>
              {selected.phone && (
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wide">Phone</p>
                  <p className="font-medium">{selected.phone}</p>
                </div>
              )}
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wide">Message</p>
                <p className="text-gray-700 mt-1 leading-relaxed whitespace-pre-wrap">{selected.message}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wide">Date</p>
                <p className="font-medium">{formatDate(selected.createdAt)}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
