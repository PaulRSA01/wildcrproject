import type { SceneKey } from "@/lib/catalog";
import { TourArt } from "@/components/site/tour-art";

/**
 * Renders the tour photograph when one is available, falling back to the
 * hand-built SVG scene. Plain <img> keeps it dependency-free and offline-safe;
 * swap for next/image if you later enable the image optimizer.
 */
export function TourImage({
  src,
  alt,
  scene,
  className = "",
  priority = false,
}: {
  src?: string;
  alt: string;
  scene: SceneKey;
  className?: string;
  priority?: boolean;
}) {
  if (!src) return <TourArt scene={scene} className={className} />;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={`object-cover ${className}`}
    />
  );
}
