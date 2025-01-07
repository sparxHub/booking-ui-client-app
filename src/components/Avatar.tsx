"use client";

import Image from "next/image";

const isExport = process.env.NEXT_PUBLIC_EXPORT_MODE === "true";

const customLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

export function Avatar({ name, photo }: { name: string; photo?: string }) {
  if (photo) {
    return (
      <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-300">
        <Image
          src={photo}
          alt={name}
          width={48}
          height={48}
          loader={isExport ? customLoader : undefined} // Add custom loader
          className="object-cover"
        />
      </div>
    );
  }

  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-500 text-white">
      {initials}
    </div>
  );
}
