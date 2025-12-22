import { useMemo, useState } from "react";

function initialsFromName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const second = parts.length > 1 ? parts[1]?.[0] ?? "" : parts[0]?.[1] ?? "";
  return (first + second).toUpperCase();
}

export function CategoryCircleImage({
  src,
  alt,
  size = 80,
}: {
  src: string;
  alt: string;
  size?: number;
}) {
  const [hasError, setHasError] = useState(false);
  const initials = useMemo(() => initialsFromName(alt), [alt]);

  return (
    <div
      className="rounded-full overflow-hidden bg-muted ring-2 ring-transparent group-hover:ring-primary group-hover:ring-offset-2 transition-all shadow-md flex items-center justify-center"
      style={{ width: size, height: size }}
      aria-label={alt}
      role="img"
    >
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-muted to-muted/60 flex items-center justify-center">
          <span className="text-sm font-bold text-muted-foreground">{initials}</span>
        </div>
      )}
    </div>
  );
}
