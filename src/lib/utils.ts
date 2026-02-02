import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAssetPath(path: string) {
  // If we are in development or if the base URL is explicitly set, use it.
  // Otherwise default to the path as is (relative to root).
  const base = import.meta.env.BASE_URL;

  // Remove leading slash from path if base already has trailing slash to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // If base is just '/', don't append it, just return the path (add leading slash if needed)
  if (base === '/') {
    return `/${cleanPath}`;
  }

  // Otherwise join base and path
  return `${base}${cleanPath}`;
}
