import { Category } from "@/lib/types/layouts";
import{ homeProduct } from '@/lib/types/products';

export function ExtractArray($Array: Category[]) {
  return $Array.map(({ id, title }) => ({
    value: id,
    label: title,
  }));
}
export async function convertBlobUrlToFile(blobUrl: string) {
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  const fileName = Math.random().toString(36).slice(2, 9);
  const mimeType = blob.type || "application/octet-stream";
  const file = new File([blob], `${fileName}.${mimeType.split("/")[1]}`, {
    type: mimeType,
  });
  return file;
}
export const Delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
export function maskEmail(email: string): string {
  const [localPart, domain] = email.split("@");

  if (!localPart || !domain || localPart.length <= 3) {
    return email;
  }

  const visible = localPart.slice(0, 3);
  const masked = "*".repeat(localPart.length - 3);

  return `${visible}${masked}@${domain}`;
}

export function cleanComment(comment: string): string {
  const blockedWords = ["3asba", "zebi", "zibi", "nik", "ki"];
  const regex = new RegExp(`\\b(${blockedWords.join("|")})\\b`, "gi");
  return comment.replace(regex, "***");
}
export const generateHandle = (title: string) => {
  if (!title) return "";
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Replace multiple hyphens with single hyphen
};
export function addToRecentlyViewed(product:homeProduct) {
  if (typeof window === 'undefined') return;

  let viewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
  viewed = viewed.filter((p: homeProduct) => p.product_id !== product.product_id); // Remove duplicates
  // Add the new product to the beginning of the array
  viewed.unshift(product);
  viewed = viewed.slice(0, 5);
  localStorage.setItem('recentlyViewed', JSON.stringify(viewed));
}
export function formatDate(iso: string) {
  const d = new Date(iso);
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(
    d.getDate()
  )}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
