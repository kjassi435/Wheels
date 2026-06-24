"use client";

import { useEffect, useState } from "react";
import { StatsCard } from "@/components/admin/StatsCard";
import { Package, ShoppingCart, Users, IndianRupee, TrendingUp, Calendar, MessageSquare } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";

interface Analytics {
  totalProducts: number;
  totalOrders: number;
  totalCustomers: number;
  totalRevenue: number;
  recentOrders: any[];
  unreadMessages: number;
}

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<Analytics | null>(null);

  useEffect(() => {
    fetch("/api/analytics")
      .then((r) => r.json())
      .then(setData);
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-brand-900">Analytics Dashboard</h1>
        <p className="text-brand-500 mt-1">Visual performance reporting and insights</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 mb-8">
        <StatsCard title="Total Revenue" value={data?.totalRevenue ? formatCurrency(data.totalRevenue) : "-"} icon={IndianRupee} />
        <StatsCard title="Total Orders" value={data?.totalOrders ?? "-"} icon={ShoppingCart} />
        <StatsCard title="Products" value={data?.totalProducts ?? "-"} icon={Package} />
        <StatsCard title="Customers" value={data?.totalCustomers ?? "-"} icon={Users} />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Revenue</h3>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-brand-900">{data?.totalRevenue ? formatCurrency(data.totalRevenue) : "₹0"}</p>
          <p className="text-sm text-gray-500 mt-1">Total revenue from paid orders</p>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Unread Messages</h3>
            <MessageSquare className="h-5 w-5 text-amber-500" />
          </div>
          <p className="text-3xl font-bold text-brand-900">{data?.unreadMessages ?? 0}</p>
          <p className="text-sm text-gray-500 mt-1">From contact form submissions</p>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Recent Orders</h3>
          <Calendar className="h-5 w-5 text-gray-400" />
        </div>
        {data?.recentOrders && data.recentOrders.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {data.recentOrders.map((order: any) => (
              <div key={order.id} className="flex items-center justify-between py-3 text-sm">
                <span className="font-mono text-gray-900">{order.orderNumber}</span>
                <span className="text-gray-500">{order.totalAmount ? formatCurrency(order.totalAmount) : "-"}</span>
                <span className="text-gray-400 text-xs">{formatDate(order.createdAt)}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-24 flex items-center justify-center">
            <p className="text-gray-400 text-sm">No orders yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
