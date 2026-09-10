import { StarIcon } from "@/components/site/icons";

const quotes = [
  {
    text: "The perfect mix of activities to get an overview of everything Costa Rica has to offer. Our guide knew every bird by call and got us back to the ship with time to spare.",
    name: "Karen R.",
    from: "Cruise passenger, Canada",
  },
  {
    text: "Anna was so engaging about her country's history, plants and animals. It felt like walking the city with a friend who happened to know everything.",
    name: "David M.",
    from: "San José walking tour, UK",
  },
  {
    text: "Small group, unhurried, and they were completely accommodating with my mother's mobility. I didn't know a tour could feel this personal.",
    name: "Lucía F.",
    from: "Cahuita & snorkeling, Mexico",
  },
];

export function Testimonials() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {quotes.map((q) => (
        <figure
          key={q.name}
          className="flex flex-col rounded-xl2 border border-black/5 bg-white p-6 shadow-sm"
        >
          <div className="flex gap-0.5 text-sunset-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon key={i} width={16} height={16} />
            ))}
          </div>
          <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ink/75">
            &ldquo;{q.text}&rdquo;
          </blockquote>
          <figcaption className="mt-4 text-sm font-semibold text-ink">
            {q.name}
            <span className="block text-xs font-normal text-ink/55">{q.from}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
