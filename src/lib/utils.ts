import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function generateId(): string {
  return crypto.randomUUID();
}

const driveFilePattern = /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/;
const driveOpenPattern = /drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/;
const driveUcPattern = /drive\.google\.com\/uc\?.*id=([a-zA-Z0-9_-]+)/;

export function getDirectImageUrl(url: string): string {
  if (!url) return url;
  for (const pattern of [driveFilePattern, driveOpenPattern, driveUcPattern]) {
    const match = url.match(pattern);
    if (match) return `https://lh3.googleusercontent.com/d/${match[1]}`;
  }
  return url;
}

export function getGoogleDriveEmbed(url: string): string | null {
  if (!url) return null;
  for (const pattern of [driveFilePattern, driveOpenPattern]) {
    const match = url.match(pattern);
    if (match) return `https://drive.google.com/file/d/${match[1]}/preview`;
  }
  return null;
}

export function getYouTubeEmbed(url: string): string | null {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];
  for (const p of patterns) {
    const match = url.match(p);
    if (match) return `https://www.youtube.com/embed/${match[1]}`;
  }
  return null;
}

export function getVideoEmbed(url: string): string | null {
  return getYouTubeEmbed(url) || getGoogleDriveEmbed(url);
}
