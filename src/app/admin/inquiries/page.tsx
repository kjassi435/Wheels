"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { formatDate } from "@/lib/utils";
import { Eye } from "lucide-react";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  productName: string | null;
  status: string;
  createdAt: string;
}

const statusColors: Record<string, "default" | "secondary" | "success" | "destructive" | "warning"> = {
  pending: "default",
  contacted: "warning",
  follow_up: "secondary",
  closed: "success",
};

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  useEffect(() => {
    fetch("/api/inquiries")
      .then((r) => r.json())
      .then(setInquiries);
  }, []);

  async function handleStatusChange(id: string, status: string) {
    await fetch(`/api/inquiries/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-brand-900">Inquiries</h1>
        <p className="text-brand-500 mt-1">Manage customer inquiries and requests</p>
      </div>

      <div className="rounded-xl border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-16"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inquiries.map((inq) => (
              <TableRow key={inq.id}>
                <TableCell>
                  <span className="font-medium">{inq.name}</span>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <p>{inq.email}</p>
                    <p className="text-brand-400">{inq.phone}</p>
                  </div>
                </TableCell>
                <TableCell className="text-sm">{inq.service}</TableCell>
                <TableCell className="text-sm text-brand-500">
                  {inq.productName || "—"}
                </TableCell>
                <TableCell>
                  <Select
                    value={inq.status}
                    onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                    className="w-28"
                  >
                    <option value="pending">Pending</option>
                    <option value="contacted">Contacted</option>
                    <option value="follow_up">Follow Up</option>
                    <option value="closed">Closed</option>
                  </Select>
                </TableCell>
                <TableCell className="text-sm text-brand-400">
                  {formatDate(inq.createdAt)}
                </TableCell>
                <TableCell>
                  <Link href={`/admin/inquiries/${inq.id}`}>
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
            {inquiries.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12 text-brand-400">
                  No inquiries yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
