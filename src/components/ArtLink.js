"use client";
import { usePathname } from "next/navigation";
import { PrismicNextImage } from "@prismicio/next";

export default function ArtLink({ art, slice, index }) {
  const pathname = usePathname();
  const prefix = art && art.material ? "art-gallery" : "ux-gallery";
  let link = `/${prefix}/${pathname !== "/" ? pathname : "home"}/${slice.id}/${index}`;
  return (
    <a href={link}>
      <PrismicNextImage
        field={art.thumbnail}
        className="w-full object-cover aspect-1 mb-6"
      />
    </a>
  );
}
