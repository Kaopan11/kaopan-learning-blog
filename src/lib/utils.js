// utils.js — helper รวม className ของ Tailwind (ใช้ทั่วทั้งโปรเจกต)
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

// รวม class names และแก้ conflict ของ Tailwind
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
