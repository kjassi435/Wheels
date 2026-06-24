"use client";

import { useEffect, useState } from "react";
import { StatsCard } from "@/components/admin/StatsCard";
import { Package, ShoppingCart, Users, IndianRupee, MessageSquare } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface Analytics {
  totalProducts: number;
  totalOrders: number;
  totalCustomers: number;
  totalRevenue: number;
  unreadMessages: number;
}

export default function AdminDashboard() {
  const [data, setData] = useState<Analytics | null>(null);

  useEffect(() => {
    fetch("/api/analytics")
      .then((r) => r.json())
      .then(setData);
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Overview of your business</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <StatsCard
          title="Total Products"
          value={data?.totalProducts ?? "-"}
          icon={Package}
        />
        <StatsCard
          title="Total Orders"
          value={data?.totalOrders ?? "-"}
          icon={ShoppingCart}
        />
        <StatsCard
          title="Customers"
          value={data?.totalCustomers ?? "-"}
          icon={Users}
        />
        <StatsCard
          title="Revenue"
          value={data?.totalRevenue ? formatCurrency(data.totalRevenue) : "-"}
          icon={IndianRupee}
        />
        <StatsCard
          title="Unread Messages"
          value={data?.unreadMessages ?? "-"}
          icon={MessageSquare}
        />
      </div>
    </div>
  );
}
