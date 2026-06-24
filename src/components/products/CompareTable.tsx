"use client";

import { Check } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  price: number | null;
  dimensions: string | null;
  weight: string | null;
  features: string | null;
  description: string | null;
}

export function CompareTable({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12 text-brand-400">
        Select products to compare
      </div>
    );
  }

  const rows: { label: string; render: (p: Product) => React.ReactNode }[] = [
    {
      label: "Price",
      render: (p) =>
        p.price ? (
          <span className="font-bold gradient-text text-lg">{formatCurrency(p.price)}</span>
        ) : (
          <span className="text-brand-400">—</span>
        ),
    },
    {
      label: "Dimensions",
      render: (p) => p.dimensions || <span className="text-brand-300">—</span>,
    },
    {
      label: "Weight",
      render: (p) => p.weight || <span className="text-brand-300">—</span>,
    },
    {
      label: "Description",
      render: (p) => (
        <p className="text-sm text-brand-500 line-clamp-4 leading-relaxed">
          {p.description || "—"}
        </p>
      ),
    },
    {
      label: "Features",
      render: (p) => {
        const features = p.features ? JSON.parse(p.features) : [];
        return (
          <ul className="space-y-1.5">
            {features.length > 0
              ? features.map((f: string, i: number) => (
                  <li key={i} className="flex items-center gap-1.5 text-sm">
                    <Check className="h-3.5 w-3.5 text-green-500 shrink-0" />
                    <span className="text-brand-600">{f}</span>
                  </li>
                ))
              : <span className="text-brand-300">—</span>}
          </ul>
        );
      },
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="p-5 text-left text-sm font-semibold text-brand-400 w-40 bg-brand-50 rounded-tl-2xl" />
            {products.map((p) => (
              <th key={p.id} className="p-5 text-left font-display font-semibold text-brand-900 bg-brand-50 min-w-[200px] first:rounded-tr-2xl">
                {p.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.label} className={i % 2 === 0 ? "bg-white" : "bg-brand-50/50"}>
              <td className="p-5 text-sm font-semibold text-brand-600 border-b border-brand-100">
                {row.label}
              </td>
              {products.map((p) => (
                <td key={p.id} className="p-5 text-sm border-b border-brand-100">
                  {row.render(p)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
