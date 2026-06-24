"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { formatDate } from "@/lib/utils";
import { ArrowLeft, Mail, Phone, MapPin } from "lucide-react";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  service: string;
  productName: string | null;
  notes: string | null;
  status: string;
  createdAt: string;
}

export default function InquiryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [inquiry, setInquiry] = useState<Inquiry | null>(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch(`/api/inquiries/${params.id}`)
      .then((r) => r.json())
      .then((data) => {
        setInquiry(data);
        setStatus(data.status);
      });
  }, [params.id]);

  async function handleUpdate() {
    await fetch(`/api/inquiries/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    router.push("/admin/inquiries");
  }

  if (!inquiry) {
    return <div className="text-brand-400">Loading...</div>;
  }

  return (
    <div className="max-w-2xl">
      <Button
        variant="ghost"
        onClick={() => router.push("/admin/inquiries")}
        className="mb-4 gap-2 text-brand-500"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Inquiries
      </Button>

      <div className="rounded-xl border bg-white p-6 shadow-sm mb-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-brand-900">{inquiry.name}</h1>
          <Select value={status} onChange={(e) => setStatus(e.target.value)} className="w-32">
            <option value="pending">Pending</option>
            <option value="contacted">Contacted</option>
            <option value="follow_up">Follow Up</option>
            <option value="closed">Closed</option>
          </Select>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 text-brand-700">
            <Mail className="h-5 w-5 text-brand-400" />
            <span>{inquiry.email}</span>
          </div>
          <div className="flex items-center gap-3 text-brand-700">
            <Phone className="h-5 w-5 text-brand-400" />
            <span>{inquiry.phone}</span>
          </div>
          <div className="flex items-start gap-3 text-brand-700">
            <MapPin className="h-5 w-5 text-brand-400 shrink-0 mt-0.5" />
            <span>{inquiry.address}</span>
          </div>
        </div>

        <hr className="my-6 border-brand-100" />

        <div className="space-y-3">
          <div>
            <p className="text-sm font-semibold text-brand-400 uppercase tracking-wide">Service Required</p>
            <p className="text-brand-800 font-medium">{inquiry.service}</p>
          </div>
          {inquiry.productName && (
            <div>
              <p className="text-sm font-semibold text-brand-400 uppercase tracking-wide">Product Interested In</p>
              <p className="text-brand-800 font-medium">{inquiry.productName}</p>
            </div>
          )}
          {inquiry.notes && (
            <div>
              <p className="text-sm font-semibold text-brand-400 uppercase tracking-wide">Notes</p>
              <p className="text-brand-800 leading-relaxed whitespace-pre-wrap">{inquiry.notes}</p>
            </div>
          )}
          <div>
            <p className="text-sm font-semibold text-brand-400 uppercase tracking-wide">Submitted On</p>
            <p className="text-brand-800">{formatDate(inquiry.createdAt)}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button onClick={handleUpdate}>Save Changes</Button>
      </div>
    </div>
  );
}
