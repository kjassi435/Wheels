"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  ListOrdered,
  Users,
  BarChart3,
  LogOut,
  ChevronLeft,
  HelpCircle,
  Settings,
  Images,
  Rocket,
  MessageSquare,
  Star,
} from "lucide-react";
import { signOut } from "next-auth/react";

const sidebarLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: ListOrdered },
  { href: "/admin/inquiries", label: "Inquiries", icon: HelpCircle },
  { href: "/admin/testimonials", label: "Testimonials", icon: Star },
  { href: "/admin/contacts", label: "Messages", icon: MessageSquare },
  { href: "/admin/cms/settings", label: "Site Settings", icon: Settings },
  { href: "/admin/cms/carousel", label: "Carousel Cards", icon: Images },
  { href: "/admin/cms/launches", label: "Future Launches", icon: Rocket },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex lg:flex-col w-64 border-r border-brand-100 bg-white min-h-screen">
      <div className="p-6 border-b border-brand-100">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl overflow-hidden shadow-md">
            <img src="/logo-wow.png" alt="Logo" className="h-9 w-9 object-cover" />
          </div>
          <span className="font-display font-bold text-brand-900">Admin Panel</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {sidebarLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                isActive
                  ? "bg-brand-50 text-brand-700 shadow-sm"
                  : "text-brand-500 hover:bg-brand-50 hover:text-brand-700"
              )}
            >
              <Icon className="h-5 w-5" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-brand-100 space-y-2">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-brand-500 hover:bg-brand-50 hover:text-brand-700 transition-all"
        >
          <ChevronLeft className="h-5 w-5" />
          Back to Site
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
