import { site } from "@/lib/site";
import type { ValueProp } from "@/lib/site";
import {
  ShieldIcon,
  LeafIcon,
  ShipIcon,
  UsersIcon,
  ClockIcon,
  StarIcon,
} from "@/components/site/icons";

const iconFor: Record<ValueProp["icon"], typeof ShieldIcon> = {
  shield: ShieldIcon,
  leaf: LeafIcon,
  ship: ShipIcon,
  users: UsersIcon,
  clock: ClockIcon,
  star: StarIcon,
};

export function ValueProps() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {site.valueProps.map((vp) => {
        const Icon = iconFor[vp.icon];
        return (
          <div
            key={vp.title}
            className="rounded-xl2 border border-black/5 bg-white p-6 shadow-sm"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-jungle-50 text-jungle-600">
              <Icon width={22} height={22} />
            </span>
            <h3 className="mt-4 font-display text-lg font-semibold text-ink">
              {vp.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/65">{vp.text}</p>
          </div>
        );
      })}
    </div>
  );
}
