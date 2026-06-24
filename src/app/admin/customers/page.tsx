"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { Users, Mail, Phone } from "lucide-react";

interface Customer {
  id: string;
  name: string;
  email: string;
  role: string;
  phone: string | null;
  createdAt: string;
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/customers")
      .then((r) => r.json())
      .then((data) => { setCustomers(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-brand-400">Loading...</div>;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
        <p className="text-gray-500 mt-1">View registered customers ({customers.length})</p>
      </div>

      {customers.length === 0 ? (
        <div className="rounded-xl border bg-white p-12 text-center shadow-sm">
          <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-1">No Customers Yet</h3>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Customer data will appear here as users register on the platform.
          </p>
        </div>
      ) : (
        <div className="rounded-xl border bg-white shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Registered</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1 text-sm">
                      <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5 text-brand-400" />{c.email}</span>
                      {c.phone && <span className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5 text-brand-400" />{c.phone}</span>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={c.role === "admin" ? "default" : "secondary"}>{c.role}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">{formatDate(c.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
