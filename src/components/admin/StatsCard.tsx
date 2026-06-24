import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
}

export function StatsCard({ title, value, icon: Icon, description }: StatsCardProps) {
  return (
    <div className="card-3d rounded-2xl border border-brand-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold tracking-wider uppercase text-brand-400">{title}</p>
          <p className="text-2xl font-display font-bold text-brand-900 mt-1">{value}</p>
          {description && (
            <p className="text-xs text-brand-500 mt-1">{description}</p>
          )}
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-100 to-brand-50 border border-brand-100">
          <Icon className="h-6 w-6 text-brand-600" />
        </div>
      </div>
    </div>
  );
}
