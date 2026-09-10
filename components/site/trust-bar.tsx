import { ShieldIcon, StarIcon, CheckIcon, ShipIcon } from "@/components/site/icons";

const items = [
  { icon: ShieldIcon, label: "Certified local guides" },
  { icon: StarIcon, label: "All fees included" },
  { icon: CheckIcon, label: "Free cancellation" },
  { icon: ShipIcon, label: "On-time ship return" },
];

export function TrustBar({ variant = "light" }: { variant?: "light" | "onDark" }) {
  const onDark = variant === "onDark";
  return (
    <div
      className={`grid grid-cols-2 gap-px overflow-hidden rounded-xl2 border md:grid-cols-4 ${
        onDark
          ? "border-white/15 bg-white/10 text-white"
          : "border-black/5 bg-black/5 text-ink"
      }`}
    >
      {items.map(({ icon: Icon, label }) => (
        <div
          key={label}
          className={`flex items-center justify-center gap-2.5 px-4 py-4 text-center text-sm font-medium ${
            onDark ? "bg-jungle-800" : "bg-white"
          }`}
        >
          <Icon
            width={18}
            height={18}
            className={onDark ? "text-sunset-400" : "text-jungle-600"}
          />
          {label}
        </div>
      ))}
    </div>
  );
}
