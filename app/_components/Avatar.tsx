import Image from "next/image";

const COLORS: Record<string, string> = {
  livestreamfails: "#e84c22",
  teamstarr: "#7c3aed",
  mooji: "#16a34a",
  tscbn: "#2563eb",
  yani: "#0891b2",
  zhonglischair: "#d97706",
  drykritkal: "#6b7280",
  user992: "#475569",
  teamhype: "#dc2626",
  megan: "#db2777",
  techbradah: "#4f46e5",
};

export function Avatar({
  handle,
  name,
  size = 44,
  src,
}: {
  handle: string;
  name: string;
  size?: number;
  src?: string;
}) {
  const color = COLORS[handle.toLowerCase()] ?? "#6b7280";
  const initial = name.charAt(0).toUpperCase();

  if (src) {
    return (
      <Image
        src={src}
        alt={name}
        width={size}
        height={size}
        className="rounded-full object-cover"
        style={{ width: size, height: size, minWidth: size }}
        unoptimized
      />
    );
  }

  return (
    <div
      style={{
        width: size,
        height: size,
        minWidth: size,
        backgroundColor: color,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: 700,
        fontSize: Math.round(size * 0.38),
        userSelect: "none",
      }}
      aria-label={name}
    >
      {initial}
    </div>
  );
}
